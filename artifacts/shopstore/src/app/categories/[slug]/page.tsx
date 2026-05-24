import { notFound } from "next/navigation";
import { StoreLayout } from "@/components/layout/StoreLayout";
import { ShopPageClient } from "@/components/products/ShopPageClient";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ slug: string }>;
}

const FALLBACK_CATEGORIES = [
  { id: 1, name: "Electronics", slug: "electronics", description: "Latest tech essentials", image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=1200&q=80" },
  { id: 2, name: "Fashion", slug: "fashion", description: "Style that defines you", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { id: 3, name: "Home & Living", slug: "home-living", description: "Comfort meets design", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80" },
  { id: 4, name: "Fitness", slug: "fitness", description: "Gear for your best self", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80" },
  { id: 5, name: "Accessories", slug: "accessories", description: "Small things that matter", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=80" },
];

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  }).catch(() => null);

  const fallbackCat = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
  const displayCategory = category ?? fallbackCat;

  if (!displayCategory) notFound();

  const categoryProducts = category
    ? await db.query.products.findMany({
        where: eq(products.categoryId, category.id),
        with: { category: true },
      }).catch(() => [])
    : [];

  return (
    <StoreLayout>
      <div className="relative h-52 overflow-hidden bg-gray-900">
        {(displayCategory as any).image && (
          <img
            src={(displayCategory as any).image}
            alt={displayCategory.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl font-black text-white">{displayCategory.name}</h1>
            {displayCategory.description && (
              <p className="text-white/80 mt-2">{displayCategory.description}</p>
            )}
          </div>
        </div>
      </div>
      <ShopPageClient products={categoryProducts} categories={[]} categoryFilter={slug} />
    </StoreLayout>
  );
}
