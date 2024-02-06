import { RequestStatus } from "@core/model/request-status.enum";

export const showReviewControl = (status: RequestStatus) => {
  const showApproveList = [
    RequestStatus.SUBMITTED,
    RequestStatus.REVIEW,
    RequestStatus.AWARDED,
    RequestStatus.POREVIEW,
  ];

  return showApproveList.indexOf(status) >= 0
};