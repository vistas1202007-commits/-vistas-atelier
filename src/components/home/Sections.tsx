import Link from "next/link";
import { Reveal, SplitText } from "../motion";
import { articles } from "@/content/journal";
import { engagements, faqs, industries, process, services, site } from "@/content/site";
import { ContactForm } from "../ContactForm";

export function Statement() {
  return (
    <section className="section statement" id="studio">
      <p className="eyebrow">The studio</p>
      <Reveal>
        <p className="statement-text">
          We&apos;re small on purpose. You talk directly to the people designing and building your project, so nothing
          gets lost between a sales call and the finished site. We ask a lot of questions first, and only then choose{" "}
          <span className="hl">the technology.</span>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <Link className="underlink" href="/about">
          More about how we work →
        </Link>
      </Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-head">
        <div>
          <p className="eyebrow">What we do</p>
          <SplitText text={"From a first website\nto a *custom tool.*"} />
        </div>
        <p>Pick one service or combine them. Either way, design and development happen together from day one.</p>
      </div>
      <div className="service-list">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <Link className="service" href="/#contact">
              <h3>{s.title}</h3>
              <div>
                <p>{s.body}</p>
                <ul className="tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <span className="service-arrow" aria-hidden>
                ↗
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="section industries" id="industries">
      <div className="section-head">
        <div>
          <p className="eyebrow">Who we build for</p>
          <SplitText text={"Different businesses,\nspecific needs."} />
        </div>
        <p>A few examples of what we typically build in each area. If yours isn&apos;t here, ask. Most projects start with a conversation.</p>
      </div>
      <div className="industry-grid">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} delay={(i % 3) * 0.08} className="industry">
            <span className="industry-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{ind.name}</h3>
            <ul>
              {ind.builds.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="section-head">
        <div>
          <p className="eyebrow">How a project runs</p>
          <SplitText text={"Six weeks, five steps,\n*no surprises.*"} />
        </div>
        <p>A typical Grow project. Smaller sites move faster, while apps are planned in phases, but the rhythm is the same.</p>
      </div>
      <ol className="process">
        {process.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.08}>
            <div className="process-top">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <em>{p.time}</em>
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <small>You get: {p.output}</small>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Engagements() {
  return (
    <section className="section engagements" id="pricing">
      <div className="section-head">
        <div>
          <p className="eyebrow">Ways to work together</p>
          <SplitText text={"Clear scope.\nFixed quotes."} />
        </div>
        <p>Every quote is fixed and written down before work starts. You&apos;ll know the price, the timeline and what&apos;s included.</p>
      </div>
      <div className="plans">
        {engagements.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.1} className={e.featured ? "plan featured" : "plan"}>
            {e.featured && <span className="plan-badge">Most requested</span>}
            <h3>{e.name}</h3>
            <p className="plan-for">{e.for}</p>
            <div className="plan-meta">
              <b>{e.price ?? "Fixed quote after a call"}</b>
              <span>{e.time}</span>
            </div>
            <ul>
              {e.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <Link className={e.featured ? "button button-accent" : "button button-ghost"} href="/#contact">
              Ask about {e.name}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function JournalPreview() {
  return (
    <section className="section journal-preview">
      <div className="section-head">
        <div>
          <p className="eyebrow">Journal</p>
          <SplitText text={"Notes for business\nowners going online."} />
        </div>
        <Link className="underlink" href="/journal">
          All articles →
        </Link>
      </div>
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
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="faq-grid">
        <div>
          <p className="eyebrow">Questions</p>
          <SplitText text={"Good to know\nbefore we start."} />
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Vistas Atelier, I'd like to discuss a project.")}`;
  return (
    <section className="contact" id="contact">
      <div className="section contact-inner">
        <div className="contact-side">
          <p className="eyebrow">Start a project</p>
          <SplitText text={"Tell us what\nyou're *building.*"} />
          <p className="contact-desc">
            A few details now saves a lot of back-and-forth later. We&apos;ll reply within one working day with
            questions or a time for a call.
          </p>
          <dl className="contact-facts">
            <div>
              <dt>Prefer chat?</dt>
              <dd>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp us ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Mon–Fri · {site.timezone}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
