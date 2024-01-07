import { Outlet } from "react-router-dom";
import "./purchase-order";

export function PurchaseOrder() {
  return (
    <div className="purchase-order">
      <Outlet />
    </div>
  );
}

export default PurchaseOrder;
