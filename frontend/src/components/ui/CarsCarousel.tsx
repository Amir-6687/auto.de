"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/ui/card-4";

const cars = [
  {
    imageUrl: "/slider/audi-e-tron-GT.jpg",
    title: "Audi e‑tron GT",
    price: 120,
    description: "Electric performance with luxury comfort.",
    stats: [
      { label: "Range", value: "480km" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    imageUrl: "/slider/Dacia.webp",
    title: "Dacia Duster",
    price: 45,
    description: "Reliable and affordable SUV.",
    stats: [
      { label: "Seats", value: 5 },
      { label: "Rating", value: "4.2" },
    ],
  },
  {
    imageUrl: "/slider/Fiat.jpg",
    title: "Fiat 500",
    price: 40,
    description: "Compact and stylish city car.",
    stats: [
      { label: "HP", value: 85 },
      { label: "Rating", value: "4.3" },
    ],
  },
  {
    imageUrl: "/slider/Ford.webp",
    title: "Ford Electric",
    price: 90,
    description: "Modern electric SUV with great range.",
    stats: [
      { label: "Range", value: "420km" },
      { label: "Rating", value: "4.6" },
    ],
  },
  {
    imageUrl: "/slider/hyundai.webp",
    title: "Hyundai i40",
    price: 70,
    description: "Comfortable family car with great efficiency.",
    stats: [
      { label: "Seats", value: 5 },
      { label: "Rating", value: "4.5" },
    ],
  },
  {
    imageUrl: "/slider/Kia.webp",
    title: "Kia Stinger",
    price: 95,
    description: "Sporty design and powerful driving.",
    stats: [
      { label: "HP", value: 365 },
      { label: "Rating", value: "4.8" },
    ],
  },
  {
    imageUrl: "/slider/opel.webp",
    title: "Opel Mokka-e",
    price: 85,
    description: "Electric compact SUV with modern design.",
    stats: [
      { label: "Range", value: "350km" },
      { label: "Rating", value: "4.4" },
    ],
  },
  {
    imageUrl: "/slider/peugeot.jpg",
    title: "Peugeot 3008",
    price: 75,
    description: "Elegant crossover with premium interior.",
    stats: [
      { label: "Hybrid", value: "Yes" },
      { label: "Rating", value: "4.6" },
    ],
  },
  {
    imageUrl: "/slider/seat.webp",
    title: "Seat Arona",
    price: 65,
    description: "Compact SUV with sporty handling.",
    stats: [
      { label: "Seats", value: 5 },
      { label: "Rating", value: "4.4" },
    ],
  },
  {
    imageUrl: "/slider/skoda.jpg",
    title: "Skoda Kodiaq",
    price: 80,
    description: "Spacious SUV with modern features.",
    stats: [
      { label: "Seats", value: 7 },
      { label: "Rating", value: "4.7" },
    ],
  },
  {
    imageUrl: "/slider/suzuki.webp",
    title: "Suzuki Swift",
    price: 50,
    description: "Lightweight and efficient city car.",
    stats: [
      { label: "HP", value: 110 },
      { label: "Rating", value: "4.3" },
    ],
  },
  {
    imageUrl: "/slider/vw.jpg",
    title: "Volkswagen Taigo",
    price: 85,
    description: "Modern crossover with efficient engines.",
    stats: [
      { label: "HP", value: 150 },
      { label: "Rating", value: "4.5" },
    ],
  },
];

export default function CarsCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => {
      if (index === cars.length - 4) return; // آخرین اسلاید ممکن
      setIndex(index + 1);
    };
    
    const prev = () => {
      if (index === 0) return; // اولین اسلاید
      setIndex(index - 1);
    };
    

  const start = index * 4;
  const visibleCars = cars.slice(index, index + 4);


  return (
    <div className="relative mt-10">
  
      {/* Container to center cards and add left/right spacing */}
      <div className="max-w-6xl mx-auto relative">
  
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
          {visibleCars.map((car, i) => (
            <PropertyCard
              key={i}
              imageUrl={car.imageUrl}
              title={car.title}
              price={car.price}
              pricePeriod="per day"
              description={car.description}
              stats={car.stats}
              actionLabel="View"
            />
          ))}
        </div>
  
        {/* Controls */}
        <button
  onClick={prev}
  className="absolute -left-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full"
>
  ←
</button>

<button
  onClick={next}
  className="absolute -right-20 top-1/2 -translate-y-1/2 text-white text-4xl z-50 bg-black/40 px-4 py-2 rounded-full"
>
  →
</button>

  
      </div>
    </div>
  );
  
}
