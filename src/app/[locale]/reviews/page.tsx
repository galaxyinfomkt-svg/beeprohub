import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { breadcrumbSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";
import { testimonials, getQuote, getResult, aggregateRating } from "@/data/testimonials";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const { average, count } = aggregateRating();
  const titles: Record<string, string> = {
    en: `${count}+ Customer Reviews · ${average}/5 Stars | Bee Pro Hub`,
    pt: `${count}+ Avaliacoes de Clientes · ${average}/5 Estrelas | Bee Pro Hub`,
    es: `${count}+ Resenas de Clientes · ${average}/5 Estrellas | Bee Pro Hub`,
  };
  const descs: Record<string, string> = {
    en: `Read ${count}+ verified reviews from Massachusetts businesses using Bee Pro Hub CRM. Average rating ${average}/5 stars across contractors, restaurants, retail, and service companies.`,
    pt: `Leia ${count}+ avaliacoes verificadas de empresas de Massachusetts usando o Bee Pro Hub CRM. Media ${average}/5 estrelas entre contractors, restaurantes, varejo e prestadoras de servico.`,
    es: `Lee ${count}+ resenas verificadas de empresas de Massachusetts usando Bee Pro Hub CRM. Promedio ${average}/5 estrellas entre contratistas, restaurantes, retail y empresas de servicios.`,
  };
  return pageSeo({
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    keywords: "bee pro hub reviews, customer testimonials, CRM reviews Massachusetts, GoHighLevel reviews",
    path: "/reviews",
    locale,
  });
}

const labels: Record<string, { hero: string; sub: string; readMore: string; cta: string; ctaText: string; ctaBtn: string }> = {
  en: {
    hero: "Real Results from Real Businesses",
    sub: "Verified reviews from Massachusetts businesses using Bee Pro Hub to grow.",
    readMore: "Read more",
    cta: "Want to Be Our Next Success Story?",
    ctaText: "Start your 14-day free trial. No credit card required.",
    ctaBtn: "START FREE TRIAL",
  },
  pt: {
    hero: "Resultados Reais de Empresas Reais",
    sub: "Avaliacoes verificadas de empresas de Massachusetts usando o Bee Pro Hub para crescer.",
    readMore: "Ler mais",
    cta: "Quer Ser Nossa Proxima Historia de Sucesso?",
    ctaText: "Comece seu teste gratis de 14 dias. Sem cartao de credito.",
    ctaBtn: "COMECAR TESTE GRATIS",
  },
  es: {
    hero: "Resultados Reales de Empresas Reales",
    sub: "Resenas verificadas de empresas de Massachusetts usando Bee Pro Hub para crecer.",
    readMore: "Leer mas",
    cta: "Quieres Ser Nuestra Proxima Historia de Exito?",
    ctaText: "Comienza tu prueba gratis de 14 dias. Sin tarjeta de credito.",
    ctaBtn: "COMENZAR PRUEBA GRATIS",
  },
};

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = labels[locale] || labels.en;
  const { average, count } = aggregateRating();

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bee Pro Hub",
    description: "All-in-one CRM and marketing automation platform built on GoHighLevel for local businesses in Massachusetts.",
    brand: { "@type": "Brand", name: "Bee Pro Hub" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average,
      bestRating: "5",
      worstRating: "1",
      reviewCount: count.toString(),
      ratingCount: count.toString(),
    },
    review: testimonials.map((tm) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: tm.rating.toString(), bestRating: "5" },
      author: { "@type": "Person", name: tm.authorName },
      datePublished: tm.date,
      reviewBody: tm.quoteEn,
      publisher: { "@type": "Organization", name: tm.company },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          aggregateRatingSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://beeprohub.com" },
            { name: "Reviews", url: `https://beeprohub.com/${locale}/reviews` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80"
            alt="Bee Pro Hub customer reviews and testimonials from Massachusetts businesses"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">
                <span className="text-primary font-bold">{average} &#9733;</span> · {count}+ Reviews
              </div>
              <h1 className="section-heading text-white mb-5">{l.hero}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">{l.sub}</p>
            </div>
            <div className="animate-fade-right">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* Featured case studies (E02) */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="badge-gold mb-4">
              {locale === "pt" ? "Estudos de Caso em Destaque" : locale === "es" ? "Casos de Estudio Destacados" : "Featured Case Studies"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">
              {locale === "pt" ? "3 Empresas. 3 Resultados Concretos." : locale === "es" ? "3 Empresas. 3 Resultados Concretos." : "3 Businesses. 3 Concrete Results."}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.slice(0, 3).map((tm) => (
              <div key={tm.id} className="bg-gradient-to-br from-dark to-dark-light rounded-3xl p-7 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-10" />
                <div className="relative z-10">
                  <div className="bg-primary text-dark font-extrabold text-xl px-4 py-2 rounded-xl inline-block mb-4">
                    {getResult(tm, locale)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tm.company}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {tm.industry} &middot; {tm.city}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">&ldquo;{getQuote(tm, locale)}&rdquo;</p>
                  <p className="text-xs text-gray-400 border-t border-gray-700 pt-3">
                    &mdash; {tm.authorName}, {tm.authorRole}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-100 pt-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-dark text-center mb-8">
              {locale === "pt" ? `Todas as ${count} Avaliacoes` : locale === "es" ? `Todas las ${count} Resenas` : `All ${count} Reviews`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((tm) => (
              <article
                key={tm.id}
                className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-7 border-2 border-primary/10 card-gold"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-primary">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <time className="text-xs text-gray-400" dateTime={tm.date}>
                    {tm.date}
                  </time>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">&ldquo;{getQuote(tm, locale)}&rdquo;</p>
                <div className="bg-primary text-dark font-extrabold text-sm px-3 py-1.5 rounded-full inline-block mb-4">
                  {getResult(tm, locale)}
                </div>
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-bold text-dark">{tm.authorName}</p>
                  <p className="text-sm text-gray-600">
                    {tm.authorRole}, {tm.company}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {tm.city} &middot; {tm.industry}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-animated py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-4">{l.cta}</h2>
          <p className="text-dark/70 mb-8 text-lg">{l.ctaText}</p>
          <Link href={`/${locale}/contact`} className="btn-secondary btn-shine text-lg">
            {l.ctaBtn} &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
