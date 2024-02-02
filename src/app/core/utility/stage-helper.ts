import { RequestStatus } from "@core/model/request-status.enum";
import { getStageNameByStatus } from "./get-stage-name";
import { StageName } from "@core/model/stage-name.enum";

export const shouldShowBidder = (status?: string) => {
  const stageName = getStageNameByStatus(status || "");
  return (
    status === RequestStatus.BIDDING ||
    status === RequestStatus.AWARDED ||
    stageName === StageName.STAGE_3 ||
    stageName === StageName.STAGE_4
  );
};
export const shouldDisableBidder = (status?: string) => {
  const stageName = getStageNameByStatus(status || "");
  return (
    status === RequestStatus.AWARDED ||
    stageName === StageName.STAGE_3 ||
    stageName === StageName.STAGE_4
  );
};
export const showEditRequestItemElements = (status?: string) => {
  return (
    status === RequestStatus.BIDDING ||
    status === RequestStatus.AWARDED ||
    status === RequestStatus.POREVIEW ||
    status === RequestStatus.POAPPROVED ||
    status === RequestStatus.PODECLINED
  );
};
