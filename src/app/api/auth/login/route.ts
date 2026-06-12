import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "You are not authorized as an admin" }, { status: 403 });
  }

  return NextResponse.json({
    user: data.user,
    admin: adminUser,
    session: data.session,
  });
}
