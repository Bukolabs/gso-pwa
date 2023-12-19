import { Button } from "primereact/button";
import "./list-request";
import { useNavigate } from "react-router-dom";
import PurchaseCard from "@core/ui/purchase-card/purchase-card";
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
  currencyTemplate,
  dateTemplate,
  numberTemplate,
  tagTemplate,
} from "@core/utility/data-table-template";
import { sumBy } from "lodash-es";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Avatar } from "primereact/avatar";
import { useReviewHook } from "@core/services/review.hook";

export function ListRequest() {
  const navigate = useNavigate();
  const { getReviewers } = useReviewHook();
  const { isMobile } = useScreenSize();

  const rowLimit = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [first, setFirst] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanel, setFilterPanel] = useState(false);
  const {
    data: purchaseRequests,
    isLoading,
    isError,
    error,
  } = useGetRequestQy(searchTerm, rowLimit, pageNumber);

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
  const filter = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search request"
        className="w-full block"
      />
      <div>
        <Button
          className="block"
          label="Filter"
          severity="secondary"
          outlined
          onClick={() => setFilterPanel(true)}
        />
      </div>
      <Sidebar visible={filterPanel} onHide={() => setFilterPanel(false)}>
        <h2>Filters</h2>
        <p>
          Select the following filters you want to apply to the current table.
        </p>
      </Sidebar>
    </div>
  );
  const totalAmountColumn = (data: GetPurchaseRequestDto) => {
    const total = sumBy(data?.items || [], (x) => x.price * (x.quantity || 0));
    return currencyTemplate(total);
  };
  const totalItemsColumn = (data: GetPurchaseRequestDto) => {
    const total = sumBy(data?.items || [], (x) => x.quantity || 0);
    return numberTemplate(total);
  };
  const reviewColumn = (data: GetPurchaseRequestDto) => {
    const reviewers = getReviewers(data);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-7 items-baseline">
      <PurchaseCard
        title="PR# 122"
        subTitle="Department of Tourism"
        status="Submitted"
      />
      <PurchaseCard
        title="PR# 144"
        subTitle="Department of Labor"
        status="Review"
        hasReview={true}
      />
    </div>
  );
  const list = isMobile ? cards : grid;

  return (
    <div className="list-request">
      <HeaderContent title="Requests">
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
          text={isMobile}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        {filter}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && list}
      </div>
    </div>
  );
}

export default ListRequest;
