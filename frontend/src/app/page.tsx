"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // شروع Fade-out قبل از ریدایرکت
    setTimeout(() => {
      setFadeOut(true);
    }, 12000); // یک ثانیه قبل از پایان ویدیو

    // ریدایرکت نهایی
    setTimeout(() => {
      router.push("/dashboard");
    }, 8000);
  }, [router]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* ویدیو */}
      <video
        src="/181537-866999852.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover fade-in"
      />

      {/* لایهٔ Fade-out */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
