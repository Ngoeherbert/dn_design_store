"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { useSiteStore } from "@/store/site";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice?: string | null;
  images: string[] | null;
  badge?: string | null;
  trending?: boolean | null;
  featured?: boolean | null;
  stock?: number | null;
  category?: { name: string } | null;
}

const DEMO_PRODUCTS: Product[] = [
  { id: 1, name: "Smart Fitness Watch", slug: "smart-fitness-watch", price: "149.00", originalPrice: "199.00", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"], badge: "25% OFF", trending: false, featured: true, stock: 10, category: { name: "Electronics" } },
  { id: 2, name: "Noise Cancelling Headphones", slug: "noise-cancelling-headphones", price: "229.00", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"], badge: null, trending: true, featured: true, stock: 5, category: { name: "Electronics" } },
  { id: 3, name: "Premium Cotton T-Shirt", slug: "premium-cotton-tshirt", price: "39.00", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"], badge: null, trending: false, featured: true, stock: 20, category: { name: "Fashion" } },
  { id: 4, name: "Wireless Game Controller", slug: "wireless-game-controller", price: "79.00", originalPrice: "99.00", images: ["https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&q=80"], badge: null, trending: false, featured: true, stock: 8, category: { name: "Electronics" } },
  { id: 5, name: "Modern Bed Frame", slug: "modern-bed-frame", price: "499.00", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"], badge: null, trending: false, featured: true, stock: 3, category: { name: "Home & Living" } },
  { id: 6, name: "Diamond Necklace Set", slug: "diamond-necklace-set", price: "189.00", images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80"], badge: null, trending: true, featured: true, stock: 12, category: { name: "Accessories" } },
  { id: 7, name: "Adjustable Dumbbells", slug: "adjustable-dumbbells", price: "129.00", images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80"], badge: null, trending: false, featured: true, stock: 6, category: { name: "Fitness" } },
  { id: 8, name: "Slim Fit Jeans", slug: "slim-fit-jeans", price: "59.00", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80"], badge: null, trending: true, featured: true, stock: 15, category: { name: "Fashion" } },
];

interface Props {
  products: Product[];
}

export function FeaturedProducts({ products }: Props) {
  const { settings } = useSiteStore();
  const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Handpicked favorites you'll love</p>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: settings.primaryColor }}
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={parseFloat(product.price)}
                originalPrice={product.originalPrice ? parseFloat(product.originalPrice) : null}
                images={(product.images as string[]) ?? []}
                category={product.category?.name}
                badge={product.badge}
                trending={product.trending ?? false}
                featured={product.featured ?? false}
                stock={product.stock ?? 0}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium"
            style={{ backgroundColor: settings.primaryColor }}
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
