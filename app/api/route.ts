// app/api/auth/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "admin@saas.com" && password === "123456") {
    return NextResponse.json({ token: "fake-jwt-token" });
  }
  return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
}
