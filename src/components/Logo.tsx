import Link from "next/link";

// The mark is an arched window with a horizon line: a "vista" seen through an atelier window.
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className="logo-mark">
      <path d="M5 29V15C5 8.9 9.9 4 16 4s11 4.9 11 11v14" stroke="currentColor" strokeWidth="2.2" />
      <path d="M5 21h22" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="21" r="4.2" fill="var(--accent)" />
      <path d="M5 29h22" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Vistas Atelier, home">
      <LogoMark />
      <span>
        Vistas <em>Atelier</em>
      </span>
    </Link>
  );
}
