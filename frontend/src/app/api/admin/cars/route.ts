import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/api/cars";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const status = searchParams.get("status") || "";
  const brand = searchParams.get("brand") || "";
  const search = searchParams.get("search") || "";

  const q = new URLSearchParams({ page, limit });
  if (status) q.set("status", status);
  if (brand) q.set("brand", brand);
  if (search) q.set("search", search);

  const res = await fetch(`${API_URL}?${q}`, { cache: "no-store" });
  const data = await res.json();

  return NextResponse.json(data);
}
