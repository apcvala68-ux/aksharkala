"use client";

import HeroSlider from "@/components/HeroSlider";
import JourneySection from "./JourneySection";
import CraftSection from "./CraftSection";
import PromiseSection from "./PromiseSection";
import CTASection from "./CTASection";
import StatsSection from "@/components/StatsSection";

interface SectionsData {
  hero?: Record<string, unknown>;
  journey?: Record<string, unknown>;
  craft?: Record<string, unknown>;
  promise?: Record<string, unknown>;
  cta?: Record<string, unknown>;
}

export default function SectionRenderer({ sections }: { sections?: SectionsData | null }) {
  return (
    <>
      <HeroSlider content={sections?.hero as any} />

      <section className="relative overflow-hidden">
        <StatsSection />
      </section>

      <JourneySection content={sections?.journey as any} />

      {(sections?.craft as any)?.cards?.length > 0 ? (
        <CraftSection content={sections?.craft as any} />
      ) : (
        <div className="py-8 md:py-12 lg:py-16 px-5 md:px-20 max-w-[1440px] mx-auto text-center">
          <p className="text-on-surface-variant">Loading collections...</p>
        </div>
      )}

      <PromiseSection content={sections?.promise as any} />

      <CTASection content={sections?.cta as any} />
    </>
  );
}
