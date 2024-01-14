import "./manage-pr.scss";
import { useState } from "react";
import { PickList } from "primereact/picklist";
import { useGetRequestQy } from "@core/query/request.query";
import {
  GetPurchaseRequestDto,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import { currencyFormat } from "@shared/formats/currency-format";
import {
  getTotalAmount,
  getTotalItems,
} from "@core/utility/data-table-template";
import { dateFormat } from "@shared/formats/date-time-format";
import { numberFormat } from "@shared/formats/number-format";

export interface ManagePrProps {
  category: string;
  selectedList: GetPurchaseRequestDto[];
  onSelect: (selected: GetPurchaseRequestDto[]) => void;
}

export function ManagePr({ category, selectedList, onSelect }: ManagePrProps) {
  const [source, setSource] = useState<GetPurchaseRequestDto[]>([]);
  const [target, setTarget] = useState(selectedList);

  const [filter] = useState({
    category: category,
    status_name: "APPROVED",
  });
  const rowLimit = 99999;
  const pageNumber = 0;

  const handleApiSuccess = (
    response: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    const alreadyIncludedRequestCodes = selectedList.map((item) => item.code);
    const filteredData = (response.data || []).filter(
      (item) => alreadyIncludedRequestCodes.indexOf(item.code) < 0
    );
    setSource(filteredData);
  };
  useGetRequestQy(
    "",
    rowLimit,
    pageNumber,
    undefined,
    filter,
    undefined,
    handleApiSuccess
  );

  const itemTemplate = (item: GetPurchaseRequestDto) => {
    return (
      <div className="flex flex-wrap p-2 items-center gap-3">
        <section className="w-full border-0">
          <div className="flex justify-between">
            <div>
              <h4 className="text-gray-800">PR#: {item.pr_no}</h4>
              <small className="text-gray-500 block">
                Department: <b>{item.department_name}</b>
              </small>
              <small className="text-gray-500 block">
                Due Date: <b>{dateFormat(item.pr_date)}</b>
              </small>
              <small className="text-gray-500 block">
                Total Items: <b>{numberFormat(getTotalItems(item))}</b>
              </small>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">
                {currencyFormat(getTotalAmount(item))}
              </p>
              <p className="hint">Total Amount</p>
            </div>
          </div>
        </section>
      </div>
    );
  };
  const onChange = (event: any) => {
    setSource(event.source);
    setTarget(event.target);
    onSelect(event.target);
  };

  return (
    <div className="manage-pr">
      <p className="mb-4">
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
    </div>
  );
}

export default ManagePr;
