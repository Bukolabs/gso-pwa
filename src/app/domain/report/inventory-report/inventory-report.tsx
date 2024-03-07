import { useGetQyInventoryReport } from "@core/query/dashboard.query";
import "./inventory-report.scss";
import { useState } from "react";
import { DashboardControllerPrDashboardReport200Response } from "@api/api";
import { reportLabels } from "@core/utility/reports.helper";
import colors from "tailwindcss/colors";
import { Chart } from "primereact/chart";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";

export interface InventoryReportProps {
  dateName?: string;
  startDate?: string;
  endDate?: string;
  onSelected: (label: string) => void;
}

export function InventoryReport({
  dateName,
  startDate,
  endDate,
  onSelected,
}: InventoryReportProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const handleSuccessApi = (
    response: DashboardControllerPrDashboardReport200Response
  ) => {
    const prData = response.data;

    const dataRawLabels = (prData || []).map((item) => item.label);
    const dataLabels = (prData || []).map(
      (item) => reportLabels[item.label as keyof typeof reportLabels]
    );
    const dataValues = (prData || []).map((item) => item.value);
    const data = {
      labels: dataLabels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            colors.blue[500],
            colors.emerald[500],
            colors.violet[500],
            colors.teal[500],
            colors.red[500],
            colors.orange[500],
            colors.pink[500],
            colors.cyan[500],
            colors.fuchsia[500],
          ],
          hoverBackgroundColor: [
            colors.blue[400],
            colors.emerald[400],
            colors.violet[400],
            colors.teal[400],
            colors.red[400],
            colors.orange[400],
            colors.pink[400],
            colors.cyan[400],
            colors.fuchsia[400],
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
      onClick: (event: any, item: any) => {
        console.log({ event, item });
        if (item.length > 0) {
          const selectedIndex = item[0].index;
          onSelected(dataRawLabels[selectedIndex]);
        }
      },
    };

    setChartData(data);
    setChartOptions(options);
  };
  const { isLoading } = useGetQyInventoryReport(
    undefined,
    dateName,
    startDate,
    endDate,
    handleSuccessApi
  );

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
        <section className="flex justify-center flex-col items-center p-6">
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
