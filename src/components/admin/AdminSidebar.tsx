"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AdminAuthProvider";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Tag,
  Layers,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { adminUser, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "px-5"} h-16 border-b`} style={{ borderColor: "#534344" }}>
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <span
              className="text-[18px] tracking-[0.08em] uppercase"
              style={{ fontFamily: "var(--font-playfair-display)", color: "#C6A972" }}
            >
              Aksharkala
            </span>
            <span
              className="text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 rounded"
              style={{ background: "#584416", color: "#C6A972", fontFamily: "var(--font-inter)" }}
            >
              Admin
            </span>
          </Link>
        )}
        {collapsed && (
          <span className="text-[16px] font-bold" style={{ color: "#C6A972" }}>A</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 ${collapsed ? "justify-center px-3" : "px-5"} py-3 text-[13px] tracking-[0.05em] transition-colors cursor-pointer ${
                  isActive(item.href) ? "font-semibold" : "font-medium"
                }`}
                style={{
                  fontFamily: "var(--font-inter)",
                  color: isActive(item.href) ? "#C6A972" : "#d9c1c2",
                  background: isActive(item.href) ? "rgba(198,169,114,0.1)" : "transparent",
                  borderRight: isActive(item.href) ? "3px solid #C6A972" : "3px solid transparent",
                }}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t p-4" style={{ borderColor: "#534344" }}>
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                style={{ background: "#584416", color: "#C6A972" }}
              >
                {adminUser?.full_name?.charAt(0) || adminUser?.email?.charAt(0) || "A"}
              </div>
              <div className="min-w-0">
                <p
                  className="text-[12px] truncate"
                  style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}
                >
                  {adminUser?.full_name || "Admin"}
                </p>
                <p
                  className="text-[10px] truncate"
                  style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
                >
                  {adminUser?.role || "admin"}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
              title="Sign out"
              style={{ color: "#d9c1c2" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={signOut}
            className="w-full flex justify-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
            title="Sign out"
            style={{ color: "#d9c1c2" }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex items-center justify-center h-10 border-t transition-colors cursor-pointer hover:bg-white/5"
        style={{ borderColor: "#534344", color: "#d9c1c2" }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{ background: "#15130d", border: "1px solid #534344" }}
      >
        <Menu size={20} style={{ color: "#e8e2d6" }} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[260px]" style={{ background: "#15130d" }}>
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1"
              style={{ color: "#d9c1c2" }}
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[240px]"
        }`}
        style={{ background: "#15130d", borderRight: "1px solid #534344" }}
      >
        {sidebarContent}
      </aside>

      {/* Spacer */}
      <div className={`hidden md:block transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[240px]"}`} />
    </>
  );
}
