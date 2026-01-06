import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function getOwnUserData(): Promise<User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  return fetcher(`/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    // next: {
    //   tags: ["loggedInUser"],
    // },
  });
}
