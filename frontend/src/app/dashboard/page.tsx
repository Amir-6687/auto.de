"use client";

import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function Dashboard() {
  const { setHidden } = useNavbar();

  useEffect(() => {
    setHidden(false);
    return () => setHidden(false);
  }, []);

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/car-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  );
}
