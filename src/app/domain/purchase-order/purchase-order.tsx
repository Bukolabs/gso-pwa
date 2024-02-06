import { Outlet } from "react-router-dom";
import "./purchase-order";
import { OrderFilterProvider } from "./list-order/order.filter.context";

export function PurchaseOrder() {
  return (
    <div className="purchase-order">
      <OrderFilterProvider>
        <Outlet />
      </OrderFilterProvider>
    </div>
  );
}

export default PurchaseOrder;
