"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { createProduct } from "./action";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/CustomSelect";
import { TagInput } from "@/components/ui/tag-input";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

export default function AddCategoryForm({
  existingCategories,
}: {
  existingCategories: Category[];
}) {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    undefined
  );
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [slug, setSlug] = useState("");
  const [variantOptions, setVariantOptions] = useState<
    { name: string; values: string[] }[]
  >([]);

  const nameError = state?.errors?.name?.[0];
  const descriptionError = state?.errors?.description?.[0];
  const brandError = state?.errors?.brand?.[0];
  const categoryIdError = state?.errors?.categoryId?.[0];

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      toast.success("Product created successfully!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVariantOptions([]);
      setSelectedCategoryId("");
      setSlug("");
    } else if (state?.message) {
      toast.error(state?.message);
    }
  }, [state]);

  const generateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generatedSlug);
  };

  const updateOptionName = (optionName: string, index: number) => {
    // console.log({ optionName, index });
    const updatedOptions = [...variantOptions];
    updatedOptions[index].name = optionName;
    setVariantOptions(updatedOptions);
  };

  const updateOptionTags = (optionValues: string[], index: number) => {
    const updatedOptions = [...variantOptions];
    updatedOptions[index].values = optionValues;
    setVariantOptions(updatedOptions);
  };

  const addVariantSelectorInUI = (e: React.MouseEvent) => {
    e.preventDefault();
    setVariantOptions([
      ...variantOptions,
      {
        name: "",
        values: [],
      },
    ]);
  };

  const removeVariant = (index: number) => {
    const updatedOptions = [...variantOptions];
    updatedOptions.splice(index, 1);
    setVariantOptions(updatedOptions);
  };

  const formActionHandler = (payload: FormData) => {
    if (variantOptions.length === 0) {
      toast.error("Please add at least one product option");
      return;
    }
    const isVarietyAdditionPending = variantOptions.some(
      (option) => option.name === "" || option.values.length === 0
    );
    if (isVarietyAdditionPending) {
      toast.error("Please fill all the variety options");
      return;
    }
    formAction(payload);
  };
  return (
    <Card className="max-w-2xl mt-10">
      <div>{JSON.stringify(variantOptions)}</div>
      <CardContent>
        <form action={formActionHandler}>
          <input type="hidden" name="slug" value={slug} />
          <input
            type="hidden"
            name="productOptions"
            value={JSON.stringify(variantOptions)}
          />
          <FieldGroup>
            {/* Name Field */}
            <Field data-invalid={!!nameError}>
              <FieldLabel htmlFor="name"> Product Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Mens T-Shirt"
                onChange={generateSlug}
                required
              />
              {nameError && <FieldError>{nameError}</FieldError>}
              <FieldDescription>
                <i>Generated slug</i>: {slug || "--"}
              </FieldDescription>
            </Field>

            {/* Description Field */}
            <Field data-invalid={!!descriptionError}>
              <FieldLabel htmlFor="description"> Description</FieldLabel>
              {/* <Input
                id="description"
                name="description"
                placeholder="e.g. Mens T-Shirt"
                onChange={generateSlug}
                required
              /> */}
              <Textarea
                id="description"
                name="description"
                placeholder="Type your description here."
                required
              />
              {descriptionError && <FieldError>{descriptionError}</FieldError>}
            </Field>

            {/* Brand Field */}
            <Field data-invalid={!!brandError}>
              <FieldLabel htmlFor="brand"> Brand</FieldLabel>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g. Mens T-Shirt"
                onChange={generateSlug}
                required
              />
              {brandError && <FieldError>{brandError}</FieldError>}
            </Field>

            <Field data-invalid={!!categoryIdError}>
              <FieldLabel>Category</FieldLabel>
              <input
                type="hidden"
                name="categoryId"
                value={selectedCategoryId}
              />
              <CustomSelect
                open={open}
                setOpen={setOpen}
                selectedOptionValue={selectedCategoryId}
                setSelectedOptionValue={setSelectedCategoryId}
                existingOptions={existingCategories}
                placeholder="Select category"
              />
              {categoryIdError && <FieldError>{categoryIdError}</FieldError>}
            </Field>
            <Separator />
            <FieldLabel className="text-xl">Add Product Options:</FieldLabel>

            {variantOptions.map((option, index) => (
              <div key={index}>
                <div className="flex items-center justify-between pr-5">
                  <FieldLabel className="text-xl">
                    Option {index + 1}:
                  </FieldLabel>
                  <Trash
                    className="text-red-600 cursor-pointer w-4"
                    onClick={() => removeVariant(index)}
                  />
                </div>
                <div className="flex pt-4">
                  <FieldLabel>Option name:</FieldLabel>
                  <Input
                    // id="optionName"
                    placeholder="e.g. Color"
                    className="ml-4 w-[250px]"
                    value={option.name}
                    onChange={(e) => updateOptionName(e.target.value, index)}
                  />
                </div>
                <div className="flex pt-4">
                  <FieldLabel className="mr-4">Option values:</FieldLabel>
                  <TagInput
                    initialTags={option.values}
                    onChange={(newTags) => updateOptionTags(newTags, index)}
                  />
                </div>
              </div>
            ))}
            <Button
              className="border-dashed border cursor-pointer"
              variant={"outline"}
              onClick={addVariantSelectorInUI}
            >
              Add Option
            </Button>
            <Field>
              <Button
                type="submit"
                className="w-full mt-4 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add Product"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
