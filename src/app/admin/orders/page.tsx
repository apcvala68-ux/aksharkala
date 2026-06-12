"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import { Modal } from "@/components/admin/Modal";
import { ShoppingCart, Plus, Eye } from "lucide-react";

interface Order {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  status: string;
  total_value: number;
  currency: string;
  created_at: string;
  products?: { title: string };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "10", status });
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  const columns: Column<Order>[] = [
    {
      key: "id",
      label: "Order #",
      sortable: true,
      render: (item) => <span className="font-medium" style={{ color: "#C6A972" }}>#{item.id}</span>,
    },
    {
      key: "company_name",
      label: "Company",
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-medium" style={{ color: "#e8e2d6" }}>{item.company_name}</p>
          <p className="text-[11px]" style={{ color: "#534344" }}>{item.contact_name}</p>
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      render: (item) => item.products?.title || "-",
    },
    {
      key: "total_value",
      label: "Value",
      sortable: true,
      render: (item) => (
        <span style={{ color: item.total_value ? "#22C55E" : "#534344" }}>
          {item.total_value ? `₹${item.total_value.toLocaleString()}` : "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: "created_at",
      label: "Date",
      sortable: true,
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      key: "view",
      label: "",
      className: "w-[60px]",
      render: (item) => (
        <Link
          href={`/admin/orders/${item.id}`}
          className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5 inline-flex"
          style={{ color: "#d9c1c2" }}
        >
          <Eye size={14} />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-[24px] md:text-[28px] font-semibold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
        >
          Orders
        </h1>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
        >
          <Plus size={16} /> New Order
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["", "quoted", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setStatus(tab); setPage(1); }}
            className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
              status === tab ? "" : "hover:bg-white/5"
            }`}
            style={{
              fontFamily: "var(--font-inter)",
              background: status === tab ? "rgba(198,169,114,0.15)" : "transparent",
              color: status === tab ? "#C6A972" : "#d9c1c2",
              border: status === tab ? "1px solid rgba(198,169,114,0.3)" : "1px solid transparent",
            }}
          >
            {tab === "" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {orders.length === 0 && !loading ? (
        <EmptyState
          icon={ShoppingCart}
          title="No orders yet"
          description="Orders will appear here when created from inquiries."
        />
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Create Order Modal */}
      <CreateOrderModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); fetchOrders(); }} />
    </div>
  );
}

function CreateOrderModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    company_name: "", contact_name: "", email: "", phone: "", quantity: "", notes: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, quantity: form.quantity ? parseInt(form.quantity) : null }),
    });
    setSaving(false);
    onCreated();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Order">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Company *" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} />
        <Input label="Contact Name *" value={form.contact_name} onChange={(v) => setForm({ ...form, contact_name: v })} />
        <Input label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
        <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Input label="Quantity" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} type="number" />
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none resize-none"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer hover:bg-white/5" style={{ color: "#d9c1c2", border: "1px solid #534344" }}>
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer disabled:opacity-50" style={{ background: "#C6A972", color: "#0B0B0C" }}>
            {saving ? "Creating..." : "Create Order"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
        style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
      />
    </div>
  );
}
