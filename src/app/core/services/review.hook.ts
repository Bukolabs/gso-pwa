import { GetPurchaseRequestDto } from "@api/api";
import { LocalAuth } from "@core/model/local-auth";
import { useGetRoleQy } from "@core/query/account.query";
import { AUTH } from "@core/utility/settings";
import { LabelValue } from "@shared/models/label-value.interface";
import StorageService from "@shared/services/storage.service";

export function useReviewHook() {
  const { data: roles } = useGetRoleQy();

  const identifyReviewer = (roleName: string) => {
    switch (roleName) {
      case "MO":
        return {
          is_mayor: true,
        };
      case "GSO":
        return {
          is_gso: true,
        };
      case "TO":
        return {
          is_treasurer: true,
        };
      case "BO":
        return {
          is_budget: true,
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

  const getReviewerEntity = () => {
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
    const reviewer = identifyReviewer(currentRole?.name || "");
    return reviewer;
  };

  const getReviewers = (data?: GetPurchaseRequestDto) => {
    if (!data) {
      return [];
    }

    const gso = {
      label: "CGSO",
      value: data.is_gso ? "pi pi-check" : "-",
    };
    const treasurer = {
      label: "CTO",
      value: data.is_treasurer ? "pi pi-check" : "-",
    };
    const mayor = {
      label: "CMO",
      value: data.is_mayor ? "pi pi-check" : "-",
    };
    const budget = {
      label: "CBO",
      value: data.is_budget ? "pi pi-check" : "-",
    };
    const reviewers = [gso, treasurer, mayor, budget];
    return reviewers as LabelValue[];
  };

  return {
    getReviewerEntity,
    getReviewers,
  };
}
