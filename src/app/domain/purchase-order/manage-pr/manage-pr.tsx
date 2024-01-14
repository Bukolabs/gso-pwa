import { useGetCategory } from "@core/query/category.query";
import "./manage-pr.scss";
import { LabelValue } from "@shared/models/label-value.interface";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
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

/* eslint-disable-next-line */
export interface ManagePrProps {}

export function ManagePr() {
  const [source, setSource] = useState<GetPurchaseRequestDto[]>([]);
  const [target, setTarget] = useState([]);

  const { data: categories } = useGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filter, setFilter] = useState({
    category: "",
    status_name: "APPROVED",
  });
  const rowLimit = 99999;
  const pageNumber = 0;

  const handleApiSuccess = (
    response: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    setSource(response.data || []);
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

  const handleCategoryChange = (event: DropdownChangeEvent) => {
    setSelectedCategory(event.value);
    setFilter({ ...filter, category: event.value });
  };

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
  };

  return (
    <div className="manage-pr">
      <h4>Select approved purchase requests from the following</h4>

      <Dropdown
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={mappedCategories}
        optionLabel="label"
        placeholder="Select category"
        filter
        className="w-full md:w-3/4"
      />

      <PickList
        source={source}
        target={target}
        onChange={onChange}
        itemTemplate={itemTemplate}
        filter
        filterBy="name"
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
