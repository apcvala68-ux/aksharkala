"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAuth } from "./AdminAuthProvider";

const breadcrumbMap: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  categories: "Categories",
  collections: "Collections",
  sections: "Sections",
  inquiries: "Inquiries",
  orders: "Orders",
  analytics: "Analytics",
  settings: "Settings",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const { adminUser } = useAuth();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = breadcrumbMap[segment] || segment;
    return { href, label, isLast: i === segments.length - 1 };
  });

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-5 md:px-8 border-b"
      style={{ background: "rgba(11,11,12,0.8)", backdropFilter: "blur(12px)", borderColor: "#534344" }}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} style={{ color: "#534344" }} />}
            {crumb.isLast ? (
              <span style={{ color: "#e8e2d6" }}>{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:underline" style={{ color: "#d9c1c2" }}>
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Admin Avatar */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold"
            style={{ background: "#584416", color: "#C6A972" }}
          >
            {adminUser?.full_name?.charAt(0) || adminUser?.email?.charAt(0) || "A"}
          </div>
          <span
            className="hidden md:block text-[13px]"
            style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}
          >
            {adminUser?.full_name || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
