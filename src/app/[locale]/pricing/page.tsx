import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { productSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { languages: { en: "/en/pricing", pt: "/pt/pricing", es: "/es/pricing" } },
  };
}

const plans = ["starter", "professional", "enterprise"] as const;

export default function PricingPage() {
  const t = useTranslations("pricing");

  const pricingFaqs = [
    { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle." },
    { question: "Is there a setup fee?", answer: "No setup fees! All plans include free platform setup and onboarding training." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, American Express) and bank transfers." },
    { question: "Do I need a long-term contract?", answer: "No contracts. All plans are month-to-month. Cancel anytime with no penalties." },
  ];

  return (
    <>
      <JsonLd data={[
        productSchema("Bee Pro Hub Starter", "CRM and marketing automation starter plan", "97"),
        productSchema("Bee Pro Hub Professional", "Complete CRM, automation, and phone system", "197"),
        productSchema("Bee Pro Hub Enterprise", "Enterprise plan with white-label and API access", "397"),
        faqSchema(pricingFaqs),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "Pricing", url: "https://beeprohub.com/en/pricing" },
        ]),
      ]} />

      <section className="bg-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-400">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const isPopular = plan === "professional";
              return (
                <div
                  key={plan}
                  className={`relative rounded-2xl p-8 ${
                    isPopular
                      ? "bg-dark text-white border-2 border-primary shadow-2xl scale-105"
                      : "bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg"
                  } transition-all`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-dark font-bold text-xs px-4 py-1 rounded-full">
                      {t(`${plan}.popular`)}
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-2 ${isPopular ? "text-white" : "text-dark"}`}>
                    {t(`${plan}.name`)}
                  </h3>
                  <p className={`text-sm mb-4 ${isPopular ? "text-gray-400" : "text-gray-500"}`}>
                    {t(`${plan}.description`)}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-extrabold ${isPopular ? "text-primary" : "text-dark"}`}>
                      {t(`${plan}.price`)}
                    </span>
                    <span className={`text-sm ${isPopular ? "text-gray-400" : "text-gray-500"}`}>
                      {t(`${plan}.period`)}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {(t.raw(`${plan}.features`) as string[]).map((feat: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={isPopular ? "text-gray-300" : "text-gray-600"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/en/contact"
                    className={`block text-center font-bold py-3 rounded-xl transition-colors ${
                      isPopular
                        ? "bg-primary hover:bg-primary-hover text-dark"
                        : "bg-dark hover:bg-dark-light text-white"
                    }`}
                  >
                    {t("cta")}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">{t("guarantee")}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-dark text-center mb-10">Pricing FAQ</h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
