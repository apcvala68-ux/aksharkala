"use client";

import { useState, ReactNode } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  emptyMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading,
  page = 1,
  totalPages = 1,
  onPageChange,
  onSort,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    const newDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(newDir);
    onSort?.(key, newDir);
  };

  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#534344" }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ borderBottom: "1px solid #534344" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold ${
                  col.sortable ? "cursor-pointer select-none" : ""
                } ${col.className || ""}`}
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#d9c1c2",
                  background: "#15130d",
                }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #534344" }}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div
                      className="h-4 rounded animate-pulse"
                      style={{ background: "#534344", width: "60%" }}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-[13px]"
                style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={i}
                className="transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: "1px solid #534344" }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-[13px] ${col.className || ""}`}
                    style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}
                  >
                    {col.render ? col.render(item) : String(item[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: "#534344" }}
        >
          <p
            className="text-[12px]"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
          >
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ color: "#d9c1c2" }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ color: "#d9c1c2" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
