import { RequestFilterProvider } from "./list-request/request-filter.context";
import "./purchase-request";
import { Outlet } from "react-router-dom";

export function PurchaseRequest() {
  return (
    <div className="purchase-request">
      <RequestFilterProvider>
        <Outlet />
      </RequestFilterProvider>
    </div>
  );
}

export default PurchaseRequest;
