"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandBox from "@/components/BrandBox";

// ✅ ۸ نوع خودرو با عکس واقعی (فولدر public/search-car)
const VEHICLE_TYPES = [
  { key: "SUV", label: "SUV & Pick-up", img: "/search-car/SUV___Pick-up-removebg-preview.png" },
  { key: "Limousine", label: "Limousine", img: "/search-car/Limousine-removebg-preview.png" },
  { key: "Kombi", label: "Kombi", img: "/search-car/Kombi-removebg-preview.png" },
  { key: "Kleinwagen", label: "Kleinwagen", img: "/search-car/Kleinwagen-removebg-preview.png" },
  { key: "Van", label: "Van & Kleinbus", img: "/search-car/Van___Kleinbus-removebg-preview.png" },
  { key: "Coupe", label: "Coupé", img: "/search-car/Coupé-removebg-preview.png" },
  { key: "Cabrio", label: "Cabrio", img: "/search-car/Cabrio-removebg-preview.png" },
  { key: "Transporter", label: "Transporter", img: "/search-car/Transporter-removebg-preview.png" },
];

export default function VehicleFilterBox() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    types: [],
    brands: [],
    fuels: [],
    gearboxes: [],
    models: [],
  });

  const [selected, setSelected] = useState({
    type: "",
    brand: "",
    fuel: "",
    gearbox: "",
    model: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/filters")
      .then(res => res.json())
      .then(data => setFilters(data));
  }, []);

  // ✅ کلیک روی هر آیکون نوع خودرو -> مستقیم به /cars با فیلتر اعمال‌شده
  const handleTypeIconClick = (typeKey: string) => {
    router.push(`/cars?type=${encodeURIComponent(typeKey)}`);
  };

  // ✅ دکمه Suche با همه فیلترهای انتخاب‌شده در دراپ‌داون‌ها
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selected.type) params.set("type", selected.type);
    if (selected.brand) params.set("brand", selected.brand);
    if (selected.fuel) params.set("fuel", selected.fuel);
    if (selected.gearbox) params.set("gearbox", selected.gearbox);
    if (selected.model) params.set("model", selected.model);
    router.push(`/cars?${params.toString()}`);
  };

  const handleReset = () => {
    setSelected({ type: "", brand: "", fuel: "", gearbox: "", model: "" });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 mt-6">

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3 mb-4">
      <button
  className="font-semibold pb-1"
  style={{ color: "#171717", fontFamily: "Saira Stencil, sans-serif" }}
>
  Fahrzeuge
</button>


      </div>

      {/* ✅ ۸ آیکون نوع خودرو، کلیک‌پذیر -> فیلتر مستقیم در /cars */}
      <div className="flex items-center justify-start gap-6 mb-6 flex-wrap">
        {VEHICLE_TYPES.map((type) => (
          <button
            key={type.key}
            onClick={() => handleTypeIconClick(type.key)}
            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition group"
          >
            <div className="w-14 h-10 flex items-center justify-center">
              <img
                src={type.img}
                alt={type.label}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs mt-1 text-gray-700">{type.label}</span>
          </button>
        ))}
      </div>


      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Fahrzeugtyp */}
        <select
          className="p-3 rounded-lg border bg-white"
          value={selected.type}
          onChange={(e) => setSelected({ ...selected, type: e.target.value })}
        >
          <option value="">Fahrzeugtyp</option>
          {filters.types.map((t: string) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Fahrzeugmarke */}
        <select
          className="p-3 rounded-lg border bg-white"
          value={selected.brand}
          onChange={(e) => setSelected({ ...selected, brand: e.target.value })}
        >
          <option value="">Fahrzeugmarke</option>
          {filters.brands.map((b: string) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Kraftstoffart */}
        <select
          className="p-3 rounded-lg border bg-white"
          value={selected.fuel}
          onChange={(e) => setSelected({ ...selected, fuel: e.target.value })}
        >
          <option value="">Kraftstoffart</option>
          {filters.fuels.map((f: string) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {/* Getriebeart */}
        <select
          className="p-3 rounded-lg border bg-white"
          value={selected.gearbox}
          onChange={(e) => setSelected({ ...selected, gearbox: e.target.value })}
        >
          <option value="">Getriebeart</option>
          {filters.gearboxes.map((g: string) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Modell */}
        <input
          type="text"
          placeholder="Modell"
          className="p-3 rounded-lg border bg-white"
          value={selected.model}
          onChange={(e) => setSelected({ ...selected, model: e.target.value })}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Suche
        </button>
        <button onClick={handleReset} className="bg-gray-200 px-6 py-3 rounded-lg">
          Neue Suche
        </button>
      </div>
        </div>

        <aside className="w-full lg:w-[360px] shrink-0">
          <BrandBox />
        </aside>
      </div>
    </div>
  );
}