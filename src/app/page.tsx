"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import StatsSection from "@/components/StatsSection";

const collections = [
  {
    title: "Sarees",
    tagline: "Imperial Splendor",
    desc: "Woven gold zardozi on pure handloom mulberry silk, representing a century of Royal Indian drape.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLnC0jMc1xhqfA4gwdKmj4Pmdvp_oTy0ptNLye23_npmctrWn1UU57ABaSRgGIO6q-vEUg41zViWzc54o-dfz1--3WrLob2IuHWGWATgi2rmWFY0a5n_GKIudxvMeqSwtVjQeZ4sX2dNGzUxTzduaWihQtpiCIYmNr5TqwIZieM-fiN06ahpAy4mwmN7T0xxpPUy93vSGeqVQawGAyM3oug_dGIB2gJXnVsE0k4NEYeM209ymukYoI0bnxVKASBGBnkkoKmzF2Pww",
  },
  {
    title: "Indo-Western",
    tagline: "Contemporary Silhouette",
    desc: "Modern luxury cuts meets traditional Indian weave structures. Designed for the global runway.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD68p1JbyTDEEuS9VLDw5DlxK0zyjjRlxr_pgFP1_1DM7vnt4DdCM5es9gFto52nUkBK2rES51QwhuoRcdI8GQX1rotwSIbUfFXyj5BVN75POTJg7LSq7T_66469Tz_ugX0ClYrXsBIVKUltk-IqDdHPnBgOO4Pc7C7YP4LjtNNDXOCTYuTm5k9sIRTeQcTw6U9nz99L0G_JW2b3Ld1KlgxzgtRYlxgmkTJdqOX0M_eyLXZ0T2pCuPmpBETcDIL5HsKleoL7vtApgvh",
  },
  {
    title: "Heritage",
    tagline: "Ancestral Treasures",
    desc: "Exquisite designs meticulously preserved from archive blueprints and woven on century-old looms.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH",
  },
];

const brandLogos = [
  { name: "Gucci", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Gucci_Logo.svg" },
  { name: "Louis Vuitton", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg" },
  { name: "Chanel", logo: "https://upload.wikimedia.org/wikipedia/commons/3/35/Chanel_logo.svg" },
  { name: "Dior", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Dior_Logo.svg" },
  { name: "Hermès", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Hermes_wordmark.svg" },
  { name: "Prada", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg" },
  { name: "Valentino", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Valentino_logo.svg" },
  { name: "Balenciaga", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Balenciaga_Logo.svg" },
  { name: "Saint Laurent", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Saint_Laurent_logo.svg" },
  { name: "Bottega Veneta", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Logo_of_Bottega_Veneta.svg" },
];

export default function HomePage() {
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

  const row1 = [...brandLogos, ...brandLogos];
  const row2 = [...brandLogos.slice(5), ...brandLogos.slice(0, 5), ...brandLogos.slice(5), ...brandLogos.slice(0, 5)];

  return (
    <>
      <ScrollProgress />

      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO — Full-Screen Video Background
          ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-110"
            playsInline
            muted
            loop
            preload="metadata"
            poster="https://lh3.googleusercontent.com/aida-public/AB6AXuABKOT7_VxtfeA10zCH31yrs3VRVjrhfVuscPNrBmAGs9eY-muoRUqWFU-DAY3Zpkvv-Js00HKolwcaZ51-KK--gxUUN9quq64MU0dYmoBJX2NZujd72a3u58AIQP5uyl_wm7AhZfUKCv68xC92MijB7WxeXIETa92jQJOMV1KHDEnue8k4kpX4qtELEJboeJBekY9sXylHBkHp_IJ-eXixE7e68PCX2znXD0Wr8LEto_j8feZVqH3HASzitGfc9pRX9oBerWRYAX4"
          >
            <source
              src="https://cdn.pixabay.com/video/2025/03/17/265356_large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 text-center mt-20">
          <ScrollReveal delay={200}>
            <span
              className="text-[11px] md:text-[13px] tracking-[0.3em] text-secondary font-semibold uppercase block mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Est. 1924 &bull; A Century of Legacy
            </span>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="w-12 h-[1px] bg-secondary/40 mx-auto mb-6" />
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <h1
              className="text-[48px] md:text-[84px] font-bold text-on-surface tracking-tight max-w-5xl mx-auto leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "-0.02em" }}
            >
              Weaving the Pedigree of{" "}
              <span
                className="text-secondary italic font-light text-shine-gold"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                Indian Royalty
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={800}>
            <p
              className="text-[16px] md:text-[18px] text-on-surface-variant max-w-2xl mx-auto mt-6 leading-[1.7]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Woven on century-old looms using archive blueprints, our silks carry the weight of history and the touch of human hands. Crafted for those who value true rarity.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1000}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
              <Link
                href="/inquiry"
                className="btn-primary px-8 py-4 text-[12px] font-semibold tracking-[0.1em] uppercase w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Request Wholesale Catalog
              </Link>
              <Link
                href="/heritage"
                className="btn-secondary px-8 py-4 text-[12px] font-semibold tracking-[0.1em] uppercase w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Our Heritage
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal delay={1400} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
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
          SECTION 2: LEGACY — Stats + Brand Marquee
          ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Stats */}
        <StatsSection />

        {/* Brand Marquee */}
        <div className="py-12 md:py-16 border-b border-secondary/10">
          <ScrollReveal className="text-center mb-8 md:mb-12 px-5 md:px-20 max-w-[1440px] mx-auto">
            <h2
              className="text-[28px] md:text-[40px] mb-3 text-on-surface"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Trusted by the World&apos;s Finest Houses
            </h2>
            <p
              className="text-[14px] md:text-[16px] text-on-surface-variant"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Supplying luxury textiles to iconic fashion brands globally
            </p>
          </ScrollReveal>

          {/* Marquee Row 1 - Left to Right */}
          <div className="relative mb-4 md:mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex items-center animate-scroll-left" style={{ width: "max-content" }}>
              {row1.map((brand, i) => (
                <div key={i} className="flex-shrink-0 mx-6 md:mx-10 w-[140px] md:w-[200px] h-12 md:h-16 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-[30px] md:max-h-[44px] w-auto max-w-[100px] md:max-w-[160px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 - Right to Left */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex items-center animate-scroll-right" style={{ width: "max-content" }}>
              {row2.map((brand, i) => (
                <div key={i} className="flex-shrink-0 mx-6 md:mx-10 w-[140px] md:w-[200px] h-12 md:h-16 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-[30px] md:max-h-[44px] w-auto max-w-[100px] md:max-w-[160px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: JOURNEY — Heritage Story
          ═══════════════════════════════════════════════════ */}
      <section className="py-[100px] md:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal direction="left" className="order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden gold-border group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPXvlD2E3TYM0gRO61EKRMPkrSflh1xWQy_oKDp6AWME-YVlExUUb4uW5rHbqBCLa3Pbr4JLnMLNQiNofuoO7V5HQCPhH5_nra12Yh_s3HrfurjN3nj8oKU6pBaXpWOFIPdArFnbGGYJ4bOa-Je0-1NxINCOB0DFJxN-Af_xKEUiqltN5U3MFHdkB1YzsAK11u238E-5AlE0u6Z2F4Jh-D-oPypOJ-JLULT4C_jJFLFuXf7aGCbB16TiE-mPLn6hLK9V3wvYA3YCS7"
                alt="Heritage Loom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating Glassmorphic Gold Badge */}
              <div className="absolute bottom-6 right-6 glass-panel border-secondary/30 px-6 py-4 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <span className="text-[22px] font-bold text-secondary tracking-widest" style={{ fontFamily: "var(--font-montserrat)" }}>100</span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-[0.15em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>Years of Legacy</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="order-1 md:order-2">
            <div className="flex flex-col gap-6">
              <span
                className="text-[12px] tracking-[0.2em] text-secondary uppercase font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Est. 1924
              </span>
              <h2
                className="text-[40px] md:text-[48px] leading-[1.2] text-on-surface font-bold"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                Legacy of Threads
              </h2>
              <p
                className="text-[17px] md:text-[18px] leading-[1.8] text-on-surface-variant"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                For a century, Aksharkala has been the silent custodian of
                India&apos;s weaving heritage. Every drape tells a story of
                ancestral looms, where pure silk meets the soul of the artisan,
                crafted painstakingly to perfection.
              </p>
              <Link
                href="/heritage"
                className="nav-link text-[12px] uppercase tracking-[0.15em] text-on-surface-variant hover:text-secondary pb-2 self-start transition-colors flex items-center gap-2 group/link cursor-pointer"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                Our History
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
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: CRAFT — Featured Collections
          ═══════════════════════════════════════════════════ */}
      <section className="py-[100px] md:py-[140px] bg-surface-container-low">
        <div className="px-5 md:px-20 max-w-[1440px] mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <p
              className="text-[12px] tracking-[0.1em] uppercase text-secondary mb-4"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              Curated Excellence
            </p>
            <h2
              className="text-[40px] md:text-[48px] text-on-surface"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              The Collections
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((col, index) => (
              <ScrollReveal key={col.title} delay={index * 100}>
                <Link
                  href="/collections"
                  className="group relative overflow-hidden aspect-[3/4] gold-border hover:shadow-[0_0_40px_rgba(198,169,114,0.25)] transition-all duration-500 block cursor-pointer"
                >
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Vignette Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Luxury Hover Details Overlay */}
                  <div className="absolute inset-x-4 bottom-4 glass-panel border-secondary/20 p-6 flex flex-col justify-end translate-y-[62px] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-1">
                          {col.tagline}
                        </span>
                        <h3
                          className="text-white text-[28px] font-medium leading-tight"
                          style={{ fontFamily: "var(--font-playfair-display)" }}
                        >
                          {col.title}
                        </h3>
                      </div>
                      {/* Hover chevron icon */}
                      <div className="w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-500 mt-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="transition-transform duration-300 group-hover:-rotate-45"
                        >
                          <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded description */}
                    <p
                      className="text-[12px] leading-relaxed text-on-surface-variant/90 border-t border-secondary/10 pt-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {col.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: PROMISE — Trust Signals
          ═══════════════════════════════════════════════════ */}
      <section className="py-[100px] md:py-[140px] border-t border-secondary/10 px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <ScrollReveal className="max-w-3xl text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <h2
              className="text-[40px] md:text-[48px] text-on-surface font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              The Art of the Hand-Woven
            </h2>
            <p
              className="text-[17px] md:text-[18px] leading-[1.8] text-on-surface-variant max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Each Aksharkala piece undergoes a rigorous 300-hour weaving
              process. Our master artisans use ancestral techniques passed down through five
              generations to ensure every thread is a testament to perfection.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 w-full">
            {/* Silk Card */}
            <ScrollReveal delay={0}>
              <div className="stat-card-luxury p-8 flex flex-col items-center text-center gap-4 group cursor-default h-full">
                <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/25 group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12l4 6-10 13L2 9Z" />
                    <path d="M11 3 8 9l4 13 4-13-3-6" />
                    <path d="M2 9h20" />
                  </svg>
                </div>
                <h3 className="text-[22px] text-on-surface font-medium" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  100% Pure Silk
                </h3>
                <p className="text-[14px] leading-[1.6] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
                  Sourced from local organic farms, spun into luxury mulberry threads that offer unmatched natural luster, strength, and exquisite drape.
                </p>
              </div>
            </ScrollReveal>

            {/* Embroidery Card */}
            <ScrollReveal delay={100}>
              <div className="stat-card-luxury p-8 flex flex-col items-center text-center gap-4 group cursor-default h-full">
                <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/25 group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
                    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
                    <path d="M14.5 17.5 4.5 15" />
                  </svg>
                </div>
                <h3 className="text-[22px] text-on-surface font-medium" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  Hand Embroidered
                </h3>
                <p className="text-[14px] leading-[1.6] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
                  Intricate zardozi and fine kantha patterns created over weeks of painstaking craftsmanship by master artisans, rendering every piece unique.
                </p>
              </div>
            </ScrollReveal>

            {/* Ethical Sourcing Card */}
            <ScrollReveal delay={200}>
              <div className="stat-card-luxury p-8 flex flex-col items-center text-center gap-4 group cursor-default h-full">
                <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/25 group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <h3 className="text-[22px] text-on-surface font-medium" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  Ethical Sourcing
                </h3>
                <p className="text-[14px] leading-[1.6] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
                  Committed to transparent supply chains, sustainable materials, and fair wages that support local communities and protect weaving heritage.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: CTA — Final Call to Action
          ═══════════════════════════════════════════════════ */}
      <section className="py-[100px] md:py-[140px] px-5 md:px-20 max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="w-16 h-[1px] bg-secondary mx-auto mb-10" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2
            className="text-[36px] md:text-[48px] lg:text-[56px] text-on-surface mb-6"
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/collections"
              className="btn-primary px-8 py-4 text-[12px] tracking-[0.15em] uppercase font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Collections
            </Link>
            <Link
              href="/inquiry"
              className="btn-secondary px-8 py-4 text-[12px] tracking-[0.15em] uppercase font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Request Wholesale Catalog
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
