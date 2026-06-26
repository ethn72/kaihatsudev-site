import { ImageResponse } from "next/og";

export const alt = "Kaihatsu Dev — Web Development Studio Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Note: ImageResponse can't use next/font, so this renders in a bold system
// sans-serif rather than Syne. Layout and brand colours match the spec.
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
          background: "#0D0D0D",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* 開 mark — top-left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            background: "#C84B31",
            color: "#F5F3EE",
            fontSize: "44px",
            fontWeight: 700,
          }}
        >
          開
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Beni accent line */}
          <div
            style={{ display: "flex", width: "120px", height: "6px", background: "#C84B31" }}
          />
          <div
            style={{
              marginTop: "24px",
              fontSize: "120px",
              fontWeight: 800,
              color: "#F5F3EE",
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            KAIHATSU DEV
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "36px",
              color: "#C84B31",
            }}
          >
            Built right, the first time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "26px",
            color: "#D8D4CC",
          }}
        >
          <span>Web Development Studio · Malaysia</span>
          <span>kaihatsu.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
