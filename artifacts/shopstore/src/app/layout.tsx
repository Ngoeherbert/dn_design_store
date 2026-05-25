import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SiteProvider } from "@/components/providers/SiteProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DN Design Store - Big Deals. Bigger Savings.",
  description: "Discover premium products at unbeatable prices curated for quality, comfort and style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteProvider>
          {children}
          <Toaster position="top-right" richColors />
        </SiteProvider>
      </body>
    </html>
  );
}
