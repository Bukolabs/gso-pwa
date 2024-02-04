import {
  AddPersonDto,
  CreateBidderDto,
  CreateItemDto,
  CreatePIDDto,
  CreatePersonDto,
  CreatePoPrDto,
  CreatePrItemDeliveryDto,
  CreatePrItemDto,
  CreatePurchaseOrderDto,
  CreatePurchaseRequestDto,
  DeletePoPrDto,
  DeletePurchaseOrderDto,
  DeletePurchaseRequestDto,
  EditBidderDto,
  EditItemDto,
  EditPersonDto,
  EditPrItemDto,
  EditPurchaseOrderDto,
  EditPurchaseRequestDto,
  GetPurchaseRequestDto,
  LoginPersonDto,
  UpdatePersonDto,
} from "@api/api";
import {
  AccountFormSchema,
  BidderFormSchema,
  DeliveryCollectionFormSchema,
  ItemFormSchema,
  LoginFormSchema,
  OrderFormSchema,
  PurchaseItemFormSchema,
  RequestFormSchema,
  RequestInOrderFormSchema,
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
      password: form.password,
    } as CreatePersonDto;

    const payload = {
      person,
    } as AddPersonDto;

    return payload;
  }

  static EditAccount(form: AccountFormSchema, code: string) {
    const person = {
      code,
      first_name: form.name,
      last_name: form.lastName,
      email: form.email,
      mobile: form.mobile,
      is_active: true,
      role: form.role,
      department: form.department,
    } as EditPersonDto;

    const payload = {
      person,
    } as UpdatePersonDto;

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

  static EditPrItem(form: ItemFormSchema, prCode: string) {
    const payload = {
      code: form.code,
      purchase_request: prCode,
    } as EditPrItemDto;

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
      pr_date: !form.dueDate
        ? undefined
        : format(form.dueDate as Date, SETTINGS.dateFormat),
      sai_no: form.sai,
      sai_date: !form.saiDate
        ? undefined
        : format(form.saiDate as Date, SETTINGS.dateFormat),
      alobs_no: form.alobs,
      alobs_date: !form.alobsDate
        ? undefined
        : format(form.alobsDate as Date, SETTINGS.dateFormat),
      category: form.category,
      department: currentUser.department_code,
      section: form.section,
      status: "",
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
      has_ppmp: form.isPPMP,
      has_activity_design: form.isActivityDesign,
    } as CreatePurchaseRequestDto;

    return payload;
  }

  static EditPurchaseRequest(form: RequestFormSchema, id: string) {
    const requestItemPayload = form.items.map((item) =>
      this.NewRequestPurchaseItem(item)
    );
    const payload = {
      code: id,
      pr_no: form.prno,
      pr_date: !form.dueDate
        ? undefined
        : format(form.dueDate as Date, SETTINGS.dateFormat),
      sai_no: form.sai,
      alobs_no: form.alobs,
      category: form.category,
      department: form.department,
      section: form.section,
      is_urgent: false,
      items: requestItemPayload,
      purpose: form.purpose,
      has_ppmp: form.isPPMP,
      has_activity_design: form.isActivityDesign,
    } as EditPurchaseRequestDto;

    return payload;
  }

  static NewRequestPurchaseItem(form: PurchaseItemFormSchema) {
    const payload = {
      item: form.code,
      description: form.description,
      quantity: form.quantity,
      unit: form.unit,
      brand: form.brand,
      category: form.category,
      price: form.cost,
      is_active: form.isActive,
      code: form.itemArrayCode,
      delivered_quantity: form.deliveredQuantity,
    } as CreatePrItemDto;

    return payload;
  }

  static DeletePurchaseRequest(form: RequestFormSchema) {
    const payload = {
      code: form.code,
      is_active: false,
    } as DeletePurchaseRequestDto;

    return payload;
  }

  static NewOrderRequest(form: OrderFormSchema) {
    const requests = form.requests.map((item) => this.AddRequestInOrder(item));
    const payload = {
      po_no: form.pono,
      po_date: !!form.poDate
        ? format(form.poDate as Date, SETTINGS.dateFormat)
        : null,
      resolution_no: form.resolutionNo,
      mode_of_procurement: form.procurementMode,
      delivery_location: form.deliveryAddress,
      delivery_date: !!form.deliveryDate
        ? format(form.deliveryDate as Date, SETTINGS.dateFormat)
        : null,
      delivery_term: form.deliveryTerm,
      payment_term: form.paymentTerm,
      is_active: true,
      purchase_requests: requests,
      category: form.category,
      iar_no: form.iar,
      iar_date: !!form.iarDate
        ? format(form.iarDate as Date, SETTINGS.dateFormat)
        : null,
      invoice_no: form.invoice,
      invoice_date: !!form.invoiceDate
        ? format(form.invoiceDate as Date, SETTINGS.dateFormat)
        : null,
      signatory_name_1: form.signatoryName1 || SETTINGS.signatoryName1,
      signatory_office_1: form.signatoryOffice1 || SETTINGS.signatoryOffice1,
      signatory_name_2: form.signatoryName2 || SETTINGS.signatoryName2,
      signatory_office_2: form.signatoryOffice2 || SETTINGS.signatoryOffice2,
      end_user_name: form.endUserName1 || SETTINGS.endUserName1,
      end_user_office: form.endUserOffice1 || SETTINGS.endUserOffice1,
    } as CreatePurchaseOrderDto;

    return payload;
  }

  static EditOrderRequest(form: OrderFormSchema, orderId: string) {
    const requests = form.requests.map((item) => this.AddRequestInOrder(item));
    const payload = {
      code: orderId,
      po_no: form.pono,
      po_date: !!form.poDate
        ? format(form.poDate as Date, SETTINGS.dateFormat)
        : null,
      resolution_no: form.resolutionNo,
      mode_of_procurement: form.procurementMode,
      delivery_location: form.deliveryAddress,
      delivery_date: !!form.deliveryDate
        ? format(form.deliveryDate as Date, SETTINGS.dateFormat)
        : null,
      delivery_term: form.deliveryTerm,
      is_active: true,
      purchase_requests: requests,
      category: form.category,
      supplier: form.supplier,
      address: form.address,
      contact_no: form.phone,
      email: form.email,
      tin: form.tin,
      payment_term: form.paymentTerm,
      iar_no: form.iar,
      iar_date: !!form.iarDate
        ? format(form.iarDate as Date, SETTINGS.dateFormat)
        : null,
      invoice_no: form.invoice,
      invoice_date: !!form.invoiceDate
        ? format(form.invoiceDate as Date, SETTINGS.dateFormat)
        : null,
      signatory_name_1: form.signatoryName1 || SETTINGS.signatoryName1,
      signatory_office_1: form.signatoryOffice1 || SETTINGS.signatoryOffice1,
      signatory_name_2: form.signatoryName2 || SETTINGS.signatoryName2,
      signatory_office_2: form.signatoryOffice2 || SETTINGS.signatoryOffice2,
      end_user_name: form.endUserName1 || SETTINGS.endUserName1,
      end_user_office: form.endUserOffice1 || SETTINGS.endUserOffice1,
    } as EditPurchaseOrderDto;

    return payload;
  }

  static AddRequestInOrder({
    code,
    purchaseOrder,
    purchaseRequest,
    isActive,
  }: RequestInOrderFormSchema) {
    const payload = {
      code,
      purchase_order: purchaseOrder,
      purchase_request: purchaseRequest,
      is_active: isActive,
    } as CreatePoPrDto;

    return payload;
  }

  static DeleteOrderRequest(form: OrderFormSchema) {
    const payload = {
      code: form.code,
      is_active: false,
    } as DeletePurchaseOrderDto;

    return payload;
  }

  static DeletePurchaseRequestInPo(item: GetPurchaseRequestDto) {
    const payload = {
      code: item.po_pr_code,
      is_active: false,
    } as DeletePoPrDto;

    return payload;
  }

  static AddDelivery(items: DeliveryCollectionFormSchema) {
    const deliveryPayload = items.collection.map(
      (item) =>
        ({
          purchase_request: item.prCode,
          item: item.prItemCode,
          quantity: item.deliveredQuantity,
          brand: item.brand,
          description: item.description,
          is_active: true,
        } as CreatePrItemDeliveryDto)
    );

    const payload = {
      delivery: deliveryPayload,
    } as CreatePIDDto;

    return payload;
  }
}
