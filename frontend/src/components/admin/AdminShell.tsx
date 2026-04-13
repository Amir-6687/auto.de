"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/cars", label: "Listings" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <aside className="w-56 shrink-0 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2 bg-white dark:bg-zinc-900">

        {/* TITLE */}
        <div className="font-bold text-lg tracking-tight mb-2">
          Auto.de Admin
        </div>

        {/* BACK TO HOME BUTTON */}
        <Link
          href="/"
          className="rounded-lg px-3 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-zinc-800 dark:text-zinc-200"
        >
          ← Back to Home
        </Link>

        {/* NAVIGATION */}
        {nav.map((n) => {
          const active = path === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-blue-600 text-white font-medium"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {n.label}
            </Link>
          );
        })}

        {/* DARK MODE TOGGLE */}
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          className="mt-auto flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
