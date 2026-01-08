"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createOrder(
  payload: {
    skuId: number;
    quantity: number;
  }[]
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  const res = await fetch(`${process.env.API_BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ items: payload }),
  });

  const response = await res.json();
  if (!res.ok) {
    return response;
  }
  redirect("/orders?msg=Order placed successfully!");
}
