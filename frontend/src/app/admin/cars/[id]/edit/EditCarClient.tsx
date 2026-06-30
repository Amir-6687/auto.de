"use client";

import { useEffect, useState } from "react";
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

const BRANDS = ["Audi","BMW","Mercedes-Benz","Volkswagen","Porsche","Toyota","Honda","Hyundai","Kia","Ford","Opel","Renault","Skoda","Seat","Fiat","Peugeot","Citroën","Dacia","Mazda","Nissan","Suzuki","Volvo","Jeep","Mitsubishi","Subaru"];
const CONDITIONS = ["Gebraucht","Neu","Oldtimer","Vorführfahrzeug","Jahreswagen"];
const FUEL_TYPES = ["Benzin","Diesel","Hybrid","Elektro","Erdgas (CNG)","Autogas (LPG)","Wasserstoff"];
const GEARBOXES = ["Schaltgetriebe","Automatik","Halbautomatik"];
const VEHICLE_TYPES = ["Limousine","Kombi","SUV","Van / Minibus","Kleinwagen","Cabrio / Roadster","Coupé","Transporter","Pickup"];
const DOORS = ["2","3","4","5","6+"];
const COLORS = ["Schwarz","Weiß","Grau","Silber","Blau","Rot","Grün","Gelb","Orange","Braun","Beige","Violett","Gold","Bronze"];
const EMISSION_STICKERS = ["1 (Keine Plakette)","2 (Rot)","3 (Gelb)","4 (Grün)"];
const EMISSION_CLASSES = ["Euro 1","Euro 2","Euro 3","Euro 4","Euro 5","Euro 6","Euro 6d","Euro 6d-TEMP"];
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
const YEAR_OPTIONS = Array.from({ length: 36 }, (_, i) => String(2025 - i));

const inputCls = "p-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm";
const labelCls = "block text-xs font-medium text-gray-500 mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelCls}>{label}</label>{children}</div>;
}

export default function EditCarClient({ id }: { id: string }) {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCar() {
      const res = await fetch(`${API_URL}/cars/admin/${id}`);
      const data = await res.json();
      setCar({
        ...data,
        title: data.title ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        previousPrice: data.previousPrice ?? null,
        showPreviousPrice: data.showPreviousPrice ?? false,
        brand: data.brand ?? "",
        model: data.model ?? "",
        mileage: data.mileage ?? "",
        condition: data.condition ?? "",
        firstRegistration: data.firstRegistration ?? "",
        fuelType: data.fuelType ?? "",
        power: data.power ?? "",
        gearbox: data.gearbox ?? "",
        vehicleType: data.vehicleType ?? "",
        doors: data.doors ?? "",
        huUntil: data.huUntil ?? "",
        emissionSticker: data.emissionSticker ?? "",
        emissionClass: data.emissionClass ?? "",
        color: data.color ?? "",
        features: data.features ?? [],
        images: data.images ?? [],
        coverImage: data.coverImage ?? null,
      });
      setCoverImage(data.coverImage ?? null);
      setLoading(false);
    }
    loadCar();
  }, [id]);

  if (loading || !car) return <p className="p-6 text-gray-500">Loading...</p>;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCar((prev: any) => ({ ...prev, [name]: value }));
  };

  const set = (field: string) => (value: string) =>
    setCar((prev: any) => ({ ...prev, [field]: value }));

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

  async function uploadNewImages(): Promise<string[]> {
    if (newImages.length === 0) return [];
    const formData = new FormData();
    newImages.forEach((img) => formData.append("images", img));
    const res = await fetch(`${API_URL}/upload`, { method: "POST", body: formData });
    if (!res.ok) return [];
    const data = await res.json();
    return data.urls ?? [];
  }

  const removeOldImage = (url: string) => {
    setCar((prev: any) => ({ ...prev, images: prev.images.filter((img: string) => img !== url) }));
    if (coverImage === url) setCoverImage(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newUrls = await uploadNewImages();
    const finalImages = [...(car.images ?? []), ...newUrls];
    const finalCover = coverImage || (finalImages.length > 0 ? finalImages[0] : null);
    await fetch(`${API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...car, images: finalImages, coverImage: finalCover }),
    });
    router.push("/admin/cars");
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

          {/* Preisreduktion */}
          <label className="flex items-center gap-2 text-sm text-gray-700 md:col-span-2 cursor-pointer">
            <input
              type="checkbox"
              checked={car.showPreviousPrice ?? false}
              onChange={(e) => setCar((prev) => prev ? { ...prev, showPreviousPrice: e.target.checked } : prev)}
              className="accent-blue-600 w-4 h-4"
            />
            Vorherigen Preis für Kunden anzeigen (Preisreduktion)
          </label>

          {car.showPreviousPrice && car.previousPrice != null && Number(car.previousPrice) > Number(car.price) && (
            <p className="text-sm text-zinc-600 md:col-span-2">
              Vorschau:{" "}
              <span className="text-red-500 line-through font-medium">{Number(car.previousPrice).toLocaleString("de-DE")} €</span>
              {" → "}
              <span className="text-blue-700 font-semibold">{Number(car.price).toLocaleString("de-DE")} €</span>
            </p>
          )}
          {car.showPreviousPrice && (car.previousPrice == null || Number(car.previousPrice) <= Number(car.price)) && (
            <p className="text-sm text-zinc-500 md:col-span-2">
              Der alte Preis wird beim Speichern automatisch gesetzt, wenn der neue Preis niedriger ist.
            </p>
          )}
        </div>
      </section>

      {/* ── ۲. مشخصات خودرو ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">🚗 Fahrzeugdaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <CustomDropdown label="Marke" options={BRANDS} value={car.brand} onChange={set("brand")} placeholder="-- Marke wählen --" />

          <Field label="Modell">
            <input name="model" placeholder="z. B. 320d xDrive" value={car.model} onChange={handleChange} className={inputCls} />
          </Field>

          <Field label="Kilometerstand (km)">
            <input name="mileage" type="number" placeholder="z. B. 85000" value={car.mileage} onChange={handleChange} className={inputCls} />
          </Field>

          <CustomDropdown label="Fahrzeugzustand" options={CONDITIONS} value={car.condition} onChange={set("condition")} placeholder="-- Zustand wählen --" />
          <CustomDropdown label="Erstzulassung (Jahr)" options={YEAR_OPTIONS} value={car.firstRegistration} onChange={set("firstRegistration")} placeholder="-- Jahr wählen --" />
          <CustomDropdown label="Kraftstoffart" options={FUEL_TYPES} value={car.fuelType} onChange={set("fuelType")} placeholder="-- Kraftstoff wählen --" />

          <Field label="Leistung (PS)">
            <input name="power" type="number" placeholder="z. B. 150" value={car.power} onChange={handleChange} className={inputCls} />
          </Field>

          <CustomDropdown label="Getriebe" options={GEARBOXES} value={car.gearbox} onChange={set("gearbox")} placeholder="-- Getriebe wählen --" />
          <CustomDropdown label="Fahrzeugtyp" options={VEHICLE_TYPES} value={car.vehicleType} onChange={set("vehicleType")} placeholder="-- Typ wählen --" />
          <CustomDropdown label="Anzahl Türen" options={DOORS} value={car.doors} onChange={set("doors")} placeholder="-- Türen wählen --" />
          <CustomDropdown label="HU bis" options={HU_OPTIONS} value={car.huUntil} onChange={set("huUntil")} placeholder="-- HU-Datum wählen --" />
          <CustomDropdown label="Umweltplakette" options={EMISSION_STICKERS} value={car.emissionSticker} onChange={set("emissionSticker")} placeholder="-- Plakette wählen --" />
          <CustomDropdown label="Schadstoffklasse" options={EMISSION_CLASSES} value={car.emissionClass} onChange={set("emissionClass")} placeholder="-- Euro-Norm wählen --" />
          <CustomDropdown label="Außenfarbe" options={COLORS} value={car.color} onChange={set("color")} placeholder="-- Farbe wählen --" />

        </div>
      </section>

      {/* ── ۳. Ausstattung ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">⚙️ Ausstattung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {FEATURES.map((f) => (
            <label key={f} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600">
              <input type="checkbox" checked={car.features.includes(f)} onChange={() => toggleFeature(f)} className="accent-blue-600 w-4 h-4" />
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
          placeholder="Fahrzeugbeschreibung..."
          className={`${inputCls} resize-y`}
          rows={5}
        />
      </section>

      {/* ── ۵. عکس‌های موجود ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">🖼️ Vorhandene Bilder</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {car.images.map((url) => (
            <div key={url} className="relative group">
              <img src={url} className="w-full h-24 object-cover rounded-lg border" />
              <button
                type="button"
                onClick={() => setCoverImage(url)}
                className={`absolute bottom-1 left-1 px-2 py-0.5 text-xs rounded-md font-medium transition-colors ${
                  coverImage === url ? "bg-green-600 text-white" : "bg-black/50 text-white hover:bg-green-500"
                }`}
              >
                {coverImage === url ? "✓ Cover" : "Cover"}
              </button>
              <button
                type="button"
                onClick={() => removeOldImage(url)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-0.5 rounded-md"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── ۶. آپلود عکس جدید ── */}
      <section>
        <h3 className="font-bold text-gray-700 mb-4 text-base border-b pb-2">📷 Neue Bilder hochladen</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setNewImages(Array.from(e.target.files || []))}
          className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {newImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
            {newImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={() => setCoverImage(URL.createObjectURL(img))}
                  className="absolute bottom-1 left-1 bg-black/50 hover:bg-green-500 text-white text-xs px-2 py-0.5 rounded-md"
                >
                  Cover
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Submit ── */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          💾 Speichern
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
          Abbrechen
        </button>
      </div>
    </form>
  );
}