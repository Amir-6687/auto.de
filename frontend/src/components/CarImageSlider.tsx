"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

export default function CarImageSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-500">
        No Images
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* اسلایدر اصلی */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full aspect-video rounded overflow-hidden"
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              className="w-full h-full object-cover"
              alt={`image-${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر کوچک (Thumbnails) */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        className="h-20"
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              className="w-full h-full object-cover rounded cursor-pointer"
              alt={`thumb-${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
