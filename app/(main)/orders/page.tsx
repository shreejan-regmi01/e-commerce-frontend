import { getOrders } from "@/services/order.service";
import { OrderItem } from "./OrderItem";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="space-y-4">
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
            </div>
          ))}
          <Separator />
        </div>
      </div>
    </div>
  );
}
