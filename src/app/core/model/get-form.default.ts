import {
  GetBidderDto,
  GetInventoryDto,
  GetItemDto,
  GetPersonDto,
  GetPrItemDeliveryDto,
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
} from "@api/api";
import {
  accountFormDefault,
  bidderFormDefault,
  deliveryFormDefault,
  inventoryFormDefault,
  requestFormDefault,
} from "./form.default";
import {
  AccountFormSchema,
  BidderFormSchema,
  DeliveryFormSchema,
  InventoryFormSchema,
  ItemFormSchema,
  OrderFormSchema,
  RequestFormSchema,
} from "./form.rule";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";

export const getRequestFormDefault = (
  cachedValue: GetPurchaseRequestDto | undefined
) => {
  const items = cachedValue?.items
    ? ApiToFormService.MapRequestPurchaseItems(cachedValue.items)
    : [];

  return !cachedValue
    ? requestFormDefault
    : ({
        code: cachedValue.code,
        prno: cachedValue.pr_no,
        dueDate: cachedValue?.pr_date
          ? (format(new Date(cachedValue?.pr_date), SETTINGS.dateFormat) as any)
          : ("" as any),
        category: cachedValue.category,
        section: cachedValue.section,
        sai: cachedValue.sai_no,
        saiDate: cachedValue?.sai_date
          ? (format(
              new Date(cachedValue?.sai_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined,
        alobs: cachedValue.alobs_no,
        alobsDate: cachedValue?.alobs_date
          ? (format(
              new Date(cachedValue?.alobs_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined,
        purpose: cachedValue.purpose,
        items: items,
        urgent: cachedValue.is_urgent,
        active: true,
        department: cachedValue.department,
        departmentLabel: cachedValue.department_name,
        isPPMP: Boolean(cachedValue.has_ppmp),
        isActivityDesign: Boolean(cachedValue.has_activity_design),
        signatoryName: cachedValue.signatory_name,
        hasApp: Boolean(cachedValue.has_app),
        hasPow: Boolean(cachedValue.has_pow),
        hasBarchart: Boolean(cachedValue.has_bar_chart),
        hasTechSpec: Boolean(cachedValue.has_tech_spec),
        hasPlan: Boolean(cachedValue.has_plan),
        hasQuitClaim: Boolean(cachedValue.has_quit_claim),
        status: "",
        remarks: "",
      } as RequestFormSchema);
};

export const getBidderFormDefault = (cachedValue: GetBidderDto | undefined) => {
  return !cachedValue
    ? bidderFormDefault
    : ({
        country: "Philippines",
        name: cachedValue.name,
        email: cachedValue.email,
        mobile: cachedValue.mobile,
        streetName: cachedValue.street_name,
        barangay: cachedValue.barangay,
        city: cachedValue.municipality,
      } as BidderFormSchema);
};

export const getItemFormDefault = (cachedValue: GetItemDto | undefined) => {
  return !cachedValue
    ? bidderFormDefault
    : ({
        name: cachedValue.name,
        brand: cachedValue.brand,
        category: cachedValue.category,
        description: cachedValue.description,
        cost: cachedValue.price || 0,
        unit: cachedValue.unit,
        deliveredQuantity: 0,
        prCode: "",
      } as ItemFormSchema);
};

export const getOrderFormDefault = (
  cachedValue: GetPurchaseOrderDto | undefined
) => {
  const code = cachedValue?.code;
  const requests = cachedValue?.purchase_requests
    ? ApiToFormService.MapOrderRequestsToForm(
        cachedValue?.purchase_requests || [],
        code || ""
      )
    : [];

  return !cachedValue
    ? requestFormDefault
    : ({
        code,
        pono: cachedValue.po_no,
        poDate: cachedValue?.po_date
          ? (format(new Date(cachedValue?.po_date), SETTINGS.dateFormat) as any)
          : ("" as any),
        resolutionNo: cachedValue.resolution_no,
        procurementMode: cachedValue.mode_of_procurement,
        category: cachedValue.category,
        categoryName: cachedValue.category_name,
        deliveryAddress: cachedValue.delivery_location,
        deliveryDate: cachedValue?.delivery_date
          ? (format(
              new Date(cachedValue?.delivery_date),
              SETTINGS.dateFormat
            ) as any)
          : ("" as any),
        deliveryTerm: cachedValue.delivery_term,
        paymentTerm: cachedValue.payment_term,
        supplier: cachedValue.supplier,
        address: cachedValue.address,
        email: cachedValue.email,
        phone: cachedValue.contact_no,
        tin: cachedValue.tin,
        isActive: true,
        requests,
        iar: cachedValue.iar_no,
        iarDate: cachedValue?.iar_date
          ? (format(
              new Date(cachedValue?.iar_date),
              SETTINGS.dateFormat
            ) as any)
          : ("" as any),
        invoice: cachedValue.invoice_no,
        invoiceDate: cachedValue?.invoice_date
          ? (format(
              new Date(cachedValue?.invoice_date),
              SETTINGS.dateFormat
            ) as any)
          : ("" as any),
        signatoryName1: cachedValue.signatory_name_1 || SETTINGS.signatoryName1,
        signatoryName2: cachedValue.signatory_name_2 || SETTINGS.signatoryName2,
        signatoryOffice1:
          cachedValue.signatory_office_1 || SETTINGS.signatoryOffice1,
        signatoryOffice2:
          cachedValue.signatory_office_2 || SETTINGS.signatoryOffice2,
        endUserName1: cachedValue.end_user_name || SETTINGS.endUserName1,
        endUserOffice1: cachedValue.end_user_office || SETTINGS.endUserOffice1,
        rfqNumber: cachedValue.rfq_no,
        itbNumber: cachedValue.itb_no,
      } as OrderFormSchema);
};

export const getDeliveryFormDefault = (
  cachedValue: GetPrItemDeliveryDto | undefined
) => {
  return !cachedValue
    ? deliveryFormDefault
    : ({
        code: cachedValue.code,
        prCode: cachedValue.purchase_request,
        prItemCode: cachedValue.item,
        deliveredQuantity: cachedValue.quantity,
        brand: cachedValue.brand,
        brandName: cachedValue.brand_name,
        description: cachedValue.description,
        itemDetails: undefined,
      } as DeliveryFormSchema);
};

export const getAccountFormDefault = (
  cachedValue: GetPersonDto | undefined
) => {
  return !cachedValue
    ? accountFormDefault
    : ({
        country: "Philippines",
        username: cachedValue.person_username,
        name: cachedValue.person_first_name,
        lastName: cachedValue.person_last_name,
        email: cachedValue.person_email,
        mobile: cachedValue.person_mobile,
        streetName: "",
        barangay: "",
        city: "",
        role: cachedValue.role_code,
        department: cachedValue.department_code,
        password: "",
      } as AccountFormSchema);
};

export const getInventoryFormDefault = (
  cachedValue: GetInventoryDto | undefined
) => {
  return !cachedValue
    ? inventoryFormDefault
    : ({
        code: cachedValue.code,
        batch: cachedValue.batch,
        inventoryNo: cachedValue.inventory_no,
        lot: cachedValue.lot,
        office: cachedValue.office,
        building: cachedValue.building,
        endOfLife: cachedValue.end_of_life,
        assignee: cachedValue.assignee,
        dateAssigned: cachedValue?.date_assigned
          ? (format(
              new Date(cachedValue?.date_assigned),
              SETTINGS.dateFormat
            ) as any)
          : ("" as any),
        propertyType: cachedValue.property_type,
        remarks: cachedValue.remarks,
        status: cachedValue.status,
        status_name: cachedValue.status_name,
        assignedDepartment: cachedValue.department,
        poNo: cachedValue.po_no,
        poDate: cachedValue?.po_date
          ? (format(new Date(cachedValue?.po_date), SETTINGS.dateFormat) as any)
          : ("" as any),
        poCategory: cachedValue.po_category,
        procurementMode: cachedValue.mode_of_procurement,
        resolutionNo: cachedValue.resolution_no,
        iarNo: cachedValue.iar_no,
        supplier: cachedValue.supplier,
        supplierAddress: cachedValue.supplier_address,
        supplierEmail: cachedValue.supplier_email,
        supplierContact: cachedValue.supplier_contact,
        supplierTin: cachedValue.supplier_tin,
        prNo: cachedValue.pr_no,
        prDate: "" as any,
        prCategory: cachedValue.pr_category,
        prDepartment: cachedValue.pr_department,
        prSection: cachedValue.pr_section,
        prPurpose: cachedValue.pr_purpose,
        itemCode: cachedValue.pr_item_code,
        itemPrice: cachedValue.item_price,
        unit: cachedValue.unit,
        deliveryBrand: cachedValue.delivery_brand,
        deliveryDescription: cachedValue.delivery_description,
      } as InventoryFormSchema);
};
