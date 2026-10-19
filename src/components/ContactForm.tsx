"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type Enquiry } from "@/lib/enquiry";
import { contactOptions, site } from "@/content/site";

type State = "idle" | "sent" | "fallback";

// Opens a pre-filled email draft. Used only if the API is unreachable.
function mailtoFallback(d: Enquiry) {
  const subject = encodeURIComponent(`Project enquiry: ${d.service}`);
  const body = encodeURIComponent(
    [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company || "-"}`,
      `Country: ${d.country || "-"}`,
      `Service: ${d.service}`,
      `Budget: ${d.budget || "-"}`,
      `Timeline: ${d.timeline || "-"}`,
      "",
      d.brief,
    ].join("\n"),
  );
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({ resolver: zodResolver(enquirySchema) });

  // Record where the visitor came from (UTM tags or referrer) for reporting.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"].map((k) => q.get(k)).filter(Boolean).join(" / ");
    let ref = "";
    try {
      ref = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {}
    setValue("source", (utm || ref || "direct").slice(0, 300));
  }, [setValue]);

  async function onSubmit(d: Enquiry) {
    setServerError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (res.ok) {
        setState("sent");
        reset();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 || res.status === 429) {
        setServerError(data.error ?? "Please check the form and try again.");
        return;
      }
      throw new Error(data.error);
    } catch {
      setState("fallback");
      mailtoFallback(d);
    }
  }

  if (state !== "idle") {
    return (
      <div className="form-done" role="status">
        {state === "sent" ? (
          <>
            <h3>Thank you, we&apos;ve got it.</h3>
            <p>A confirmation is on its way to your inbox. We&apos;ll reply within one working day.</p>
          </>
        ) : (
          <>
            <h3>Almost there.</h3>
            <p>
              Our form is having trouble, so we&apos;ve opened an email draft with your details instead. Just press
              send, or write to {site.email}.
            </p>
          </>
        )}
        <button className="underlink" onClick={() => setState("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (k: keyof Enquiry) =>
    errors[k] ? (
      <span className="field-error" role="alert">
        {errors[k]?.message}
      </span>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
      <div className="form-grid">
        <label>
          Your name
          <input {...register("name")} autoComplete="name" placeholder="Full name" aria-invalid={!!errors.name} />
          {err("name")}
        </label>
        <label>
          Email
          <input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} />
          {err("email")}
        </label>
        <label>
          Business / organisation <i>(optional)</i>
          <input {...register("company")} autoComplete="organization" placeholder="Company name" />
        </label>
        <label>
          Country <i>(optional)</i>
          <input {...register("country")} autoComplete="country-name" placeholder="e.g. India, UK, UAE" />
        </label>
        <label>
          What do you need?
          <select {...register("service")} defaultValue="" aria-invalid={!!errors.service}>
            <option value="" disabled>
              Choose a service
            </option>
            {contactOptions.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {err("service")}
        </label>
        <label>
          Budget range <i>(optional)</i>
          <select {...register("budget")} defaultValue="">
            <option value="">Select a range</option>
            {contactOptions.budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="chips">
        <legend>Timeline</legend>
        {contactOptions.timelines.map((t) => (
          <label key={t} className="chip">
            <input type="radio" value={t} {...register("timeline")} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>
      <label>
        Tell us about the project
        <textarea
          {...register("brief")}
          rows={4}
          placeholder="What does your business do, what should this project achieve, and is there anything you've already tried?"
          aria-invalid={!!errors.brief}
        />
        {err("brief")}
      </label>
      <input {...register("website")} className="hp" tabIndex={-1} autoComplete="off" aria-hidden />
      <input type="hidden" {...register("source")} />
      {serverError && (
        <p className="field-error" role="alert">
          {serverError}
        </p>
      )}
      <div className="form-foot">
        <button className="button button-accent" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"} <span aria-hidden>↗</span>
        </button>
        <p className="form-note">
          We reply within one working day. Your details are only used to respond to you, as described in our{" "}
          <a href="/privacy">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
