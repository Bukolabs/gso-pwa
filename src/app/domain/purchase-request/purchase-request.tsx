import "./purchase-request";
import { Outlet } from "react-router-dom";

export function PurchaseRequest() {
  return (
    <div className="purchase-request">
      <Outlet />
    </div>
  );
}

export default PurchaseRequest;
