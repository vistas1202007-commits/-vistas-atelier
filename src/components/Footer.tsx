import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Vistas Atelier, I'd like to discuss a project.")}`;
  return (
    <footer className="footer">
      <div className="footer-cta">
        <p>Have a project in mind?</p>
        <Link href="/#contact" className="footer-big">
          Let&apos;s talk <span aria-hidden>↗</span>
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <Logo />
          <p className="footer-desc">
            An independent digital studio in {site.location}, working with businesses at home and abroad.
          </p>
        </div>
        <div>
          <small>Explore</small>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <small>Contact</small>
          <a href={`mailto:${site.email}`}>Email us</a>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span className="muted">{site.timezone}</span>
        </div>
        <div>
          <small>Elsewhere</small>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Vistas Atelier, I'd like to discuss a project.")}`;
  return (
    <a className="whatsapp" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
