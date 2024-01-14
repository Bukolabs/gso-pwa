import { GetBidderDto, GetItemDto, GetPurchaseOrderDto, GetPurchaseRequestDto } from "@api/api";
import { bidderFormDefault, requestFormDefault } from "./form.default";
import {
  BidderFormSchema,
  ItemFormSchema,
  RequestFormSchema,
} from "./form.rule";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";

export const getRequestFormDefault = (
  cachedValue: GetPurchaseRequestDto | undefined
) => {
  const items = cachedValue?.items
    ? ApiToFormService.MapRequestPruchaseItems(cachedValue.items)
    : [];

  return !cachedValue
    ? requestFormDefault
    : ({
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
