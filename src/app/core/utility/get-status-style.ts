export const getStatusStyleByStage = (stage: string) => {
  switch (stage) {
    case "STAGE_1":
      return "bg-blue-200 text-blue-500";
    case "STAGE_2":
      return "bg-orange-200 text-orange-500";
    case "STAGE_3":
      return "bg-violet-200 text-violet-500";
    case "STAGE_4":
      return "bg-lime-200 text-lime-500";

    default:
      return "bg-gray-200 text-gray-500";
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "SUBMITTED":
      return "bg-blue-200 text-blue-500";
    case "REVIEW":
      return "bg-yellow-200 text-yellow-500";
    case "APPROVED":
      return "bg-teal-200 text-teal-500";
    case "DECLINED":
      return "bg-red-200 text-red-500";

    case "CATEGORIZED":
      return "bg-orange-200 text-orange-500";
    case "POSTED":
      return "bg-amber-200 text-amber-500";
    case "BIDDING":
      return "bg-cyan-200 text-cyan-500";
    case "AWARDED":
      return "bg-teal-200 text-teal-500";

    case "PO-REVIEW":
      return "bg-violet-200 text-violet-500";
    case "PO-APPROVED":
      return "bg-indigo-200 text-indigo-500";
    case "PO-DECLINED":
      return "bg-purple-200 text-purple-500";

    case "INSPECTION":
      return "bg-lime-200 text-lime-500";
    case "PARTIAL":
      return "bg-pink-200 text-pink-500";
    case "FULFILLED":
      return "bg-emerald-200 text-emerald-500";
    case "UNFULFILLED":
      return "bg-rose-200 text-rose-500";

    default:
      return "bg-gray-200 text-gray-500";
  }
};
