"use client";

import { useEffect, useState } from "react";

type Settings = {
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  themePrimary?: string;
  themeAccent?: string;
  footerText?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export default function AdminSettingsPage() {
  const [s, setS] = useState<Settings>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setS);
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Site settings</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Branding and contact info (stored in MongoDB).
        </p>
      </div>

      <form onSubmit={save} className="space-y-4">
        {[
          ["logoUrl", "Logo URL"],
          ["contactEmail", "Contact email"],
          ["contactPhone", "Phone"],
          ["themePrimary", "Primary color (hex)"],
          ["themeAccent", "Accent color (hex)"],
          ["footerText", "Footer text"],
          ["metaTitle", "Meta title"],
          ["metaDescription", "Meta description"],
        ].map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">{label}</span>
            <input
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
              value={(s as Record<string, string>)[key] || ""}
              onChange={(e) =>
                setS((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </label>
        ))}

        <button
          type="submit"
          className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium"
        >
          Save
        </button>
        {saved ? (
          <span className="text-sm text-green-600 ml-2">Saved.</span>
        ) : null}
      </form>
    </div>
  );
}
