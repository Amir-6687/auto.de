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
    if (wasFavorite || isFlying) return;

    const heart = heartRef.current;
    const dot = flyingDotRef.current;
    const target = flyTarget.current;
    if (!heart || !dot || !target) return;

    setIsFlying(true);

    const from = heart.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    // پاپ کوچک روی خود آیکون قلب
    animate(
      heart,
      { scale: [1, 1.3, 1] },
      { duration: 0.35, ease: "easeOut" }
    );

    // نقطه شناور (کپی کوچک قلب) که به سمت navbar پرواز می‌کند
    await animate(
      dot,
      {
        x: dx,
        y: dy,
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
        className="fixed top-3 left-3 z-[60] pointer-events-none opacity-0"
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