import { RequestStatus } from "@core/model/request-status.enum";

export const reportLabels = {
  total_submitted_pr: "Submitted Requests",
  total_approved_pr: "Approved Requests",
  total_declined_pr: "Declined Requests",
  in_progress_po: "In Progress Orders",
  all_approved_po: "Approved Orders",
  all_declined_po: "Declined Orders",
  all_approved_itb: "Approved ITB",
  all_approved_rfq: "Approved RFQ",
  inspected_po: "Inspected Orders",
  partial_po: "Partial Orders",
  completed_po: "Completed Orders",
};

export const reportFilterMap = (reportType: string) => {
  switch (reportType) {
    case "total_submitted_pr":
      return {
        status_name: [
          RequestStatus.FORPRINTING,
          RequestStatus.SUBMITTED,
          RequestStatus.REVIEW,
        ],
      };

    case "total_approved_pr":
      return {
        status_name: [RequestStatus.APPROVED],
      };

    case "total_declined_pr":
      return {
        status_name: [RequestStatus.DECLINED, RequestStatus.BACDECLINED],
      };

    default:
      return null;
  }
};
