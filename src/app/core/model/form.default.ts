import { GetBidderDto } from "@api/api";
import {
  BidderFormSchema,
  ItemFormSchema,
  OrderFormSchema,
  RequestFormSchema,
} from "./form.rule";

export const requestFormDefault = {
  category: "",
  section: "",
  sai: "",
  alobs: "",
  purpose: "",
  items: [],
} as RequestFormSchema;

export const orderFormDefault = {
  procurementMode: "",
  requestNumbers: "",
  supplier: "",
  address: "",
  email: "",
  phone: "",
  tin: "",
  deliveryAddress: "",
  deliveryDate: new Date(),
  deliveryTerm: "",
  paymentTerm: "",
  items: [],
} as OrderFormSchema;

export const bidderFormDefault = {
  country: "Philippines",
  name: "",
  email: "",
  mobile: "",
  streetName: "",
  barangay: "",
  city: "",
} as BidderFormSchema;

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

export const itemFormDefault = {
  name: "",
  brand: "",
  category: "",
  description: "",
  isActive: true,
  cost: 0,
  unit: "",
} as ItemFormSchema;
