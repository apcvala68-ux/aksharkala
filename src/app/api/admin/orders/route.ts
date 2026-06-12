import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  let query = supabase.from("orders").select("*, products(title)", { count: "exact" });

  if (status) {
    query = query.eq("status", status);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    orders: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { company_name, contact_name, email, phone, product_id, quantity, notes } = body;

  if (!company_name || !contact_name || !email) {
    return NextResponse.json({ error: "Company, contact, and email are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      company_name,
      contact_name,
      email,
      phone,
      product_id,
      quantity,
      notes,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("activity_log").insert({
    admin_id: user.id,
    action: "created",
    entity_type: "order",
    entity_id: data.id,
    details: { company_name, product_id },
  });

  return NextResponse.json({ order: data }, { status: 201 });
}
