import { API_URL } from "@/lib/api";

async function getCars() {
  const res = await fetch(`${API_URL}/cars`, { cache: "no-store" });
  return res.json();
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div>
<h1 className="text-3xl font-semibold mb-6 text-[#101828]">Car Listings</h1>

      <div className="space-y-4">
        {cars.length === 0 && (
          <p className="text-gray-600">No cars found. Add one!</p>
        )}

        {cars.map((car: any) => (
          <div key={car._id} className="bg-white p-4 rounded shadow">

            {/* -------------------------------
                🟩 نمایش عکس اول گالری
            -------------------------------- */}
            {car.images?.length > 0 && (
              <img
                src={car.images[0]}
                className="w-40 h-28 object-cover rounded mb-2"
              />
            )}

<h2 className="text-xl font-semibold text-[#101828]">{car.title}</h2>
            <p className="text-gray-700">Price: {car.price} €</p>
            <p className="text-gray-700">Mileage: {car.mileage} km</p>

            <div className="flex gap-4 mt-3">
              <a
                href={`/dashboard/cars/${car._id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </a>

              <form action={`/dashboard/cars/${car._id}/delete`} method="POST">
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
