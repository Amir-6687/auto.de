"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/lib/api";

const MODELS_BY_BRAND: Record<string, string[]> = {
  Audi: ["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8","TT","R8","S3","S5","SQ5","RS3","RS6 Avant","RS7","Q4 e-tron","e-tron GT","Q8 e-tron"],
};

const KM_OPTIONS = ["Alle","5.000","10.000","20.000","30.000","40.000","50.000","60.000","70.000","80.000","90.000","100.000","125.000","150.000","175.000","200.000","250.000","Mehr als 250.000"];
const YEAR_OPTIONS = ["Alle",...Array.from({ length: 27 }, (_, i) => 2026 - i),1990,1980,1970,1960,1950,1940,1930];
const FUEL_OPTIONS = ["Alle","Benzin","Diesel","Hybrid","Elektro"];
const GEARBOX_OPTIONS = ["Alle","Automatik","Manuell"];
const COLOR_OPTIONS = ["Alle","Schwarz","Weiß","Grau","Silber","Blau","Rot","Grün","Gelb","Orange","Braun","Beige","Violett","Gold"];
const DOOR_OPTIONS = ["Alle","2","3","4","5"];
const PS_OPTIONS = ["Alle",...Array.from({ length: 19 }, (_, i) => (i + 1) * 50),1000];
const PRICE_OPTIONS = ["Alle",...Array.from({ length: 30 }, (_, i) => (i + 1) * 500),...Array.from({ length: 6 }, (_, i) => 15000 + (i + 1) * 2500),...Array.from({ length: 14 }, (_, i) => 30000 + (i + 1) * 5000)];

function parseKm(value: string | null): number | null {
  if (!value || value === "Alle") return null;
  if (value === "Mehr als 250.000") return 250000;
  return parseInt(value.replace(".", ""));
}

// ── آیکون‌های SVG سبک ──
function IconSpeed() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 8 8"/><circle cx="12" cy="12" r="1"/>
    </svg>
  );
}
function IconFuel() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V8l9-6 9 6v14"/><path d="M12 22v-4"/><rect x="7" y="14" width="10" height="4" rx="1"/>
    </svg>
  );
}
function IconGear() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M19.07 19.07A10 10 0 0 0 4.93 4.93"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ── کامپوننت کارت خودرو ──
function CarCard({ car }: { car: any }) {
  const image = car.coverImage || car.images?.[0];
  const brand = car.brand || "";
  const model = car.model || "";
  const titleDisplay = brand && model
    ? <><span className="font-bold">{brand}</span> <span className="font-normal text-gray-500">{model}</span></>
    : <span className="font-bold">{car.title}</span>;

  return (
    <a
      href={`/cars/${car._id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
      style={{ textDecoration: "none" }}
    >
      <div className="flex flex-col md:flex-row">
        {/* تصویر */}
        <div className="relative md:w-72 h-52 md:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={car.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1"/>
                <rect x="9" y="11" width="14" height="10" rx="2"/>
                <circle cx="12" cy="19" r="2"/><circle cx="20" cy="19" r="2"/>
              </svg>
            </div>
          )}
          {/* badge تعداد عکس */}
          {car.images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
              📷 {car.images.length}
            </div>
          )}
        </div>

        {/* محتوا */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          {/* هدر: عنوان + قیمت */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl leading-tight text-gray-900">
                {titleDisplay}
              </h3>
              {car.description && (
                <p className="text-sm text-gray-400 mt-1 line-clamp-1">{car.description}</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-[#003399]">
                {Number(car.price).toLocaleString("de-DE")} €
              </div>
              <div className="text-xs text-gray-400 mt-0.5">inkl. 19% MwSt.</div>
            </div>
          </div>

          {/* مشخصات — ۴ ستون با آیکون */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-b border-gray-100">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <IconSpeed /> Kilometerstand
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {car.mileage ? Number(car.mileage).toLocaleString("de-DE") + " km" : "—"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <IconGear /> Getriebe
              </div>
              <span className="text-sm font-semibold text-gray-800">{car.gearbox || "—"}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <IconFuel /> Kraftstoff
              </div>
              <span className="text-sm font-semibold text-gray-800">{car.fuelType || "—"}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <IconCalendar /> Erstzulassung
              </div>
              <span className="text-sm font-semibold text-gray-800">{car.firstRegistration || "—"}</span>
            </div>
          </div>

          {/* footer: PS + دکمه */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-wrap gap-2">
              {car.power && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  ⚡ {car.power} PS
                </span>
              )}
              {car.vehicleType && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  🚗 {car.vehicleType}
                </span>
              )}
              {car.color && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  🎨 {car.color}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-2 bg-[#003399] group-hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200">
              Jetzt ansehen <IconArrow />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function CarsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);

  const [sortOpen, setSortOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [kmOpen, setKmOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedKm, setSelectedKm] = useState<string | null>(null);

  const sortRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<HTMLDivElement | null>(null);
  const kmRef = useRef<HTMLDivElement | null>(null);

  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const yearRef = useRef<HTMLDivElement | null>(null);

  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);

  const [fuelOpen, setFuelOpen] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const fuelRef = useRef<HTMLDivElement | null>(null);

  const [gearboxOpen, setGearboxOpen] = useState(false);
  const [selectedGearbox, setSelectedGearbox] = useState<string | null>(null);
  const gearboxRef = useRef<HTMLDivElement | null>(null);

  const [colorOpen, setColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const [doorsOpen, setDoorsOpen] = useState(false);
  const [selectedDoors, setSelectedDoors] = useState<string | null>(null);
  const doorsRef = useRef<HTMLDivElement | null>(null);

  const [psOpen, setPsOpen] = useState(false);
  const [selectedPs, setSelectedPs] = useState<string | null>(null);
  const psRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/cars`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => { setCars(data); setFilteredCars(data); })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (sortRef.current && !sortRef.current.contains(target)) setSortOpen(false);
      if (brandRef.current && !brandRef.current.contains(target)) setBrandOpen(false);
      if (modelRef.current && !modelRef.current.contains(target)) setModelOpen(false);
      if (kmRef.current && !kmRef.current.contains(target)) setKmOpen(false);
      if (priceRef.current && !priceRef.current.contains(target)) setPriceOpen(false);
      if (fuelRef.current && !fuelRef.current.contains(target)) setFuelOpen(false);
      if (gearboxRef.current && !gearboxRef.current.contains(target)) setGearboxOpen(false);
      if (colorRef.current && !colorRef.current.contains(target)) setColorOpen(false);
      if (doorsRef.current && !doorsRef.current.contains(target)) setDoorsOpen(false);
      if (psRef.current && !psRef.current.contains(target)) setPsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let result = [...cars];
    if (selectedBrand) result = result.filter((car) => car.title?.toLowerCase().includes(selectedBrand.toLowerCase()));
    if (selectedModel) result = result.filter((car) => car.title?.toLowerCase().includes(selectedModel.toLowerCase()));
    const kmValue = parseKm(selectedKm);
    if (kmValue !== null) {
      if (selectedKm === "Mehr als 250.000") result = result.filter((car) => car.mileage > 250000);
      else result = result.filter((car) => car.mileage <= kmValue);
    }
    if (selectedYear && selectedYear !== "Alle") result = result.filter((car) => Number(car.firstRegistration) === Number(selectedYear));
    if (selectedFuel && selectedFuel !== "Alle") result = result.filter((car) => car.fuelType?.toLowerCase() === selectedFuel.toLowerCase());
    if (selectedGearbox && selectedGearbox !== "Alle") result = result.filter((car) => car.gearbox?.toLowerCase() === selectedGearbox.toLowerCase());
    if (selectedColor && selectedColor !== "Alle") result = result.filter((car) => car.color?.toLowerCase() === selectedColor.toLowerCase());
    if (selectedDoors && selectedDoors !== "Alle") result = result.filter((car) => Number(car.doors) === Number(selectedDoors));
    if (selectedPs && selectedPs !== "Alle") result = result.filter((car) => Number(car.ps) <= Number(selectedPs));
    if (selectedPrice && selectedPrice !== "Alle") result = result.filter((car) => car.price <= Number(selectedPrice));
    setFilteredCars(result);
    setCurrentPage(1);
  }, [selectedBrand, selectedModel, selectedKm, selectedYear, selectedPrice, selectedFuel, selectedGearbox, selectedColor, selectedDoors, selectedPs, cars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const currentModels = selectedBrand && MODELS_BY_BRAND[selectedBrand] ? MODELS_BY_BRAND[selectedBrand] : [];
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const FilterAccordion = ({ label, isOpen, toggle, refEl, children }: any) => (
    <div className="mb-4" ref={refEl}>
      <button
        className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-xl font-medium text-sm text-gray-700 hover:border-blue-400 transition-colors"
        onClick={toggle}
      >
        {label}
        <span className="text-gray-400 text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 border border-gray-100 rounded-xl p-3 bg-gray-50 max-h-56 overflow-y-auto space-y-1 shadow-inner">
          {children}
        </div>
      )}
    </div>
  );

  const FilterBtn = ({ label, selected, onClick }: any) => (
    <button
      className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${selected ? "bg-blue-600 text-white font-semibold" : "hover:bg-white hover:text-blue-600 text-gray-700"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full min-h-screen bg-[#f4f6fb] pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ── فیلترها ── */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-32">
          <h2 className="text-lg font-bold mb-5 text-gray-900 tracking-tight">Filters</h2>

          <FilterAccordion label="Sortierung" isOpen={sortOpen} toggle={() => setSortOpen(!sortOpen)} refEl={sortRef}>
            {["Preis aufsteigend","Preis absteigend","Kilometer aufsteigend","Kilometer absteigend","Erstzulassung aufsteigend","Erstzulassung absteigend","Alphabetisch A–Z","Alphabetisch Z–A"].map(s => (
              <FilterBtn key={s} label={s} onClick={() => setSortOpen(false)} />
            ))}
          </FilterAccordion>

          <FilterAccordion label={selectedBrand || "Marken"} isOpen={brandOpen} toggle={() => setBrandOpen(!brandOpen)} refEl={brandRef}>
            {["Audi","BMW","Mercedes-Benz","Volkswagen","Porsche","Toyota","Honda","Hyundai","Kia","Ford","Opel","Renault"].map(b => (
              <FilterBtn key={b} label={b} selected={selectedBrand === b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setBrandOpen(false); setModelOpen(true); }} />
            ))}
          </FilterAccordion>

          <FilterAccordion label={selectedModel || "Modelle"} isOpen={modelOpen} toggle={() => { if (selectedBrand) setModelOpen(!modelOpen); }} refEl={modelRef}>
            {currentModels.map(m => (
              <FilterBtn key={m} label={m} selected={selectedModel === m} onClick={() => { setSelectedModel(m); setModelOpen(false); }} />
            ))}
          </FilterAccordion>

          <FilterAccordion label={selectedKm || "Kilometerstand"} isOpen={kmOpen} toggle={() => setKmOpen(!kmOpen)} refEl={kmRef}>
            {KM_OPTIONS.map(km => <FilterBtn key={km} label={km} selected={selectedKm === km} onClick={() => { setSelectedKm(km); setKmOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedYear || "Erstzulassung"} isOpen={yearOpen} toggle={() => setYearOpen(!yearOpen)} refEl={yearRef}>
            {YEAR_OPTIONS.map(y => <FilterBtn key={y} label={String(y)} selected={selectedYear === String(y)} onClick={() => { setSelectedYear(String(y)); setYearOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedFuel || "Kraftstoffart"} isOpen={fuelOpen} toggle={() => setFuelOpen(!fuelOpen)} refEl={fuelRef}>
            {FUEL_OPTIONS.map(f => <FilterBtn key={f} label={f} selected={selectedFuel === f} onClick={() => { setSelectedFuel(f); setFuelOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedGearbox || "Getriebe"} isOpen={gearboxOpen} toggle={() => setGearboxOpen(!gearboxOpen)} refEl={gearboxRef}>
            {GEARBOX_OPTIONS.map(g => <FilterBtn key={g} label={g} selected={selectedGearbox === g} onClick={() => { setSelectedGearbox(g); setGearboxOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedColor || "Farbe"} isOpen={colorOpen} toggle={() => setColorOpen(!colorOpen)} refEl={colorRef}>
            {COLOR_OPTIONS.map(c => <FilterBtn key={c} label={c} selected={selectedColor === c} onClick={() => { setSelectedColor(c); setColorOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedDoors ? `${selectedDoors} Türen` : "Türen"} isOpen={doorsOpen} toggle={() => setDoorsOpen(!doorsOpen)} refEl={doorsRef}>
            {DOOR_OPTIONS.map(d => <FilterBtn key={d} label={d === "Alle" ? "Alle" : `${d} Türen`} selected={selectedDoors === d} onClick={() => { setSelectedDoors(d); setDoorsOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedPs ? `${selectedPs} PS` : "PS"} isOpen={psOpen} toggle={() => setPsOpen(!psOpen)} refEl={psRef}>
            {PS_OPTIONS.map(p => <FilterBtn key={p} label={p === "Alle" ? "Alle" : `${p} PS`} selected={selectedPs === String(p)} onClick={() => { setSelectedPs(String(p)); setPsOpen(false); }} />)}
          </FilterAccordion>

          <FilterAccordion label={selectedPrice || "Preis"} isOpen={priceOpen} toggle={() => setPriceOpen(!priceOpen)} refEl={priceRef}>
            {PRICE_OPTIONS.map(p => (
              <FilterBtn key={p} label={p === "Alle" ? "Alle" : Number(p).toLocaleString("de-DE") + " €"} selected={selectedPrice === String(p)} onClick={() => { setSelectedPrice(String(p)); setPriceOpen(false); }} />
            ))}
          </FilterAccordion>

          <button className="w-full bg-[#003399] hover:bg-blue-800 text-white py-2.5 rounded-xl font-medium transition-colors text-sm mt-2">
            Filter anwenden
          </button>
        </div>

        {/* ── لیست خودروها ── */}
        <div className="lg:col-span-3 space-y-5">

          {/* نوار نتایج */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filteredCars.length}</span> Fahrzeuge gefunden
            </span>
          </div>

          {filteredCars.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">🚗</div>
              <p className="text-gray-500 text-lg">Keine Fahrzeuge gefunden</p>
              <p className="text-gray-400 text-sm mt-1">Bitte passen Sie Ihre Filterkriterien an.</p>
            </div>
          )}

          {currentCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:opacity-40 hover:border-blue-400 transition-colors bg-white"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ← Zurück
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#003399] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:opacity-40 hover:border-blue-400 transition-colors bg-white"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Weiter →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}