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
import { createCategory } from "./action";
import { Category } from "@/types/category";
import { toast } from "sonner";
import CustomSelect from "@/components/CustomSelect";

export default function AddCategoryForm({
  existingCategories,
}: {
  existingCategories: Category[];
}) {
  const [state, formAction, isPending] = useActionState(
    createCategory,
    undefined
  );

  const nameError = state?.errors?.name?.[0];
  const slugError = state?.errors?.slug?.[0];
  const parentIdError = state?.errors?.parentId?.[0];

  const [open, setOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string>("");

  useEffect(() => {
    console.log({ state });
    if (state?.success) {
      toast.success("Category created successfully!");
    } else if (state?.message) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <Card className="max-w-2xl mt-10">
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            {/* Name Field */}
            <Field data-invalid={!!nameError}>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Men's Clothing"
                required
              />
              {nameError && <FieldError>{nameError}</FieldError>}
            </Field>

            {/* Slug Field (Controlled by state) */}
            <Field data-invalid={!!slugError}>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input
                id="slug"
                name="slug"
                placeholder="e.g. mens-clothing"
                required
              />
              <FieldDescription>Unique ID used in the URL.</FieldDescription>
              {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            {/* Parent Category Combobox */}
            <Field data-invalid={!!parentIdError}>
              <FieldLabel>Parent Category</FieldLabel>
              {/* hidden input */}
              <input type="hidden" name="parentId" value={selectedParentId} />
              <CustomSelect
                open={open}
                setOpen={setOpen}
                selectedOptionValue={selectedParentId}
                setSelectedOptionValue={setSelectedParentId}
                existingOptions={existingCategories}
                placeholder="Select parent category (optional)"
              />
              <FieldDescription>
                Select a parent if this is a sub-category.
              </FieldDescription>
              {parentIdError && <FieldError>{parentIdError}</FieldError>}
            </Field>

            <Field>
              <Button
                type="submit"
                className="w-full mt-4 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Category"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
