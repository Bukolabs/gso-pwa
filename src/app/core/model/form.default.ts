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
  active: true,
  urgent: false,
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

export const itemFormDefault = {
  name: "",
  brand: "",
  category: "",
  description: "",
  isActive: true,
  cost: 0,
  unit: "",
  quantity: 0,
} as ItemFormSchema;
