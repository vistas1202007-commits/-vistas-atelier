import "server-only";
import type { StoredEnquiry } from "./enquiry";
import { site } from "@/content/site";

// Sends email through Resend when RESEND_API_KEY is set; otherwise logs and skips.
// RESEND_FROM must be an address on a domain verified in Resend, e.g. "Vistas Atelier <hello@vistasatelier.com>".
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? "Vistas Atelier <onboarding@resend.dev>";
const TO = process.env.ENQUIRY_TO ?? site.email;

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function send(payload: Record<string, unknown>) {
  if (!KEY) {
    console.info("[email] RESEND_API_KEY not set, skipping:", payload.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, ...payload }),
  });
  if (!res.ok) console.error("[email] Resend error", res.status, await res.text());
}

export async function notifyStudio(e: StoredEnquiry) {
  const rows: [string, string | undefined][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Company", e.company],
    ["Country", e.country],
    ["Service", e.service],
    ["Budget", e.budget],
    ["Timeline", e.timeline],
    ["Lead score", `${e.score}/100`],
    ["Source", e.source],
  ];
  await send({
    to: TO,
    reply_to: e.email,
    subject: `New enquiry (${e.score}/100): ${e.service} from ${e.name}`,
    html: `<h2 style="font-family:Georgia,serif">New project enquiry</h2>
<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="color:#76665b">${k}</td><td><b>${esc(v || "-")}</b></td></tr>`).join("")}
</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #c2512f;padding-left:12px">${esc(e.brief)}</p>`,
  });
}

export async function confirmToClient(e: StoredEnquiry) {
  const first = e.name.split(" ")[0];
  await send({
    to: e.email,
    reply_to: TO,
    subject: "We've received your enquiry | Vistas Atelier",
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#3b2c24;max-width:560px">
<p>Hi ${esc(first)},</p>
<p>Thanks for telling us about your project. We've received your enquiry about <b>${esc(e.service)}</b> and will reply within one working day, usually with a few questions or a time for a short call.</p>
<p>If anything is urgent, just reply to this email or message us on WhatsApp.</p>
<p>Warm regards,<br/>${esc(site.founder)}<br/>Vistas Atelier</p>
</div>`,
  });
}
