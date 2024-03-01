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

    case "in_progress_po":
      return {
        status_name: [
          RequestStatus.CATEGORIZED,
          RequestStatus.POSTED,
          RequestStatus.BIDDING,
          RequestStatus.AWARDED,
          RequestStatus.PENDING,
          RequestStatus.POREVIEW,
        ],
      };

    case "all_approved_po":
      return {
        status_name: [RequestStatus.POAPPROVED],
      };

    case "all_declined_po":
      return {
        status_name: [RequestStatus.PODECLINED],
      };

    case "all_approved_itb":
      return {
        status_name: [RequestStatus.POAPPROVED],
        mode_of_procurement: ["ITB"],
      };

    case "all_approved_rfq":
      return {
        status_name: [RequestStatus.POAPPROVED],
        mode_of_procurement: ["RFQ"],
      };

    case "inspected_po":
      return {
        status_name: [RequestStatus.INSPECTION],
      };

    case "partial_po":
      return {
        status_name: [RequestStatus.PARTIAL],
      };

    case "completed_po":
      return {
        status_name: [RequestStatus.COMPLETED],
      };

    default:
      return null;
  }
};
