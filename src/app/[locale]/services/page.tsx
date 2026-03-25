import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { languages: { en: "/en/services", pt: "/pt/services", es: "/es/services" } },
  };
}

const serviceKeys = ["crm", "automation", "leadgen", "websites", "ads"] as const;
const serviceIcons = [
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
];

export default function ServicesPage() {
  const t = useTranslations("services");

  const faqs = [1, 2, 3, 4, 5].map((i) => ({
    question: t(`faq.items.${i}.q`),
    answer: t(`faq.items.${i}.a`),
  }));

  const schemas = [
    ...serviceKeys.map((key) =>
      serviceSchema(t(`items.${key}.title`), t(`items.${key}.description`), `https://beeprohub.com/en/services`)
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", url: "https://beeprohub.com" },
      { name: "Services", url: "https://beeprohub.com/en/services" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <section className="bg-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-400">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {serviceKeys.map((key, idx) => (
            <div key={key} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={serviceIcons[idx]} />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">{t(`items.${key}.title`)}</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">{t(`items.${key}.description`)}</p>
                <ul className="space-y-2 mb-6">
                  {(t.raw(`items.${key}.features`) as string[]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                  Get Started
                </Link>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[280px]">
                <svg className="w-32 h-32 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d={serviceIcons[idx]} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-dark text-center mb-10">{t("faq.title")}</h2>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
