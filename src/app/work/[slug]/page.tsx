import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mockup } from "@/components/Mockups";
import { Reveal, SplitText } from "@/components/motion";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.name}: ${p.tagline}`, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case">
      <header className="section page-top case-head">
        <Link href="/work" className="back-link">
          ← All work
        </Link>
        <p className="eyebrow">
          {p.kind} project · {p.sector} · {p.year}
        </p>
        <SplitText as="h1" immediate text={p.name} className="page-title" />
        <p className="page-lede">{p.tagline}</p>
        <dl className="case-meta">
          <div>
            <dt>Scope</dt>
            <dd>{p.scope.join(", ")}</dd>
          </div>
          <div>
            <dt>Sector</dt>
            <dd>{p.sector}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{p.kind === "Concept" ? "Self-initiated concept" : "Client project"}</dd>
          </div>
        </dl>
        {p.liveUrl && (
          <a className="button button-accent case-live" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
            View live site ↗
          </a>
        )}
      </header>

      <Reveal className={`case-hero project-stage stage-${p.mockup}`}>
        <div className="project-mock">
          <Mockup kind={p.mockup} />
        </div>
      </Reveal>

      <div className="section case-body">
        <Reveal className="case-block">
          <h2 className="case-h">The problem</h2>
          <p className="case-lead">{p.challenge}</p>
        </Reveal>

        <div className="case-block">
          <h2 className="case-h">What we did</h2>
          <div className="case-approach">
            {p.approach.map((a, n) => (
              <Reveal key={a.title} delay={n * 0.08}>
                <span>{String(n + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="case-block case-split">
          <div>
            <h2 className="case-h">Key features</h2>
            <ul className="case-features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="case-h">Visual language</h2>
            <div className="case-palette">
              {p.palette.map((c) => (
                <span key={c.hex}>
                  <i style={{ background: c.hex }} />
                  <b>{c.name}</b>
                  <em>{c.hex}</em>
                </span>
              ))}
            </div>
            <p className="case-type">Type: {p.type.join(" + ")}</p>
          </div>
        </Reveal>

        {p.kind === "Concept" && (
          <p className="case-note">
            This is a self-initiated concept, not a client commission. Names, figures and reviews shown in the
            interface are illustrative.
          </p>
        )}
      </div>

      <Link href={`/work/${next.slug}`} className="next-case" data-cursor="Next">
        <small>Next project</small>
        <span>{next.name} →</span>
      </Link>
    </article>
  );
}
