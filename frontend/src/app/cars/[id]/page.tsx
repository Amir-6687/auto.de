import { Car } from "@/types/car";
import CarImageSlider from "@/components/CarImageSlider";

const API_URL = "http://localhost:5000/api";

// دریافت اطلاعات آگهی
async function getCar(id: string): Promise<Car> {
  const res = await fetch(`${API_URL}/cars/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load car");
  return res.json();
}

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);

  const images = car.images || [];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">

      {/* 🖼 اسلایدر حرفه‌ای */}
      <CarImageSlider images={images} />

      {/* 🟦 عنوان + قیمت */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{car.title}</h1>
        <div className="text-2xl font-semibold text-green-700">
          {car.price} €
        </div>
      </div>

      {/* 🟩 جدول مشخصات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
        <Spec label="Marke" value={car.brand} />
        <Spec label="Modell" value={car.model} />
        <Spec label="Kilometerstand" value={`${car.mileage} km`} />
        <Spec label="Fahrzeugzustand" value={car.condition} />
        <Spec label="Erstzulassung" value={car.firstRegistration} />
        <Spec label="Kraftstoffart" value={car.fuelType} />
        <Spec label="Leistung" value={`${car.power} PS`} />
        <Spec label="Getriebe" value={car.gearbox} />
        <Spec label="Fahrzeugtyp" value={car.vehicleType} />
        <Spec label="Anzahl Türen" value={car.doors} />
        <Spec label="HU bis" value={car.huUntil} />
        <Spec label="Umweltplakette" value={car.emissionSticker} />
        <Spec label="Schadstoffklasse" value={car.emissionClass} />
        <Spec label="Außenfarbe" value={car.color} />
      </div>

      {/* 🟨 امکانات */}
      {car.features && car.features.length > 0 && (
        <div>
<h2 className="text-xl font-semibold mb-3 text-[#101828]">Ausstattung</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
            {car.features.map((f) => (
              <li key={f}>✔ {f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🟧 توضیحات */}
      {car.description && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Beschreibung</h2>
          <p className="whitespace-pre-line text-sm leading-6">
            {car.description}
          </p>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
