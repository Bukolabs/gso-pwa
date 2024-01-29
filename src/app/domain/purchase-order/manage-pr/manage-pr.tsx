import "./manage-pr.scss";
import { SyntheticEvent, useRef, useState } from "react";
import { PickList } from "primereact/picklist";
import { useGetUnassignedRequestQy } from "@core/query/request.query";
import {
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import { currencyFormat } from "@shared/formats/currency-format";
import {
  getTotalAmount,
  getTotalItems,
  tagTemplate,
} from "@core/utility/data-table-template";
import { dateFormat } from "@shared/formats/date-time-format";
import { numberFormat } from "@shared/formats/number-format";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import ItemCard from "@core/ui/item-card/item-card";
import { ItemFormSchema } from "@core/model/form.rule";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import PrintInspection from "../edit-order/print-inspection/print-inspection";
import { useReactToPrint } from "react-to-print";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";

interface ViewPRData {
  data: GetPurchaseRequestDto;
  requests: ItemFormSchema[];
}
export interface ManagePrProps {
  status: string;
  category: string;
  selectedList: GetPurchaseRequestDto[];
  order?: GetPurchaseOrderDto;
  onSelect: (selected: GetPurchaseRequestDto[]) => void;
  onAction: (action: string, item: GetPurchaseRequestDto) => void;
}

export function ManagePr({
  status,
  category,
  selectedList,
  order,
  onSelect,
  onAction,
}: ManagePrProps) {
  const navigate = useNavigate();
  const [source, setSource] = useState<GetPurchaseRequestDto[]>([]);
  const [target, setTarget] = useState(selectedList);
  const [visible, setVisible] = useState(false);
  const [viewData, setViewData] = useState<ViewPRData | null>(null);
  const [filter] = useState({
    category: category,
    status_name: "APPROVED",
  });
  const isStage4 =
    status === RequestStatus.INSPECTION ||
    status === RequestStatus.PARTIAL ||
    status === RequestStatus.FULFILLED ||
    status === RequestStatus.UNFULFILLED ||
    status === RequestStatus.CANCELLED;
  const isStage3And4 =
    status === RequestStatus.AWARDED ||
    status === RequestStatus.POREVIEW ||
    status === RequestStatus.POAPPROVED ||
    status === RequestStatus.PODECLINED ||
    status === RequestStatus.INSPECTION ||
    status === RequestStatus.PARTIAL ||
    status === RequestStatus.FULFILLED ||
    status === RequestStatus.UNFULFILLED ||
    status === RequestStatus.CANCELLED;
  const rowLimit = 99999;
  const pageNumber = 0;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleApiSuccess = (
    response: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    const alreadyIncludedRequestCodes = selectedList.map((item) => item.code);
    const filteredData = (response.data || []).filter(
      (item) => alreadyIncludedRequestCodes.indexOf(item.code) < 0
    );
    setSource(filteredData);
  };
  useGetUnassignedRequestQy(
    "",
    rowLimit,
    pageNumber,
    undefined,
    filter,
    undefined,
    handleApiSuccess
  );

  const getSplitButtonItems = (data: GetPurchaseRequestDto) => [
    {
      label: RequestStatusAction.FULFILL,
      command: () => {
        onAction(RequestStatusAction.FULFILL, data);
      },
    },
    {
      label: RequestStatusAction.UNFULFILL,
      command: () => {
        onAction(RequestStatusAction.UNFULFILL, data);
      },
    },
    {
      label: RequestStatusAction.LATE,
      command: () => {
        onAction(RequestStatusAction.LATE, data);
      },
    },
    {
      label: RequestStatusAction.CANCEL,
      command: () => {
        onAction(RequestStatusAction.CANCEL, data);
      },
    },
  ];

  const handleView = (e: SyntheticEvent, data: GetPurchaseRequestDto) => {
    e.preventDefault();
    setVisible(true);

    const requests = (data.items || []).map(
      (item) =>
        ({
          name: item.item_name,
          brand: item.brand_name,
          category: item.category_name,
          description: item.description,
          isActive: true,
          cost: item.price,
          unit: item.unit,
          unitName: item.unit_name,
          categoryName: item.category_name,
          quantity: item.quantity,
        } as ItemFormSchema)
    );

    setViewData({
      data,
      requests,
    });
  };
  const handleReadyPrint = (data: GetPurchaseRequestDto) => {
    setViewData({ data, requests: [] });
    setTimeout(() => {
      handlePrint();
    }, 100);
  };
  const onChange = (event: any) => {
    setSource(event.source);
    setTarget(event.target);

    onSelect(event.target);
  };
  const handlePRView = (prId: string) => {
    navigate(`/request/${prId}`);
  };

  const printInspectionSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        {viewData?.data && (
          <PrintInspection data={viewData?.data} order={order} />
        )}
      </div>
    </div>
  );
  const viewButton = (item: GetPurchaseRequestDto) => (
    <Button
      label="View"
      severity="secondary"
      outlined
      onClick={(e) => handleView(e, item)}
    />
  );
  const itemTemplate = (item: GetPurchaseRequestDto) => {
    return (
      <div className="flex flex-wrap items-center gap-3 border border-gray-300 rounded">
        <section className="w-full border-0 px-4 py-2">
          <div className="flex justify-between">
            <div>
              <h4 className="text-gray-800">PR#: {item.pr_no}</h4>
              <small className="text-gray-500 block">
                Department: <b>{item.department_name}</b>
              </small>
            </div>
            <div className="flex flex-col items-end justify-start">
              {tagTemplate(item.status_name)}
            </div>
          </div>
        </section>
        <section className="flex justify-center gap-3 border-t border-b border-gray-400 w-full p-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {dateFormat(item.pr_date)}
            </p>
            <p className="hint">Due Date</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {numberFormat(getTotalItems(item))}
            </p>
            <p className="hint">Total Items</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {currencyFormat(getTotalAmount(item), "PHP")}
            </p>
            <p className="hint">Total Amount</p>
          </div>
        </section>
        <section className="flex justify-end w-full px-4 pb-4">
          {isStage4 ? (
            <section className="gap-2 flex">
              <Button
                label="Print"
                severity="secondary"
                outlined
                onClick={() => handleReadyPrint(item)}
              />
              <SplitButton
                label="View"
                onClick={(e) => handleView(e, item)}
                model={getSplitButtonItems(item)}
                outlined
              />
            </section>
          ) : (
            viewButton(item)
          )}
        </section>
      </div>
    );
  };
  const prSidebar = (
    <Sidebar
      visible={visible}
      onHide={() => {
        setVisible(false);
        setViewData(null);
      }}
      className="w-full md:w-2/5"
    >
      <h2>Request Items</h2>
      <Button
        label="View full request"
        onClick={(e) => handlePRView(viewData?.data.code || "")}
        size="small"
        className="block mb-4"
        severity="secondary"
        outlined
      />
      <div className="flex flex-wrap gap-2">
        {(viewData?.requests || []).map((item, id) => (
          <ItemCard key={id} itemNo={id} item={item}>
            <FormBrandItemProvider>Hello</FormBrandItemProvider>
          </ItemCard>
        ))}
      </div>
    </Sidebar>
  );

  return (
    <div className="manage-pr">
      {printInspectionSection()}
      {prSidebar}

      {isStage3And4 ? (
        <section className="grid md:grid-cols-2 gap-4 grid-cols-1">
          {target.map((item, id) => (
            <div key={id}>{itemTemplate(item)}</div>
          ))}
        </section>
      ) : (
        <section>
          <p>
            Make sure to select a <b>category</b> in the <b>Information tab</b>.
          </p>
          <p className="mb-4 hint">
            Select approved purchase requests from the following list box in the
            left. Add the desired PR to the Selected PR list box on the right.
          </p>

          <PickList
            source={source}
            target={target}
            onChange={onChange}
            itemTemplate={itemTemplate}
            breakpoint="1280px"
            sourceHeader="Approved PR"
            targetHeader="Selected PR"
            sourceStyle={{ height: "24rem" }}
            targetStyle={{ height: "24rem" }}
            sourceFilterPlaceholder="Search by name"
            targetFilterPlaceholder="Search by name"
          />
        </section>
      )}
    </div>
  );
}

export default ManagePr;
