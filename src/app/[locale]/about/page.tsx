import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("mission.text").slice(0, 160),
    alternates: { languages: { en: "/en/about", pt: "/pt/about", es: "/es/about" } },
  };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <JsonLd data={[
        organizationSchema(),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "About", url: "https://beeprohub.com/en/about" },
        ]),
      ]} />

      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-400">{t("subtitle")}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-4">{t("mission.title")}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t("mission.text")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-4">{t("story.title")}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t("story.text")}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-10 text-center">{t("whyUs.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`whyUs.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
