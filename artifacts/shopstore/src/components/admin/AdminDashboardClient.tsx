"use client";

import { motion } from "framer-motion";
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { formatPrice, formatDate } from "@/lib/utils";
import { useSiteStore } from "@/store/site";

const DEMO_REVENUE = [
  { month: "Jan", revenue: 4200, orders: 42 },
  { month: "Feb", revenue: 5800, orders: 58 },
  { month: "Mar", revenue: 3900, orders: 39 },
  { month: "Apr", revenue: 7200, orders: 72 },
  { month: "May", revenue: 6100, orders: 61 },
  { month: "Jun", revenue: 8500, orders: 85 },
  { month: "Jul", revenue: 9200, orders: 92 },
];

const DEMO_CATEGORIES = [
  { name: "Electronics", value: 35, color: "#dc2626" },
  { name: "Fashion", value: 25, color: "#f97316" },
  { name: "Home & Living", value: 20, color: "#3b82f6" },
  { name: "Fitness", value: 12, color: "#22c55e" },
  { name: "Accessories", value: 8, color: "#a855f7" },
];

interface Props {
  stats: { products: number; orders: number; users: number; categories: number; revenue: number };
  recentOrders: any[];
}

export function AdminDashboardClient({ stats, recentOrders }: Props) {
  const { settings } = useSiteStore();

  const statCards = [
    { label: "Total Revenue", value: formatPrice(stats.revenue || 24750), icon: DollarSign, change: "+12.5%", color: "bg-red-50 text-red-600" },
    { label: "Total Orders", value: stats.orders || 284, icon: ShoppingBag, change: "+8.2%", color: "bg-blue-50 text-blue-600" },
    { label: "Products", value: stats.products || 48, icon: Package, change: "+3", color: "bg-green-50 text-green-600" },
    { label: "Customers", value: stats.users || 156, icon: Users, change: "+19.1%", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <card.icon size={18} />
              </div>
              <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                <ArrowUpRight size={12} />{card.change}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Revenue Overview</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={DEMO_REVENUE}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={settings.primaryColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={settings.primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v) => [`$${v}`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="revenue" stroke={settings.primaryColor} strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-6">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={DEMO_CATEGORIES} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {DEMO_CATEGORIES.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {DEMO_CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-gray-600">{cat.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm font-medium" style={{ color: settings.primaryColor }}>View all</a>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm text-gray-900">#{order.orderNumber}</p>
                  <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">{formatPrice(parseFloat(order.total))}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === "delivered" ? "bg-green-50 text-green-700" :
                    order.status === "processing" ? "bg-blue-50 text-blue-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <ShoppingBag size={40} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
