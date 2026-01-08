import {
  Product,
  ProductOptions,
  ProductOptionValue,
  ProductSku,
} from "./product";

export interface CartItem {
  userId: number;
  skuId: number;
  quantity: number;
  sku: ProductSku & {
    skuOptionValues: (ProductOptionValue & { productOption: ProductOptions })[];
    product: Product;
  };
}
