import { NextResponse } from "next/server";
import { enquirySchema, scoreLead } from "@/lib/enquiry";
import { saveEnquiry } from "@/lib/store";
import { confirmToClient, notifyStudio } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many enquiries, please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { website, ...enquiry } = parsed.data;
  // Bots that fill the hidden field get a fake success, so they don't retry.
  if (website) return NextResponse.json({ ok: true });

  try {
    const saved = await saveEnquiry(enquiry, scoreLead(parsed.data));
    await Promise.allSettled([notifyStudio(saved), confirmToClient(saved)]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] failed to save", err);
    return NextResponse.json({ error: "We couldn't save your enquiry." }, { status: 500 });
  }
}
