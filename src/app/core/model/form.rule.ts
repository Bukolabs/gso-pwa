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
    brand: z.string().min(1, "Brand is required"),
    brandName: z.string().optional(),
    cost: z.number(),
    isActive: z.boolean().optional(),
    quantity: z.number().optional(),
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

export const RequestFormRule = z.object({
  code: z.string().optional(),
  prno: z.string().optional(),
  dueDate: z.coerce.date(),
  category: z.string(),
  section: z.string(),
  sai: z.string(),
  saiDate: z.coerce.date().optional(),
  alobs: z.string(),
  alobsDate: z.coerce.date().optional(),
  purpose: z.string(),
  items: ItemFormRule.array(),
  urgent: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const OrderItemRule = z.object({
  procurementMode: z.string(),
  requestNumbers: z.string(),
  supplier: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  tin: z.string(),
  deliveryAddress: z.string(),
  deliveryDate: z.date(),
  deliveryTerm: z.string(),
  paymentTerm: z.string(),
  items: ItemFormRule.array(),
});

export const PersonalRule = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Maximum of 100 characters only"),
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

export const BidderFormRule = PersonalRule.and(AddressRule);

export type RequestFormSchema = z.infer<typeof RequestFormRule>;
export type OrderFormSchema = z.infer<typeof OrderItemRule>;
export type BidderFormSchema = z.infer<typeof BidderFormRule>;
export type ItemFormSchema = z.infer<typeof ItemFormRule>;
