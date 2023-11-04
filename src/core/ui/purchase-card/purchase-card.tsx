import classNames from "classnames";
import "./purchase-card";
import { Tag } from "primereact/tag";
import OfficeCircle from "../office-circle/office-circle";

/* eslint-disable-next-line */
export interface PurchaseCardProps {
  hasReview?: boolean;
}

export function PurchaseCard({ hasReview }: PurchaseCardProps) {
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full pb-3 border-b border-gray-200">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-green-500">Procurement 1</h3>
            <h4 className="text-gray-800">Department of Tourism</h4>
          </div>
          <div>
            <Tag value="Submitted"></Tag>
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
      {hasReview && (
        <section className="bg-green-200 py-4">
          <p className="hint text-center mb-1">Review Per Office</p>
          <section className="flex justify-center gap-2">
            <OfficeCircle label="GSO" icon="pi pi-check" />
            <OfficeCircle label="Treasurer" icon="pi pi-check" />
            <OfficeCircle label="Mayor" />
            <OfficeCircle label="Budget" />
          </section>
        </section>
      )}
    </div>
  );
}

export default PurchaseCard;
