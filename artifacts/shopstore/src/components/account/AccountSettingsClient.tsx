"use client";

import { useState } from "react";
import { Lock, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AccountSettingsClient() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) { toast.error("Passwords don't match"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Password updated!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
      <p className="text-gray-500 text-sm mb-8">Manage your security preferences and notifications.</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gray-50 rounded-xl">
            <Shield size={20} className="text-gray-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Security</h2>
            <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Current Password", value: currentPw, onChange: setCurrentPw },
            { label: "New Password", value: newPw, onChange: setNewPw },
            { label: "Confirm New Password", value: confirmPw, onChange: setConfirmPw },
          ].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70">
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
