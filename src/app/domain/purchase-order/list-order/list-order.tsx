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

export function ListOrder() {
  const navigate = useNavigate();
  const { isBACApprover } = useUserIdentity();
  const { isMobileMode } = useScreenSize();
  const [isTableView, setIsTableView] = useState(!isMobileMode);
  const { getReviewers } = useReviewHook();

  const rowLimit = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);

  const {
    data: purchaseOrders,
    isLoading,
    isError,
    error,
  } = useGetOrderQy(searchTerm, rowLimit, pageNumber, undefined, undefined);

  const editRecord = (item: GetPurchaseOrderDto) => {
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
  const grid = (
    <section>
      <DataTable
        value={purchaseOrders?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column field="po_no" header="PO#"></Column>
        <Column field="category_name" header="Category"></Column>
        <Column field="mode_of_procurement" header="Procurement"></Column>
        <Column field="supplier" header="Supplier"></Column>
        <Column
          header="Total Quantity"
          body={(item) => numberFormat(getOverallItems(item))}
        ></Column>
        <Column
          header="Total Amount"
          body={(item) => currencyFormat(getOverallAmount(item), "PHP")}
        ></Column>
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
      />
    </section>
  );
  const cards = (
    <section>
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
      <HeaderContent title="Orders">
        {isBACApprover && (
          <Button
            className="w-full block md:m-0"
            label="New"
            onClick={() => navigate("new")}
            text={!isTableView}
          ></Button>
        )}
      </HeaderContent>

      <div className="p-7">
        {/* {filterElement} */}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && list}
      </div>
    </div>
  );
}

export default ListOrder;
