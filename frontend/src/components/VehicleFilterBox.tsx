"use client";

import { useEffect, useState } from "react";

export default function VehicleFilterBox() {
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

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 mt-6">

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3 mb-4">
        <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
          Fahrzeuge
        </button>
      </div>

      {/* آیکون‌ها زیر تب Fahrzeuge */}
      <div className="flex items-center justify-center gap-8 mb-8">

        <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition">
          <img src="/Icons/Car-01.png" className="w-14 h-14" />
          <span className="text-sm mt-2">Kleinwagen</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition">
          <img src="/Icons/Car-02.png" className="w-14 h-14" />
          <span className="text-sm mt-2">Limousine</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition">
          <img src="/Icons/Car-03.png" className="w-14 h-14" />
          <span className="text-sm mt-2">Cabrio</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition">
          <img src="/Icons/Car-04.png" className="w-14 h-14" />
          <span className="text-sm mt-2">Van</span>
        </div>

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
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Suche
        </button>
        <button className="bg-gray-200 px-6 py-3 rounded-lg">
          Detailsuche
        </button>
        <button className="bg-gray-200 px-6 py-3 rounded-lg">
          Neue Suche
        </button>
      </div>
    </div>
  );
}
