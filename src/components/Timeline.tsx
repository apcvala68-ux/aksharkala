"use client";

import ScrollReveal from "./ScrollReveal";

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  image?: string;
}

const steps: TimelineStep[] = [
  {
    number: "01",
    title: "The Thread",
    description:
      "Journey begins in the mulberry groves of Varanasi, where raw silk threads are harvested and hand-reeled with extraordinary precision — each strand a testament to patience.",
  },
  {
    number: "02",
    title: "The Loom",
    description:
      "On century-old pit looms, master weavers translate patterns from memory. The rhythmic clack of the shuttle is the heartbeat of generations, each throw weaving time itself.",
  },
  {
    number: "03",
    title: "The Dye",
    description:
      "Using botanical pigments — indigo, turmeric, pomegranate — artisans create hues that deepen with age. No two batches are identical; each dye bath is a conversation with nature.",
  },
  {
    number: "04",
    title: "The Art",
    description:
      "After weeks at the loom, the finished fabric is inspected by hand. Every motif, every zari thread, every border is a signature — the artisan's whisper across centuries.",
  },
];

export default function Timeline() {
  return (
    <section className="py-[120px] px-5 md:px-20 max-w-[1440px] mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p
            className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-4"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
          >
            The Journey
          </p>
          <h2
            className="text-[36px] md:text-[48px] text-on-surface"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            From Thread to Treasure
          </h2>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative">
        {/* Center Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-secondary/20 -translate-x-1/2" />

        {/* Animated Gold Line */}
        <div className="hidden md:block absolute left-1/2 top-0 w-[1px] bg-secondary -translate-x-1/2 origin-top scale-y-0 timeline-line" />

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative md:grid md:grid-cols-2 md:gap-16 md:items-center ${
                i % 2 === 0 ? "" : "md:direction-rtl"
              } ${i < steps.length - 1 ? "md:mb-24" : ""}`}
            >
              {/* Content Side */}
              <ScrollReveal
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 100}
                className={`${i % 2 === 0 ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"} ${i % 2 !== 0 ? "" : "md:col-start-1"}`}
              >
                <div className={i % 2 !== 0 ? "" : "md:col-start-1"}>
                  <span
                    className="text-[48px] md:text-[64px] font-bold text-secondary/20 leading-none block mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-[28px] md:text-[32px] text-on-surface mb-4"
                    style={{ fontFamily: "var(--font-playfair-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.7] text-on-surface-variant max-w-md"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* Dot on center line (Desktop) */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <ScrollReveal delay={i * 100 + 200}>
                  <div className="w-4 h-4 rounded-full bg-secondary border-4 border-background" />
                </ScrollReveal>
              </div>

              {/* Visual Side (empty for alternating layout) */}
              <div className={`hidden md:block ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
