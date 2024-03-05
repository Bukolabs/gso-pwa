import { InventoryControllerGetDataAsList200Response } from "@api/api";
import { InventoryFormRule, InventoryFormSchema } from "@core/model/form.rule";
import { useQyGetInventoryById } from "@core/query/inventory.query";
import { getInventoryFormDefault } from "@core/model/get-form.default";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { inventoryFormDefault } from "@core/model/form.default";

export function useEditMonitor() {
  const { monitorId } = useParams();

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
      setValue("status_name", responseData?.status_name || "");
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

  const formMethod = useForm<InventoryFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getInventoryFormDefault(inventoryData),
    resolver: zodResolver(InventoryFormRule),
  });
  const { handleSubmit, setValue, watch, getValues } = formMethod;

  return {
    inventoryData,
    isLoading,
    inventoryError,
    formMethod,
    handleSubmit,
    setValue,
    watch,
    getValues,
  };
}
