import { AUTH } from "@core/utility/settings";
import StorageService from "@shared/services/storage.service";
import { addMilliseconds, isAfter, parseISO } from "date-fns";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getTimezoneOffset } from "date-fns-tz";
import { LocalAuth } from "@core/model/local-auth";

interface ProtectedRouteProps {
  children: ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = StorageService.load(AUTH) as LocalAuth;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const serverExpiry = user.oauth_expiry;
  const parsedExpiryDate = parseISO(serverExpiry);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneOffset = getTimezoneOffset(timezone);
  const localizedExpiryTime = addMilliseconds(parsedExpiryDate, timeZoneOffset);
  const currentDate = new Date();
  const isAuthValid = isAfter(localizedExpiryTime, currentDate);

  console.log({
    isAuthValid,
    localizedExpiryTime,
    currentDate,
    parsedExpiryDate,
  });

  // if (!user || !isAuthValid) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (location.pathname === "/" && user.role_name === "REQ") {
    return <Navigate to="/rhome" />;
  }

  return <div>{children}</div>;
}
