import {
  CreateBidderDto,
  CreateItemDto,
  CreatePurchaseRequestDto,
  EditBidderDto,
  EditItemDto,
} from "@api/api";
import {
  BidderFormSchema,
  ItemFormSchema,
  RequestFormSchema,
} from "@core/model/form.rule";

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

  static EditBidder(form: BidderFormSchema, id: string) {
    const payload = {
      code: id,
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      street_name: form.streetName,
      barangay: form.barangay,
      municipality: form.city,
    } as EditBidderDto;

    return payload;
  }

  static NewItem(form: ItemFormSchema) {
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      is_active: form.isActive,
      unit: form.unit,
      price: form.cost
    } as CreateItemDto;

    return payload;
  }

  static EditItem(form: ItemFormSchema, id: string) {
    // TODO Add cost
    const payload = {
      code: id,
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      is_active: form.isActive,
      unit: form.unit,
    } as EditItemDto;

    return payload;
  }

  static NewPurchaseRequest(form: RequestFormSchema) {
    const payload = {
      sai_no: form.sai,
      alobs_no: form.alobs,
      category: "",
      department: "",
      section: form.section,
      status: "",
      is_urgent: false,
      items: [],
      purpose: form.purpose
    } as CreatePurchaseRequestDto;

    return payload;
  }
}
