import { LocalAuth } from "@core/model/local-auth";
import { useGetRoleQy } from "@core/query/account.query";
import { AUTH } from "@core/utility/settings";
import { LabelValue } from "@shared/models/label-value.interface";
import StorageService from "@shared/services/storage.service";

export interface ReviewerStatus {
  isGso?: boolean;
  isGsoFF?: boolean;
  isTreasurer?: boolean;
  isMayor?: boolean;
  isBudget?: boolean;
}

export function useReviewHook() {
  const { data: roles } = useGetRoleQy();

  const setReviewerStatus = (
    roleName: string,
    status: boolean,
    budgetStatus: boolean = false
  ) => {
    switch (roleName) {
      case "MO_APRV":
        return {
          is_mayor: status,
        };
      case "GSO_ADMIN":
      case "GSO_APRV":
        if (budgetStatus) {
          return {
            is_gso_ff: status,
          };
        }

        return {
          is_gso: status,
        };
      case "TO_APRV":
        return {
          is_treasurer: status,
        };
      case "BO_APRV":
        return {
          is_budget: status,
        };

      default:
        return {
          is_mayor: false,
          is_gso: false,
          is_treasurer: false,
          is_budget: false,
          is_gso_ff: false,
        };
    }
  };

  const setReviewerEntityStatus = (
    status: boolean,
    budgetStatus: boolean = false
  ) => {
    const currentUser = StorageService.load(AUTH) as LocalAuth;
    const currentRoleId = currentUser.role_code;

    if (roles?.data?.length === 0) {
      throw new Error("no roles available");
    }

    const roleList = roles?.data;
    const filteredRole = (roleList || []).filter(
      (item) => item.code === currentRoleId
    );
    const currentRole = filteredRole?.length > 0 ? filteredRole[0] : undefined;

    console.log("getReviewerEntity", { currentRole });
    const reviewer = setReviewerStatus(
      currentRole?.name || "",
      status,
      budgetStatus
    );
    return reviewer;
  };

  const getReviewers = (data?: ReviewerStatus) => {
    if (!data) {
      return [];
    }

    const gso =
      data.isGso === undefined
        ? null
        : {
            label: "CGSO",
            value:
              data.isGso === null
                ? ""
                : Boolean(data.isGso)
                ? "pi pi-check"
                : "pi pi-times",
          };
    const treasurer =
      data.isTreasurer === undefined
        ? null
        : {
            label: "CTO",
            value:
              data.isTreasurer === null
                ? ""
                : Boolean(data.isTreasurer)
                ? "pi pi-check"
                : "pi pi-times",
          };
    const mayor =
      data.isMayor === undefined
        ? null
        : {
            label: "CMO",
            value:
              data.isMayor === null
                ? ""
                : Boolean(data.isMayor)
                ? "pi pi-check"
                : "pi pi-times",
          };
    const budget =
      data.isBudget === undefined
        ? null
        : {
            label: "CBO",
            value:
              data.isBudget === null
                ? ""
                : Boolean(data.isBudget)
                ? "pi pi-check"
                : "pi pi-times",
          };
    const gsoff =
      data.isGsoFF === undefined
        ? null
        : {
            label: "CGSO",
            value:
              data.isGsoFF === null
                ? ""
                : Boolean(data.isGsoFF)
                ? "pi pi-check"
                : "pi pi-times",
          };
    const reviewers = [gso, treasurer, mayor, budget, gsoff];
    const filteredReviewers = reviewers.filter((x) => !!x);
    return filteredReviewers as LabelValue[];
  };

  return {
    setReviewerEntityStatus,
    getReviewers,
  };
}
