import {
  GetPurchaseRequestDto,
  TransactionHistoryControllerGetDataAsList200Response,
} from "@api/api";
import { StageName } from "@core/model/stage-name.enum";
import { useGetAccountQy } from "@core/query/account.query";
import { useGetStatusQy } from "@core/query/status.query";
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import { getStageNameByStatus } from "@core/utility/get-stage-name";
import { keyBy } from "lodash-es";
import { PurchaseHistoryModel } from "./purchase-history";
import { useGetHistoryQy } from "@core/query/history.query";
import { useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { LabelValue } from "@shared/models/label-value.interface";
import { getFormattedLocalizedDateTime } from "@core/utility/datetime.helper";

export function usePurchaseHistory(isOrder: boolean = false) {
  const [historyId, setHistoryId] = useState("");
  const [historyData, setHistoryData] = useState<PurchaseHistoryModel[]>([]);
  const { data: statusQy } = useGetStatusQy(true);
  const { data: accountsQy } = useGetAccountQy(
    "",
    999997,
    0,
    undefined,
    undefined
  );
  const { getReviewers } = useReviewHook();
  const statusRecord = keyBy(statusQy?.data || [], "code");
  const accountsRecord = keyBy(accountsQy?.data || [], "person_code");

  const renameStatus = (status: string) => {
    switch (status) {
      case RequestStatus.REVIEW:
        return "REVIEWED";
      case RequestStatus.POREVIEW:
        return "PO REVIEWED";

      default:
        return status;
    }
  };

  const getReviewerRemarks = (data: GetPurchaseRequestDto) => {
    const status = statusRecord[data.status]?.name;
    const currentStage = getStageNameByStatus(status);

    if (status === RequestStatus.BACDECLINED) {
      return data.decline_remarks;
    } else if (status === RequestStatus.APPROVED) {
      return data.approve_remarks;
    }

    let reviewers = [
      data.is_gso,
      data.is_treasurer,
      data.is_mayor,
      data.is_gso_ff,
      data.is_budget,
    ];
    let remarksRecord = {
      0: "",
      1: data.gso_remarks,
      2: data.treasurer_remarks,
      3: data.mayor_remarks,
      4: data.gso_ff_remarks,
      5: data.budget_remarks,
    };

    if (isOrder) {
      reviewers = [data.is_gso, data.is_treasurer, data.is_mayor];
      remarksRecord = {
        0: "",
        1: data.gso_remarks,
        2: data.treasurer_remarks,
        3: data.mayor_remarks,
        4: "",
        5: "",
      };
    } else if (!isOrder && currentStage === StageName.STAGE_3) {
      return "";
    }

    const approvers = reviewers.filter((x) => x !== null).length;
    return remarksRecord[approvers as keyof typeof remarksRecord] || "";
  };

  const handleHistorySuccess = (
    data: TransactionHistoryControllerGetDataAsList200Response
  ) => {
    const responseHistory = data.data;
    const historicalData = responseHistory?.map((item) => {
      const hasNewValue = !!item.new_values;
      let historyModel = {
        date: "",
        actor: "-",
        actorRole: "-",
        actorDepartment: "-",
        status: "-",
        reviewer: [] as LabelValue[],
        remarks: "-",
        description: "",
      } as PurchaseHistoryModel;

      if (hasNewValue) {
        const newValue = JSON.parse(item.new_values as string);
        const status = statusRecord[newValue.status]?.name;
        const stage = getStageNameByStatus(status);
        const isStage3And4 =
          stage === StageName.STAGE_3 || stage === StageName.STAGE_4;

        let stageReviewers = isStage3And4
          ? getReviewers({
              isGso: newValue?.po_is_gso,
              isTreasurer: newValue?.po_is_treasurer,
              isMayor: newValue?.po_is_mayor,
            } as ReviewerStatus)
          : getReviewers({
              isGso: newValue?.is_gso,
              isGsoFF: newValue?.is_gso_ff,
              isTreasurer: newValue?.is_treasurer,
              isMayor: newValue?.is_mayor,
              isBudget: newValue?.is_budget,
            } as ReviewerStatus);

        if (isOrder) {
          stageReviewers = getReviewers({
            isGso: newValue?.is_gso,
            isTreasurer: newValue?.is_treasurer,
            isMayor: newValue?.is_mayor,
          } as ReviewerStatus);
        }

        historyModel = {
          date: getFormattedLocalizedDateTime(
            new Date(newValue.updated_at as string)
          ),
          actor: accountsRecord[newValue?.updated_by]?.person_email,
          actorRole: accountsRecord[newValue?.updated_by]?.role_name,
          actorDepartment:
            accountsRecord[newValue?.updated_by]?.department_name,
          status: renameStatus(status),
          reviewer: stageReviewers,
          remarks: getReviewerRemarks(newValue),
          description: "",
        } as PurchaseHistoryModel;
      } else if (!item.new_values && !item.old_values) {
        historyModel = {
          date: getFormattedLocalizedDateTime(
            new Date(item.updated_at as string)
          ),
          actor: "-",
          actorRole: "-",
          actorDepartment: "-",
          status: item.action,
          reviewer: [] as LabelValue[],
          remarks: "-",
          description: item.description,
        } as PurchaseHistoryModel;
      }

      return historyModel;
    });

    setHistoryData(historicalData || []);
  };
  useGetHistoryQy(historyId, !!historyId, handleHistorySuccess);

  const getHistory = (id: string) => {
    setHistoryId(id);
  };

  return {
    historyData,
    getHistory,
  };
}
