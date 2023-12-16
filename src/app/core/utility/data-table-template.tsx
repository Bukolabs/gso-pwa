import { currencyFormat } from "@shared/formats/currency-format";
import { SETTINGS } from "./settings";
import { format } from "date-fns";
import { Tag } from "primereact/tag";
import classNames from "classnames";
import { getStatusStyle } from "./get-status-style";
import { numberFormat } from "@shared/formats/number-format";

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

export const tagTemplate = (tag: string, stage = 1) => {
  return <Tag value={tag} className={classNames(getStatusStyle(stage))} />;
};
