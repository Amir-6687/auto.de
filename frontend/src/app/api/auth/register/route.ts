import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5000";
const SECRET = process.env.INTERNAL_API_SECRET!;

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${BACKEND}/api/internal/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": SECRET, // ← سرور به سرور — امنه
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}