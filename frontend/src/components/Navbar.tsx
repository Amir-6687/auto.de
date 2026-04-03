"use client";

import { AiOutlineLogin } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import Image from "next/image";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);
  }, []);

  return (
    <nav className="fixed top-6 left-0 w-full z-50 flex items-center justify-between px-2">
      
      {/* 🔥 LOGO LEFT */}
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/logo-02.png"
            alt="Auto-DE Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </a>
      </div>

      {/* 🔥 GLASS MENU CENTER */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-8 px-10 py-4 rounded-2xl backdrop-blur-xl bg-neutral-900/30 border border-white/20 shadow-lg text-white">
          <a href="/dashboard" className="hover:text-gray-300 transition">Home</a>
          <a href="/cars" className="hover:text-gray-300 transition">Cars</a>
          <a href="/contact" className="hover:text-gray-300 transition">Contact</a>

          {isLoggedIn && (
            <a href="/admin" className="hover:text-blue-400 transition">
              Admin
            </a>
          )}
        </div>
      </div>

      {/* 🔥 LOGIN / LOGOUT RIGHT */}
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <a
            href="/login"
            className="flex items-center gap-1 text-white hover:text-blue-400 transition"
          >
            <AiOutlineLogin size={22} />
            Login
          </a>
        )}

        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
            className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
          >
            <IoMdLogOut size={24} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
