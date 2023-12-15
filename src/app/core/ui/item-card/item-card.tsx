import classNames from "classnames";
import "./item-card";

/* eslint-disable-next-line */
export interface ItemCardProps {
  name: string;
  description: string;
  cost: number;
  totalCost: number;
  quantity: number;
  unit: string;
  brand: string;
  category: string;
}

export function ItemCard({
  name,
  description,
  cost,
  totalCost,
  quantity,
  unit,
  brand,
  category,
}: ItemCardProps) {
  return (
    <div
      className={classNames("bg-white w-full shadow rounded-md flex flex-col")}
    >
      <section className="w-full border-b border-gray-200">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-gray-800 font-bold">{name}</h3>
            <small className="text-gray-500">{description}</small>
          </div>
        </div>
      </section>
      <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{cost}</p>
          <p className="hint">Cost</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{quantity}</p>
          <p className="hint">Quantity</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{totalCost}</p>
          <p className="hint">Total Cost</p>
        </div>
      </section>
      <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{unit}</p>
          <p className="hint">Unit</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-800 font-bold">{brand}</p>
          <p className="hint">Brand</p>
        </div>
        {category && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-800 font-bold">{category}</p>
            <p className="hint">Category</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ItemCard;
