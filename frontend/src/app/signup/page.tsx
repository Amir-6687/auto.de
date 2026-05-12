"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoBackground from "@/components/ui/video-background";
import { User, Lock, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
// برای signup یکی دیگه هم:
const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // بعد از signup مستقیم login کن
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        // حتی اگه login fail شد، به login page بفرست
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative w-screen h-screen bg-black">
      <VideoBackground />

      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-sm text-gray-300">Sign up to continue</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="relative z-0">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <User className="inline-block mr-2 -mt-1" size={16} />
              Full Name (optional)
            </label>
          </div>

          {/* Email */}
          <div className="relative z-0">
            <input
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 peer"
              placeholder=" "
              required
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
    type={showPassword ? "text" : "password"}
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
  {/* ← دکمه چشم */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-0 top-2.5 text-gray-400 hover:text-white transition"
  >
    {showPassword ? <PiEyeSlashLight size={20} /> : <PiEyeLight size={20} />}
  </button>
</div>

          {/* Repeat Password */}
          <div className="relative z-0">
            <input
              type={showRepeatPassword ? "text" : "password"}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 peer"
              placeholder=" "
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
    type="button"
    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
    className="absolute right-0 top-2.5 text-gray-400 hover:text-white transition"
  >
    {showRepeatPassword ? <PiEyeSlashLight size={20} /> : <PiEyeLight size={20} />}
  </button>
            <label className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <Lock className="inline-block mr-2 -mt-1" size={16} />
              Repeat Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg text-white font-semibold transition-all"
          >
            {loading ? "Creating account..." : "Sign Up"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400/30"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-gray-400/30"></div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-white/90 hover:bg-white rounded-lg text-gray-700 font-semibold transition-all"
          >
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}