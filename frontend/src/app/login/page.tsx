"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
    e.preventDefault();

    if (password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          placeholder="Enter admin password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
