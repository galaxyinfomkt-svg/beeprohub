import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";

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
    { question: locale === "pt" ? "Posso trocar de plano?" : locale === "es" ? "Puedo cambiar de plan?" : "Can I switch plans?", answer: locale === "pt" ? "Sim, faca upgrade ou downgrade a qualquer momento." : locale === "es" ? "Si, haz upgrade o downgrade cuando quieras." : "Yes, upgrade or downgrade anytime." },
    { question: locale === "pt" ? "Tem taxa de setup?" : locale === "es" ? "Hay tarifa de setup?" : "Is there a setup fee?", answer: locale === "pt" ? "Nao! Setup gratuito e treinamento inclusos." : locale === "es" ? "No! Setup gratuito y entrenamiento incluidos." : "No! Free setup and training included." },
    { question: locale === "pt" ? "Preciso de contrato?" : locale === "es" ? "Necesito contrato?" : "Do I need a contract?", answer: locale === "pt" ? "Nao. Planos mensais. Cancele quando quiser." : locale === "es" ? "No. Planes mensuales. Cancela cuando quieras." : "No. Monthly plans. Cancel anytime." },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(pricingFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }])]} />

      {/* Hero - imagem de fundo de negocios */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80" alt="Business strategy" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/70" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{t("title")}</div>
              <h1 className="section-heading text-dark mb-5">{t("title")}</h1>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">{t("subtitle")}</p>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const pop = plan === "professional";
              return (
                <div key={plan} className={`relative rounded-3xl p-8 transition-all duration-500 ${pop ? "bg-gradient-to-br from-primary via-primary-hover to-amber-500 text-dark border-2 border-primary shadow-glow-lg md:scale-105" : "bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-card-hover card-gold"}`}>
                  {pop && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-dark text-primary font-extrabold text-xs px-5 py-1.5 rounded-full shadow-lg">{t(`${plan}.popular`)}</span>}
                  <h3 className={`text-xl font-bold mb-2 ${pop ? "text-dark" : "text-dark"}`}>{t(`${plan}.name`)}</h3>
                  <p className={`text-sm mb-6 ${pop ? "text-dark/70" : "text-gray-500"}`}>{t(`${plan}.description`)}</p>
                  <div className="mb-6">
                    <span className={`text-2xl font-extrabold ${pop ? "text-dark" : "text-dark"}`}>
                      {locale === "pt" ? "Fale Conosco" : locale === "es" ? "Contactenos" : "Contact Us"}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {(t.raw(`${plan}.features`) as string[]).map((f: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${pop ? "text-dark/80" : "text-gray-600"}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${pop ? "bg-dark/10" : "bg-primary/10"}`}>
                          <svg className={`w-3 h-3 ${pop ? "text-dark" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className={`block text-center font-bold py-3.5 rounded-xl transition-all btn-shine ${pop ? "bg-dark text-primary shadow-lg hover:-translate-y-1" : "bg-gradient-to-r from-primary to-primary-hover text-dark shadow-glow hover:-translate-y-1"}`}>
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
