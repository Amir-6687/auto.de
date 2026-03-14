"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EditCarPage({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    title: "",
    price: "",
    mileage: "",
    fuelType: "",
    gearbox: "",
    description: "",
  });

  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`${API_URL}/cars/${id}`);
      const data = await res.json();
      setForm(data);
    }
    fetchCar();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard/cars");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-black">Edit Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-200 text-black"
          onChange={handleChange}
        />

        <input
          name="price"
          value={form.price}
          placeholder="Price (€)"
          className="w-full p-2 rounded bg-gray-200 text-black"
          onChange={handleChange}
        />

        <input
          name="mileage"
          value={form.mileage}
          placeholder="Mileage (km)"
          className="w-full p-2 rounded bg-gray-200 text-black"
          onChange={handleChange}
        />

        <input
          name="fuelType"
          value={form.fuelType}
          placeholder="Fuel Type"
          className="w-full p-2 rounded bg-gray-200 text-black"
          onChange={handleChange}
        />

        <input
          name="gearbox"
          value={form.gearbox}
          placeholder="Gearbox"
          className="w-full p-2 rounded bg-gray-200 text-black"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-200 text-black"
          rows={4}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}