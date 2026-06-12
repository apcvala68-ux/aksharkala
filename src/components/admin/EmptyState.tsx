"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(198,169,114,0.1)" }}
      >
        <Icon size={28} style={{ color: "#C6A972" }} />
      </div>
      <h3
        className="text-[16px] font-semibold mb-2"
        style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
      >
        {title}
      </h3>
      <p
        className="text-[13px] max-w-[320px] mb-6"
        style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
      >
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            background: "#C6A972",
            color: "#0B0B0C",
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
