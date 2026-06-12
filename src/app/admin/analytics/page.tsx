"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { MessageSquare, ShoppingCart, IndianRupee, TrendingUp, Package } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

interface AnalyticsData {
  inquiries: { total: number; pending: number; replied: number; closed: number };
  orders: { total: number; revenue: number };
  products: { total: number };
  recentInquiries: Array<{ created_at: string; status: string }>;
}

const COLORS = ["#C6A972", "#22C55E", "#3B82F6", "#EAB308", "#EF4444", "#8B5CF6"];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [inquiriesRes, ordersRes, productsRes] = await Promise.all([
          fetch("/api/admin/analytics?type=inquiries"),
          fetch("/api/admin/analytics?type=orders"),
          fetch("/api/admin/analytics?type=products"),
        ]);
        const inquiries = await inquiriesRes.json();
        const orders = await ordersRes.json();
        const products = await productsRes.json();
        setData({ inquiries, orders, products, recentInquiries: inquiries.recent || [] });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
      </div>
    );
  }

  if (!data) return null;

  // Generate mock trend data from recent inquiries
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
    const count = data.recentInquiries.filter((inq) => {
      const d = new Date(inq.created_at);
      return d.toDateString() === date.toDateString();
    }).length;
    return { day: dayStr, inquiries: count };
  });

  const statusData = [
    { name: "Pending", value: data.inquiries.pending || 0 },
    { name: "Replied", value: data.inquiries.replied || 0 },
    { name: "Closed", value: data.inquiries.closed || 0 },
    { name: "Other", value: Math.max(0, (data.inquiries.total || 0) - (data.inquiries.pending || 0) - (data.inquiries.replied || 0) - (data.inquiries.closed || 0)) },
  ].filter((d) => d.value > 0);

  const revenueData = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: data.orders.revenue || 0 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-[24px] md:text-[28px] font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
        Analytics
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Inquiries" value={data.inquiries.total || 0} icon={MessageSquare} />
        <StatCard title="Total Orders" value={data.orders.total || 0} icon={ShoppingCart} />
        <StatCard title="Revenue" value={`₹${(data.orders.revenue || 0).toLocaleString()}`} icon={IndianRupee} />
        <StatCard title="Products" value={data.products.total || 0} icon={Package} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries Trend */}
        <ChartCard title="Inquiries (Last 7 Days)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#534344" />
              <XAxis dataKey="day" stroke="#d9c1c2" fontSize={11} />
              <YAxis stroke="#d9c1c2" fontSize={11} />
              <Tooltip
                contentStyle={{ background: "#15130d", border: "1px solid #534344", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#e8e2d6" }}
              />
              <Line type="monotone" dataKey="inquiries" stroke="#C6A972" strokeWidth={2} dot={{ fill: "#C6A972" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Inquiry Status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#15130d", border: "1px solid #534344", borderRadius: "8px", fontSize: "12px" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-inter)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue Trend */}
        <ChartCard title="Revenue by Month">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#534344" />
              <XAxis dataKey="month" stroke="#d9c1c2" fontSize={11} />
              <YAxis stroke="#d9c1c2" fontSize={11} />
              <Tooltip
                contentStyle={{ background: "#15130d", border: "1px solid #534344", borderRadius: "8px", fontSize: "12px" }}
              />
              <Bar dataKey="revenue" fill="#C6A972" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Conversion Funnel */}
        <ChartCard title="Conversion Funnel">
          <div className="flex flex-col items-center justify-center h-[250px] gap-3 px-4">
            {[
              { label: "Total Inquiries", value: data.inquiries.total || 0, width: "100%" },
              { label: "Replied", value: data.inquiries.replied || 0, width: "70%" },
              { label: "Orders", value: data.orders.total || 0, width: "40%" },
            ].map((step, i) => (
              <div key={step.label} className="text-center" style={{ width: step.width }}>
                <div
                  className="h-10 rounded-lg flex items-center justify-center text-[13px] font-semibold"
                  style={{ background: COLORS[i], color: "#0B0B0C" }}
                >
                  {step.value}
                </div>
                <p className="text-[11px] mt-1" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-5" style={{ background: "#15130d", borderColor: "#534344" }}>
      <h3 className="text-[14px] font-semibold mb-4" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
