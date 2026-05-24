"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Upload, Palette, Globe, MessageSquare, Megaphone } from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useSiteStore } from "@/store/site";

interface Props {
  settings: {
    siteName?: string | null; primaryColor?: string | null; announcementText?: string | null;
    announcementEnabled?: boolean | null; whatsappNumber?: string | null;
    telegramUsername?: string | null; instagramUsername?: string | null;
    facebookPageId?: string | null; logoUrl?: string | null;
    heroHeadline?: string | null; heroSubtitle?: string | null; heroImage?: string | null;
    announcementCode?: string | null; announcementDiscount?: number | null;
    siteTagline?: string | null; siteDescription?: string | null;
  } | null;
}

export function AdminSettingsClient({ settings: serverSettings }: Props) {
  const { settings, updateSettings } = useSiteStore();
  const [form, setForm] = useState({
    siteName: serverSettings?.siteName ?? settings.siteName,
    primaryColor: serverSettings?.primaryColor ?? settings.primaryColor,
    announcementText: serverSettings?.announcementText ?? settings.announcementText,
    announcementEnabled: serverSettings?.announcementEnabled ?? settings.announcementEnabled,
    announcementCode: serverSettings?.announcementCode ?? settings.announcementCode,
    announcementDiscount: serverSettings?.announcementDiscount ?? settings.announcementDiscount,
    whatsappNumber: serverSettings?.whatsappNumber ?? settings.whatsappNumber,
    telegramUsername: serverSettings?.telegramUsername ?? settings.telegramUsername,
    instagramUsername: serverSettings?.instagramUsername ?? settings.instagramUsername,
    facebookPageId: serverSettings?.facebookPageId ?? settings.facebookPageId,
    heroHeadline: serverSettings?.heroHeadline ?? settings.heroHeadline,
    heroSubtitle: serverSettings?.heroSubtitle ?? settings.heroSubtitle,
    logoUrl: serverSettings?.logoUrl ?? settings.logoUrl ?? "",
    siteTagline: serverSettings?.siteTagline ?? settings.siteTagline,
    siteDescription: serverSettings?.siteDescription ?? settings.siteDescription,
  });
  const [saving, setSaving] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { setForm((f) => ({ ...f, logoUrl: e.target?.result as string })); };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, multiple: false });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch {}
    updateSettings({ ...form, primaryColor: form.primaryColor, logoUrl: form.logoUrl || null });
    setSaving(false);
    toast.success("Settings saved!");
  };

  const PRESET_COLORS = ["#dc2626", "#2563eb", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#db2777", "#111827"];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Customize your store's appearance and contact details.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Section icon={Globe} title="General" description="Basic store information">
          <Field label="Store Name">
            <input type="text" value={form.siteName} onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </Field>
          <Field label="Tagline">
            <input type="text" value={form.siteTagline ?? ""} onChange={(e) => setForm((f) => ({ ...f, siteTagline: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </Field>
          <Field label="Description">
            <textarea value={form.siteDescription ?? ""} onChange={(e) => setForm((f) => ({ ...f, siteDescription: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" />
          </Field>
          <Field label="Logo">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${isDragActive ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input {...getInputProps()} />
              {form.logoUrl ? (
                <img src={form.logoUrl} alt="Logo" className="h-12 mx-auto object-contain" />
              ) : (
                <>
                  <Upload size={20} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Drop logo here or click to upload</p>
                </>
              )}
            </div>
          </Field>
        </Section>

        <Section icon={Palette} title="Appearance" description="Customize colors and theme">
          <Field label="Primary Color">
            <div className="flex items-center gap-3">
              <input type="color" value={form.primaryColor} onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200 p-1" />
              <input type="text" value={form.primaryColor} onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))} className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none" />
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {PRESET_COLORS.map((color) => (
                <button key={color} type="button" onClick={() => setForm((f) => ({ ...f, primaryColor: color }))} className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${form.primaryColor === color ? "border-gray-900 scale-110" : "border-transparent"}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </Field>
        </Section>

        <Section icon={Megaphone} title="Announcement Bar" description="Top promotional banner">
          <div className="flex items-center gap-3 mb-4">
            <button type="button" onClick={() => setForm((f) => ({ ...f, announcementEnabled: !f.announcementEnabled }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.announcementEnabled ? "bg-gray-900" : "bg-gray-200"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.announcementEnabled ? "translate-x-7" : "translate-x-1"}`} />
            </button>
            <span className="text-sm text-gray-700 font-medium">Enable Announcement Bar</span>
          </div>
          <Field label="Announcement Text">
            <input type="text" value={form.announcementText} onChange={(e) => setForm((f) => ({ ...f, announcementText: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Promo Code">
              <input type="text" value={form.announcementCode} onChange={(e) => setForm((f) => ({ ...f, announcementCode: e.target.value.toUpperCase() }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none" />
            </Field>
            <Field label="Discount (%)">
              <input type="number" min="0" max="100" value={form.announcementDiscount} onChange={(e) => setForm((f) => ({ ...f, announcementDiscount: parseInt(e.target.value) }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </Field>
          </div>
        </Section>

        <Section icon={MessageSquare} title="Contact Channels" description="Messaging platforms for orders">
          {[
            { key: "whatsappNumber", label: "WhatsApp Number", placeholder: "+1234567890" },
            { key: "telegramUsername", label: "Telegram Username", placeholder: "username" },
            { key: "instagramUsername", label: "Instagram Username", placeholder: "username" },
            { key: "facebookPageId", label: "Facebook Page ID", placeholder: "page-id" },
          ].map(({ key, label, placeholder }) => (
            <Field key={key} label={label}>
              <input type="text" value={form[key as keyof typeof form] as string} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </Field>
          ))}
        </Section>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-70" style={{ backgroundColor: form.primaryColor }}>
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ icon: Icon, title, description, children }: { icon: React.ElementType; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-gray-50 rounded-xl"><Icon size={18} className="text-gray-600" /></div>
        <div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
