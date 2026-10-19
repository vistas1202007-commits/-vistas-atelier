import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

// Starter policy. Have it reviewed before launch, and update it when analytics or a form backend are added.
export default function Privacy() {
  return (
    <article className="section page-top article">
      <p className="eyebrow">Legal</p>
      <h1 className="page-title article-title">Privacy policy</h1>
      <p className="article-meta">Last updated: October 2026</p>
      <div className="prose">
        <p>
          This policy explains what information {site.name} (&quot;we&quot;) collects through this website and how we
          use it. We collect as little as possible.
        </p>
        <h2>Information you give us</h2>
        <p>
          When you send an enquiry, we receive the details you enter: your name, email address, and optionally your
          company, country, budget, timeline and project description. We use this only to reply to you and to prepare
          a proposal. We never sell it or share it for marketing.
        </p>
        <h2>Information collected automatically</h2>
        <p>
          We may use privacy-friendly analytics to understand which pages are visited and how the site performs. This
          data is aggregated and is not used to identify you personally.
        </p>
        <h2>How long we keep it</h2>
        <p>
          Enquiries are kept for up to 24 months so we can follow up on projects, unless you ask us to delete them
          sooner.
        </p>
        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct or delete your personal data at any time by emailing {site.email}. If you
          are in the EU or UK, you also have rights under the GDPR, and in India under the Digital Personal Data
          Protection Act, 2023.
        </p>
        <h2>Contact</h2>
        <p>For any privacy question, write to {site.email}.</p>
      </div>
    </article>
  );
}
