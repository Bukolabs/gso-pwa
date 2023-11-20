import { Skeleton } from "primereact/skeleton";

export interface SkeletonListProps {
  count: number;
}

export function SkeletonList({ count }: SkeletonListProps) {
  const preloadingElement = [...Array(count)].map((e, i) => (
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

  return (
    <div className="p-4">
      <ul className="m-0 p-0 list-none">{preloadingElement}</ul>
    </div>
  );
}

export default SkeletonList;
