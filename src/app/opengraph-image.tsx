import { ImageResponse } from "next/og";

export const alt = "SEED U — AI that understands the farmer. Knowledge that helps the farm grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#f6f1e6",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <svg width="1200" height="260" viewBox="0 0 1200 260" style={{ position: "absolute", left: 0, bottom: 0 }}>
          <path d="M0 90 C 200 40 380 70 600 80 S 1000 30 1200 60 V 260 H0Z" fill="#cdd9c3" />
          <path d="M0 150 C 300 120 600 140 900 130 S 1100 120 1200 130 V 260 H0Z" fill="#a8bea0" />
          <path d="M0 200 Q 600 180 1200 200 V 260 H0Z" fill="#74a95c" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#1d3a2a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 22, borderRadius: "0 22px 0 22px", background: "#74a95c" }} />
          </div>
          <div style={{ fontSize: 40, color: "#1d3a2a", fontWeight: 700 }}>SEED U</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 120 }}>
          <div style={{ fontSize: 28, color: "#4b8a3b", letterSpacing: 4, textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 700 }}>
            Ask. Understand. Grow.
          </div>
          <div style={{ fontSize: 68, color: "#1d3a2a", lineHeight: 1.08, marginTop: 18, maxWidth: 980 }}>
            AI that understands the farmer. Knowledge that helps the farm grow.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
