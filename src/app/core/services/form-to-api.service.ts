import {
  CreateBidderDto,
  CreateItemDto,
  CreatePrItemDto,
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
      price: form.cost,
    } as CreateItemDto;

    return payload;
  }

  static EditItem(form: ItemFormSchema, id: string) {
    const payload = {
      code: id,
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      is_active: form.isActive,
      unit: form.unit,
      price: form.cost,
    } as EditItemDto;

    return payload;
  }

  static NewPurchaseRequest(form: RequestFormSchema) {
    const requestItemPayload = form.items.map((item) =>
      this.NewRequestItem(item)
    );
    const payload = {
      sai_no: form.sai,
      alobs_no: form.alobs,
      category: form.category,
      department: "AGRI/VET", //ADMIN
      section: form.section,
      status: "",
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
    } as CreatePurchaseRequestDto;

    return payload;
  }

  static NewRequestItem(form: ItemFormSchema) {
    const payload = {
      item: form.name,
      description: form.description,
      unit: form.unit,
      quantity: form.quantity,
      brand: form.brand,
      price: form.cost,
      is_active: true,
      code: form.code,
    } as CreatePrItemDto;

    return payload;
  }
}
