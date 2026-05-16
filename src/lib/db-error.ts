import { Prisma } from "@prisma/client";

export function formatDbError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1001") {
      return "Cannot reach the database server. Check Neon is awake and DATABASE_URL is correct.";
    }
    if (error.code === "P2021" || error.code === "P2022") {
      return "Database schema is out of date. Run: bun run db:setup";
    }
    return error.message;
  }
  if (error instanceof Error) {
    if (error.message.includes("DATABASE_URL")) return error.message;
    if (error.message.includes("Invalid") && error.message.includes("invocation")) {
      return "Database unreachable or schema not migrated. Run bun run db:setup and restart bun dev.";
    }
    return error.message;
  }
  return "Unknown database error";
}
