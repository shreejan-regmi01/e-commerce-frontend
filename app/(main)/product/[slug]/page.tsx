import { getProductBySlug } from "@/services/product.service";

import ProductDetails from "./ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
