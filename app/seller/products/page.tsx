import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/services/product.service";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("User is not logged in!");
  }
  const userId = decodeJwt(accessToken).userId;
  const products = await getProducts({ query: `?addedBy=${userId}` });
  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-8">
        Please select a product for which to add SKU:
      </h1>
      <div className="space-y-6">
        {products.map((product) => (
          <Card key={product.id}>
            <Link href={`/seller/product/${product.slug}/sku/add`}>
              <div className="flex px-8 py-0">
                <Skeleton className="w-24 h-24 bg-gray-300" />
                <div className="ml-6">
                  <Badge variant={"outline"} className="text-[11px] -ml-1 ">
                    {product.brand}
                  </Badge>
                  <p className="font-semibold text-lg mt-1">{product.name}</p>
                  <p className="font-semibold text-xs text-muted-foreground mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
