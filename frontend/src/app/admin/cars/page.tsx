import { API_URL } from "@/lib/api";

async function getCars() {
  const res = await fetch(`${API_URL}/cars`, { cache: "no-store" });
  return res.json();
}

export default async function AdminCarsPage() {
  const cars = await getCars();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-[#101828]">
        Manage Cars
      </h1>

      <a
        href="/admin/cars/new"
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Add New Car
      </a>

      <div className="space-y-4">
        {cars.length === 0 && (
          <p className="text-gray-600">No cars found.</p>
        )}

        {cars.map((car: any) => (
          <div key={car._id} className="bg-white p-4 rounded shadow">

            {car.coverImage && (
              <img
                src={car.coverImage}
                className="w-40 h-28 object-cover rounded mb-2"
              />
            )}

            <h2 className="text-xl font-semibold text-[#101828]">
              {car.title}
            </h2>

            <p className="text-gray-700">Price: {car.price} €</p>
            <p className="text-gray-700">Mileage: {car.mileage} km</p>

            <div className="flex gap-4 mt-3">
              <a
                href={`/admin/cars/${car._id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </a>

              <form action={`/admin/cars/${car._id}/delete`} method="POST">
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
