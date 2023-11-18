export const getStatusStyle = (stage: number) => {
  switch (stage) {
    case 1:
      return "bg-blue-200 text-blue-500";
    case 2:
      return "bg-orange-200 text-orange-500";
    case 3:
      return "bg-violet-200 text-violet-500";
    case 4:
      return "bg-lime-200 text-lime-500";

    default:
      return "bg-gray-200 text-gray-500";
  }
};
