import { useQyGetCategory } from "@core/query/category.query";
import { useGetStatusQy } from "@core/query/status.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultFilter = (status = "", reviewer = "") => {
  const defaultFilter = {} as Record<string, string>;

  if (status) {
    defaultFilter.status_name = status;
  }

  if (reviewer) {
    defaultFilter.reviewer = reviewer;
  }

  return defaultFilter;
};

export function useOrderFilter() {
  let [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status_name");
  const reviewerParam = searchParams.get("reviewer");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [selectedReviewer, setSelectedReviewer] = useState(reviewerParam || "");

  const [orderFilters, setOrderFilters] = useState<Record<string, string>>(
    defaultFilter(statusParam || "", reviewerParam || "")
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

  const categorySelectionElement = (
    <div>
      <label>Category</label>
      <Dropdown
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.value);
          const filterVal = {
            ...orderFilters,
            category: e.value,
          } as Record<string, string>;
          setOrderFilters(filterVal);
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
            ...orderFilters,
            status_name: e.value,
          } as Record<string, string>;
          setOrderFilters(filterVal);
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
            ...orderFilters,
            reviewer: e.value,
          } as Record<string, string>;

          if (e.value === "CGSO") {
            filterVal = {
              reviewer: e.value,
            };
            setSelectedStatus("");
          }

          setOrderFilters(filterVal);
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
    orderFilters,
    selectedCategory,
    selectedStatus,
    selectedReviewer,
    categorySelectionElement,
    statusSelectionElement,
    reviewerSelectionElement,
  };
}
