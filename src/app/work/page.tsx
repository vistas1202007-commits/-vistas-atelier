import type { Metadata } from "next";
import { ProjectCard } from "@/components/home/Work";
import { Reveal, SplitText } from "@/components/motion";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and concept projects by Vistas Atelier: websites, apps and dashboards built around real business problems.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <section className="section page-top">
      <p className="eyebrow">Work</p>
      <SplitText as="h1" immediate text={"Projects, and\n*the thinking behind them.*"} className="page-title" />
      <p className="page-lede">
        Each case study walks through the problem, the decisions we made and what was built. Concept projects are
        self-initiated studies and are labelled as such.
      </p>
      <div className="work-grid work-grid-page">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.1} className="span-half">
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
