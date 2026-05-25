import { StoreLayout } from "@/components/layout/StoreLayout";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { db } from "@/lib/db";
import { products, categories, siteSettings } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function HomePage() {
  const [featuredProducts, allCategories, settings] = await Promise.all([
    db.query.products.findMany({
      where: eq(products.featured, true),
      with: { category: true },
      limit: 8,
      orderBy: [desc(products.createdAt)],
    }).catch(() => []),
    db.query.categories.findMany().catch(() => []),
    db.query.siteSettings.findFirst().catch(() => null),
  ]);

  return (
    <StoreLayout>
      <Hero settings={settings} />
      <CategoryGrid categories={allCategories} />
      <FeaturedProducts products={featuredProducts} />
      <WhyShopWithUs />
      <Testimonials />
      <NewsletterSection settings={settings} />
    </StoreLayout>
  );
}
