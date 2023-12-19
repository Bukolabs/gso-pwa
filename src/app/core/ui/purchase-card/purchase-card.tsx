import classNames from "classnames";
import "./purchase-card";
import { Tag } from "primereact/tag";
import { LabelValue } from "@shared/models/label-value.interface";
import ReviewSection from "../review-section/review-section";
import { getStatusStyle } from "@core/utility/get-status-style";

export interface PurchaseCardProps {
  code: string;
  title: string;
  subTitle: string;
  status: string;
  reviewers: LabelValue[];
  onClick: (code: string) => void;
}

export function PurchaseCard({
  code,
  title,
  subTitle,
  status,
  reviewers,
  onClick,
}: PurchaseCardProps) {
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
      onClick={() => onClick(code)}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-gray-800">{title}</h3>
            <h4 className="text-gray-500">{subTitle}</h4>
          </div>
          <div>
            <Tag
              value={status}
              className={classNames(getStatusStyle(status))}
            ></Tag>
          </div>
        </div>
      </section>
      <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">22/05/2023</p>
          <p className="hint">Due Date</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">$23500</p>
          <p className="hint">Total Amount</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">10</p>
          <p className="hint">Total Items</p>
        </div>
      </section>
      {reviewers.length > 0 && (
        <ReviewSection classname="mb-3" reviewers={reviewers} />
      )}
    </div>
  );
}

export default PurchaseCard;
