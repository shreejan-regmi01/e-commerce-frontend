export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  brand: string;
  isActive: boolean;
  addedBy: number;
  createdAt: string;
  updatedAt: string;
  productSkus: ProductSku[];
};

export type ProductSku = {
  id: number;
  productId: number;
  skuCode: string;
  price: string;
  isActive: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
