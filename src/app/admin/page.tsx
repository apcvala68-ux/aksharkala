"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { MessageSquare, ShoppingCart, TrendingUp, Package, Plus, ArrowRight } from "lucide-react";

interface DashboardStats {
  totalInquiries: number;
  pendingInquiries: number;
  totalOrders: number;
  totalProducts: number;
  conversionRate: number;
  recentInquiries: Array<{
    id: number;
    company_name: string;
    contact_name: string;
    status: string;
    created_at: string;
    products?: { title: string };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    pendingInquiries: 0,
    totalOrders: 0,
    totalProducts: 0,
    conversionRate: 0,
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [inquiriesRes, ordersRes, productsRes] = await Promise.all([
          fetch("/api/admin/analytics?type=inquiries"),
          fetch("/api/admin/analytics?type=orders"),
          fetch("/api/admin/analytics?type=products"),
        ]);

        const inquiries = await inquiriesRes.json();
        const orders = await ordersRes.json();
        const products = await productsRes.json();

        const totalInq = inquiries.total || 0;
        const totalOrd = orders.total || 0;
        setStats({
          totalInquiries: totalInq,
          pendingInquiries: inquiries.pending || 0,
          totalOrders: totalOrd,
          totalProducts: products.total || 0,
          conversionRate: totalInq > 0 ? Math.round((totalOrd / totalInq) * 100) : 0,
          recentInquiries: inquiries.recent || [],
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="text-[24px] md:text-[28px] font-semibold"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Dashboard
          </h1>
          <p
            className="text-[13px] mt-1"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
          >
            Welcome back. Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            background: "#C6A972",
            color: "#0B0B0C",
          }}
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          icon={MessageSquare}
          subtitle={`${stats.pendingInquiries} pending`}
        />
        <StatCard
          title="Active Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
        />
        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={Package}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          subtitle="Inquiries to orders"
        />
      </div>

      {/* Recent Inquiries */}
      <div
        className="rounded-xl border"
        style={{ background: "#15130d", borderColor: "#534344" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#534344" }}>
          <h2
            className="text-[15px] font-semibold"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Recent Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-[12px] transition-colors cursor-pointer hover:underline"
            style={{ fontFamily: "var(--font-inter)", color: "#C6A972" }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div
              className="w-6 h-6 border-2 rounded-full animate-spin mx-auto"
              style={{ borderColor: "#534344", borderTopColor: "#C6A972" }}
            />
          </div>
        ) : stats.recentInquiries.length === 0 ? (
          <div className="p-8 text-center">
            <p
              className="text-[13px]"
              style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
            >
              No inquiries yet
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#534344" }}>
            {stats.recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries/${inquiry.id}`}
                className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-semibold shrink-0"
                    style={{ background: "#584416", color: "#C6A972" }}
                  >
                    {inquiry.company_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[13px] font-medium truncate"
                      style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}
                    >
                      {inquiry.company_name}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
                    >
                      {inquiry.contact_name} &middot; {inquiry.products?.title || "General inquiry"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={inquiry.status} size="sm" />
                  <span
                    className="text-[11px] hidden md:block"
                    style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
                  >
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
