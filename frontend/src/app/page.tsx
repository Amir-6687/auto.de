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
      setHidden(false);
      router.push("/dashboard");
    }, 13000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
      setHidden(false);
    };
  }, [router, setHidden]);

  // 🔥 کلیک روی کل صفحه → Skip فوری
  const skipIntro = () => {
    setFadeOut(true);
    setHidden(false);
    router.push("/dashboard");
  };

  return (
    <div
      onClick={skipIntro}
      className="relative w-full h-screen bg-black overflow-hidden cursor-pointer"
    >
      <video
        src="/181537-866999852.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover sm:object-contain fade-in"
      />

      {/* افکت fade-out */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
