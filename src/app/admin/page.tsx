import type { Metadata } from "next";
import { adminEnabled, isAdmin } from "@/lib/auth";
import { STATUSES, type StoredEnquiry } from "@/lib/enquiry";
import { listEnquiries, storageMode } from "@/lib/store";
import { logout, setStatus } from "./actions";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Enquiries", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function countBy(rows: StoredEnquiry[], key: (r: StoredEnquiry) => string | undefined) {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r) || "Unknown";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
}

function Bars({ title, data, total }: { title: string; data: [string, number][]; total: number }) {
  return (
    <div className="admin-card">
      <h3>{title}</h3>
      {data.length === 0 && <p className="muted">No data yet.</p>}
      {data.map(([label, n]) => (
        <div className="admin-bar" key={label}>
          <span>{label}</span>
          <i style={{ width: `${(n / total) * 100}%` }} />
          <b>{n}</b>
        </div>
      ))}
    </div>
  );
}

export default async function Admin() {
  if (!adminEnabled) {
    return (
      <section className="section page-top admin">
        <h1 className="page-title">Admin is not set up</h1>
        <p className="page-lede">
          Add <code>ADMIN_PASSWORD=your-strong-password</code> to <code>.env.local</code> and restart the server.
        </p>
      </section>
    );
  }

  if (!(await isAdmin())) {
    return (
      <section className="section page-top admin">
        <p className="eyebrow">Studio admin</p>
        <h1 className="page-title">Sign in</h1>
        <LoginForm />
      </section>
    );
  }

  const rows = await listEnquiries();
  const total = rows.length || 1;
  const open = rows.filter((r) => r.status === "new").length;
  const won = rows.filter((r) => r.status === "won").length;
  const closed = rows.filter((r) => r.status === "won" || r.status === "lost").length;
  const avgScore = rows.length ? Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length) : 0;
  const last30 = rows.filter((r) => Date.now() - new Date(r.created_at).getTime() < 30 * 864e5).length;

  return (
    <section className="section page-top admin">
      <div className="admin-head">
        <div>
          <p className="eyebrow">Studio admin · {storageMode}</p>
          <h1 className="page-title">Enquiries</h1>
        </div>
        <div className="admin-actions">
          <a className="button button-ghost" href="/admin/export">
            Export CSV
          </a>
          <form action={logout}>
            <button className="button button-ghost">Sign out</button>
          </form>
        </div>
      </div>

      <div className="admin-kpis">
        <div>
          <small>Total enquiries</small>
          <b>{rows.length}</b>
        </div>
        <div>
          <small>Last 30 days</small>
          <b>{last30}</b>
        </div>
        <div>
          <small>Awaiting reply</small>
          <b className={open ? "warn" : undefined}>{open}</b>
        </div>
        <div>
          <small>Win rate (closed)</small>
          <b>{closed ? `${Math.round((won / closed) * 100)}%` : "-"}</b>
        </div>
        <div>
          <small>Avg lead score</small>
          <b>{avgScore}</b>
        </div>
      </div>

      <div className="admin-charts">
        <Bars title="By service" data={countBy(rows, (r) => r.service)} total={total} />
        <Bars title="By source" data={countBy(rows, (r) => r.source)} total={total} />
        <Bars title="By country" data={countBy(rows, (r) => r.country)} total={total} />
      </div>

      {rows.length === 0 ? (
        <p className="admin-empty">No enquiries yet. Submit the contact form to test it.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Score</th>
                <th>Received</th>
                <th>Contact</th>
                <th>Project</th>
                <th>Brief</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className={`score ${r.score >= 70 ? "hot" : r.score >= 45 ? "warm" : ""}`}>{r.score}</span>
                  </td>
                  <td className="nowrap">
                    {new Date(r.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}
                  </td>
                  <td>
                    <b>{r.name}</b>
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                    <span className="muted">{[r.company, r.country].filter(Boolean).join(" · ")}</span>
                  </td>
                  <td>
                    <b>{r.service}</b>
                    <span className="muted">{[r.budget, r.timeline].filter(Boolean).join(" · ")}</span>
                    <span className="muted">via {r.source || "unknown"}</span>
                  </td>
                  <td className="brief">{r.brief}</td>
                  <td>
                    <form action={setStatus} className="status-form">
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} className={`status status-${r.status}`}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button className="underlink">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
