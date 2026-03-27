import type { MetadataRoute } from "next";
import { massachusettsCities, cityServices } from "@/data/massachusetts-cities";
import { blogPosts } from "@/data/blog-posts";
import { niches } from "@/data/niches";

const BASE = "https://beeprohub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "pt", "es"];
  const pages = ["", "/about", "/services", "/pricing", "/contact", "/blog", "/beeprocard"];
  const entries: MetadataRoute.Sitemap = [];

  // Main pages in all locales
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Niche landing pages
  for (const niche of niches) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/landing/${niche.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // City pages (all locales)
  for (const city of massachusettsCities) {
    for (const svc of cityServices) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE}/${locale}/${svc.slug}-${city.slug}-ma`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
