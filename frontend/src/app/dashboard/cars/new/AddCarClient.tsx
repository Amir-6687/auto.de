"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/types/car";

const API_URL = "http://localhost:5000/api";

const FEATURES = [
  "Einparkhilfe",
  "Leichtmetallfelgen",
  "Xenon-/LED-Scheinwerfer",
  "Klimaanlage",
  "Navigationssystem",
  "Radio/Tuner",
  "Bluetooth",
  "Freisprecheinrichtung",
  "Schiebedach/Panoramadach",
  "Sitzheizung",
  "Tempomat",
  "Nichtraucher-Fahrzeug",
  "Antiblockiersystem (ABS)",
  "Scheckheftgepflegt",
];

export default function AddCarClient() {
  const router = useRouter();

  const [car, setCar] = useState<Car>({
    title: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    mileage: "",
    condition: "",
    firstRegistration: "",
    fuelType: "",
    power: "",
    gearbox: "",
    vehicleType: "",
    doors: "",
    huUntil: "",
    emissionSticker: "",
    emissionClass: "",
    color: "",
    features: [],
    images: [],
    coverImage: null,
  });

  const [images, setImages] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setCar((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  // -------------------------------
  // 1) ساخت آگهی بدون عکس
  // -------------------------------
  async function createCarWithoutImages() {
    const res = await fetch(`${API_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });

    if (!res.ok) throw new Error("Car creation failed");

    return res.json();
  }

  // -------------------------------
  // 2) آپلود عکس‌ها
  // -------------------------------
  async function uploadImages() {
    if (images.length === 0) return [];

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.urls;
  }

  // -------------------------------
  // 3) آپدیت آگهی با عکس‌ها + کاور
  // -------------------------------
  async function updateCarWithImages(carId: string, urls: string[]) {
    const coverImage = coverIndex !== null ? urls[coverIndex] : urls[0];

    await fetch(`${API_URL}/cars/${carId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: urls,
        coverImage,
      }),
    });
  }

  // -------------------------------
  // 4) Submit نهایی
  // -------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // مرحله ۱: ساخت آگهی بدون عکس
      const created = await createCarWithoutImages();

      // مرحله ۲: آپلود عکس‌ها
      const urls = await uploadImages();

      // مرحله ۳: آپدیت آگهی با عکس‌ها + کاور
      if (urls.length > 0) {
        await updateCarWithImages(created._id, urls);
      }

      router.push("/dashboard/cars");
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* عنوان و قیمت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Titel"
          value={car.title}
          onChange={handleChange}
          className="p-2 border rounded bg-gray-200 text-black"
        />
        <input
          name="price"
          placeholder="Preis (€)"
          value={car.price}
          onChange={handleChange}
          className="p-2 border rounded bg-gray-200 text-black"
        />
      </div>

      {/* Marke / Modell / Kilometerstand */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="brand" placeholder="Marke" value={car.brand} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="model" placeholder="Modell" value={car.model} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="mileage" placeholder="Kilometerstand" value={car.mileage} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="condition" placeholder="Fahrzeugzustand" value={car.condition} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="firstRegistration" placeholder="Erstzulassung" value={car.firstRegistration} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="fuelType" placeholder="Kraftstoffart" value={car.fuelType} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="power" placeholder="Leistung (PS)" value={car.power} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="gearbox" placeholder="Getriebe" value={car.gearbox} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="vehicleType" placeholder="Fahrzeugtyp" value={car.vehicleType} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="doors" placeholder="Anzahl Türen" value={car.doors} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="huUntil" placeholder="HU bis" value={car.huUntil} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="emissionSticker" placeholder="Umweltplakette" value={car.emissionSticker} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="emissionClass" placeholder="Schadstoffklasse" value={car.emissionClass} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="color" placeholder="Außenfarbe" value={car.color} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-2">Ausstattung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {FEATURES.map((f, index) => (
            <label key={index} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={car.features.includes(f)} onChange={() => toggleFeature(f)} />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Beschreibung */}
      <div>
        <h3 className="font-semibold mb-2">Beschreibung</h3>
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-200 text-black"
          rows={5}
        />
      </div>

      {/* Upload Images */}
      <div>
        <h3 className="font-semibold mb-2">Bilder hochladen</h3>
        <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files || []))} />

        {/* انتخاب کاور */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => setCoverIndex(i)}
                  className={`absolute bottom-1 left-1 px-2 py-1 text-xs rounded ${
                    coverIndex === i ? "bg-green-600 text-white" : "bg-black/50 text-white"
                  }`}
                >
                  Cover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Speichern
      </button>
    </form>
  );
}
