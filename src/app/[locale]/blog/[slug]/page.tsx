import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts, getPillarFor, getClusterPosts } from "@/data/blog-posts";
import { blogTranslations } from "@/data/blog-translations";
import { seoTitleFor } from "@/data/blog-seo-titles";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";
import { renderMarkdown } from "@/lib/markdown";
import { alternatesFor, OG_LOCALE, isLocale } from "@/lib/seo";
import { PHONE, PHONE_LINK, SITE_URL } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Título, resumo e corpo no idioma da página. Antes o generateMetadata nem
 *  recebia o locale: /pt/blog/... servia <title> em inglês sobre um H1 em
 *  português, o que derruba o CTR e faz o Google reescrever o título. */
function localized(slug: string, locale: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const tr = blogTranslations[slug];
  return {
    post,
    title: locale === "pt" && tr?.titlePt ? tr.titlePt : locale === "es" && tr?.titleEs ? tr.titleEs : post.title,
    excerpt: locale === "pt" && tr?.excerptPt ? tr.excerptPt : locale === "es" && tr?.excerptEs ? tr.excerptEs : post.excerpt,
    content: locale === "pt" && tr?.contentPt ? tr.contentPt : locale === "es" && tr?.contentEs ? tr.contentEs : post.content,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = localized(slug, locale);
  if (!data) return {};
  const { post, title, excerpt } = data;
  const l = isLocale(locale) ? locale : "en";

  // O <title> usa a versão curta de SERP (blog-seo-titles.ts); o H1 continua
  // sendo o headline completo. Antes o <title> era o headline direto e 36 das
  // 57 versões de artigo estouravam o corte do Google.
  const serpTitle = seoTitleFor(slug, locale, title);

  return {
    title: serpTitle.length > 48 ? { absolute: serpTitle } : serpTitle,
    description: excerpt,
    keywords: post.keywords.join(", "),
    alternates: alternatesFor(`/blog/${slug}`, locale),
    openGraph: {
      title,
      description: excerpt,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      siteName: "Bee Pro Hub",
      locale: OG_LOCALE[l],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: excerpt, images: [post.image] },
  };
}

const labels: Record<string, {
  back: string; ctaTitle: string; ctaText: string; ctaBtn: string; readAlso: string;
  pillarBadge: string; partOfCluster: string; clusterPosts: string; onThisPage: string;
  minRead: string; updatedOn: string; by: string;
}> = {
  pt: {
    back: "Voltar ao Blog", ctaTitle: "Pronto para Transformar Seu Negocio?",
    ctaText: "Teste gratis por 14 dias e veja a diferenca que o Bee Pro Hub faz.",
    ctaBtn: "COMECAR TESTE GRATIS", readAlso: "Leia Tambem", pillarBadge: "Artigo Pilar",
    partOfCluster: "Parte do guia:", clusterPosts: "Posts deste cluster",
    onThisPage: "Neste artigo", minRead: "min de leitura", updatedOn: "Atualizado em", by: "Por",
  },
  es: {
    back: "Volver al Blog", ctaTitle: "Listo para Transformar Tu Negocio?",
    ctaText: "Prueba gratis por 14 dias y ve la diferencia.",
    ctaBtn: "COMENZAR PRUEBA GRATIS", readAlso: "Lee Tambien", pillarBadge: "Articulo Pilar",
    partOfCluster: "Parte de la guia:", clusterPosts: "Posts de este cluster",
    onThisPage: "En este articulo", minRead: "min de lectura", updatedOn: "Actualizado el", by: "Por",
  },
  en: {
    back: "Back to Blog", ctaTitle: "Ready to Transform Your Business?",
    ctaText: "Start your 14-day free trial and see the difference.",
    ctaBtn: "START FREE TRIAL", readAlso: "Read Also", pillarBadge: "Pillar Article",
    partOfCluster: "Part of guide:", clusterPosts: "Posts in this cluster",
    onThisPage: "In this article", minRead: "min read", updatedOn: "Updated", by: "By",
  },
};

function localTitle(slug: string, locale: string, fallback: string) {
  const tr = blogTranslations[slug];
  if (locale === "pt" && tr?.titlePt) return tr.titlePt;
  if (locale === "es" && tr?.titleEs) return tr.titleEs;
  return fallback;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const data = localized(slug, locale);
  if (!data) notFound();
  const { post, title, excerpt, content } = data;
  const l = labels[locale] || labels.en;

  // Markdown de verdade: gera <h2>/<h3>/<ul>/<blockquote> reais, além do
  // índice de seções e da contagem de palavras usada no Article schema.
  const article = renderMarkdown(content);

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const pillarSlug = getPillarFor(slug);
  const pillarPost = pillarSlug ? blogPosts.find((p) => p.slug === pillarSlug) : null;
  const clusterSlugs = post.isPillar ? getClusterPosts(slug) : [];
  const clusterPosts = blogPosts.filter((p) => clusterSlugs.includes(p.slug));
  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  return (
    <>
      <JsonLd data={[
        articleSchema({
          title,
          description: excerpt,
          datePublished: post.date,
          dateModified: post.updated || post.date,
          image: post.image,
          url,
          locale,
          author: post.author,
          keywords: post.keywords,
          wordCount: article.wordCount,
          section: post.category,
        }),
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
          { name: title, url },
        ]),
      ]} />

      {/* Hero */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt="" fill className="object-cover opacity-20" sizes="100vw" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
        </div>
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <Link href={`/${locale}/blog`} className="text-primary text-sm hover:text-primary-hover inline-flex items-center gap-1 font-semibold mb-6">
            &larr; {l.back}
          </Link>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="bg-primary text-dark text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
            {post.isPillar && (
              <span className="bg-gradient-to-r from-amber-400 to-primary text-dark text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wide">
                &#9733; {l.pillarBadge}
              </span>
            )}
            <time className="text-gray-400 text-sm" dateTime={post.updated || post.date}>
              {post.updated ? `${l.updatedOn} ${post.updated}` : post.date}
            </time>
            <span className="text-gray-500 text-sm">{l.by} {post.author}</span>
            <span className="text-gray-500 text-sm">{article.readingMinutes} {l.minRead}</span>
          </div>
          {pillarPost && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-primary/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="text-primary text-xs font-semibold">{l.partOfCluster}</span>
              <Link href={`/${locale}/blog/${pillarPost.slug}`} className="text-white text-xs font-bold hover:text-primary transition-colors">
                {localTitle(pillarPost.slug, locale, pillarPost.title)} &rarr;
              </Link>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 mt-5">{title}</h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl">{excerpt}</p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="relative h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-10 border border-gray-100">
                <Image src={post.image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
              </div>

              {/* Índice de seções — navegação interna real e sinal de estrutura
                  para featured snippets e respostas de IA. */}
              {article.headings.length > 2 && (
                <nav aria-label={l.onThisPage} className="mb-10 rounded-2xl border-2 border-primary/15 bg-gold-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-primary mb-3">{l.onThisPage}</p>
                  <ol className="space-y-1.5 list-decimal marker:text-primary marker:font-bold pl-5">
                    {article.headings.filter((h) => h.level === 2).map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-sm text-dark hover:text-primary font-medium transition-colors">{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <article className="max-w-none" dangerouslySetInnerHTML={{ __html: article.html }} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-gradient-to-br from-dark to-dark-light rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-dots opacity-10" />
                  <div className="relative z-10">
                    <p className="text-primary font-extrabold text-lg mb-2">{l.ctaTitle}</p>
                    <p className="text-gray-400 text-sm mb-4">{l.ctaText}</p>
                    <Link href={`/${locale}/contact`} className="btn-primary btn-shine w-full text-center justify-center animate-pulse-yellow text-sm py-3">
                      {l.ctaBtn} &rarr;
                    </Link>
                    <a href={PHONE_LINK} className="block text-center text-primary font-bold mt-3 text-sm hover:text-primary-hover transition-colors">
                      {PHONE}
                    </a>
                  </div>
                </div>

                <HeroForm />

                {clusterPosts.length > 0 && (
                  <div className="bg-gradient-to-br from-primary/10 to-gold-50 rounded-2xl p-6 border-2 border-primary/30">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-primary text-dark text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">&#9733; {l.pillarBadge}</span>
                    </div>
                    <p className="font-bold text-dark text-base mb-4">{l.clusterPosts}</p>
                    <ul className="space-y-2">
                      {clusterPosts.map((cp) => (
                        <li key={cp.slug}>
                          <Link href={`/${locale}/blog/${cp.slug}`} className="text-sm text-dark hover:text-primary font-semibold transition-colors flex items-start gap-2">
                            <span className="text-primary">&rarr;</span>
                            <span>{localTitle(cp.slug, locale, cp.title)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <p className="font-bold text-dark text-base mb-4">{l.readAlso}</p>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                          <Image src={rp.image} alt="" fill className="object-cover" sizes="64px" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2">{localTitle(rp.slug, locale, rp.title)}</p>
                          <p className="text-xs text-gray-400 mt-1">{rp.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((kw) => (
                    <span key={kw} className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full">{kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-animated py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">{l.ctaTitle}</p>
          <p className="text-dark/70 mb-6">{l.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/contact`} className="btn-secondary btn-shine">{l.ctaBtn} &rarr;</Link>
            <a href={PHONE_LINK} className="bg-white text-dark font-bold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all btn-shine">{PHONE}</a>
          </div>
        </div>
      </section>
    </>
  );
}
