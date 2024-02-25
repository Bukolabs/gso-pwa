import "./received-po-info.scss";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQy, useReceiveOrderQy } from "@core/query/order.query";
import {
  PurchaseOrderControllerGetDataAsList200Response,
  ReceivePurchaseOrderDto,
} from "@api/api";

export function ReceivedPoInfo() {
  const { showSuccess } = useNotificationContext();
  const navigate = useNavigate();
  const { orderId } = useParams();

  // PROCESS ORDER API
  const handleReceiveSuccess = () => {
    showSuccess("Order is successfully received");
    navigate(`../${orderId}`);
  };
  const { mutate: receiveOrder } = useReceiveOrderQy(handleReceiveSuccess);

  // GET ORDER API
  const handleGetApiSuccess = (
    data: PurchaseOrderControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const orderData = data.data?.[0];
      let receiver = {};
      switch (orderData?.reviewer) {
        case "CGSO":
          receiver = { is_gso_received: true };
          break;
        case "CTO":
          receiver = { is_treasurer_received: true };
          break;
        case "CMO":
          receiver = { is_mayor_received: true };
          break;
      }

      const received = {
        code: orderData?.code || "",
        ...receiver,
      } as ReceivePurchaseOrderDto;

      receiveOrder(received);
    }
  };
  useGetOrderByIdQy(orderId || "", true, handleGetApiSuccess);

  return (
    <div className="received-po-info">
      <div className="p-7 flex justify-center items-center flex-col h-screen">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        <h1>Receiving Purchase Order</h1>
        <small>Please wait while we are processing the order</small>
      </div>
    </div>
  );
}

export default ReceivedPoInfo;
