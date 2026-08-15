import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  // O template acrescenta a marca UMA vez. Antes os títulos de página já
  // continham "Bee Pro Hub" e o template acrescentava de novo, produzindo
  // "Bee Pro Hub | CRM Tudo-em-Um, MA | Bee Pro Hub" ao vivo. Títulos assim são
  // reescritos pelo Google e a SERP deixa de corresponder à página.
  // Regra: nenhum título vindo de `pageMeta` pode conter a marca.
  title: {
    default: "Bee Pro Hub | CRM e Automação de Marketing em Massachusetts",
    template: "%s | Bee Pro Hub",
  },
  description:
    "CRM, automação de marketing e geração de leads em uma só plataforma para negócios locais de Massachusetts. Teste grátis de 14 dias, sem cartão de crédito.",
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Bee Pro Hub by Galaxy IT & Marketing" }],
  creator: "Galaxy IT & Marketing",
  publisher: "Bee Pro Hub",
  openGraph: {
    type: "website",
    siteName: "Bee Pro Hub",
  },
  twitter: {
    card: "summary_large_image",
    site: "@beeprohub",
    creator: "@galaxymkt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // A tag só é emitida quando a variável existe. Antes o valor literal
  // "verificacao-pendente" ia ao ar em todas as páginas — uma tag de verificação
  // inválida no HTML público, sem Search Console verificado por trás.
  // Defina NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION na Vercel com o código real.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
