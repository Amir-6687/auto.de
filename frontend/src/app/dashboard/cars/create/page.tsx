"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateCarPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    mileage: "",
    fuelType: "",
    gearbox: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard/cars");
    }
  };

  return (
    <div>
<h1 className="text-3xl font-semibold mb-6 text-black">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
  name="title"
  placeholder="Title"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  onChange={handleChange}
/>

<input
  name="price"
  placeholder="Price (€)"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  onChange={handleChange}
/>

<input
  name="mileage"
  placeholder="Mileage (km)"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  onChange={handleChange}
/>

<input
  name="fuelType"
  placeholder="Fuel Type"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  onChange={handleChange}
/>

<input
  name="gearbox"
  placeholder="Gearbox"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  onChange={handleChange}
/>

<textarea
  name="description"
  placeholder="Description"
  className="w-full p-2 border rounded bg-gray-200 text-gray-900 placeholder-gray-500"
  rows={4}
  onChange={handleChange}
/>


        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
