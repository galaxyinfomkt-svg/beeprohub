import { ImageResponse } from "next/og";

// Favicon próprio. Antes o site servia /images/logo.png (600×600, com fundo e
// texto) como ícone: ilegível em 16px. O favicon aparece ao lado do título na
// SERP mobile e no Discover — é um elemento direto de CTR.
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

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
          background: "#F5B800",
          borderRadius: 10,
          fontSize: 34,
          fontWeight: 800,
          color: "#16150F",
          fontFamily: "sans-serif",
        }}
      >
        B
      </div>
    ),
    size
  );
}
