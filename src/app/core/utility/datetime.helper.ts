import { addHours, format } from "date-fns";
import { SETTINGS } from "./settings";

export const getPhDateTime = (dateTime: string | undefined) => {
  const plus8Hours = dateTime ? addHours(new Date(dateTime), 8) : undefined;
  const date = plus8Hours
    ? format(plus8Hours, SETTINGS.dateTimeFormat)
    : undefined;

  return date;
};
