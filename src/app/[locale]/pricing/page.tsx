import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
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
    { question: "Posso trocar de plano depois?", answer: "Sim, faca upgrade ou downgrade a qualquer momento." },
    { question: "Tem taxa de setup?", answer: "Nao! Setup gratuito e treinamento inclusos em todos os planos." },
    { question: "Preciso de contrato?", answer: "Nao. Planos mensais. Cancele quando quiser." },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(pricingFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }])]} />

      <section className="hero-gradient pt-8 pb-12 lg:pt-12 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-left">
              <span className="section-tag inline-block mb-4">{t("title")}</span>
              <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-dark leading-[1.1] mb-4">{t("title")}</h1>
              <p className="text-[17px] text-gray-500 leading-relaxed">{t("subtitle")}</p>
            </div>
            <div className="animate-fade-in-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const pop = plan === "professional";
              return (
                <div key={plan} className={`relative rounded-3xl p-8 transition-all ${pop ? "bg-gradient-to-br from-dark to-dark-light text-white border-2 border-primary shadow-2xl md:scale-105" : "bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg"}`}>
                  {pop && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-hover text-dark font-bold text-xs px-5 py-1.5 rounded-full">{t(`${plan}.popular`)}</span>}
                  <h3 className="text-xl font-bold mb-2">{t(`${plan}.name`)}</h3>
                  <p className={`text-sm mb-4 ${pop ? "text-gray-400" : "text-gray-500"}`}>{t(`${plan}.description`)}</p>
                  <div className="mb-6">
                    <span className={`text-2xl font-extrabold ${pop ? "text-primary" : "text-dark"}`}>
                      {locale === "en" ? "Contact Us" : locale === "es" ? "Contactenos" : "Fale Conosco"}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-7">
                    {(t.raw(`${plan}.features`) as string[]).map((f: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${pop ? "text-gray-300" : "text-gray-600"}`}>
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pt/contact" className={`block text-center font-bold py-3.5 rounded-xl transition-all ${pop ? "bg-gradient-to-r from-primary to-primary-hover text-dark" : "bg-dark text-white hover:bg-dark-light"}`}>{t("cta")}</Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">{t("guarantee")}</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="max-w-[720px] mx-auto px-4">
          <h2 className="section-title text-center mb-10">FAQ</h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
