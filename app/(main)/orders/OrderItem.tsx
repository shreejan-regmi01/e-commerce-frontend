import { Card, CardContent } from "@/components/ui/card";
import { OrderItemDataWithSkuandProductOption } from "@/types/order";
import { ImageIcon } from "lucide-react";

export function OrderItem({
  item,
}: {
  item: OrderItemDataWithSkuandProductOption;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* image with fallback */}
          <div className="relative h-24 w-24 shrink-0 bg-gray-100 rounded-md border overflow-hidden">
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <ImageIcon className="h-8 w-8" />
            </div>
            {/* )} */}
          </div>

          {/* details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {item.productNameSnapshot}
                  </h3>
                </div>
              </div>

              {/* variants */}
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
              {/* quantity */}
              <p>Quantity: {item.quantity}</p>

              {/* price */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  Rs.{" "}
                  {(
                    parseFloat(item.priceSnapshot) * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
