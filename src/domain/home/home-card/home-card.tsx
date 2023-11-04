import classNames from "classnames";
import "./home-card";
import OfficeCircle from "../../../core/ui/office-circle/office-circle";

/* eslint-disable-next-line */
export interface HomeCardProps {
  status: string;
  hasReview?: boolean;
}

export function HomeCard({ hasReview, status }: HomeCardProps) {
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <div>
            <h4 className="text-green-500">{status}</h4>
          </div>
          <div>
            <i className="pi pi-angle-right"></i>
          </div>
        </div>
      </section>
      {!hasReview && (
        <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">10</p>
            <p className="hint">Total Requests</p>
          </div>
        </section>
      )}
      {hasReview && (
        <section className="bg-green-200 py-4">
          <p className="hint text-center mb-1">Total Requests Per Office</p>
          <section className="flex justify-center gap-2">
            <OfficeCircle label="GSO" value="12" />
            <OfficeCircle label="Treasurer" value="15" />
            <OfficeCircle label="Mayor" value="1" />
            <OfficeCircle label="Budget" value="4"/>
          </section>
        </section>
      )}
    </div>
  );
}

export default HomeCard;
