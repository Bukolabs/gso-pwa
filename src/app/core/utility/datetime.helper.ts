import { addMilliseconds, format, parseISO } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";
import { SETTINGS } from "./settings";

export const getLocalizedDateTime = (dateTime: string | undefined) => {
  if (!dateTime) {
    return undefined;
  }

  const parsedDate = parseISO(dateTime);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneOffset = getTimezoneOffset(timezone);
  const localizedTime = addMilliseconds(parsedDate, timeZoneOffset);

  return localizedTime;
};

export const getFormattedLocalizedDateTime = (dateTime: Date | undefined) => {
  const date = dateTime ? format(dateTime, SETTINGS.dateTimeFormat) : undefined;

  return date;
};
