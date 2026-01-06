"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const addToCartSchema = z.object({
  skuId: z.int(),
  quantity: z.int(),
});

export async function addToCart({
  skuId,
  quantity,
  pathname,
}: {
  skuId: number;
  quantity: number;
  pathname: string;
}) {
  const result = addToCartSchema.safeParse({ skuId, quantity });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  //login api
  const res = await fetch(`${process.env.API_BASE_URL}/cart/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ skuId, quantity }),
  });

  const response = await res.json();
  console.log({ response });
  if (!res.ok) {
    return response;
  }
  // also show a toast once item is added to cart
  revalidatePath(pathname);
}
