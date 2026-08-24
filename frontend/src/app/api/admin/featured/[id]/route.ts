import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";
const SECRET = process.env.INTERNAL_API_SECRET!;
const ADMIN_ROLES = new Set(["admin", "moderator", "super_admin"]);

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ session check اضافه شد
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role as string | undefined;
  if (!token || !role || !ADMIN_ROLES.has(role))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const res = await fetch(`${BACKEND}/api/admin/featured/${id}`, {
    method: "DELETE",
    headers: { "x-internal-secret": SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}