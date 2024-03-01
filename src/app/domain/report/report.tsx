import HeaderContent from "@shared/ui/header-content/header-content";
import "./report.scss";
import {
  useGetQyOrderReport,
  useGetQyRequestReport,
} from "@core/query/dashboard.query";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { LabelValue } from "@shared/models/label-value.interface";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { reportLabels } from "@core/utility/reports.helper";

export function Report() {
  const [dateName, setDateName] = useState("MONTH");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const { data: poSummaryResponse, isLoading: isPoLoading } =
    useGetQyOrderReport(undefined, dateName, startDate, endDate);
  const { data: prSummaryResponse, isLoading: isPrLoading } =
    useGetQyRequestReport(undefined, dateName, startDate, endDate);

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
  const card = (
    count: string,
    label: string,
    callback: (label: string) => void,
    id: number
  ) => {
    return (
      <div
        key={id}
        className={classNames(
          "bg-white w-full shadow rounded-md flex flex-col"
        )}
      >
        <section className="flex justify-center gap-3 py-10">
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => callback(label)}
          >
            <p className="text-gray-800 font-bold">{count} </p>
            <p className="hint">
              {reportLabels[label as keyof typeof reportLabels]}
            </p>
          </div>
        </section>
      </div>
    );
  };
  const prCards = (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
      {(prSummaryResponse?.data || []).map((item, id) =>
        card(item.value, item.label, handleNavigatePr, id)
      )}
    </section>
  );
  const poCards = (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
      {(poSummaryResponse?.data || []).map((item, id) =>
        card(item.value, item.label, handleNavigatePo, id)
      )}
    </section>
  );
  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} mode="dashboard" />
    </div>
  );
  const mainContent = (
    <section>
      <h4 className="mb-2">Purchase Requests</h4>
      {prCards}

      <h4 className="mb-2">Purchase Orders</h4>
      {poCards}
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

        <section className="mt-4">
          {isPrLoading || isPoLoading ? displayLoading : mainContent}
        </section>
      </div>
    </div>
  );
}

export default Report;
