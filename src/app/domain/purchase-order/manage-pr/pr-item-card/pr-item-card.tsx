import "./pr-item-card.scss";
import {
  getTotalAmount,
  getTotalItemsQuantity,
  tagTemplate,
} from "@core/utility/data-table-template";
import {
  GetPIDDto,
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
} from "@api/api";
import { dateFormat } from "@shared/formats/date-time-format";
import { numberFormat } from "@shared/formats/number-format";
import { currencyFormat } from "@shared/formats/currency-format";
import {
  isStage4,
  showDeliveryElements as shouldShowDeliveryElements,
} from "@core/utility/stage-helper";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useRef, useState } from "react";
import { RequestStatusAction } from "@core/model/request-status.enum";
import { Accordion, AccordionTab } from "primereact/accordion";
import PrItemDeliveryLogCard from "../pr-item-delivery-log-card/pr-item-delivery-log-card";
import {
  getTotalDeliveredAmount,
  getTotalDeliveredQuantity,
} from "@core/utility/order-helper";
import PrintInspection from "@domain/purchase-order/edit-order/print-inspection/print-inspection";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";

export interface PrItemCardProps {
  purchaseRequest: GetPurchaseRequestDto;
  order: GetPurchaseOrderDto;
  onAction: (action: string, purchaseRequest: GetPurchaseRequestDto) => void;
}

export function PrItemCard({
  order,
  purchaseRequest: item,
  onAction,
}: PrItemCardProps) {
  const navigate = useNavigate();
  const totalDeliveredQuantity = getTotalDeliveredQuantity(item);
  const totalDeliveredAmount = getTotalDeliveredAmount(item);
  const status = order.status_name;
  const [deliveredPR, setDeliveredPr] = useState<GetPIDDto | null>(null);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
    navigate(`view/${data.code}`);
  };
  const handleAddDelivery = (
    e: SyntheticEvent,
    data: GetPurchaseRequestDto
  ) => {
    e.preventDefault();
    navigate(`delivery/${data.code}`);
  };
  const handlePrintDelivery = (deliveredPR: GetPIDDto) => {
    setDeliveredPr(deliveredPR);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const viewButton = (item: GetPurchaseRequestDto) => (
    <Button
      label="View"
      severity="secondary"
      outlined
      onClick={(e) => handleView(e, item)}
    />
  );
  const printInspectionSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        {deliveredPR && (
          <PrintInspection
            data={item}
            order={order}
            deliveryItem={deliveredPR}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="pr-item-card">
      {printInspectionSection()}

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

        {shouldShowDeliveryElements(status) ? (
          <section className="flex flex-col justify-center gap-3 border-t border-b border-gray-200 w-full p-4 bg-secondary">
            <span className="text-white">Delivery Overview</span>
            <div className="flex justify-center gap-3">
              <div className="flex flex-col items-center justify-center">
                <p className="text-white font-bold">
                  {currencyFormat(totalDeliveredAmount || 0, "PHP")}
                </p>
                <p className="hint">Completed Amount</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-white font-bold">
                  {numberFormat(totalDeliveredQuantity || 0)}
                </p>
                <p className="hint">Delivered Items</p>
              </div>
            </div>
            <Accordion>
              <AccordionTab header="Delivery Logs" className="p-0">
                {(item.delivery || []).map((record) => (
                  <PrItemDeliveryLogCard
                    key={record.batch}
                    data={record}
                    onPrint={handlePrintDelivery}
                  />
                ))}
              </AccordionTab>
            </Accordion>
          </section>
        ) : null}

        <section className="flex justify-end w-full px-4 py-4">
          {isStage4(status) ? (
            <section className="gap-2 flex">
              {shouldShowDeliveryElements(status) ? (
                <Button
                  label="Add Delivery"
                  onClick={(e) => handleAddDelivery(e, item)}
                  severity="secondary"
                  outlined
                />
              ) : null}
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
    </div>
  );
}

export default PrItemCard;
