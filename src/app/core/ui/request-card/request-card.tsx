import { LabelValue } from "@shared/models/label-value.interface";
import "./request-card.scss";
import classNames from "classnames";
import { Tag } from "primereact/tag";
import { getStatusStyle } from "@core/utility/get-status-style";
import ReviewSection from "../review-section/review-section";

export interface RequestCardProps {
  code: string;
  title: string;
  subTitle: string;
  status: string;
  reviewers: LabelValue[];
  dueDate: string;
  totalAmount: string;
  totalItems: string;
  onClick: (code: string) => void;
}

export function RequestCard({
  code,
  title,
  subTitle,
  status,
  reviewers,
  dueDate,
  totalAmount,
  totalItems,
  onClick,
}: RequestCardProps) {
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
          <p className="text-gray-800 font-bold">{dueDate}</p>
          <p className="hint">Due Date</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{totalAmount}</p>
          <p className="hint">Total Amount</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{totalItems}</p>
          <p className="hint">Total Items</p>
        </div>
      </section>
      {reviewers.length > 0 && (
        <ReviewSection classname="mb-3" reviewers={reviewers} />
      )}
    </div>
  );
}

export default RequestCard;
