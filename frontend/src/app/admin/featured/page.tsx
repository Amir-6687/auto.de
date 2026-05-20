"use client";

import { useCallback, useEffect, useState } from "react";

type Car = {
  _id: string;
  title: string;
  brand?: string;
  model?: string;
  price?: number;
  coverImage?: string;
  images?: string[];
};

type Featured = {
  _id: string;
  carId: Car;
  section: "carousel" | "top4";
  order: number;
};

export default function AdminFeaturedPage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [carousel, setCarousel] = useState<Featured[]>([]);
  const [top4, setTop4] = useState<Featured[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [carsRes, featuredRes] = await Promise.all([
      fetch("/api/admin/cars?limit=100"),
      fetch("/api/admin/featured"),
    ]);
    const carsData = await carsRes.json();
    const featuredData = await featuredRes.json();

    setAllCars(carsData.cars || []);
    setCarousel(featuredData.filter((f: Featured) => f.section === "carousel"));
    setTop4(featuredData.filter((f: Featured) => f.section === "top4"));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addToSection(carId: string, section: "carousel" | "top4") {
    const res = await fetch("/api/admin/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carId, section }),
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    load();
  }

  async function removeFromSection(id: string) {
    await fetch(`/api/admin/featured/${id}`, { method: "DELETE" });
    load();
  }

  const filteredCars = allCars.filter(car => {
    const q = search.toLowerCase();
    return (
      car.title?.toLowerCase().includes(q) ||
      car.brand?.toLowerCase().includes(q) ||
      car.model?.toLowerCase().includes(q)
    );
  });

  const SectionList = ({ items, section, max }: { items: Featured[], section: string, max: number }) => (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-sm text-zinc-500 py-4 text-center border border-dashed rounded-lg">
          Noch keine Fahrzeuge hinzugefügt
        </p>
      )}
      {items.map((f) => (
        <div key={f._id} className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
          {f.carId.coverImage || f.carId.images?.[0] ? (
            <img src={f.carId.coverImage || f.carId.images?.[0]} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
          ) : (
            <div className="w-16 h-12 bg-zinc-200 rounded-lg flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{f.carId.title}</p>
            {f.carId.price && (
              <p className="text-xs text-zinc-500">{Number(f.carId.price).toLocaleString("de-DE")} €</p>
            )}
          </div>
          <button
            onClick={() => removeFromSection(f._id)}
            className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-200 hover:border-red-400 transition"
          >
            Entfernen
          </button>
        </div>
      ))}
      <p className="text-xs text-zinc-400 text-right">{items.length} / {max}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Featured Cars</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Wählen Sie Fahrzeuge aus, die auf der Startseite angezeigt werden.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carousel */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
          <h2 className="font-semibold mb-3">🎠 Carousel <span className="text-xs text-zinc-400">(max 12)</span></h2>
          <SectionList items={carousel} section="carousel" max={12} />
        </div>

        {/* Top 4 */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
          <h2 className="font-semibold mb-3">⭐ Top 4 <span className="text-xs text-zinc-400">(max 4)</span></h2>
          <SectionList items={top4} section="top4" max={4} />
        </div>
      </div>

      {/* Alle Fahrzeuge */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <h2 className="font-semibold mb-3">Alle Fahrzeuge</h2>
        <input
          placeholder="Suche nach Name, Marke oder Modell..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800"
        />

        {loading ? (
          <p className="text-sm text-zinc-500">Wird geladen...</p>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredCars.map(car => {
              const inCarousel = carousel.some(f => f.carId._id === car._id);
              const inTop4 = top4.some(f => f.carId._id === car._id);
              return (
                <div key={car._id} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                  {car.coverImage || car.images?.[0] ? (
                    <img src={car.coverImage || car.images?.[0]} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-12 bg-zinc-200 rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{car.title}</p>
                    {car.price && (
                      <p className="text-xs text-zinc-500">{Number(car.price).toLocaleString("de-DE")} €</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => addToSection(car._id, "carousel")}
                      disabled={inCarousel || carousel.length >= 12}
                      className={`text-xs px-2 py-1 rounded border transition ${
                        inCarousel
                          ? "bg-blue-100 text-blue-600 border-blue-200 cursor-default"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50"
                      } disabled:opacity-40`}
                    >
                      {inCarousel ? "✓ Carousel" : "+ Carousel"}
                    </button>
                    <button
                      onClick={() => addToSection(car._id, "top4")}
                      disabled={inTop4 || top4.length >= 4}
                      className={`text-xs px-2 py-1 rounded border transition ${
                        inTop4
                          ? "bg-amber-100 text-amber-600 border-amber-200 cursor-default"
                          : "border-amber-300 text-amber-600 hover:bg-amber-50"
                      } disabled:opacity-40`}
                    >
                      {inTop4 ? "✓ Top 4" : "+ Top 4"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}