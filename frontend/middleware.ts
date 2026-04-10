import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_ROLES = new Set(["admin", "moderator", "super_admin"]);

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const role = token?.role as string | undefined;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!role || !ADMIN_ROLES.has(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
