import Link from "next/link";
import { Mockup } from "../Mockups";
import { Reveal, SplitText } from "../motion";
import { projects, type Project } from "@/content/projects";

export function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} className={`project ${large ? "project-large" : ""}`} data-cursor="View">
      <div className={`project-stage stage-${p.mockup}`}>
        <div className="project-mock">
          <Mockup kind={p.mockup} />
        </div>
      </div>
      <div className="project-caption">
        <div>
          <small>
            {p.kind} project · {p.sector} · {p.year}
          </small>
          <h3>{p.name}</h3>
          <p>{p.tagline}</p>
        </div>
        <ul className="tags">
          {p.scope.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <div>
          <p className="eyebrow">Selected work</p>
          <SplitText text={"Real problems,\n*worked through.*"} />
        </div>
        <p>
          Self-initiated concept projects, each built around a real problem we see small businesses face. Concepts
          are always labelled as concepts.
        </p>
      </div>
      <div className="work-grid">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i === 0 || i === 3 ? "span-wide" : "span-narrow"}>
            <ProjectCard p={p} large={i === 0 || i === 3} />
          </Reveal>
        ))}
      </div>
      <div className="work-bottom">
        <span>Want to see how one of these was planned?</span>
        <Link className="underlink" href="/work">
          Read the case studies ↗
        </Link>
      </div>
    </section>
  );
}
