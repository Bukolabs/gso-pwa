import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-request";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import {
  ProcessPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import {
  useDeleteRequestQy,
  useEditRequestQy,
  useGetRequestByIdQy,
  useProcessRequestQy,
} from "@core/query/request.query";
import {
  ItemFormSchema,
  PurchaseItemFormSchema,
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
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import { useReactToPrint } from "react-to-print";
import { StageName } from "@core/model/stage-name.enum";
import { usePurchaseHistory } from "@core/ui/purchase-history/purchase-history.hook";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { useQueryClient } from "react-query";
import { QueryKey } from "@core/query/query-key.enum";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
import { confirmDialog } from "primereact/confirmdialog";

export function useEditRequest() {
  const queryClient = useQueryClient();
  const { historyData, getHistory } = usePurchaseHistory();
  const { isRestrictedView, isAdmin, isRequestor, isGso } = useUserIdentity();
  const { setReviewerEntityStatus, getReviewers } = useReviewHook();
  const { showSuccess, showError, showWarning, hideProgress } =
    useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { requestId } = useParams();
  const [visible, setVisible] = useState(false);
  const [defaultPrItem, setDefaultPrItem] = useState<
    ItemFormSchema | undefined
  >(undefined);
  const [historySidebar, setHistorySidebar] = useState(false);

  const [remarksVisible, setRemarksVisible] = useState(false);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [remarksMode, setRemarksMode] = useState<
    | RequestStatusAction.Approve
    | RequestStatusAction.Decline
    | RequestStatusAction.Bacdecline
    | RequestStatusAction.Reapprove
    | ""
  >("");

  // PROCESS REQUEST API
  const handleProcessSuccess = () => {
    showSuccess("Request status is changed successfully");
    handleBack();
  };
  const { mutate: processRequest, isLoading: isProcessing } =
    useProcessRequestQy(handleProcessSuccess);

  // PROCESS REQUEST API
  const handleDeleteApiSuccess = () => {
    showSuccess("Request is deleted successfully");
    handleBack();
  };
  const { mutate: deleteRequest, isLoading: isDeleting } = useDeleteRequestQy(
    handleDeleteApiSuccess
  );

  // UNCACHED, GET API VALUES
  // GET REQUEST API
  const handleGetApiSuccess = (
    data: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("code", responseData?.code);
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
        ? ApiToFormService.MapRequestPurchaseItems(responseData.items)
        : [];
      setValue("items", items);
      setValue("urgent", responseData?.is_urgent || false);
      setValue("department", responseData?.department);
      setValue("departmentLabel", responseData?.department_name);
      setValue("isPPMP", Boolean(responseData?.has_ppmp));
      setValue("isActivityDesign", Boolean(responseData?.has_activity_design));
      setValue("signatoryName", responseData?.signatory_name || "");
      setValue("hasApp", Boolean(responseData?.has_app));
      setValue("hasPow", Boolean(responseData?.has_pow));
      setValue("hasBarchart", Boolean(responseData?.has_bar_chart));
      setValue("hasTechSpec", Boolean(responseData?.has_tech_spec));
      setValue("hasPlan", Boolean(responseData?.has_plan));
      setValue("hasQuitClaim", Boolean(responseData?.has_quit_claim));
      setValue("status", "");
      setValue("remarks", "");

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

  const getStageReviewers = () => {
    const requestData = requests?.data?.[0];
    const isStage3And4 =
      requestData?.stage_name === StageName.STAGE_3 ||
      requestData?.stage_name === StageName.STAGE_4;

    const stageReviewers = isStage3And4
      ? ({
          isGso: requestData?.po_is_gso,
          isTreasurer: requestData?.po_is_treasurer,
          isMayor: requestData?.po_is_mayor,
        } as ReviewerStatus)
      : ({
          isGso: requestData?.is_gso,
          isGsoFF: requestData?.is_gso_ff,
          isTreasurer: requestData?.is_treasurer,
          isMayor: requestData?.is_mayor,
          isBudget: requestData?.is_budget,
        } as ReviewerStatus);
    const isSp = requestData?.department_name === "SP";

    const reviewers = getReviewers(stageReviewers, isSp);
    return reviewers;
  };

  // EDIT REQUEST API
  const handleApiSuccess = () => {
    showSuccess("Request updated");
    queryClient.invalidateQueries([QueryKey.Request, requestId]);
  };
  const {
    mutate: editRequest,
    isError: editError,
    isLoading: isUpdating,
  } = useEditRequestQy(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getRequestFormDefault(requests?.data?.[0]),
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, setValue, watch, getValues } = formMethod;
  const requestItems = watch("items");
  const displayRequestItems = requestItems.filter((item) => item.isActive);

  const handleBack = () => {
    navigate("../");
  };
  const handleValidate = (form: RequestFormSchema) => {
    const activeItems = form.items.filter((x) => x.isActive);
    if (activeItems.length === 0) {
      showWarning("Kindly, add items for your requests.");
      return;
    }

    const formData = FormToApiService.EditPurchaseRequest(
      form,
      requestId || ""
    );
    editRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const bulkErrorItem = err.items;
    if (bulkErrorItem && !!bulkErrorItem?.length && bulkErrorItem.length > 0) {
      showWarning(
        `There are some items that does not have required information`
      );
      return;
    }

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
  const handleRemove = (item: PurchaseItemFormSchema) => {
    const updatedIsActiveItems = requestItems.map((x) => {
      if (x.itemArrayCode === item.itemArrayCode) {
        return {
          ...x,
          isActive: false,
        };
      }

      return x;
    });
    setValue("items", updatedIsActiveItems);
  };
  const handleReviewAction = (
    action:
      | RequestStatusAction.Approve
      | RequestStatusAction.Decline
      | RequestStatusAction.Bacdecline
      | RequestStatusAction.Reapprove
      | ""
  ) => {
    const dataValue = requests?.data?.[0];

    if (!dataValue) {
      throw new Error("no data");
    }

    if (action === RequestStatusAction.Bacdecline) {
      setValue("status", RequestStatus.BACDECLINED);
      setValue("remarks", reviewRemarks);
      handleSubmit(handleValidate, handleValidateError)();
    } else if (action === RequestStatusAction.Reapprove) {
      setValue("status", RequestStatus.APPROVED);
      setValue("remarks", reviewRemarks);
      handleSubmit(handleValidate, handleValidateError)();
    } else if (action === "") {
    } else {
      const isApprove = action === RequestStatusAction.Approve;
      const mayorHasApproved = Boolean(dataValue.is_mayor);
      const reviewer = setReviewerEntityStatus(isApprove, mayorHasApproved);
      const payload = {
        code: dataValue.code,
        ...reviewer,
        remarks: reviewRemarks,
      } as ProcessPurchaseRequestDto;
      processRequest(payload);
    }

    setRemarksVisible(false);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAction = (action: string) => {
    switch (action) {
      case RequestStatusAction.Update:
        handleSubmit(handleValidate, handleValidateError)();
        break;
      case RequestStatusAction.Submit:
        const formValues = getValues();
        formValues.dueDate = new Date(formValues.dueDate);
        formValues.status = RequestStatus.SUBMITTED;
        const formData = FormToApiService.EditPurchaseRequest(
          formValues,
          requestId || ""
        );
        editRequest(formData);
        break;

      case RequestStatusAction.Resubmit:
        const resubmitFormValues = getValues();
        resubmitFormValues.dueDate = new Date(resubmitFormValues.dueDate);
        resubmitFormValues.status = RequestStatus.PENDING;
        const resubmitFormData = FormToApiService.EditPurchaseRequest(
          resubmitFormValues,
          requestId || ""
        );
        editRequest(resubmitFormData);
        break;

      case RequestStatusAction.History:
        const dataValue = requests?.data?.[0];
        if (!dataValue?.code) {
          return;
        }

        getHistory(dataValue?.code);
        setHistorySidebar(true);
        break;
      case RequestStatusAction.ForPrint:
        setValue("status", RequestStatus.FORPRINTING);
        handleSubmit(handleValidate, handleValidateError)();
        break;
      case RequestStatusAction.ContinuePr:
        confirmDialog({
          message:
            "Doing this will resume the purchase request to the most recent office. Are you sure you want to proceed?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            setValue("status", RequestStatus.REVIEW);
            handleSubmit(handleValidate, handleValidateError)();
          },
        });
        break;
      case RequestStatusAction.Print:
        handlePrint();
        break;
      case RequestStatusAction.Delete:
        const formValuesForDelete = getValues();
        const formDataForDelete =
          FormToApiService.DeletePurchaseRequest(formValuesForDelete);
        deleteRequest(formDataForDelete);
        break;
      case RequestStatusAction.Reapprove:
        setRemarksVisible(true);
        setRemarksMode(RequestStatusAction.Reapprove);
        break;
      case RequestStatusAction.Approve:
        setRemarksVisible(true);
        setRemarksMode(RequestStatusAction.Approve);
        break;
      case RequestStatusAction.Decline:
        setRemarksVisible(true);
        setRemarksMode(RequestStatusAction.Decline);
        break;
      case RequestStatusAction.Bacdecline:
        setRemarksVisible(true);
        setRemarksMode(RequestStatusAction.Bacdecline);
        break;
    }
  };
  const handleAddItem = () => {
    setVisible(false);
    handleSubmit(handleValidate, handleValidateError)();
  };

  return {
    requests,
    visible,
    defaultPrItem,
    displayRequestItems,
    formMethod,
    isLoading,
    requestError,
    editError,
    dataEmpty,
    componentRef,
    remarksVisible,
    reviewRemarks,
    remarksMode,
    historySidebar,
    historyData,
    isUpdating,
    isProcessing,
    isDeleting,
    isRestrictedView,
    isAdmin,
    isRequestor,
    isGso,
    setVisible,
    setDefaultPrItem,
    handleAddAnItem,
    handleEdit,
    handleRemove,
    navigate,
    handleSubmit,
    handleValidate,
    handleValidateError,
    setRemarksVisible,
    setReviewRemarks,
    handleReviewAction,
    handleAction,
    getStageReviewers,
    setHistorySidebar,
    handleAddItem,
  };
}
