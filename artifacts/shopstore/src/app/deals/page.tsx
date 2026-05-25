import { StoreLayout } from "@/components/layout/StoreLayout";
import { DealsPageClient } from "@/components/products/DealsPageClient";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { isNotNull } from "drizzle-orm";

export default async function DealsPage() {
  const dealProducts = await db.query.products.findMany({
    where: isNotNull(products.originalPrice),
    with: { category: true },
  }).catch(() => []);

  return (
    <StoreLayout>
      <DealsPageClient products={dealProducts} />
    </StoreLayout>
  );
}
