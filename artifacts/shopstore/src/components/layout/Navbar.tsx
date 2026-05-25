"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { useSiteStore } from "@/store/site";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemCount = useCartStore((s) => s.getItemCount());
  const { settings } = useSiteStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteName} className="h-9 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {settings.siteName.slice(0, 2).toLowerCase()}
                  </div>
                  <span className="font-semibold text-lg text-gray-900">
                    {settings.siteName.split(" ")[0].toLowerCase()}
                  </span>
                </div>
              )}
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </Link>

              {session ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/account"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Account
                  </Link>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                      style={{ backgroundColor: settings.secondaryColor ?? "#111827" }}
                    >
                      Admin
                    </Link>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}

              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-gray-700 py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t flex flex-col gap-2">
                  {session ? (
                    <>
                      <Link href="/account" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Account</Link>
                      {session.user.role === "admin" && (
                        <Link href="/admin" className="text-sm font-medium text-white py-2 px-4 rounded-lg text-center" style={{ backgroundColor: settings.secondaryColor ?? "#111827" }} onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>
                      )}
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Login</Link>
                      <Link href="/register" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Register</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": settings.primaryColor } as React.CSSProperties}
                />
                <button
                  type="submit"
                  className="text-white px-5 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
