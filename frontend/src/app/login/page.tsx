"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoBackground from "@/components/ui/video-background";
import { User, Lock, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl: "/admin",
    });
    if (res?.error) {
      alert("Wrong password");
      return;
    }
    router.push("/admin");
  }

  return (
    <main className="relative w-screen h-screen bg-black">
      {/* 🔥 ویدیو پس‌زمینه */}
      <VideoBackground />

      {/* 🔥 فرم شیشه‌ای */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-300">Sign in to continue</p>
          </div>

          {/* Email */}
          <div className="relative z-0">
            <input
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <User className="inline-block mr-2 -mt-1" size={16} />
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative z-0">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <Lock className="inline-block mr-2 -mt-1" size={16} />
              Password
            </label>
          </div>

          <button
            type="submit"
            className="group w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all"
          >
            Sign In
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400/30"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-gray-400/30"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 px-4 bg-white/90 hover:bg-white rounded-lg text-gray-700 font-semibold transition-all"
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
          >
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-400">
  Don't have an account?{" "}
  <a
    href="/signup"
    className="font-semibold text-blue-400 hover:text-blue-300 transition"
  >
    Sign Up
  </a>
</p>

        </form>
      </div>
    </main>
  );
}
