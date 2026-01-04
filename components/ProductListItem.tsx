import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductProps {
  id: number;
  name: string;
  brand: string;
  price: string;
  imageUrl?: string;
}

export function ProductListItem({
  name,
  brand,
  price,
  imageUrl,
}: ProductProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-md cursor-pointer group pt-0">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        )}
      </div>

      <CardContent className="py-0 px-4">
        <p className="text-sm text-muted-foreground mb-1">{brand}</p>
        <h3 className="font-semibold text-lg leading-tight truncate">{name}</h3>
      </CardContent>

      <CardFooter className="px-4 pt-0 flex justify-between items-center">
        <span className="font-bold text-lg">Rs. {price.toLocaleString()}</span>
        {/* Add to cart button in future */}
      </CardFooter>
    </Card>
  );
}
