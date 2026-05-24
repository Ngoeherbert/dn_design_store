import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  announcementText: string;
  announcementEnabled: boolean;
  announcementCode: string;
  announcementDiscount: number;
  whatsappNumber: string;
  telegramUsername: string;
  instagramUsername: string;
  facebookPageId: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string | null;
}

interface SiteStore {
  settings: SiteSettings;
  dismissedAnnouncement: boolean;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  dismissAnnouncement: () => void;
  resetAnnouncement: () => void;
}

const defaultSettings: SiteSettings = {
  siteName: "DN Design Store",
  siteTagline: "Big Deals. Bigger Savings.",
  siteDescription: "Discover premium products at unbeatable prices curated for quality, comfort and style.",
  logoUrl: null,
  primaryColor: "#dc2626",
  secondaryColor: "#111827",
  announcementText: "Claim 10% off on orders with code SAVE10 - Limited time only!",
  announcementEnabled: true,
  announcementCode: "SAVE10",
  announcementDiscount: 10,
  whatsappNumber: "+1234567890",
  telegramUsername: "shopstore",
  instagramUsername: "shopstore",
  facebookPageId: "shopstore",
  heroHeadline: "Big Deals.\nBigger Savings.",
  heroSubtitle: "Discover premium products at unbeatable prices curated for quality, comfort and style.",
  heroImage: null,
};

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      dismissedAnnouncement: false,

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      dismissAnnouncement: () => set({ dismissedAnnouncement: true }),
      resetAnnouncement: () => set({ dismissedAnnouncement: false }),
    }),
    {
      name: "site-settings",
      partialStateFixer: undefined,
    }
  )
);
