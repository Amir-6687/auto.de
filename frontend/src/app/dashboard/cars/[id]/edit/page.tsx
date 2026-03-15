// "use client";

// import { useEffect, useState } from "react";
// import { API_URL } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function EditCarPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const { id } = params; // ← 100% درست

//   const [car, setCar] = useState<any>(null);
//   const [newImages, setNewImages] = useState<File[]>([]);
//   const [existingImages, setExistingImages] = useState<string[]>([]);

//   useEffect(() => {
//     async function fetchCar() {
//       const res = await fetch(`${API_URL}/cars/${id}`);
//       const data = await res.json();
//       setCar(data);
//       setExistingImages(data.images || []);
//     }

//     fetchCar();
//   }, [id]);

//   async function uploadNewImages() {
//     if (newImages.length === 0) return [];

//     const formData = new FormData();
//     newImages.forEach((img) => formData.append("images", img));

//     const res = await fetch(`${API_URL}/upload`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     return data.urls;
//   }

//   function removeImage(url: string) {
//     setExistingImages(existingImages.filter((img) => img !== url));
//   }

//   async function handleSave(e: any) {
//     e.preventDefault();

//     const uploadedNewImages = await uploadNewImages();
//     const finalImages = [...existingImages, ...uploadedNewImages];

//     const res = await fetch(`${API_URL}/cars/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...car,
//         images: finalImages,
//       }),
//     });

//     if (res.ok) {
//       router.push("/dashboard/cars");
//     }
//   }

//   if (!car) return <p className="text-black">Loading...</p>;

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6 text-black">Edit Car</h1>

//       <form onSubmit={handleSave} className="space-y-4 max-w-xl">
//         <input
//           name="title"
//           value={car.title}
//           onChange={(e) => setCar({ ...car, title: e.target.value })}
//           className="w-full p-2 border rounded bg-gray-200 text-black"
//         />

//         <input
//           name="price"
//           value={car.price}
//           onChange={(e) => setCar({ ...car, price: e.target.value })}
//           className="w-full p-2 border rounded bg-gray-200 text-black"
//         />

//         <textarea
//           name="description"
//           value={car.description}
//           onChange={(e) => setCar({ ...car, description: e.target.value })}
//           className="w-full p-2 border rounded bg-gray-200 text-black"
//           rows={4}
//         />

//         <h2 className="text-xl font-semibold mt-6 text-black">Gallery</h2>

//         <div className="grid grid-cols-3 gap-4">
//           {existingImages.map((img) => (
//             <div key={img} className="relative">
//               <img src={img} className="w-full h-28 object-cover rounded" />
//               <button
//                 type="button"
//                 onClick={() => removeImage(img)}
//                 className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <input
//           type="file"
//           multiple
//           onChange={(e) => setNewImages(Array.from(e.target.files || []))}
//           className="w-full p-2 border rounded bg-gray-200 text-black"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }
import { use } from "react";
import EditCarClient from "./EditCarClient";

export default function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ اینجا روی سرور params را با use باز می‌کنیم
  const { id } = use(params);

  return <EditCarClient id={id} />;
}
