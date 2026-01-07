// app/login/actions.ts
"use server";

import { parseCookieString } from "@/lib/parseCookieString";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

export async function login(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const returnUrl = (formData.get("returnUrl") as string) || "/";
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  //login api
  const res = await fetch(`${process.env.API_BASE_URL}/user/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    return { ...errorResponse };
  }
  const data = await res.json();

  // store auth token in cookie
  const cookiesStore = await cookies();
  cookiesStore.set("accessToken", data.data.token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, //1hr
  });

  // parse refresh token setCookieHeader and store in cookie
  const setCookieHeader = res.headers.getSetCookie();
  if (setCookieHeader && setCookieHeader.length > 0) {
    setCookieHeader.forEach((cookieString) => {
      const parsed = parseCookieString(cookieString);

      // set to browser (through next js)
      if (parsed.name && parsed.value) {
        cookiesStore.set({
          name: parsed.name,
          value: parsed.value,
          httpOnly: parsed.httpOnly,
          secure: parsed.secure,
          path: parsed.path,
          maxAge: parsed.maxAge,
          domain: parsed.domain,
        });
      }
    });
  }

  // redirect to homepage
  const destination = returnUrl.startsWith("/") ? returnUrl : "/";
  redirect(destination);
}
