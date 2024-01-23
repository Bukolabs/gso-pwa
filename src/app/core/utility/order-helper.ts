import { GetPurchaseOrderDto } from "@api/api";
import { sumBy } from "lodash-es";

export const getOverallTotalAmount = (data: GetPurchaseOrderDto) => {
  const prItems = data?.purchase_requests?.map((x) => x.items);
  const overallTotal = prItems?.reduce((value, item) => {
    const amount = sumBy(item || [], (x) => (x.price || 0) * (x.quantity || 0));
    const total = value + amount;
    return total;
  }, 0);
  return overallTotal || 0;
};
export const getOrderTotalAmount = (data: GetPurchaseOrderDto) => {
  const prItems = data?.purchase_requests?.map((x) => x.items)[0];
  const total = sumBy(prItems || [], (x) => (x.price || 0) * (x.quantity || 0));
  return total;
};
export const getOrderTotalItems = (data: GetPurchaseOrderDto) => {
  const prItems = data?.purchase_requests?.map((x) => x.items)[0];
  const total = sumBy(prItems || [], (x) => x.quantity || 0);
  return total;
};
