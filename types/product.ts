import { Category } from "./category";
import { User } from "./user";

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
  productSkus?: (ProductSku & {
    skuOptionValues: ProductOptionValue[];
    skuOptionValuesArray: number[];
  })[];
  user?: User;
  categories?: Category[];
  productOptions?: ProductOptions[];
};

export interface ProductOptions {
  id: number;
  name: string;
  productOptionValues: ProductOptionValue[];
}

export interface ProductOptionValue {
  id: number;
  optionId: number;
  value: string;
}

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

export type SkuOptionValue = {
  skuId: number;
  optionValueId: number;
};
