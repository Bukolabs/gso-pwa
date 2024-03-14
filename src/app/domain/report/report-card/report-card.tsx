import classNames from "classnames";
import "./report-card.scss";
import { reportLabels } from "@core/utility/reports.helper";

export interface ReportCardProps {
  count: string;
  label: string;
  textColorClass?: string;
  callback: (label: string) => void;
}

export function ReportCard({
  count,
  label,
  textColorClass = "text-blue-800",
  callback,
}: ReportCardProps) {
  return (
    <div
      className={classNames(
        "bg-white w-full shadow rounded-md flex flex-col report-card"
      )}
    >
      <section className="flex justify-center gap-3 py-10">
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => callback(label)}
        >
          <span className={classNames("font-bold text-4xl", textColorClass)}>
            {count}
          </span>
          <p className="hint">
            {reportLabels[label as keyof typeof reportLabels]}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ReportCard;
