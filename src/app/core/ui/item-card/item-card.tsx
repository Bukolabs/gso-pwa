import classNames from "classnames";
import "./item-card";
import { Button } from "primereact/button";
import { ItemFormSchema } from "@core/model/form.rule";
import { twoDigit } from "@core/utility/number-helper";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";
import { ReactNode } from "react";

export interface ItemCardProps {
  item: ItemFormSchema;
  itemNo: number;
  showActions?: boolean;
  children?: ReactNode;
  classname?: string;
  onEdit?: (code: ItemFormSchema) => void;
  onRemove?: (code: ItemFormSchema) => void;
}

export function ItemCard({
  itemNo,
  item,
  showActions = true,
  children,
  classname,
  onEdit,
  onRemove,
}: ItemCardProps) {
  const totalCost = item.cost * (item.quantity || 1);
  return (
    <div
      className={classNames(
        "bg-white w-full shadow rounded-md flex flex-col",
        classname
      )}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between p-4">
          <div>
            <small className="text-gray-500 block">
              Item No: {twoDigit(itemNo + 1)}
            </small>
            <h3 className="text-gray-800 font-bold">{item.name}</h3>
            <small className="text-gray-500">{item.description}</small>
          </div>
        </div>
      </section>
      <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">
            {currencyFormat(item.cost, "PHP")}
          </p>
          <p className="hint">Cost</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">
            {numberFormat(item.quantity || 0)}
          </p>
          <p className="hint">Quantity</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">
            {currencyFormat(totalCost || 0, "PHP")}
          </p>
          <p className="hint">Total Cost</p>
        </div>
      </section>
      <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{item.unitName}</p>
          <p className="hint">Unit</p>
        </div>
        {item.categoryName && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">{item.categoryName}</p>
            <p className="hint">Category</p>
          </div>
        )}
        {item.brandName && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">{item.brandName}</p>
            <p className="hint">Brand</p>
          </div>
        )}
      </section>
      {!!children ? children : null}
      {showActions && (
        <section className="bg-gray-800 flex justify-between">
          {onEdit && (
            <Button
              text
              icon="pi pi-pencil"
              label="Edit"
              onClick={() => {
                if (onEdit) {
                  onEdit(item);
                }
              }}
            ></Button>
          )}
          {onRemove && (
            <Button
              text
              icon="pi pi-trash"
              label="Remove"
              onClick={() => {
                if (onRemove) {
                  onRemove(item);
                }
              }}
            ></Button>
          )}
        </section>
      )}
    </div>
  );
}

export default ItemCard;
