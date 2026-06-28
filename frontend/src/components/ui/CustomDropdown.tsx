"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "-- wählen --",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // بستن با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className="w-full relative">
      {/* Label */}
      <p className="block text-xs font-medium text-gray-500 mb-1">{label}</p>

      {/* Trigger */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer select-none",
          "bg-white text-gray-800 transition-all duration-300",
          isOpen
            ? "border-blue-400 shadow-md shadow-blue-100"
            : "border-gray-300 hover:border-blue-300",
        )}
      >
        <span className={cn("text-sm", value ? "text-gray-900 font-medium" : "text-gray-400")}>
          {value || placeholder}
        </span>
        <ChevronUp
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isOpen ? "rotate-0" : "rotate-180",
          )}
        />
      </div>

      {/* Dropdown list — absolute تا از flow خارج شه */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-blue-400 rounded-xl overflow-hidden shadow-xl bg-white">
          <div className="max-h-52 overflow-y-auto py-1 px-1">
            {options.map((opt, index) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm",
                  "transition-colors duration-150",
                  value === opt
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                )}
              >
                {value === opt && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                )}
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}