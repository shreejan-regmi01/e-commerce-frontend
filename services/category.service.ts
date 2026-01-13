import { fetcher } from "@/lib/utils";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return fetcher("/category", { cache: "no-store" });
}

export async function getProductsByCategorySlug(slug: string) {
  return fetcher(`/category/slug/${slug}/products`, { cache: "no-store" });
}
