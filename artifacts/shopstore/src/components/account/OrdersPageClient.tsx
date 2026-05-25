"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const DEMO_ORDERS = [
  {
    id: 1,
    orderNumber: "ORD-892471",
    createdAt: new Date("2025-03-20"),
    total: "149.00",
    status: "processing",
    items: [
      { id: 1, productName: "Smart Fitness Watch", productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", price: "149.00", quantity: 1 },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-783291",
    createdAt: new Date("2025-02-15"),
    total: "458.00",
    status: "delivered",
    items: [
      { id: 2, productName: "Noise Cancelling Headphones", productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100", price: "229.00", quantity: 2 },
    ],
  },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, className: "bg-yellow-50 text-yellow-700" },
  processing: { label: "Processing", icon: Package, className: "bg-blue-50 text-blue-700" },
  shipped: { label: "Shipped", icon: Truck, className: "bg-purple-50 text-purple-700" },
  delivered: { label: "Delivered", icon: CheckCircle, className: "bg-green-50 text-green-700" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-50 text-red-700" },
};

export function OrdersPageClient() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
      <p className="text-gray-500 text-sm mb-8">Check the status of recent orders, manage returns, and discover similar products.</p>

      {DEMO_ORDERS.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link href="/shop" className="mt-4 inline-block text-sm font-medium text-gray-900 underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {DEMO_ORDERS.map((order, i) => {
            const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending;
            const StatusIcon = statusConfig.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Order Placed</p>
                      <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Total</p>
                      <p className="font-medium text-gray-900">{formatPrice(parseFloat(order.total))}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Order Number</p>
                      <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    View Details
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {status === "processing" ? "Preparing for shipment" : statusConfig.label}
                  </p>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig.className}`}>
                    <StatusIcon size={12} />
                    {statusConfig.label.toUpperCase()}
                  </span>
                </div>

                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.productName}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × {formatPrice(parseFloat(item.price))}</p>
                      <button className="text-xs text-gray-500 underline mt-1">View item</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
