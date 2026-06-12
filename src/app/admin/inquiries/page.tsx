"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useAuth } from "@/components/admin/AdminAuthProvider";
import { MessageSquare, Search, Download, CheckSquare, X } from "lucide-react";

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  selected?: boolean;
  products?: { title: string };
}

const statusTabs = ["", "pending", "read", "replied", "closed"];

export default function InquiriesPage() {
  const { adminUser } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);

  const isViewer = adminUser?.role === "viewer";

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      search,
      status,
      sort,
      order: sortOrder,
    });
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    const res = await fetch(`/api/admin/inquiries?${params}`);
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [page, search, status, sort, sortOrder, dateFrom, dateTo]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleExportCSV = () => {
    const headers = ["ID", "Company", "Contact", "Email", "Phone", "Product", "Status", "Date"];
    const rows = inquiries.map((i) => [
      i.id, i.company_name, i.contact_name, i.email, i.phone || "",
      i.products?.title || "General", i.status, new Date(i.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === inquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(inquiries.map((i) => i.id));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedIds.length === 0) return;
    setBulkLoading(true);
    await Promise.all(
      selectedIds.map((id) =>
        fetch(`/api/admin/inquiries/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: bulkAction }),
        })
      )
    );
    setSelectedIds([]);
    setBulkAction("");
    setShowBulkConfirm(false);
    setBulkLoading(false);
    fetchInquiries();
  };

  const columns: Column<Inquiry>[] = [
    ...(!isViewer
      ? [{
          key: "select",
          label: "",
          className: "w-[40px]",
          render: (item: Inquiry) => (
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
              className="w-4 h-4 rounded cursor-pointer accent-[#C6A972]"
            />
          ),
        }]
      : []),
    {
      key: "company_name",
      label: "Company",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-semibold shrink-0"
            style={{ background: "#584416", color: "#C6A972" }}
          >
            {item.company_name.charAt(0)}
          </div>
          <div>
            <p className="font-medium" style={{ color: "#e8e2d6" }}>{item.company_name}</p>
            <p className="text-[11px]" style={{ color: "#534344" }}>{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact_name",
      label: "Contact",
      sortable: true,
      render: (item) => item.contact_name,
    },
    {
      key: "product",
      label: "Product",
      render: (item) => item.products?.title || "General inquiry",
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
          href={`/admin/inquiries/${item.id}`}
          className="text-[12px] font-medium transition-colors cursor-pointer hover:underline"
          style={{ fontFamily: "var(--font-inter)", color: "#C6A972" }}
        >
          View
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
          Inquiries
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", border: "1px solid #534344", color: "#d9c1c2" }}
          >
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {!isViewer && selectedIds.length > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg border"
          style={{ background: "rgba(198,169,114,0.08)", borderColor: "rgba(198,169,114,0.3)" }}
        >
          <CheckSquare size={16} style={{ color: "#C6A972" }} />
          <span className="text-[13px] font-medium" style={{ color: "#C6A972" }}>
            {selectedIds.length} selected
          </span>
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] outline-none cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          >
            <option value="">Bulk action...</option>
            <option value="read">Mark as Read</option>
            <option value="replied">Mark as Replied</option>
            <option value="closed">Mark as Closed</option>
          </select>
          <button
            onClick={() => bulkAction && setShowBulkConfirm(true)}
            disabled={!bulkAction}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer disabled:opacity-40"
            style={{ background: "#C6A972", color: "#0B0B0C" }}
          >
            Apply
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="p-1 rounded-lg cursor-pointer hover:bg-white/5"
            style={{ color: "#d9c1c2" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statusTabs.map((tab) => (
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

      {/* Search + Date Range */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#534344" }} />
          <input
            type="text"
            placeholder="Search by company, contact, or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg text-[13px] outline-none"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          />
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-lg text-[13px] outline-none"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-lg text-[13px] outline-none"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        />
      </div>

      {/* Table */}
      {inquiries.length === 0 && !loading ? (
        <EmptyState
          icon={MessageSquare}
          title="No inquiries yet"
          description="Inquiries from customers will appear here."
        />
      ) : (
        <DataTable
          columns={columns}
          data={inquiries}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSort={(key, dir) => { setSort(key); setSortOrder(dir); }}
        />
      )}

      {/* Bulk Confirm */}
      <ConfirmDialog
        open={showBulkConfirm}
        onClose={() => setShowBulkConfirm(false)}
        onConfirm={handleBulkAction}
        title={`Bulk: Mark as ${bulkAction}`}
        message={`This will update ${selectedIds.length} inquiry status(es) to "${bulkAction}". Continue?`}
        loading={bulkLoading}
      />
    </div>
  );
}
