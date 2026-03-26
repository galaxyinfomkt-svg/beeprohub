import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  const locale = useLocale();

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "BeeProCard", url: "https://beeprohub.com/pt/beeprocard" }])]} />

      {/* Hero - Gradiente escuro com imagem de celular */}
      <section className="relative bg-gradient-to-br from-dark via-dark-light to-dark overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left text-white">
              <span className="bg-primary text-dark font-extrabold text-xs px-4 py-2 rounded-full uppercase tracking-wide">{t("sectionTag")}</span>
              <h1 className="section-heading mt-5 mb-5">{t("title")}</h1>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">{t("subtitle")}</p>
              <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow">
                {t("cta")} &rarr;
              </Link>
            </div>
            <div className="animate-fade-right flex justify-center">
              <div className="relative">
                <Image src="/images/mobile-crm.webp" alt="BeeProCard" width={260} height={520} className="rounded-2xl shadow-2xl animate-float" />
                <div className="absolute -top-3 -right-3 bg-primary text-dark font-bold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce-in">QR Code</div>
                <div className="absolute -bottom-3 -left-3 bg-white text-dark font-bold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce-in delay-300">100% Gratis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 lg:py-20 bg-dots">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{t("tagline")}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t("description")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-gold p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold-200/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-2 border-primary/10 mb-12">
            <h2 className="text-2xl font-extrabold text-dark text-center mb-8">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ s: "1", t: "Crie Seu Card", d: "Personalize com suas cores, logo, foto e links." }, { s: "2", t: "Compartilhe", d: "Via QR Code, link, WhatsApp ou redes sociais." }, { s: "3", t: "Acompanhe", d: "Veja acessos, cliques e colete avaliacoes." }].map((item) => (
                <div key={item.s} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold text-xl rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">{item.s}</div>
                  <h3 className="font-bold text-dark mb-2">{item.t}</h3>
                  <p className="text-sm text-gray-500">{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-lg px-12 py-5">{t("cta")} &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
