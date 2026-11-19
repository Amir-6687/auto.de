import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";
const SECRET = process.env.INTERNAL_API_SECRET!;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; carId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, carId } = await params;
  const res = await fetch(
    `${BACKEND}/api/internal/users/${userId}/favorites/${carId}`,
    { method: "DELETE", headers: { "x-internal-secret": SECRET } }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}