"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product, ProductSku } from "@/types/product";
import { CreditCard, ShoppingCart, Store } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { addToCart } from "./action";
import { NumericStepper } from "@/components/ui/numeric-stepper";
import { toast } from "sonner";

export default function ProductDetails({ product }: { product: Product }) {
  const { productOptions } = product;
  let { productSkus } = product;
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null);
  const [ctasDisabledMsg, setCtasDisabledMsg] = useState<string>("");
  const [isCartAdditionPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState<number>(1);

  const selectedOptionValues = Object.values(selections).sort();
  const isAllOptionsSelected =
    Object.entries(selections).length === productOptions?.length;

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
    // find matching sku based on current selection
    const matchingSku = productSkus?.find((sku) => {
      return (
        sku.skuOptionValuesArray.toString() === selectedOptionValues.toString()
      );
    });

    setSelectedSku(matchingSku || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  useEffect(() => {
    if (!isAllOptionsSelected) return;
    if (!selectedSku) {
      return setCtasDisabledMsg(
        "Selected variant not available. Please select another variant."
      );
    }
    setCtasDisabledMsg("");
  }, [selectedSku, isAllOptionsSelected]);

  const isBuyAndCartButtonDisabled = () => {
    return isCartAdditionPending || !isAllOptionsSelected || !selectedSku;
    // if (isCartAdditionPending) return true;
    // if (!isAllOptionsSelected) return true;
    // if (!selectedSku) return true;
    // return false;
  };

  async function addToCartHandler({
    skuId,
    pathname,
  }: {
    skuId: number | undefined;
    quantity: number;
    pathname: string;
  }) {
    if (!skuId) return;
    console.log({ pathname });
    startTransition(async () => {
      await addToCart({ skuId, quantity, pathname });
      setSelections({});
      setSelectedSku(null);
      setQuantity(1);
      toast.success("Item added to cart successfully!");
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(selections)}
        <br />
        {JSON.stringify(selectedOptionValues)}
        <br />
        {JSON.stringify(selectedSku)}
        <br />
        Quantity: {quantity}
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
          {/* header info */}
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.brand}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold ">
                Rs. {selectedSku?.price.toLocaleString() || "--"}
              </span>
            </div>
          </div>
          {/* description */}
          <div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* variant selection groups */}
          <h2 className="text-lg font-bold">Choose variants:</h2>
          <div className="space-y-6">
            {productOptions &&
              productOptions.map((option) => (
                <div key={option.id}>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {option.name}:{" "}
                  </h3>

                  <ToggleGroup
                    type="single"
                    value={selections[option.id]?.toString() || ""}
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
            {!isAllOptionsSelected && (
              <p className="text-red-500">
                Please select required variants from each option to place order
              </p>
            )}
          </div>

          {/* quantity selector */}
          <div className="flex gap-4 items-center">
            <p>Quantity:</p>
            <NumericStepper value={quantity} onChange={setQuantity} min={1} />
          </div>

          <Separator />

          {/* action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 h-12 text-md cursor-pointer bg-blue-600 hover:bg-blue-700"
              size="lg"
              disabled={isBuyAndCartButtonDisabled()}
            >
              <CreditCard className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 text-md cursor-pointer"
              size="lg"
              disabled={isBuyAndCartButtonDisabled()}
              onClick={() =>
                addToCartHandler({
                  skuId: selectedSku?.id,
                  quantity: 1,
                  pathname: window.location.pathname,
                })
              }
            >
              <ShoppingCart className="mr-2 h-5 w-5" />{" "}
              {isCartAdditionPending ? "Adding to Cart..." : "Add to Cart"}
            </Button>
          </div>
          {ctasDisabledMsg && (
            <p className="text-red-500 -mt-4">{ctasDisabledMsg}</p>
          )}

          {/* shop info card */}
          <Card className="bg-gray-50 border-none mt-4">
            <CardContent className="px-4 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border bg-white">
                <Store className="w-6 h-6 m-auto mt-3 text-gray-400" />
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
