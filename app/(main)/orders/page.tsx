import { getOrders } from "@/services/order.service";
import { OrderItem } from "./OrderItem";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const orders = await getOrders();

  if (orders.length == 0) {
    return (
      <div className="text-center py-12 rounded-lg">
        <PackageOpen className="w-24 h-24 mx-auto mb-4 text-gray-500 mt-12" />
        <p className="text-gray-500">You have no orders yet.</p>
        <Button variant="link" asChild className="mt-2">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {msg && (
        <Alert variant="default" className="bg-green-300/30 mb-6 max-w-[560px]">
          <AlertTitle className="text-green-800">{msg}</AlertTitle>
        </Alert>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="space-y-4 mb-8">
              <div className="flex justify-between">
                <p>Order [ID: {order.id}]</p>
                <p>
                  Status:
                  <Badge className="px-2 py-1 ml-2">{order.status}</Badge>
                </p>
              </div>
              {order.orderItems.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
              <p className="text-lg font-semibold text-right">Total</p>
              <p className="text-lg font-semibold text-right">
                Rs. {order.totalAmount}
              </p>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
