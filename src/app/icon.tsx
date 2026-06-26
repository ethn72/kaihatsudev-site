import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// 開 mark — Beni Red square, white kanji.
export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        開
      </div>
    ),
    { ...size },
  );
}
