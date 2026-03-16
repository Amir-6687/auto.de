"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

console.log("API_URL =", API_URL);


export default function EditCarClient({ id }: { id: string }) {
  const router = useRouter();

  // 🔹 همه‌ی state ها و hooks باید بدون شرط و در ابتدای کامپوننت باشند
  const [mounted, setMounted] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // فقط یک بار بعد از mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // دریافت اطلاعات ماشین
  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`${API_URL}/cars/${id}`);
      const data = await res.json();
      setCar(data);
      setExistingImages(data.images || []);
      setCoverImage(data.coverImage || null);
    }

    if (id) {
      fetchCar();
    }
  }, [id]);

  // ✅ حالا بعد از همه‌ی hooks، می‌تونیم شرط رندر بذاریم
  if (!mounted) return null;

  // آپلود عکس‌های جدید
  async function uploadNewImages() {
    if (newImages.length === 0) return [];

    const formData = new FormData();
    newImages.forEach((img) => formData.append("images", img));

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.urls as string[];
  }

  // حذف عکس از گالری
  function removeImage(url: string) {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    if (coverImage === url) setCoverImage(null);
  }

  // ذخیره تغییرات
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const uploadedNewImages = await uploadNewImages();
    const finalImages = [...existingImages, ...uploadedNewImages];

    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...car,
        images: finalImages,
        coverImage: coverImage,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/cars");
    }
  }

  if (!car) return <p className="text-black">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-[#101828]">Edit Car</h1>

      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <input
          name="title"
          value={car.title}
          onChange={(e) => setCar({ ...car, title: e.target.value })}
          className="w-full p-2 border rounded bg-gray-200 text-black"
        />

        <input
          name="price"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          className="w-full p-2 border rounded bg-gray-200 text-black"
        />

        <textarea
          name="description"
          value={car.description}
          onChange={(e) => setCar({ ...car, description: e.target.value })}
          className="w-full p-2 border rounded bg-gray-200 text-black"
          rows={4}
        />

        <h2 className="text-xl font-semibold mt-6 text-[#101828]">Gallery</h2>

        <div className="grid grid-cols-3 gap-4">
          {existingImages.map((img) => (
            <div key={img} className="relative">
              <img src={img} className="w-full h-28 object-cover rounded" />

              <button
                type="button"
                onClick={() => setCoverImage(img)}
                className="absolute bottom-1 left-1 bg-black/60 text-white px-2 py-1 text-xs rounded"
              >
                Set as Cover
              </button>

              {coverImage === img && (
                <span className="absolute top-1 left-1 bg-green-600 text-white px-2 py-1 text-xs rounded">
                  Cover
                </span>
              )}

              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);

            const files = Array.from(e.dataTransfer.files);
            setNewImages(files);

            const previews = files.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
          }}
          className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition ${
            isDragging ? "border-blue-600 bg-blue-50" : "border-gray-400"
          }`}
        >
          <p className="text-black">
            {isDragging ? "Drop here..." : "Drag & Drop images here"}
          </p>
        </div>

        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setNewImages(files);

            const previews = files.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
          }}
          className="w-full p-2 border rounded bg-gray-200 text-black"
        />

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-full h-28 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
