import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Single-user admin login. Set ADMIN_PASSWORD (and optionally ADMIN_SECRET) in .env.local.
const PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.ADMIN_SECRET ?? PASSWORD ?? "";
export const COOKIE = "va_admin";
export const adminEnabled = Boolean(PASSWORD);

const token = () => createHmac("sha256", SECRET).update(`admin:${PASSWORD}`).digest("hex");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(input: string) {
  return adminEnabled && safeEqual(input, PASSWORD!);
}

export async function isAdmin() {
  if (!adminEnabled) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value && safeEqual(value, token()));
}

export async function signIn() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}
