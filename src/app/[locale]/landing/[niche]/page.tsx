import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { niches } from "@/data/niches";
import { nicheTranslations } from "@/data/niche-translations";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

const nicheImages: Record<string, string> = {
  contractors: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
  cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80",
  roofing: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1400&q=80",
  painting: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1400&q=80",
  landscaping: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80",
};

export function generateStaticParams() {
  return niches.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = niches.find((n) => n.slug === slug);
  if (!niche) return {};
  return { title: niche.title, description: niche.heroSubtitle, keywords: niche.keywords.join(", ") };
}

export default async function NicheLandingPage({ params }: { params: Promise<{ niche: string; locale: string }> }) {
  const { niche: slug, locale } = await params;
  const niche = niches.find((n) => n.slug === slug);
  if (!niche) notFound();

  // Use translation if available, otherwise fallback to English data
  const tr = nicheTranslations[slug]?.[locale];
  const heroTitle = tr?.heroTitle || niche.heroTitle;
  const heroSubtitle = tr?.heroSubtitle || niche.heroSubtitle;
  const painTitle = tr?.painTitle || "Sound Familiar?";
  const benefitTitle = tr?.benefitTitle || "With Bee Pro Hub You Get:";
  const painPoints = tr?.painPoints || niche.painPoints;
  const benefits = tr?.benefits || niche.benefits;
  const description = tr?.description || niche.description;
  const ctaTitle = tr?.ctaTitle || `Ready to Grow Your ${niche.name} Business?`;
  const nicheFaqs = tr?.faq?.map(f => ({ question: f.q, answer: f.a })) || [
    { question: `What is the best CRM for ${niche.name.toLowerCase()}?`, answer: `Bee Pro Hub is the top-rated CRM for ${niche.name.toLowerCase()}. It combines lead management, automated follow-ups, scheduling, invoicing, and a phone system.` },
    { question: `How much does Bee Pro Hub cost?`, answer: "We have several plans with a 14-day free trial. No credit card required, no contracts." },
    { question: `Can I automate my marketing?`, answer: `Yes! Bee Pro Hub automates email, SMS, WhatsApp, and voice follow-ups designed for ${niche.name.toLowerCase()}.` },
    { question: "Support in other languages?", answer: "Yes! Full 24/7 support in English, Portuguese, and Spanish." },
  ];

  const forLabel = locale === "pt" ? "Para" : locale === "es" ? "Para" : "For";
  const trialLabel = locale === "pt" ? "Teste Gratis 14 Dias" : locale === "es" ? "Prueba Gratis 14 Dias" : "Start 14-Day Free Trial";

  return (
    <>
      <JsonLd data={[
        serviceSchema(niche.title, description, `https://beeprohub.com/${locale}/landing/${niche.slug}`),
        faqSchema(nicheFaqs),
        breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: niche.name, url: `https://beeprohub.com/${locale}/landing/${niche.slug}` }]),
      ]} />

      {/* Hero - imagem de fundo correspondente ao nicho */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={nicheImages[slug] || nicheImages.contractors} alt={niche.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-cyan-800/50 to-primary/40" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {forLabel} {niche.name}
              </div>
              <h1 className="section-heading text-white mb-5">{heroTitle}</h1>
              <p className="text-gray-200 text-base lg:text-lg leading-relaxed mb-6">{heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-center">{trialLabel} &rarr;</Link>
                <a href={PHONE_LINK} className="btn-outline text-center">{PHONE}</a>
              </div>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      {/* Pain vs Benefits */}
      <section className="bg-white py-16 lg:py-20 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">{painTitle}</h2>
              <ul className="space-y-4">
                {painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">{benefitTitle}</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Image */}
      <section className="bg-gradient-to-br from-gold-50 to-amber-50 py-16 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-5">{forLabel} {niche.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
            </div>
            <div className="flex justify-center">
              <Image src="/images/dashboard-multidevice.webp" alt={`${niche.name} CRM`} width={480} height={380} className="rounded-2xl shadow-xl animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">FAQ</h2>
          <FAQ items={nicheFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-animated py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">{ctaTitle}</h2>
          <Link href={`/${locale}/contact`} className="btn-secondary btn-shine">{trialLabel} &rarr;</Link>
        </div>
      </section>
    </>
  );
}
