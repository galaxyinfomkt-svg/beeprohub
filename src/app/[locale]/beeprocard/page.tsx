import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "beeprocard" });
  return { title: "BeeProCard", description: t("subtitle") };
}

export default function BeeProCardPage() {
  const t = useTranslations("beeprocard");
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "BeeProCard", url: "https://beeprohub.com/pt/beeprocard" }])]} />

      <section className="hero-gradient pt-8 pb-12 lg:pt-12 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-left">
              <span className="section-tag inline-block mb-4">{t("sectionTag")}</span>
              <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-dark leading-[1.1] mb-4">{t("title")}</h1>
              <p className="text-[17px] text-gray-500 leading-relaxed">{t("subtitle")}</p>
            </div>
            <div className="animate-fade-in-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title">{t("tagline")}</h2>
            <p className="text-gray-500 mt-3 max-w-[600px] mx-auto">{t("description")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-7 text-center">
                <div className="icon-circle mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100 mb-10">
            <h2 className="text-2xl font-bold text-dark text-center mb-8">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ s: "1", t: "Crie Seu Card", d: "Personalize com suas cores, logo, foto e links." }, { s: "2", t: "Compartilhe", d: "Via QR Code, link, WhatsApp ou redes sociais." }, { s: "3", t: "Acompanhe", d: "Veja acessos, cliques e colete avaliacoes." }].map((item) => (
                <div key={item.s} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4 text-dark font-extrabold text-xl">{item.s}</div>
                  <h3 className="font-bold text-dark mb-2">{item.t}</h3>
                  <p className="text-sm text-gray-500">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link href="/pt/contact" className="btn-primary animate-pulse-glow text-[17px] px-10 py-4">{t("cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
