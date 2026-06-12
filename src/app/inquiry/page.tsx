"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

interface ProductOption {
  id: number;
  title: string;
}

function InquiryForm() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [products, setProducts] = useState<ProductOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("id, title").order("id");
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      setSelectedProduct(productParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProduct ? Number(selectedProduct) : null,
          company_name: companyName,
          contact_name: contactName,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      } else {
        setStatus("success");
        setCompanyName("");
        setContactName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSelectedProduct("");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <section className="min-h-dvh flex items-center justify-center pt-24 px-5">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[32px] text-secondary">check</span>
          </div>
          <h1
            className="text-[32px] text-on-surface"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Inquiry Sent
          </h1>
          <p
            className="text-[16px] text-on-surface-variant"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Thank you for your interest. Our team will review your inquiry and get back to you within 24-48 hours.
          </p>
          <Link
            href="/"
            className="btn-primary inline-block text-[12px] tracking-[0.1em] py-4 px-10 cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
          >
            BACK TO HOME
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-dvh pt-28 md:pt-36 pb-20 px-5 md:px-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-[36px] md:text-[48px] text-on-surface mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Wholesale Inquiry
          </h1>
          <p
            className="text-[16px] text-on-surface-variant max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Submit your details and our B2B team will reach out with pricing, MOQ information, and catalog access.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Product Selection */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Interested Product <span className="text-secondary">(optional)</span>
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] focus:outline-none focus:border-secondary transition-colors appearance-none cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <option value="">All Products / General Inquiry</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="e.g. Luxury Boutique Ltd."
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Contact Name */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Phone Number <span className="text-secondary">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Message */}
          <div>
            <label
              className="block text-[14px] text-on-surface mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Message <span className="text-secondary">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Tell us about your requirements, expected volumes, or any specific questions..."
              className="w-full bg-surface border border-secondary/20 text-on-surface px-4 py-3 text-[16px] placeholder-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors resize-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <div
              className="bg-red-900/30 border border-red-500/30 text-red-300 px-4 py-3 text-[14px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-[12px] tracking-[0.1em] py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
          >
            {submitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
          </button>

          <p
            className="text-[12px] text-center text-on-surface-variant/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            By submitting, you agree to our{" "}
            <Link href="/" className="text-secondary hover:underline">
              Privacy Policy
            </Link>
            . Your data is kept confidential.
          </p>
        </form>
      </div>
    </section>
  );
}

export default function InquiryPage() {
  return (
    <main>
      <Suspense
        fallback={
          <section className="min-h-dvh flex items-center justify-center pt-24">
            <div className="text-on-surface-variant">Loading...</div>
          </section>
        }
      >
        <InquiryForm />
      </Suspense>
    </main>
  );
}
