import { GetPrItemDto } from "@api/api";
import { ItemFormSchema } from "@core/model/form.rule";

export class ApiToFormService {
  static MapRequestItems(item: string): ItemFormSchema[] {
    const objectifiedItems = JSON.parse(item);
    const mappedItem = objectifiedItems.map((x: GetPrItemDto) => {
      return {
        code: x.item,
        name: x.item_name,
        description: x.description,
        unit: x.unit,
        unitName: x.unit_name,
        category: x.category, // TODO add as soon as field is available
        categoryName: x.category_name, // TODO add as soon as field is available
        brand: x.brand,
        brandName: x.brand_name,
        cost: x.price,
        isActive: true,
        quantity: x.quantity,
      } as ItemFormSchema;
    });

    return mappedItem as ItemFormSchema[];
  }
}
