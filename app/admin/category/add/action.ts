"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const registerSchema = z.object({
  name: z.string(),
  slug: z.string(),
  parentId: z.string().optional(),
});

export async function createCategory(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }

  const result = registerSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, slug } = result.data;
  let { parentId } = result.data;
  parentId = parentId || undefined;
  const res = await fetch(`${process.env.API_BASE_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      name,
      slug,
      parentId,
    }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    return errorResponse;
  }

  revalidatePath("/admin/category/add");
  return {
    success: true,
    timestamp: Date.now(),
  };
}
