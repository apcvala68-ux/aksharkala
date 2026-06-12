import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductAccordion from "@/components/ProductAccordion";

interface Props {
  params: Promise<{ id: string }>;
}

function getSpecifications(product: any) {
  const title = product.title || "";
  const fabricVal = product.fabric || "";
  
  if (title.includes("Paithani")) {
    return {
      fabric: "100% Pure Paithani Silk",
      zari: "Pure Gold Thread Electroplated Zari",
      technique: "Handloom Pit Loom Weaving",
      origin: "Yeola, Maharashtra (India)",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Kanjivaram")) {
    return {
      fabric: "100% Pure Mulberry Silk",
      zari: "Gold-Electroplated Pure Silver Zari",
      technique: "Handloom Korvai Weaving",
      origin: "Kanchipuram, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Brocade") || title.includes("Regalia")) {
    return {
      fabric: "100% Pure Katan Silk",
      zari: "Fine Gold & Silver Zari (Brocade)",
      technique: "Handloom Jacquard Weave",
      origin: "Banaras, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Zardozi")) {
    return {
      fabric: "100% Pure Silk Crepe/Georgette",
      zari: "Hand-embroidered Zardozi using Metallic Wires",
      technique: "Hand-done Zardozi Embroidery",
      origin: "Lucknow, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Leheriya")) {
    return {
      fabric: "100% Pure Silk Georgette",
      zari: "N/A (Minimal Metallic Accents)",
      technique: "Traditional Tie & Dye (Resist Dyeing)",
      origin: "Rajasthan, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Tissue") || title.includes("Sheer")) {
    return {
      fabric: "100% Pure Tissue Silk",
      zari: "Fine Metallic Weft Threads",
      technique: "Plain Weave with Sheer Finish",
      origin: "Banaras, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Cotton")) {
    return {
      fabric: "100% Pure Cotton",
      zari: "N/A",
      technique: "Handloom Jamdani / Tangail Weave",
      origin: "West Bengal, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Vintage") || title.includes("Patina")) {
    return {
      fabric: "100% Pure Silk",
      zari: "Antique Finish Gold Zari",
      technique: "Handloom Weave with Patina Treatment",
      origin: "Banaras, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else if (title.includes("Contemporary") || title.includes("Fusion")) {
    return {
      fabric: "Premium Silk Blend (70% Silk, 30% Fine Cotton)",
      zari: "Structural Metallic Weaves",
      technique: "Contemporary Handloom Fusion",
      origin: "Varanasi, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  } else {
    // Default (e.g. Banarasi Silk Saree - Handwoven or "The Midnight Lotus")
    return {
      fabric: fabricVal || "100% Pure Katan Silk",
      zari: "Pure Silver Threads Electroplated with 24k Gold",
      technique: "Handloom Kadwa Weave",
      origin: "Banaras, India",
      length: "5.5 Meters + 1 Meter Unstitched Blouse Piece"
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const productId = Number(id);
  if (isNaN(productId)) notFound();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (!product) notFound();

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(4);

  const images = product.images?.length ? product.images : [];
  const specs = getSpecifications(product);
  const category = product.category || "Collections";

  return (
    <main className="pt-20 lg:pt-24">
      {/* Product Detail Section */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-20 pt-4 pb-12 md:py-16">
        {/* Mobile-only Breadcrumbs (above image gallery) */}
        <nav
          className="flex lg:hidden text-on-surface-variant text-[10px] tracking-[0.12em] mb-6 opacity-70 flex-wrap"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
        >
          <Link href="/collections" className="hover:text-secondary transition-colors">
            COLLECTIONS
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-secondary transition-colors">
            {category.toUpperCase()}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-secondary font-semibold">
            {product.title.toUpperCase()}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 justify-between">
          {/* Image Gallery */}
          <div className="w-full lg:w-[45%]">
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[50%] flex flex-col justify-start pt-0 lg:pt-8">
            <ProductInfo
              id={product.id}
              title={product.title}
              category={product.category || "Collections"}
              description={product.description}
            />

            {/* Specifications list */}
            <div className="mb-10 grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-3.5 text-[13px] border-b border-secondary/10 pb-8" style={{ fontFamily: "var(--font-inter)" }}>
              <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em]">Fabric</span>
              <span className="text-on-surface-variant/95">{specs.fabric}</span>

              <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em]">Zari</span>
              <span className="text-on-surface-variant/95">{specs.zari}</span>

              <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em]">Technique</span>
              <span className="text-on-surface-variant/95">{specs.technique}</span>

              <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em]">Origin</span>
              <span className="text-on-surface-variant/95">{specs.origin}</span>

              <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em]">Length</span>
              <span className="text-on-surface-variant/95">{specs.length}</span>
            </div>

            {/* Accordions */}
            <ProductAccordion
              description={product.description || ""}
              fabric={product.fabric || "Pure Katan Silk"}
              moq={product.moq || "5 pieces per style"}
              lead_time={product.lead_time || "6-8 weeks"}
              customization={product.customization || "Custom colors, zari patterns, and blouse designs available"}
            />
          </div>
        </div>
      </section>

      {/* Related Pieces */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-surface-container-low py-[80px] md:py-[120px]">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2
                  className="text-[28px] md:text-[32px] text-on-surface mb-2"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  Related Pieces
                </h2>
                <p
                  className="text-[16px] text-on-surface-variant"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Explore more from this collection.
                </p>
              </div>
              <Link
                href="/collections"
                className="hidden md:flex text-[12px] tracking-[0.1em] text-secondary hover:text-on-surface transition-colors items-center gap-1"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                VIEW ALL{" "}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((related) => {
                const relImages = related.images?.length ? related.images : [];
                return (
                  <Link
                    key={related.id}
                    href={`/product/${related.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-surface relative overflow-hidden mb-4 rounded-xl">
                      {relImages.length > 0 && (
                        <Image
                          src={relImages[0]}
                          alt={related.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3
                      className="text-[14px] text-on-surface group-hover:text-secondary transition-colors"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {related.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
