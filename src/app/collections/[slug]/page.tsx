"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  price: string;
  fabric: string;
  category: string;
  images: string[];
}

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchCollection = async () => {
      try {
        const res = await fetch(`/api/collections/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setCollection(data.collection);
        setProducts(data.products || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [slug]);

  if (loading) {
    return (
      <>
        <header className="max-w-[1440px] mx-auto px-5 md:px-20 pt-32 pb-8 md:pt-48 md:pb-16">
          <div className="animate-pulse space-y-4 max-w-2xl">
            <div className="h-4 w-24 rounded" style={{ background: "#222018" }} />
            <div className="h-10 w-64 rounded" style={{ background: "#222018" }} />
            <div className="h-4 w-96 rounded" style={{ background: "#222018" }} />
          </div>
        </header>
        <main className="max-w-[1440px] mx-auto px-5 md:px-20 pb-[120px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-xl mb-4" style={{ background: "#222018" }} />
                <div className="h-4 w-3/4 rounded" style={{ background: "#222018" }} />
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  if (notFound || !collection) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="text-[48px]" style={{ color: "#534344" }}>✦</span>
        <h1
          className="text-[24px] font-medium"
          style={{ fontFamily: "var(--font-playfair-display)", color: "#e8e2d6" }}
        >
          Collection Not Found
        </h1>
        <p className="text-[13px]" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
          The collection you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/collections"
          className="mt-4 text-[11px] uppercase tracking-[0.15em] font-semibold text-secondary hover:underline"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <header className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {collection.cover_image ? (
          <Image
            src={collection.cover_image}
            alt={collection.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full" style={{ background: "#15130d" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1440px] mx-auto w-full px-5 md:px-20 pb-10 md:pb-16">
            <Link
              href="/collections"
              className="inline-block mb-4 text-[11px] uppercase tracking-[0.15em] font-semibold text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ← Collections
            </Link>
            <h1
              className="text-[28px] sm:text-[38px] md:text-[54px] font-medium leading-[1.1] text-white mb-3"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              {collection.name}
            </h1>
            {collection.description && (
              <p
                className="text-[13px] md:text-[15px] leading-relaxed text-white/70 max-w-xl"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {collection.description}
              </p>
            )}
            <span
              className="inline-block mt-4 text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-20 pb-[120px]">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[13px] text-on-surface-variant/60" style={{ fontFamily: "var(--font-inter)" }}>
              No products in this collection yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={String(product.id)}
                title={product.title}
                price={product.price || "Price on Request"}
                image={product.images?.[0] || ""}
                alt={product.title}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
