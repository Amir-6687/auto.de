import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_ROLES = new Set(["admin", "moderator", "super_admin"]);

async function authorize(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const role = token?.role as string | undefined;
  if (!token || !role || !ADMIN_ROLES.has(role)) return null;
  return token;
}

async function proxy(
  req: NextRequest,
  slug: string[],
  method: string,
) {
  const token = await authorize(req);
  if (!token) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const path = slug.join("/");
  const search = req.nextUrl.search;
  const backendBase = process.env.BACKEND_API_URL || "http://localhost:5000";
  const internal = process.env.INTERNAL_API_SECRET;
  if (!internal) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const url = `${backendBase}/api/admin/${path}${search}`;
  const init: RequestInit = {
    method,
    headers: {
      "x-internal-secret": internal,
    },
    cache: "no-store",
  };
  if (method !== "GET" && method !== "HEAD") {
    const ct = req.headers.get("content-type");
    if (ct) (init.headers as Record<string, string>)["Content-Type"] = ct;
    init.body = await req.arrayBuffer();
  }
  const res = await fetch(url, init);
  const body = await res.arrayBuffer();
  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type":
        res.headers.get("content-type") || "application/json; charset=utf-8",
    },
  });
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params;
  return proxy(req, slug, "GET");
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params;
  return proxy(req, slug, "PATCH");
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params;
  return proxy(req, slug, "PUT");
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params;
  return proxy(req, slug, "DELETE");
}
