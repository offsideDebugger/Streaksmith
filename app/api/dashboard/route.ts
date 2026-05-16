import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { getDashboardData } from "@/lib/dashboard";

export async function GET() {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const data = await getDashboardData(auth.user.id);
  return NextResponse.json(data);
}
