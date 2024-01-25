import {
  GetBidderDto,
  GetItemDto,
  GetPersonDto,
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
} from "@api/api";
import {
  accountFormDefault,
  bidderFormDefault,
  requestFormDefault,
} from "./form.default";
import {
  AccountFormSchema,
  BidderFormSchema,
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
      } as OrderFormSchema);
};

export const getAccountFormDefault = (
  cachedValue: GetPersonDto | undefined
) => {
  return !cachedValue
    ? accountFormDefault
    : ({
        country: "Philippines",
        username: "",
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
