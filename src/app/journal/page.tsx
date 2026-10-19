import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, SplitText } from "@/components/motion";
import { articles } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Practical notes on websites, apps and digital growth for small and growing businesses.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
  return (
    <section className="section page-top">
      <p className="eyebrow">Journal</p>
      <SplitText as="h1" immediate text={"Notes for business\nowners going online."} className="page-title" />
      <p className="page-lede">Short, practical articles. No jargon, no growth hacks, just what we&apos;d tell a client over coffee.</p>
      <div className="journal-list">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08}>
            <Link className="insight" href={`/journal/${a.slug}`} data-cursor="Read">
              <small>{a.category}</small>
              <div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </div>
              <span>{a.readTime} →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
