"use client";

import { AdminAuthProvider, useAuth } from "@/components/admin/AdminAuthProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ToastProvider } from "@/components/admin/Toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [loading, user, isLoginPage, router]);

  // Show login page without sidebar/topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: "#0B0B0C" }}>
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: "#534344", borderTopColor: "#C6A972" }}
          />
          <p
            className="text-[13px]"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-dvh flex" style={{ background: "#0B0B0C" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-dvh">
        <AdminTopbar />
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
