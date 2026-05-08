import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional().or(z.literal("")),
  message: z.string().min(1).max(5000),
});

export const orderItemInputSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().positive().max(99),
  unitPrice: z.number().nonnegative(),
  productName: z.string().min(1),
  imageUrl: z.union([z.string().url(), z.null()]).optional(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email(),
  customerPhone: z.string().max(50).optional().or(z.literal("")),
  shipStreet: z.string().min(1).max(200),
  shipNumber: z.string().min(1).max(50),
  shipInterior: z.string().max(50).optional().or(z.literal("")),
  shipColonia: z.string().min(1).max(120),
  shipCity: z.string().min(1).max(120),
  shipState: z.string().min(1).max(120),
  shipZip: z.string().min(1).max(20),
  items: z.array(orderItemInputSchema).min(1),
});
