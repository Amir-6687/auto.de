"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface FavoritesContextType {
  favoriteIds: Set<string>;
  isFavorite: (carId: string) => boolean;
  toggleFavorite: (carId: string) => Promise<void>;
  flyTarget: React.RefObject<HTMLDivElement | null>;
  bump: boolean; // برای انیمیشن badge توی navbar
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const userId = (session?.user as { id?: string })?.id;

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [bump, setBump] = useState(false);
  const flyTarget = useRef<HTMLDivElement | null>(null);

  // وقتی کاربر لاگین شد، لیست علاقه‌مندی‌هاش رو از بکند بگیر
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;

    let active = true;
    fetch(`/api/favorites/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const ids = (data.favorites || []).map((c: { _id: string }) => c._id);
        setFavoriteIds(new Set(ids));
      })
      .catch((err) => console.error("Failed to load favorites", err));

    return () => {
      active = false;
    };
  }, [status, userId]);

  const isFavorite = useCallback(
    (carId: string) => favoriteIds.has(carId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (carId: string) => {
      if (!userId) {
        console.warn("User must be logged in to save favorites");
        return;
      }

      const alreadyFav = favoriteIds.has(carId);

      // به‌روزرسانی فوری UI (optimistic update)
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (alreadyFav) next.delete(carId);
        else next.add(carId);
        return next;
      });

      if (!alreadyFav) {
        setBump(true);
        setTimeout(() => setBump(false), 600);
      }

      try {
        if (alreadyFav) {
          await fetch(`/api/favorites/${userId}/${carId}`, { method: "DELETE" })
        } else {
          await fetch(`/api/favorites/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carId }),
          });
        }
      } catch (err) {
        console.error("Failed to sync favorite", err);
        // در صورت خطا، تغییر رو برگردون
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (alreadyFav) next.add(carId);
          else next.delete(carId);
          return next;
        });
      }
    },
    [favoriteIds, userId]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        flyTarget,
        bump,
        count: favoriteIds.size,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}