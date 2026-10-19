import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Reveal, SplitText } from "../motion";
import { site } from "@/content/site";

// Drop a real portrait at public/studio/founder.jpg and it replaces the initials automatically.
const PORTRAIT = "/studio/founder.jpg";
const hasPortrait = () => fs.existsSync(path.join(process.cwd(), "public", PORTRAIT));

// A "studio table" of real working artefacts (brief, wireframe, palette, type, code)
// instead of a stock photo of people around a laptop.
function Board() {
  return (
    <div className="board" aria-label="Working artefacts from a project: a brief, wireframe, colour palette, type specimen and code">
      <Reveal className="bd bd-note" y={40}>
        <small>Brief · Aaina</small>
        <p>
          Who books? <b>Working women, 25–40, on mobile, 9–11 pm.</b> They need prices and free slots without calling.
        </p>
      </Reveal>
      <Reveal className="bd bd-wire" y={60} delay={0.1}>
        <small>Wireframe v2 · Booking</small>
        <div className="wf">
          <i className="wf-h" />
          <i className="wf-l" />
          <i className="wf-l short" />
          <div className="wf-slots">
            <i />
            <i className="on" />
            <i />
            <i />
            <i />
            <i />
          </div>
          <i className="wf-btn" />
        </div>
      </Reveal>
      <Reveal className="bd bd-palette" y={50} delay={0.2}>
        {["#F3D9D1", "#C9806D", "#4A2E27", "#FBF4EE"].map((c) => (
          <span key={c} style={{ background: c }}>
            <em>{c}</em>
          </span>
        ))}
      </Reveal>
      <Reveal className="bd bd-type" y={70} delay={0.15}>
        <b>Aa</b>
        <small>
          Instrument Serif
          <br />
          Display · 400
        </small>
      </Reveal>
      <Reveal className="bd bd-code" y={40} delay={0.25}>
        <code>
          <span className="c-k">&lt;BookingSlot</span>
          <br />
          &nbsp;&nbsp;time=<span className="c-s">&quot;12:30&quot;</span>
          <br />
          &nbsp;&nbsp;deposit=<span className="c-s">{"{500}"}</span>
          <br />
          <span className="c-k">/&gt;</span>
        </code>
      </Reveal>
    </div>
  );
}

export function Studio() {
  const portrait = hasPortrait();
  return (
    <section className="section studio" id="people">
      <Board />
      <div className="studio-copy">
        <p className="eyebrow">People &amp; perspective</p>
        <SplitText text={"A studio you can\n*actually reach.*"} />
        <div className="founder">
          {portrait ? (
            <Image src={PORTRAIT} alt={site.founder} width={64} height={64} className="founder-img" />
          ) : (
            <span className="founder-img initials" aria-hidden>
              {site.founder
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          )}
          <span>
            <b>{site.founder}</b>
            <em>Founder · Design &amp; development</em>
          </span>
        </div>
        <p>
          Vistas Atelier was started by {site.founder} to give small businesses the kind of careful, considered digital
          work usually reserved for big budgets. Every project begins with understanding the business, its customers
          and its constraints, before a single screen is designed.
        </p>
        <p>
          For larger projects we bring in trusted specialists such as copywriters, photographers and backend
          engineers, but you always have one point of contact from start to finish.
        </p>
        <Link className="underlink" href="/about">
          Read the studio story →
        </Link>
      </div>
    </section>
  );
}
