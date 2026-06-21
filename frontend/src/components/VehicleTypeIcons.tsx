"use client";

import Image from "next/image";

export default function VehicleTypeIcons() {
  const icons = [
    { src: "/Icons/Car-01.png", label: "Kleinwagen" },
    { src: "/Icons/Car-02.png", label: "Limousine" },
    { src: "/Icons/Car-03.png", label: "Cabrio" },
    { src: "/Icons/Car-04.png", label: "Van" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 transition"
        >
          <Image
            src={icon.src}
            alt={icon.label}
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-sm mt-2 text-gray-700">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}
