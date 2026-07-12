"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "%", label: "Sustainable" },
];

function AnimatedCounter({ value, prefix = "", suffix, isVisible }: { value: number; prefix?: string; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const duration = 800;
    const startTime = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    }

    requestAnimationFrame(tick);
  }, [isVisible, value]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-0 border-t border-b border-secondary/20 bg-surface-container-low/40 relative overflow-hidden"
    >
      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(198,169,114,0.03)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20 relative z-10 scroll-reveal">
        <div className="grid grid-cols-2 gap-3 items-stretch">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center p-4 md:p-5 stat-card-luxury group cursor-default fade-in-up ${
                visible ? "is-visible" : ""
              } ${
                i > 0 ? `delay-${i * 100}` : ""
              } ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
            >
              {/* Desktop vertical divider */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-secondary/15 group-hover:opacity-0 transition-opacity duration-300" />
              )}
              
              <span
                className="text-[22px] md:text-[32px] lg:text-[42px] font-bold text-secondary transition-all duration-500 group-hover:text-shadow-gold group-hover:scale-105"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isVisible={visible} />
              </span>
              <span
                className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-on-surface-variant text-center transition-colors duration-500 group-hover:text-secondary mt-2 font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
