import { StoreLayout } from "@/components/layout/StoreLayout";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { db } from "@/lib/db";

export default async function CategoriesPage() {
  const allCategories = await db.query.categories.findMany().catch(() => []);
  return (
    <StoreLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-10">All Categories</h1>
        <CategoryGrid categories={allCategories} />
      </div>
    </StoreLayout>
  );
}
