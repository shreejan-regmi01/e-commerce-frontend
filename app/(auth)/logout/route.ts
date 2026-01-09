import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  revalidatePath("/");
  redirect("/login");
}
