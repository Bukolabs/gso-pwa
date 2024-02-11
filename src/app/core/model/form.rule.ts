import * as z from "zod";

export const ItemFormRule = z
  .object({
    code: z.string().optional(),
    name: z.string(),
    description: z.string(),
    unit: z.string().min(1, "Unit is required"),
    unitName: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    categoryName: z.string().optional(),
    brand: z.string().optional().nullable(),
    brandName: z.string().optional().nullable(),
    cost: z.number(),
    isActive: z.boolean().optional(),
    quantity: z.number().optional(),
    deliveredQuantity: z.number().optional(),
    prCode: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.cost <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please add a proper item cost`,
        path: ["cost"],
      });
    }
  });

export const PurchaseItemFormRule = z
  .object({
    itemArrayCode: z.string().optional(),
  })
  .and(ItemFormRule);

export const RequestFormRule = z.object({
  code: z.string().optional(),
  prno: z.string().optional(),
  dueDate: z.coerce.date(),
  category: z.string().min(1, "Category is required"),
  section: z.string(),
  sai: z.string(),
  saiDate: z.coerce.date().optional().nullable(),
  alobs: z.string(),
  alobsDate: z.coerce.date().optional().nullable(),
  purpose: z.string(),
  items: PurchaseItemFormRule.array(),
  urgent: z.boolean().optional(),
  active: z.boolean().optional(),
  department: z.string().optional(),
  departmentLabel: z.string().optional(),
  isPPMP: z.boolean(),
  isActivityDesign: z.boolean(),
  signatoryName: z.string().optional(),
  hasApp: z.boolean().optional(),
  hasPow: z.boolean().optional(),
  hasBarchart: z.boolean().optional(),
  hasTechSpec: z.boolean().optional(),
  hasPlan: z.boolean().optional(),
  hasQuitClaim: z.boolean().optional(),
});

export const RequestInOrderFormRule = z.object({
  code: z.string().optional(),
  purchaseOrder: z.string().optional(),
  purchaseRequest: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const OrderFormRule = z
  .object({
    code: z.string().optional(),
    pono: z.string().optional(),
    poDate: z.coerce.date().nullish().catch(null),
    resolutionNo: z.string().optional(),
    procurementMode: z.string().optional(),
    category: z.string(),
    categoryName: z.string(),
    supplier: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    tin: z.string(),
    deliveryAddress: z.string(),
    deliveryDate: z.coerce.date().nullish().catch(null),
    deliveryTerm: z.string(),
    paymentTerm: z.string(),
    isActive: z.boolean().optional(),
    requests: RequestInOrderFormRule.array(),
    iar: z.string().optional(),
    iarDate: z.coerce.date().nullish().catch(null),
    invoice: z.string().optional(),
    invoiceDate: z.coerce.date().nullish().catch(null),
    signatoryName1: z.string().optional(),
    signatoryName2: z.string().optional(),
    signatoryOffice1: z.string().optional(),
    signatoryOffice2: z.string().optional(),
    endUserName1: z.string().optional(),
    endUserOffice1: z.string().optional(),
    rfqNumber: z.string().optional(),
    itbNumber: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.deliveryDate === null || val.deliveryDate === undefined) {
      return true;
    }
  });

export const DeliveryFormRule = z.object({
  code: z.string().optional(),
  prCode: z.string().optional(),
  prItemCode: z.string().optional(),
  brand: z.string().optional(),
  brandName: z.string().optional(),
  description: z.string().optional(),
  deliveredQuantity: z.number(),
  itemDetails: ItemFormRule.nullish(),
});
export const DeliveryCollectionFormRule = z.object({
  collection: DeliveryFormRule.array(),
});

export const PersonalRule = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Maximum of 100 characters only"),
  lastName: z.string().optional(),
  email: z
    .string()
    .email()
    .min(3, "Email must be at least 3 characters")
    .max(100, "Maximum of 100 characters only")
    .optional(),
  mobile: z
    .string()
    .min(1, { message: "Mobile is required" })
    .max(30, "Mobile is maxed at 30"),
  phone: z.string().optional(),
  tin: z.string().optional(),
  gender: z.string().optional(),
});
export const AddressRule = z.object({
  streetName: z.string().max(50, "Streetname is maxed at 50").optional(),
  barangay: z.string().max(50, "Barangay is maxed at 50").optional(),
  city: z.string().max(50, "City is maxed at 50").optional(),
  province: z.string().max(50, "Province is maxed at 50").optional(),
  region: z.string().max(50, "Region is maxed at 50").optional(),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(50, "Country is maxed at 50"),
  zipcode: z.string().max(50, "Zipcode is maxed at 50").optional(),
});
export const AccountRule = z.object({
  department: z.string(),
  role: z.string(),
  username: z.string(),
  password: z.string(),
});
export const LoginRule = z.object({
  email: z.string().min(1, "Email/Username is required"),
  password: z.string().min(1, { message: "Password is required" }),
  captcha: z.string().optional(),
});

export const BidderFormRule = PersonalRule.and(AddressRule);
export const AccountFormRule = PersonalRule.and(AccountRule);

export type RequestFormSchema = z.infer<typeof RequestFormRule>;
export type RequestInOrderFormSchema = z.infer<typeof RequestInOrderFormRule>;
export type OrderFormSchema = z.infer<typeof OrderFormRule>;
export type BidderFormSchema = z.infer<typeof BidderFormRule>;
export type AccountFormSchema = z.infer<typeof AccountFormRule>;
export type ItemFormSchema = z.infer<typeof ItemFormRule>;
export type PurchaseItemFormSchema = z.infer<typeof PurchaseItemFormRule>;
export type DeliveryFormSchema = z.infer<typeof DeliveryFormRule>;
export type DeliveryCollectionFormSchema = z.infer<
  typeof DeliveryCollectionFormRule
>;
export type LoginFormSchema = z.infer<typeof LoginRule>;
