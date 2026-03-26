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

      <section className="bg-primary-light py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-5">{t("sectionTag")}</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">{t("title")}</h1>
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed">{t("subtitle")}</p>
            </div>
            <div><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{t("tagline")}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t("description")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100 mb-10">
            <h2 className="text-2xl font-bold text-dark text-center mb-8">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ s: "1", t: "Crie Seu Card", d: "Personalize com suas cores, logo, foto e links." }, { s: "2", t: "Compartilhe", d: "Via QR Code, link, WhatsApp ou redes sociais." }, { s: "3", t: "Acompanhe", d: "Veja acessos, cliques e colete avaliacoes." }].map((item) => (
                <div key={item.s} className="text-center">
                  <div className="w-14 h-14 bg-primary text-dark font-extrabold text-xl rounded-2xl flex items-center justify-center mx-auto mb-4">{item.s}</div>
                  <h3 className="font-bold text-dark mb-2">{item.t}</h3>
                  <p className="text-sm text-gray-500">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link href="/pt/contact" className="inline-block bg-primary hover:bg-primary-hover text-dark font-bold px-10 py-4 rounded-xl text-lg transition-all animate-pulse-glow">{t("cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
