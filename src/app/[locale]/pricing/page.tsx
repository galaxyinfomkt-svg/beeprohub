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
    { question: "Tem taxa de setup?", answer: "Nao! Setup gratuito e treinamento inclusos." },
    { question: "Preciso de contrato?", answer: "Nao. Planos mensais. Cancele quando quiser." },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(pricingFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }])]} />

      <section className="bg-primary-light py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-5">{t("title")}</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">{t("title")}</h1>
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed">{t("subtitle")}</p>
            </div>
            <div><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const pop = plan === "professional";
              return (
                <div key={plan} className={`relative rounded-2xl p-8 transition-all ${pop ? "bg-dark text-white border-2 border-primary shadow-2xl md:scale-105" : "bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg"}`}>
                  {pop && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-dark font-bold text-xs px-4 py-1 rounded-full">{t(`${plan}.popular`)}</span>}
                  <h3 className="text-xl font-bold mb-2">{t(`${plan}.name`)}</h3>
                  <p className={`text-sm mb-4 ${pop ? "text-gray-400" : "text-gray-500"}`}>{t(`${plan}.description`)}</p>
                  <div className="mb-6">
                    <span className={`text-2xl font-extrabold ${pop ? "text-primary" : "text-dark"}`}>
                      {locale === "en" ? "Contact Us" : locale === "es" ? "Contactenos" : "Fale Conosco"}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {(t.raw(`${plan}.features`) as string[]).map((f: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2 text-sm ${pop ? "text-gray-300" : "text-gray-600"}`}>
                        <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pt/contact" className={`block text-center font-bold py-3 rounded-xl transition-all ${pop ? "bg-primary text-dark hover:bg-primary-hover" : "bg-dark text-white hover:bg-dark-light"}`}>{t("cta")}</Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">{t("guarantee")}</p>
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
