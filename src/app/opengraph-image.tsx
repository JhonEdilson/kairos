import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kairos Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0B0F1A",
          color: "#FAF3E7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#D97706", letterSpacing: "-0.02em" }}>
          Kairos Studio
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#FAF3E7",
          }}
        >
          Automatización con IA
          <br />
          para equipos operativos.
        </div>
        <div style={{ fontSize: 28, color: "#A8B0BD" }}>
          kairos.studio · Jhon Escobar
        </div>
      </div>
    ),
    size
  );
}
