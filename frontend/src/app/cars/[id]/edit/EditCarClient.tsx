"use client";

import { useEffect, useState } from "react";
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

export default function EditCarClient({ id }: { id: string }) {
  const router = useRouter();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const [newImages, setNewImages] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // -------------------------------
  // 1) دریافت اطلاعات اولیه آگهی
  // -------------------------------
  useEffect(() => {
    async function loadCar() {
      const res = await fetch(`${API_URL}/cars/${id}`);
      const data = await res.json();
      setCar(data);
      setCoverImage(data.coverImage);
      setLoading(false);
    }
    loadCar();
  }, [id]);

  if (loading || !car) return <p>Loading...</p>;

  // -------------------------------
  // تغییر فیلدهای فرم
  // -------------------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCar((prev: any) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setCar((prev: any) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f: string) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  // -------------------------------
  // آپلود عکس‌های جدید
  // -------------------------------
  async function uploadNewImages() {
    if (newImages.length === 0) return [];

    const formData = new FormData();
    newImages.forEach((img) => formData.append("images", img));

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.urls;
  }

  // -------------------------------
  // حذف عکس قدیمی
  // -------------------------------
  const removeOldImage = (url: string) => {
    setCar((prev: any) => ({
      ...prev,
      images: prev.images.filter((img: string) => img !== url),
    }));

    if (coverImage === url) {
      setCoverImage(null);
    }
  };

  // -------------------------------
  // Submit نهایی
  // -------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 1) آپلود عکس‌های جدید
    const newUrls = await uploadNewImages();

    // 2) ترکیب عکس‌های قدیمی + جدید
    const finalImages = [...car.images, ...newUrls];

    // 3) انتخاب کاور
    const finalCover =
      coverImage ||
      (finalImages.length > 0 ? finalImages[0] : null);

    // 4) ارسال PUT
    await fetch(`${API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...car,
        images: finalImages,
        coverImage: finalCover,
      }),
    });

    router.push("/dashboard/cars");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
    <h1 className="text-xl font-bold text-[#101828]">Edit Car</h1>


      {/* Title + Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={car.title}
          onChange={handleChange}
          className="p-2 border rounded bg-gray-200 text-black"
        />
        <input
          name="price"
          value={car.price}
          onChange={handleChange}
          className="p-2 border rounded bg-gray-200 text-black"
        />
      </div>

      {/* Brand / Model / Mileage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="brand" value={car.brand} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="model" value={car.model} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="mileage" value={car.mileage} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="condition" value={car.condition} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="firstRegistration" value={car.firstRegistration} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="fuelType" value={car.fuelType} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="power" value={car.power} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="gearbox" value={car.gearbox} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="vehicleType" value={car.vehicleType} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="doors" value={car.doors} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="huUntil" value={car.huUntil} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="emissionSticker" value={car.emissionSticker} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="emissionClass" value={car.emissionClass} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
        <input name="color" value={car.color} onChange={handleChange} className="p-2 border rounded bg-gray-200 text-black" />
      </div>

      {/* Features */}
      <div>
      <h3 className="font-semibold mb-2 text-[#101828]">Ausstattung</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {FEATURES.map((f) => (
  <label key={f} className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={car.features.includes(f)}
      onChange={() => toggleFeature(f)}
    />
    <span className="text-[#101828]">{f}</span>
  </label>
))}

        </div>
      </div>

      {/* Description */}
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

      {/* Old Images */}
      <div>
        <h3 className="font-semibold mb-2">Vorhandene Bilder</h3>

        <div className="grid grid-cols-3 gap-2">
          {car.images.map((url) => (
            <div key={url} className="relative">
              <img src={url} className="w-full h-24 object-cover rounded" />

              <button
                type="button"
                onClick={() => setCoverImage(url)}
                className={`absolute bottom-1 left-1 px-2 py-1 text-xs rounded ${
                  coverImage === url ? "bg-green-600 text-white" : "bg-black/50 text-white"
                }`}
              >
                Cover
              </button>

              <button
                type="button"
                onClick={() => removeOldImage(url)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload New Images */}
      <div>
        <h3 className="font-semibold mb-2 text-[#101828]">Neue Bilder hochladen</h3>
        <input type="file" multiple onChange={(e) => setNewImages(Array.from(e.target.files || []))} />

        {newImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {newImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded" />

                <button
                  type="button"
                  onClick={() => setCoverImage(URL.createObjectURL(img))}
                  className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded"
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
