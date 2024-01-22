import StorageService from "@shared/services/storage.service";
import { AUTH } from "./settings";
import { LocalAuth } from "@core/model/local-auth";

export function useUserIdentity() {
  const currentUser = StorageService.load(AUTH) as LocalAuth;
  const bacRoles = ["BAC_APRV", `Bids and Awards Committee (Approver)`];
  const reviewerRoles = [
    "MO_APRV",
    "GSO_ADMIN",
    "GSO_APRV",
    "TO_APRV",
    "BO_APRV",
  ];
  const requesterRoles = [
    "REQ",
    `Requestor`,
    "GSO_REQ",
    `General Services Office (Requestor)`,
    "MO_REQ",
    `Mayor's Office (Requestor)`,
    "TO_REQ",
    `Treasurer's Office (Requestor)`,
    "BAC_REQ",
    `Bids and Awards Committee (Requestor)`,
    "BO_REQ",
    `Budget Office (Requestor)`,
  ];

  const isRequestor = requesterRoles.indexOf(currentUser.role_name) >= 0;
  const isBACApprover = bacRoles.indexOf(currentUser.role_name) >= 0;
  const isReviewer = reviewerRoles.indexOf(currentUser.role_name) >= 0;
  const isAdmin = currentUser.role_name === "ADMIN";

  const requestorDepartment = isRequestor ? currentUser.department_code : null;

  return {
    isRequestor,
    isBACApprover,
    isReviewer,
    isAdmin,
    currentUser,
    requestorDepartment,
  };
}
