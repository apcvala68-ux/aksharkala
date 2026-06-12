"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  loading,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-[400px] rounded-xl border p-6"
        style={{ background: "#15130d", borderColor: "#534344" }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <AlertTriangle size={20} style={{ color: "#EF4444" }} />
          </div>
          <div>
            <h3
              className="text-[16px] font-semibold mb-1"
              style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
            >
              {title}
            </h3>
            <p
              className="text-[13px]"
              style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
            >
              {message}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer hover:bg-white/5 disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2", border: "1px solid #534344" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer disabled:opacity-50"
            style={{
              fontFamily: "var(--font-inter)",
              background: "#EF4444",
              color: "#fff",
            }}
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
