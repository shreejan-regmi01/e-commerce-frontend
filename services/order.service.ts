import { fetcher } from "@/lib/utils";
import { Order, OrderItemType } from "@/types/order";
import { cookies } from "next/headers";

export async function getOrders(): Promise<
  (Order & { orderItems: OrderItemType[] })[]
> {
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
  });
}
