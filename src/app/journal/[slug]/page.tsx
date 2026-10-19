import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SplitText } from "@/components/motion";
import { articles, getArticle } from "@/content/journal";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const date = new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="section page-top article">
      <Link href="/journal" className="back-link">
        ← Journal
      </Link>
      <p className="eyebrow">
        {a.category} · {a.readTime}
      </p>
      <SplitText as="h1" immediate text={a.title} className="page-title article-title" />
      <p className="article-meta">
        By {site.founder} · <time dateTime={a.date}>{date}</time>
      </p>
      <div className="prose">
        {a.body.map((b, i) => (
          <div key={i}>
            {b.heading && <h2>{b.heading}</h2>}
            <p>{b.text}</p>
          </div>
        ))}
      </div>
      <div className="article-cta">
        <p>Want a second opinion on your own website?</p>
        <Link className="button button-accent" href="/#contact">
          Ask us ↗
        </Link>
      </div>
    </article>
  );
}
