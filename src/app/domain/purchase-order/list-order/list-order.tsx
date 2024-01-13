import HeaderContent from "@shared/ui/header-content/header-content";
import "./list-order";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useScreenSize from "@core/utility/screen-size";
import ViewSelection from "@core/ui/view-selection/view-selection";
import { useGetOrderQy } from "@core/query/order.query";
import { DataTable } from "primereact/datatable";
import { GetPurchaseOrderDto } from "@api/api";
import { Column } from "primereact/column";
import { dateTemplate, tagTemplate } from "@core/utility/data-table-template";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useReviewHook } from "@core/services/review.hook";
import OrderCard from "@core/ui/order-card/order-card";
import { dateFormat } from "@shared/formats/date-time-format";
import { sumBy } from "lodash-es";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";

export function ListOrder() {
  const navigate = useNavigate();
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
  const getTotalAmount = (data: GetPurchaseOrderDto) => {
    const total = sumBy(
      data?.purchase_requests || [],
      (x) => (x.total_amount || 0) * (x.total_quantity || 0)
    );
    return total;
  };
  const getTotalItems = (data: GetPurchaseOrderDto) => {
    const total = sumBy(
      data?.purchase_requests || [],
      (x) => x.total_quantity || 0
    );
    return total;
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
        value={purchaseOrders?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column field="po_no" header="PO #"></Column>
        <Column
          header="Issued Date"
          body={(data: GetPurchaseOrderDto) => dateTemplate(data.po_date)}
        ></Column>
        <Column field="mode_of_procurement" header="Procurement"></Column>
        <Column field="supplier" header="Supplier"></Column>
        <Column
          header="Status"
          body={(data: GetPurchaseOrderDto) => tagTemplate("CATEGORIZED")}
        ></Column>
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
          return (
            <OrderCard
              key={id}
              code={item.code}
              title={`PO No. ${item.po_no}` || "-"}
              subTitle={"Category"}
              supplier={item.supplier || "No Supplier Yet"}
              status={"CATEGORIZED"}
              reviewers={[]}
              dueDate={dateFormat(item.po_date)}
              totalAmount={currencyFormat(getTotalAmount(item))}
              totalPr={numberFormat(getTotalItems(item))}
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
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
          text={!isTableView}
        ></Button>
      </HeaderContent>

      <div className="p-7">{list}</div>
    </div>
  );
}

export default ListOrder;
