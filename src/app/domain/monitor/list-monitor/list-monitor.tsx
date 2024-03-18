import { useQyGetInventory } from "@core/query/inventory.query";
import "./list-monitor.scss";
import { useState } from "react";
import HeaderContent from "@shared/ui/header-content/header-content";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import SearchInput from "@shared/ui/search-input/search-input";
import { GetInventoryDto } from "@api/api";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  currencyTemplate,
  dateTemplate,
  tagTemplate,
} from "@core/utility/data-table-template";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useMonitorFilterContext } from "./list-monitor-filter.context";
import { Sidebar } from "primereact/sidebar";
import { ListMonitorFilterForm } from "./list-monitor-filter.form";

export function ListMonitor() {
  const navigate = useNavigate();
  const { getFilterCount, filterEntity } = useMonitorFilterContext();
  const [rowLimit, setRowLimit] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [filterPanel, setFilterPanel] = useState(false);

  const {
    data: inventoryResponse,
    isLoading,
    isError,
    error,
  } = useQyGetInventory(
    searchTerm,
    rowLimit,
    pageNumber,
    undefined,
    filterEntity
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: GetInventoryDto) => {
    navigate(`${item.code}`);
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const offsetValue = event.page * rowLimit;
    setFirst(event.first);
    setPageNumber(offsetValue);
    setRowLimit(event.rows);
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection title="Error Occured" message={(error as any)?.message} />
    </div>
  );
  const filterElement = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search items"
        className="w-full block"
      />
      <Button
        label="Filter"
        severity="secondary"
        outlined
        onClick={() => setFilterPanel(true)}
        badge={getFilterCount().toString()}
        badgeClassName="p-badge-danger"
      />

      <Sidebar visible={filterPanel} onHide={() => setFilterPanel(false)}>
        <ListMonitorFilterForm />
      </Sidebar>
    </div>
  );
  const grid = (
    <section>
      <h5>
        Total: <b>{inventoryResponse?.count}</b>
      </h5>

      <DataTable
        value={inventoryResponse?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column field="item_name" header="Item"></Column>
        <Column field="brand_name" header="Brand"></Column>
        <Column field="unit_name" header="Unit"></Column>
        <Column
          header="Price"
          body={(cell) => currencyTemplate(cell.item_price)}
        ></Column>
        <Column field="department_name" header="Requesting Dept."></Column>
        <Column field="pr_no" header="PR#"></Column>
        <Column field="po_no" header="PO#"></Column>
        <Column
          header="Date"
          body={(cell) => dateTemplate(cell.updated_at)}
        ></Column>
        <Column
          header="Status"
          body={(cell) => tagTemplate(cell.status_name)}
        ></Column>
      </DataTable>

      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={inventoryResponse?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    </section>
  );

  return (
    <div className="list-monitor">
      <HeaderContent title="Monitoring">
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        {filterElement}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && grid}
      </div>
    </div>
  );
}

export default ListMonitor;
