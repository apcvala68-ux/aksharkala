"use client";

import { useState } from "react";

interface SizeChartProps {
  defaultTab?: "indo-western" | "lehenga";
}

const indoWesternSizes = [
  { size: "XS", chest: '32-34"', waist: '24-26"', hip: '34-36"', length: '38-40"' },
  { size: "S", chest: '34-36"', waist: '26-28"', hip: '36-38"', length: '40-42"' },
  { size: "M", chest: '36-38"', waist: '28-30"', hip: '38-40"', length: '42-44"' },
  { size: "L", chest: '38-40"', waist: '30-32"', hip: '40-42"', length: '44-46"' },
  { size: "XL", chest: '40-42"', waist: '32-34"', hip: '42-44"', length: '46-48"' },
  { size: "XXL", chest: '42-44"', waist: '34-36"', hip: '44-46"', length: '48-50"' },
];

const lehengaSizes = [
  { size: "XS", waist: '24-26"', hip: '34-36"', length: '38-40"', flare: '2.5m' },
  { size: "S", waist: '26-28"', hip: '36-38"', length: '40-42"', flare: '3m' },
  { size: "M", waist: '28-30"', hip: '38-40"', length: '42-44"', flare: '3.5m' },
  { size: "L", waist: '30-32"', hip: '40-42"', length: '44-46"', flare: '4m' },
  { size: "XL", waist: '32-34"', hip: '42-44"', length: '46-48"', flare: '4.5m' },
  { size: "XXL", waist: '34-36"', hip: '44-46"', length: '48-50"', flare: '5m' },
];

export default function SizeChart({ defaultTab = "indo-western" }: SizeChartProps) {
  const [tab, setTab] = useState<"indo-western" | "lehenga">(defaultTab);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("indo-western")}
          className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase font-semibold rounded transition-all cursor-pointer ${
            tab === "indo-western"
              ? "bg-secondary text-on-secondary"
              : "bg-surface-container text-on-surface-variant hover:text-secondary"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Indo-Western
        </button>
        <button
          onClick={() => setTab("lehenga")}
          className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase font-semibold rounded transition-all cursor-pointer ${
            tab === "lehenga"
              ? "bg-secondary text-on-secondary"
              : "bg-surface-container text-on-surface-variant hover:text-secondary"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Lehenga
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-secondary/20">
              {tab === "indo-western" ? (
                <>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Size</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Chest</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Waist</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Hip</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Length</th>
                </>
              ) : (
                <>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Size</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Waist</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Hip</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Length</th>
                  <th className="py-2 text-[11px] uppercase tracking-wider text-secondary font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Flare</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(tab === "indo-western" ? indoWesternSizes : lehengaSizes).map((row) => (
              <tr key={row.size} className="border-b border-secondary/10">
                <td className="py-2.5 text-[13px] text-on-surface font-medium" style={{ fontFamily: "var(--font-inter)" }}>{row.size}</td>
                {tab === "indo-western" ? (
                  <>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{(row as typeof indoWesternSizes[0]).chest}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.waist}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.hip}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.length}</td>
                  </>
                ) : (
                  <>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.waist}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.hip}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{row.length}</td>
                    <td className="py-2.5 text-[13px] text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>{(row as typeof lehengaSizes[0]).flare}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How to Measure */}
      <div className="mt-6 pt-4 border-t border-secondary/10">
        <p
          className="text-[12px] text-on-surface-variant/70 leading-[1.7]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="text-secondary font-semibold">How to Measure:</span> Use a soft measuring tape. For chest, measure at the fullest point. For waist, measure at the narrowest point. For hip, measure at the widest point.
        </p>
      </div>
    </div>
  );
}
