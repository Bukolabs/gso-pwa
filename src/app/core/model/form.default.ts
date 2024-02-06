import { SETTINGS } from "@core/utility/settings";
import {
  AccountFormSchema,
  BidderFormSchema,
  DeliveryFormSchema,
  ItemFormSchema,
  OrderFormSchema,
  RequestFormSchema,
} from "./form.rule";

export const requestFormDefault = {
  prno: "",
  dueDate: "" as any,
  category: "",
  section: "",
  sai: "",
  saiDate: undefined,
  alobs: "",
  alobsDate: undefined,
  purpose: "",
  items: [],
  active: true,
  urgent: false,
  department: "",
  departmentLabel: "",
  isPPMP: false,
  isActivityDesign: false,
} as RequestFormSchema;

export const orderFormDefault = {
  pono: "",
  poDate: "" as any,
  resolutionNo: "",
  procurementMode: "",
  supplier: "",
  address: "",
  email: "",
  phone: "",
  tin: "",
  deliveryAddress: "",
  deliveryDate: "" as any,
  deliveryTerm: "",
  paymentTerm: "",
  isActive: true,
  requests: [],
  category: "",
  categoryName: "",
  iar: "",
  iarDate: "" as any,
  invoice: "",
  invoiceDate: "" as any,
  signatoryName1: SETTINGS.signatoryName1,
  signatoryOffice1: SETTINGS.signatoryOffice1,
  signatoryName2: SETTINGS.signatoryName2,
  signatoryOffice2: SETTINGS.signatoryOffice2,
  endUserName1: SETTINGS.endUserName1,
  endUserOffice1: SETTINGS.endUserOffice1,
  rfqNumber: "",
  itbNumber: "",
} as OrderFormSchema;

export const deliveryFormDefault = {
  code: "",
  prCode: "",
  prItemCode: "",
  deliveredQuantity: 0,
  brand: "",
  brandName: "",
  description: "",
  itemDetails: undefined,
} as DeliveryFormSchema;

export const bidderFormDefault = {
  country: "Philippines",
  name: "",
  email: "",
  mobile: "",
  streetName: "",
  barangay: "",
  city: "",
} as BidderFormSchema;

export const accountFormDefault = {
  country: "Philippines",
  name: "",
  lastName: "",
  email: "",
  mobile: "",
  streetName: "",
  barangay: "",
  city: "",
  role: "",
  department: "",
  username: "",
  password: "",
} as AccountFormSchema;

export const itemFormDefault = {
  name: "",
  brand: "",
  category: "",
  description: "",
  isActive: true,
  cost: 0,
  unit: "",
  quantity: 0,
  deliveredQuantity: 0,
  prCode: "",
} as ItemFormSchema;
