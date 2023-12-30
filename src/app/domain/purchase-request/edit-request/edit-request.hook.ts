import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-request";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import {
  ProcessPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import {
  useEditRequestQy,
  useGetRequestByIdQy,
  useProcessRequestQy,
} from "@core/query/request.query";
import {
  ItemFormSchema,
  RequestFormRule,
  RequestFormSchema,
} from "@core/model/form.rule";
import { getRequestFormDefault } from "@core/model/get-form.default";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { useReviewHook } from "@core/services/review.hook";
import { useReactToPrint } from "react-to-print";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { showReviewControl } from "@core/utility/approve-control";
import { RequestStatus } from "@core/model/request-status.enum";

export function useEditRequest() {
  const { isRequestor } = useUserIdentity();
  const { setReviewerEntityStatus, getReviewers } = useReviewHook();
  const { showSuccess, showError, hideProgress } = useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { requestId } = useParams();
  const [visible, setVisible] = useState(false);
  const [defaultPrItem, setDefaultPrItem] = useState<
    ItemFormSchema | undefined
  >(undefined);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const getActions = () => {
    const defaultActions = [
      {
        label: "History",
        command: () => {},
      },
      {
        label: "Print",
        command: () => {
          handlePrint();
        },
      },
      {
        label: "Delete",
        command: () => {},
      },
    ];
    const reviewerActions = [
      {
        label: "Approve",
        command: () => {
          const dataValue = requests?.data?.[0];

          if (!dataValue) {
            throw new Error("no data");
          }

          const reviewer = setReviewerEntityStatus(true);
          const payload = {
            code: dataValue.code,
            ...reviewer,
          } as ProcessPurchaseRequestDto;
          processRequest(payload);
        },
      },
      {
        label: "Decline",
        command: () => {
          const dataValue = requests?.data?.[0];

          if (!dataValue) {
            throw new Error("no data");
          }

          const reviewer = setReviewerEntityStatus(false);
          const payload = {
            code: dataValue.code,
            ...reviewer,
          } as ProcessPurchaseRequestDto;
          processRequest(payload);
        },
      },
    ];

    const currentStatus = requests?.data?.[0].status_name;
    const hasReviewerActions =
      !isRequestor && showReviewControl(currentStatus as RequestStatus);
    const actions = hasReviewerActions
      ? [...reviewerActions, ...defaultActions]
      : defaultActions;
    return actions;
  };

  // PROCESS REQUEST API
  const handleProcessSuccess = () => {
    showSuccess("Request is approved");
  };
  const { mutate: processRequest } = useProcessRequestQy(handleProcessSuccess);

  // UNCACHED, GET API VALUES
  // GET REQUEST API
  const handleGetApiSuccess = (
    data: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("prno", responseData?.pr_no);
      setValue(
        "dueDate",
        responseData?.pr_date
          ? (format(
              new Date(responseData?.pr_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("category", responseData?.category || "");
      setValue("section", responseData?.section || "");
      setValue("sai", responseData?.sai_no || "");
      setValue(
        "saiDate",
        responseData?.sai_date
          ? (format(
              new Date(responseData?.sai_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("alobs", responseData?.alobs_no || "");
      setValue(
        "alobsDate",
        responseData?.alobs_date
          ? (format(
              new Date(responseData?.alobs_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("purpose", responseData?.purpose || "");

      const items = responseData?.items
        ? ApiToFormService.MapRequestPruchaseItems(responseData.items)
        : [];
      setValue("items", items);
      setValue("urgent", responseData?.is_urgent || false);
      setValue("department", responseData?.department_name);

      setDataEmpty(false);
      hideProgress();
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: requests,
    isLoading,
    isError: requestError,
  } = useGetRequestByIdQy(requestId || "", handleGetApiSuccess);
  const reviewers = getReviewers(requests?.data?.[0]);

  // EDIT REQUEST API
  const handleApiSuccess = () => {
    showSuccess("Request updated");
    handleBack();
  };
  const { mutate: editRequest, isError: editError } =
    useEditRequestQy(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getRequestFormDefault(requests?.data?.[0]),
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, setValue, watch } = formMethod;
  const requestItems = watch("items");

  const handleBack = () => {
    navigate("../");
  };
  const handleValidate = (form: RequestFormSchema) => {
    const formData = FormToApiService.EditPurchaseRequest(
      form,
      requestId || ""
    );
    console.log("Edit request", { form, formData });
    editRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleAddAnItem = () => {
    setVisible(true);
    setDefaultPrItem(undefined);
  };
  const handleEdit = (item: ItemFormSchema) => {
    setVisible(true);
    setDefaultPrItem(item);
  };
  const handleRemove = (item: ItemFormSchema) => {
    const unmatchedCode = requestItems.filter((x) => x.code !== item.code);
    setValue("items", unmatchedCode);
  };

  return {
    requests,
    visible,
    defaultPrItem,
    requestItems,
    formMethod,
    isLoading,
    requestError,
    editError,
    dataEmpty,
    reviewers,
    componentRef,
    setVisible,
    setDefaultPrItem,
    handleAddAnItem,
    handleEdit,
    handleRemove,
    navigate,
    handleSubmit,
    handleValidate,
    handleValidateError,
    getActions,
  };
}
