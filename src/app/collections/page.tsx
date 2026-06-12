"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  product_count: number;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        setCollections(data.collections || []);
      } catch {
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-5 md:px-20 pt-32 pb-8 md:pt-48 md:pb-16 text-center">
        <h1
          className="text-[28px] sm:text-[38px] md:text-[54px] lg:text-[64px] font-medium leading-[1.15] md:leading-none text-on-surface mb-4"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Our Collections
        </h1>
        <p
          className="text-[13px] md:text-[15px] leading-relaxed text-on-surface-variant/80 max-w-xl md:max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Curated groups of artisanal textiles, each telling a unique story of
          Indian heritage and craftsmanship.
        </p>
      </header>

      {/* Collections Grid */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 pb-[120px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl overflow-hidden" style={{ background: "#15130d" }}>
                <div className="aspect-[16/10]" style={{ background: "#222018" }} />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-48 rounded" style={{ background: "#222018" }} />
                  <div className="h-4 w-64 rounded" style={{ background: "#222018" }} />
                </div>
              </div>
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[13px] text-on-surface-variant/60" style={{ fontFamily: "var(--font-inter)" }}>
              Collections coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(198,169,114,0.08)]"
                style={{ background: "#15130d" }}
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {col.cover_image ? (
                    <Image
                      src={col.cover_image}
                      alt={col.name}
                      fill
                      className="object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "#222018" }}>
                      <span className="text-[48px]" style={{ color: "#534344" }}>✦</span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-[20px] md:text-[24px] font-medium mb-2 text-on-surface group-hover:text-secondary transition-colors"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        {col.name}
                      </h2>
                      {col.description && (
                        <p
                          className="text-[13px] md:text-[14px] leading-relaxed text-on-surface-variant/70 line-clamp-2"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {col.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-3">
                      <span
                        className="text-[11px] uppercase tracking-[0.15em] text-secondary/80 font-semibold"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {col.product_count} {col.product_count === 1 ? "piece" : "pieces"}
                      </span>
                      {/* Explore Button */}
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.12em] font-semibold transition-all duration-300 group-hover:bg-secondary group-hover:text-[#0B0B0C] border"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#C6A972",
                          borderColor: "rgba(198,169,114,0.3)",
                        }}
                      >
                        Explore
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="transform group-hover:translate-x-0.5 transition-transform duration-300"
                        >
                          <path
                            d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
