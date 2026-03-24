"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // مسیر مقصد
    }, 5000); // 5 ثانیه

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <video
        src="/181537-866999852.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
