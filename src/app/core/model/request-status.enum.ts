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

  POREVIEW = "PO REVIEW",
  POREVIEWED = "PO REVIEWED",
  POAPPROVED = "PO APPROVED",
  PODECLINED = "PO DECLINED",

  INSPECTION = "INSPECTION",
  PARTIAL = "PARTIAL",
  COMPLETED = "COMPLETED",
}

export enum RequestStatusAction {
  COMPLETE = "COMPLETE",
  PARTIAL = "PARTIAL",
  PRINT = "PRINT",
  DELETE = "DELETE",
}