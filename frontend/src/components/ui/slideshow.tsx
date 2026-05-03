"use client";

import React, { useState } from "react";

const slides = [
  { img: "/slider/audi-e-tron-GT.jpg" },
  { img: "/slider/Dacia.webp" },
  { img: "/slider/Fiat.jpg" },
  { img: "/slider/Ford.webp" },
  { img: "/slider/hyundai.webp" },
  { img: "/slider/Kia.webp" },
  { img: "/slider/opel.webp" },
  { img: "/slider/peugeot.jpg" },
  { img: "/slider/seat.webp" },
  { img: "/slider/skoda.jpg" },
  { img: "/slider/suzuki.webp" },
  { img: "/slider/12.jpg" },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
      >
        →
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 text-white text-lg font-medium">
        0{current + 1} / 0{slides.length}
      </div>
    </div>
  );
}
