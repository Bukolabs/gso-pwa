import {
  GetPrItemDto,
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
} from "@api/api";
import { sumBy } from "lodash-es";

export const getOverallAmount = (data: GetPurchaseOrderDto) => {
  const prItems = (data.purchase_requests || []).map((x) => x.items || []);
  return getTotalAmountOfRequestItem(prItems);
};
export const getOverallAmountByStatus = (
  data: GetPurchaseOrderDto,
  status: string
) => {
  const prItems = (data.purchase_requests || [])
    .filter((x) => x.status_name === status)
    .map((x) => x.items || []);
  return getTotalAmountOfRequestItem(prItems);
};

export const getOverallItems = (data: GetPurchaseOrderDto) => {
  const prItems = (data?.purchase_requests || []).map((x) => x.items || []);
  return getTotalQuantityOfRequestItem(prItems);
};

export const getTotalAmountOfRequestItem = (data: GetPrItemDto[][]) => {
  const overallTotal = data.reduce((value, item) => {
    const amount = sumBy(item || [], (x) => (x.price || 0) * (x.quantity || 0));
    const total = value + amount;
    return total;
  }, 0);
  return overallTotal || 0;
};
export const getTotalQuantityOfRequestItem = (data: GetPrItemDto[][]) => {
  const overallTotal = data.reduce((value, item) => {
    const amount = sumBy(item || [], (x) => x.quantity || 0);
    const total = value + amount;
    return total;
  }, 0);
  return overallTotal || 0;
};

export const getSelectedOrder = (
  data: GetPurchaseOrderDto[],
  requestId: string
) => {
  const requestsList = data[0]?.purchase_requests || [];
  if (requestId && requestsList && (requestsList || []).length > 0) {
    const requestedData = requestsList.filter(
      (item) => item.code === requestId
    );
    return requestedData[0];
  }
};

export const getTotalDeliveredAmount = (data: GetPurchaseRequestDto) => {
  const total = sumBy(data?.delivery || [], (x) => x.total_amount || 0);
  return total;
};

export const getTotalDeliveredQuantity = (data: GetPurchaseRequestDto) => {
  const total = sumBy(data?.delivery || [], (x) => x.total_quantity || 0);
  return total;
};
