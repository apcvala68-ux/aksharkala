"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, folder = "aksharkala/products", maxImages = 8 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (images.length + newUrls.length >= maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        break;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Upload failed");
          continue;
        }

        newUrls.push(data.url);
      } catch {
        setError("Upload failed");
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div
            key={i}
            className="relative w-20 h-20 rounded-lg overflow-hidden border group"
            style={{ borderColor: "#534344" }}
          >
            <Image
              src={url}
              alt={`Upload ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              style={{ background: "rgba(0,0,0,0.7)", color: "#EF4444" }}
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-20 h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer hover:border-[#C6A972] disabled:opacity-50"
            style={{ borderColor: "#534344", color: "#534344" }}
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
            ) : (
              <>
                <Upload size={16} />
                <span className="text-[9px]">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      {error && (
        <p className="text-[12px]" style={{ color: "#EF4444" }}>{error}</p>
      )}

      <p className="text-[11px]" style={{ color: "#534344" }}>
        {images.length}/{maxImages} images &middot; JPEG, PNG, WebP, GIF &middot; Max 10MB each
      </p>
    </div>
  );
}
