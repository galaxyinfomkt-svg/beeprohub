import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { breadcrumbSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { testimonials, getQuote, getResult } from "@/data/testimonials";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return pageSeo({
    title: t("reviews.title"),
    description: t("reviews.description"),
    keywords: "bee pro hub reviews, customer testimonials, CRM reviews Massachusetts, GoHighLevel reviews",
    path: "/reviews",
    locale,
  });
}

const labels: Record<string, { hero: string; sub: string; cta: string; ctaText: string; ctaBtn: string; all: (n: number) => string; featured: string; featuredSub: string; disclosure: string }> = {
  en: {
    hero: "Real Results from Real Businesses",
    sub: "How Massachusetts businesses use Bee Pro Hub to capture more leads and close more work.",
    cta: "Want to Be Our Next Success Story?",
    ctaText: "Start your 14-day free trial. No credit card required.",
    ctaBtn: "START FREE TRIAL",
    all: (n) => `All ${n} Stories`,
    featured: "Featured Case Studies",
    featuredSub: "3 Businesses. 3 Concrete Results.",
    disclosure: "Stories shared with permission. Results vary by business, market, and how the platform is used.",
  },
  pt: {
    hero: "Resultados Reais de Empresas Reais",
    sub: "Como empresas de Massachusetts usam o Bee Pro Hub para captar mais leads e fechar mais trabalho.",
    cta: "Quer Ser Nossa Proxima Historia de Sucesso?",
    ctaText: "Comece seu teste gratis de 14 dias. Sem cartao de credito.",
    ctaBtn: "COMECAR TESTE GRATIS",
    all: (n) => `Todos os ${n} Casos`,
    featured: "Estudos de Caso em Destaque",
    featuredSub: "3 Empresas. 3 Resultados Concretos.",
    disclosure: "Casos publicados com autorizacao. Resultados variam conforme o negocio, o mercado e o uso da plataforma.",
  },
  es: {
    hero: "Resultados Reales de Empresas Reales",
    sub: "Como las empresas de Massachusetts usan Bee Pro Hub para captar mas leads y cerrar mas trabajo.",
    cta: "Quieres Ser Nuestra Proxima Historia de Exito?",
    ctaText: "Comienza tu prueba gratis de 14 dias. Sin tarjeta de credito.",
    ctaBtn: "COMENZAR PRUEBA GRATIS",
    all: (n) => `Todos los ${n} Casos`,
    featured: "Casos de Estudio Destacados",
    featuredSub: "3 Empresas. 3 Resultados Concretos.",
    disclosure: "Casos publicados con autorizacion. Los resultados varian segun el negocio, el mercado y el uso de la plataforma.",
  },
};

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = labels[locale] || labels.en;
  const count = testimonials.length;

  // ---------------------------------------------------------------------------
  // Aqui existia um schema Product com AggregateRating "5.0" e um array Review
  // com os 8 depoimentos. Removido por dois motivos independentes:
  //
  // 1. Os depoimentos estão marcados como fictícios no topo de testimonials.ts.
  //    Publicar Review schema sobre dados inventados é risco direto de ação
  //    manual por spam de dados estruturados.
  // 2. Mesmo com depoimentos reais, avaliações hospedadas pelo próprio negócio
  //    ("self-serving reviews") são desqualificadas pelo Google desde 2019 —
  //    as estrelas não apareceriam de qualquer forma.
  //
  // Para conseguir estrelas na SERP: acumule avaliações no Google Business
  // Profile. Elas aparecem sem nenhum markup no site.
  // ---------------------------------------------------------------------------

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/${locale}` },
            { name: l.featured, url: `${SITE_URL}/${locale}/reviews` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{count} {locale === "en" ? "customer stories" : locale === "es" ? "casos de clientes" : "casos de clientes"}</div>
              <h1 className="section-heading text-white mb-5">{l.hero}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">{l.sub}</p>
            </div>
            <div className="animate-fade-right">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="badge-gold mb-4">{l.featured}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{l.featuredSub}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.slice(0, 3).map((tm) => (
              <div key={tm.id} className="bg-gradient-to-br from-dark to-dark-light rounded-3xl p-7 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-10" />
                <div className="relative z-10">
                  <p className="bg-primary text-dark font-extrabold text-xl px-4 py-2 rounded-xl inline-block mb-4">
                    {getResult(tm, locale)}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{tm.company}</h3>
                  <p className="text-xs text-gray-400 mb-4">{tm.industry} &middot; {tm.city}</p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">&ldquo;{getQuote(tm, locale)}&rdquo;</p>
                  <p className="text-xs text-gray-400 border-t border-gray-700 pt-3">
                    &mdash; {tm.authorName}, {tm.authorRole}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-100 pt-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-dark text-center mb-8">{l.all(count)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((tm) => (
              <article key={tm.id} className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-7 border-2 border-primary/10 card-gold">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-dark">{tm.company}</p>
                  <time className="text-xs text-gray-400" dateTime={tm.date}>{tm.date}</time>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">&ldquo;{getQuote(tm, locale)}&rdquo;</p>
                <p className="bg-primary text-dark font-extrabold text-sm px-3 py-1.5 rounded-full inline-block mb-4">
                  {getResult(tm, locale)}
                </p>
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-bold text-dark">{tm.authorName}</p>
                  <p className="text-sm text-gray-600">{tm.authorRole}, {tm.company}</p>
                  <p className="text-xs text-gray-400 mt-1">{tm.city} &middot; {tm.industry}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-10 max-w-2xl mx-auto">{l.disclosure}</p>
        </div>
      </section>

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
