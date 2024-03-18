import { Chart } from "primereact/chart";
import "./po-report.scss";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";

export interface PoReportProps {
  isLoading: boolean;
  chartData: any;
  chartOptions: any;
  dateName?: string;
  startDate?: string;
  endDate?: string;
  onSelected?: (label: string) => void;
}

export function PoReport({
  isLoading,
  chartData,
  chartOptions,
}: PoReportProps) {
  const displayLoading = (
    <div className="card">
      <SkeletonList count={1} mode="dashboard" />
    </div>
  );

  return (
    <div className="po-report">
      {isLoading ? (
        displayLoading
      ) : (
        <section className="flex justify-center flex-col items-center p-10">
          <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="w-full md:w-30rem"
          />
          <h4 className="mb-2">Purchase Orders</h4>
        </section>
      )}
    </div>
  );
}

export default PoReport;
