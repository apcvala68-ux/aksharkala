"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface JourneyContent {
  image?: string;
  tagline?: string;
  headline?: string;
  body?: string;
  badge?: { number?: string; text?: string };
  link?: { text?: string; url?: string };
}

const DEFAULTS = {
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXvlD2E3TYM0gRO61EKRMPkrSflh1xWQy_oKDp6AWME-YVlExUUb4uW5rHbqBCLa3Pbr4JLnMLNQiNofuoO7V5HQCPhH5_nra12Yh_s3HrfurjN3nj8oKU6pBaXpWOFIPdArFnbGGYJ4bOa-Je0-1NxINCOB0DFJxN-Af_xKEUiqltN5U3MFHdkB1YzsAK11u238E-5AlE0u6Z2F4Jh-D-oPypOJ-JLULT4C_jJFLFuXf7aGCbB16TiE-mPLn6hLK9V3wvYA3YCS7",
  tagline: "Est. 1924",
  headline: "Legacy of Threads",
  body: "For a century, Aksharkala has been the silent custodian of India's weaving heritage. Every drape tells a story of ancestral looms, where pure silk meets the soul of the artisan, crafted painstakingly to perfection.",
  badge: { number: "100", text: "Years of Legacy" },
  link: { text: "Our History", url: "/heritage" },
};

export default function JourneySection({ content }: { content?: JourneyContent }) {
  const c = content || DEFAULTS;
  const img = c.image || DEFAULTS.image;
  const badge = c.badge || DEFAULTS.badge;

  return (
    <section className="py-8 md:py-12 lg:py-16 px-5 md:px-20 max-w-[1440px] mx-auto">
      <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 lg:gap-16 items-center">
        <ScrollReveal direction="left" className="order-2 md:order-1">
          <div className="relative aspect-[3/4] overflow-hidden gold-border group">
            <Image
              src={img}
              alt="Heritage Loom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {badge.number && (
              <div className="absolute bottom-6 right-6 glass-panel border-secondary/30 px-6 py-4 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <span className="text-[22px] font-bold text-secondary tracking-widest" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {badge.number}
                </span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-[0.15em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                  {badge.text || ""}
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="order-1 md:order-2">
          <div className="flex flex-col gap-6">
            <span
              className="text-[12px] tracking-[0.2em] text-secondary uppercase font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {c.tagline || DEFAULTS.tagline}
            </span>
            <h2
              className="text-[24px] md:text-[36px] lg:text-[48px] leading-[1.2] text-on-surface font-bold"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              {c.headline || DEFAULTS.headline}
            </h2>
            <p
              className="text-[16px] md:text-[17px] lg:text-[18px] leading-[1.8] text-on-surface-variant"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {c.body || DEFAULTS.body}
            </p>
            {(c.link?.text || DEFAULTS.link.text) && (
              <a
                href={c.link?.url || DEFAULTS.link.url || "/heritage"}
                className="nav-link text-[12px] uppercase tracking-[0.15em] text-on-surface-variant hover:text-secondary pb-2 self-start transition-colors flex items-center gap-2 group/link cursor-pointer"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                {c.link?.text || DEFAULTS.link.text}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-secondary/40 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all duration-300">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
