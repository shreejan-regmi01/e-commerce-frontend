export type Category = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
};

export type CategoryTree = Category & {
  children: CategoryTree[];
};
