"use client";

import HeroSection from "@/components/HeroSection";
import VehicleFilterBox from "@/components/VehicleFilterBox";
import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";
import BrandBox from "@/components/BrandBox";


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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 pt-32 px-4">
        {/* Hero Section (Search Box داخلش هست) */}
        <HeroSection />

        {/* فاصله بین سرچ و فیلتر */}
        <div className="mt-10">
          <VehicleFilterBox />
          <BrandBox />
        </div>
      </div>
    </div>
  );
}
