import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { full_name } = body;

  if (!full_name || typeof full_name !== "string" || full_name.trim().length === 0) {
    return NextResponse.json({ error: "Full name is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("admin_users")
    .update({ full_name: full_name.trim() })
    .eq("id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ admin: data });
}
