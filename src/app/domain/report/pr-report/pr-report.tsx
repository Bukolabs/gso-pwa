import { DashboardControllerPrDashboardReport200Response } from "@api/api";
import "./pr-report.scss";
import { reportLabels } from "@core/utility/reports.helper";
import { useState } from "react";
import { useGetQyRequestReport } from "@core/query/dashboard.query";
import { Chart } from "primereact/chart";
import colors from "tailwindcss/colors";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";

export interface PrReportProps {
  dateName?: string;
  startDate?: string;
  endDate?: string;
  onSelected: (label: string) => void;
}

export function PrReport({
  dateName,
  startDate,
  endDate,
  onSelected,
}: PrReportProps) {
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
            colors.cyan[500],
            colors.violet[500],
          ],
          hoverBackgroundColor: [
            colors.blue[400],
            colors.cyan[400],
            colors.violet[400],
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
      onClick: (_: any, item: any) => {
        if (item.length > 0) {
          const selectedIndex = item[0].index;
          onSelected(dataRawLabels[selectedIndex]);
        }
      },
    };

    setChartData(data);
    setChartOptions(options);
  };
  const { isLoading } = useGetQyRequestReport(
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
