"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product, ProductSku } from "@/types/product";
import { CreditCard, ShoppingCart, Store } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductDetails({ product }: { product: Product }) {
  const { productOptions } = product;
  let { productSkus } = product;
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null);

  const selectedOptionValues = Object.values(selections).sort();

  productSkus = productSkus?.map((skuData) => ({
    ...skuData,
    skuOptionValuesArray: skuData.skuOptionValues
      .map((optionValue) => optionValue.id)
      .sort(),
  }));
  const handleSelection = (optionId: number, valueId: string) => {
    if (!valueId) return;
    setSelections((prev) => ({ ...prev, [optionId]: parseInt(valueId) }));
  };

  useEffect(() => {
    // Find matching SKU based on current selections
    const matchingSku = productSkus?.find((sku) => {
      console.log("Checking SKU:", sku.skuOptionValuesArray.toString());
      console.log("Expected:", selectedOptionValues.toString());
      const match =
        sku.skuOptionValuesArray.toString() === selectedOptionValues.toString();
      console.log("Match:", match);
      return match;
    });

    setSelectedSku(matchingSku || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(selections)}
        <br />
        {JSON.stringify(selectedOptionValues)}
        <br />
        {JSON.stringify(selectedSku)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* product image gallery */}
        <div className="flex flex-col gap-4 col-span-1">
          <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden border">
            {/* <Image
              src={product.mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            /> */}
            {/* <Skeleton /> */}
          </div>
        </div>

        {/* product details */}
        <div className="flex flex-col gap-6 col-span-2 pl-12 pr-24">
          {/* Header Info */}
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.brand}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold ">
                {/* Rs. {product.price.toLocaleString()} */}
                Rs. --
              </span>
            </div>
          </div>
          {/* Description */}
          <div>
            {/* <h3 className="font-semibold text-gray-900 mb-2">Description</h3> */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Variant Selection Groups (The part from your image) */}
          <h2 className="text-lg font-bold">Choose variants:</h2>
          <div className="space-y-6">
            {productOptions &&
              productOptions.map((option) => (
                <div key={option.id}>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {option.name}:{" "}
                    {/* <span className="text-gray-900 font-bold ml-1"> */}
                    {/* Find the selected value name to display next to the label */}
                    {/* {option.productOptionValues.find(
                      (v) => v.id === selections[option.id]
                    )?.value || "Select"}
                  </span> */}
                  </h3>

                  <ToggleGroup
                    type="single"
                    value={selections[option.id]?.toString()}
                    onValueChange={(val) => handleSelection(option.id, val)}
                    className="justify-start flex-wrap gap-3"
                  >
                    {option.productOptionValues.map((value) => (
                      <ToggleGroupItem
                        key={value.id}
                        value={value.id.toString()}
                        className={`
              h-auto px-4 py-2 min-w-12 rounded-md border-2 transition-all
              data-[state=on]:border-blue-500 data-[state=on]:bg-orange-50 data-[state=on]:text-blue-700
              hover:bg-gray-50 hover:border-gray-300
            `}
                      >
                        {/* Optional: Add a colored dot if the option name is 'Color' */}
                        {option.name === "Color" && (
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2 border border-gray-200"
                            style={{
                              backgroundColor: value.value
                                .replace(" ", "")
                                .toLowerCase(),
                            }}
                          />
                        )}
                        <span className="text-sm font-medium">
                          {value.value}
                        </span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              ))}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 h-12 text-md cursor-pointer bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <CreditCard className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 text-md cursor-pointer"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>

          {/* Shop Info Card */}
          <Card className="bg-gray-50 border-none mt-4">
            <CardContent className="px-4 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border bg-white">
                <Store className="w-6 h-6 m-auto mt-3 text-gray-400" />
                {/* Use Image component here for real shop icon */}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Sold by</p>
                <p className="font-semibold text-gray-900">{`${product.user?.firstName} ${product.user?.lastName}`}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800"
              >
                Visit Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
