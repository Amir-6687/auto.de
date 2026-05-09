import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: any) {
  await fetch(`http://localhost:5000/api/cars/${params.id}`, {
    method: "DELETE",
  });

  return NextResponse.json({ ok: true });
}
