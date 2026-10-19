import { isAdmin } from "@/lib/auth";
import { listEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

const cols = ["created_at", "status", "score", "name", "email", "company", "country", "service", "budget", "timeline", "source", "brief"] as const;

// Quote every cell, and neutralise leading = + - @ so spreadsheets don't run them as formulas.
const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const rows = await listEnquiries();
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
