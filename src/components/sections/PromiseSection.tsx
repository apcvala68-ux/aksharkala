"use client";

import ScrollReveal from "@/components/ScrollReveal";

interface PromiseCard {
  title?: string;
  description?: string;
  icon?: "diamond" | "feather" | "heart";
}

interface PromiseContent {
  headline?: string;
  subtitle?: string;
  cards?: PromiseCard[];
}

const DEFAULT_CARDS: PromiseCard[] = [
  { title: "100% Pure Silk", description: "Sourced from local organic farms, spun into luxury mulberry threads that offer unmatched natural luster, strength, and exquisite drape.", icon: "diamond" },
  { title: "Hand Embroidered", description: "Intricate zardozi and fine kantha patterns created over weeks of painstaking craftsmanship by master artisans, rendering every piece unique.", icon: "feather" },
  { title: "Ethical Sourcing", description: "Committed to transparent supply chains, sustainable materials, and fair wages that support local communities and protect weaving heritage.", icon: "heart" },
];

function DiamondIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" /><path d="M14.5 17.5 4.5 15" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function Icon({ name }: { name?: string }) {
  switch (name) {
    case "diamond": return <DiamondIcon />;
    case "feather": return <FeatherIcon />;
    case "heart": return <HeartIcon />;
    default: return <DiamondIcon />;
  }
}

export default function PromiseSection({ content }: { content?: PromiseContent }) {
  const cards = Array.isArray(content?.cards) && content.cards.length > 0 ? content.cards : DEFAULT_CARDS;
  const headline = content?.headline || "The Art of the Hand-Woven";
  const subtitle = content?.subtitle || "Each Aksharkala piece undergoes a rigorous 300-hour weaving process.";

  return (
    <section className="py-8 md:py-12 lg:py-16 border-t border-secondary/10 px-5 md:px-20 max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-12 md:gap-16">
        <ScrollReveal className="max-w-3xl text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
            </svg>
          </div>
          <h2
            className="text-[24px] md:text-[36px] lg:text-[48px] text-on-surface font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            {headline}
          </h2>
          <p
            className="text-[16px] md:text-[17px] lg:text-[18px] leading-[1.8] text-on-surface-variant max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 w-full">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title || i} delay={i * 100}>
              <div className="stat-card-luxury p-8 flex flex-col items-center text-center gap-4 group cursor-default h-full">
                <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/25 group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                  <Icon name={card.icon} />
                </div>
                {card.title && (
                  <h3 className="text-[18px] md:text-[22px] text-on-surface font-medium" style={{ fontFamily: "var(--font-playfair-display)" }}>
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p className="text-[14px] leading-[1.6] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
                    {card.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
