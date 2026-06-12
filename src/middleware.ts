import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const supabaseToken = request.cookies.get("sb-swhjjgsyufuxeprlwxeb-auth-token")?.value;

    // If no token and not on login page, redirect to login
    if (!supabaseToken && !request.nextUrl.pathname.startsWith("/admin/login")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    // If has token and on login page, redirect to admin dashboard
    if (supabaseToken && request.nextUrl.pathname === "/admin/login") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
