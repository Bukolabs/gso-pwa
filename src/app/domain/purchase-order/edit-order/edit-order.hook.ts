import {
  GetPurchaseRequestDto,
  PurchaseOrderControllerGetDataAsList200Response,
} from "@api/api";
import { orderFormDefault } from "@core/model/form.default";
import {
  OrderFormRule,
  OrderFormSchema,
  RequestInOrderFormSchema,
} from "@core/model/form.rule";
import { confirmDialog } from "primereact/confirmdialog";
import { useEditOrderQy, useGetOrderByIdQy } from "@core/query/order.query";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useRef, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SETTINGS } from "@core/utility/settings";
import { format } from "date-fns";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { RequestStatus } from "@core/model/request-status.enum";

export function useEditOrder() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { showSuccess, showError, hideProgress, showWarning } =
    useNotificationContext();
  const { orderId } = useParams();
  const [dataEmpty, setDataEmpty] = useState(false);
  const componentRef = useRef(null);

  const [selectedRequests, setSelectedRequests] = useState<
    GetPurchaseRequestDto[]
  >([]);

  const handleBack = () => {
    navigate("../");
  };

  // EDIT REQUEST API
  const handleApiSuccess = () => {
    showSuccess("Request updated");
    handleBack();
  };
  const { mutate: editOrder, isError: editError } =
    useEditOrderQy(handleApiSuccess);

  // UNCACHED, GET API VALUES
  // GET REQUEST API
  const handleGetApiSuccess = (
    data: PurchaseOrderControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("pono", responseData?.po_no);
      setValue("resolutionNo", responseData?.resolution_no || "");
      setValue(
        "poDate",
        responseData?.po_date
          ? (format(
              new Date(responseData?.po_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("category", responseData?.category || "");
      setValue("procurementMode", responseData?.mode_of_procurement || "");
      setValue("deliveryAddress", responseData?.delivery_location || "");
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

      const requestInForm = requestListToForm(
        responseData?.purchase_requests || [],
        responseData?.po_no || ""
      );
      setValue("requests", requestInForm);

      setSelectedRequests(responseData?.purchase_requests || []);

      hideProgress();
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: orders,
    isLoading,
    isError: orderError,
  } = useGetOrderByIdQy(orderId || "", handleGetApiSuccess);

  const formMethod = useForm<OrderFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: orderFormDefault,
    resolver: zodResolver(OrderFormRule),
  });
  const { handleSubmit, setValue, watch, getValues } = formMethod;
  const category = watch("category");

  const handleValidate = (form: OrderFormSchema) => {
    const formData = FormToApiService.EditOrderRequest(form, orderId || "");
    editOrder(formData);
  };
  const handleValidateError = (err: FieldErrors<OrderFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleSelectedRequests = (requests: GetPurchaseRequestDto[]) => {
    const poNo = getValues("pono");
    if (!poNo) {
      showWarning(
        "No Purchase Order number is supplied. Please supply it first"
      );
      return;
    }

    setSelectedRequests(requests);
    const requestListForm = requestListToForm(requests, poNo);
    setValue("requests", requestListForm);
  };
  const requestListToForm = (
    requests: GetPurchaseRequestDto[],
    poNumber: string
  ) =>
    requests.map(
      (item) =>
        ({
          code: item.po_pr_code,
          purchaseRequest: item.code || "",
          purchaseOrder: orderId || "",
          isActive: true,
        } as RequestInOrderFormSchema)
    );
  const handleUpdateStatus = (status: RequestStatus) => {
    const formValues = getValues();
    formValues.poDate = new Date(formValues.poDate);
    formValues.deliveryDate = new Date(formValues.deliveryDate);
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

        if (!supplier) {
          showWarning(
            "No supplier information has been entered yet. Kindly, enter supplier information in the Supplier Tab"
          );
          return;
        }

        confirmDialog({
          message: `You are about to award this order to ${supplier}. Once you submit you can't edit or change the information`,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            handleUpdateStatus(RequestStatus.AWARDED);
          },
          reject: () => {},
        });
        break;
      case "PO Review":
        handleUpdateStatus(RequestStatus.POREVIEW);
        break;
    }
  };

  return {
    formMethod,
    orders,
    isLoading,
    orderError,
    dataEmpty,
    visible,
    editError,
    category,
    selectedRequests,
    componentRef,
    navigate,
    setVisible,
    handleSelectedRequests,
    handleAction,
  };
}
