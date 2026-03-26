import type { Metadata } from "next";

const SITE_URL = "https://beeprohub.com";

export function pageSeo({
  title,
  description,
  keywords,
  path,
  locale,
  image,
}: {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  locale: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image || "/images/logo.png";

  const alternates: Record<string, string> = {};
  for (const l of ["pt", "en", "es"]) {
    alternates[l] = `${SITE_URL}/${l}${path}`;
  }

  return {
    title,
    description,
    keywords: keywords || "CRM, marketing automation, lead generation, Bee Pro Hub, GoHighLevel, small business",
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Bee Pro Hub",
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
