"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArrowLeft, Check, Clock, Truck, Package, XCircle } from "lucide-react";

interface Order {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: string;
  total_value: number;
  currency: string;
  quantity: number;
  notes: string;
  created_at: string;
  updated_at: string;
  products?: { title: string; category: string; images: string[] };
}

const statusWorkflow = ["quoted", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const statusIcons: Record<string, typeof Check> = {
  quoted: Clock,
  confirmed: Check,
  processing: Package,
  shipped: Truck,
  delivered: Check,
  cancelled: XCircle,
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/admin/orders/${id}`);
      const data = await res.json();
      setOrder(data.order);
      setLoading(false);
    }
    fetchOrder();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20" style={{ color: "#534344" }}>Order not found</div>;
  }

  const currentIdx = statusWorkflow.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-[800px]">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[13px] cursor-pointer hover:underline"
        style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
            Order #{order.id}
          </h1>
          <p className="text-[13px] mt-1" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            {order.company_name}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Timeline */}
      <div className="rounded-xl border p-5" style={{ background: "#15130d", borderColor: "#534344" }}>
        <h2 className="text-[14px] font-semibold mb-4" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
          Order Status
        </h2>
        <div className="flex flex-wrap gap-2">
          {statusWorkflow.map((s, i) => {
            const Icon = statusIcons[s] || Clock;
            const isActive = order.status === s;
            const isPast = currentIdx >= 0 && i < currentIdx && s !== "cancelled";
            return (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={updating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer disabled:opacity-40"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: isActive ? "rgba(198,169,114,0.15)" : isPast ? "rgba(34,197,94,0.1)" : "transparent",
                  color: isActive ? "#C6A972" : isPast ? "#22C55E" : "#d9c1c2",
                  border: `1px solid ${isActive ? "rgba(198,169,114,0.3)" : isPast ? "rgba(34,197,94,0.2)" : "#534344"}`,
                }}
              >
                <Icon size={14} />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-5" style={{ background: "#15130d", borderColor: "#534344" }}>
          <h2 className="text-[14px] font-semibold mb-3" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
            Contact
          </h2>
          <div className="space-y-2 text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
            <p style={{ color: "#e8e2d6" }}>{order.contact_name}</p>
            <p style={{ color: "#d9c1c2" }}>{order.email}</p>
            <p style={{ color: "#d9c1c2" }}>{order.phone || "No phone"}</p>
          </div>
        </div>
        <div className="rounded-xl border p-5" style={{ background: "#15130d", borderColor: "#534344" }}>
          <h2 className="text-[14px] font-semibold mb-3" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
            Order Details
          </h2>
          <div className="space-y-2 text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
            <p style={{ color: "#d9c1c2" }}>Product: <span style={{ color: "#e8e2d6" }}>{order.products?.title || "-"}</span></p>
            <p style={{ color: "#d9c1c2" }}>Quantity: <span style={{ color: "#e8e2d6" }}>{order.quantity || "-"}</span></p>
            <p style={{ color: "#d9c1c2" }}>Value: <span style={{ color: "#22C55E" }}>{order.total_value ? `₹${order.total_value.toLocaleString()}` : "-"}</span></p>
            <p style={{ color: "#d9c1c2" }}>Created: <span style={{ color: "#e8e2d6" }}>{new Date(order.created_at).toLocaleString()}</span></p>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className="rounded-xl border p-5" style={{ background: "#15130d", borderColor: "#534344" }}>
          <h2 className="text-[14px] font-semibold mb-3" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
            Notes
          </h2>
          <p className="text-[13px] whitespace-pre-wrap" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            {order.notes}
          </p>
        </div>
      )}
    </div>
  );
}
