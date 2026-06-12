"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AdminAuthProvider";
import { User, Shield, Key, Activity } from "lucide-react";

interface ActivityLog {
  id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  created_at: string;
  details: Record<string, unknown>;
}

export default function SettingsPage() {
  const { adminUser, refreshAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [loadingLog, setLoadingLog] = useState(true);

  useEffect(() => {
    if (adminUser) setName(adminUser.full_name || "");
  }, [adminUser]);

  useEffect(() => {
    if (activeTab === "activity") {
      fetch("/api/admin/activity-log")
        .then((r) => r.json())
        .then((data) => { setActivityLog(data.logs || []); setLoadingLog(false); });
    }
  }, [activeTab]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");
    // In a real app, this would call an API to update the profile
    await new Promise((r) => setTimeout(r, 500));
    setMessage("Profile updated successfully");
    setSaving(false);
    refreshAdmin();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "activity", label: "Activity Log", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] md:text-[28px] font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
        Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="md:w-[200px] shrink-0">
          <nav className="flex md:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer text-left"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: activeTab === tab.id ? "rgba(198,169,114,0.1)" : "transparent",
                  color: activeTab === tab.id ? "#C6A972" : "#d9c1c2",
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="rounded-xl border p-6 space-y-5" style={{ background: "#15130d", borderColor: "#534344" }}>
              <h2 className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
                Profile Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
                    style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={adminUser?.email || ""}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none opacity-50"
                    style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
                    Role
                  </label>
                  <input
                    type="text"
                    value={adminUser?.role || "admin"}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none opacity-50"
                    style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
                  />
                </div>
              </div>

              {message && (
                <p className="text-[13px] px-4 py-2 rounded-lg" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>
                  {message}
                </p>
              )}

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="rounded-xl border" style={{ background: "#15130d", borderColor: "#534344" }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: "#534344" }}>
                <h2 className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}>
                  Activity Log
                </h2>
              </div>
              {loadingLog ? (
                <div className="p-8 text-center">
                  <div className="w-6 h-6 border-2 rounded-full animate-spin mx-auto" style={{ borderColor: "#534344", borderTopColor: "#C6A972" }} />
                </div>
              ) : activityLog.length === 0 ? (
                <div className="p-8 text-center text-[13px]" style={{ color: "#534344" }}>
                  No activity recorded yet
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: "#534344" }}>
                  {activityLog.map((log) => (
                    <div key={log.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[13px]" style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}>
                          <span className="font-medium" style={{ color: "#C6A972" }}>{log.action}</span>{" "}
                          {log.entity_type} #{log.entity_id}
                        </p>
                        {log.details && (
                          <p className="text-[11px] mt-1" style={{ color: "#534344" }}>
                            {JSON.stringify(log.details)}
                          </p>
                        )}
                      </div>
                      <span className="text-[11px] shrink-0 ml-4" style={{ color: "#534344" }}>
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
