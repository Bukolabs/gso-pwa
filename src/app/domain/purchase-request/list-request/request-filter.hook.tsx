import { useGetCategory } from "@core/query/category.query";
import { useGetDepartmentQy } from "@core/query/department.query";
import { useGetStatus } from "@core/query/status.query";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { LabelValue } from "@shared/models/label-value.interface";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultFilter = (
  requestorDepartment: string | null,
  status = "",
  reviewer = ""
) => {
  const defaultFilter = {} as Record<string, string>;

  if (requestorDepartment) {
    defaultFilter.department = requestorDepartment;
  }

  if (status) {
    defaultFilter.status_name = status;
  }

  if (reviewer) {
    defaultFilter.reviewer = reviewer;
  }

  return defaultFilter;
};

export function useRequestFilter() {
  let [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status_name");
  const reviewerParam = searchParams.get("reviewer");

  const { requestorDepartment } = useUserIdentity();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [selectedReviewer, setSelectedReviewer] = useState(reviewerParam || "");

  const [requestFilters, setRequestFilters] = useState<Record<string, string>>(
    defaultFilter(requestorDepartment, statusParam || "", reviewerParam || "")
  );

  const { data: department } = useGetDepartmentQy("", 9999999, 0);
  const mappedDepartments = (department?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  const { data: categories } = useGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  const { data: status } = useGetStatus();
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
    {
      label: "CBO",
      value: "CBO",
    },
    {
      label: "CGSO_2",
      value: "CGSO_FF",
    },
  ] as LabelValue[];

  const departmentSelectionElement = (
    <div>
      <label>Department</label>
      <Dropdown
        value={selectedDepartment}
        onChange={(e) => {
          setSelectedDepartment(e.value);
          const filterVal = {
            ...requestFilters,
            department: e.value,
          } as Record<string, string>;
          setRequestFilters(filterVal);
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
          const filterVal = {
            ...requestFilters,
            category: e.value,
          } as Record<string, string>;
          console.log({ filterVal });
          setRequestFilters(filterVal);
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
          const filterVal = {
            ...requestFilters,
            status_name: e.value,
          } as Record<string, string>;
          setRequestFilters(filterVal);
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

          let filterVal = {
            ...requestFilters,
            reviewer: e.value,
          } as Record<string, string>;

          if (e.value === "CGSO") {
            filterVal = {
              reviewer: e.value,
            };
            setSelectedStatus('')
          }

          setRequestFilters(filterVal);
        }}
        options={mappedReviewer}
        filter
        placeholder="Select Reviewer"
        className="w-full"
        showClear
      />
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
  };
}
