import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("mission.text").slice(0, 160) };
}

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <>
      <JsonLd data={[organizationSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "About", url: "https://beeprohub.com/pt/about" }])]} />

      <section className="bg-primary-light py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-5">{t("title")}</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">{t("subtitle")}</h1>
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed">{t("mission.text")}</p>
            </div>
            <div><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-5">{t("story.title")}</h2>
          <p className="text-gray-500 leading-loose text-base">{t("story.text")}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">{t("whyUs.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`whyUs.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
