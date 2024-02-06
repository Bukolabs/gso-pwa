import "./manage-pr.scss";
import { useState } from "react";
import { PickList } from "primereact/picklist";
import { useGetUnassignedRequestQy } from "@core/query/request.query";
import {
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import {
  shouldDisplayAwardedCards,
  shouldGetUnassigned,
} from "@core/utility/stage-helper";
import { useEditOrderContext } from "../edit-order/edit-order.context";
import PrItemCard from "./pr-item-card/pr-item-card";

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
  const { orders } = useEditOrderContext();
  const [source, setSource] = useState<GetPurchaseRequestDto[]>([]);
  const [target, setTarget] = useState(selectedList);
  const [filter] = useState({
    category: category,
    status_name: "APPROVED",
  });

  const getCurrentOrder = () => {
    const orderData = orders?.data?.[0];
    const finalData = orderData
      ? orderData
      : ({ status_name: status } as GetPurchaseOrderDto);
    return finalData;
  };
  const currentOrder = getCurrentOrder();

  const rowLimit = 99999;
  const pageNumber = 0;

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

  const onChange = (event: any) => {
    setSource(event.source);
    setTarget(event.target);

    onSelect(event.target);
  };

  const itemTemplate = (item: GetPurchaseRequestDto) => {
    return !!currentOrder ? (
      <PrItemCard
        purchaseRequest={item}
        order={currentOrder}
        onAction={onAction}
      />
    ) : (
      <div>No Items Found</div>
    );
  };

  return (
    <div className="manage-pr">
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
