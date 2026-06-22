"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropertyCard } from "@/components/ui/card-4";
import { API_URL } from "@/lib/api";

type Car = {
  _id: string;
  title: string;
  brand?: string;
  model?: string;
  price?: number;
  previousPrice?: number | null;
  coverImage?: string;
  images?: string[];
};

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = (session?.user as { id?: string })?.id;

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated" || !userId) return;

    fetch(`${API_URL}/users/${userId}/favorites`)
      .then((res) => res.json())
      .then((data) => setCars(data.favorites || []))
      .catch((err) => console.error("Failed to load favorites", err))
      .finally(() => setLoading(false));
  }, [status, userId, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Meine Favoriten
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-400">
          Du hast noch keine Fahrzeuge gespeichert. Klicke auf das Herz-Symbol
          bei einer Anzeige, um sie hier zu speichern.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cars.map((car) => (
            <PropertyCard
              key={car._id}
              carId={car._id}
              imageUrl={car.coverImage || car.images?.[0] || ""}
              title={car.title}
              price={car.price || 0}
              previousPrice={car.previousPrice}
              pricePeriod="€"
              description=""
              stats={[
                { label: "Brand", value: car.brand || "—" },
                { label: "Model", value: car.model || "—" },
              ]}
              actionLabel="Ansehen"
              href={`/cars/${car._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}