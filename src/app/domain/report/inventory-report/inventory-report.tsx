import { useGetQyInventoryReport } from "@core/query/dashboard.query";
import "./inventory-report.scss";
import { useState } from "react";
import { DashboardControllerPrDashboardReport200Response } from "@api/api";
import { reportLabels } from "@core/utility/reports.helper";
import colors from "tailwindcss/colors";
import { Chart } from "primereact/chart";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";

export interface InventoryReportProps {
  isLoading: boolean;
  chartData: any;
  chartOptions: any;
  dateName?: string;
  startDate?: string;
  endDate?: string;
  onSelected?: (label: string) => void;
}

export function InventoryReport({
  isLoading,
  chartData,
  chartOptions,
}: InventoryReportProps) {
  const displayLoading = (
    <div className="card">
      <SkeletonList count={1} mode="dashboard" />
    </div>
  );

  return (
    <div className="inventory-report">
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
          <h4 className="mb-2">Inventory</h4>
        </section>
      )}
    </div>
  );
}

export default InventoryReport;
