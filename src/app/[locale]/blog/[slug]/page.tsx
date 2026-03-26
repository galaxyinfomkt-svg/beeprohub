import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

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

const labels: Record<string, { back: string; ctaTitle: string; ctaText: string; ctaBtn: string; readAlso: string; share: string }> = {
  pt: { back: "Voltar ao Blog", ctaTitle: "Pronto para Transformar Seu Negocio?", ctaText: "Teste gratis por 14 dias e veja a diferenca que o Bee Pro Hub faz.", ctaBtn: "COMECAR TESTE GRATIS", readAlso: "Leia Tambem", share: "Compartilhe" },
  es: { back: "Volver al Blog", ctaTitle: "Listo para Transformar Tu Negocio?", ctaText: "Prueba gratis por 14 dias y ve la diferencia.", ctaBtn: "COMENZAR PRUEBA GRATIS", readAlso: "Lee Tambien", share: "Comparte" },
  en: { back: "Back to Blog", ctaTitle: "Ready to Transform Your Business?", ctaText: "Start your 14-day free trial and see the difference.", ctaBtn: "START FREE TRIAL", readAlso: "Read Also", share: "Share" },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const l = labels[locale] || labels.en;
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        articleSchema(post.title, post.excerpt, post.date, post.image, `https://beeprohub.com/${locale}/blog/${post.slug}`),
        breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Blog", url: `https://beeprohub.com/${locale}/blog` }, { name: post.title, url: `https://beeprohub.com/${locale}/blog/${post.slug}` }]),
      ]} />

      {/* Hero com imagem de fundo */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={post.title} fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
        </div>
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <Link href={`/${locale}/blog`} className="text-primary text-sm hover:text-primary-hover inline-flex items-center gap-1 font-semibold mb-6">
            &larr; {l.back}
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-primary text-dark text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
            <time className="text-gray-400 text-sm">{post.date}</time>
            <span className="text-gray-500 text-sm">By {post.author}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl">{post.excerpt}</p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-10 border border-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n## /g, '<h2 class="text-2xl font-extrabold text-dark mt-10 mb-4">').replace(/\\n### /g, '<h3 class="text-xl font-bold text-dark mt-8 mb-3">').replace(/\\n- \*\*/g, '<li class="flex items-start gap-2 mb-2 text-gray-600"><span class="text-primary font-bold">&#x2022;</span><strong>').replace(/\\n\\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">').replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark font-bold">$1</strong>').replace(/^/, '<p class="text-gray-600 leading-relaxed mb-4">') + '</p>' }} />
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-dark to-dark-light rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-dots opacity-10" />
                  <div className="relative z-10">
                    <h3 className="text-primary font-extrabold text-lg mb-2">{l.ctaTitle}</h3>
                    <p className="text-gray-400 text-sm mb-4">{l.ctaText}</p>
                    <Link href={`/${locale}/contact`} className="btn-primary btn-shine w-full text-center justify-center animate-pulse-yellow text-sm py-3">
                      {l.ctaBtn} &rarr;
                    </Link>
                    <a href={PHONE_LINK} className="block text-center text-primary font-bold mt-3 text-sm hover:text-primary-hover transition-colors">
                      {PHONE}
                    </a>
                  </div>
                </div>

                {/* Form */}
                <HeroForm />

                {/* Related Posts */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-dark text-base mb-4">{l.readAlso}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                          <Image src={rp.image} alt={rp.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2">{rp.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{rp.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((kw) => (
                    <span key={kw} className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full">
                      {kw}
                    </span>
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">{l.ctaTitle}</h2>
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
