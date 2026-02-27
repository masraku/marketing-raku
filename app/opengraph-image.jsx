import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jasa Buat Website by Rakuuu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          top: -100,
          right: -50,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          bottom: -80,
          left: -30,
        }}
      />

      {/* Logo/Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 20,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          marginBottom: 24,
          fontSize: 36,
        }}
      >
        {"</>"}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Jasa Buat Website
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 22,
          color: "#a1a1aa",
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.5,
        }}
      >
        Website profesional untuk bisnis Anda — Custom, Modern, & Scalable
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 32,
        }}
      >
        {["Landing Page", "Company Profile", "Web App", "Full Stack"].map(
          (tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#d4d4d8",
                fontSize: 16,
              }}
            >
              {tag}
            </div>
          ),
        )}
      </div>

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          fontSize: 16,
          color: "#71717a",
        }}
      >
        by Rakuuu • masraku.dev
      </div>
    </div>,
    { ...size },
  );
}
