"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/lib/api";

const MODELS_BY_BRAND: Record<string, string[]> = {
  Audi: [
    "A1",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "Q2",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "TT",
    "R8",
    "S3",
    "S5",
    "SQ5",
    "RS3",
    "RS6 Avant",
    "RS7",
    "Q4 e-tron",
    "e-tron GT",
    "Q8 e-tron",
  ],
  // در آینده می‌تونی برای BMW، Mercedes و ... هم اضافه کنی
};

export default function CarsPage() {
  const [cars, setCars] = useState<any[]>([]);

  const [sortOpen, setSortOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const sortRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<HTMLDivElement | null>(null);

  // دریافت خودروها از API
  useEffect(() => {
    fetch(`${API_URL}/cars`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, []);

  // بستن همه Accordion ها با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (sortRef.current && !sortRef.current.contains(target)) {
        setSortOpen(false);
      }

      if (brandRef.current && !brandRef.current.contains(target)) {
        setBrandOpen(false);
      }

      if (modelRef.current && !modelRef.current.contains(target)) {
        setModelOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModels =
    selectedBrand && MODELS_BY_BRAND[selectedBrand]
      ? MODELS_BY_BRAND[selectedBrand]
      : [];

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* ستون چپ — فیلترها */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-32">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Sortierung */}
          <div className="mb-6" ref={sortRef}>
            <button
              className="w-full flex justify-between items-center p-3 border rounded-lg font-medium"
              onClick={() => setSortOpen(!sortOpen)}
            >
              Sortierung
              <span>{sortOpen ? "▲" : "▼"}</span>
            </button>

            {sortOpen && (
              <div className="mt-3 border rounded-lg p-3 bg-gray-50 max-h-60 overflow-y-auto space-y-3">
                <button className="w-full text-left hover:text-blue-600">
                  Preis aufsteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Preis absteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Kilometer aufsteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Kilometer absteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Erstzulassung aufsteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Erstzulassung absteigend
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Alphabetisch A–Z
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Alphabetisch Z–A
                </button>
              </div>
            )}
          </div>

          {/* Marken (انتخاب برند) */}
          <div className="mb-6" ref={brandRef}>
            <button
              className="w-full flex justify-between items-center p-3 border rounded-lg font-medium"
              onClick={() => setBrandOpen(!brandOpen)}
            >
              Marken
              <span>{brandOpen ? "▲" : "▼"}</span>
            </button>

            {brandOpen && (
              <div className="mt-3 border rounded-lg p-3 bg-gray-50 max-h-60 overflow-y-auto space-y-3">
                <button
                  className="w-full text-left hover:text-blue-600"
                  onClick={() => {
                    setSelectedBrand("Audi");
                    setSelectedModel(null);
                    setModelOpen(true);
                  }}
                >
                  Audi
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  BMW
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Mercedes-Benz
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Volkswagen
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Porsche
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Toyota
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Honda
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Hyundai
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Kia
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Ford
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Opel
                </button>
                <button className="w-full text-left hover:text-blue-600">
                  Renault
                </button>
              </div>
            )}
          </div>

          {/* Modelle — وابسته به برند انتخاب‌شده */}
          <div className="mb-6" ref={modelRef}>
            <button
              className="w-full flex justify-between items-center p-3 border rounded-lg font-medium disabled:opacity-50"
              onClick={() => {
                if (selectedBrand) setModelOpen(!modelOpen);
              }}
              disabled={!selectedBrand}
            >
              Modelle
              <span>{modelOpen ? "▲" : "▼"}</span>
            </button>

            {modelOpen && (
              <div className="mt-3 border rounded-lg p-3 bg-gray-50 max-h-60 overflow-y-auto space-y-3">
                {selectedBrand && currentModels.length > 0 ? (
                  currentModels.map((model) => (
                    <button
                      key={model}
                      className={`w-full text-left hover:text-blue-600 ${
                        selectedModel === model ? "text-blue-700 font-semibold" : ""
                      }`}
                      onClick={() => setSelectedModel(model)}
                    >
                      {model}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Bitte zuerst eine Marke auswählen.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* قیمت */}
          <div className="mb-6">
            <label className="font-medium">Max Price (€)</label>
            <input
              type="number"
              className="w-full mt-2 p-2 border rounded-lg"
              placeholder="e.g. 20000"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Apply Filters
          </button>
        </div>

        {/* ستون راست — لیست خودروها */}
        <div className="lg:col-span-3 space-y-8">
          {cars.length === 0 && (
            <p className="text-gray-600 text-lg">No cars found!</p>
          )}

          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              {car.images?.length > 0 && (
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full md:w-64 h-48 object-cover"
                />
              )}

              <div className="p-6 flex-1">
                <h3 className="text-2xl font-semibold">{car.title}</h3>

                <p className="text-lg text-blue-600 font-bold mt-2">
                  €{car.price}
                </p>

                <p className="text-gray-600 mt-3">{car.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                  <p>
                    <strong>Mileage:</strong> {car.mileage} km
                  </p>
                  <p>
                    <strong>Fuel:</strong> {car.fuelType}
                  </p>
                  <p>
                    <strong>Gearbox:</strong> {car.gearbox}
                  </p>
                  <p>
                    <strong>Year:</strong> {car.firstRegistration}
                  </p>
                </div>

                <a
                  href={`/cars/${car._id}`}
                  className="inline-block mt-5 bg-black text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
