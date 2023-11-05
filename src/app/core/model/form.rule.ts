import * as z from "zod";

export const RequestFormRule = z.object({
  category: z.string(),
  section: z.string(),
  sai: z.string(),
  alobs: z.string(),
  purpose: z.string(),
});

export const RequestItemFormRule = z.object({
  itemNo: z.string(),
  quantity: z.number(),
  unit: z.string(),
  description: z.string(),
  brand: z.string(),
  cost: z.number(),
  amount: z.number().optional(),
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
});

export const RequestWithItemFormRule = RequestFormRule.and(
  RequestItemFormRule.array()
);
export const OrderWithItemFormRule = OrderItemRule.and(
  RequestItemFormRule.array()
);

export type RequestWithItemFormSchema = z.infer<typeof RequestWithItemFormRule>;
export type OrderWithItemFormSchema = z.infer<typeof OrderWithItemFormRule>;
