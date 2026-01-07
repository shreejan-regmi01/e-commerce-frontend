import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NumericStepper } from "@/components/ui/numeric-stepper";
import { Separator } from "@/components/ui/separator";
import { getCartItems } from "@/services/cart.service";
import { CartItem } from "@/types/cart";
import {
  Product,
  ProductOptionValue,
  ProductSku,
  ProductOptions,
} from "@/types/product";
import { ImageIcon, Loader2, ShoppingCart, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { CartItemRow } from "./CartItemRow";
// import { updateCartItemQuantity, removeCartItem } from "./actions"; // Your server actions

export default async function CartPage() {
  //   const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  //   const [isLoading, setIsLoading] = useState(false); // Initial fetch loading state

  //   // Calculate totals
  //   const subtotal = cartItems.reduce(
  //     (acc, item) => acc + item.sku.price * item.quantity,
  //     0
  //   );
  const cartItems = await getCartItems();

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemRow
              key={`${item.userId}-${item.sku.id}`}
              item={item}
              //   onRemove={() => {
              //     //   setCartItems((prev) => prev.filter((i) => i.id !== id));
              //     toast.success("Item removed from cart");
              //   }}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {/* Rs. {subtotal.toLocaleString()} */}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                {/* <span>Rs. {subtotal.toLocaleString()}</span> */}
              </div>
              <Button className="w-full mt-4" size="lg">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// --- Individual Cart Item Component ---
