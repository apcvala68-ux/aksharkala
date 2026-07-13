"use client";

import ScrollReveal from "@/components/ScrollReveal";

interface CTAContent {
  headline?: string;
  subtitle?: string;
  buttons?: { text: string; link: string }[];
}

const DEFAULT_BUTTONS = [
  { text: "Explore Collections", link: "/collections" },
  { text: "Request Wholesale Catalog", link: "/inquiry" },
];

export default function CTASection({ content }: { content?: CTAContent }) {
  const headline = content?.headline || "Begin Your Journey";
  const subtitle = content?.subtitle || "Discover our curated collections — each piece a testament to the enduring beauty of handcraft.";
  const buttons = Array.isArray(content?.buttons) && content.buttons.length > 0 ? content.buttons : DEFAULT_BUTTONS;

  return (
    <section className="py-8 md:py-12 lg:py-16 px-5 md:px-20 max-w-[1440px] mx-auto text-center">
      <ScrollReveal>
        <div className="w-16 h-[1px] bg-secondary mx-auto mb-10" />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2
          className="text-[24px] md:text-[36px] lg:text-[56px] text-on-surface mb-6"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          {headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <p
          className="text-[16px] text-on-surface-variant max-w-xl mx-auto mb-10 leading-[1.7]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {subtitle}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {buttons.map((btn, i) =>
            i === 0 ? (
              <a
                key={btn.text}
                href={btn.link}
                className="btn-primary px-6 py-3 md:px-8 md:py-4 text-[12px] tracking-[0.15em] uppercase font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {btn.text}
              </a>
            ) : (
              <a
                key={btn.text}
                href={btn.link}
                className="btn-secondary px-6 py-3 md:px-8 md:py-4 text-[12px] tracking-[0.15em] uppercase font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {btn.text}
              </a>
            )
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
