"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import z from "zod";

const addProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  brand: z.string(),
  categoryId: z.string(),
  productOptions: z.string().transform((str) => {
    const parsed = JSON.parse(str);
    return parsed as string[];
  }),
});
export async function createProduct(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }

  const result = addProductSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, slug, description, brand, categoryId, productOptions } =
    result.data;

  const res = await fetch(`${process.env.API_BASE_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      name,
      slug,
      description,
      brand,
      categoryId,
      productOptions,
      isActive: true,
    }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    return errorResponse;
  }

  revalidatePath("/seller/product/add");
  return {
    success: true,
    timestamp: Date.now(),
  };
}
