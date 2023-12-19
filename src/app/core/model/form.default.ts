import StorageService from "@shared/services/storage.service";
import {
  AccountFormSchema,
  BidderFormSchema,
  ItemFormSchema,
  OrderFormSchema,
  RequestFormSchema,
} from "./form.rule";
import { AUTH } from "@core/utility/settings";
import { LocalAuth } from "./local-auth";

const currentUser = StorageService.load(AUTH) as LocalAuth;
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
  department: currentUser.department_name || "",
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
} as ItemFormSchema;
