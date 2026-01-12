import { getCategories } from "@/services/category.service";
import AddProductForm from "./AddProductForm";

export default async function AddProductPage() {
  const categories = await getCategories();
  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-2">Add Product</h1>
      <p className="text-muted-foreground">Create a new product</p>
      <AddProductForm existingCategories={categories} />
    </div>
  );
}
