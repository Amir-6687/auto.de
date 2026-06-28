"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/types/car";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

const API_URL = "http://localhost:5000/api";

const FEATURES = [
  "Einparkhilfe","Leichtmetallfelgen","Xenon-/LED-Scheinwerfer",
  "Klimaanlage","Navigationssystem","Radio/Tuner",
  "Bluetooth","Freisprecheinrichtung","Schiebedach/Panoramadach",
  "Sitzheizung","Tempomat","Nichtraucher-Fahrzeug",
  "Antiblockiersystem (ABS)","Scheckheftgepflegt",
];

// ✅ گزینه‌های پیش‌فرض هر فیلد
const BRANDS = ["Audi","BMW","Mercedes-Benz","Volkswagen","Porsche","Toyota","Honda","Hyundai","Kia","Ford","Opel","Renault","Skoda","Seat","Fiat","Peugeot","Citroën","Dacia","Mazda","Nissan","Suzuki","Volvo","Jeep","Mitsubishi","Subaru"];
const CONDITIONS = ["Gebraucht","Neu","Oldtimer","Vorführfahrzeug","Jahreswagen"];
const FUEL_TYPES = ["Benzin","Diesel","Hybrid","Elektro","Erdgas (CNG)","Autogas (LPG)","Wasserstoff"];
const GEARBOXES = ["Schaltgetriebe","Automatik","Halbautomatik"];
const VEHICLE_TYPES = ["Limousine","Kombi","SUV","Van / Minibus","Kleinwagen","Cabrio / Roadster","Coupé","Transporter","Pickup"];
const DOORS = ["2","3","4","5","6+"];
const COLORS = ["Schwarz","Weiß","Grau","Silber","Blau","Rot","Grün","Gelb","Orange","Braun","Beige","Violett","Gold","Bronze"];
const EMISSION_STICKERS = ["1 (Keine Plakette)","2 (Rot)","3 (Gelb)","4 (Grün)"];
const EMISSION_CLASSES = ["Euro 1","Euro 2","Euro 3","Euro 4","Euro 5","Euro 6","Euro 6d","Euro 6d-TEMP"];

// ✅ گزینه‌های HU: ماه‌های آینده تا ۲ سال
const HU_OPTIONS = (() => {
  const opts: string[] = [];
  const now = new Date();
  const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  for (let i = 0; i <= 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    opts.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
  }
  return opts;
})();

// ✅ سال‌های ثبت اول خودرو
const YEAR_OPTIONS = Array.from({ length: 36 }, (_, i) => String(2025 - i));

const inputCls = "p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full";
const labelCls = "block text-xs font-medium text-gray-500 mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

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
    status: "active",
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

  async function createCarWithoutImages() {
    const res = await fetch(`${API_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...car, status: "active" }),
    });
    if (!res.ok) throw new Error("Car creation failed");
    return res.json();
  }

  async function uploadImages() {
    if (images.length === 0) return [];
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.urls || [];
  }

  async function updateCarWithImages(carId: string, urls: string[]) {
    const coverImage = coverIndex !== null ? urls[coverIndex] : urls[0];
    await fetch(`${API_URL}/cars/${carId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: urls, coverImage }),
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const created = await createCarWithoutImages();
      const urls = await uploadImages();
      if (urls?.length > 0) await updateCarWithImages(created._id, urls);
      router.push("/cars");
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-4">

      {/* ── ۱. اطلاعات اصلی ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">📋 Grundinformationen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Titel">
            <input name="title" placeholder="z. B. BMW 3er Touring" value={car.title} onChange={handleChange} className={inputCls} />
          </Field>
          <Field label="Preis (€)">
            <input name="price" type="number" placeholder="z. B. 12500" value={car.price} onChange={handleChange} className={inputCls} />
          </Field>
        </div>
      </section>

      {/* ── ۲. مشخصات خودرو ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">🚗 Fahrzeugdaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <CustomDropdown
            label="Marke"
            options={BRANDS}
            value={car.brand}
            onChange={(v) => setCar((p) => ({ ...p, brand: v }))}
            placeholder="-- Marke wählen --"
          />

          <Field label="Modell">
            <input name="model" placeholder="z. B. 320d xDrive" value={car.model} onChange={handleChange} className={inputCls} />
          </Field>

          <Field label="Kilometerstand (km)">
            <input name="mileage" type="number" placeholder="z. B. 85000" value={car.mileage} onChange={handleChange} className={inputCls} />
          </Field>

          <CustomDropdown
            label="Fahrzeugzustand"
            options={CONDITIONS}
            value={car.condition}
            onChange={(v) => setCar((p) => ({ ...p, condition: v }))}
            placeholder="-- Zustand wählen --"
          />

          <CustomDropdown
            label="Erstzulassung (Jahr)"
            options={YEAR_OPTIONS}
            value={car.firstRegistration}
            onChange={(v) => setCar((p) => ({ ...p, firstRegistration: v }))}
            placeholder="-- Jahr wählen --"
          />

          <CustomDropdown
            label="Kraftstoffart"
            options={FUEL_TYPES}
            value={car.fuelType}
            onChange={(v) => setCar((p) => ({ ...p, fuelType: v }))}
            placeholder="-- Kraftstoff wählen --"
          />

          <Field label="Leistung (PS)">
            <input name="power" type="number" placeholder="z. B. 150" value={car.power} onChange={handleChange} className={inputCls} />
          </Field>

          <CustomDropdown
            label="Getriebe"
            options={GEARBOXES}
            value={car.gearbox}
            onChange={(v) => setCar((p) => ({ ...p, gearbox: v }))}
            placeholder="-- Getriebe wählen --"
          />

          <CustomDropdown
            label="Fahrzeugtyp"
            options={VEHICLE_TYPES}
            value={car.vehicleType}
            onChange={(v) => setCar((p) => ({ ...p, vehicleType: v }))}
            placeholder="-- Typ wählen --"
          />

          <CustomDropdown
            label="Anzahl Türen"
            options={DOORS}
            value={car.doors}
            onChange={(v) => setCar((p) => ({ ...p, doors: v }))}
            placeholder="-- Türen wählen --"
          />

          <CustomDropdown
            label="HU bis"
            options={HU_OPTIONS}
            value={car.huUntil}
            onChange={(v) => setCar((p) => ({ ...p, huUntil: v }))}
            placeholder="-- HU-Datum wählen --"
          />

          <CustomDropdown
            label="Umweltplakette"
            options={EMISSION_STICKERS}
            value={car.emissionSticker}
            onChange={(v) => setCar((p) => ({ ...p, emissionSticker: v }))}
            placeholder="-- Plakette wählen --"
          />

          <CustomDropdown
            label="Schadstoffklasse"
            options={EMISSION_CLASSES}
            value={car.emissionClass}
            onChange={(v) => setCar((p) => ({ ...p, emissionClass: v }))}
            placeholder="-- Euro-Norm wählen --"
          />

          <CustomDropdown
            label="Außenfarbe"
            options={COLORS}
            value={car.color}
            onChange={(v) => setCar((p) => ({ ...p, color: v }))}
            placeholder="-- Farbe wählen --"
          />

        </div>
      </section>

      {/* ── ۳. Ausstattung ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">⚙️ Ausstattung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {FEATURES.map((f) => (
            <label key={f} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                checked={car.features.includes(f)}
                onChange={() => toggleFeature(f)}
                className="accent-blue-600 w-4 h-4"
              />
              {f}
            </label>
          ))}
        </div>
      </section>

      {/* ── ۴. Beschreibung ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">📝 Beschreibung</h3>
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
          placeholder="Fahrzeugbeschreibung, Besonderheiten, Ausstattungsdetails..."
          className={`${inputCls} resize-y`}
          rows={5}
        />
      </section>

      {/* ── ۵. Bilder ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">📷 Bilder hochladen</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img src={URL.createObjectURL(img)} alt="" className="w-full h-24 object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={() => setCoverIndex(i)}
                  className={`absolute bottom-1 left-1 px-2 py-0.5 text-xs rounded-md font-medium transition-colors ${
                    coverIndex === i ? "bg-green-600 text-white" : "bg-black/50 text-white hover:bg-green-500"
                  }`}
                >
                  {coverIndex === i ? "✓ Cover" : "Cover"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Submit ── */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          💾 Speichern
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}