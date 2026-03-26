import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

const serviceKeys = ["crm", "automation", "leadgen", "websites", "ads"] as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();
  const faqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`faq.items.${i}.q`), answer: t(`faq.items.${i}.a`) }));
  const schemas = [...serviceKeys.map((k) => serviceSchema(t(`items.${k}.title`), t(`items.${k}.description`), `https://beeprohub.com/pt/services`)), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Services", url: "https://beeprohub.com/pt/services" }])];

  return (
    <>
      <JsonLd data={schemas} />

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {serviceKeys.map((key, idx) => (
            <div key={key} className={`rounded-2xl p-6 sm:p-10 border ${idx % 2 === 0 ? "bg-gray-50 border-gray-100" : "bg-primary-light border-primary/10"}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t(`items.${key}.title`)}</h2>
              <p className="text-gray-500 mb-5 leading-relaxed">{t(`items.${key}.description`)}</p>
              <ul className="space-y-2 mb-6">
                {(t.raw(`items.${key}.features`) as string[]).map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/contact`} className="inline-block bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-all">
                {t(`items.${key}.title`)}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">{t("faq.title")}</h2>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
