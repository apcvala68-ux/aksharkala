"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);

  // If no images exist, show fallback
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] md:h-[560px] bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant/40">
        No image available
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 h-auto md:h-[560px]">
      {/* Desktop Thumbnails (hidden on mobile) */}
      <div className="hidden md:flex flex-col gap-4 w-20 lg:w-24 overflow-y-auto no-scrollbar py-2">
        {images.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`w-full aspect-[3/4] relative cursor-pointer group transition-colors rounded-lg overflow-hidden flex-shrink-0 ${
              activeThumb === i
                ? "border border-secondary"
                : "border border-transparent hover:border-secondary/50"
            }`}
          >
            <Image
              src={thumb}
              alt={`${title} - Thumbnail ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover group-hover:opacity-80 transition-opacity"
            />
          </button>
        ))}
      </div>

      {/* Desktop Main Image (hidden on mobile) */}
      <div className="hidden md:block flex-1 relative overflow-hidden bg-surface-container cursor-zoom-in group rounded-xl">
        <Image
          src={images[activeThumb]}
          alt={title}
          fill
          sizes="60vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>

      {/* Mobile Carousel (hidden on desktop, uses CSS scroll snap for native 120Hz swiping) */}
      <div className="block md:hidden w-full relative">
        <div
          id="mobile-carousel"
          className="w-full aspect-[4/5] overflow-x-auto snap-x snap-mandatory flex scroll-smooth no-scrollbar rounded-xl bg-surface-container"
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft;
            const width = e.currentTarget.clientWidth;
            if (width > 0) {
              const idx = Math.round(scrollLeft / width);
              if (idx !== activeThumb && idx >= 0 && idx < images.length) {
                setActiveThumb(idx);
              }
            }
          }}
        >
          {images.map((thumb, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 snap-start relative"
            >
              <Image
                src={thumb}
                alt={`${title} - Image ${idx + 1}`}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile Arrows (Overlay) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 w-full flex justify-between items-center px-4 pointer-events-none">
            <button
              onClick={() => {
                const carousel = document.getElementById("mobile-carousel");
                if (carousel) {
                  const newIdx = activeThumb === 0 ? images.length - 1 : activeThumb - 1;
                  carousel.scrollTo({
                    left: newIdx * carousel.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className="w-9 h-9 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface pointer-events-auto shadow-sm active:scale-95 transition-transform"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                chevron_left
              </span>
            </button>
            <button
              onClick={() => {
                const carousel = document.getElementById("mobile-carousel");
                if (carousel) {
                  const newIdx = activeThumb === images.length - 1 ? 0 : activeThumb + 1;
                  carousel.scrollTo({
                    left: newIdx * carousel.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className="w-9 h-9 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface pointer-events-auto shadow-sm active:scale-95 transition-transform"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                chevron_right
              </span>
            </button>
          </div>
        )}

        {/* Progress Bar (Matches Adyawear's indicator style) */}
        {images.length > 1 && (
          <div className="w-full h-0.5 bg-secondary/10 relative mt-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300 ease-out"
              style={{
                width: `${((activeThumb + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
