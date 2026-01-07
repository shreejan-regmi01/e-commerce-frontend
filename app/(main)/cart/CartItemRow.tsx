"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NumericStepper } from "@/components/ui/numeric-stepper";
import { CartItem } from "@/types/cart";
import { ImageIcon, Loader2, Store, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { updateCartItemQuantity } from "./action";
import { toast } from "sonner";

export function CartItemRow({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (id: number) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isPending, startTransition] = useTransition();

  const isDirty = quantity !== item.quantity;

  const handleUpdate = () => {
    startTransition(async () => {
      await updateCartItemQuantity({ skuId: item.sku.id, quantity });
      // item.quantity = quantity; // Optimistic update for demo
      toast.success("Quantity updated");
    });
  };

  const handleRemove = () => {
    // await removeCartItem(item.id);
    // onRemove(item.id);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image with Fallback */}
          <div className="relative h-24 w-24 shrink-0 bg-gray-100 rounded-md border overflow-hidden">
            {/* {item.sku.product.mainImage ? (
              <Image
                src={item.product.mainImage}
                alt={item.product.name}
                fill
                className="object-cover"
                onError={(e) => {
                  // Next/Image handles errors gracefully usually, but for custom fallback:
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : ( */}
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <ImageIcon className="h-8 w-8" />
            </div>
            {/* )} */}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {item.sku.product.name}
                  </h3>
                  {/* Seller Info */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 my-1.5">
                    <Store className="h-3 w-3 mt-0.5" />
                    <span>
                      {item.sku.product.user?.firstName}{" "}
                      {item.sku.product.user?.lastName}
                    </span>
                  </div>
                </div>
                {/* Remove Button */}
                <Button
                  onClick={handleRemove}
                  className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                  variant="ghost"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Variants */}
              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                {item.sku.skuOptionValues.map((obj) => {
                  const optionName = obj.productOption.name;
                  const optionValue = obj.value;
                  return (
                    <div
                      key={obj.id}
                      className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                    >
                      {optionName ? (
                        <span className="font-medium text-gray-500">
                          {optionName}:{" "}
                        </span>
                      ) : null}
                      <span className="font-medium text-gray-900">
                        {optionValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-end justify-between mt-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="w-32">
                  <NumericStepper
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={100}
                  />
                </div>

                {/* Update Button - Only shows when quantity changed */}
                {isDirty && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUpdate}
                    disabled={isPending}
                    className="h-8 text-xs border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800"
                  >
                    {isPending ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                )}
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  Rs. {(parseInt(item.sku.price) * quantity).toLocaleString()}
                </p>
                {quantity > 1 && (
                  <p className="text-xs text-gray-500">
                    {quantity} x Rs. {parseInt(item.sku.price).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
