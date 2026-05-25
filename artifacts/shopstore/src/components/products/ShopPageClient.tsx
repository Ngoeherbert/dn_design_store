"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useSiteStore } from "@/store/site";
import { StoreBreadcrumb } from "@/components/ui/StoreBreadcrumb";

interface Category {
  id: number;
  name: string;
  slug: string;
}

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
  category?: Category | null;
  categoryId?: number | null;
}

const DEMO_PRODUCTS: Product[] = [
  { id: 1, name: "Smart Fitness Watch", slug: "smart-fitness-watch", price: "149.00", originalPrice: "199.00", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"], badge: "25% OFF", trending: false, featured: true, stock: 10, category: { id: 1, name: "Electronics", slug: "electronics" } },
  { id: 2, name: "Noise Cancelling Headphones", slug: "noise-cancelling-headphones", price: "229.00", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"], badge: null, trending: true, featured: true, stock: 5, category: { id: 1, name: "Electronics", slug: "electronics" } },
  { id: 3, name: "Premium Cotton T-Shirt", slug: "premium-cotton-tshirt", price: "39.00", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"], badge: null, trending: false, featured: true, stock: 20, category: { id: 2, name: "Fashion", slug: "fashion" } },
  { id: 4, name: "Wireless Game Controller", slug: "wireless-game-controller", price: "79.00", originalPrice: "99.00", images: ["https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&q=80"], badge: null, trending: false, featured: true, stock: 8, category: { id: 1, name: "Electronics", slug: "electronics" } },
  { id: 5, name: "Modern Bed Frame", slug: "modern-bed-frame", price: "499.00", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"], badge: null, trending: false, featured: true, stock: 3, category: { id: 3, name: "Home & Living", slug: "home-living" } },
  { id: 6, name: "Diamond Necklace Set", slug: "diamond-necklace-set", price: "189.00", images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80"], badge: null, trending: true, featured: true, stock: 12, category: { id: 5, name: "Accessories", slug: "accessories" } },
  { id: 7, name: "Adjustable Dumbbells", slug: "adjustable-dumbbells", price: "129.00", images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80"], badge: null, trending: false, featured: true, stock: 6, category: { id: 4, name: "Fitness", slug: "fitness" } },
  { id: 8, name: "Slim Fit Jeans", slug: "slim-fit-jeans", price: "59.00", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80"], badge: null, trending: true, featured: true, stock: 15, category: { id: 2, name: "Fashion", slug: "fashion" } },
];

const DEMO_CATEGORIES: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Fashion", slug: "fashion" },
  { id: 3, name: "Home & Living", slug: "home-living" },
  { id: 4, name: "Fitness", slug: "fitness" },
  { id: 5, name: "Accessories", slug: "accessories" },
];

interface Props {
  products: Product[];
  categories: Category[];
  searchQuery?: string;
  categoryFilter?: string;
}

export function ShopPageClient({ products: serverProducts, categories: serverCategories, searchQuery: initialSearch, categoryFilter: initialCategory }: Props) {
  const displayProducts = serverProducts.length > 0 ? serverProducts : DEMO_PRODUCTS;
  const displayCategories = serverCategories.length > 0 ? serverCategories : DEMO_CATEGORIES;

  const [search, setSearch] = useState(initialSearch ?? "");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "all");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { settings } = useSiteStore();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: displayProducts.length };
    displayProducts.forEach((p) => {
      if (p.category) {
        counts[p.category.slug] = (counts[p.category.slug] ?? 0) + 1;
      }
    });
    return counts;
  }, [displayProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...displayProducts];
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category?.slug === selectedCategory);
    }
    if (sortBy === "price-asc") result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortBy === "price-desc") result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    else if (sortBy === "newest") result.reverse();
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  }, [displayProducts, search, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <StoreBreadcrumb items={[{ label: "Shop", href: "/shop" }, { label: selectedCategory !== "all" ? (displayCategories.find(c => c.slug === selectedCategory)?.name ?? "Products") : "All Products" }]} />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">All Products</h1>
            <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="mb-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">CATEGORY</p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === "all" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <span>All Products</span>
                  <span className="text-xs opacity-70">{categoryCounts.all}</span>
                </button>
              </li>
              {displayCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? "bg-gray-900 text-white font-medium" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-70">{categoryCounts[cat.slug] ?? 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found</p>
              <button onClick={() => { setSearch(""); setSelectedCategory("all"); }} className="mt-4 text-sm text-red-600 underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
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
                      stock={product.stock ?? 0}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">CATEGORY</p>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => { setSelectedCategory("all"); setMobileFiltersOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "all" ? "bg-gray-900 text-white" : "text-gray-700"}`}>All Products</button>
                </li>
                {displayCategories.map((cat) => (
                  <li key={cat.id}>
                    <button onClick={() => { setSelectedCategory(cat.slug); setMobileFiltersOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedCategory === cat.slug ? "bg-gray-900 text-white font-medium" : "text-gray-600"}`}>{cat.name}</button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
