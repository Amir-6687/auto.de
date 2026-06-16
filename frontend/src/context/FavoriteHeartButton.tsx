"use client";

import { arc, motion, useAnimate } from "motion/react";
import { useRef, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteHeartButtonProps {
  carId: string;
  className?: string;
}

export default function FavoriteHeartButton({
  carId,
  className = "",
}: FavoriteHeartButtonProps) {
  const { isFavorite, toggleFavorite, flyTarget } = useFavorites();
  const [scope, animate] = useAnimate();
  const heartRef = useRef<HTMLDivElement>(null);
  const flyingDotRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(false);

  const active = isFavorite(carId);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از کلیک روی کارت (که به صفحه آگهی میره)
    e.preventDefault();

    const wasFavorite = active;
    await toggleFavorite(carId);

    // فقط وقتی به علاقه‌مندی‌ها اضافه میشه (نه حذف) انیمیشن پرواز اجرا شه
    if (wasFavorite || isFlying) {
      console.log("[Favorite] Skip fly: wasFavorite =", wasFavorite, "isFlying =", isFlying);
      return;
    }

    const heart = heartRef.current;
    const dot = flyingDotRef.current;
    const target = flyTarget.current;

    console.log("[Favorite] heart:", heart, "dot:", dot, "target:", target);

    if (!heart || !dot || !target) {
      console.warn("[Favorite] Missing ref, aborting fly animation");
      return;
    }

    setIsFlying(true);

    const heartRect = heart.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // مبدا واقعی: مرکز خود آیکون قلب کلیک‌شده (نسبت به viewport، چون dot fixed است)
    const startX = heartRect.left + heartRect.width / 2 - 10; // 10 = نصف عرض آیکون 20px
    const startY = heartRect.top + heartRect.height / 2 - 10;

    const dx = targetRect.left + targetRect.width / 2 - (startX + 10);
    const dy = targetRect.top + targetRect.height / 2 - (startY + 10);

    // پاپ کوچک روی خود آیکون قلب
    animate(
      heart,
      { scale: [1, 1.3, 1] },
      { duration: 0.35, ease: "easeOut" }
    );

    // اول دات رو دقیقاً روی مبدا (قلب کلیک‌شده) بدون انیمیشن قرار بده
    await animate(
      dot,
      { x: startX, y: startY, opacity: 1, scale: 1 },
      { duration: 0 }
    );

    // سپس از همون نقطه به سمت navbar پرواز کن
    await animate(
      dot,
      {
        x: startX + dx,
        y: startY + dy,
        scale: [1, 1, 0.3],
        opacity: [1, 1, 0],
      },
      {
        duration: 0.55,
        path: arc({ strength: 0.5, peak: 0.18, rotate: 0.6, direction: "cw" }),
        ease: [0.74, 0.18, 0.93, 0.69],
        opacity: { times: [0, 0.85, 1] },
      }
    );

    setIsFlying(false);
  };

  return (
    <div ref={scope} className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className={`absolute top-3 left-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 ${className}`}
      >
        <motion.div ref={heartRef}>
          <HeartIcon filled={active} />
        </motion.div>
      </button>

      {/* نقطه‌ی غیرقابل‌مشاهده‌ای که هنگام افزودن، به سمت navbar پرواز می‌کند */}
      <motion.div
        ref={flyingDotRef}
        className="fixed top-3 left-3 z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        style={{ willChange: "transform, opacity" }}
      >
        <HeartIcon filled />
      </motion.div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "#374151"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}