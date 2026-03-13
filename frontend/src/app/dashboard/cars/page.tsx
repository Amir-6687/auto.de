import { API_URL } from "@/lib/api";

async function getCars() {
  const res = await fetch(`${API_URL}/cars`, { cache: "no-store" });
  return res.json();
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Car Listings</h1>

      <div className="space-y-4">
        {cars.length === 0 && (
          <p className="text-gray-600">No cars found. Add one!</p>
        )}

        {cars.map((car: any) => (
          <div key={car._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-medium">{car.title}</h2>
            <p className="text-gray-700">Price: {car.price} €</p>
            <p className="text-gray-700">Mileage: {car.mileage} km</p>
          </div>
        ))}
      </div>
    </div>
  );
}
