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
  const [optionValueTags, setOptionValueTags] = useState<string[]>([]);

  const nameError = state?.errors?.name?.[0];
  const descriptionError = state?.errors?.description?.[0];
  const brandError = state?.errors?.brand?.[0];
  const categoryIdError = state?.errors?.categoryId?.[0];
  // const productOptionsError = state?.errors?.productOptions?.[0];

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      toast.success("Product created successfully!");
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

  return (
    <Card className="max-w-2xl mt-10">
      <CardContent>
        <form action={formAction}>
          <input type="hidden" name="slug" value={slug} />
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
            <Field>
              <input
                type="hidden"
                name="optionValues"
                value={JSON.stringify(optionValueTags)}
              />
              <TagInput
                initialTags={optionValueTags}
                onChange={(newTags) => setOptionValueTags(newTags)}
              />
            </Field>

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
