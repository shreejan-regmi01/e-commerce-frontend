"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import z from "zod";

const addSkuSchema = z.object({
  skuCode: z.string(),
  price: z.string(),
  quantity: z.string(),
  optionValueIds: z.string().transform((str) => {
    const parsed = JSON.parse(str);
    return parsed as string[];
  }),
  productId: z.string(),
});

export async function createSku(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  //   console.log(Object.fromEntries(formData));
  //   return;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }

  const result = addSkuSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { skuCode, price, quantity, optionValueIds, productId } = result.data;

  const res = await fetch(
    `${process.env.API_BASE_URL}/product/${productId}/sku`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        skuCode,
        price,
        quantity,
        optionValueIds,
        isActive: true,
      }),
    }
  );

  if (!res.ok) {
    const errorResponse = await res.json();
    return errorResponse;
  }

  revalidatePath(`/seller/product/${productId}/sku/add`);
  return {
    success: true,
    timestamp: Date.now(),
  };
}
