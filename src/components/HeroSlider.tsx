"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface MediaSlide {
  type: "image" | "video";
  url: string;
  poster?: string;
  alt?: string;
}

interface HeroContent {
  media?: MediaSlide[];
  tagline?: string;
  headline?: string;
  headlineHighlight?: string;
  subtitle?: string;
  buttons?: { text: string; link: string }[];
}

export default function HeroSlider({
  content,
  children,
}: {
  content?: HeroContent;
  children?: React.ReactNode;
}) {
  const media = content?.media || [];
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([] as (HTMLVideoElement | null)[]);

  const slides = media.length > 0 ? media : null;

  const goNext = useCallback(() => {
    if (!slides) return;
    setCurrent((p) => (p + 1) % slides.length);
  }, [slides]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  // Auto-advance every 5s, pause on hover/touch/off-screen
  useEffect(() => {
    if (!slides || slides.length < 2 || isPaused) return;
    timerRef.current = setInterval(goNext, 5000);
    return () => clearInterval(timerRef.current);
  }, [slides, slides?.length, isPaused, goNext]);

  // Pause when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setIsPaused(!entry.isIntersecting); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause video for current slide
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) v.play().catch(() => {});
      else v.pause();
    });
  }, [current]);

  const parallaxStyle = (() => {
    if (typeof window === "undefined") return {};
    const scrollY = window.scrollY;
    return { transform: `translate3d(0, ${scrollY * 0.3}px, 0)` };
  })();

  // Parallax on scroll
  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const videoEl = hero.querySelector("video, .slide-media");
        if (videoEl) {
          const sy = window.scrollY;
          (videoEl as HTMLElement).style.transform = `translate3d(0, ${sy * 0.3}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col items-center justify-end pt-28 pb-6 md:pb-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides ? (
          slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  className="absolute inset-0 w-full h-full object-cover scale-110 slide-media"
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  poster={slide.poster}
                >
                  <source src={slide.url} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.url}
                  alt={slide.alt || `Slide ${i + 1}`}
                  fill
                  className="object-cover scale-110 slide-media"
                  sizes="100vw"
                  priority={i === 0}
                />
              )}
            </div>
          ))
        ) : (
          children
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-background/15 md:bg-background/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20 text-center w-full">
        <ScrollReveal delay={200}>
          <span
            className="text-[11px] md:text-[13px] tracking-[0.3em] text-secondary font-semibold uppercase block mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {content?.tagline || "Est. 1924 — A Century of Legacy"}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="w-12 h-[1px] bg-secondary/40 mx-auto mb-6" />
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <h1
            className="text-[32px] md:text-[48px] lg:text-[84px] font-bold text-on-surface tracking-tight max-w-5xl mx-auto leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "-0.02em" }}
          >
            {content?.headline || "Weaving the Pedigree of Indian Royalty"}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={800}>
          <p
            className="text-[11px] sm:text-[13px] md:text-[14px] text-on-surface-variant max-w-xl md:max-w-[860px] mx-auto mt-4 md:mt-5 leading-[1.7]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {content?.subtitle || ""}
          </p>
        </ScrollReveal>

        {(content?.buttons?.length ?? 0) > 0 && (
          <ScrollReveal delay={1000}>
            <div className="flex flex-row justify-center items-center gap-3 sm:gap-6 pt-6 md:pt-8 w-full max-w-[420px] md:max-w-[500px] mx-auto">
              {content!.buttons!.map((btn, i) =>
                i === 0 ? (
                  <a
                    key={btn.text}
                    href={btn.link}
                    className="btn-primary flex-1 px-3 py-3 md:px-6 md:py-4 text-[10px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center cursor-pointer text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {btn.text}
                  </a>
                ) : (
                  <a
                    key={btn.text}
                    href={btn.link}
                    className="btn-secondary flex-1 px-3 py-3 md:px-6 md:py-4 text-[10px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase inline-flex items-center justify-center cursor-pointer text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {btn.text}
                  </a>
                )
              )}
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Dot indicators */}
      {slides && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: i === current ? "#C6A77D" : "rgba(255,255,255,0.3)",
                width: i === current ? 24 : 8,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
