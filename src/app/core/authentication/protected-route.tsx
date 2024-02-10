import { AUTH } from "@core/utility/settings";
import StorageService from "@shared/services/storage.service";
import { isAfter } from "date-fns";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LocalAuth } from "@core/model/local-auth";
import { getLocalizedDateTime } from "@core/utility/datetime.helper";

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
  const localizedExpiredTime = getLocalizedDateTime(serverExpiry) as Date;
  const currentDate = new Date();
  const isAuthValid = isAfter(localizedExpiredTime, currentDate);

  if (!user || !isAuthValid) {
    return <Navigate to="/login" />;
  }

  if (location.pathname === "/" && user.role_name === "REQ") {
    return <Navigate to="/rhome" />;
  }

  return <div>{children}</div>;
}
