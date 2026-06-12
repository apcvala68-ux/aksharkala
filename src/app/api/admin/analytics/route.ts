import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (type) {
    case "inquiries": {
      const { count: total } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true });

      const { count: pending } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { data: recent } = await supabase
        .from("inquiries")
        .select("*, products(title)")
        .order("created_at", { ascending: false })
        .limit(5);

      return NextResponse.json({ total: total || 0, pending: pending || 0, recent: recent || [] });
    }

    case "orders": {
      const { count: total } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .neq("status", "cancelled");

      return NextResponse.json({ total: total || 0 });
    }

    case "products": {
      const { count: total } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      return NextResponse.json({ total: total || 0 });
    }

    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
