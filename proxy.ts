import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

const AUTH_PAGES = ["/login", "/signup"];
const PROTECTED_PREFIXES = ["/app", "/habits", "/rewards", "/insights"];
const PROTECTED_API_PREFIXES = [
  "/api/habits",
  "/api/dashboard",
  "/api/missions",
  "/api/rewards",
  "/api/streak-freeze",
];

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return true;
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isProtectedApi(pathname: string) {
  return PROTECTED_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = isAuthenticated(request);

  if (AUTH_PAGES.includes(pathname) && authed) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (isProtectedPath(pathname) && !authed) {
    const login = new URL("/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  if (isProtectedApi(pathname) && !authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app",
    "/app/:path*",
    "/habits",
    "/habits/:path*",
    "/rewards",
    "/rewards/:path*",
    "/insights",
    "/insights/:path*",
    "/login",
    "/signup",
    "/api/habits",
    "/api/habits/:path*",
    "/api/dashboard",
    "/api/missions",
    "/api/rewards",
    "/api/rewards/:path*",
    "/api/streak-freeze",
  ],
};
