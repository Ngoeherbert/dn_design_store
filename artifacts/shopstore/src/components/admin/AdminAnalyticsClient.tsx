"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { useSiteStore } from "@/store/site";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 42, visitors: 1200 },
  { month: "Feb", revenue: 5800, orders: 58, visitors: 1580 },
  { month: "Mar", revenue: 3900, orders: 39, visitors: 1100 },
  { month: "Apr", revenue: 7200, orders: 72, visitors: 2100 },
  { month: "May", revenue: 6100, orders: 61, visitors: 1800 },
  { month: "Jun", revenue: 8500, orders: 85, visitors: 2500 },
  { month: "Jul", revenue: 9200, orders: 92, visitors: 2700 },
  { month: "Aug", revenue: 7800, orders: 78, visitors: 2300 },
  { month: "Sep", revenue: 10500, orders: 105, visitors: 3100 },
  { month: "Oct", revenue: 11200, orders: 112, visitors: 3300 },
  { month: "Nov", revenue: 13800, orders: 138, visitors: 4200 },
  { month: "Dec", revenue: 16500, orders: 165, visitors: 5000 },
];

const topProducts = [
  { name: "Smart Fitness Watch", sales: 142, revenue: 21158 },
  { name: "Noise Cancelling Headphones", sales: 98, revenue: 22442 },
  { name: "Premium T-Shirt", sales: 234, revenue: 9126 },
  { name: "Game Controller", sales: 87, revenue: 6873 },
  { name: "Diamond Necklace", sales: 45, revenue: 8505 },
];

const conversionData = [
  { name: "Visitors", value: 12400, color: "#e2e8f0" },
  { name: "Viewed Products", value: 6800, color: "#93c5fd" },
  { name: "Added to Cart", value: 2100, color: "#60a5fa" },
  { name: "Checkout", value: 850, color: "#3b82f6" },
  { name: "Ordered", value: 620, color: "#1d4ed8" },
];

const channelData = [
  { name: "WhatsApp", value: 42, color: "#22c55e" },
  { name: "Telegram", value: 28, color: "#3b82f6" },
  { name: "Instagram", value: 20, color: "#ec4899" },
  { name: "Facebook", value: 10, color: "#1d4ed8" },
];

export function AdminAnalyticsClient() {
  const { settings } = useSiteStore();

  const kpis = [
    { label: "Total Revenue", value: "$104,700", change: "+23.5%", icon: DollarSign, color: "bg-red-50 text-red-600" },
    { label: "Total Orders", value: "1,037", change: "+18.2%", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Unique Visitors", value: "28,850", change: "+32.1%", icon: Users, color: "bg-green-50 text-green-600" },
    { label: "Avg. Order Value", value: "$101", change: "+4.7%", icon: TrendingUp, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Store performance overview — last 12 months</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`p-2.5 rounded-xl w-fit mb-3 ${kpi.color}`}><kpi.icon size={18} /></div>
            <p className="text-2xl font-black text-gray-900">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.label}</p>
            <p className="text-xs text-green-600 font-semibold mt-1">{kpi.change} vs last year</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Revenue & Orders</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={settings.primaryColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={settings.primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v, name) => [name === "revenue" ? `$${v.toLocaleString()}` : v, name === "revenue" ? "Revenue" : "Orders"]} contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }} />
              <Area type="monotone" dataKey="revenue" stroke={settings.primaryColor} strokeWidth={2.5} fill="url(#grad1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9" }} />
              <Bar dataKey="orders" fill={settings.primaryColor} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Top Products by Revenue</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-5">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{p.name}</span>
                    <span className="text-sm font-bold text-gray-900">${p.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(p.revenue / topProducts[0].revenue) * 100}%`, backgroundColor: settings.primaryColor }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{p.sales} units sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Order Channels</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                {channelData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {channelData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-gray-600">{c.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
