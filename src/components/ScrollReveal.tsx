"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const getTransform = (progress: number) => {
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const offset = (1 - ease) * distance;

      switch (direction) {
        case "up":
          return `translateY(${offset}px)`;
        case "down":
          return `translateY(-${offset}px)`;
        case "left":
          return `translateX(${offset}px)`;
        case "right":
          return `translateX(-${offset}px)`;
        default:
          return `translateY(${offset}px)`;
      }
    };

    // Set initial state — promote to GPU layer
    el.style.opacity = "0";
    el.style.transform = getTransform(0);
    el.style.willChange = "opacity, transform";
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = getTransform(1);
            // Free GPU layer after animation completes
            setTimeout(() => {
              el.style.willChange = "auto";
            }, duration + delay + 50);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, direction, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
