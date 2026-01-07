import { fetcher } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { cookies } from "next/headers";

export async function getCartItems(): Promise<{
  cartItems: CartItem[];
  totalPriceOfCart: number;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  return fetcher(`/cart/items`, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  });
}
