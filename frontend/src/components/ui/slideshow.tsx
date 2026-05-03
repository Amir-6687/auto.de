"use client";

import React, { useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    text: ["BETWEEN SHADOW", "AND LIGHT"],
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    text: ["SILENCE SPEAKS", "THROUGH FORM"],
  },
  {
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    text: ["ESSENCE BEYOND", "PERCEPTION"],
  },
  {
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    text: ["TRUTH IN", "EMPTINESS"],
  },
  {
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    text: ["SURRENDER TO", "THE VOID"],
  },
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
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-4xl font-bold tracking-tight space-y-2">
            {slide.text.map((t, j) => (
              <span key={j}>{t}</span>
            ))}
          </div>
        </div>
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
