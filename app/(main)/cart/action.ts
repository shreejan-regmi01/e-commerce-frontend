"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateCartItemQuantity({
  skuId,
  quantity,
}: {
  skuId: number;
  quantity: number;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  const res = await fetch(
    `${process.env.API_BASE_URL}/cart/item/${skuId}/quantity`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ quantity }),
    }
  );

  console.log({ res });

  const response = await res.json();
  if (!res.ok) {
    return response;
  }
  revalidatePath("/cart");
  return response;
}
