"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FavoriteHeartButton from "@/context/FavoriteHeartButton";
import { CarPriceDisplay } from "@/components/CarPriceDisplay";

interface Stat {
  label: string;
  value: string | number;
}

export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  price: number;
  previousPrice?: number | null;
  pricePeriod?: string;
  description: string;
  stats: Stat[];
  actionLabel: string;
  href?: string;
  onActionClick?: () => void;
  carId: string; // ✅ جدید: شناسه آگهی برای ذخیره در علاقه‌مندی‌ها
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      price,
      previousPrice,
      pricePeriod = "€",
      description,
      stats,
      actionLabel,
      href,
      onActionClick,
      carId,
      onClick,      // ✅ جدا کن
      ...props      // دیگه href و onActionClick توش نیست
    },
    ref
  ) => {
    const router = useRouter();
    return (
      <div
  ref={ref}
  className={cn(
    "flex max-w-sm flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
    className
  )}
  {...props}
  onClick={(e) => {
    e.stopPropagation();
    if (href) router.push(href);
  }}
  style={{ cursor: href ? "pointer" : "default" }}
>
        {/* Image */}
<div className="relative aspect-[4/3] overflow-hidden">
  {/* ✅ آیکون قلب علاقه‌مندی */}
  <FavoriteHeartButton carId={carId} />

  {imageUrl ? (  // ✅ چک کردن خالی نبودن
    <img
      src={imageUrl}
      alt={imageAlt || title}
      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
    />
  ) : (
    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-400 text-sm">No Image</span>
    </div>
  )}
</div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3
              style={{ fontFamily: "'Alatsi', sans-serif", fontWeight: 400 }}
              className="text-2xl tracking-tight"
            >
              {title}
            </h3>
            <CarPriceDisplay
              price={price}
              previousPrice={previousPrice}
              size="sm"
              align="left"
              className="mt-1"
            />
            <p
              style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 400 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="my-6 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p
  style={{ fontFamily: "'Fjalla One', sans-serif", fontWeight: 400 }}
  className="text-2xl text-foreground"
>
  {stat.value}
</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <Button
  onClick={() => {
    if (onActionClick) onActionClick();
    else if (href) router.push(href);
  }}
  className="w-full"
  style={{ fontFamily: "'Alatsi', sans-serif", fontWeight: 400 }}
>
  {actionLabel}
</Button>
        </div>
      </div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export { PropertyCard };