import {
  useGetRequestByIdQy,
  useProcessReceivedRequestQy,
} from "@core/query/request.query";
import "./received-info.scss";
import { useNavigate, useParams } from "react-router";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import {
  PurchaseRequestControllerGetDataAsList200Response,
  ReceivePurchaseRequestDto,
} from "@api/api";

export function ReceivedInfo() {
  const { showSuccess } = useNotificationContext();
  const navigate = useNavigate();
  const { requestId } = useParams();

  const handleReceiveSuccess = () => {
    showSuccess("Request is successfully received");
    navigate(`../${requestId}`);
  };
  const { mutate: recieveRequest } =
    useProcessReceivedRequestQy(handleReceiveSuccess);

  const handleGetApiSuccess = (
    data: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const requestData = data.data?.[0];
      let receiver = {};
      switch (requestData?.reviewer) {
        case "CGSO":
          receiver = { is_gso_received: true };
          break;
        case "CTO":
          receiver = { is_treasurer_received: true };
          break;
        case "CMO":
          receiver = { is_mayor_received: true };
          break;
        case "CGSO_FF":
          receiver = { is_gso_ff_received: true };
          break;
        case "CBO":
          receiver = { is_budget_received: true };
          break;
      }

      const received = {
        code: requestData?.code || "",
        ...receiver,
      } as ReceivePurchaseRequestDto;

      console.log("receiving request...", { received });
      recieveRequest(received);
    }
  };

  useGetRequestByIdQy(requestId || "", handleGetApiSuccess);

  return (
    <div className="received-info">
      <div className="p-7 flex justify-center items-center flex-col h-screen">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        <h1>Receiving Purchase Request</h1>
        <small>Please wait while we are processing the request</small>
      </div>
    </div>
  );
}

export default ReceivedInfo;
