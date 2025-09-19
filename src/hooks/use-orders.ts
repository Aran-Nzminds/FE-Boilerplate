// hooks/useOrders.ts
import { useQuery } from "@tanstack/react-query";

import type { Order } from "../services/orders.service";

import { getOrders } from "../services/orders.service";

export function useOrders() {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
    retry: 2,
    staleTime: 1000 * 60,
  });
}
