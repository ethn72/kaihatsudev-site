import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon — 開 mark, Beni Red square, white kanji.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#C84B31",
          color: "#F5F3EE",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        開
      </div>
    ),
    { ...size },
  );
}
