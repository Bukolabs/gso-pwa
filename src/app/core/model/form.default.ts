import {
  BidderFormSchema,
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
  mobile: "",
} as BidderFormSchema;
