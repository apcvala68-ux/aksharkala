"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface CraftCard {
  title?: string;
  tagline?: string;
  description?: string;
  image?: string;
  link?: string;
}

interface CraftContent {
  tagline?: string;
  headline?: string;
  cards?: CraftCard[];
}

const DEFAULT_CARDS: CraftCard[] = [
  {
    title: "Sarees",
    tagline: "Imperial Splendor",
    description: "Woven gold zardozi on pure handloom mulberry silk, representing a century of Royal Indian drape.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLnC0jMc1xhqfA4gwdKmj4Pmdvp_oTy0ptNLye23_npmctrWn1UU57ABaSRgGIO6q-vEUg41zViWzc54o-dfz1--3WrLob2IuHWGWATgi2rmWFY0a5n_GKIudxvMeqSwtVjQeZ4sX2dNGzUxTzduaWihQtpiCIYmNr5TqwIZieM-fiN06ahpAy4mwmN7T0xxpPUy93vSGeqVQawGAyM3oug_dGIB2gJXnVsE0k4NEYeM209ymukYoI0bnxVKASBGBnkkoKmzF2Pww",
    link: "/collections",
  },
  {
    title: "Indo-Western",
    tagline: "Contemporary Silhouette",
    description: "Modern luxury cuts meets traditional Indian weave structures. Designed for the global runway.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD68p1JbyTDEEuS9VLDw5DlxK0zyjjRlxr_pgFP1_1DM7vnt4DdCM5es9gFto52nUkBK2rES51QwhuoRcdI8GQX1rotwSIbUfFXyj5BVN75POTJg7LSq7T_66469Tz_ugX0ClYrXsBIVKUltk-IqDdHPnBgOO4Pc7C7YP4LjtNNDXOCTYuTm5k9sIRTeQcTw6U9nz99L0G_JW2b3Ld1KlgxzgtRYlxgmkTJdqOX0M_eyLXZ0T2pCuPmpBETcDIL5HsKleoL7vtApgvh",
    link: "/collections",
  },
  {
    title: "Heritage",
    tagline: "Ancestral Treasures",
    description: "Exquisite designs meticulously preserved from archive blueprints and woven on century-old looms.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH",
    link: "/collections",
  },
];

export default function CraftSection({ content }: { content?: CraftContent }) {
  const cards = Array.isArray(content?.cards) && content.cards.length > 0 ? content.cards : DEFAULT_CARDS;
  const tagline = content?.tagline || "Curated Excellence";
  const headline = content?.headline || "The Collections";

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] uppercase text-secondary mb-3"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
          >
            {tagline}
          </p>
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-on-surface"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            {headline}
          </h2>
          <div className="gold-divider w-20 mx-auto mt-4" />
        </ScrollReveal>

        {/*
          Grid steps: 1 col (phone) -> 2 col (tablet, 640-1023px) -> 3 col (lg+).
          The old `md:grid-cols-3` jumped straight from 1 to 3 columns at 768px,
          which is exactly tablet-portrait territory - cards were squeezed to
          ~180px wide with a 2:3 aspect ratio. This adds the missing middle step.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title || index} delay={index * 100}>
              <a
                href={card.link || "/collections"}
                className="group relative overflow-hidden aspect-[3/4] sm:aspect-[2/3] border border-secondary/30 hover:shadow-[0_0_60px_rgba(198,169,114,0.3)] transition-all duration-500 block cursor-pointer"
              >
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/*
                  Original version hid the description behind a hover-only
                  translate/opacity toggle. Touch devices (all phones and
                  tablets) never trigger :hover, so the description was
                  permanently invisible there - not "less responsive", just
                  broken. Now: content is fully visible by default, and the
                  hover-collapse "reveal on hover" treatment only applies at
                  lg+ where a mouse is the reasonable assumption. This is a
                  breakpoint-as-proxy-for-hover-capability tradeoff, not a
                  true `(hover: hover)` media query - flag if you want the
                  real thing added via a Tailwind plugin.
                */}
                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 glass-panel border-secondary/25 p-4 md:p-5 lg:p-6 flex flex-col justify-end transition-transform duration-500 ease-out lg:translate-y-[56px] lg:group-hover:translate-y-0">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="min-w-0">
                      {card.tagline && (
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-1">
                          {card.tagline}
                        </span>
                      )}
                      {card.title && (
                        <h3
                          className="text-white text-[18px] sm:text-[20px] md:text-[28px] font-medium leading-tight break-words"
                          style={{ fontFamily: "var(--font-playfair-display)" }}
                        >
                          {card.title}
                        </h3>
                      )}
                    </div>
                    <div className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full border border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-500 mt-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:-rotate-45">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {card.description && (
                    <p
                      className="text-[11px] md:text-[12px] leading-relaxed text-on-surface-variant/90 border-t border-secondary/10 pt-2 md:pt-3 mt-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-100"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
