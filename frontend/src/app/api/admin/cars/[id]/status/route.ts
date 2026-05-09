import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const body = await req.json();

  await fetch(`http://localhost:5000/api/cars/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ ok: true });
}
