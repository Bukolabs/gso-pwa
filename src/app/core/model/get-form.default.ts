import { GetBidderDto, GetItemDto, GetPurchaseRequestDto } from "@api/api";
import { bidderFormDefault, requestFormDefault } from "./form.default";
import {
  BidderFormSchema,
  ItemFormSchema,
  RequestFormSchema,
} from "./form.rule";

export const getRequestFormDefault = (
  value: GetPurchaseRequestDto | undefined
) => {
  return !value
    ? requestFormDefault
    : ({
        category: value.category,
        section: value.section,
        sai: value.sai_no,
        alobs: value.alobs_no,
        purpose: value.purpose,
        items: value.items as unknown as ItemFormSchema[],
        urgent: value.is_urgent,
      } as RequestFormSchema);
};

export const getBidderFormDefault = (value: GetBidderDto | undefined) => {
  return !value
    ? bidderFormDefault
    : ({
        country: "Philippines",
        name: value.name,
        email: value.email,
        mobile: value.mobile,
        streetName: value.street_name,
        barangay: value.barangay,
        city: value.municipality,
      } as BidderFormSchema);
};

export const getItemFormDefault = (value: GetItemDto | undefined) => {
  return !value
    ? bidderFormDefault
    : ({
        name: value.name,
        brand: value.brand,
        category: value.category,
        description: value.description,
        cost: value.price,
        unit: value.unit,
      } as ItemFormSchema);
};
