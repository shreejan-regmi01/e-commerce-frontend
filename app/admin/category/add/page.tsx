import { getCategories } from "@/services/category.service";
import AddCategoryForm from "./AddCategoryForm";

export default async function AddCategoryPage() {
  const categories = await getCategories();
  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-2">Add Category</h1>
      <p className="text-muted-foreground">Create a new product category</p>
      <AddCategoryForm existingCategories={categories} />
    </div>
  );
}
