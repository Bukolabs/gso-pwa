import classNames from "classnames";
import "./item-card";
import { Button } from "primereact/button";
import { ItemFormSchema } from "@core/model/form.rule";

export interface ItemCardProps {
  item: ItemFormSchema;
  onEdit: (code: ItemFormSchema) => void;
  onRemove: (code: ItemFormSchema) => void;
}

export function ItemCard({ item, onEdit, onRemove }: ItemCardProps) {
  const totalCost = item.cost * (item.quantity || 1);
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between p-4">
          <div>
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
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{item.brandName}</p>
          <p className="hint">Brand</p>
        </div>
        {item.categoryName && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">{item.categoryName}</p>
            <p className="hint">Category</p>
          </div>
        )}
      </section>
      <section className="bg-gray-800 flex justify-between">
        <Button
          text
          icon="pi pi-pencil"
          label="Edit"
          onClick={() => onEdit(item)}
        ></Button>
        <Button
          text
          icon="pi pi-trash"
          label="Remove"
          onClick={() => onRemove(item)}
        ></Button>
      </section>
    </div>
  );
}

export default ItemCard;
