export enum RequestStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  REVIEW = "REVIEW",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",

  CATEGORIZED = "CATEGORIZED",
  POSTED = "POSTED",
  BIDDING = "BIDDING",
  AWARDED = "AWARDED",
  BACDECLINED = "BAC DECLINED",
  PENDING = "PENDING",

  POREVIEW = "PO REVIEW",
  POREVIEWED = "PO REVIEWED",
  POAPPROVED = "PO APPROVED",
  PODECLINED = "PO DECLINED",

  INSPECTION = "INSPECTION",
  PARTIAL = "PARTIAL",
  COMPLETED = "COMPLETED",
}

export enum RequestStatusAction {
  Complete = "Complete",
  Partial = "Partial",
  Print = "Print",
  Delete = "Delete",
  Bacdecline = "BAC Decline",
  Approve = "Approve",
  Decline = "Decline",
  Submit = "Submit",
  History = "History",
  Update = "Update",
  Resubmit = "Resubmit",
  Reapprove = "Reapprove",
  Inspect = "Inspect",
  Review = "Review",
  Bid = "Bid",
  Award = "Award",
  Post = "Post",
}
