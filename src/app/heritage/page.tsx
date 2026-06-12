"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import VideoPlayer from "@/components/VideoPlayer";
import Timeline from "@/components/Timeline";

export default function HeritagePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero video parallax on scroll — synced with Lenis via RAF
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const videoEl = hero.querySelector("video");
        if (videoEl) {
          videoEl.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pause hero video when off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO — Full-Screen Video Background
          ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-dvh flex items-end pb-20 md:pb-28 overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-110"
            playsInline
            muted
            loop
            poster="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ymnwffDtQnMSKng6PDaxjGxaxvSKZMLKhQyHpquezGy9xhjKFX3EzYLN-xzhAkPGygrM5S1Y2Q63Ul3Qh9qaK-vN7y5wrB9Eb5nYjhi2MbNdqAonEa9QwiroIZ6-ImxpeljHr1C1ExgdmJdBYY7G1O0G-9ITpYXsB5pFvWxCzT5z1LWnYJJOLyHSvLjmqdOyojh84EtYiA_ValH-1Qmyk7w_uq7V074iSKH5MANcDB8RMoKHVMQMgkXOqbndvUfrs583AIjPmOoE"
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-background/30" />
        </div>

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
              className="text-[28px] md:text-[48px] lg:text-[72px] xl:text-[88px] text-on-surface max-w-4xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Woven in threads
              <br />
              of time and tradition.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <p
              className="text-[15px] md:text-[16px] lg:text-[17px] text-on-surface-variant max-w-xl mt-6 leading-[1.7]"
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

      {/* ═══════════════════════════════════════════════════
          SECTION 2: EDITORIAL INTRO — Parallax Text Reveal
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-3 text-center">
            {/* Gold decorative line */}
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

      {/* ═══════════════════════════════════════════════════
          SECTION 3: THE ART OF THE WEAVE — Split Screen
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-[100px] lg:py-[140px] bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
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

            {/* Text */}
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
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: VIDEO — Immersive Full-Width Player
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <VideoPlayer
            title="The Making of a Saree"
            subtitle="A visual journey through our atelier — from raw silk to finished masterpiece."
            poster="https://lh3.googleusercontent.com/aida-public/AB6AXuBad5CRTaYA0nptRb6Oed0C8zjN8wb9sg7KcFz1u5Ibl4uPbpb92G8SR3BNbHiq0OrvvnSUyMd8vsWN4NsHPPxxkn2rXX_6eQQGoULscfTdPxMr369fEljkLeLx0z50eoG7W4ym_BxHeC6LIiSyyL1oIxVSFyjc60IF-3J0xC0tYwc6UTH3fIA-I0h9upc1tPxNwh_4ZHFzxrq3porbyT0KA9nbcVWD6wZ-ztQPi7AApjORXXO5LUv_266TF8v002dA6K-aKrHqPLZy"
          />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: TIMELINE — Scroll-Triggered Journey
          ═══════════════════════════════════════════════════ */}
      <section className="bg-surface-container-low">
        <Timeline />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: BENTO GRID — Enhanced Cards
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-[100px] lg:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sustainability Card */}
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-secondary/40 group-hover/link:text-secondary group-hover/link:translate-x-1 transition-all duration-300"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Bespoke Card */}
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-secondary/60 group-hover/link:text-secondary-fixed-dim group-hover/link:translate-x-1 transition-all duration-300"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7: CTA — Final Call to Action
          ═══════════════════════════════════════════════════ */}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
