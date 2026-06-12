import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get product count for each collection
  const collectionsWithCount = await Promise.all(
    (data || []).map(async (col) => {
      const { count } = await supabase
        .from("collection_products")
        .select("*", { count: "exact", head: true })
        .eq("collection_id", col.id);
      return { ...col, product_count: count || 0 };
    })
  );

  return NextResponse.json({ collections: collectionsWithCount });
}
