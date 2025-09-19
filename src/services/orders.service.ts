import { apiRequest } from "@utils/api-request";
import { z } from "zod";

const OrderSchema = z.object({
  id: z.number(),
  status: z.string(),
  total: z.number(),
});

export type Order = z.infer<typeof OrderSchema>;

export async function getOrders(): Promise<Order[]> {
  return apiRequest<Order[]>("get", "/orders", undefined, {
    token: true,
    schema: z.array(OrderSchema),
  });
}
