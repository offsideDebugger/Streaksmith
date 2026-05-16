import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireUserApi() {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }
  return user;
}
