"use client";
import { Button } from "@/components/ui/button";
import { createOrder } from "../orders/action";
import { useTransition } from "react";

type OrderItem = {
  skuId: number;
  quantity: number;
};

export default function PlaceOrderButton({
  orderItems,
}: {
  orderItems: OrderItem[];
}) {
  const [isPending, startTransition] = useTransition();
  const handlePlaceOrder = () => {
    startTransition(async () => {
      await createOrder(orderItems);
    });
  };
  return (
    <Button
      className="w-full mt-4 cursor-pointer"
      size="lg"
      onClick={handlePlaceOrder}
      disabled={isPending}
    >
      {isPending ? "Placing Order..." : "Place Order"}
    </Button>
  );
}
