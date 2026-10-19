import Link from "next/link";
import { BeautyMockup, MenuMockup } from "../Mockups";
import { Magnetic, Parallax, Reveal, SplitText } from "../motion";
import { capabilities, site } from "@/content/site";

export function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Reveal y={12}>
            <p className="eyebrow">Independent digital studio · India → worldwide</p>
          </Reveal>
          <SplitText
            as="h1"
            immediate
            delay={0.15}
            text={"Websites, apps and\ndata tools that\n*earn their keep.*"}
          />
          <Reveal delay={0.5}>
            <p className="hero-desc">
              We help small and growing businesses turn an idea into a site or tool people actually use, designed and
              built by the same small team from first sketch to launch.
            </p>
            <div className="actions">
              <Magnetic>
                <Link className="button button-accent" href="/#work">
                  See selected work <span aria-hidden>↘</span>
                </Link>
              </Magnetic>
              {site.bookingUrl ? (
                <a className="underlink" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a free 20-minute call ↗
                </a>
              ) : (
                <Link className="underlink" href="/#contact">
                  Book a free 20-minute call
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        <div className="hero-stage" aria-hidden>
          <Parallax offset={16} className="stage-browser">
            <BeautyMockup />
          </Parallax>
          <Parallax offset={44} className="stage-phone">
            <MenuMockup />
          </Parallax>
          <Parallax offset={60} className="stage-chip chip-a">
            <span className="chip-dot" /> New booking · Hydra facial · Thu 12:30
          </Parallax>
          <Parallax offset={30} className="stage-chip chip-b">
            <b>✓</b> Enquiry received · Website redesign
          </Parallax>
        </div>

        <ul className="hero-facts">
          <li>Design and development under one roof</li>
          <li>Fixed quotes, no hourly surprises</li>
          <li>Remote-friendly across time zones</li>
        </ul>
      </section>

      <div className="marquee" aria-label="What we build">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1}>
              {capabilities.map((c) => (
                <span key={c}>
                  {c}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
