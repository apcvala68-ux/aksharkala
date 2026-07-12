"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Timeline from "@/components/Timeline";

export default function HeritagePage() {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const postToYT = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: "" }),
      "*"
    );
  }, []);

  const toggleMute = useCallback(() => {
    const next = !muted;
    postToYT(next ? "mute" : "unMute");
    setMuted(next);
  }, [muted, postToYT]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let pausedByScroll = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (pausedByScroll) {
            postToYT("playVideo");
            pausedByScroll = false;
          }
        } else {
          postToYT("pauseVideo");
          pausedByScroll = true;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [postToYT]);

  return (
    <main>
      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="relative w-full min-h-dvh flex items-end pb-20 md:pb-28 overflow-hidden"
      >
        {/* YouTube Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/UUthE98fmlY?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=UUthE98fmlY&playsinline=1&enablejsapi=1"
            title="Aksharkala Heritage"
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ border: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-background/30" />
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20">
          <ScrollReveal delay={200}>
            <p
              className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-4"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              Our Legacy
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <h1
              className="text-[22px] md:text-[36px] lg:text-[52px] xl:text-[64px] text-on-surface max-w-4xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Woven in threads
              <br />
              of time and tradition.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <p
              className="text-[13px] md:text-[14px] lg:text-[15px] text-on-surface-variant max-w-xl mt-6 leading-[1.7]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              For seven generations, our artisans have preserved the ancient art
              of hand-weaving — creating textiles that transcend fashion to
              become heirlooms.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal delay={1000} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-secondary/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary scroll-indicator" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 2: EDITORIAL INTRO */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-3 text-center">
            <ScrollReveal>
              <div className="w-16 h-[1px] bg-secondary mx-auto mb-10" />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2
                className="text-[22px] md:text-[30px] lg:text-[42px] text-on-surface mb-8 leading-[1.3]"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                The true essence of luxury lies not in the rapidity of creation,
                but in the deliberate, meticulous craft of the human hand.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p
                className="text-[15px] md:text-[16px] lg:text-[18px] leading-[1.8] text-on-surface-variant max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                For generations, the artisans behind AKSHARKALA have preserved
                the ancient techniques of hand-weaving. Every garment is a
                dialogue between heritage and contemporary elegance, designed for
                those who appreciate the quiet resonance of true craftsmanship.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="w-16 h-[1px] bg-secondary mx-auto mt-10" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ART OF THE WEAVE */}
      <section className="py-16 md:py-[100px] lg:py-[140px] bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal direction="left" className="order-2 md:order-1">
              <div className="relative aspect-[4/5] overflow-hidden group gold-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRELKCDK5PXbULswuVWhryOL8q_URQj0JzegxVS3-eRAgTs-6pGjgf3KP5xu2jeG3a8Az236A_gXioJTzj-HfhY92UouFnUo2M1a03IrjqsqZNIivisNzQIPeu90cLW6hPFXcEOrP5Ea64h6BLmSmFbpkTQ43KiuEG5cyYYjqBwJZGElUE8UQX1InwokatGXeH3nlbs5m21OvfSO8X0e-EibGaKnbPvK_Puk7WVajnlu0xxXJpfFFfPwEZtpj6x6E_5kkrlNYZvVkM"
                  alt="Artisan weaving fabric on traditional loom"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 md:order-2">
              <div className="md:pl-8 lg:pl-16">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-4"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                >
                  The Craft
                </p>
                <h3
                  className="text-[24px] md:text-[36px] lg:text-[52px] leading-[1.15] text-on-surface mb-6"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  The Art of the Weave
                </h3>
                <p
                  className="text-[15px] md:text-[16px] lg:text-[17px] leading-[1.7] text-on-surface-variant mb-8"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Our master weavers employ techniques passed down through
                  centuries. Each pass of the shuttle, each intricate knot, is a
                  deliberate act of creation. The resulting fabric possesses a
                  unique soul — a subtle irregularity that signifies the
                  undeniable presence of the artisan.
                </p>
                <Link
                  href="/collections"
                  className="nav-link inline-flex items-center gap-3 group/link cursor-pointer"
                >
                  <span
                    className="text-[12px] tracking-[0.15em] uppercase text-on-surface-variant group-hover/link:text-secondary transition-colors duration-300 border-b border-secondary/40 pb-1"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                  >
                    Explore Craftsmanship
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-secondary/40 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all duration-300"
                  >
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: VIDEO — YouTube Embed */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h3
              className="text-[32px] md:text-[40px] text-on-surface mb-2"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              The Making of a Masterpiece
            </h3>
            <p
              className="text-[16px] text-on-surface-variant"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A visual journey through our atelier — from raw silk to finished masterpiece.
            </p>
          </div>
          <div className="relative w-full aspect-video gold-border overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/UUthE98fmlY?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=UUthE98fmlY"
              title="The Making of a Masterpiece"
              allow="autoplay; encrypted-media"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 5: TIMELINE */}
      <section className="bg-surface-container-low">
        <Timeline />
      </section>

      {/* SECTION 6: BENTO GRID */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="group relative bg-surface p-8 md:p-12 gold-border hover:shadow-[0_0_40px_rgba(198,169,114,0.15)] transition-all duration-500 flex flex-col justify-end min-h-[450px] md:min-h-[550px] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUkEikZ3xu-DFoTVTynqU_qXS89vSBkBVpYzVbh1K-sTZWeArHnVpKh-pjHNY-DlFe3xgVQVcaiPN-SCACY99-iq3JZoht-Eq8bB2h-I-LqkwWbvqhrQavyGXIPJOHs4g7GJuPt5pAdn-pr3Hya4n47s_aB50zRKNAz5me7etA0-TVwwAh0o48WcvGO5FEyyK4CF4VlOE464w3PLY7q3tMo54xXNPLHvid492ZBxLTd7q7LaVCjR79S1U0rqc5-xtc_ErdxMlwyli1"
                  alt="Sustainable materials and natural dyes"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-multiply"
                />
              </div>
              <div className="relative z-10">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-4"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                >
                  Responsibility
                </p>
                <h4
                  className="text-[20px] md:text-[28px] lg:text-[32px] text-on-surface mb-4"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Sustainability Charter
                </h4>
                <p
                  className="text-[15px] leading-[1.7] text-on-surface-variant mb-8 max-w-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Committed to slow fashion, we utilize organic natural dyes and
                  support fair-trade practices, ensuring our legacy honors both
                  the artisan and the earth.
                </p>
                <Link
                  href="#"
                  className="nav-link inline-flex items-center gap-3 group/link cursor-pointer"
                >
                  <span
                    className="text-[12px] tracking-[0.15em] uppercase text-on-surface-variant group-hover/link:text-secondary transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                  >
                    Read Charter
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-secondary/40 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all duration-300">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="group relative bg-primary-container p-8 md:p-12 flex flex-col justify-end min-h-[450px] md:min-h-[550px] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqk7pcgq7TcCMv6gKAvf1wNXfWcBSohAR6jS3ltlbM3GeL5vVSOxbOTx_1OujRkoNGqGU2Ks_WE1YaScDn2-EfBEEPsNzA5iHZPaZD8h1RBZD7X-ROJ5HF2pZYWsjHmBQeirbBseaWh7-305VL2xLS5bq16vRN82HF74P_FqtPShW-NzOqf7LokYzzsRvVRjLXZ8fRgcGDEZ7pSQRkeix_z3flSY6nZKKLYCBjgnLCgMA5LD_sMZSEsErIre0JW3x0VLE8ZsyPFz_Q"
                  alt="Bespoke tailoring appointment"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-luminosity"
                />
              </div>
              <div className="relative z-10">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-4"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                >
                  Experience
                </p>
                <h4
                  className="text-[20px] md:text-[28px] lg:text-[32px] text-on-primary-container mb-4"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Bespoke Appointments
                </h4>
                <p
                  className="text-[15px] leading-[1.7] text-on-primary-container/80 mb-8 max-w-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Experience the pinnacle of luxury with a private consultation.
                  Commission a garment tailored precisely to your measurements
                  and aesthetic desires.
                </p>
                <Link
                  href="/inquiry"
                  className="nav-link inline-flex items-center gap-3 group/link cursor-pointer"
                >
                  <span
                    className="text-[12px] tracking-[0.15em] uppercase text-secondary group-hover/link:text-secondary-fixed-dim transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                  >
                    Book Consultation
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-secondary/60 group-hover/link:text-secondary-fixed-dim group-hover/link:translate-x-1 transition-all duration-300">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="w-16 h-[1px] bg-secondary mx-auto mb-10" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2
            className="text-[24px] md:text-[36px] lg:text-[56px] text-on-surface mb-6"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Begin Your Journey
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p
            className="text-[16px] text-on-surface-variant max-w-xl mx-auto mb-10 leading-[1.7]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Discover our curated collections — each piece a testament to the
            enduring beauty of handcraft.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <Link
            href="/collections"
            className="nav-link inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-secondary text-on-secondary rounded-none text-[12px] tracking-[0.15em] uppercase font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,169,114,0.3)] cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore Collections
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
