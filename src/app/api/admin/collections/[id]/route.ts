import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  // Get linked products
  const { data: links } = await supabase
    .from("collection_products")
    .select("product_id, sort_order")
    .eq("collection_id", id)
    .order("sort_order");

  const productIds = links?.map((l) => l.product_id) || [];
  let products: any[] = [];
  if (productIds.length > 0) {
    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);
    products = prods || [];
  }

  return NextResponse.json({ collection: data, products });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { product_ids, ...collectionData } = body;

  const { data, error } = await supabase
    .from("collections")
    .update(collectionData)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update product links if provided
  if (product_ids !== undefined) {
    await supabase.from("collection_products").delete().eq("collection_id", id);
    if (product_ids.length > 0) {
      const links = product_ids.map((pid: number, idx: number) => ({
        collection_id: parseInt(id),
        product_id: pid,
        sort_order: idx,
      }));
      await supabase.from("collection_products").insert(links);
    }
  }

  await supabase.from("activity_log").insert({
    admin_id: user.id,
    action: "updated",
    entity_type: "product",
    entity_id: parseInt(id),
    details: { ...collectionData, type: "collection" },
  });

  return NextResponse.json({ collection: data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Delete links first
  await supabase.from("collection_products").delete().eq("collection_id", id);

  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("activity_log").insert({
    admin_id: user.id,
    action: "deleted",
    entity_type: "product",
    entity_id: parseInt(id),
    details: { type: "collection" },
  });

  return NextResponse.json({ success: true });
}
