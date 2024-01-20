import classNames from "classnames";
import "./item-card";
import { Button } from "primereact/button";
import { ItemFormSchema } from "@core/model/form.rule";
import { twoDigit } from "@core/utility/number-helper";

export interface ItemCardProps {
  item: ItemFormSchema;
  itemNo: number;
  onEdit?: (code: ItemFormSchema) => void;
  onRemove?: (code: ItemFormSchema) => void;
}

export function ItemCard({ itemNo, item, onEdit, onRemove }: ItemCardProps) {
  const totalCost = item.cost * (item.quantity || 1);
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
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
          <p className="text-gray-800 font-bold">{item.cost}</p>
          <p className="hint">Cost</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{item.quantity}</p>
          <p className="hint">Quantity</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{totalCost}</p>
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
      </section>
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
    </div>
  );
}

export default ItemCard;
