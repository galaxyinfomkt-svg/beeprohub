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

      <section className="hero-gradient pt-8 pb-12 lg:pt-12 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-left">
              <span className="section-tag inline-block mb-4">{t("title")}</span>
              <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-dark leading-[1.1] mb-4">{t("subtitle")}</h1>
              <p className="text-[17px] text-gray-500 leading-relaxed">{t("mission.text")}</p>
            </div>
            <div className="animate-fade-in-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="section-title mb-4">{t("story.title")}</h2>
          <p className="text-gray-500 leading-[1.8] text-[17px]">{t("story.text")}</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">{t("whyUs.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-7">
                <div className="icon-circle mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-[17px] font-bold text-dark mb-2">{t(`whyUs.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
