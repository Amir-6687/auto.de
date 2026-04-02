"use client";

import { AiOutlineLogin } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 text-white">
      <h1 className="text-2xl font-bold">Auto-DE</h1>

      <ul className="flex gap-6 items-center">
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/cars">Cars</a></li>
        <li><a href="/contact">Contact</a></li>

        {/* 🔥 فقط وقتی لاگین هست → Admin */}
        {isLoggedIn && (
          <li>
            <a href="/admin" className="hover:text-blue-400 transition">
              Admin
            </a>
          </li>
        )}

        {/* 🔥 اگر لاگین نیست → Login Icon */}
        {!isLoggedIn && (
          <li>
            <a
              href="/login"
              className="flex items-center gap-1 text-white hover:text-blue-400 transition"
            >
              <AiOutlineLogin size={22} />
              Login
            </a>
          </li>
        )}

        {/* 🔥 اگر لاگین هست → Logout Icon */}
        {isLoggedIn && (
          <li>
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
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
