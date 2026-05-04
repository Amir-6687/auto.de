"use client";

import HeroSection from "@/components/HeroSection";
import VehicleFilterBox from "@/components/VehicleFilterBox";
import Slideshow from "@/components/ui/slideshow";
import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";
import { PropertyCard } from "@/components/ui/card-4";
import CarsCarousel from "@/components/ui/CarsCarousel";



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

      <div className="relative z-10 pt-48 px-4 pb-16">

  <div className="max-w-6xl mx-auto">
    <Slideshow />
  </div>

  <div className="mt-10">
    <HeroSection />
  </div>
  <CarsCarousel />
  <div className="mt-20 mb-16 text-center">
  <h2 className="text-2xl sm:text-3xl font-semibold text-white">
    Our Top Car Recommendations This Week
  </h2>
</div>

{/* Cards Section */}
<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
  <PropertyCard
    imageUrl="/slider/audi-e-tron-GT.jpg"
    title="Audi e‑tron GT"
    price={120}
    pricePeriod="per day"
    description="Electric performance with luxury comfort."
    stats={[
      { label: "Range", value: "480km" },
      { label: "Rating", value: "4.9" },
    ]}
    actionLabel="View"
  />

  <PropertyCard
    imageUrl="/slider/Kia.webp"
    title="Kia Stinger"
    price={95}
    pricePeriod="per day"
    description="Sporty design and powerful driving."
    stats={[
      { label: "HP", value: "365" },
      { label: "Rating", value: "4.8" },
    ]}
    actionLabel="View"
  />

  <PropertyCard
    imageUrl="/slider/skoda.jpg"
    title="Skoda Kodiaq"
    price={80}
    pricePeriod="per day"
    description="Spacious SUV with modern features."
    stats={[
      { label: "Seats", value: 7 },
      { label: "Rating", value: "4.7" },
    ]}
    actionLabel="View"
  />

  <PropertyCard
    imageUrl="/slider/peugeot.jpg"
    title="Peugeot 3008"
    price={75}
    pricePeriod="per day"
    description="Elegant crossover with premium interior."
    stats={[
      { label: "Hybrid", value: "Yes" },
      { label: "Rating", value: "4.6" },
    ]}
    actionLabel="View"
  />
</div>

  <div className="mt-10">
    <VehicleFilterBox />
  </div>

</div>


    </div>
  );
}
