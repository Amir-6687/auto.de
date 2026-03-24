"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 12000);

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 13000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/181537-866999852.mp4"
        autoPlay
        muted
        playsInline
        // className="w-full h-full object-cover sm:object-contain fade-in"
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
