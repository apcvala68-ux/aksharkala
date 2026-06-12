import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = await createClient();
  const { slug } = await params;

  // Get collection by slug
  const { data: collection, error: colError } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (colError || !collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  // Get linked product IDs
  const { data: links } = await supabase
    .from("collection_products")
    .select("product_id, sort_order")
    .eq("collection_id", collection.id)
    .order("sort_order");

  const productIds = links?.map((l) => l.product_id) || [];

  let products: any[] = [];
  if (productIds.length > 0) {
    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds)
      .order("id");

    // Sort products by the order defined in collection_products
    if (prods) {
      products = productIds
        .map((pid) => prods.find((p) => p.id === pid))
        .filter(Boolean);
    }
  }

  return NextResponse.json({ collection, products });
}
