import {
  CreateBidderDto,
  CreateItemDto,
  CreatePrItemDto,
  CreatePurchaseRequestDto,
  EditBidderDto,
  EditItemDto,
  EditPurchaseRequestDto,
} from "@api/api";
import {
  BidderFormSchema,
  ItemFormSchema,
  RequestFormSchema,
} from "@core/model/form.rule";
import { SETTINGS } from "@core/utility/settings";
import { format } from "date-fns";

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
      sai_date: format(form.saiDate as Date, SETTINGS.dateFormat),
      alobs_no: form.alobs,
      alobs_date: format(form.alobsDate as Date, SETTINGS.dateFormat),
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

  static EditPurchaseRequest(form: RequestFormSchema, id: string) {
    const requestItemPayload = form.items.map((item) =>
      this.NewRequestItem(item)
    );
    const payload = {
      code: id,
      pr_no: form.prno,
      sai_no: form.sai,
      alobs_no: form.alobs,
      category: form.category,
      department: "AGRI/VET", //ADMIN
      section: form.section,
      status: "",
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
    } as EditPurchaseRequestDto;

    return payload;
  }

  static NewRequestItem(form: ItemFormSchema) {
    const payload = {
      item: form.name,
      description: form.description,
      quantity: form.quantity,
      unit: form.unit,
      brand: form.brand,
      category: form.category,
      price: form.cost,
      is_active: true,
      code: form.code,
    } as CreatePrItemDto;

    return payload;
  }
}
