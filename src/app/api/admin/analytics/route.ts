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

      const { count: replied } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "replied");

      const { count: closed } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "closed");

      const { data: recent } = await supabase
        .from("inquiries")
        .select("*, products(title)")
        .order("created_at", { ascending: false })
        .limit(5);

      return NextResponse.json({ total: total || 0, pending: pending || 0, replied: replied || 0, closed: closed || 0, recent: recent || [] });
    }

    case "orders": {
      const { count: total } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .neq("status", "cancelled");

      const { count: quoted } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "quoted");

      const { count: confirmed } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed");

      const { count: processing } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "processing");

      const { count: shipped } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "shipped");

      const { count: delivered } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "delivered");

      return NextResponse.json({
        total: total || 0,
        quoted: quoted || 0,
        confirmed: confirmed || 0,
        processing: processing || 0,
        shipped: shipped || 0,
        delivered: delivered || 0,
      });
    }

    case "products": {
      const { count: total } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      return NextResponse.json({ total: total || 0 });
    }

    case "summary": {
      const [inquiriesRes, ordersRes, productsRes] = await Promise.all([
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }).neq("status", "cancelled"),
        supabase.from("products").select("*", { count: "exact", head: true }),
      ]);

      const totalInq = inquiriesRes.count || 0;
      const totalOrd = ordersRes.count || 0;

      return NextResponse.json({
        totalInquiries: totalInq,
        totalOrders: totalOrd,
        totalProducts: productsRes.count || 0,
        conversionRate: totalInq > 0 ? Math.round((totalOrd / totalInq) * 100) : 0,
      });
    }

    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
