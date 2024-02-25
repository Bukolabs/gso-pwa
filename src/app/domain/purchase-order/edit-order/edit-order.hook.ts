import {
  GetPurchaseRequestDto,
  ProcessPurchaseOrderDto,
  PurchaseOrderControllerGetDataAsList200Response,
} from "@api/api";
import { OrderFormRule, OrderFormSchema } from "@core/model/form.rule";
import { confirmDialog } from "primereact/confirmdialog";
import {
  useDeleteOrderQy,
  useDeletePurchaseRequestInOrderQy,
  useEditOrderQy,
  useGetOrderByIdQy,
  useProcessOrderQy,
} from "@core/query/order.query";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useRef, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SETTINGS } from "@core/utility/settings";
import { format } from "date-fns";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import { useReactToPrint } from "react-to-print";
import { useEditRequestQy } from "@core/query/request.query";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { usePurchaseHistory } from "@core/ui/purchase-history/purchase-history.hook";
import { getOrderFormDefault } from "@core/model/get-form.default";
import { shouldShowBidder } from "@core/utility/stage-helper";
import { useQueryClient } from "react-query";
import { QueryKey } from "@core/query/query-key.enum";
import { Reviewer } from "@core/model/reviewer.enum";

export function useEditOrder() {
  const { historyData, getHistory } = usePurchaseHistory(true);
  const [historySidebar, setHistorySidebar] = useState(false);
  const queryClient = useQueryClient();
  const {
    setReviewerEntityStatus,
    getReviewers,
    getOrderPhaseReviewerStateSymbol,
  } = useReviewHook();
  const navigate = useNavigate();
  const { showSuccess, showError, hideProgress, showWarning } =
    useNotificationContext();
  const { orderId } = useParams();
  const [dataEmpty, setDataEmpty] = useState(false);
  const [remarksVisible, setRemarksVisible] = useState(false);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [remarksMode, setRemarksMode] = useState("");

  const [selectedRequests, setSelectedRequests] = useState<
    GetPurchaseRequestDto[]
  >([]);
  const [originalRequests, setOriginalRequests] = useState<
    GetPurchaseRequestDto[]
  >([]);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleBack = () => {
    navigate("../");
  };

  // DELETE PR IN ORDER API
  const handleDeleteRequestInPoApiSuccess = () => {
    showSuccess("PR removed from PO successfully");
  };
  const { mutate: deleteRequestInPo } = useDeletePurchaseRequestInOrderQy(
    orderId || "",
    handleDeleteRequestInPoApiSuccess
  );

  // DELETE ORDER API
  const handleDeleteApiSuccess = () => {
    showSuccess("Order deleted successfully");
    handleBack();
  };
  const { mutate: deleteRequest, isLoading: isDeleting } = useDeleteOrderQy(
    handleDeleteApiSuccess
  );

  // EDIT REQUEST API
  const handleRequestApiSuccess = () => {
    showSuccess("Request updated");
    queryClient.invalidateQueries([QueryKey.Order, orderId]);
  };
  const { mutate: editRequest, isLoading: isUpdatingRequest } =
    useEditRequestQy(handleRequestApiSuccess);

  // PROCESS ORDER API
  const handleProcessSuccess = () => {
    showSuccess("Order status is changed successfully");
    handleBack();
  };
  const { mutate: processOrder, isLoading: isProcessing } =
    useProcessOrderQy(handleProcessSuccess);

  // EDIT ORDER API
  const handleApiSuccess = () => {
    showSuccess("Request updated");
    queryClient.invalidateQueries([QueryKey.Order, orderId]);
  };
  const {
    mutate: editOrder,
    isError: editError,
    isLoading: isUpdating,
  } = useEditOrderQy(handleApiSuccess);

  // UNCACHED, GET API VALUES
  // GET ORDER API
  const handleGetApiSuccess = (
    data: PurchaseOrderControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("code", responseData?.code);
      setValue("pono", responseData?.po_no);
      setValue(
        "poDate",
        responseData?.po_date
          ? (format(
              new Date(responseData?.po_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("resolutionNo", responseData?.resolution_no || "");
      setValue("procurementMode", responseData?.mode_of_procurement || "");
      setValue("category", responseData?.category || "");
      setValue("categoryName", responseData?.category_name || "");
      setValue("deliveryAddress", responseData?.delivery_location || "");
      setValue("paymentTerm", responseData?.payment_term || "");
      setValue(
        "deliveryDate",
        responseData?.delivery_date
          ? (format(
              new Date(responseData?.delivery_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("deliveryTerm", responseData?.delivery_term || "");
      setValue("supplier", responseData?.supplier || "");
      setValue("address", responseData?.address || "");
      setValue("email", responseData?.email || "");
      setValue("phone", responseData?.contact_no || "");
      setValue("tin", responseData?.tin || "");
      setValue("iar", responseData?.iar_no || "");
      setValue(
        "iarDate",
        responseData?.iar_date
          ? (format(
              new Date(responseData?.iar_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("invoice", responseData?.invoice_no || "");
      setValue(
        "invoiceDate",
        responseData?.invoice_date
          ? (format(
              new Date(responseData?.invoice_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("rfqNumber", responseData?.rfq_no || "");
      setValue("itbNumber", responseData?.itb_no || "");

      const requestInForm = ApiToFormService.MapOrderRequestsToForm(
        responseData?.purchase_requests || [],
        orderId || ""
      );
      setValue("requests", requestInForm);
      setValue("signatoryName1", responseData?.signatory_name_1 || "");
      setValue("signatoryName2", responseData?.signatory_name_2 || "");
      setValue("signatoryOffice1", responseData?.signatory_office_1 || "");
      setValue("signatoryOffice2", responseData?.signatory_office_2 || "");
      setValue("endUserName1", responseData?.end_user_name || "");
      setValue("endUserOffice1", responseData?.end_user_office || "");

      setSelectedRequests(responseData?.purchase_requests || []);
      setOriginalRequests(responseData?.purchase_requests || []);
      hideProgress();
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: orders,
    isLoading,
    isError: orderError,
  } = useGetOrderByIdQy(orderId || "", !!orderId, handleGetApiSuccess);
  const orderData = orders?.data?.[0];
  const status = orders?.data?.[0]?.status_name;
  const procurement = orders?.data?.[0]?.mode_of_procurement;

  const shouldShowBidderDisplay = shouldShowBidder(status);

  const getStageReviewers = () => {
    if (!orderData) {
      return [];
    }

    const reviewers = getReviewers({
      isGso: getOrderPhaseReviewerStateSymbol(Reviewer.CGSO, orderData),
      isTreasurer: getOrderPhaseReviewerStateSymbol(Reviewer.CTO, orderData),
      isMayor: getOrderPhaseReviewerStateSymbol(Reviewer.CMO, orderData),
    } as ReviewerStatus);

    return reviewers;
  };

  const formMethod = useForm<OrderFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getOrderFormDefault(orders?.data?.[0]),
    resolver: zodResolver(OrderFormRule),
  });
  const { handleSubmit, setValue, watch, getValues } = formMethod;
  const category = watch("category");

  const handleValidate = (form: OrderFormSchema) => {
    if (form.requests.length === 0) {
      showWarning("Kindly, add requests for your orders");
      return;
    }

    handleRequestDifferences(form);

    const formData = FormToApiService.EditOrderRequest(form, orderId || "");
    editOrder(formData);
  };
  const handleValidateError = (err: FieldErrors<OrderFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };
  const handleRequestDifferences = (form: OrderFormSchema) => {
    const prCards = form.requests;
    const prCardsCode = prCards.map((item) => item.code);
    const removedPrs = originalRequests.filter(
      (original) => !prCardsCode.includes(original.po_pr_code)
    );

    if (removedPrs.length > 0) {
      const removedPrs = originalRequests.filter(
        (original) => !prCardsCode.includes(original.po_pr_code)
      );
      removedPrs.forEach((item) => {
        const deleteForm = FormToApiService.DeletePurchaseRequestInPo(item);
        deleteRequestInPo(deleteForm);
      });
    }
  };

  const handleSelectedRequests = (requests: GetPurchaseRequestDto[]) => {
    setSelectedRequests(requests);
    const requestListForm = ApiToFormService.MapOrderRequestsToForm(
      requests,
      orderId || ""
    );
    setValue("requests", requestListForm);
  };
  const handleUpdateStatus = (status: RequestStatus) => {
    const formValues = getValues();
    formValues.poDate = formValues.poDate
      ? new Date(formValues?.poDate)
      : undefined;
    formValues.deliveryDate = formValues.deliveryDate
      ? new Date(formValues.deliveryDate)
      : null;
    formValues.iarDate = formValues.iarDate
      ? new Date(formValues.iarDate)
      : null;
    formValues.invoiceDate = formValues.invoiceDate
      ? new Date(formValues.invoiceDate)
      : null;

    const formData = FormToApiService.EditOrderRequest(
      formValues,
      orderId || ""
    );
    formData.status = status;
    editOrder(formData);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "Update":
        handleSubmit(handleValidate, handleValidateError)();
        break;
      case "Post":
        handleUpdateStatus(RequestStatus.POSTED);
        break;
      case "Bid":
        handleUpdateStatus(RequestStatus.BIDDING);
        break;
      case "Award":
        const supplier = getValues("supplier");
        const requests = getValues("requests");

        if (requests.length === 0) {
          showWarning(
            "No purchase requests in your current purchase order. Don't forget to add one."
          );
          return;
        }

        if (!supplier) {
          showWarning(
            "No supplier information has been entered yet. Kindly, enter supplier information in the Supplier Tab"
          );
          return;
        }

        confirmDialog({
          message: `You are about to award this order to ${supplier}. Once you submit you can't edit or change the information. Are you sure you want to continue?`,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            handleUpdateStatus(RequestStatus.AWARDED);
          },
          reject: () => {},
        });
        break;

      case "Review":
        handleUpdateStatus(RequestStatus.POREVIEW);
        break;
      case "Approve":
        setRemarksVisible(true);
        setRemarksMode("approve");
        break;
      case "Decline":
        setRemarksVisible(true);
        setRemarksMode("decline");
        break;
      case "Inspect":
        handleUpdateStatus(RequestStatus.INSPECTION);
        break;
      case "Print":
        handlePrint();
        break;
      case "History":
        const dataValue = orders?.data?.[0];
        if (!dataValue?.code) {
          return;
        }

        getHistory(dataValue?.code);
        setHistorySidebar(true);
        break;

      case "Delete":
        const formValuesForDelete = getValues();
        const formDataForDelete =
          FormToApiService.DeleteOrderRequest(formValuesForDelete);
        deleteRequest(formDataForDelete);
        break;
    }
  };
  const handlePrAction = (action: string, item: GetPurchaseRequestDto) => {
    let newStatus = RequestStatus.PARTIAL;
    switch (action) {
      case RequestStatusAction.Complete:
        newStatus = RequestStatus.COMPLETED;
        break;
    }

    const editSchema = ApiToFormService.MapPurchaseRequestToForm(item);
    const formData = FormToApiService.EditPurchaseRequest(
      editSchema,
      item.code
    );
    formData.status = newStatus;
    editRequest(formData);
  };
  const handleReviewAction = (action: "approve" | "decline") => {
    const dataValue = orders?.data?.[0];

    if (!dataValue) {
      throw new Error("no data");
    }

    const isApprove = action === "approve";
    const reviewer = setReviewerEntityStatus(isApprove, false);
    const payload = {
      code: dataValue.code,
      ...reviewer,
      remarks: reviewRemarks,
    } as ProcessPurchaseOrderDto;
    processOrder(payload);
    setRemarksVisible(false);
  };

  return {
    formMethod,
    orders,
    isLoading,
    orderError,
    dataEmpty,
    editError,
    category,
    selectedRequests,
    componentRef,
    remarksVisible,
    remarksMode,
    reviewRemarks,
    historyData,
    historySidebar,
    isDeleting,
    isUpdatingRequest,
    isProcessing,
    isUpdating,
    status,
    procurement,
    shouldShowBidderDisplay,
    getStageReviewers,
    navigate,
    handleSelectedRequests,
    handleAction,
    handlePrAction,
    setRemarksVisible,
    setRemarksMode,
    setReviewRemarks,
    handleReviewAction,
    setHistorySidebar,
  };
}
