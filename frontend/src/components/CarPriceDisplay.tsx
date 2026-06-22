import { cn } from "@/lib/utils";

type CarPriceDisplayProps = {
  price?: number | string | null;
  previousPrice?: number | string | null;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  className?: string;
};

export function hasPriceDiscount(
  price?: number | string | null,
  previousPrice?: number | string | null
) {
  const current = Number(price);
  const previous = Number(previousPrice);
  return previousPrice != null && !Number.isNaN(previous) && previous > current;
}

export function CarPriceDisplay({
  price,
  previousPrice,
  size = "md",
  align = "right",
  className,
}: CarPriceDisplayProps) {
  const current = Number(price);
  if (price == null || Number.isNaN(current)) return null;

  const showDiscount = hasPriceDiscount(price, previousPrice);

  const sizeClasses = {
    sm: { current: "text-lg font-bold", old: "text-sm" },
    md: { current: "text-2xl font-bold", old: "text-base" },
    lg: { current: "text-3xl font-bold", old: "text-xl" },
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        align === "right" ? "items-end" : "items-start",
        className
      )}
    >
      {showDiscount && (
        <span
          className={cn(
            "font-medium text-red-500 line-through",
            sizeClasses[size].old
          )}
        >
          {Number(previousPrice).toLocaleString("de-DE")} €
        </span>
      )}
      <span className={cn("text-[#003399]", sizeClasses[size].current)}>
        {current.toLocaleString("de-DE")} €
      </span>
    </div>
  );
}
