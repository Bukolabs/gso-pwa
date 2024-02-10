import { addHours, addMilliseconds, format, parseISO } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";
import { SETTINGS } from "./settings";

export const getPhDateTime = (dateTime: string | undefined) => {
  const plus8Hours = dateTime ? addHours(new Date(dateTime), 8) : undefined;
  const date = plus8Hours
    ? format(plus8Hours, SETTINGS.dateTimeFormat)
    : undefined;

  return date;
};

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

export const getLocalizedDateTimeFormatted = (dateTime: Date | undefined) => {
  const date = dateTime ? format(dateTime, SETTINGS.dateTimeFormat) : undefined;

  return date;
};
