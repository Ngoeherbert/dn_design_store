import { notFound } from "next/navigation";
import { StoreLayout } from "@/components/layout/StoreLayout";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { db } from "@/lib/db";
import { products, siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ slug: string }>;
}

const DEMO_PRODUCT = {
  id: 1,
  name: "Smart Fitness Watch",
  slug: "smart-fitness-watch",
  description: "Track your fitness goals with this premium smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis and a stunning AMOLED display. Water-resistant up to 50 meters with 7-day battery life.",
  price: "149.00",
  originalPrice: "199.00",
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
  ],
  badge: "25% OFF",
  trending: false,
  featured: true,
  stock: 10,
  tags: ["smartwatch", "fitness", "electronics"],
  category: { id: 1, name: "Electronics", slug: "electronics" },
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.query.products
    .findFirst({
      where: eq(products.slug, slug),
      with: { category: true },
    })
    .catch(() => null);

  const settings = await db.query.siteSettings.findFirst().catch(() => null);

  const displayProduct = product ?? (slug === DEMO_PRODUCT.slug ? DEMO_PRODUCT : null);

  if (!displayProduct) {
    notFound();
  }

  return (
    <StoreLayout>
      <ProductDetailClient product={displayProduct as typeof DEMO_PRODUCT} settings={settings} />
    </StoreLayout>
  );
}
