import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article", publishedTime: post.date },
  };
}

const labels: Record<string, { back: string; ctaTitle: string; ctaText: string; ctaBtn: string }> = {
  pt: { back: "Voltar ao Blog", ctaTitle: "Pronto para Transformar Seu Negocio?", ctaText: "Teste gratis por 14 dias e veja a diferenca que o Bee Pro Hub faz.", ctaBtn: "COMECAR TESTE GRATIS" },
  es: { back: "Volver al Blog", ctaTitle: "Listo para Transformar Tu Negocio?", ctaText: "Prueba gratis por 14 dias y ve la diferencia que Bee Pro Hub hace.", ctaBtn: "COMENZAR PRUEBA GRATIS" },
  en: { back: "Back to Blog", ctaTitle: "Ready to Transform Your Business?", ctaText: "Start your 14-day free trial and see the difference Bee Pro Hub makes.", ctaBtn: "START FREE TRIAL" },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const l = labels[locale] || labels.en;

  return (
    <>
      <JsonLd data={[
        articleSchema(post.title, post.excerpt, post.date, `https://beeprohub.com${post.image}`, `https://beeprohub.com/${locale}/blog/${post.slug}`),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "Blog", url: `https://beeprohub.com/${locale}/blog` },
          { name: post.title, url: `https://beeprohub.com/${locale}/blog/${post.slug}` },
        ]),
      ]} />

      <section className="relative bg-gradient-to-br from-dark via-dark-light to-dark overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <Link href={`/${locale}/blog`} className="text-primary text-sm hover:text-primary-hover mb-4 inline-flex items-center gap-1 font-semibold">&larr; {l.back}</Link>
          <div className="flex items-center gap-3 mb-4 mt-2">
            <span className="bg-primary text-dark text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
            <time className="text-xs text-gray-500">{post.date}</time>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-sm">By {post.author}</p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-10 border border-gray-100">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
          <article className="prose prose-lg max-w-none prose-headings:text-dark prose-p:text-gray-600 prose-strong:text-dark prose-li:text-gray-600 prose-a:text-primary">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n## /g, '<h2>').replace(/\n### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^/, '<p>') + '</p>' }} />
          </article>

          {/* CTA */}
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 border-2 border-primary/20 rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-2xl font-extrabold text-dark mb-3">{l.ctaTitle}</h3>
            <p className="text-gray-600 mb-6">{l.ctaText}</p>
            <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow">
              {l.ctaBtn} &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
