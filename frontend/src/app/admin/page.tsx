"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [router, status]);

  if (status === "loading") {
    return (
      <div className="p-6">
        <p className="text-gray-700">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-[#101828]">Admin Dashboard</h1>
      <p className="text-gray-700">Only authenticated users can access this page.</p>

      {/* 🔥 دکمه‌های مدیریت */}
      <div className="space-y-3">
        <a
          href="/admin/cars/new"
          className="block bg-blue-600 text-white px-4 py-2 rounded w-fit"
        >
          ➕ Add New Car
        </a>

        <a
          href="/cars"
          className="block bg-gray-800 text-white px-4 py-2 rounded w-fit"
        >
          🚗 View All Cars
        </a>

        <a
          href="/admin/cars"
          className="block bg-green-700 text-white px-4 py-2 rounded w-fit"
        >
          🛠 Manage Cars (Edit/Delete)
        </a>
      </div>
    </div>
  );
}
