"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/ui/card-4";

type Car = {
  _id: string;
  title: string;
  brand?: string;
  model?: string;
  price?: number;
  coverImage?: string;
  images?: string[];
  description?: string;
  power?: number;
  vehicleType?: string;
  color?: string;
  mileage?: number;
  fuelType?: string;
};

type Featured = {
  _id: string;
  carId: Car;
  section: string;
  order: number;
};

// fallback اگه ادمین هنوز چیزی انتخاب نکرده
const FALLBACK_CARS = [
  { imageUrl: "/slider/audi-e-tron-GT.jpg", title: "Audi e‑tron GT", price: 89900, description: "Electric performance with luxury comfort.", stats: [{ label: "Range", value: "480 km" }, { label: "Rating", value: "4.9" }] },
  { imageUrl: "/slider/Dacia.webp", title: "Dacia Duster", price: 18500, description: "Reliable and affordable SUV.", stats: [{ label: "Seats", value: 5 }, { label: "Rating", value: "4.2" }] },
  { imageUrl: "/slider/Fiat.jpg", title: "Fiat 500", price: 16900, description: "Compact and stylish city car.", stats: [{ label: "HP", value: 85 }, { label: "Rating", value: "4.3" }] },
  { imageUrl: "/slider/Ford.webp", title: "Ford Electric", price: 42000, description: "Modern electric SUV with great range.", stats: [{ label: "Range", value: "420 km" }, { label: "Rating", value: "4.6" }] },
];

export default function CarsCarousel() {
  const [index, setIndex] = useState(0);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/featured?section=carousel")
      .then(res => res.json())
      .then((data: Featured[]) => {
        if (data.length > 0) {
          setCars(data.map(f => ({
            imageUrl: f.carId.coverImage || f.carId.images?.[0] || "",
            title: f.carId.title,
            price: f.carId.price || 0,
            description: "",
            stats: [
              { label: "Brand", value: f.carId.brand || "—" },
              { label: "Model", value: f.carId.model || "—" },
            ],
          })));
        } else {
          setCars(FALLBACK_CARS);
        }
      })
      .catch(() => setCars(FALLBACK_CARS))
      .finally(() => setLoading(false));
  }, []);

  const next = () => { if (index < cars.length - 4) setIndex(index + 1); };
  const prev = () => { if (index > 0) setIndex(index - 1); };
  const visibleCars = cars.slice(index, index + 4);

  if (loading) return <div className="h-64 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="relative mt-10">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
          {visibleCars.map((car, i) => (
            <PropertyCard
              key={i}
              imageUrl={car.imageUrl}
              title={car.title}
              price={car.price}
              pricePeriod="€"
              description={car.description}
              stats={car.stats}
              actionLabel="View"
            />
          ))}
        </div>

        <button onClick={prev} className="absolute -left-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full">←</button>
        <button onClick={next} className="absolute -right-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full">→</button>
      </div>
    </div>
  );
}