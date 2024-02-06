import classNames from "classnames";
import "./home-card";
import OfficeCircle from "@core/ui/office-circle/office-circle";
import { Tag } from "primereact/tag";
import { getStatusStyle } from "@core/utility/get-status-style";
import { LabelValue } from "@shared/models/label-value.interface";

export interface HomeCardProps {
  stage: string;
  status: string;
  orders?: number;
  requests?: number;
  prReviews?: LabelValue<number>[];
  poReviews?: LabelValue<number>[];
  onRequestAction?: (filter: string) => void;
  onOrderAction?: (filter: string) => void;
  onReviewerAction?: (filter: string) => void;
  onOrderReviewerAction?: (filter: string) => void;
}

export function HomeCard({
  requests,
  orders,
  prReviews,
  status,
  poReviews,
  onRequestAction,
  onOrderAction,
  onReviewerAction,
  onOrderReviewerAction,
}: HomeCardProps) {
  const handleClickRequest = (status: string) => {
    const filter = `status_name=${status}`;
    if (onRequestAction) {
      onRequestAction(filter);
    }
  };
  const handleClickOrder = (status: string) => {
    const filter = `status_name=${status}`;
    if (onOrderAction) {
      onOrderAction(filter);
    }
  };
  const handleClickReviewer = (action: LabelValue<any>) => {
    let filter = `status_name=REVIEW&reviewer=${action.payload}`;
    console.log({ requests, orders, prReviews, status, poReviews });

    if (poReviews && poReviews.length > 0) {
      filter = `status_name=${status}&reviewer=${action.payload}`;
    } else if (prReviews && prReviews.length > 0 && action.payload === "CGSO") {
      filter = `reviewer=${action.payload}`;
    } else if (
      prReviews &&
      prReviews.length > 0 &&
      action.payload === "CGSO_2"
    ) {
      filter = `status_name=REVIEW&reviewer=CGSO_FF`;
    } else if (prReviews && prReviews.length > 0) {
      filter = `status_name=${status}&reviewer=${action.payload}`;
    }

    if (onReviewerAction) {
      onReviewerAction(filter);
    }

    if (onOrderReviewerAction) {
      onOrderReviewerAction(filter);
    }
  };

  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <Tag
            value={status}
            className={classNames(getStatusStyle(status))}
            rounded
          ></Tag>
        </div>
      </section>

      {(prReviews || []).length <= 0 && requests ? (
        <section className="flex justify-center gap-3 py-4">
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleClickRequest(status)}
          >
            <p className="text-gray-800 font-bold">{requests} </p>
            <p className="hint">Total Requests</p>
          </div>
        </section>
      ) : null}

      {(poReviews || []).length <= 0 && orders ? (
        <section className="flex justify-center gap-3 py-4">
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleClickOrder(status)}
          >
            <p className="text-gray-800 font-bold">{orders}</p>
            <p className="hint">Total Orders</p>
          </div>
        </section>
      ) : null}

      {prReviews && prReviews.length > 0 && (
        <section className="py-4">
          <p className="hint text-center mb-1">
            Total Requests Per Reviewer Flow
          </p>
          <section className="flex justify-center gap-2">
            {prReviews.map((item, id) => (
              <OfficeCircle
                key={id}
                label={item.label}
                value={item.value.toString()}
                isLightBg={true}
                className="cursor-pointer"
                onClick={() => handleClickReviewer(item)}
              />
            ))}
          </section>
        </section>
      )}

      {poReviews && poReviews.length > 0 && (
        <section className="py-4">
          <p className="hint text-center mb-1">
            Total Requests Per Reviewer Flow
          </p>
          <section className="flex justify-center gap-2">
            {poReviews.map((item, id) => (
              <OfficeCircle
                key={id}
                label={item.label}
                value={item.value.toString()}
                isLightBg={true}
                className="cursor-pointer"
                onClick={() => handleClickReviewer(item)}
              />
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default HomeCard;
