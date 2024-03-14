import { InventoryControllerGetDataAsList200Response } from "@api/api";
import { InventoryFormRule, InventoryFormSchema } from "@core/model/form.rule";
import {
  useQyEditInventory,
  useQyGetInventoryById,
  useQyGetInventoryStatus,
} from "@core/query/inventory.query";
import { getInventoryFormDefault } from "@core/model/get-form.default";
import { FieldErrors, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { InventoryStatus } from "@core/model/inventory-status.enum";
import { useQueryClient } from "react-query";
import { QueryKey } from "@core/query/query-key.enum";

export function useEditMonitor() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotificationContext();
  const { monitorId } = useParams();
  const actionItems = [
    {
      label: "Register",
      command: () => {
        updateStatusAction(InventoryStatus.REG);
      },
    },
    {
      label: "Damage",
      command: () => {
        updateStatusAction(InventoryStatus.DMG);
      },
    },
    {
      label: "Repair",
      command: () => {
        updateStatusAction(InventoryStatus.REPAIR);
      },
    },
    {
      label: "Lost",
      command: () => {
        updateStatusAction(InventoryStatus.LOST);
      },
    },
    {
      label: "Stolen",
      command: () => {
        updateStatusAction(InventoryStatus.STOLEN);
      },
    },
    {
      label: "Disposed",
      command: () => {
        updateStatusAction(InventoryStatus.DISPOSED);
      },
    },
  ];

  const { data: statusResponse } = useQyGetInventoryStatus(
    "",
    99,
    0,
    undefined,
    undefined
  );

  // UNCACHED, GET API VALUES
  // GET REQUEST API
  const handleGetApiSuccess = (
    data: InventoryControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("code", responseData?.code || "");
      setValue("batch", responseData?.batch || "");
      setValue("inventoryNo", responseData?.inventory_no || "");
      setValue("lot", responseData?.lot || "");
      setValue("office", responseData?.office || "");
      setValue("building", responseData?.building || "");
      setValue("endOfLife", responseData?.end_of_life || 0);
      setValue("assignee", responseData?.assignee || "");
      setValue("propertyType", responseData?.property_type || "");
      setValue("remarks", responseData?.remarks || "");
      setValue("status", responseData?.status || "");
      setValue(
        "dateAssigned",
        responseData?.date_assigned
          ? (format(
              new Date(responseData?.date_assigned),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      return;
    }
  };
  const {
    data: inventoryResponse,
    isLoading,
    isError: inventoryError,
  } = useQyGetInventoryById(monitorId || "", handleGetApiSuccess);
  const inventoryData = inventoryResponse?.data?.[0];

  // API EDIT FORM
  const handleUpdateApiSuccess = () => {
    showSuccess("Inventory item is updated successfully");
    queryClient.invalidateQueries([QueryKey.Inventory, monitorId]);
  };
  const { mutate: editInventory, isLoading: isEditLoading } =
    useQyEditInventory(handleUpdateApiSuccess);

  const formMethod = useForm<InventoryFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getInventoryFormDefault(inventoryData),
    resolver: zodResolver(InventoryFormRule),
  });
  const { handleSubmit, setValue, watch, getValues } = formMethod;
  const handleValidate = (form: InventoryFormSchema) => {
    if (!inventoryData) {
      throw new Error("No inventory data");
    }

    const formData = FormToApiService.EditInventory(form, inventoryData);
    editInventory(formData);
  };
  const handleValidateError = (err: FieldErrors<InventoryFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const getStatusCode = (status: string) => {
    const filteredStatus = (statusResponse?.data || []).filter(
      (item) => item.name === status
    );
    const resultStatus =
      filteredStatus.length > 0 ? filteredStatus[0].code : null;
    return resultStatus;
  };
  const updateAction = () => {
    handleSubmit(handleValidate, handleValidateError)();
  };
  const updateStatusAction = (status: string) => {
    const statusCode = getStatusCode(status);

    if (!statusCode) {
      showError(
        "Statuscode not found. Please refresh page and wait for it to load"
      );
      return;
    }

    setValue("status", statusCode);
    handleSubmit(handleValidate, handleValidateError)();
  };
  const assignAction = () => {
    updateStatusAction(InventoryStatus.ASSIGNED);
  };

  return {
    inventoryData,
    isLoading,
    inventoryError,
    formMethod,
    actionItems,
    isEditLoading,
    updateAction,
    assignAction,
    handleSubmit,
    setValue,
    watch,
    getValues,
  };
}