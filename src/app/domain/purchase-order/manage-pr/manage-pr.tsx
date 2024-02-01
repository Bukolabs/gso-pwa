import "./manage-pr.scss";
import { SyntheticEvent, useRef, useState } from "react";
import { PickList } from "primereact/picklist";
import { useGetUnassignedRequestQy } from "@core/query/request.query";
import {
  GetPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import { currencyFormat } from "@shared/formats/currency-format";
import {
  getTotalAmount,
  getTotalDeliveredItemsQuantity,
  getTotalFulfilledAmount,
  getTotalItemsQuantity,
  tagTemplate,
} from "@core/utility/data-table-template";
import { dateFormat } from "@shared/formats/date-time-format";
import { numberFormat } from "@shared/formats/number-format";
import { Button } from "primereact/button";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
import { SplitButton } from "primereact/splitbutton";
import PrintInspection from "../edit-order/print-inspection/print-inspection";
import { useReactToPrint } from "react-to-print";
import { shouldShowInspectionElements } from "@core/utility/stage-helper";
import { useNavigate } from "react-router-dom";
import { useEditOrderContext } from "../edit-order/edit-order.context";

const isStage4 = (status: string) =>
  status === RequestStatus.INSPECTION ||
  status === RequestStatus.PARTIAL ||
  status === RequestStatus.COMPLETED;
const shouldDisplayAwardedCards = (status: string) =>
  status === RequestStatus.AWARDED ||
  status === RequestStatus.POREVIEW ||
  status === RequestStatus.POAPPROVED ||
  status === RequestStatus.PODECLINED ||
  status === RequestStatus.INSPECTION ||
  status === RequestStatus.PARTIAL ||
  status === RequestStatus.COMPLETED;
const shouldGetUnassigned = (status: string) =>
  status === RequestStatus.CATEGORIZED ||
  status === RequestStatus.POSTED ||
  status === RequestStatus.BIDDING;

export interface ManagePrProps {
  status: string;
  category: string;
  selectedList: GetPurchaseRequestDto[];
  onSelect: (selected: GetPurchaseRequestDto[]) => void;
  onAction: (action: string, item: GetPurchaseRequestDto) => void;
}

export function ManagePr({
  status,
  category,
  selectedList,
  onSelect,
  onAction,
}: ManagePrProps) {
  const navigate = useNavigate();
  const { orders } = useEditOrderContext();
  const [source, setSource] = useState<GetPurchaseRequestDto[]>([]);
  const [target, setTarget] = useState(selectedList);
  const [selectedRequest, setSelectedRequest] =
    useState<GetPurchaseRequestDto | null>(null);
  const [filter] = useState({
    category: category,
    status_name: "APPROVED",
  });
  const currentOrder = orders?.data?.[0];

  const rowLimit = 99999;
  const pageNumber = 0;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // GET UNASSIGNED PR
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
    shouldGetUnassigned(status),
    handleApiSuccess
  );

  const getSplitButtonItems = (data: GetPurchaseRequestDto) => [
    {
      label: RequestStatusAction.PARTIAL,
      command: () => {
        onAction(RequestStatusAction.PARTIAL, data);
      },
    },
    {
      label: RequestStatusAction.COMPLETE,
      command: () => {
        onAction(RequestStatusAction.COMPLETE, data);
      },
    },
  ];
  const handleView = (e: SyntheticEvent, data: GetPurchaseRequestDto) => {
    e.preventDefault();
    navigate(`${data.code}`);
  };
  const handleReadyPrint = (data: GetPurchaseRequestDto) => {
    setSelectedRequest(data);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };
  const onChange = (event: any) => {
    setSource(event.source);
    setTarget(event.target);

    onSelect(event.target);
  };

  const printInspectionSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        {selectedRequest && (
          <PrintInspection data={selectedRequest} order={currentOrder} />
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
    const totalDeliveredItems = getTotalDeliveredItemsQuantity(item);
    const totalFulfilledAmount = getTotalFulfilledAmount(item);
    return (
      <div className="flex flex-wrap items-center border border-gray-300 rounded">
        <section className="w-full border-b border-gray-200 px-4 py-2">
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
        <section className="flex justify-center gap-3 border-b border-gray-200 w-full p-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {dateFormat(item.pr_date)}
            </p>
            <p className="hint">Due Date</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {numberFormat(getTotalItemsQuantity(item))}
            </p>
            <p className="hint">Total Quantity</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">
              {currencyFormat(getTotalAmount(item), "PHP")}
            </p>
            <p className="hint">Total Amount</p>
          </div>
        </section>
        {shouldShowInspectionElements(status) ? (
          <section className="flex justify-center gap-3 border-b border-gray-200 w-full p-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">
                {currencyFormat(totalFulfilledAmount || 0, "PHP")}
              </p>
              <p className="hint">Fulfilled Amount</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">
                {numberFormat(totalDeliveredItems || 0)}
              </p>
              <p className="hint">Delivered Items</p>
            </div>
          </section>
        ) : null}
        <section className="flex justify-end w-full px-4 py-4">
          {isStage4(status) ? (
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

  return (
    <div className="manage-pr">
      {printInspectionSection()}

      {shouldDisplayAwardedCards(status) ? (
        <section className="grid md:grid-cols-2 gap-4 grid-cols-1">
          {(currentOrder?.purchase_requests || []).map((item, id) => (
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
