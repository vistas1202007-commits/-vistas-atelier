import type { Metadata } from "next";
import Link from "next/link";
import { Studio } from "@/components/home/StudioBoard";
import { Reveal, SplitText } from "@/components/motion";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description: `About Vistas Atelier, an independent digital studio founded by ${site.founder}.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Understand before designing",
    body: "We spend the first week on your customers and your business model, not on colours. Most bad websites are the result of skipping this step.",
  },
  {
    title: "Specific over impressive",
    body: "Clear words, real photos and honest prices beat clever taglines. We'd rather your site be useful than award-bait.",
  },
  {
    title: "Small enough to care",
    body: "We take on a limited number of projects at a time, so each one gets proper attention and you always know who's working on it.",
  },
  {
    title: "You own everything",
    body: "Your domain, code, accounts and design files are yours. No lock-in, no hostage hosting.",
  },
];

export default function About() {
  return (
    <>
      <section className="section page-top">
        <p className="eyebrow">The studio</p>
        <SplitText as="h1" immediate text={"Careful digital work,\n*without the agency layers.*"} className="page-title" />
        <p className="page-lede">
          Vistas Atelier is an independent studio based in {site.location}, working with small and growing businesses
          at home and abroad. We design and build websites, web apps and data tools, and we stay involved after
          launch.
        </p>
      </section>
      <Studio />
      <section className="section principles">
        <p className="eyebrow">What we believe</p>
        <div className="principle-grid">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="principle">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
        <Link className="button button-accent" href="/#contact">
          Start a conversation ↗
        </Link>
      </section>
    </>
  );
}
