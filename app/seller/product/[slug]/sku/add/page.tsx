import { Card, CardHeader } from "@/components/ui/card";
import AddSkuForm from "./AddSkuForm";
import { getProductBySlug } from "@/services/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function AddSkuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return (
    <div className="">
      <div>
        <Card className="flex p-0">
          <CardHeader className="bg-gray-300/30 py-1">
            <span className="font-semibold text-lg">Selected product:</span>
            <Separator />
          </CardHeader>
          <div className="flex px-8 pb-4">
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
        </Card>
      </div>
      <h1 className="text-3xl font-semibold mb-2 mt-8">Add Product Sku</h1>
      <AddSkuForm product={product} />
    </div>
  );
}
