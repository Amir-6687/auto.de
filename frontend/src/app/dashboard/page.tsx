"use client";

import HeroSection from "@/components/HeroSection";
import VehicleFilterBox from "@/components/VehicleFilterBox";
import Slideshow from "@/components/ui/slideshow";
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
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/car-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 pt-32 px-4 pb-16">

        {/* ⬇ اسلایدر اینجاست */}
        <Slideshow />

        {/* فاصله بین اسلایدر و Hero */}
        <div className="mt-10">
          <HeroSection />
        </div>

        <div className="mt-10">
          <VehicleFilterBox />
        </div>

      </div>
    </div>
  );
}
