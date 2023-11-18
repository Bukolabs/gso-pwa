import classNames from "classnames";
import "./home-card";
import OfficeCircle from "../../../core/ui/office-circle/office-circle";
import { Tag } from "primereact/tag";
import { getStatusStyle } from "../../../core/utility/get-status-style";
import { LabelValue } from "../../../shared/models/label-value.interface";

export interface HomeCardProps {
  stage: number;
  status: string;
  orders?: number;
  requests?: number;
  prReviews?: LabelValue[];
  poReviews?: LabelValue[];
}

export function HomeCard({
  requests,
  orders,
  stage,
  prReviews,
  status,
  poReviews,
}: HomeCardProps) {
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <Tag
            value={status}
            className={classNames(getStatusStyle(stage))}
            rounded
          ></Tag>
        </div>
      </section>
      {!prReviews && (
        <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
          {requests && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">{requests}</p>
              <p className="hint">Total Requests</p>
            </div>
          )}
          {orders && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">{requests}</p>
              <p className="hint">Total Orders</p>
            </div>
          )}
        </section>
      )}
      {prReviews && prReviews.length > 0 && (
        <section className="py-4">
          <p className="hint text-center mb-1">Total Requests Per Office</p>
          <section className="flex justify-center gap-2">
            {prReviews.map((item) => (
              <OfficeCircle label={item.label} value={item.value} />
            ))}
          </section>
        </section>
      )}
      {poReviews && poReviews.length > 0 && (
        <section className="py-4">
          <p className="hint text-center mb-1">Total Orders Per Office</p>
          <section className="flex justify-center gap-2">
            {poReviews.map((item) => (
              <OfficeCircle label={item.label} value={item.value} />
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default HomeCard;
