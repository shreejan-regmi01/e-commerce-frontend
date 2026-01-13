import { fetcher } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getProductBySlug(slug: string): Promise<Product> {
  return fetcher(`/product/${slug}`);
}

export async function getProducts({
  query,
}: {
  query: string;
}): Promise<Product[]> {
  return fetcher(`/product${query}`, { cache: "no-store" });
}
