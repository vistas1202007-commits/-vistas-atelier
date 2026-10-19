import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

// Website terms only. Project terms belong in each client proposal/contract.
export default function Terms() {
  return (
    <article className="section page-top article">
      <p className="eyebrow">Legal</p>
      <h1 className="page-title article-title">Terms of use</h1>
      <p className="article-meta">Last updated: October 2026</p>
      <div className="prose">
        <p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>
        <h2>Content</h2>
        <p>
          All text, designs and code on this site belong to {site.name} unless stated otherwise. Concept projects are
          self-initiated studies; any names, figures or reviews shown inside them are illustrative.
        </p>
        <h2>No professional advice</h2>
        <p>Articles in the journal are general guidance and not a substitute for advice on your specific situation.</p>
        <h2>Client work</h2>
        <p>
          Every project is governed by its own written proposal and agreement, which take precedence over anything on
          this website.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to {site.email}.</p>
      </div>
    </article>
  );
}
