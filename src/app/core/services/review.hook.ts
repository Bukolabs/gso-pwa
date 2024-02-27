import { GetPurchaseOrderDto, GetPurchaseRequestDto } from "@api/api";
import { LocalAuth } from "@core/model/local-auth";
import { Reviewer } from "@core/model/reviewer.enum";
import { useGetRoleQy } from "@core/query/account.query";
import { AUTH } from "@core/utility/settings";
import { LabelValue } from "@shared/models/label-value.interface";
import StorageService from "@shared/services/storage.service";

export interface ReviewerStatus {
  isGso?: string;
  isGsoFF?: string;
  isTreasurer?: string;
  isMayor?: string;
  isBudget?: string;
}

export function useReviewHook() {
  const { data: roles } = useGetRoleQy();

  const setReviewerStatus = (
    roleName: string,
    status: boolean,
    mayorApproveStatus: boolean = false
  ) => {
    switch (roleName) {
      case "VMO_APRV":
      case "MO_APRV":
        return {
          is_mayor: status,
        };
      case "GSO_ADMIN":
      case "GSO_APRV":
        if (mayorApproveStatus) {
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
          is_gso_ff: false,
          is_budget: false,
        };
    }
  };

  const setReviewerEntityStatus = (
    status: boolean,
    mayorApproveStatus: boolean = false
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

    const reviewer = setReviewerStatus(
      currentRole?.name || "",
      status,
      mayorApproveStatus
    );
    return reviewer;
  };

  const getOrderPhaseReviewerStateSymbol = (
    reviewer: Reviewer,
    data: GetPurchaseOrderDto
  ) => {
    switch (reviewer) {
      case Reviewer.CGSO:
        const isGsoReceived = !!data.po_is_gso_received;
        const isGsoApproved = !!data.is_gso;
        const isGsoPending = data.is_gso === null;
        return validateReviewerState(
          isGsoReceived,
          isGsoApproved,
          isGsoPending
        );

      case Reviewer.CTO:
        const isCtoReceived = !!data.po_is_treasurer_received;
        const isCtoApproved = !!data.is_treasurer;
        const isCtoPending = data.is_treasurer === null;
        return validateReviewerState(
          isCtoReceived,
          isCtoApproved,
          isCtoPending
        );

      case Reviewer.CMO:
        const isCmoReceived = !!data.po_is_mayor_received;
        const isCmoApproved = !!data.is_mayor;
        const isCmoPending = data.is_mayor === null;
        return validateReviewerState(
          isCmoReceived,
          isCmoApproved,
          isCmoPending
        );

      default:
        return "";
    }
  };

  const getRequestPhaseForOrderReviewerStateSymbol = (
    reviewer: Reviewer,
    data: GetPurchaseRequestDto
  ) => {
    switch (reviewer) {
      case Reviewer.CGSO:
        const isGsoReceived = !!data.po_is_gso_received;
        const isGsoApproved = !!data.po_is_gso;
        const isGsoPending = data.po_is_gso === null;
        return validateReviewerState(
          isGsoReceived,
          isGsoApproved,
          isGsoPending
        );

      case Reviewer.CTO:
        const isCtoReceived = !!data.po_is_treasurer_received;
        const isCtoApproved = !!data.po_is_treasurer;
        const isCtoPending = data.po_is_treasurer === null;
        return validateReviewerState(
          isCtoReceived,
          isCtoApproved,
          isCtoPending
        );

      case Reviewer.CMO:
        const isCmoReceived = !!data.po_is_mayor_received;
        const isCmoApproved = !!data.po_is_mayor;
        const isCmoPending = data.po_is_mayor === null;
        return validateReviewerState(
          isCmoReceived,
          isCmoApproved,
          isCmoPending
        );

      default:
        return "";
    }
  };

  const getRequestPhaseReviewerStateSymbol = (
    reviewer: Reviewer,
    data: GetPurchaseRequestDto
  ) => {
    switch (reviewer) {
      case Reviewer.CGSO:
        const isGsoReceived = !!data.is_gso_received;
        const isGsoApproved = !!data.is_gso;
        const isGsoPending = data.is_gso === null;
        return validateReviewerState(
          isGsoReceived,
          isGsoApproved,
          isGsoPending
        );

      case Reviewer.CTO:
        const isCtoReceived = !!data.is_treasurer_received;
        const isCtoApproved = !!data.is_treasurer;
        const isCtoPending = data.is_treasurer === null;
        return validateReviewerState(
          isCtoReceived,
          isCtoApproved,
          isCtoPending
        );

      case Reviewer.CMO:
        const isCmoReceived = !!data.is_mayor_received;
        const isCmoApproved = !!data.is_mayor;
        const isCmoPending = data.is_mayor === null;
        return validateReviewerState(
          isCmoReceived,
          isCmoApproved,
          isCmoPending
        );

      case Reviewer.CGSO_FF:
        const isGsoFFReceived = !!data.is_gso_ff_received;
        const isGsoFFApproved = !!data.is_gso_ff;
        const isGsoFFPending = data.is_gso_ff === null;
        return validateReviewerState(
          isGsoFFReceived,
          isGsoFFApproved,
          isGsoFFPending
        );

      case Reviewer.CBO:
        const isCboReceived = !!data.is_budget_received;
        const isCboApproved = !!data.is_budget;
        const isCboPending = data.is_budget === null;
        return validateReviewerState(
          isCboReceived,
          isCboApproved,
          isCboPending
        );

      default:
        return "";
    }
  };

  const validateReviewerState = (
    isReceived: boolean,
    isApproved: boolean,
    isPending: boolean
  ) => {
    if (
      (isReceived && isApproved && !isPending) ||
      (!isReceived && isApproved && !isPending)
    ) {
      return "pi pi-check";
    } else if (isReceived && !isApproved && isPending) {
      return "pi pi-qrcode";
    } else if (
      (isReceived && !isApproved && !isPending) ||
      (!isReceived && !isApproved && !isPending)
    ) {
      return "pi pi-times";
    }

    return "";
  };

  const getReviewers = (data: ReviewerStatus, isSp: boolean = false) => {
    const gso =
      data.isGso === undefined
        ? null
        : {
            label: Reviewer.CGSO,
            value: data.isGso,
          };
    const treasurer =
      data.isTreasurer === undefined
        ? null
        : {
            label: Reviewer.CTO,
            value: data.isTreasurer,
          };
    const mayor =
      data.isMayor === undefined
        ? null
        : {
            label: isSp ? Reviewer.CVMO : Reviewer.CMO,
            value: data.isMayor,
          };
    const budget =
      data.isBudget === undefined
        ? null
        : {
            label: Reviewer.CBO,
            value: data.isBudget,
          };
    const gsoff =
      data.isGsoFF === undefined
        ? null
        : {
            label: Reviewer.CGSO,
            value: data.isGsoFF,
          };
    const reviewers = [gso, treasurer, mayor, gsoff, budget];
    const filteredReviewers = reviewers.filter((x) => !!x);

    return filteredReviewers as LabelValue[];
  };

  return {
    setReviewerEntityStatus,
    getReviewers,
    getRequestPhaseReviewerStateSymbol,
    getRequestPhaseForOrderReviewerStateSymbol,
    getOrderPhaseReviewerStateSymbol,
  };
}
