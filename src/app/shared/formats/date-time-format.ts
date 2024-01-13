import { SETTINGS } from "@core/utility/settings";
import { format } from "date-fns";

export function format12HourWithUTC(date: string) {
  if (!date || date === "") return "";

  const withUTC = `${date} UTC`;
  const newDateFormat = new Date(withUTC);

  const newDate = format(newDateFormat, "yyyy/MM/dd h:mm a");
  return newDate;
}

export const dateFormat = (date?: string) => {
  const displayDate = date ? format(new Date(date), SETTINGS.dateFormat) : "-";
  return displayDate;
};
