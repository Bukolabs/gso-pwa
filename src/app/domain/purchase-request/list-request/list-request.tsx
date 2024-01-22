import { Button } from "primereact/button";
import "./list-request";
import { useNavigate } from "react-router-dom";
import useScreenSize from "@core/utility/screen-size";
import HeaderContent from "@shared/ui/header-content/header-content";
import { useState } from "react";
import { useGetRequestQy } from "@core/query/request.query";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import SearchInput from "@shared/ui/search-input/search-input";
import { GetPurchaseRequestDto } from "@api/api";
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  dateTemplate,
  getTotalAmount,
  getTotalItems,
  tagTemplate,
  totalAmountColumn,
  totalItemsColumn,
} from "@core/utility/data-table-template";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Avatar } from "primereact/avatar";
import { ReviewerStatus, useReviewHook } from "@core/services/review.hook";
import { useRequestFilterContext } from "./request-filter.context";
import { RequestFilterForm } from "./request-filter.form";
import { dateFormat } from "@shared/formats/date-time-format";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";
import RequestCard from "@core/ui/request-card/request-card";
import { RequestStatus } from "@core/model/request-status.enum";

export function ListRequest() {
  const { requestFilters } = useRequestFilterContext();
  const navigate = useNavigate();
  const { getReviewers } = useReviewHook();
  const { isMobileMode } = useScreenSize();
  const [isTableView, setIsTableView] = useState(!isMobileMode);

  const rowLimit = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [filterPanel, setFilterPanel] = useState(false);
  const {
    data: purchaseRequests,
    isLoading,
    isError,
    error,
  } = useGetRequestQy(
    searchTerm,
    rowLimit,
    pageNumber,
    undefined,
    requestFilters
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: GetPurchaseRequestDto) => {
    navigate(`${item.code}`);
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    const offsetValue = event.page * rowLimit;
    setPageNumber(offsetValue);
  };
  const handleTableViewMode = () => {
    setIsTableView(true);
  };
  const handleCardViewMode = () => {
    setIsTableView(false);
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
  const getFilterCount = () => {
    const values = Object.values(requestFilters).filter((x) => !!x);
    const count = values.length || 0;
    return count.toString();
  };
  const filterElement = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search request"
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
        <RequestFilterForm />
      </Sidebar>
    </div>
  );
  const reviewColumn = (data: GetPurchaseRequestDto) => {
    const isStage3And4 =
      data.status_name === RequestStatus.POREVIEW ||
      data.status_name === RequestStatus.POAPPROVED ||
      data.status_name === RequestStatus.PODECLINED ||
      data.status_name === RequestStatus.INSPECTION;
    const stageReviewers = isStage3And4
      ? ({
          isGso: data.po_is_gso,
          isTreasurer: data.po_is_treasurer,
          isMayor: data.po_is_mayor,
        } as ReviewerStatus)
      : ({
          isGso: data.is_gso,
          isGsoFF: data.is_gso_ff,
          isTreasurer: data.is_treasurer,
          isMayor: data.is_mayor,
          isBudget: data.is_budget,
        } as ReviewerStatus);

    const reviewers = getReviewers(stageReviewers);

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
  const grid = (
    <section>
      <DataTable
        value={purchaseRequests?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column field="pr_no" header="PR #"></Column>
        <Column field="department_name" header="Department"></Column>
        <Column field="category_name" header="Category"></Column>
        <Column header="Total Quantity" body={totalItemsColumn}></Column>
        <Column header="Total Amount" body={totalAmountColumn}></Column>
        <Column
          header="Issued Date"
          body={(data: GetPurchaseRequestDto) => dateTemplate(data.pr_date)}
        ></Column>
        <Column
          header="Status"
          body={(data: GetPurchaseRequestDto) => tagTemplate(data.status_name)}
        ></Column>
        <Column header="Review" body={reviewColumn}></Column>
      </DataTable>

      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={purchaseRequests?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    </section>
  );
  const cards = (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-7 items-baseline">
        {(purchaseRequests?.data || []).map((item, id) => {
          const reviewers = getReviewers({
            isGso: item.is_gso,
            isGsoFF: item.is_gso_ff,
            isTreasurer: item.is_treasurer,
            isMayor: item.is_mayor,
            isBudget: item.is_budget,
          } as ReviewerStatus);

          return (
            <RequestCard
              key={id}
              code={item.code}
              title={`PR No. ${item.pr_no}` || "-"}
              subTitle={item.department_name}
              status={item.status_name}
              reviewers={reviewers}
              dueDate={dateFormat(item.pr_date)}
              totalAmount={currencyFormat(getTotalAmount(item), 'PHP')}
              totalItems={numberFormat(getTotalItems(item))}
              onClick={(code) => navigate(code)}
            />
          );
        })}
      </div>

      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={purchaseRequests?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
        className="mb-20"
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
    <div className="list-request">
      <HeaderContent title="Requests">
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
          text={!isTableView}
        ></Button>
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

export default ListRequest;
