import "./item-bulk-preview.scss";
import { DataTable } from "primereact/datatable";
import { useAddItem } from "@core/query/item.query";
import { MessageResponseDto } from "@api/api";
import {
  PurchaseItemFormSchema,
  RequestFormSchema,
} from "@core/model/form.rule";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { FormToApiService } from "@core/services/form-to-api.service";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useFormContext } from "react-hook-form";
import { addNewItemToExistingRequestItems } from "@core/utility/pri-item.helper";

export interface ItemBulkPreviewProps {
  bulkItems: PurchaseItemFormSchema[];
  onBulk: () => void
}

export function ItemBulkPreview({ bulkItems, onBulk }: ItemBulkPreviewProps) {
  const { getValues: getItemsInForm, setValue } =
    useFormContext<RequestFormSchema>();
  const { showSuccess, showWarning } = useNotificationContext();
  const [prebulkItems, setPrebulkItems] =
    useState<PurchaseItemFormSchema[]>(bulkItems);

  // ADD NEW ITEM
  const handleAddApiSuccess = (response: MessageResponseDto) => {
    const field = response.data as any;

    const updatedBulkItems = prebulkItems.map((item) => {
      if (item.name === field.name) {
        return {
          ...item,
          code: field.code,
        };
      }

      return item;
    });
    setPrebulkItems(updatedBulkItems);
    showSuccess(`${field.name} is now added into the system`);
  };
  const { mutate: addItem, isLoading: isAddingItem } =
    useAddItem(handleAddApiSuccess);

  const handleAddItem = (data: PurchaseItemFormSchema) => {
    const formData = FormToApiService.NewItem(data);
    addItem(formData);
  };
  const handleUpload = () => {
    const noCodeItems = prebulkItems.filter((x) => x.code === "" || !x.code);
    if (noCodeItems.length > 0) {
      showWarning(
        `There are ${noCodeItems.length} items that does not exist yet in the system. Kindly add them.`
      );
      return;
    }

    const itemsInForm = getItemsInForm("items");
    let updatedItemsForm = itemsInForm as PurchaseItemFormSchema[];
    prebulkItems.forEach((item) => {
      const accumulatedItemForm = addNewItemToExistingRequestItems(
        updatedItemsForm,
        item
      ) as PurchaseItemFormSchema[];
      updatedItemsForm = accumulatedItemForm;
    });

    setValue("items", updatedItemsForm);
    onBulk()
  };

  const actionTemplate = (data: PurchaseItemFormSchema) => {
    const noCode = data.code === "" || !data.code;
    return noCode ? (
      <Button
        label="Add Item"
        onClick={() => handleAddItem(data)}
        disabled={isAddingItem}
      />
    ) : null;
  };

  return (
    <div className="item-bulk-preview">
      <h2 className="block mb-5">Upload Preview</h2>
      <DataTable value={prebulkItems}>
        <Column field="categoryName" header="Category"></Column>
        <Column field="unitName" header="Unit"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="cost" header="Cost"></Column>
        <Column field="quantity" header="Quantity"></Column>

        <Column
          header="Action"
          body={(data: PurchaseItemFormSchema) => actionTemplate(data)}
        ></Column>
      </DataTable>
      <Button
        label="Add to Request"
        onClick={() => handleUpload()}
        disabled={isAddingItem}
        className="block mt-4"
      />
    </div>
  );
}

export default ItemBulkPreview;
