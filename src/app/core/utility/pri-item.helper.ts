import { PurchaseItemFormSchema } from "@core/model/form.rule";

export const addNewItemToExistingRequestItems = (
  itemsInForm: PurchaseItemFormSchema[],
  newItem: PurchaseItemFormSchema,
  isEditing: boolean
) => {
  let allItems = itemsInForm;

  if (isEditing) {
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
