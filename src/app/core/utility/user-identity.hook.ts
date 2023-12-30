import StorageService from "@shared/services/storage.service";
import { AUTH } from "./settings";
import { LocalAuth } from "@core/model/local-auth";

export function useUserIdentity() {
  const currentUser = StorageService.load(AUTH) as LocalAuth;

  const isRequestor = currentUser.role_name === "Requestor";
  const requestorDepartment = isRequestor ? currentUser.department_code : null;

  return {
    currentUser,
    isRequestor,
    requestorDepartment,
  };
}
