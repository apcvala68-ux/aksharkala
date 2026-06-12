"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="flex gap-4 h-[540px] md:h-[716px] lg:h-[870px]">
      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-4 w-20 lg:w-24 overflow-y-auto no-scrollbar py-2">
        {images.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`w-full aspect-[3/4] relative cursor-pointer group transition-colors flex-shrink-0 ${
              activeThumb === i
                ? "border border-secondary"
                : "border border-transparent hover:border-secondary/50"
            }`}
          >
            <Image
              src={thumb}
              alt={`${title} - Image ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover group-hover:opacity-80 transition-opacity"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative overflow-hidden bg-surface-container group">
        <Image
          src={images[activeThumb]}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Mobile Arrows */}
        <div className="absolute inset-y-0 w-full flex justify-between items-center px-4 md:hidden pointer-events-none">
          <button
            onClick={() =>
              setActiveThumb(
                activeThumb === 0 ? images.length - 1 : activeThumb - 1
              )
            }
            className="w-10 h-10 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center text-on-surface pointer-events-auto shadow-sm cursor-pointer"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() =>
              setActiveThumb(
                activeThumb === images.length - 1 ? 0 : activeThumb + 1
              )
            }
            className="w-10 h-10 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center text-on-surface pointer-events-auto shadow-sm cursor-pointer"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveThumb(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeThumb === i
                  ? "bg-secondary w-4"
                  : "bg-white/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
