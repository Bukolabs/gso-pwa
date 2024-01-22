import {
  GetPurchaseRequestDto,
  TransactionHistoryControllerGetDataAsList200Response,
} from "@api/api";
import { StageName } from "@core/model/stage-name.enum";
import { useGetAccountsQy } from "@core/query/account.query";
import { useGetStatusQy } from "@core/query/status.query";
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import { getStageNameByStatus } from "@core/utility/get-stage-name";
import { SETTINGS } from "@core/utility/settings";
import { format } from "date-fns";
import { keyBy } from "lodash-es";
import { PurchaseHistoryModel } from "./purchase-history";
import { useGetHistoryQy } from "@core/query/history.query";
import { useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";

export function usePurchaseHistory(isOrder: boolean = false) {
  const [historyId, setHistoryId] = useState("");
  const [historyData, setHistoryData] = useState<PurchaseHistoryModel[]>([]);
  const { data: statusQy } = useGetStatusQy(true);
  const { data: accountsQy } = useGetAccountsQy("", 999999, 0);
  const { getReviewers } = useReviewHook();

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
    let reviewers = [
      data.is_gso,
      data.is_treasurer,
      data.is_mayor,
      data.is_budget,
      data.is_gso_ff,
    ];
    let remarksRecord = {
      0: "",
      1: data.gso_remarks,
      2: data.treasurer_remarks,
      3: data.mayor_remarks,
      4: data.budget_remarks,
      5: data.gso_ff_remarks,
    };

    if (isOrder) {
      reviewers = [data.is_gso, data.is_mayor, data.is_treasurer];
      remarksRecord = {
        0: "",
        1: data.gso_remarks,
        2: data.mayor_remarks,
        3: data.treasurer_remarks,
        4: "",
        5: "",
      };
    }

    const approvers = reviewers.filter((x) => !!x).length;
    return remarksRecord[approvers as keyof typeof remarksRecord] || "";
  };

  const handleHistorySuccess = (
    data: TransactionHistoryControllerGetDataAsList200Response
  ) => {
    const statusRecord = keyBy(statusQy?.data || [], "code");
    const accountsRecord = keyBy(accountsQy?.data || [], "person_code");
    const responseHistory = data.data;
    const historicalData = responseHistory?.map((item) => {
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

      const historyModel = {
        date: newValue?.updated_at
          ? (format(new Date(newValue?.updated_at), SETTINGS.dateFormat) as any)
          : undefined,
        actor: accountsRecord[newValue?.updated_by]?.person_email,
        actorRole: accountsRecord[newValue?.updated_by]?.role_name,
        actorDepartment: accountsRecord[newValue?.updated_by]?.department_name,
        status: renameStatus(status),
        reviewer: stageReviewers,
        remarks: getReviewerRemarks(newValue),
      } as PurchaseHistoryModel;

      console.log({
        historyModel,
        newValue,
      });
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
