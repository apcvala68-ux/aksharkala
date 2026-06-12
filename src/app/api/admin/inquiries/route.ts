import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") || "desc";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";

  let query = supabase.from("inquiries").select("*, products(title)", { count: "exact" });

  if (search) {
    query = query.or(`company_name.ilike.%${search}%,contact_name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  if (status) {
    query = query.eq("status", status);
  }
  if (dateFrom) {
    query = query.gte("created_at", new Date(dateFrom).toISOString());
  }
  if (dateTo) {
    const to = new Date(dateTo);
    to.setDate(to.getDate() + 1);
    query = query.lt("created_at", to.toISOString());
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const sortColumns: Record<string, string> = {
    created_at: "created_at",
    company_name: "company_name",
    contact_name: "contact_name",
    status: "status",
    id: "id",
  };
  const sortCol = sortColumns[sort] || "created_at";

  const { data, count, error } = await query
    .order(sortCol, { ascending: order === "asc" })
    .range(from, to);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    inquiries: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}
