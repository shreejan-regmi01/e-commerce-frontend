import { Category, CategoryTree } from "@/types/category";

export function buildCategoryTree(categories: Category[]): CategoryTree[] {
  const categoryMap = new Map<number, CategoryTree>();
  const roots: CategoryTree[] = [];

  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  categories.forEach((category) => {
    const node = categoryMap.get(category.id);

    if (!node) return;

    if (category.parentId !== null) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}
