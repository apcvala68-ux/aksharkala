"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-5">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "rgba(239,68,68,0.1)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="text-center">
        <h2
          className="text-[20px] md:text-[24px] font-medium mb-2"
          style={{ fontFamily: "var(--font-playfair-display)", color: "#e8e2d6" }}
        >
          Something went wrong
        </h2>
        <p
          className="text-[13px] max-w-md"
          style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
        >
          An unexpected error occurred. Please try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer"
        style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
      >
        Try Again
      </button>
    </div>
  );
}
