export const getStatusStyle = (stage: string) => {
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
