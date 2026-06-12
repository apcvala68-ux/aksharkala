"use client";

import { useState } from "react";
import Link from "next/link";

interface ProductInfoProps {
  id: number;
  title: string;
  category: string;
  slug?: string;
  description?: string;
}

export default function ProductInfo({ id, title, category, description }: ProductInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {/* Breadcrumbs */}
      <nav
        className="hidden lg:flex text-on-surface-variant text-[10px] tracking-[0.12em] mb-6 opacity-70 flex-wrap"
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
        <span className="text-secondary font-semibold">
          {title.toUpperCase()}
        </span>
      </nav>

      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <h1
          className="text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.2] text-on-surface tracking-normal flex-1"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          {title}
        </h1>
        <span className="inline-flex self-start items-center text-[9px] tracking-[0.12em] font-semibold text-secondary uppercase border border-secondary/25 px-2.5 py-1 rounded bg-secondary/5 shrink-0 sm:mt-2">
          WHOLESALE PRICING ON REQUEST
        </span>
      </div>

      {/* Description */}
      {description && (
        <div
          className="text-[14px] leading-[1.7] text-on-surface-variant/90 mb-10 max-w-none"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {/* Desktop Description (Always Full) */}
          <p className="hidden md:block">{description}</p>
          
          {/* Mobile Description (With Truncation Toggle) */}
          <div className="block md:hidden">
            <p className="inline">
              {isExpanded ? description : (description.length > 120 ? `${description.slice(0, 120)}...` : description)}
            </p>
            {description.length > 120 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-secondary font-semibold ml-2 focus:outline-none cursor-pointer underline inline text-[13px] tracking-wide"
              >
                {isExpanded ? "READ LESS" : "READ MORE"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Actions - B2B Inquiry (Side by Side) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href={`/inquiry?product=${id}`}
          className="btn-primary text-[10px] tracking-[0.12em] py-3 px-4 flex items-center justify-center gap-2 cursor-pointer text-center w-full sm:flex-1 font-semibold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="material-symbols-outlined text-[16px]">
            request_quote
          </span>
          REQUEST WHOLESALE PRICING
        </Link>
        <Link
          href={`/inquiry?product=${id}`}
          className="btn-secondary text-[10px] tracking-[0.12em] py-3 px-4 flex items-center justify-center gap-2 cursor-pointer text-center w-full sm:flex-1 font-semibold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="material-symbols-outlined text-[16px]">
            mail
          </span>
          INQUIRE ABOUT THIS COLLECTION
        </Link>
      </div>
    </div>
  );
}
