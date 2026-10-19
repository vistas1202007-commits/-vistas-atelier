import { ImageResponse } from "next/og";

export const alt = "Vistas Atelier, websites, apps and data tools for growing businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the site is shared on WhatsApp, LinkedIn, X, etc.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f5f0e8",
          color: "#221b17",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, letterSpacing: 2 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: "#c2512f" }} />
          VISTAS ATELIER
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.02, letterSpacing: -2 }}>
          <span>Websites, apps and data tools</span>
          <span style={{ color: "#c2512f" }}>that earn their keep.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#75655a", fontFamily: "sans-serif" }}>
          <span>Independent digital studio · India → worldwide</span>
          <span>vistasatelier.com</span>
        </div>
      </div>
    ),
    size,
  );
}
