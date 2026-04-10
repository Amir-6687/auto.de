"use client";

import { AiOutlineLogin } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import Image from "next/image";
import { useNavbar } from "@/context/NavbarContext";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { hidden } = useNavbar();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <nav
      className={`fixed top-6 left-0 w-full z-50 flex items-center justify-between px-2 transition-all duration-300
        ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* LOGO LEFT */}
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/4.png"
            alt="Auto-DE Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </a>
      </div>

      {/* GLASS MENU CENTER */}
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

      {/* LOGIN / LOGOUT RIGHT */}
      <div className="flex items-center gap-4 pr-6">
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
            onClick={() => signOut({ callbackUrl: "/" })}
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
