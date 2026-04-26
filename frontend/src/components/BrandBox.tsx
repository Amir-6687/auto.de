"use client";

export default function BrandBox() {
  const brands = [
    { src: "/Icons/audi-logo-png-724.gif", name: "Audi" },
    { src: "/Icons/Dachia-logo.png", name: "Dacia" },
    { src: "/Icons/fiat.png", name: "Fiat" },
    { src: "/Icons/ford.png", name: "Ford" },
    { src: "/Icons/hyundai.png", name: "Hyundai" },
    { src: "/Icons/kia.png", name: "Kia" },
    { src: "/Icons/opel.png", name: "Opel" },
    { src: "/Icons/peugeot.png", name: "Peugeot" },
    { src: "/Icons/seat.png", name: "Seat" },
    { src: "/Icons/skoda.png", name: "Skoda" },
    { src: "/Icons/suzuki.png", name: "Suzuki" },
    { src: "/Icons/vw.png", name: "Volkswagen" },
  ];

  return (
    <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        Unsere beliebtesten Marken
      </h3>

      <div className="grid grid-cols-3 gap-4">
  {brands.map((brand, index) => (
    <button
      key={index}
      className="flex items-center justify-center p-2 hover:opacity-80 transition cursor-pointer"
      onClick={() => console.log("Clicked:", brand.name)}
    >
      <img
        src={brand.src}
        alt={brand.name}
        className="w-14 h-14 object-contain brightness-75"
      />
    </button>
  ))}
</div>

    </div>
  );
}
