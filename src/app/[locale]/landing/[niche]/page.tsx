import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { niches } from "@/data/niches";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

export function generateStaticParams() {
  return niches.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = niches.find((n) => n.slug === slug);
  if (!niche) return {};
  return {
    title: niche.title,
    description: niche.heroSubtitle,
    keywords: niche.keywords.join(", "),
  };
}

export default async function NicheLandingPage({ params }: { params: Promise<{ niche: string; locale: string }> }) {
  const { niche: slug, locale } = await params;
  const niche = niches.find((n) => n.slug === slug);
  if (!niche) notFound();

  const nicheFaqs = [
    { question: `What is the best CRM for ${niche.name.toLowerCase()}?`, answer: `Bee Pro Hub is the top-rated CRM for ${niche.name.toLowerCase()}. It combines lead management, automated follow-ups, scheduling, invoicing, and a phone system — all tailored for service businesses like yours.` },
    { question: `How much does Bee Pro Hub cost for ${niche.name.toLowerCase()}?`, answer: "Plans start at $97/month with a 14-day free trial. No credit card required, no long-term contracts." },
    { question: `Can I automate my ${niche.name.toLowerCase()} business marketing?`, answer: `Absolutely! Bee Pro Hub automates email, SMS, WhatsApp, and voice follow-ups specifically designed for ${niche.name.toLowerCase()}. Set it once and let it run 24/7.` },
    { question: "Is there support in languages other than English?", answer: "Yes! We provide full 24/7 support in English, Portuguese, and Spanish." },
  ];

  return (
    <>
      <JsonLd data={[
        serviceSchema(niche.title, niche.description, `https://beeprohub.com/${locale}/landing/${niche.slug}`),
        faqSchema(nicheFaqs),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: niche.name, url: `https://beeprohub.com/${locale}/landing/${niche.slug}` },
        ]),
      ]} />

      {/* Hero */}
      <section className="bg-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/20 text-primary font-bold text-sm px-4 py-2 rounded-full mb-6">
                For {niche.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                {niche.heroTitle}
              </h1>
              <p className="text-lg text-gray-400 mb-8">{niche.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${locale}/contact`} className="bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-4 rounded-xl text-lg transition-all animate-pulse-glow text-center">
                  Start 14-Day Free Trial
                </Link>
                <a href={PHONE_LINK} className="border-2 border-gray-600 hover:border-primary text-white hover:text-primary font-semibold px-8 py-4 rounded-xl text-lg transition-colors text-center">
                  {PHONE}
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image src="/images/dashboard-multidevice.webp" alt={`${niche.name} CRM dashboard for managing leads and automating marketing`} width={500} height={400} className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">Sound Familiar?</h2>
              <ul className="space-y-4">
                {niche.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">With Bee Pro Hub You Get:</h2>
              <ul className="space-y-4">
                {niche.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">Built for {niche.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{niche.description}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-10">Frequently Asked Questions</h2>
          <FAQ items={nicheFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-dark mb-4">Ready to Grow Your {niche.name} Business?</h2>
          <p className="text-dark/70 mb-6">Join hundreds of {niche.name.toLowerCase()} who trust Bee Pro Hub to manage their leads and automate their marketing.</p>
          <Link href={`/${locale}/contact`} className="inline-block bg-dark text-primary font-bold px-10 py-4 rounded-xl text-lg hover:bg-dark-light transition-colors">
            Start Free Trial Now
          </Link>
        </div>
      </section>
    </>
  );
}
