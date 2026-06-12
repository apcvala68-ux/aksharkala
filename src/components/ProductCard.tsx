"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage?: string;
  alt: string;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  hoverImage,
  alt,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group cursor-pointer block">
      {/* Borderless Aspect Container with rounded-xl border radius */}
      <div className="relative aspect-square mb-4 overflow-hidden bg-surface-container-lowest rounded-xl">
        {/* Main Base Image */}
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover object-center transform scale-100 group-hover:scale-[1.02] transition-all duration-[800ms] ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
        
        {/* Hover Crossfade Image */}
        {hoverImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-in-out">
            <Image
              src={hoverImage}
              alt={`${alt} detail view`}
              fill
              className="object-cover object-center transform scale-100 group-hover:scale-[1.02] transition-transform duration-[800ms] ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
      
      {/* Zara-Style Minimal Left-Aligned Info */}
      <div className="flex flex-col text-left px-1">
        <h3
          className="text-[12px] md:text-[13px] tracking-[0.08em] uppercase text-on-surface/90 group-hover:text-secondary transition-colors font-medium truncate"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
