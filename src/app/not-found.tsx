import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-top not-found">
      <p className="eyebrow">404</p>
      <h1 className="page-title">This page took a wrong turn.</h1>
      <p className="page-lede">The link may be old, or the page may have moved.</p>
      <Link className="button button-accent" href="/">
        Back to the homepage
      </Link>
    </section>
  );
}
