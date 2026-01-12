"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Product } from "@/types/product";
import { createSku } from "./action";

export default function AddSkuForm({ product }: { product: Product }) {
  const [state, formAction, isPending] = useActionState(createSku, undefined);

  const [skuCode, setSkuCode] = useState("");
  const [selections, setSelections] = useState<Record<number, number>>({});

  const skuCodeError = state?.errors?.skuCode?.[0];
  const priceError = state?.errors?.price?.[0];
  const quantityError = state?.errors?.quantity?.[0];

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all whitespace
    const val = e.target.value.replace(/\s/g, "");
    setSkuCode(val);
  };

  // Handle Toggle Selection
  const handleSelection = (optionId: number, valueId: string) => {
    if (!valueId) return; // Prevent deselecting (optional UX choice)
    setSelections((prev) => ({ ...prev, [optionId]: parseInt(valueId) }));
  };

  const selectedOptionCount = Object.keys(selections).length;
  const totalOptions = product.productOptions?.length || 0;
  const isAllOptionsSelected =
    totalOptions > 0 && selectedOptionCount === totalOptions;

  const selectedValueIds = Object.values(selections);

  useEffect(() => {
    if (state?.success) {
      toast.success("SKU added successfully!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkuCode("");
      setSelections({});
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="max-w-2xl mt-10">
      <CardHeader>
        <CardTitle>Add New SKU</CardTitle>
        <div>{JSON.stringify(selections)}</div>
      </CardHeader>
      <CardContent>
        {state?.message && !state.success && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{state.message}</AlertTitle>
          </Alert>
        )}

        <form id="add-sku-form" action={formAction}>
          <input type="hidden" name="productId" value={product.id} />
          <input
            type="hidden"
            name="optionValueIds"
            value={JSON.stringify(selectedValueIds)}
          />

          <FieldGroup>
            <Field data-invalid={!!skuCodeError}>
              <FieldLabel htmlFor="skuCode">SKU Code</FieldLabel>
              <Input
                id="skuCode"
                name="skuCode"
                value={skuCode}
                onChange={handleSkuChange}
                placeholder="e.g. SUMMER-TSHIRT-RED-L"
                required
              />
              <FieldDescription>
                Unique code for this variant. Spaces are not allowed.
              </FieldDescription>
              {skuCodeError && <FieldError>{skuCodeError}</FieldError>}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <Field data-invalid={!!priceError}>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                />
                {priceError && <FieldError>{priceError}</FieldError>}
              </Field>

              {/* Quantity */}
              <Field data-invalid={!!quantityError}>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                />
                {quantityError && <FieldError>{quantityError}</FieldError>}
              </Field>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-6 mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Select Variant Options
              </h3>

              {product.productOptions?.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  This product has no options configured.
                </p>
              )}

              {product.productOptions?.map((option) => (
                <div key={option.id}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {option.name}:
                  </h4>

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
                          data-[state=on]:border-blue-500 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-700
                          hover:bg-gray-50 hover:border-gray-300
                        `}
                      >
                        {option.name.toLowerCase() === "color" && (
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

            <Field>
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={
                  isPending ||
                  (product.productOptions &&
                    product.productOptions.length > 0 &&
                    !isAllOptionsSelected)
                }
              >
                {isPending ? "Adding SKU..." : "Add SKU"}
              </Button>
              {product.productOptions &&
                product.productOptions.length > 0 &&
                !isAllOptionsSelected && (
                  <p className="text-xs text-center text-red-500 mt-2">
                    Please select a value for all options to proceed.
                  </p>
                )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
