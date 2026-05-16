import { ensureCatalog } from "@/lib/catalog";
import { requireUser } from "@/lib/auth/require-user";

/** Authenticated request entry — loads session user + seeds catalog. */
export async function bootstrapApp() {
  const user = await requireUser();
  await ensureCatalog();
  return user;
}

/** API routes — returns null when unauthenticated. */
export async function bootstrapAppApi() {
  const { requireUserApi } = await import("@/lib/auth/require-user");
  const user = await requireUserApi();
  if (!user) return null;
  await ensureCatalog();
  return user;
}
