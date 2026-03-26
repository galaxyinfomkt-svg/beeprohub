import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title"), description: t("subtitle") };
}

const plans = ["starter", "professional", "enterprise"] as const;

export default function PricingPage() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const pricingFaqs = [
    { question: "Posso trocar de plano depois?", answer: "Sim, faca upgrade ou downgrade a qualquer momento." },
    { question: "Tem taxa de setup?", answer: "Nao! Setup gratuito e treinamento inclusos." },
    { question: "Preciso de contrato?", answer: "Nao. Planos mensais. Cancele quando quiser." },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(pricingFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }])]} />

      {/* Hero - Gradiente escuro premium */}
      <section className="relative bg-gradient-to-br from-dark to-dark-light overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left text-white">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/30 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                PLANOS FLEXIVEIS
              </div>
              <h1 className="section-heading mb-5">{t("title")}</h1>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">{t("subtitle")}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> 14 dias gratis</span>
                <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Sem cartao</span>
                <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Cancele quando quiser</span>
              </div>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-white py-16 lg:py-24 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const pop = plan === "professional";
              return (
                <div key={plan} className={`relative rounded-3xl p-8 transition-all duration-500 ${pop ? "bg-gradient-to-br from-dark to-dark-light text-white border-2 border-primary shadow-glow-lg md:scale-105" : "bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-card-hover card-gold"}`}>
                  {pop && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold text-xs px-5 py-1.5 rounded-full shadow-glow">{t(`${plan}.popular`)}</span>}
                  <h3 className="text-xl font-bold mb-2">{t(`${plan}.name`)}</h3>
                  <p className={`text-sm mb-6 ${pop ? "text-gray-400" : "text-gray-500"}`}>{t(`${plan}.description`)}</p>
                  <div className="mb-6">
                    <span className={`text-2xl font-extrabold ${pop ? "text-primary" : "text-dark"}`}>
                      {locale === "en" ? "Contact Us" : locale === "es" ? "Contactenos" : "Fale Conosco"}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {(t.raw(`${plan}.features`) as string[]).map((f: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${pop ? "text-gray-300" : "text-gray-600"}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${pop ? "bg-primary/20" : "bg-primary/10"}`}>
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className={`block text-center font-bold py-3.5 rounded-xl transition-all btn-shine ${pop ? "bg-gradient-to-r from-primary to-primary-hover text-dark shadow-glow animate-pulse-yellow" : "bg-dark text-white hover:bg-dark-light"}`}>
                    {t("cta")} &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">{t("guarantee")}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">FAQ</h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
