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

export function Report() {
  const [dateName, setDateName] = useState("MONTH");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

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
    // const concatFilters = getExtraFilters();
    // let url = `../order?reports=${label}${concatFilters}`;
    // navigate(url);
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

  const mainContent = (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
      <PrReport
        dateName={dateName}
        startDate={startDate}
        endDate={endDate}
        onSelected={handleNavigatePr}
      />
      <PoReport
        dateName={dateName}
        startDate={startDate}
        endDate={endDate}
        onSelected={handleNavigatePo}
      />
      <InventoryReport
        dateName={dateName}
        startDate={startDate}
        endDate={endDate}
        onSelected={handleNavigateInventory}
      />
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
