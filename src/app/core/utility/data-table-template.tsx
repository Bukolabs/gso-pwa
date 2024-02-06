import { currencyFormat } from "@shared/formats/currency-format";
import { SETTINGS } from "./settings";
import { format } from "date-fns";
import { Tag } from "primereact/tag";
import classNames from "classnames";
import { getStatusStyle } from "./get-status-style";
import { numberFormat } from "@shared/formats/number-format";
import { GetPurchaseRequestDto } from "@api/api";
import { sumBy } from "lodash-es";

export const currencyTemplate = (data?: number) => {
  const formatted = !!data ? currencyFormat(data, "PHP") : "-";
  return <b>{formatted}</b>;
};

export const numberTemplate = (data?: number, minimumFractionDigits = 0) => {
  const formatted = !!data ? numberFormat(data, minimumFractionDigits) : "-";
  return <b>{formatted}</b>;
};

export const dateTemplate = (date?: string) => {
  const displayDate = date ? format(new Date(date), SETTINGS.dateFormat) : "-";
  return <div>{displayDate}</div>;
};

export const tagTemplate = (tag: string) => {
  return <Tag value={tag || "-"} className={classNames(getStatusStyle(tag))} />;
};

export const getTotalAmount = (data: GetPurchaseRequestDto) => {
  const total = sumBy(data?.items || [], (x) => x.price * (x.quantity || 0));
  return total;
};
export const getTotalItemsQuantity = (data: GetPurchaseRequestDto) => {
  const total = sumBy(data?.items || [], (x) => x.quantity || 0);
  return total;
};
export const totalAmountColumn = (data: GetPurchaseRequestDto) => {
  const total = getTotalAmount(data);
  return currencyTemplate(total);
};
export const totalItemsColumn = (data: GetPurchaseRequestDto) => {
  const total = getTotalItemsQuantity(data);
  return numberTemplate(total);
};
