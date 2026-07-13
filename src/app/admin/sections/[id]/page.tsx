"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/AdminAuthProvider";
import { useToast } from "@/components/admin/Toast";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";

interface Section {
  id: number;
  section_key: string;
  name: string;
  content: Record<string, unknown>;
  is_active: boolean;
}

export default function SectionEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { adminUser } = useAuth();
  const { toast: showToast } = useToast();
  const isViewer = adminUser?.role === "viewer";

  const [section, setSection] = useState<Section | null>(null);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSection = useCallback(async () => {
    const res = await fetch(`/api/admin/sections/${id}`);
    if (res.ok) {
      const data: Section = await res.json();
      setSection(data);
      setContent(data.content || {});
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchSection(); }, [fetchSection]);

  const updateContent = (path: string, value: unknown) => {
    setContent((prev) => {
      const keys = path.split(".");
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
          current[keys[i]] = {};
        }
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const addArrayItem = (path: string, template: Record<string, unknown>) => {
    setContent((prev) => {
      const newContent = { ...prev };
      const keys = path.split(".");
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") current[keys[i]] = {};
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...current[keys[i]] };
        current = current[keys[i]];
      }
      const arr = Array.isArray(current[keys[keys.length - 1]]) ? [...current[keys[keys.length - 1]]] : [];
      arr.push({ ...template });
      current[keys[keys.length - 1]] = arr;
      return newContent;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    setContent((prev) => {
      const newContent = { ...prev };
      const keys = path.split(".");
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") return prev;
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...current[keys[i]] };
        current = current[keys[i]];
      }
      const arr = Array.isArray(current[keys[keys.length - 1]]) ? [...current[keys[keys.length - 1]]] : [];
      arr.splice(index, 1);
      current[keys[keys.length - 1]] = arr;
      return newContent;
    });
  };

  const moveArrayItem = (path: string, from: number, to: number) => {
    setContent((prev) => {
      const newContent = { ...prev };
      const keys = path.split(".");
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== "object") return prev;
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...current[keys[i]] };
        current = current[keys[i]];
      }
      const arr = Array.isArray(current[keys[keys.length - 1]]) ? [...current[keys[keys.length - 1]]] : [];
      if (to < 0 || to >= arr.length) return prev;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      current[keys[keys.length - 1]] = arr;
      return newContent;
    });
  };

  const save = async () => {
    if (isViewer) return;
    setSaving(true);
    const res = await fetch(`/api/admin/sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("Section saved successfully", "success");
    } else {
      showToast("Failed to save section", "error");
    }
  };

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", `aksharkala/sections/${section?.section_key}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (res.ok) {
      const data = await res.json();
      callback(data.url);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
      </div>
    );
  }

  if (!section) {
    return <p style={{ color: "#d9c1c2" }}>Section not found</p>;
  }

  const renderText = (label: string, path: string, opts?: { multiline?: boolean }) => (
    <div className="mb-5">
      <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] mb-1.5" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
        {label}
      </label>
      {opts?.multiline ? (
        <textarea
          value={(getValue(path) as string) || ""}
          onChange={(e) => updateContent(path, e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border text-[13px] outline-none transition-colors"
          style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
        />
      ) : (
        <input
          type="text"
          value={(getValue(path) as string) || ""}
          onChange={(e) => updateContent(path, e.target.value)}
          className="w-full px-4 py-3 rounded-lg border text-[13px] outline-none transition-colors"
          style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
        />
      )}
    </div>
  );

  const getValue = (path: string) => {
    const keys = path.split(".");
    let current: any = content;
    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    return current;
  };

  const renderList = (label: string, path: string, fields: { key: string; label: string; type: "text" | "textarea" | "image" | "select"; options?: { value: string; label: string }[] }[], template: Record<string, unknown>) => {
    const items = Array.isArray(getValue(path)) ? (getValue(path) as any[]) : [];
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
            {label} ({items.length})
          </label>
          {!isViewer && (
            <button
              onClick={() => addArrayItem(path, template)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.05em] transition-colors cursor-pointer"
              style={{ background: "rgba(198,169,114,0.15)", color: "#C6A972", fontFamily: "var(--font-inter)" }}
            >
              <Plus size={14} /> Add
            </button>
          )}
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border p-4" style={{ borderColor: "#534344", background: "#0B0B0C" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.05em]" style={{ color: "#534344", fontFamily: "var(--font-inter)" }}>
                  #{i + 1}
                </span>
                <div className="flex items-center gap-2">
                  {i > 0 && (
                    <button
                      onClick={() => moveArrayItem(path, i, i - 1)}
                      className="p-1 rounded cursor-pointer hover:bg-white/5"
                      style={{ color: "#534344" }}
                    >
                      <GripVertical size={14} />
                    </button>
                  )}
                  {!isViewer && (
                    <button
                      onClick={() => removeArrayItem(path, i)}
                      className="p-1 rounded cursor-pointer hover:bg-red-500/10"
                      style={{ color: "#ef4444" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              {fields.map((field) => {
                const fieldPath = `${path}.${i}.${field.key}`;
                if (field.type === "image") {
                  return (
                    <div key={field.key} className="mb-3">
                      <label className="block text-[11px] mb-1" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
                        {field.label}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={(getValue(fieldPath) as string) || ""}
                          onChange={(e) => updateContent(fieldPath, e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border text-[12px] outline-none"
                          style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                          placeholder="Paste image URL or upload"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`upload-${path}-${i}-${field.key}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, (url) => updateContent(fieldPath, url));
                          }}
                        />
                        <label
                          htmlFor={`upload-${path}-${i}-${field.key}`}
                          className="px-3 py-2 rounded-lg text-[11px] font-semibold cursor-pointer whitespace-nowrap"
                          style={{ background: "rgba(198,169,114,0.15)", color: "#C6A972", fontFamily: "var(--font-inter)" }}
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  );
                }
                if (field.type === "select") {
                  return (
                    <div key={field.key} className="mb-3">
                      <label className="block text-[11px] mb-1" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
                        {field.label}
                      </label>
                      <select
                        value={(getValue(fieldPath) as string) || ""}
                        onChange={(e) => updateContent(fieldPath, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none"
                        style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                      >
                        <option value="">Select...</option>
                        {field.options?.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                return (
                  <div key={field.key} className="mb-3">
                    <label className="block text-[11px] mb-1" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={(getValue(fieldPath) as string) || ""}
                        onChange={(e) => updateContent(fieldPath, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none"
                        style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={(getValue(fieldPath) as string) || ""}
                        onChange={(e) => updateContent(fieldPath, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-[12px] outline-none"
                        style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sectionKey = section.section_key;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/sections")}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: "#d9c1c2" }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-[24px] font-bold" style={{ fontFamily: "var(--font-playfair-display)", color: "#e8e2d6" }}>
            {section.name}
          </h1>
          <p className="text-[12px]" style={{ color: "#534344", fontFamily: "var(--font-inter)" }}>
            {section.section_key}
          </p>
        </div>
      </div>

      {/* Editor */}
      {sectionKey === "hero" && (
        <>
          {renderList("Media Slides", "media", [
            { key: "type", label: "Type", type: "select", options: [{ value: "image", label: "Image" }, { value: "video", label: "Video" }] },
            { key: "url", label: "Image/Video URL", type: "image" },
            { key: "poster", label: "Video Poster", type: "image" },
            { key: "alt", label: "Alt Text", type: "text" },
          ], { type: "image", url: "", alt: "" })}
          {renderText("Tagline", "tagline")}
          {renderText("Headline", "headline")}
          {renderText("Headline Highlight", "headlineHighlight")}
          {renderText("Subtitle", "subtitle", { multiline: true })}
          {renderList("Buttons", "buttons", [
            { key: "text", label: "Button Text", type: "text" },
            { key: "link", label: "Button Link", type: "text" },
          ], { text: "", link: "" })}
        </>
      )}

      {sectionKey === "journey" && (
        <>
          {renderText("Tagline", "tagline")}
          {renderText("Headline", "headline")}
          {renderText("Body", "body", { multiline: true })}
          <div className="mb-5">
            <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] mb-1.5" style={{ color: "#d9c1c2", fontFamily: "var(--font-inter)" }}>
              Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={(getValue("image") as string) || ""}
                onChange={(e) => updateContent("image", e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border text-[13px] outline-none"
                style={{ background: "#0B0B0C", borderColor: "#534344", color: "#e8e2d6", fontFamily: "var(--font-inter)" }}
                placeholder="Image URL"
              />
              <input type="file" accept="image/*" className="hidden" id="upload-journey-image" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, (url) => updateContent("image", url));
              }} />
              <label htmlFor="upload-journey-image" className="px-4 py-3 rounded-lg text-[12px] font-semibold cursor-pointer" style={{ background: "rgba(198,169,114,0.15)", color: "#C6A972", fontFamily: "var(--font-inter)" }}>
                Upload
              </label>
            </div>
          </div>
          {renderText("Badge Number", "badge.number")}
          {renderText("Badge Text", "badge.text")}
          {renderText("Link Text", "link.text")}
          {renderText("Link URL", "link.url")}
        </>
      )}

      {sectionKey === "craft" && (
        <>
          {renderText("Tagline", "tagline")}
          {renderText("Headline", "headline")}
          {renderList("Collection Cards", "cards", [
            { key: "title", label: "Title", type: "text" },
            { key: "tagline", label: "Tagline", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "image", label: "Image", type: "image" },
            { key: "link", label: "Link", type: "text" },
          ], { title: "", tagline: "", description: "", image: "", link: "/collections" })}
        </>
      )}

      {sectionKey === "promise" && (
        <>
          {renderText("Headline", "headline")}
          {renderText("Subtitle", "subtitle", { multiline: true })}
          {renderList("Trust Cards", "cards", [
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "icon", label: "Icon", type: "select", options: [
              { value: "diamond", label: "Diamond / Silk" },
              { value: "feather", label: "Feather / Embroidery" },
              { value: "heart", label: "Heart / Ethical" },
            ]},
          ], { title: "", description: "", icon: "diamond" })}
        </>
      )}

      {sectionKey === "cta" && (
        <>
          {renderText("Headline", "headline")}
          {renderText("Subtitle", "subtitle", { multiline: true })}
          {renderList("Buttons", "buttons", [
            { key: "text", label: "Button Text", type: "text" },
            { key: "link", label: "Button Link", type: "text" },
          ], { text: "", link: "" })}
        </>
      )}

      {/* Save */}
      {!isViewer && (
        <div className="flex justify-end pt-6 border-t mt-8" style={{ borderColor: "#534344" }}>
          <button
            onClick={save}
            disabled={saving}
            className="px-8 py-3 rounded-lg text-[12px] font-semibold uppercase tracking-[0.1em] transition-all cursor-pointer disabled:opacity-50"
            style={{ background: "#C6A972", color: "#0B0B0C", fontFamily: "var(--font-inter)" }}
          >
            {saving ? "Saving..." : "Save Section"}
          </button>
        </div>
      )}
    </div>
  );
}
