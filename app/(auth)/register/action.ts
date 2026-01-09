"use server";

import { USER_TYPE } from "@/types/user";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email("Invalid email address"),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be a valid 10-digit number"),
  password: z.string(),
  role: z.enum(Object.values(USER_TYPE)),
});

export async function register(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const result = registerSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, mobile, password, role } = result.data;

  const res = await fetch(`${process.env.API_BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      mobile,
      password,
      role,
    }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    return errorResponse;
  }

  redirect("/login?msg=User registered successfully&msgType=success");
}
