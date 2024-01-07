import { GetPurchaseRequestDto } from "@api/api";
import { LocalAuth } from "@core/model/local-auth";
import { useGetRoleQy } from "@core/query/account.query";
import { AUTH } from "@core/utility/settings";
import { LabelValue } from "@shared/models/label-value.interface";
import StorageService from "@shared/services/storage.service";

export function useReviewHook() {
  const { data: roles } = useGetRoleQy();

  const setReviewerStatus = (roleName: string, status: boolean) => {
    switch (roleName) {
      case "MO":
        return {
          is_mayor: status,
        };
      case "GSO":
        return {
          is_gso: status,
        };
      case "TO":
        return {
          is_treasurer: status,
        };
      case "BO":
        return {
          is_budget: status,
        };

      default:
        return {
          is_mayor: false,
          is_gso: false,
          is_treasurer: false,
          is_budget: false,
        };
    }
  };

  const setReviewerEntityStatus = (status: boolean) => {
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
    const reviewer = setReviewerStatus(currentRole?.name || "", status);
    return reviewer;
  };

  const getReviewers = (data?: GetPurchaseRequestDto) => {
    if (!data) {
      return [];
    }

    const gso = {
      label: "CGSO",
      value:
        data.is_gso === null
          ? ""
          : Boolean(data.is_gso)
          ? "pi pi-check"
          : "pi pi-times",
    };
    const treasurer = {
      label: "CTO",
      value:
        data.is_treasurer === null
          ? ""
          : Boolean(data.is_treasurer)
          ? "pi pi-check"
          : "pi pi-times",
    };
    const mayor = {
      label: "CMO",
      value:
        data.is_mayor === null
          ? ""
          : Boolean(data.is_mayor)
          ? "pi pi-check"
          : "pi pi-times",
    };
    const budget = {
      label: "CBO",
      value:
        data.is_budget === null
          ? ""
          : Boolean(data.is_budget)
          ? "pi pi-check"
          : "pi pi-times",
    };
    const gsoff = {
      label: "CGSO_2",
      value:
        data.is_gso_ff === null
          ? ""
          : Boolean(data.is_budget)
          ? "pi pi-check"
          : "pi pi-times",
    };
    const reviewers = [gso, treasurer, mayor, budget, gsoff];
    return reviewers as LabelValue[];
  };

  return {
    setReviewerEntityStatus,
    getReviewers,
  };
}
