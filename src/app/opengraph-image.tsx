import { ImageResponse } from "next/og";

// Imagem OG real em 1200×630. Antes o site declarava `width: 1200, height: 630`
// mas servia o logo.png quadrado de 600×600 — todo preview compartilhado saía
// cortado ou esticado.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bee Pro Hub — CRM e automação de marketing para negócios locais em Massachusetts";

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
          background: "linear-gradient(135deg, #16150F 0%, #262218 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#F5B800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "#16150F",
            }}
          >
            B
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#F5B800", letterSpacing: -0.5 }}>
            Bee Pro Hub
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            CRM, automação e geração de leads em uma só plataforma
          </div>
          <div style={{ fontSize: 30, color: "#B9B2A0", maxWidth: 820, lineHeight: 1.35 }}>
            Para negócios locais em Massachusetts. Atendimento em inglês, português e espanhol.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ height: 5, width: 96, background: "#F5B800", borderRadius: 3 }} />
          <div style={{ fontSize: 24, color: "#8C8674" }}>beeprohub.com</div>
        </div>
      </div>
    ),
    size
  );
}
