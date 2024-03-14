import "./pr-report.scss";
import { Chart } from "primereact/chart";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";

export interface PrReportProps {
  isLoading: boolean;
  chartData: any;
  chartOptions: any;
  dateName?: string;
  startDate?: string;
  endDate?: string;
  onSelected?: (label: string) => void;
}

export function PrReport({
  isLoading,
  chartData,
  chartOptions,
}: PrReportProps) {
  const displayLoading = (
    <div className="card">
      <SkeletonList count={1} mode="dashboard" />
    </div>
  );

  return (
    <div className="pr-report">
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
          <h4 className="mb-2">Purchase Requests</h4>
        </section>
      )}
    </div>
  );
}

export default PrReport;
