import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, rendered once at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 80% 10%, #1e1b4b 0%, #000 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#6ee7b7" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#34d399" }} />
          Open to new opportunities
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              letterSpacing: 8,
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(90deg, #38bdf8, #a855f7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          <span>React · Next.js · Laravel · Node.js · AWS</span>
          <span>{profile.location}, MY</span>
        </div>
      </div>
    ),
    size
  );
}
