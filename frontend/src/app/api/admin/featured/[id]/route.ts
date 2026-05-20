import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";
const SECRET = process.env.INTERNAL_API_SECRET!;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${BACKEND}/api/admin/featured/${id}`, {
    method: "DELETE",
    headers: { "x-internal-secret": SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}