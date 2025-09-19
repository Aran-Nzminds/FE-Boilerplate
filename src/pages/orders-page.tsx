import { useOrders } from "@hooks/use-orders";

export function OrdersPage() {
  const { data: orders = [], isLoading, isError, error, refetch } = useOrders();
  // ! If not using hook
  //  const {
  //     data: orders = [],
  //     error,
  //     isLoading,
  //     refetch,
  //   } = useQuery<Order[], Error>({
  //     queryKey: ["orders"], // cache key
  //     queryFn: getOrders,   // API call
  //     retry: 2,             // retry failed requests
  //     staleTime: 1000 * 60, // cache fresh for 1 minute
  //   });
  if (isLoading)
    return <div>Loading orders...</div>;
  if (isError) {
    return (
      <div>
        Error:
        {error?.message}
      </div>
    );
  }

  return (
    <div>
      {orders.map(o => (
        <div key={o.id}>
          Order #
          {o.id}
          {" "}
          -
          {" "}
          {o.status}
          {" "}
          - $
          {o.total}
        </div>
      ))}

      <button onClick={() => refetch()}>🔄 Refresh</button>
    </div>
  );
}
