"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: "1",
    title: "Ivory Gold Banarasi Silk",
    price: "$2,450",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNmd_vGD9U3XnKeitVtNOuH2W2cAy31TVbUt5ucqKWSYk49_oQ5PGDRnKocVLRLTpy6ROR_-DXgaTjyLvtPQPW60gs6w0amBzgWZAMa8WpjZYuGSfLA1hLlhMcBs8mbtZK_Tz2Plo4Vut87p64XOFIIlqwfBDAzuSORo9E1AByazEpYMcoFmvsikwVeOKcPw-LHr3scO4_unQwAWDEqL1EIx2EeiMkNx-BiOX0WVScX5jfuoT1SIuhDSuX5Us9KO2m3sUbha4p2c7-",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ymnwffDtQnMSKng6PDaxjGxaxvSKZMLKhQyHpquezGy9xhjKFX3EzYLN-xzhAkPGygrM5S1Y2Q63Ul3Qh9qaK-vN7y5wrB9Eb5nYjhi2MbNdqAonEa9QwiroIZ6-ImxpeljHr1C1ExgdmJdBYY7G1O0G-9ITpYXsB5pFvWxCzT5z1LWnYJJOLyHSvLjmqdOyojh84EtYiA_ValH-1Qmyk7w_uq7V074iSKH5MANcDB8RMoKHVMQMgkXOqbndvUfrs583AIjPmOoE",
    alt: "Ivory Gold Banarasi Silk Lehenga",
    category: "Lehenga Sets",
    fabric: "Banarasi Silk",
  },
  {
    id: "2",
    title: "Emerald Silk Drape",
    price: "$1,890",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBehW34SsSXU4ZG8m8VnR6cw9TlDLxcXyMhlLytZXVOOfE5cbEZIXqFdBJlRxs52QMrAoA03FUmf02leJrV326bMfE0khA3_k8S15VLG9Xn5-83MqIfRhug6GKIR4sf_LWFcM5yfeyTxqVvQKgEcs3TD1P71rNYe-GFcT_v2BrnH7XBnjmaGo0hxIjSsY7UGnTjWmo-3aIYE56LKmwf5lMku1d-_tQ645VNZzP9_ElboCoWzF9Jc1nnNEwkC-sIpBZMETCToeIjcU7h",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHmBN1i9PkBC-XLGoCjpN9z3hEewf9RBvyUffygK9GgVkuTKVjKCr8qOwTxE8jddWLYsmAnQ3RxIkkyiMYL4vF2Vw6dd01vPMOEUZM5bfO2DfIWWgkMROa0N-2az_nuGVH-UAW1hOFBNzGFhBBli_2bEYATFy9wfdNLT7JgvsPQ9vGNIxDVVv64pmYVLkPrD1wHbjGOiiDZy6cM4xKVHwZ-EOwR_jncTATpoituT8Gjr_o7U-XyDIusid1AHLbE-ky8JsqyUCsB0SQ",
    alt: "Emerald Draped Saree",
    category: "Draped Sarees",
    fabric: "Chanderi",
  },
  {
    id: "3",
    title: "Crimson Zari Anarkali",
    price: "$3,100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACDp2tQsZNlnMXg2FTg_8wfo4itnkCnSUz90ljFpwZ4DWxHMtIT90sapA1NfkRe4FE2o7LeG0oz4eQBNstHBfzHm-vMxeZcl81pEnZRBoQydp5dNEGj1eZa5U1xrEw_yLNS1Tno_NEQhIZ7RZfd23O5RTxg0UdQ0JJnkj_MBV3TOtgAoWa0PdPyp-fRbiY2Bru9gGve2DCSKqXUzC0uOBH6LHba-Pvar31veDOjkSsqQLn0L0C3PlXFgbsIyzDi529W_l45-hJDt8v",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNOoxJdz2YUTLY9MujwVSMJdszKh37mWOKCeUY1hSAexwOvrKDk2NILK3gWawu949LmWkbVqLk5ZI7c7Xc5_CBYbihmpEH2gU7IuS4tH8zZxggCrBgT9fu-8yGivpL0Sx6BZKKWeT5onSUUB13ET_7qOF2vI2MherzLSVbMClPnVq4JjtB9KUiG52hi3uoehRFoDlharBAsqrJkKO7-5bKFDWaB8CxsvoGSYMuXIEaAlQAuhFyyQrjlCs6ZPWIbt6Uf-lgXbeFKx_",
    alt: "Crimson Heritage Anarkali",
    category: "Anarkalis",
    fabric: "Chanderi",
  },
  {
    id: "4",
    title: "Midnight Lotus Silk",
    price: "$1,750",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHmBN1i9PkBC-XLGoCjpN9z3hEewf9RBvyUffygK9GgVkuTKVjKCr8qOwTxE8jddWLYsmAnQ3RxIkkyiMYL4vF2Vw6dd01vPMOEUZM5bfO2DfIWWgkMROa0N-2az_nuGVH-UAW1hOFBNzGFhBBli_2bEYATFy9wfdNLT7JgvsPQ9vGNIxDVVv64pmYVLkPrD1wHbjGOiiDZy6cM4xKVHwZ-EOwR_jncTATpoituT8Gjr_o7U-XyDIusid1AHLbE-ky8JsqyUCsB0SQ",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMrYpknWLuJ0IyJdP_HsmbUfxL-wfe9no6iKyRx4rHJ-9R7wk5FvO4KOnfIM8qGVIbaVhjd714RpRpyQjfvWaYH3hhG7uDJ1ZpMjAmLMNot1eP70DLp1gWCImKkQKT2dQ7mhIp5y2I_9Znnby9EOZC23YhBMppvGsIwGG4foRncCfaLr_1wNjnIEUR1BboWkPWtHcxFujM0pNLbFwECI8MURlDw4P5Rqbv08qtMAGcPUDMrXgTPmLR7PFwSig1Ini4KH25KscZoJx-",
    alt: "Midnight Lotus Silk Saree",
    category: "Draped Sarees",
    fabric: "Banarasi Silk",
  },
  {
    id: "5",
    title: "Royal Heritage Lehenga",
    price: "$4,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ymnwffDtQnMSKng6PDaxjGxaxvSKZMLKhQyHpquezGy9xhjKFX3EzYLN-xzhAkPGygrM5S1Y2Q63Ul3Qh9qaK-vN7y5wrB9Eb5nYjhi2MbNdqAonEa9QwiroIZ6-ImxpeljHr1C1ExgdmJdBYY7G1O0G-9ITpYXsB5pFvWxCzT5z1LWnYJJOLyHSvLjmqdOyojh84EtYiA_ValH-1Qmyk7w_uq7V074iSKH5MANcDB8RMoKHVMQMgkXOqbndvUfrs583AIjPmOoE",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNmd_vGD9U3XnKeitVtNOuH2W2cAy31TVbUt5ucqKWSYk49_oQ5PGDRnKocVLRLTpy6ROR_-DXgaTjyLvtPQPW60gs6w0amBzgWZAMa8WpjZYuGSfLA1hLlhMcBs8mbtZK_Tz2Plo4Vut87p64XOFIIlqwfBDAzuSORo9E1AByazEpYMcoFmvsikwVeOKcPw-LHr3scO4_unQwAWDEqL1EIx2EeiMkNx-BiOX0WVScX5jfuoT1SIuhDSuX5Us9KO2m3sUbha4p2c7-",
    alt: "Royal Heritage Lehenga",
    category: "Lehenga Sets",
    fabric: "Banarasi Silk",
  },
  {
    id: "6",
    title: "Gold Zari Saree",
    price: "$2,750",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMrYpknWLuJ0IyJdP_HsmbUfxL-wfe9no6iKyRx4rHJ-9R7wk5FvO4KOnfIM8qGVIbaVhjd714RpRpyQjfvWaYH3hhG7uDJ1ZpMjAmLMNot1eP70DLp1gWCImKkQKT2dQ7mhIp5y2I_9Znnby9EOZC23YhBMppvGsIwGG4foRncCfaLr_1wNjnIEUR1BboWkPWtHcxFujM0pNLbFwECI8MURlDw4P5Rqbv08qtMAGcPUDMrXgTPmLR7PFwSig1Ini4KH25KscZoJx-",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBehW34SsSXU4ZG8m8VnR6cw9TlDLxcXyMhlLytZXVOOfE5cbEZIXqFdBJlRxs52QMrAoA03FUmf02leJrV326bMfE0khA3_k8S15VLG9Xn5-83MqIfRhug6GKIR4sf_LWFcM5yfeyTxqVvQKgEcs3TD1P71rNYe-GFcT_v2BrnH7XBnjmaGo0hxIjSsY7UGnTjWmo-3aIYE56LKmwf5lMku1d-_tQ645VNZzP9_ElboCoWzF9Jc1nnNEwkC-sIpBZMETCToeIjcU7h",
    alt: "Gold Zari Saree",
    category: "Draped Sarees",
    fabric: "Chanderi",
  },
  {
    id: "7",
    title: "Contemporary Silk Ensemble",
    price: "$1,650",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfNOoxJdz2YUTLY9MujwVSMJdszKh37mWOKCeUY1hSAexwOvrKDk2NILK3gWawu949LmWkbVqLk5ZI7c7Xc5_CBYbihmpEH2gU7IuS4tH8zZxggCrBgT9fu-8yGivpL0Sx6BZKKWeT5onSUUB13ET_7qOF2vI2MherzLSVbMClPnVq4JjtB9KUiG52hi3uoehRFoDlharBAsqrJkKO7-5bKFDWaB8CxsvoGSYMuXIEaAlQAuhFyyQrjlCs6ZPWIbt6Uf-lgXbeFKx_",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACDp2tQsZNlnMXg2FTg_8wfo4itnkCnSUz90ljFpwZ4DWxHMtIT90sapA1NfkRe4FE2o7LeG0oz4eQBNstHBfzHm-vMxeZcl81pEnZRBoQydp5dNEGj1eZa5U1xrEw_yLNS1Tno_NEQhIZ7RZfd23O5RTxg0UdQ0JJnkj_MBV3TOtgAoWa0PdPyp-fRbiY2Bru9gGve2DCSKqXUzC0uOBH6LHba-Pvar31veDOjkSsqQLn0L0C3PlXFgbsIyzDi529W_l45-hJDt8v",
    alt: "Contemporary Silk Ensemble",
    category: "Anarkalis",
    fabric: "Georgette",
  },
  {
    id: "8",
    title: "Banarasi Heritage Drape",
    price: "$3,400",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD97Ozcup5KaSKX9fksQ2cO0K2o8a2SHiSvpBfsdDVr19BzrBvlEDam10jmEra_TZHG4mv1VUAd6NpucUhyGAc_UN_xibMt2370r4cUFOazTD_UjozxwtkC5TNmaiefkSPRyxTZ_CEzJOzucwijHP7RSEtKTaeq6wGcL8ji7pnG96FdeVy1NcQ_MTTV4FAYa-m7JLpg4sYZI5jTQaBv4NohQuF8SvbJUj-_qVKMlhJuQNc-JjC7tYXsk3S03w-8r2WoJtJ-HEaG6VSf",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBehW34SsSXU4ZG8m8VnR6cw9TlDLxcXyMhlLytZXVOOfE5cbEZIXqFdBJlRxs52QMrAoA03FUmf02leJrV326bMfE0khA3_k8S15VLG9Xn5-83MqIfRhug6GKIR4sf_LWFcM5yfeyTxqVvQKgEcs3TD1P71rNYe-GFcT_v2BrnH7XBnjmaGo0hxIjSsY7UGnTjWmo-3aIYE56LKmwf5lMku1d-_tQ645VNZzP9_ElboCoWzF9Jc1nnNEwkC-sIpBZMETCToeIjcU7h",
    alt: "Banarasi Heritage Drape",
    category: "Draped Sarees",
    fabric: "Banarasi Silk",
  },
  {
    id: "9",
    title: "Artisan Pure Silk",
    price: "$2,100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHHKQ3fH2gseCxJwGtrOg5-qqk_GIWPwKJsgXG2NItQDXLGTDSdqRlVy2T64hb9vzYZfHi4QtEloyum_m3uy4kawz2TKVr4qa1hoG0oUgTJpVfBCiGktM6UPXCEHVtTJfFsnTp8B96A-aSx1pYOUlJIubRZRw98nILad26alA9BBZAG6RwInZ2IaYrMCSB2sA8Tsux27Sxcm4uN8eVfPTRv6o8E_0fm7nzFMf4M-SMlo2CpOZCdi8uEZQe6jtpZjf7ODKEhEM3XIZN",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHmBN1i9PkBC-XLGoCjpN9z3hEewf9RBvyUffygK9GgVkuTKVjKCr8qOwTxE8jddWLYsmAnQ3RxIkkyiMYL4vF2Vw6dd01vPMOEUZM5bfO2DfIWWgkMROa0N-2az_nuGVH-UAW1hOFBNzGFhBBli_2bEYATFy9wfdNLT7JgvsPQ9vGNIxDVVv64pmYVLkPrD1wHbjGOiiDZy6cM4xKVHwZ-EOwR_jncTATpoituT8Gjr_o7U-XyDIusid1AHLbE-ky8JsqyUCsB0SQ",
    alt: "Artisan Pure Silk",
    category: "Draped Sarees",
    fabric: "Georgette",
  },
];

const categories = ["All Pieces", "Lehenga Sets", "Anarkalis", "Draped Sarees"];
const fabrics = ["All Fabrics", "Banarasi Silk", "Chanderi", "Georgette"];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Pieces");
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<1 | 2 | 3 | 4>(3);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Lock body scroll when filters are open (prevents scroll chaining on mobile)
  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  const toggleFabric = (fab: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fab) ? prev.filter((f) => f !== fab) : [...prev, fab]
    );
  };

  // Filtered Products Logic
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "All Pieces" && product.category !== selectedCategory) {
      return false;
    }
    if (selectedFabrics.length > 0 && !selectedFabrics.includes("All Fabrics") && !selectedFabrics.includes(product.fabric)) {
      return false;
    }
    if (minPrice) {
      const priceVal = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
      if (priceVal < parseInt(minPrice, 10)) return false;
    }
    if (maxPrice) {
      const priceVal = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
      if (priceVal > parseInt(maxPrice, 10)) return false;
    }
    return true;
  });

  const getGridClass = () => {
    switch (gridCols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    }
  };

  return (
    <>
      {/* Page Header - Fully Responsive and Spaced for Floating Navbar */}
      <header className="max-w-[1440px] mx-auto px-5 md:px-20 pt-32 pb-8 md:pt-48 md:pb-16 text-center">
        <h1
          className="text-[28px] sm:text-[38px] md:text-[54px] lg:text-[64px] font-medium leading-[1.15] md:leading-none text-on-surface mb-4"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Indo-Western &amp; Heritage
        </h1>
        <p
          className="text-[13px] md:text-[15px] leading-relaxed text-on-surface-variant/80 max-w-xl md:max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A curation of timeless elegance, blending traditional Indian
          artisanship with contemporary global silhouettes. Discover pieces
          crafted for the modern connoisseur.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 pb-[120px]">
        {/* Desktop and Mobile Shared Toolbar */}
        {/* Desktop Toolbar */}
        <div className="hidden md:flex justify-between items-center border-b border-secondary/15 pb-6 mb-12">
          {/* Left: Item count */}
          <span
            className="text-[12px] uppercase tracking-[0.15em] text-on-surface-variant/80 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {filteredProducts.length} items
          </span>

          {/* Center: Zara-Style Grid Scale Selector */}
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60 font-semibold mr-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Grid Scale:
            </span>
            {[2, 3, 4].map((cols) => (
              <button
                key={cols}
                onClick={() => setGridCols(cols as any)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border text-[11px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  gridCols === cols
                    ? "border-secondary bg-secondary/10 text-secondary shadow-[0_0_12px_rgba(198,169,114,0.15)]"
                    : "border-outline-variant/30 text-on-surface-variant/70 hover:border-on-surface/40 hover:text-on-surface"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {cols}
              </button>
            ))}
          </div>

          {/* Right: Filters Toggle Button (Icon only, borderless) */}
          <button
            onClick={() => setFilterOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary/5 text-on-surface transition-all duration-300 cursor-pointer"
            aria-label="Toggle Filters"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden mb-8 flex justify-between items-center border-b border-secondary/15 pb-4">
          <span
            className="text-[12px] uppercase tracking-[0.15em] text-on-surface-variant/80 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {filteredProducts.length} items
          </span>
          <div className="flex items-center gap-3">
            {/* Grid Toggle (Zara Style: clean outline numbers matching desktop) */}
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-semibold mr-1" 
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Grid:
              </span>
              {[1, 2].map((cols) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols as any)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border text-[10px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    gridCols === cols
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-outline-variant/15 text-on-surface-variant/60"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {cols}
                </button>
              ))}
            </div>

            {/* Elegant Divider */}
            <span className="h-4 w-[1px] bg-secondary/20"></span>

            {/* Filters Trigger (Icon only, borderless, matching desktop) */}
            <button
              onClick={() => setFilterOpen(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant/80 hover:text-secondary transition-colors cursor-pointer"
              aria-label="Toggle Filters"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          </div>
        </div>

        {/* Product Grid - Full Bleed (No Sidebar) */}
        <div className={`grid gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 ${getGridClass()}`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              hoverImage={product.hoverImage}
              alt={product.alt}
            />
          ))}
        </div>

        {/* Zero Results State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">
              search_off
            </span>
            <p
              className="text-[13px] text-on-surface-variant tracking-[0.1em] uppercase font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No pieces match your filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Pieces");
                setSelectedFabrics([]);
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-secondary text-[11px] font-semibold tracking-[0.15em] uppercase hover:underline cursor-pointer mt-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Discover More Call to Action */}
        {filteredProducts.length > 0 && (
          <div className="mt-20 md:mt-24 flex justify-center">
            <button
              className="btn-secondary text-[11px] tracking-[0.15em] py-4.5 px-14 rounded-full font-semibold uppercase transition-all duration-300 border border-secondary/35 hover:border-secondary hover:bg-secondary/5 cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DISCOVER MORE
            </button>
          </div>
        )}
      </main>

      {/* Unified Sliding Filter Drawer */}
      <div
        data-lenis-prevent
        className={`fixed top-0 bottom-0 right-0 h-dvh max-h-dvh overflow-hidden z-[100] w-full max-w-[380px] bg-[#0C0C0D] border-l border-secondary/20 shadow-[0_0_60px_rgba(0,0,0,0.85)] transform transition-transform duration-500 ease-in-out flex flex-col ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-secondary/15 bg-[#0C0C0D]/80 backdrop-blur-md sticky top-0 z-10">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-on-surface"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Filters
          </span>
          <button
            onClick={() => setFilterOpen(false)}
            className="text-on-surface hover:text-secondary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-6 py-8 space-y-10">
          {/* Category Section */}
          <div className="space-y-4">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-secondary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Category
            </h4>
            <ul className="space-y-3.5">
              {categories.map((cat) => {
                const isChecked = selectedCategory === cat;
                return (
                  <li key={cat}>
                    <label className="flex items-center gap-3.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setSelectedCategory(cat)}
                        className="sr-only"
                      />
                      <div className={`w-[18px] h-[18px] border rounded flex items-center justify-center transition-all duration-300 ${
                        isChecked 
                          ? "border-secondary bg-secondary" 
                          : "border-on-surface-variant/30 bg-transparent group-hover:border-secondary/60"
                      }`}>
                        <span className={`material-symbols-outlined text-[12px] text-[#0C0C0D] font-black transition-opacity duration-200 ${
                          isChecked ? "opacity-100" : "opacity-0"
                        }`}>
                          check
                        </span>
                      </div>
                      <span
                        className={`text-[13px] tracking-wide transition-colors ${
                          isChecked 
                            ? "text-on-surface font-semibold" 
                            : "text-on-surface-variant/70 group-hover:text-on-surface"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cat}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
 
          {/* Fabric Section */}
          <div className="space-y-4">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-secondary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Fabric
            </h4>
            <ul className="space-y-3.5">
              {fabrics.map((fab) => {
                const isChecked = fab === "All Fabrics"
                  ? selectedFabrics.length === 0
                  : selectedFabrics.includes(fab);
                return (
                  <li key={fab}>
                    <label className="flex items-center gap-3.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (fab === "All Fabrics") {
                            setSelectedFabrics([]);
                          } else {
                            toggleFabric(fab);
                          }
                        }}
                        className="sr-only"
                      />
                      <div className={`w-[18px] h-[18px] border rounded flex items-center justify-center transition-all duration-300 ${
                        isChecked 
                          ? "border-secondary bg-secondary" 
                          : "border-on-surface-variant/30 bg-transparent group-hover:border-secondary/60"
                      }`}>
                        <span className={`material-symbols-outlined text-[12px] text-[#0C0C0D] font-black transition-opacity duration-200 ${
                          isChecked ? "opacity-100" : "opacity-0"
                        }`}>
                          check
                        </span>
                      </div>
                      <span
                        className={`text-[13px] tracking-wide transition-colors ${
                          isChecked 
                            ? "text-on-surface font-semibold" 
                            : "text-on-surface-variant/70 group-hover:text-on-surface"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {fab}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price Range Section */}
          <div className="space-y-4">
            <h4
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-secondary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Price Range ($)
            </h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-surface-container-lowest/50 border border-secondary/20 focus:border-secondary focus:ring-0 rounded px-3 py-2 text-[14px] placeholder-outline transition-colors text-center text-on-surface"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <span className="text-secondary/50 font-light">&mdash;</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-surface-container-lowest/50 border border-secondary/20 focus:border-secondary focus:ring-0 rounded px-3 py-2 text-[14px] placeholder-outline transition-colors text-center text-on-surface"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-5 border-t border-secondary/15 bg-[#0C0C0D] flex gap-3">
          <button
            onClick={() => {
              setSelectedCategory("All Pieces");
              setSelectedFabrics([]);
              setMinPrice("");
              setMaxPrice("");
            }}
            className="flex-1 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase border border-secondary/25 hover:bg-secondary/5 text-on-surface-variant rounded-full transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Clear
          </button>
          <button
            onClick={() => setFilterOpen(false)}
            className="flex-1 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase bg-secondary text-[#15130d] rounded-full hover:bg-secondary-fixed-dim transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}
