"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

const FALLBACK_CATEGORIES = [
  { id: 1, name: "Electronics", slug: "electronics", description: "Latest tech essentials", image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&q=80" },
  { id: 2, name: "Fashion", slug: "fashion", description: "Style that defines you", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 3, name: "Home & Living", slug: "home-living", description: "Comfort meets design", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { id: 4, name: "Fitness", slug: "fitness", description: "Gear for your best self", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { id: 5, name: "Accessories", slug: "accessories", description: "Small things that matter", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80" },
];

interface Props {
  categories: Category[];
}

export function CategoryGrid({ categories }: Props) {
  const displayCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover premium products at unbeatable prices curated for quality, comfort and style.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square mb-3">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">{cat.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
