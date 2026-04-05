"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavbar } from "@/context/NavbarContext";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);
  const { setHidden } = useNavbar();

  useEffect(() => {
    // مخفی کردن Navbar هنگام نمایش انیمیشن
    setHidden(true);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 12000);

    const redirectTimer = setTimeout(() => {
      // قبل از رفتن به dashboard، Navbar را دوباره نمایش بده
      setHidden(false);
      router.push("/dashboard");
    }, 8500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
      setHidden(false); // اگر کاربر صفحه را ترک کرد، Navbar را برگردان
    };
  }, [router, setHidden]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/181537-866999852.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover sm:object-contain fade-in"
      />

      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
