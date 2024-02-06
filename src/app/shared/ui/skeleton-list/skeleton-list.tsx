import { getRandomNumber } from "@shared/utility/random-number";
import { Skeleton } from "primereact/skeleton";

export interface SkeletonListProps {
  count: number;
  mode?: "dashboard" | "list";
}

export function SkeletonList({ count, mode = "list" }: SkeletonListProps) {
  const listStructure = [...Array(count)].map((e, i) => (
    <li className="mb-3" key={i}>
      <div className="flex">
        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        <div style={{ flex: "1" }}>
          <Skeleton width="100%" className="mb-2 mt-2"></Skeleton>
          <Skeleton width="75%"></Skeleton>
        </div>
      </div>
    </li>
  ));

  const dashboardStructure = [...Array(count)].map((e, i) => {
    const randomNumber = getRandomNumber(1, 6);
    return (
      <li className="mb-8" key={i}>
        <Skeleton className="mb-2" width="40%"></Skeleton>
        <div className="flex justify-start">
          <Skeleton height="12rem" width="32%" className="mr-2"></Skeleton>
          <Skeleton height="12rem" width="32%" className="mr-2"></Skeleton>
          {randomNumber > 3 ? (
            <Skeleton height="12rem" width="32%" className="mr-2"></Skeleton>
          ) : (
            <></>
          )}
        </div>
      </li>
    );
  });

  const getStructure = () => {
    switch (mode) {
      case "dashboard":
        return dashboardStructure;

      default:
        return listStructure;
    }
  };

  return (
    <div className="p-4">
      <ul className="m-0 p-0 list-none">{getStructure()}</ul>
    </div>
  );
}

export default SkeletonList;
