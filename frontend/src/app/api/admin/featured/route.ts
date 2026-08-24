import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";
const SECRET = process.env.INTERNAL_API_SECRET!;
const ADMIN_ROLES = new Set(["admin", "moderator", "super_admin"]);

// ✅ GET عمومیه - برای صفحه اصلی
export async function GET(req: NextRequest) {
  const search = req.nextUrl.search;
  const res = await fetch(`${BACKEND}/api/admin/featured${search}`, {
    cache: "no-store",
    headers: { "x-internal-secret": SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// ✅ POST فقط ادمین
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role as string | undefined;
  if (!token || !role || !ADMIN_ROLES.has(role))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const res = await fetch(`${BACKEND}/api/admin/featured`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": SECRET,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}