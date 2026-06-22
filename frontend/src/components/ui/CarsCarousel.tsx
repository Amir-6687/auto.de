"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
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

// ✅ هر آیتم fallback هم یک id ثابت و یکتا دارد
const FALLBACK_CARS = [
  { id: "fallback-1", imageUrl: "/slider/audi-e-tron-GT.jpg", title: "Audi e‑tron GT", price: 89900, description: "Electric performance with luxury comfort.", stats: [{ label: "Range", value: "480 km" }, { label: "Rating", value: "4.9" }] },
  { id: "fallback-2", imageUrl: "/slider/Dacia.webp", title: "Dacia Duster", price: 18500, description: "Reliable and affordable SUV.", stats: [{ label: "Seats", value: 5 }, { label: "Rating", value: "4.2" }] },
  { id: "fallback-3", imageUrl: "/slider/Fiat.jpg", title: "Fiat 500", price: 16900, description: "Compact and stylish city car.", stats: [{ label: "HP", value: 85 }, { label: "Rating", value: "4.3" }] },
  { id: "fallback-4", imageUrl: "/slider/Ford.webp", title: "Ford Electric", price: 42000, description: "Modern electric SUV with great range.", stats: [{ label: "Range", value: "420 km" }, { label: "Rating", value: "4.6" }] },
];

export default function CarsCarousel() {
  const [index, setIndex] = useState(0);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    fetch("/api/admin/featured?section=carousel")
      .then(res => res.json())
      .then((data: Featured[]) => {
        if (data.length > 0) {
          setCars(data.map(f => {
            const car = {
              id: f.carId?._id || (typeof f.carId === 'string' ? f.carId : undefined),
              imageUrl: f.carId?.coverImage || f.carId?.images?.[0] || "",
              title: f.carId?.title || "",
              price: f.carId?.price || 0,
              previousPrice: f.carId?.previousPrice ?? null,
              description: "",
              stats: [
                { label: "Brand", value: f.carId?.brand || "—" },
                { label: "Model", value: f.carId?.model || "—" },
              ],
            };
            return car;
          }));
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

  if (loading) return (
    <div className="h-64 flex items-center justify-center text-white">Loading...</div>
  );

  return (
    <div className="relative mt-10" ref={ref}>
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCars.map((car, i) => (
            <motion.div
              key={car.id || i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PropertyCard
  carId={car.id}
  imageUrl={car.imageUrl}
  title={car.title}
  price={car.price}
  previousPrice={car.previousPrice}
  pricePeriod="€"
  description={car.description}
  stats={car.stats}
  actionLabel="View"
  onActionClick={() => {
    if (car.id) router.push(`/cars/${car.id}`);
  }}
/>
            </motion.div>
          ))}
        </div>

        <button onClick={prev} className="absolute -left-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full hover:bg-black/60 transition">←</button>
        <button onClick={next} className="absolute -right-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full hover:bg-black/60 transition">→</button>
      </div>
    </div>
  );
}