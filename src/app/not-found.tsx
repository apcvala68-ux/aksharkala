"use client";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-5">
      <span className="text-[64px]" style={{ color: "#534344" }}>✦</span>
      <div className="text-center">
        <h1
          className="text-[48px] md:text-[72px] font-medium mb-2"
          style={{ fontFamily: "var(--font-playfair-display)", color: "#e8e2d6" }}
        >
          404
        </h1>
        <p
          className="text-[13px] max-w-md"
          style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <a
        href="/"
        className="px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
        style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
      >
        Return Home
      </a>
    </div>
  );
}
