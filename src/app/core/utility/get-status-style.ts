import { InventoryStatus } from "@core/model/inventory-status.enum";
import { RequestStatus } from "@core/model/request-status.enum";

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
    case RequestStatus.SUBMITTED:
    case RequestStatus.FORPRINTING:
      return "bg-blue-200 text-blue-500";
    case RequestStatus.REVIEW:
    case RequestStatus.REVIEWED:
      return "bg-yellow-200 text-yellow-500";
    case RequestStatus.APPROVED:
      return "bg-teal-200 text-teal-500";
    case RequestStatus.DECLINED:
      return "bg-red-200 text-red-500";
    case "DELETE":
      return "bg-red-200 text-red-500";

    case RequestStatus.CATEGORIZED:
      return "bg-orange-200 text-orange-500";
    case RequestStatus.POSTED:
      return "bg-amber-200 text-amber-500";
    case RequestStatus.BIDDING:
      return "bg-cyan-200 text-cyan-500";
    case RequestStatus.AWARDED:
      return "bg-teal-300 text-teal-600";
    case RequestStatus.BACDECLINED:
      return "bg-red-200 text-red-500";
    case RequestStatus.PENDING:
      return "bg-blue-300 text-blue-600";

    case RequestStatus.POREVIEW:
    case RequestStatus.POREVIEWED:
      return "bg-violet-200 text-violet-500";
    case RequestStatus.POAPPROVED:
      return "bg-green-200 text-green-500";
    case RequestStatus.PODECLINED:
      return "bg-red-200 text-red-500";

    case RequestStatus.INSPECTION:
      return "bg-lime-200 text-lime-500";
    case RequestStatus.PARTIAL:
      return "bg-pink-200 text-pink-500";
    case RequestStatus.COMPLETED:
      return "bg-emerald-200 text-emerald-700";

    case InventoryStatus.ASSIGNED:
      return "bg-blue-200 text-blue-500";
    case InventoryStatus.REG:
      return "bg-emerald-200 text-emerald-700";
    case InventoryStatus.DMG:
      return "bg-red-200 text-red-500";
    case InventoryStatus.REPAIR:
      return "bg-amber-200 text-amber-500";
    case InventoryStatus.LOST:
      return "bg-red-200 text-red-500";
    case InventoryStatus.STOLEN:
      return "bg-violet-200 text-violet-500";
    case InventoryStatus.DISPOSED:
      return "bg-orange-200 text-orange-500";
    case InventoryStatus.RETURNED:
      return "bg-blue-200 text-blue-500";

    default:
      return "bg-gray-200 text-gray-500";
  }
};
