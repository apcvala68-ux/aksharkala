"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import { MessageSquare, Search } from "lucide-react";

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  products?: { title: string };
}

const statusTabs = ["", "pending", "read", "replied", "closed"];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchInquiries = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      search,
      status,
      sort,
      order: sortOrder,
    });
    const res = await fetch(`/api/admin/inquiries?${params}`);
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, search, status, sort, sortOrder]);

  const columns: Column<Inquiry>[] = [
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
      <h1
        className="text-[24px] md:text-[28px] font-semibold"
        style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
      >
        Inquiries
      </h1>

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

      {/* Search */}
      <div className="relative">
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
    </div>
  );
}
