"use client";

import { useRef, useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { motion } from "motion/react";
import { useNavbar } from "@/context/NavbarContext";
import { useFavorites } from "@/context/FavoritesContext";
import { signOut, useSession } from "next-auth/react";
import { LuSearch } from "react-icons/lu";
import { Combobox } from "./ui/combobox";

const STAFF_ROLES = new Set(["admin", "moderator", "super_admin"]);

function Navbar() {
  const { hidden } = useNavbar();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const role = session?.user?.role;
  const showAdmin = !!role && STAFF_ROLES.has(role);

  const { flyTarget, bump, count } = useFavorites();

  const [showSearch, setShowSearch] = useState(false);

  // ✅ اینجا مهمه: تایپ دقیق ref
  const centerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node; // ✅ cast برای TS

      if (centerRef.current && !centerRef.current.contains(target)) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

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
      <div className="absolute left-1/2 -translate-x-1/2" ref={centerRef}>
        <div className="flex items-center gap-8 px-10 py-4 rounded-2xl backdrop-blur-xl bg-neutral-900/30 border border-white/20 shadow-lg text-white">
          {showSearch ? (
            <div className="w-[520px] max-w-full">
            <Combobox
  placeholder="Search..."
  value=""
  onChange={() => {}}
  size="small"
  errored
>

                <Combobox.Input />
                <Combobox.List>
                  <Combobox.Option value="audi">Audi</Combobox.Option>
                  <Combobox.Option value="bmw">BMW</Combobox.Option>
                  <Combobox.Option value="kia">Kia</Combobox.Option>
                </Combobox.List>
              </Combobox>
            </div>
          ) : (
            <>
              <a href="/dashboard" className="hover:text-gray-300 transition">Home</a>
              <a href="/cars" className="hover:text-gray-300 transition">Cars</a>
              <a href="/contact" className="hover:text-gray-300 transition">Contact</a>

              {showAdmin && (
                <a href="/admin" className="hover:text-blue-400 transition">
                  Admin
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {/* LOGIN / LOGOUT RIGHT */}
      <div className="flex items-center gap-4 pr-6">
        <button
          className="text-white hover:text-blue-400 transition"
          onClick={() => setShowSearch(!showSearch)}
        >
          <LuSearch size={22} />
        </button>

        {/* ✅ آیکون قلب علاقه‌مندی‌ها — مقصد انیمیشن پرواز */}
        <a
          href="/favorites"
          className="relative text-white hover:text-red-400 transition"
        >
          <div ref={flyTarget}>
            <motion.div
              animate={bump ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <FaHeart size={20} />
            </motion.div>
          </div>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold"
            >
              {count}
            </motion.span>
          )}
        </a>

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