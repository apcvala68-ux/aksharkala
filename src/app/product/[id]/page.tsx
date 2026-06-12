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

  return (
    <main className="pt-24">
      {/* Product Detail Section */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="w-full lg:w-[60%]">
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start pt-4 lg:pt-8 lg:pl-8">
            <ProductInfo
              id={product.id}
              title={product.title}
              category={product.category || "Collections"}
            />

            {/* Description */}
            {product.description && (
              <div
                className="text-[16px] leading-[1.6] text-on-surface-variant mb-10 max-w-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <p>{product.description}</p>
              </div>
            )}

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
                    <div className="aspect-[4/5] bg-surface relative overflow-hidden border border-secondary/20 mb-4">
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
