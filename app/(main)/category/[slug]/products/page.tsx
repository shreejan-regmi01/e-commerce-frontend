import { ProductListItem } from "@/components/ProductListItem";
import { getProductsByCategorySlug } from "@/services/category.service";
import { Product } from "@/types/product";

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryWithProducts = await getProductsByCategorySlug(slug);
  const { products } = categoryWithProducts;
  // let { products } = categoryWithProducts;
  // products = [...products, ...products, ...products];
  return (
    <div>
      <h1 className="text-2xl font-bold mt-12 mb-6">
        {categoryWithProducts.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product: Product) => (
          <ProductListItem
            key={product.id}
            id={product.id}
            name={product.name}
            brand={product.brand}
            price={product.productSkus[0]?.price || "--"}
            // imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
