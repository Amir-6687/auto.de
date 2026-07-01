import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function POST(req: Request, { params }: any) {
  const { id } = params;

  await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
  });

  return NextResponse.redirect("http://localhost:3000/cars");
}
