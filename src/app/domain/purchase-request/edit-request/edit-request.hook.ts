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
  const [remarksMode, setRemarksMode] = useState("");

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
      setValue("hasApp", responseData?.has_app);
      setValue("hasPow", responseData?.has_pow);
      setValue("hasBarchart", responseData?.has_bar_chart);
      setValue("hasTechSpec", responseData?.has_tech_spec);
      setValue("hasPlan", responseData?.has_plan);
      setValue("hasQuitClaim", responseData?.has_quit_claim);

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

    const reviewers = getReviewers(stageReviewers);
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
    const updatedIsActiveItems = requestItems.map((x) => {
      if (x.code === item.code) {
        return {
          ...x,
          isActive: false,
        };
      }

      return x;
    });
    setValue("items", updatedIsActiveItems);
  };
  const handleReviewAction = (action: "approve" | "decline") => {
    const dataValue = requests?.data?.[0];

    if (!dataValue) {
      throw new Error("no data");
    }

    const isApprove = action === "approve";
    const mayorHasApproved = Boolean(dataValue.is_mayor);
    const reviewer = setReviewerEntityStatus(isApprove, mayorHasApproved);
    const payload = {
      code: dataValue.code,
      ...reviewer,
      remarks: reviewRemarks,
    } as ProcessPurchaseRequestDto;
    processRequest(payload);
    setRemarksVisible(false);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAction = (action: string) => {
    switch (action) {
      case "Update":
        handleSubmit(handleValidate, handleValidateError)();
        break;
      case "Submit":
        const formValues = getValues();
        formValues.dueDate = new Date(formValues.dueDate);
        const formData = FormToApiService.EditPurchaseRequest(
          formValues,
          requestId || ""
        );
        formData.status = "SUBMITTED";
        editRequest(formData);
        break;
      case "History":
        const dataValue = requests?.data?.[0];
        if (!dataValue?.code) {
          return;
        }

        getHistory(dataValue?.code);
        setHistorySidebar(true);
        break;
      case "Print":
        handlePrint();
        break;
      case "Delete":
        const formValuesForDelete = getValues();
        const formDataForDelete =
          FormToApiService.DeletePurchaseRequest(formValuesForDelete);
        deleteRequest(formDataForDelete);
        break;
      case "Approve":
        setRemarksVisible(true);
        setRemarksMode("approve");
        break;
      case "Decline":
        setRemarksVisible(true);
        setRemarksMode("decline");
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
