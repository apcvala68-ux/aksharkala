import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("section_key, content")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const map: Record<string, unknown> = {};
  data.forEach((s) => { map[s.section_key] = s.content; });
  return NextResponse.json(map);
}
