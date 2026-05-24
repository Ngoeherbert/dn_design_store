"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const navItems = [
  { href: "/account", label: "My Profile", icon: User },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>›</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        {pathname !== "/account" && (
          <>
            <span>›</span>
            <span className="text-gray-900 capitalize">{pathname.split("/").pop()?.replace("-", " ")}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {session && (
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 shrink-0">
                    {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                </div>
              </div>
            )}
            <nav className="p-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <item.icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1"
              >
                <LogOut size={17} />
                Log Out
              </button>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
