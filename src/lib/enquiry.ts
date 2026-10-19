import { z } from "zod";

// Shared by the browser form and the API route so validation can't drift apart.
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  company: z.string().trim().max(160).optional(),
  country: z.string().trim().max(80).optional(),
  service: z.string().min(1, "Choose the closest option").max(80),
  budget: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
  brief: z.string().trim().min(20, "A couple of sentences helps us prepare (20+ characters)").max(5000),
  // Honeypot: real visitors never see or fill this field.
  // Not validated, so a filled value reaches the API, which quietly discards it.
  website: z.string().max(500).optional(),
  // Where the visitor came from, captured silently for reporting.
  source: z.string().max(300).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export const STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;
export type Status = (typeof STATUSES)[number];

export type StoredEnquiry = Omit<Enquiry, "website"> & {
  id: string;
  created_at: string;
  status: Status;
  score: number;
};

// A simple lead score (0–100) so the most promising enquiries are answered first.
// Weights are deliberately transparent; tune them once real data comes in.
export function scoreLead(e: Enquiry): number {
  let s = 20;
  const budget = e.budget ?? "";
  if (budget.startsWith("₹8L")) s += 35;
  else if (budget.startsWith("₹3L")) s += 28;
  else if (budget.startsWith("₹1L")) s += 18;
  else if (budget.startsWith("Under")) s += 8;
  if (e.timeline === "As soon as possible") s += 15;
  else if (e.timeline === "Within 1–2 months") s += 12;
  else if (e.timeline === "In 3+ months") s += 5;
  if (e.brief.length > 300) s += 12;
  else if (e.brief.length > 120) s += 7;
  if (e.company) s += 8;
  if (e.service && e.service !== "Not sure yet") s += 5;
  return Math.min(100, s);
}
