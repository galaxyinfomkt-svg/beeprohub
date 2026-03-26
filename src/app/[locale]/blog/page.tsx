import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import { blogTranslations } from "@/data/blog-translations";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();

  const getTitle = (slug: string, fallback: string) => {
    const tr = blogTranslations[slug];
    if (locale === "pt" && tr?.titlePt) return tr.titlePt;
    if (locale === "es" && tr?.titleEs) return tr.titleEs;
    return fallback;
  };
  const getExcerpt = (slug: string, fallback: string) => {
    const tr = blogTranslations[slug];
    if (locale === "pt" && tr?.excerptPt) return tr.excerptPt;
    if (locale === "es" && tr?.excerptEs) return tr.excerptEs;
    return fallback;
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Blog", url: `https://beeprohub.com/${locale}/blog` }])]} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1400&q=80" alt="Blog" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/80 via-purple-800/60 to-primary/40" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 py-16 lg:py-20 relative z-10">
          <div className="badge-gold mb-5 mx-auto !bg-white/90">{t("title")}</div>
          <h1 className="section-heading text-white mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-200">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card-gold overflow-hidden group !p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={getTitle(post.slug, post.title)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">{post.category}</span>
                </div>
                <div className="p-5">
                  <time className="text-xs text-gray-400">{post.date}</time>
                  <h2 className="text-base font-bold text-dark mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {getTitle(post.slug, post.title)}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {getExcerpt(post.slug, post.excerpt)}
                  </p>
                  <Link href={`/${locale}/blog/${post.slug}`} className="text-primary font-bold text-sm hover:text-primary-hover transition-colors">
                    {t("readMore")} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
