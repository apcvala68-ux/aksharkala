"use client";

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <CheckCircle size={16} style={{ color: "#22C55E" }} />,
    error: <XCircle size={16} style={{ color: "#EF4444" }} />,
    info: <Info size={16} style={{ color: "#3B82F6" }} />,
  };

  const bgColors = {
    success: "rgba(34,197,94,0.1)",
    error: "rgba(239,68,68,0.1)",
    info: "rgba(59,130,246,0.1)",
  };

  const borderColors = {
    success: "rgba(34,197,94,0.3)",
    error: "rgba(239,68,68,0.3)",
    info: "rgba(59,130,246,0.3)",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-[360px]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-lg animate-[slideIn_0.3s_ease-out]"
            style={{
              fontFamily: "var(--font-inter)",
              background: bgColors[t.type],
              borderColor: borderColors[t.type],
            }}
          >
            {icons[t.type]}
            <span className="text-[13px] flex-1" style={{ color: "#e8e2d6" }}>
              {t.message}
            </span>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 p-0.5 cursor-pointer hover:opacity-70 transition-opacity"
              style={{ color: "#d9c1c2" }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
