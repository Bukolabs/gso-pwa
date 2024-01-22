import { RequestStatus } from "@core/model/request-status.enum";
import { StageName } from "@core/model/stage-name.enum";

export function getStageNameByStatus(status: string) {
  switch (status) {
    case RequestStatus.DRAFT:
    case RequestStatus.SUBMITTED:
    case RequestStatus.REVIEW:
    case RequestStatus.APPROVED:
    case RequestStatus.DECLINED:
      return StageName.STAGE_1;

    case RequestStatus.CATEGORIZED:
    case RequestStatus.POSTED:
    case RequestStatus.BIDDING:
    case RequestStatus.AWARDED:
      return StageName.STAGE_2;

    case RequestStatus.POREVIEW:
    case RequestStatus.POAPPROVED:
    case RequestStatus.PODECLINED:
      return StageName.STAGE_3;

    case RequestStatus.INSPECTION:
    case RequestStatus.PARTIAL:
    case RequestStatus.FULFILLED:
    case RequestStatus.UNFULFILLED:
    case RequestStatus.CANCELLED:
      return StageName.STAGE_4;
  }
}
