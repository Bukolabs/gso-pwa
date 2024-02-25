import {
  useGetRequestByIdQy,
  useProcessReceivedRequestQy,
} from "@core/query/request.query";
import "./received-info.scss";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useCallback, useEffect } from "react";
import { ReceivePurchaseRequestDto } from "@api/api";
import { RequestStatusAction } from "@core/model/request-status.enum";

export function ReceivedInfo() {
  const { showSuccess } = useNotificationContext();
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [searchParams] = useSearchParams();
  const prAction = searchParams.get("action");
  const { data: requests } = useGetRequestByIdQy(requestId || "");
  const requestData = requests?.data?.[0];

  const handleReceiveSuccess = () => {
    showSuccess("Request is successfully received");
    navigate(`../${requestId}`);
  };
  const { mutate: recieveRequest, isLoading } =
    useProcessReceivedRequestQy(handleReceiveSuccess);

  const receivePrAction = useCallback(() => {
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

    recieveRequest(received);
  }, [recieveRequest, requestData]);

  useEffect(() => {
    if (!!requestData && prAction === RequestStatusAction.Received) {
      receivePrAction();
    }
  }, [prAction, requestData, receivePrAction]);

  return (
    <div className="received-info">
      <div className="p-7 flex justify-center items-center flex-col h-screen">
        {!isLoading ? (
          <>
            <h1>Purchase Request is received</h1>
            <small>You will be redirected shortly. Please wait.</small>
          </>
        ) : (
          <>
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
            <h1>Receiving Purchase Request</h1>
            <small>Please wait while we are processing the request</small>
          </>
        )}
      </div>
    </div>
  );
}

export default ReceivedInfo;
