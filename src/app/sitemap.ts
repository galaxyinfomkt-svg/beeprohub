import type { MetadataRoute } from "next";
import { massachusettsCities, cityPagePath } from "@/data/massachusetts-cities";
import { blogPosts } from "@/data/blog-posts";
import { niches } from "@/data/niches";
import { LOCALES, HREFLANG, X_DEFAULT_LOCALE } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

// `lastModified: new Date()` marcava as 1.596 URLs como modificadas a cada
// deploy. O Google aprende a ignorar o lastmod de um domínio que faz isso — e
// o sinal se perde justamente quando há mudança real para comunicar.
//
// Agora: data fixa por tipo de conteúdo. Atualize CONTENT_REVISION quando
// reescrever de fato as páginas institucionais ou de cidade.
const CONTENT_REVISION = "2026-08-14";

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/${X_DEFAULT_LOCALE}${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/pricing", "/contact", "/blog", "/beeprocard", "/reviews"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(CONTENT_REVISION),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: alternates(page),
      });
    }
  }

  for (const post of blogPosts) {
    const path = `/blog/${post.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(post.updated || post.date),
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: alternates(path),
      });
    }
  }

  for (const niche of niches) {
    const path = `/landing/${niche.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(CONTENT_REVISION),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(path),
      });
    }
  }

  // Uma entrada por cidade, não cinco. Os quatro slugs de serviço antigos não
  // entram no sitemap — eles redirecionam 301 (ver next.config.ts).
  for (const city of massachusettsCities) {
    const path = `/${cityPagePath(city.slug)}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(CONTENT_REVISION),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
