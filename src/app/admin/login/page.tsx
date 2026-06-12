"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/AdminAuthProvider";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-5" style={{ background: "#0B0B0C" }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-[28px] md:text-[32px] tracking-[0.08em] uppercase"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#C6A972" }}
          >
            Aksharkala
          </h1>
          <p
            className="text-[12px] tracking-[0.2em] uppercase mt-2"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
          >
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div
          className="p-8 rounded-xl border"
          style={{ background: "#15130d", borderColor: "#534344" }}
        >
          <h2
            className="text-[20px] font-semibold mb-6"
            style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
          >
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-[12px] tracking-[0.1em] uppercase mb-2"
                style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-[14px] outline-none transition-colors"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "#222018",
                  border: "1px solid #534344",
                  color: "#e8e2d6",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C6A972")}
                onBlur={(e) => (e.target.style.borderColor = "#534344")}
                placeholder="admin@aksharkala.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[12px] tracking-[0.1em] uppercase mb-2"
                style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-[14px] outline-none transition-colors"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: "#222018",
                  border: "1px solid #534344",
                  color: "#e8e2d6",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C6A972")}
                onBlur={(e) => (e.target.style.borderColor = "#534344")}
                placeholder="Enter password"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg text-[13px]"
                style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-[13px] tracking-[0.1em] uppercase font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "var(--font-inter)",
                background: loading ? "#584416" : "#C6A972",
                color: loading ? "#d9c1c2" : "#0B0B0C",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-[11px] mt-6"
          style={{ fontFamily: "var(--font-inter)", color: "#534344" }}
        >
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
