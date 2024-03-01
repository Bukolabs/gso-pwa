import { useQyGetCategory } from "@core/query/category.query";
import { useGetDepartmentQy } from "@core/query/department.query";
import { useGetStatusQy } from "@core/query/status.query";
import { reportFilterMap, reportLabels } from "@core/utility/label.helper";
import { LabelValue } from "@shared/models/label-value.interface";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { useState } from "react";
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

export function useRequestFilter() {
  let [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status_name");
  const reviewerParam = searchParams.get("reviewer");
  const reportsParam = searchParams.get("reports");

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [selectedReviewer, setSelectedReviewer] = useState(reviewerParam || "");

  const [requestFilters, setRequestFilters] = useState<Record<string, string>>(
    defaultFilter(statusParam || "", reviewerParam || "", reportsParam || "")
  );

  const { data: department } = useGetDepartmentQy("", 9999999, 0);
  const mappedDepartments = (department?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

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

  const applyFilter = (field: string, value: string) => {
    const filterVal = {
      ...requestFilters,
      [field]: value,
    } as Record<string, string>;

    // if CGSO and  review, no selected status as it can be either submitted or for printing
    if (value === "CGSO" && field === "reviewer") {
      setSelectedStatus("");
    }
    setRequestFilters(filterVal);
  };

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
    {
      label: "CBO",
      value: "CBO",
    },
    {
      label: "CGSO_2",
      value: "CGSO_FF",
    },
    {
      label: "CVMO",
      value: "CVMO",
    },
  ] as LabelValue[];
  const departmentSelectionElement = (
    <div>
      <label>Department</label>
      <Dropdown
        value={selectedDepartment}
        onChange={(e) => {
          setSelectedDepartment(e.value);
          applyFilter("department", e.value);
        }}
        options={mappedDepartments}
        filter
        placeholder="Select department"
        className="w-full"
        showClear
      />
    </div>
  );
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
  const reportFilterElements = (
    <div>
      <h5>Report filters:</h5>
      <Tag severity="info">
        <div className="flex align-items-center gap-2">
          <span className="text-base">
            {reportLabels[reportsParam as keyof typeof reportLabels]}
          </span>
          <i className="pi pi-times text-xs cursor-pointer"></i>
        </div>
      </Tag>
    </div>
  );

  return {
    requestFilters,
    selectedCategory,
    selectedDepartment,
    selectedStatus,
    selectedReviewer,
    departmentSelectionElement,
    categorySelectionElement,
    statusSelectionElement,
    reviewerSelectionElement,
    reportFilterElements,
  };
}
