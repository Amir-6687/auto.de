"use client";

import HeroSection from "@/components/HeroSection";
import VehicleFilterBox from "@/components/VehicleFilterBox";
import Slideshow from "@/components/ui/slideshow";
import { useEffect, useState } from "react";
import { useNavbar } from "@/context/NavbarContext";
import { PropertyCard } from "@/components/ui/card-4";
import CarsCarousel from "@/components/ui/CarsCarousel";
import { useRouter } from "next/navigation";

type Car = {
  _id: string;
  title: string;
  brand?: string;
  model?: string;
  price?: number;
  coverImage?: string;
  images?: string[];
  mileage?: number;
  fuelType?: string;
  power?: number;
  vehicleType?: string;
  color?: string;
};

type Featured = {
  _id: string;
  carId: Car;
  section: string;
};

// fallback اگه ادمین top4 انتخاب نکرده — ✅ هر آیتم id ثابت و یکتا دارد
const FALLBACK_TOP4 = [
  { id: "fallback-top-1", imageUrl: "/slider/audi-e-tron-GT.jpg", title: "Audi e‑tron GT", price: 89900, description: "Electric performance with luxury comfort.", stats: [{ label: "Range", value: "480 km" }, { label: "Rating", value: "4.9" }] },
  { id: "fallback-top-2", imageUrl: "/slider/Kia.webp", title: "Kia Stinger", price: 42500, description: "Sporty design and powerful driving.", stats: [{ label: "HP", value: "365" }, { label: "Rating", value: "4.8" }] },
  { id: "fallback-top-3", imageUrl: "/slider/skoda.jpg", title: "Skoda Kodiaq", price: 38900, description: "Spacious SUV with modern features.", stats: [{ label: "Seats", value: 7 }, { label: "Rating", value: "4.7" }] },
  { id: "fallback-top-4", imageUrl: "/slider/peugeot.jpg", title: "Peugeot 3008", price: 35600, description: "Elegant crossover with premium interior.", stats: [{ label: "Hybrid", value: "Yes" }, { label: "Rating", value: "4.6" }] },
];

export default function Dashboard() {
  const { setHidden } = useNavbar();
  const [top4, setTop4] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setHidden(false);
    return () => setHidden(false);
  }, []);

  useEffect(() => {
    fetch("/api/admin/featured?section=top4")
      .then(res => res.json())
      .then((data: Featured[]) => {
        if (data.length > 0) {
          setTop4(data.map(f => ({
            id: f.carId._id,  // ✅
            imageUrl: f.carId.coverImage || f.carId.images?.[0] || "",
            title: f.carId.title,
            price: f.carId.price || 0,
            previousPrice: f.carId.previousPrice ?? null,
            showPreviousPrice: f.carId.showPreviousPrice ?? false,
            description: "",
            stats: [
              { label: "Brand", value: f.carId.brand || "—" },
              { label: "Model", value: f.carId.model || "—" },
            ],
          })));
        } else {
          setTop4(FALLBACK_TOP4);
        }
      })
      .catch(() => setTop4(FALLBACK_TOP4));
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
          <VehicleFilterBox />
        </div>

        <div className="mt-10">
          <HeroSection />
        </div>

        <CarsCarousel />

        <div className="mt-20 mb-16 text-center">
          <h2
            style={{ fontFamily: "'Rubik Dirt', system-ui", fontWeight: 400 }}
            className="text-4xl sm:text-5xl text-white"
          >
            Our Top Car Recommendations This Week
          </h2>
        </div>

        {/* Top 4 Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {top4.map((car) => (
  <PropertyCard
    key={car.id}
    carId={car.id}
    imageUrl={car.imageUrl}
    title={car.title}
    price={car.price}
    previousPrice={car.previousPrice}
    showPreviousPrice={car.showPreviousPrice}
    pricePeriod="€"
    description={car.description}
    stats={car.stats}
    actionLabel="View"
    onActionClick={() => car.id && router.push(`/cars/${car.id}`)}  // ✅
  />
))}
        </div>

      </div>
    </div>
  );
}