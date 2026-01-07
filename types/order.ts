export type Order = {
  id: number;
  userId: number;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderItemType = {
  id: number;
  orderId: number;
  skuId: number;
  productNameSnapshot: string;
  skuCodeSnapshot: string;
  priceSnapshot: string;
  quantity: number;
};
