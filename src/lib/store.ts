import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Enquiry, Status, StoredEnquiry } from "./enquiry";

// Where enquiries are kept, picked automatically:
// 1. Supabase, when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.
// 2. Netlify Blobs, when running on Netlify (free, no setup or extra account).
// 3. data/enquiries.json, for local development.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const mode: "supabase" | "netlify" | "file" =
  SUPABASE_URL && SUPABASE_KEY ? "supabase" : process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT ? "netlify" : "file";

const FILE = path.join(process.cwd(), "data", "enquiries.json");

async function supabase(pathAndQuery: string, init: RequestInit = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY!,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

async function blobs() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "enquiries", consistency: "strong" });
}

async function readFile(): Promise<StoredEnquiry[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeFile(rows: StoredEnquiry[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(rows, null, 2));
}

export async function saveEnquiry(e: Omit<Enquiry, "website">, score: number): Promise<StoredEnquiry> {
  const row: StoredEnquiry = { ...e, id: randomUUID(), created_at: new Date().toISOString(), status: "new", score };
  if (mode === "supabase") {
    const [saved] = await supabase("enquiries", { method: "POST", body: JSON.stringify(row) });
    return saved;
  }
  if (mode === "netlify") {
    // One blob per enquiry, keyed by time so listing is naturally chronological.
    await (await blobs()).setJSON(`${row.created_at}_${row.id}`, row);
    return row;
  }
  const rows = await readFile();
  rows.unshift(row);
  await writeFile(rows);
  return row;
}

export async function listEnquiries(): Promise<StoredEnquiry[]> {
  if (mode === "supabase") return supabase("enquiries?select=*&order=created_at.desc&limit=500");
  if (mode === "netlify") {
    const store = await blobs();
    const { blobs: keys } = await store.list();
    const rows = await Promise.all(keys.map((b) => store.get(b.key, { type: "json" }) as Promise<StoredEnquiry | null>));
    return rows.filter((r): r is StoredEnquiry => Boolean(r)).sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
  return readFile();
}

export async function updateStatus(id: string, status: Status) {
  if (mode === "supabase") {
    await supabase(`enquiries?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) });
    return;
  }
  if (mode === "netlify") {
    const store = await blobs();
    const { blobs: keys } = await store.list();
    const key = keys.find((b) => b.key.endsWith(`_${id}`))?.key;
    if (!key) return;
    const row = (await store.get(key, { type: "json" })) as StoredEnquiry | null;
    if (row) await store.setJSON(key, { ...row, status });
    return;
  }
  const rows = await readFile();
  const row = rows.find((r) => r.id === id);
  if (row) {
    row.status = status;
    await writeFile(rows);
  }
}

export const storageMode = { supabase: "Supabase", netlify: "Netlify Blobs", file: "Local file (data/enquiries.json)" }[mode];
