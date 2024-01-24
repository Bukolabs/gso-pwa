import { ItemFormSchema } from "@core/model/form.rule";

export class UiMapService {
  static ItemFormToPurchaseItem(form: ItemFormSchema) {
    return {
      code: form.code,
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
    } as ItemFormSchema;
  }
}
