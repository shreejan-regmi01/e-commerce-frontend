import { fetcher } from "@/lib/utils";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return fetcher("/category");
}
