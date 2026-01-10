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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import { createCategory } from "./action";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between font-normal",
                      !selectedParentId && "text-muted-foreground"
                    )}
                  >
                    {selectedParentId
                      ? existingCategories.find(
                          (c) => c.id.toString() === selectedParentId
                        )?.name
                      : "Select parent category (Optional)"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search parent category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="none"
                          onSelect={() => {
                            setSelectedParentId("");
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedParentId === ""
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          No Parent (Root Category)
                        </CommandItem>
                        {existingCategories.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              setSelectedParentId(category.id.toString());
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedParentId === category.id.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
