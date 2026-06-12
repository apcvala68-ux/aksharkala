"use client";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: "rgba(234,179,8,0.15)", color: "#EAB308", label: "Pending" },
  read: { bg: "rgba(198,169,114,0.15)", color: "#C6A972", label: "Read" },
  replied: { bg: "rgba(34,197,94,0.15)", color: "#22C55E", label: "Replied" },
  closed: { bg: "rgba(83,67,68,0.3)", color: "#d9c1c2", label: "Closed" },
  quoted: { bg: "rgba(198,169,114,0.15)", color: "#C6A972", label: "Quoted" },
  confirmed: { bg: "rgba(59,130,246,0.15)", color: "#3B82F6", label: "Confirmed" },
  processing: { bg: "rgba(234,179,8,0.15)", color: "#EAB308", label: "Processing" },
  shipped: { bg: "rgba(139,92,246,0.15)", color: "#8B5CF6", label: "Shipped" },
  delivered: { bg: "rgba(34,197,94,0.15)", color: "#22C55E", label: "Delivered" },
  cancelled: { bg: "rgba(239,68,68,0.15)", color: "#EF4444", label: "Cancelled" },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: "rgba(83,67,68,0.3)", color: "#d9c1c2", label: status };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
      style={{
        fontFamily: "var(--font-inter)",
        background: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}
