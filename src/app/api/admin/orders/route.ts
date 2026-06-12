import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") || "desc";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  let query = supabase.from("orders").select("*, products(title)", { count: "exact" });

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(`company_name.ilike.%${search}%,contact_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const sortColumns: Record<string, string> = {
    created_at: "created_at",
    company_name: "company_name",
    status: "status",
    total_value: "total_value",
    id: "id",
  };
  const sortCol = sortColumns[sort] || "created_at";
  const ascending = order === "asc";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order(sortCol, { ascending })
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
  const { company_name, contact_name, email, phone, product_id, quantity, notes, total_value, currency } = body;

  if (!company_name || !contact_name || !email) {
    return NextResponse.json({ error: "Company, contact, and email are required" }, { status: 400 });
  }

  const insertData: Record<string, unknown> = {
    company_name,
    contact_name,
    email,
    phone,
    product_id: product_id || null,
    quantity: quantity ? parseInt(quantity) : null,
    notes,
  };
  if (total_value) insertData.total_value = parseFloat(total_value);
  if (currency) insertData.currency = currency;

  const { data, error } = await supabase
    .from("orders")
    .insert(insertData)
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
