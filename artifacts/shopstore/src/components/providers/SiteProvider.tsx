"use client";

import { useEffect } from "react";
import { useSiteStore } from "@/store/site";

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSiteStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", settings.primaryColor);
    root.style.setProperty("--site-primary", settings.primaryColor);
  }, [settings.primaryColor]);

  return <>{children}</>;
}
