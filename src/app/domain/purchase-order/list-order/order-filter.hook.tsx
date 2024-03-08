import { useQyGetCategory } from "@core/query/category.query";
import { useGetStatusQy } from "@core/query/status.query";
import { reportFilterMap, reportLabels } from "@core/utility/reports.helper";
import { LabelValue } from "@shared/models/label-value.interface";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultFilter = (status = "", reviewer = "", reports = "") => {
  let defaultFilter = {} as Record<string, any>;

  if (status) {
    defaultFilter.status_name = status;
  }

  if (reviewer) {
    defaultFilter.reviewer = reviewer;
  }

  const reportMap = reportFilterMap(reports);
  if (reports && reportMap !== null) {
    defaultFilter = {
      ...reportMap,
    };
  }

  return defaultFilter;
};

export function useOrderFilter() {
  let [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status_name");
  const reviewerParam = searchParams.get("reviewer");
  const reportsParam = searchParams.get("reports");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [selectedReviewer, setSelectedReviewer] = useState(reviewerParam || "");
  const [orderFilters, setOrderFilters] = useState<Record<string, string>>(
    defaultFilter(statusParam || "", reviewerParam || "", reportsParam || "")
  );
  const [reportsParamValue, setReportsParamValue] = useState(
    reportsParam || ""
  );
  const dateNameParam = searchParams.get("dateName") || undefined;
  const startDateParam = searchParams.get("startDate") || undefined;
  const endDateParam = searchParams.get("endDate") || undefined;

  const { data: categories } = useQyGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );
  const { data: status } = useGetStatusQy();
  const mappedStatus = (status?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.name,
      } as LabelValue)
  );
  const mappedReviewer = [
    {
      label: "CGSO",
      value: "CGSO",
    },
    {
      label: "CTO",
      value: "CTO",
    },
    {
      label: "CMO",
      value: "CMO",
    },
  ] as LabelValue[];

  const applyFilter = (field: string, value: string) => {
    const filterVal = {
      ...orderFilters,
      [field]: value,
    } as Record<string, string>;

    // So no selected status specified as GSO can can be either submitted or for printing
    if (value === "CGSO" && field === "reviewer") {
      setSelectedStatus("");
    }
    setOrderFilters(filterVal);
  };
  const removeFilters = () => {
    const filterVal = {} as Record<string, string>;
    setOrderFilters(filterVal);
    setReportsParamValue("");
    setSearchParams({});
  };
  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    removeFilters();
  };
  const getFilterCount = () => {
    const values = Object.values(orderFilters).filter((x) => !!x);
    let filterEntityCount = values.length || 0;
    if (!!dateNameParam) {
      filterEntityCount++;
    }
    if (!!startDateParam) {
      filterEntityCount++;
    }
    if (!!endDateParam) {
      filterEntityCount++;
    }

    return filterEntityCount;
  };

  const categorySelectionElement = (
    <div>
      <label>Category</label>
      <Dropdown
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.value);
          applyFilter("category", e.value);
        }}
        options={mappedCategories}
        filter
        placeholder="Select category"
        className="w-full"
        showClear
      />
    </div>
  );
  const statusSelectionElement = (
    <div>
      <label>Status</label>
      <Dropdown
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.value);
          applyFilter("status_name", e.value);
        }}
        options={mappedStatus}
        filter
        placeholder="Select Status"
        className="w-full"
        showClear
      />
    </div>
  );
  const reviewerSelectionElement = (
    <div>
      <label>Reviewer</label>
      <Dropdown
        value={selectedReviewer}
        onChange={(e) => {
          setSelectedReviewer(e.value);
          applyFilter("reviewer", e.value);
        }}
        options={mappedReviewer}
        filter
        placeholder="Select Reviewer"
        className="w-full"
        showClear
      />
    </div>
  );
  const reportFilterElements = !!reportsParamValue && (
    <div>
      <h5>Report filters:</h5>
      <Tag severity="info">
        <div className="flex align-items-center gap-2">
          <span className="text-base">
            {reportLabels[reportsParam as keyof typeof reportLabels]}
          </span>
        </div>
      </Tag>
      {!!dateNameParam ? (
        <Tag severity="info">
          <div className="flex align-items-center gap-2">
            <span className="text-base">Date Name: {dateNameParam}</span>
          </div>
        </Tag>
      ) : null}
      {!!startDateParam ? (
        <Tag severity="info">
          <div className="flex align-items-center gap-2">
            <span className="text-base">Start Date: {startDateParam}</span>
          </div>
        </Tag>
      ) : null}
      {!!endDateParam ? (
        <Tag severity="info">
          <div className="flex align-items-center gap-2">
            <span className="text-base">End Date: {endDateParam}</span>
          </div>
        </Tag>
      ) : null}
      <Button
        label="Clear Filters"
        severity="secondary"
        className="block mt-4"
        outlined
        onClick={handleRemove}
      />
    </div>
  );

  return {
    orderFilters,
    selectedCategory,
    selectedStatus,
    selectedReviewer,
    categorySelectionElement,
    statusSelectionElement,
    reviewerSelectionElement,
    reportFilterElements,
    getFilterCount,
  };
}
