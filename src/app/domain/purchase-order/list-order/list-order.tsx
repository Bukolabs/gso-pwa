import HeaderContent from "@shared/ui/header-content/header-content";
import "./list-order";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useScreenSize from "@core/utility/screen-size";
import { useGetOrderQy } from "@core/query/order.query";
import { DataTable } from "primereact/datatable";
import { GetPurchaseOrderDto } from "@api/api";
import { Column } from "primereact/column";
import { dateTemplate, tagTemplate } from "@core/utility/data-table-template";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import OrderCard from "@core/ui/order-card/order-card";
import { dateFormat } from "@shared/formats/date-time-format";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { Avatar } from "primereact/avatar";
import { getOverallAmount, getOverallItems } from "@core/utility/order-helper";
import { useOrderFilterContext } from "./order.filter.context";
import SearchInput from "@shared/ui/search-input/search-input";
import { Sidebar } from "primereact/sidebar";
import { OrderFilterForm } from "./order-filter.form";

export function ListOrder() {
  const { orderFilters } = useOrderFilterContext();
  const navigate = useNavigate();
  const { isBACApprover, isAdmin, isGso } = useUserIdentity();
  const { isMobileMode } = useScreenSize();
  const [isTableView, setIsTableView] = useState(!isMobileMode);
  const { getReviewers } = useReviewHook();

  const [rowLimit, setRowLimit] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [filterPanel, setFilterPanel] = useState(false);

  const {
    data: purchaseOrders,
    isLoading,
    isError,
    error,
  } = useGetOrderQy(searchTerm, rowLimit, pageNumber, undefined, orderFilters);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: GetPurchaseOrderDto) => {
    navigate(`${item.code}`);
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const offsetValue = event.page * rowLimit;
    setFirst(event.first);
    setPageNumber(offsetValue);
    setRowLimit(event.rows);
  };
  const handleTableViewMode = () => {
    setIsTableView(true);
  };
  const handleCardViewMode = () => {
    setIsTableView(false);
  };
  const reviewColumn = (data: GetPurchaseOrderDto) => {
    const reviewers = getReviewers({
      isGso: data.is_gso,
      isTreasurer: data.is_treasurer,
      isMayor: data.is_mayor,
    } as ReviewerStatus);

    return (
      <div className="flex gap-2">
        {reviewers.map((item, id) => (
          <section key={id} className="flex flex-col items-center">
            <Avatar shape="circle" icon={item.value} />
            <label className="text-gray-500">{item.label}</label>
          </section>
        ))}
      </div>
    );
  };
  const getFilterCount = () => {
    const values = Object.values(orderFilters).filter((x) => !!x);
    const count = values.length || 0;
    return count.toString();
  };
  const filterElement = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search order"
        className="w-full block"
      />
      <div>
        <Button
          label="Filter"
          severity="secondary"
          outlined
          onClick={() => setFilterPanel(true)}
          badge={getFilterCount()}
          badgeClassName="p-badge-danger"
        />
      </div>

      <Sidebar visible={filterPanel} onHide={() => setFilterPanel(false)}>
        <OrderFilterForm />
      </Sidebar>
    </div>
  );

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
  const viewMode = (
    <div className="float-right">
      <span className="p-buttonset">
        <Button
          outlined={true}
          severity="secondary"
          size="small"
          icon="pi pi-table"
          onClick={handleTableViewMode}
        />
        <Button
          outlined={true}
          severity="secondary"
          size="small"
          icon="pi pi-id-card"
          onClick={handleCardViewMode}
        />
      </span>
    </div>
  );
  const totalDataContent = (
    <span className="font-bold">Total: {purchaseOrders?.count} </span>
  );
  const grid = (
    <section>
      <h5>
        Total: <b>{purchaseOrders?.count}</b>
      </h5>

      <DataTable
        value={purchaseOrders?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column field="po_no" header="PO#"></Column>
        <Column field="category_name" header="Category"></Column>
        <Column field="mode_of_procurement" header="Procurement"></Column>
        {(isAdmin || isGso || isBACApprover) && (
          <Column field="supplier" header="Supplier"></Column>
        )}
        {(isAdmin || isGso || isBACApprover) && (
          <Column
            header="Total Quantity"
            body={(item) => numberFormat(getOverallItems(item))}
          ></Column>
        )}
        {(isAdmin || isGso || isBACApprover) && (
          <Column
            header="Total Amount"
            body={(item) => currencyFormat(getOverallAmount(item), "PHP")}
          ></Column>
        )}
        <Column
          header="Due Date"
          body={(data: GetPurchaseOrderDto) => dateTemplate(data.po_date)}
        ></Column>
        <Column
          header="Status"
          body={(data: any) => tagTemplate(data.status_name)}
        ></Column>
        <Column header="Review" body={reviewColumn}></Column>
      </DataTable>

      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={purchaseOrders?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
        leftContent={totalDataContent}
      />
    </section>
  );
  const cards = (
    <section>
      <h5>
        Total: <b>{purchaseOrders?.count}</b>
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-7 items-baseline">
        {(purchaseOrders?.data || []).map((item, id) => {
          const reviewers = getReviewers({
            isGso: item.is_gso,
            isTreasurer: item.is_treasurer,
            isMayor: item.is_mayor,
          } as ReviewerStatus);

          return (
            <OrderCard
              key={id}
              code={item.code}
              title={`PO No. ${item.po_no}` || "-"}
              subTitle={item.category_name}
              supplier={item.supplier || "No Supplier Yet"}
              procurement={item.mode_of_procurement || "-"}
              status={item?.status_name}
              reviewers={reviewers}
              dueDate={dateFormat(item.po_date)}
              totalAmount={currencyFormat(getOverallAmount(item as any), "PHP")}
              totalPr={numberFormat(getOverallItems(item as any))}
              onClick={(code) => navigate(code)}
            />
          );
        })}
      </div>
      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={purchaseOrders?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
        className="mb-20"
        leftContent={totalDataContent}
      />
    </section>
  );
  const list = (
    <>
      <div>{viewMode}</div>
      <section className="clear-both">{!isTableView ? cards : grid}</section>
    </>
  );

  return (
    <div className="list-order">
      <HeaderContent title="Purchase Orders">
        {isBACApprover && (
          <Button
            className="w-full block md:m-0"
            label="New Categorization"
            onClick={() => navigate("new")}
            text={!isTableView}
          ></Button>
        )}
      </HeaderContent>

      <div className="p-7">
        {filterElement}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && list}
      </div>
    </div>
  );
}

export default ListOrder;
