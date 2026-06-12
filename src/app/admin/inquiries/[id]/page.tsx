"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useAuth } from "@/components/admin/AdminAuthProvider";
import { ArrowLeft, Mail, Phone, Building2, User, Calendar, ExternalLink, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  product_id: number;
  created_at: string;
  products?: { title: string; category: string; fabric: string };
}

const statuses = ["pending", "read", "replied", "closed"];

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { adminUser } = useAuth();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [converting, setConverting] = useState(false);

  const isViewer = adminUser?.role === "viewer";

  useEffect(() => {
    async function fetchInquiry() {
      const res = await fetch(`/api/admin/inquiries/${id}`);
      const data = await res.json();
      setInquiry(data.inquiry);
      setLoading(false);
    }
    fetchInquiry();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    setUpdating(false);
  };

  const convertToOrder = async () => {
    if (!inquiry) return;
    setConverting(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: inquiry.company_name,
          contact_name: inquiry.contact_name,
          email: inquiry.email,
          phone: inquiry.phone,
          product_id: inquiry.product_id || null,
          notes: `Converted from inquiry #${inquiry.id}. ${inquiry.message || ""}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        await updateStatus("replied");
        router.push(`/admin/orders/${data.order.id}`);
      }
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "#534344" }}>Inquiry not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[800px]">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[13px] transition-colors cursor-pointer hover:underline"
        style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
      >
        <ArrowLeft size={16} /> Back to Inquiries
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1
            className="text-[24px] md:text-[28px] font-semibold"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            {inquiry.company_name}
          </h1>
          <p className="text-[13px] mt-1" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Inquiry #{inquiry.id}
          </p>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>

      {/* Contact Info Card */}
      <div
        className="rounded-xl border p-5 space-y-4"
        style={{ background: "#15130d", borderColor: "#534344" }}
      >
        <h2
          className="text-[14px] font-semibold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
        >
          Contact Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow icon={User} label="Contact" value={inquiry.contact_name} />
          <InfoRow icon={Building2} label="Company" value={inquiry.company_name} />
          <InfoRow icon={Mail} label="Email" value={inquiry.email} />
          <InfoRow icon={Phone} label="Phone" value={inquiry.phone || "Not provided"} />
          <InfoRow icon={Calendar} label="Date" value={new Date(inquiry.created_at).toLocaleString()} />
        </div>
      </div>

      {/* Product */}
      {inquiry.products && (
        <div
          className="rounded-xl border p-5"
          style={{ background: "#15130d", borderColor: "#534344" }}
        >
          <h2
            className="text-[14px] font-semibold mb-3"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Product
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium" style={{ color: "#e8e2d6" }}>
                {inquiry.products.title}
              </p>
              <p className="text-[12px] mt-1" style={{ color: "#534344" }}>
                {inquiry.products.category} &middot; {inquiry.products.fabric}
              </p>
            </div>
            <Link
              href={`/product/${inquiry.product_id}`}
              target="_blank"
              className="flex items-center gap-1 text-[12px] transition-colors cursor-pointer hover:underline"
              style={{ fontFamily: "var(--font-inter)", color: "#C6A972" }}
            >
              View <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* Message */}
      {inquiry.message && (
        <div
          className="rounded-xl border p-5"
          style={{ background: "#15130d", borderColor: "#534344" }}
        >
          <h2
            className="text-[14px] font-semibold mb-3"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Message
          </h2>
          <p
            className="text-[14px] leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
          >
            {inquiry.message}
          </p>
        </div>
      )}

      {/* Status Actions */}
      {!isViewer && (
        <div
          className="rounded-xl border p-5"
          style={{ background: "#15130d", borderColor: "#534344" }}
        >
          <h2
            className="text-[14px] font-semibold mb-4"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Change Status
          </h2>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={updating || inquiry.status === s}
                className="px-4 py-2 rounded-lg text-[12px] font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: inquiry.status === s ? "rgba(198,169,114,0.15)" : "transparent",
                  color: inquiry.status === s ? "#C6A972" : "#d9c1c2",
                  border: `1px solid ${inquiry.status === s ? "rgba(198,169,114,0.3)" : "#534344"}`,
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`mailto:${inquiry.email}?subject=Re: Inquiry #${inquiry.id} - Aksharkala`}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
        >
          <Mail size={16} /> Reply via Email
        </a>
        {!isViewer && (
          <>
            <button
              onClick={() => updateStatus("replied")}
              disabled={updating}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "var(--font-inter)", border: "1px solid #534344", color: "#d9c1c2" }}
            >
              Mark as Replied
            </button>
            <button
              onClick={convertToOrder}
              disabled={converting}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "var(--font-inter)", background: "#22C55E", color: "#0B0B0C" }}
            >
              <ShoppingCart size={16} /> {converting ? "Converting..." : "Convert to Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0" style={{ color: "#534344" }} />
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-inter)", color: "#534344" }}>
          {label}
        </p>
        <p className="text-[13px] mt-0.5" style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}>
          {value}
        </p>
      </div>
    </div>
  );
}
