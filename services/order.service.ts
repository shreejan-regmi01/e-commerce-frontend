import { fetcher } from "@/lib/utils";
import { Order, OrderItemDataWithSkuandProductOption } from "@/types/order";
import { cookies } from "next/headers";

type OrderData = Order & {
  orderItems: OrderItemDataWithSkuandProductOption[];
};

export async function getOrders(): Promise<OrderData[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  return fetcher(`/order`, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
    cache: "no-store",
  });
}
