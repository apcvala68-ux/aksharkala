"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/admin/AdminAuthProvider";

interface Section {
  id: number;
  section_key: string;
  name: string;
  is_active: boolean;
  updated_at: string;
}

const ICON_MAP: Record<string, string> = {
  hero: "🎬",
  journey: "📖",
  craft: "🎨",
  promise: "🛡️",
  cta: "🎯",
};

export default function SectionsPage() {
  const { adminUser } = useAuth();
  const isViewer = adminUser?.role === "viewer";
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = useCallback(async () => {
    const res = await fetch("/api/admin/sections");
    if (res.ok) setSections(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  const toggleActive = async (section: Section) => {
    const res = await fetch(`/api/admin/sections/${section.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !section.is_active }),
    });
    if (res.ok) fetchSections();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold" style={{ fontFamily: "var(--font-playfair-display)", color: "#e8e2d6" }}>
            Sections
          </h1>
          <p className="text-[13px] mt-1" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
            Manage all homepage content sections
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-xl border p-5 flex items-center justify-between transition-colors hover:bg-white/[0.02]"
            style={{ borderColor: "#534344", background: "#15130d" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{ICON_MAP[section.section_key] || "📄"}</span>
              <div>
                <Link
                  href={`/admin/sections/${section.id}`}
                  className="text-[15px] font-semibold hover:underline"
                  style={{ color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                >
                  {section.name}
                </Link>
                <p className="text-[11px] mt-0.5" style={{ color: "#534344", fontFamily: "var(--font-inter)" }}>
                  {section.section_key} &middot; Updated {new Date(section.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!isViewer && (
                <button
                  onClick={() => toggleActive(section)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer"
                  style={{
                    background: section.is_active ? "#C6A972" : "#534344",
                  }}
                  aria-label={`Toggle ${section.name}`}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
                    style={{ transform: section.is_active ? "translateX(6px)" : "translateX(2px)" }}
                  />
                </button>
              )}
              <Link
                href={`/admin/sections/${section.id}`}
                className="px-4 py-2 text-[12px] font-semibold tracking-[0.05em] uppercase rounded-lg transition-colors cursor-pointer"
                style={{
                  background: "rgba(198,169,114,0.15)",
                  color: "#C6A972",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
