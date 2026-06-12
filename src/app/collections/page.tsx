"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/utils/supabase/client";

interface Product {
  id: number;
  title: string;
  price: string;
  images: string[];
  category: string;
  fabric: string;
}

export default function CollectionsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Pieces");
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productsPerRow, setProductsPerRow] = useState<2 | 3 | 4>(3);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("*").order("id");
      if (data) {
        setProducts(data as Product[]);
        setFiltered(data as Product[]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "All Pieces") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedFabrics.length > 0) {
      result = result.filter((p) =>
        selectedFabrics.some(
          (f) => p.fabric?.toLowerCase().includes(f.toLowerCase())
        )
      );
    }

    setFiltered(result);
  }, [selectedCategory, selectedFabrics, products]);

  const categories = [
    "All Pieces",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const fabrics = [
    ...new Set(products.map((p) => p.fabric).filter(Boolean)),
  ];

  const toggleFabric = (fab: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fab) ? prev.filter((f) => f !== fab) : [...prev, fab]
    );
  };

  const getGridColsClass = () => {
    if (productsPerRow === 2) return "grid-cols-2";
    if (productsPerRow === 4) return "grid-cols-2 md:grid-cols-4";
    return "grid-cols-2 md:grid-cols-3";
  };

  return (
    <>
      {/* Page Header */}
      <header className="max-w-[1440px] mx-auto px-5 md:px-20 py-8 md:py-16 text-center pt-24 md:pt-32">
        <h1
          className="text-[36px] md:text-[64px] text-on-surface mb-3 md:mb-4"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Indo-Western & Heritage
        </h1>
        <p
          className="text-[14px] md:text-[18px] leading-[1.7] text-on-surface-variant max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A curation of timeless elegance, blending traditional Indian
          artisanship with contemporary global silhouettes.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 pb-[120px] grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="md:col-span-3 lg:col-span-2 hidden md:block">
          <div className="sticky top-40">
            {/* Category */}
            <div className="mb-10">
              <h3
                className="text-[20px] leading-[1.5] tracking-[0.05em] font-semibold text-on-surface mb-6 border-b border-secondary/20 pb-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Category
              </h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <span
                        className={`w-[18px] h-[18px] rounded-sm border flex items-center justify-center transition-all duration-200 ${
                          selectedCategory === cat
                            ? "border-secondary bg-secondary"
                            : "border-on-surface-variant/40 bg-transparent"
                        }`}
                      >
                        {selectedCategory === cat && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0B0B0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span
                        className="text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cat}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fabric */}
            {fabrics.length > 0 && (
              <div className="mb-10">
                <h3
                  className="text-[20px] leading-[1.5] tracking-[0.05em] font-semibold text-on-surface mb-6 border-b border-secondary/20 pb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Fabric
                </h3>
                <ul className="space-y-4">
                  {fabrics.map((fab) => (
                    <li key={fab}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <span
                          className={`w-[18px] h-[18px] rounded-sm border flex items-center justify-center transition-all duration-200 ${
                            selectedFabrics.includes(fab)
                              ? "border-secondary bg-secondary"
                              : "border-on-surface-variant/40 bg-transparent"
                          }`}
                        >
                          {selectedFabrics.includes(fab) && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0B0B0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <span
                          className="text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {fab}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-9 lg:col-span-10">
          {/* Toolbar */}
          <div className="mb-6 flex justify-between items-center border-b border-secondary/20 pb-4">
            <span
              className="text-[14px] md:text-[16px] text-on-surface-variant"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </span>
            <div className="flex items-center gap-4 md:gap-6">
              {/* Product Per Row Selector */}
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] md:text-[12px] tracking-[0.1em] text-on-surface-variant hidden md:block"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                >
                  PER ROW
                </span>
                <div className="flex items-center border border-secondary/30 rounded-md overflow-hidden">
                  {([2, 3, 4] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setProductsPerRow(num)}
                      className={`w-[32px] h-[28px] flex items-center justify-center text-[12px] transition-all duration-200 cursor-pointer ${
                        productsPerRow === num
                          ? "bg-secondary text-primary"
                          : "text-on-surface-variant hover:bg-secondary/10"
                      }`}
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                      aria-label={`${num} products per row`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-1.5 text-secondary text-[11px] tracking-[0.1em] cursor-pointer md:hidden"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                FILTERS
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-on-surface-variant">Loading...</div>
          ) : (
            <div
              className={`grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 ${getGridColsClass()}`}
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  title={product.title}
                  price={product.price || "Price on Request"}
                  image={(product.images && product.images[0]) || ""}
                  alt={product.title}
                />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-[18px] text-on-surface-variant mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                No products match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Pieces");
                  setSelectedFabrics([]);
                }}
                className="btn-secondary text-[12px] tracking-[0.1em] py-3 px-8 cursor-pointer"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-surface-container overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-secondary/20 sticky top-0 bg-surface-container z-10">
              <span
                className="text-[16px] font-semibold text-on-surface"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Filters
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-5 py-6 space-y-8">
              {/* Category */}
              <div>
                <h3
                  className="text-[14px] uppercase tracking-[0.1em] font-semibold text-on-surface mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Category
                </h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <span
                          className={`w-[18px] h-[18px] rounded-sm border flex items-center justify-center transition-all duration-200 ${
                            selectedCategory === cat
                              ? "border-secondary bg-secondary"
                              : "border-on-surface-variant/40 bg-transparent"
                          }`}
                        >
                          {selectedCategory === cat && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0B0B0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <span
                          className="text-[14px] text-on-surface-variant group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {cat}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fabric */}
              {fabrics.length > 0 && (
                <div>
                  <h3
                    className="text-[14px] uppercase tracking-[0.1em] font-semibold text-on-surface mb-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Fabric
                  </h3>
                <ul className="space-y-3">
                  {fabrics.map((fab) => (
                    <li key={fab}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <span
                          className={`w-[18px] h-[18px] rounded-sm border flex items-center justify-center transition-all duration-200 ${
                            selectedFabrics.includes(fab)
                              ? "border-secondary bg-secondary"
                              : "border-on-surface-variant/40 bg-transparent"
                          }`}
                        >
                          {selectedFabrics.includes(fab) && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0B0B0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <span
                          className="text-[14px] text-on-surface-variant group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {fab}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="px-5 py-4 border-t border-secondary/20 sticky bottom-0 bg-surface-container">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-primary w-full py-3 text-[12px] tracking-[0.1em] cursor-pointer"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
