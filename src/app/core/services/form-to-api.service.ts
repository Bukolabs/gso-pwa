import { CreateBidderDto, CreateItemDto } from "@api/api";
import { BidderFormSchema, ItemFormSchema } from "@core/model/form.rule";

export class FormToApiService {
  static NewBidder(form: BidderFormSchema) {
    const payload = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      street_name: form.streetName,
      barangay: form.barangay,
      municipality: form.city,
    } as CreateBidderDto;

    return payload;
  }

  static NewItem(form: ItemFormSchema) {
    // TODO Add cost
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      is_active: form.isActive,
      unit: form.unit,
    } as CreateItemDto;

    return payload;
  }
}
