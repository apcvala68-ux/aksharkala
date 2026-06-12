"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, trend, subtitle }: StatCardProps) {
  return (
    <div
      className="p-5 rounded-xl border transition-colors"
      style={{ background: "#15130d", borderColor: "#534344" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(198,169,114,0.1)" }}
        >
          <Icon size={20} style={{ color: "#C6A972" }} />
        </div>
        {trend && (
          <span
            className="text-[12px] font-medium px-2 py-1 rounded"
            style={{
              fontFamily: "var(--font-inter)",
              color: trend.isPositive ? "#22C55E" : "#EF4444",
              background: trend.isPositive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            }}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <p
        className="text-[28px] font-semibold leading-tight"
        style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
      >
        {value}
      </p>
      <p
        className="text-[12px] tracking-[0.05em] mt-1"
        style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className="text-[11px] mt-1"
          style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
