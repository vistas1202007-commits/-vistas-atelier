"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, isAdmin, signIn, signOut } from "@/lib/auth";
import { STATUSES, type Status } from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";
import { updateStatus } from "@/lib/store";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!rateLimit("admin-login", 10, 15 * 60 * 1000)) return "Too many attempts. Try again in 15 minutes.";
  if (!checkPassword(String(form.get("password") ?? ""))) return "Incorrect password.";
  await signIn();
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin");
}

export async function setStatus(form: FormData) {
  if (!(await isAdmin())) return;
  const id = String(form.get("id"));
  const status = String(form.get("status")) as Status;
  if (!STATUSES.includes(status)) return;
  await updateStatus(id, status);
  revalidatePath("/admin");
}
