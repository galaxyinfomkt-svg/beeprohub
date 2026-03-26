import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bee Pro Hub | CRM e Automacao de Marketing All-in-One para Negocios Locais",
    template: "%s | Bee Pro Hub",
  },
  description: "Transforme leads em clientes fieis no automatico. Plataforma all-in-one de CRM, automacao, telefonia e gestao financeira. Teste gratis 14 dias. Suporte em Portugues, Ingles e Espanhol.",
  metadataBase: new URL("https://beeprohub.com"),
  keywords: ["CRM", "automacao de marketing", "geracao de leads", "GoHighLevel", "CRM para pequenas empresas", "marketing digital", "agencia de marketing Massachusetts", "CRM all-in-one", "automacao WhatsApp", "sistema telefonico empresarial"],
  authors: [{ name: "Bee Pro Hub by Galaxy IT & Marketing" }],
  creator: "Galaxy IT & Marketing",
  publisher: "Bee Pro Hub",
  openGraph: {
    type: "website",
    siteName: "Bee Pro Hub",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    images: [{ url: "/images/logo.png", width: 600, height: 600, alt: "Bee Pro Hub - CRM e Automacao de Marketing" }],
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
  verification: {
    google: "verificacao-pendente",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
