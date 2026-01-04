import { fetcher } from "@/lib/utils";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return fetcher("/category", {
    next: { tags: ["categories"] }, // Revalidate on category tag invalidation
  });
}

export async function getProductsByCategorySlug(slug: string) {
  return fetcher(`/category/slug/${slug}/products`);
}
