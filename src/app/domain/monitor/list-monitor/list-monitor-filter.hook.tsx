import { useQyGetInventoryStatus } from "@core/query/inventory.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultFilter = (status = "") => {
  let defaultFilter = {} as Record<string, any>;

  if (status) {
    defaultFilter.status_name = status;
  }
  return defaultFilter;
};

export function useListMonitorFilter() {
  let [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("reports");
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [filterEntity, setFilterEntity] = useState<Record<string, string>>(
    defaultFilter(statusParam || "")
  );
  const dateNameParam = searchParams.get("dateName") || undefined;
  const startDateParam = searchParams.get("startDate") || undefined;
  const endDateParam = searchParams.get("endDate") || undefined;

  // API GET STATUS
  const { data: status } = useQyGetInventoryStatus("", 999, 0, undefined);
  const mappedStatus = (status?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.name,
      } as LabelValue)
  );

  const getFilterCount = () => {
    const values = Object.values(filterEntity).filter((x) => !!x);
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
  const applyFilter = (field: string, value: string) => {
    const filterVal = {
      ...filterEntity,
      [field]: value,
    } as Record<string, string>;

    // So no selected status specified as GSO can can be either submitted or for printing
    if (value === "CGSO" && field === "reviewer") {
      setSelectedStatus("");
    }
    setFilterEntity(filterVal);
  };
  const removeFilters = () => {
    const filterVal = {} as Record<string, string>;
    setFilterEntity(filterVal);
    setSelectedStatus("");
    setSearchParams({});
  };
  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    removeFilters();
  };

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
  const reportFilterElements = !!selectedStatus && (
    <div>
      <h5>Report filters:</h5>
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
    filterEntity,
    reportFilterElements,
    statusSelectionElement,
    removeFilters,
    getFilterCount,
  };
}
