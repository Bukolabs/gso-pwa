import { PurchaseItemFormSchema } from "@core/model/form.rule";

export const addNewItemToExistingRequestItems = (
  itemsInForm: PurchaseItemFormSchema[],
  newItem: PurchaseItemFormSchema
) => {
  const itemCodeExistInPurchaseItemValues =
    itemsInForm.filter((x) => x.code === newItem.code).length > 0;
  let allItems = itemsInForm;

  if (itemCodeExistInPurchaseItemValues) {
    allItems = itemsInForm.map((prItem) => {
      if (prItem.code === newItem.code) {
        return newItem;
      }
      return prItem;
    });
  } else {
    allItems = [...itemsInForm, newItem];
  }

  return allItems as PurchaseItemFormSchema[];
};
