import HeaderContent from "@shared/ui/header-content/header-content";
import "./report.scss";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { LabelValue } from "@shared/models/label-value.interface";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import PrReport from "./pr-report/pr-report";
import PoReport from "./po-report/po-report";
import InventoryReport from "./inventory-report/inventory-report";
import { DashboardControllerPrDashboardReport200Response } from "@api/api";
import { reportLabels } from "@core/utility/reports.helper";
import colors from "tailwindcss/colors";
import {
  useGetQyInventoryReport,
  useGetQyOrderReport,
  useGetQyRequestReport,
} from "@core/query/dashboard.query";
import ReportCard from "./report-card/report-card";

export function Report() {
  const [dateName, setDateName] = useState("MONTH");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const [prChartData, setPrChartData] = useState({});
  const [prChartOptions, setPrChartOptions] = useState({});
  const [poChartData, setPoChartData] = useState({});
  const [poChartOptions, setPoChartOptions] = useState({});
  const [inventoryChartData, setInventoryChartData] = useState({});
  const [inventoryChartOptions, setInventoryChartOptions] = useState({});
  const prColors = ["text-blue-800", "text-cyan-800", "text-violet-800"];
  const poColors = [
    "text-blue-800",
    "text-cyan-800",
    "text-violet-800",
    "text-teal-800",
    "text-red-800",
    "text-lime-800",
    "text-pink-800",
    "text-emerald-800",
  ];
  const inventoryColors = [
    "text-blue-800",
    "text-emerald-800",
    "text-violet-800",
    "text-teal-800",
    "text-red-800",
    "text-orange-800",
    "text-pink-800",
    "text-cyan-800",
    "text-fuchsia-800",
  ];

  // API PR
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
          handleNavigatePr(dataRawLabels[selectedIndex]);
        }
      },
    };

    setPrChartData(data);
    setPrChartOptions(options);
  };
  const { isLoading: prIsLoading, data: prSummaryResponse } =
    useGetQyRequestReport(
      undefined,
      dateName,
      startDate,
      endDate,
      handleSuccessApi
    );

  // API PO
  const handleSuccessPoApi = (
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
            colors.teal[500],
            colors.red[500],
            colors.lime[500],
            colors.pink[500],
            colors.emerald[500],
          ],
          hoverBackgroundColor: [
            colors.blue[400],
            colors.cyan[400],
            colors.violet[400],
            colors.teal[400],
            colors.red[400],
            colors.lime[400],
            colors.pink[400],
            colors.emerald[400],
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
          handleNavigatePo(dataRawLabels[selectedIndex]);
        }
      },
    };

    setPoChartData(data);
    setPoChartOptions(options);
  };
  const { isLoading: poIsLoading, data: poSummaryResponse } =
    useGetQyOrderReport(
      undefined,
      dateName,
      startDate,
      endDate,
      handleSuccessPoApi
    );

  // API INVENTORY
  const handleSuccessInventoryApi = (
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
      onClick: (_: any, item: any) => {
        if (item.length > 0) {
          const selectedIndex = item[0].index;
          handleNavigateInventory(dataRawLabels[selectedIndex]);
        }
      },
    };

    setInventoryChartData(data);
    setInventoryChartOptions(options);
  };
  const { isLoading: inventoryIsLoading, data: inventorySummaryResponse } =
    useGetQyInventoryReport(
      undefined,
      dateName,
      startDate,
      endDate,
      handleSuccessInventoryApi
    );

  const handleReset = () => {
    setDateName("MONTH");
    setStartDate("");
    setEndDate("");
  };
  const getExtraFilters = () => {
    let extraFilters = [] as string[];
    if (dateName) {
      extraFilters = [...extraFilters, `dateName=${dateName}`];
    }
    if (startDate) {
      extraFilters = [...extraFilters, `startDate=${startDate}`];
    }
    if (endDate) {
      extraFilters = [...extraFilters, `endDate=${endDate}`];
    }

    const stringedExtraFilters = extraFilters.filter((x) => !!x).join("&");
    const concatFilters =
      stringedExtraFilters !== "" ? `&${stringedExtraFilters}` : "";

    return concatFilters;
  };
  const handleNavigatePr = (label: string) => {
    const concatFilters = getExtraFilters();
    let url = `../request?reports=${label}${concatFilters}`;
    navigate(url);
  };
  const handleNavigatePo = (label: string) => {
    const concatFilters = getExtraFilters();
    let url = `../order?reports=${label}${concatFilters}`;
    navigate(url);
  };
  const handleNavigateInventory = (label: string) => {
    const concatFilters = getExtraFilters();
    let url = `../monitor?reports=${label.toUpperCase()}${concatFilters}`;
    navigate(url);
  };

  const mappedDate = [
    {
      label: "TODAY",
      value: "TODAY",
    },
    {
      label: "YESTERDAY",
      value: "YESTERDAY",
    },
    {
      label: "WEEK",
      value: "WEEK",
    },
    {
      label: "MONTH",
      value: "MONTH",
    },
  ] as LabelValue[];
  const dateNameElement = (
    <div>
      <label>Date Name</label>
      <Dropdown
        value={dateName}
        onChange={(e) => {
          setDateName(e.value);
        }}
        options={mappedDate}
        filter
        placeholder="Select Date"
        className="w-full"
        showClear
      />
    </div>
  );
  const startDateElement = (
    <div>
      <label>Start Date</label>
      <InputText
        type="date"
        value={startDate}
        className="w-full"
        onChange={(e) => setStartDate(e.target.value)}
      />
    </div>
  );
  const endDateElement = (
    <div>
      <label>End Date</label>
      <InputText
        type="date"
        value={endDate}
        className="w-full"
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
  const prCards = (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 mb-4">
      {(prSummaryResponse?.data || []).map((item, id) => (
        <ReportCard
          key={id}
          count={item.value}
          label={item.label}
          textColorClass={prColors[id]}
          callback={handleNavigatePr}
        />
      ))}
    </section>
  );
  const poCards = (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 mb-4">
      {(poSummaryResponse?.data || []).map((item, id) => (
        <ReportCard
          key={id}
          count={item.value}
          label={item.label}
          textColorClass={poColors[id]}
          callback={handleNavigatePr}
        />
      ))}
    </section>
  );
  const inventoryCards = (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 mb-4">
      {(inventorySummaryResponse?.data || []).map((item, id) => (
        <ReportCard
          key={id}
          count={item.value}
          label={item.label}
          textColorClass={inventoryColors[id]}
          callback={handleNavigatePr}
        />
      ))}
    </section>
  );
  const mainContent = (
    <section>
      <div>
        <h4 className="mb-2">Purchase Requests</h4>
        {prCards}
      </div>
      <div>
        <h4 className="mb-2">Purchase Orders</h4>
        {poCards}
      </div>
      <div>
        <h4 className="mb-2">Inventory</h4>
        {inventoryCards}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <PrReport
          isLoading={prIsLoading}
          chartData={prChartData}
          chartOptions={prChartOptions}
        />
        <PoReport
          isLoading={poIsLoading}
          chartData={poChartData}
          chartOptions={poChartOptions}
        />
        <InventoryReport
          isLoading={inventoryIsLoading}
          chartData={inventoryChartData}
          chartOptions={inventoryChartOptions}
        />
      </div>
    </section>
  );

  return (
    <div className="report">
      <HeaderContent title="Reports"></HeaderContent>

      <div className="p-7">
        <h4>Report Filters</h4>
        <section className="flex gap-2 items-end">
          {dateNameElement}
          {endDateElement}
          {startDateElement}
          <Button
            label="Reset"
            severity="secondary"
            outlined
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          />
        </section>

        <section className="mt-4">{mainContent}</section>
      </div>
    </div>
  );
}

export default Report;
