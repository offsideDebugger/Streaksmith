import { createHmac, timingSafeEqual } from "crypto";

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production");
  }
  return secret ?? "dev-only-change-me-in-production";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionToken(userId: string) {
  const issuedAt = Date.now().toString();
  const payload = `${userId}:${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

export function parseSessionToken(token: string) {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const [userId] = payload.split(":");
  return userId ?? null;
}
