"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-[#101828]">
        Admin Dashboard
      </h1>

      <p className="text-gray-700">
        Only authenticated users can access this page.
      </p>
    </div>
  );
}
