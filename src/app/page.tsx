"use client";

import { useEffect, useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default function HomePage() {
  const [sections, setSections] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sections")
      .then((r) => r.json())
      .then((data) => { setSections(data); })
      .catch(() => { setSections(null); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ScrollProgress />
      {loading ? (
        <div className="min-h-dvh flex items-center justify-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
        </div>
      ) : (
        <SectionRenderer sections={sections as any} />
      )}
    </>
  );
}
