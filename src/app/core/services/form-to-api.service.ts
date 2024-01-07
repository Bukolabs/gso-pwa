import {
  AddPersonDto,
  CreateBidderDto,
  CreateItemDto,
  CreatePersonDto,
  CreatePrItemDto,
  CreatePurchaseOrderDto,
  CreatePurchaseRequestDto,
  EditBidderDto,
  EditItemDto,
  EditPurchaseRequestDto,
  LoginPersonDto,
} from "@api/api";
import {
  AccountFormSchema,
  BidderFormSchema,
  ItemFormSchema,
  LoginFormSchema,
  OrderFormSchema,
  PurchaseItemFormSchema,
  RequestFormSchema,
} from "@core/model/form.rule";
import { LocalAuth } from "@core/model/local-auth";
import { AUTH, SETTINGS } from "@core/utility/settings";
import StorageService from "@shared/services/storage.service";
import { format } from "date-fns";

export class FormToApiService {
  static Login(form: LoginFormSchema) {
    const payload = {
      username: form.email,
      password: form.password,
    } as LoginPersonDto;

    return payload;
  }

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

  static NewAccount(form: AccountFormSchema) {
    const person = {
      username: form.username,
      first_name: form.name,
      last_name: form.lastName,
      email: form.email,
      mobile: form.mobile,
      is_active: true,
      role: form.role,
      department: form.department,
      password: form.password
    } as CreatePersonDto;

    const payload = {
      person,
    } as AddPersonDto;

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
    const currentUser = StorageService.load(AUTH) as LocalAuth;
    const requestItemPayload = form.items.map((item) =>
      this.NewRequestPurchaseItem(item)
    );
    const payload = {
      pr_date: format(form.dueDate as Date, SETTINGS.dateFormat),
      sai_no: form.sai,
      sai_date: !form.saiDate
        ? undefined
        : format(form.saiDate as Date, SETTINGS.dateFormat),
      alobs_no: form.alobs,
      alobs_date: !form.alobsDate
        ? undefined
        : format(form.alobsDate as Date, SETTINGS.dateFormat),
      category: form.category,
      department: currentUser.department_code, //TODO change to user department
      section: form.section,
      status: "",
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
    } as CreatePurchaseRequestDto;

    return payload;
  }

  static EditPurchaseRequest(form: RequestFormSchema, id: string) {
    const currentUser = StorageService.load(AUTH) as LocalAuth;
    const requestItemPayload = form.items.map((item) =>
      this.NewRequestPurchaseItem(item)
    );
    const payload = {
      code: id,
      pr_no: form.prno,
      sai_no: form.sai,
      alobs_no: form.alobs,
      category: form.category,
      department: currentUser.department_code, //ADMIN
      section: form.section,
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
    } as EditPurchaseRequestDto;

    return payload;
  }

  static NewRequestPurchaseItem(form: PurchaseItemFormSchema) {
    const payload = {
      item: form.itemCode,
      description: form.description,
      quantity: form.quantity,
      unit: form.unit,
      brand: form.brand,
      category: form.category,
      price: form.cost,
      is_active: form.isActive,
      code: form.code,
    } as CreatePrItemDto;

    return payload;
  }

  static NewOrderRequest(form: OrderFormSchema) {
    const payload = {
      po_date: format(form.poDate as Date, SETTINGS.dateFormat),
      resolution_no: form.resolutionNo,
      mode_of_procurement: form.procurementMode,
      delivery_location: form.deliveryAddress,
      delivery_date: format(form.deliveryDate as Date, SETTINGS.dateFormat),
      delivery_term: form.deliveryTerm,
      is_active: true,
      purchase_requests: []
    } as CreatePurchaseOrderDto;

    return payload;
  }

}
