import { DataTable } from "primereact/datatable";
import "./request-item-list.scss";
import { PurchaseItemFormSchema } from "@core/model/form.rule";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { twoDigit } from "@core/utility/number-helper";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";
import { trimUUID } from "@core/utility/string.helper";

export interface RequestItemListProps {
  requestItems: PurchaseItemFormSchema[];
  showActions: boolean;
  onEdit: (item: PurchaseItemFormSchema) => void;
  onRemove: (item: PurchaseItemFormSchema) => void;
}

export function RequestItemList({
  requestItems,
  showActions,
  onEdit,
  onRemove,
}: RequestItemListProps) {
  const actionTemplate = (data: PurchaseItemFormSchema) => {
    return (
      <span className="p-buttonset">
        <Button label="Edit" onClick={() => onEdit(data)} outlined />
        <Button label="Delete" onClick={() => onRemove(data)} outlined />
      </span>
    );
  };
  const nameTemplate = (data: PurchaseItemFormSchema, index: number) => {
    return (
      <div className="flex justify-between">
        <div>
          <small className="text-gray-500 block">
            Item No: {twoDigit(index + 1)}
          </small>
          <h3 className="text-gray-800 font-bold">{data.name}</h3>
          <small className="text-gray-500">{data.description}</small>
        </div>
      </div>
    );
  };
  const totalTemplate = (data: PurchaseItemFormSchema) => {
    const totalCost = data.cost * (data.quantity || 1);
    return currencyFormat(totalCost || 0, "PHP");
  };

  return (
    <div className="request-item-list">
      <DataTable value={requestItems}>
        <Column
          header="Name"
          body={(data: PurchaseItemFormSchema, options) =>
            nameTemplate(data, options.rowIndex)
          }
        ></Column>
        <Column
          header="Cost"
          body={(data: PurchaseItemFormSchema) =>
            currencyFormat(data.cost || 0, "PHP")
          }
        ></Column>
        <Column
          header="Quantity"
          body={(data: PurchaseItemFormSchema) =>
            numberFormat(data.quantity || 0)
          }
        ></Column>
        <Column
          header="Total Cost"
          body={(data: PurchaseItemFormSchema) => totalTemplate(data)}
        ></Column>
        <Column field="unitName" header="Unit"></Column>
        <Column field="categoryName" header="Category"></Column>

        {showActions && (
          <Column
            header="Action"
            body={(data: PurchaseItemFormSchema) => actionTemplate(data)}
          ></Column>
        )}
      </DataTable>
    </div>
  );
}

export default RequestItemList;
