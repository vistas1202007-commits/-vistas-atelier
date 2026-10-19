// Remounts on every navigation, so the CSS fade-in replays per page.
// Pure CSS keeps content visible even before (or without) JavaScript.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
