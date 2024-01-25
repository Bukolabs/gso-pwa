import { PurchaseItemFormSchema } from "@core/model/form.rule";

export class UiMapService {
  static ItemFormToPurchaseItem(form: PurchaseItemFormSchema, newCode: string = '') {
    return {
      itemArrayCode: form.itemArrayCode,
      code: form.code || newCode,
      name: form.name,
      description: form.description,
      unit: form.unit,
      unitName: form.unitName,
      category: form.category, // TODO add as soon as field is available
      categoryName: form.categoryName, // TODO add as soon as field is available
      brand: form.brand,
      brandName: form.brandName,
      cost: form.cost,
      isActive: true,
      quantity: form.quantity,
    } as PurchaseItemFormSchema;
  }
}
