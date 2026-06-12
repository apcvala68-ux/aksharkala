"use client";

import Link from "next/link";

interface ProductInfoProps {
  id: number;
  title: string;
  category: string;
  slug?: string;
}

export default function ProductInfo({ id, title, category }: ProductInfoProps) {
  return (
    <div className="w-full lg:w-[40%] flex flex-col justify-start pt-4 lg:pt-8 lg:pl-8">
      {/* Breadcrumbs */}
      <nav
        className="flex text-on-surface-variant text-[12px] tracking-[0.1em] mb-6 opacity-70 flex-wrap"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
      >
        <Link href="/collections" className="hover:text-secondary transition-colors">
          COLLECTIONS
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-secondary transition-colors">
          {category.toUpperCase()}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-secondary font-bold truncate max-w-[200px]">
          {title.toUpperCase()}
        </span>
      </nav>

      {/* Title */}
      <h1
        className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] text-on-surface mb-2 tracking-tight"
        style={{ fontFamily: "var(--font-playfair-display)" }}
      >
        {title}
      </h1>
      <p
        className="text-[14px] leading-[1.5] tracking-[0.08em] font-semibold text-secondary mb-8 uppercase"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Wholesale Pricing on Request
      </p>

      {/* Actions - B2B Inquiry */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          href={`/inquiry?product=${id}`}
          className="btn-primary text-[12px] tracking-[0.1em] py-4 px-6 flex items-center justify-center gap-2 cursor-pointer text-center flex-1"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
        >
          <span className="material-symbols-outlined text-[18px]">
            request_quote
          </span>
          REQUEST WHOLESALE PRICING
        </Link>
        <Link
          href={`/inquiry?product=${id}`}
          className="btn-secondary text-[12px] tracking-[0.1em] py-4 px-6 flex items-center justify-center gap-2 cursor-pointer text-center flex-1"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
        >
          <span className="material-symbols-outlined text-[18px]">
            mail
          </span>
          INQUIRE ABOUT THIS COLLECTION
        </Link>
      </div>
    </div>
  );
}
