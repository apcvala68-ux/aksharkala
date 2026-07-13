import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({}, { status: 200 });
  }

  const { createClient } = await import("@/utils/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("section_key, content")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data) {
    return NextResponse.json({}, { status: 200 });
  }

  const map: Record<string, unknown> = {};
  data.forEach((s) => { map[s.section_key] = s.content; });
  return NextResponse.json(map);
}
