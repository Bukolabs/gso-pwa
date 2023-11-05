import "./purchase-request";
import { Outlet } from "react-router-dom";

/* eslint-disable-next-line */
export interface PurchaseRequestProps {}

export function PurchaseRequest() {
  return (
    <div className="purchase-request">
      <Outlet />
    </div>
  );
}

export default PurchaseRequest;
