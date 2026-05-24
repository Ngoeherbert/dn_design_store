import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { db } from "@/lib/db";
import { products, orders, user, analyticsEvents, categories } from "@/lib/db/schema";
import { sql, desc } from "drizzle-orm";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, userCount, recentOrders, categoryCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(products).catch(() => [{ count: 0 }]),
    db.select({ count: sql<number>`count(*)` }).from(orders).catch(() => [{ count: 0 }]),
    db.select({ count: sql<number>`count(*)` }).from(user).catch(() => [{ count: 0 }]),
    db.query.orders.findMany({ with: { items: true }, limit: 5, orderBy: [desc(orders.createdAt)] }).catch(() => []),
    db.select({ count: sql<number>`count(*)` }).from(categories).catch(() => [{ count: 0 }]),
  ]);

  return (
    <AdminDashboardClient
      stats={{
        products: Number(productCount[0]?.count ?? 0),
        orders: Number(orderCount[0]?.count ?? 0),
        users: Number(userCount[0]?.count ?? 0),
        categories: Number(categoryCount[0]?.count ?? 0),
        revenue: recentOrders.reduce((sum, o) => sum + parseFloat(o.total), 0),
      }}
      recentOrders={recentOrders}
    />
  );
}
