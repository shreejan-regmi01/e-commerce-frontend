import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCartItems } from "@/services/cart.service";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartItemRow } from "./CartItemRow";
import PlaceOrderButton from "./PlaceOrderButton";

export default async function CartPage() {
  const { cartItems, totalPriceOfCart } = await getCartItems();

  if (cartItems.length == 0) {
    return (
      <div className="text-center py-12 rounded-lg">
        <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-500 mt-12" />
        <p className="text-gray-500">Your cart is empty.</p>
        <Button variant="link" asChild className="mt-2">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {/* <div className="bg-gray-200">{JSON.stringify(cartItems)}</div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* cart items list */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemRow key={`${item.userId}-${item.sku.id}`} item={item} />
          ))}
        </div>

        {/* order summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 pb-2 pt-0">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  Rs. {totalPriceOfCart.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {totalPriceOfCart.toLocaleString()}</span>
              </div>
              <PlaceOrderButton
                orderItems={cartItems.map((item) => ({
                  skuId: item.skuId,
                  quantity: item.quantity,
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
