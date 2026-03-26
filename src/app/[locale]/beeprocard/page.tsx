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

      {/* Hero - imagem de fundo de networking */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80" alt="Business networking" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{t("sectionTag")}</div>
              <h1 className="section-heading text-white mb-5">{t("title")}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-6">{t("subtitle")}</p>
              <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow">{t("cta")} &rarr;</Link>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

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
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-2 border-primary/10 mb-12">
            <h2 className="text-2xl font-extrabold text-dark text-center mb-8">{locale === "pt" ? "Como Funciona" : locale === "es" ? "Como Funciona" : "How It Works"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { s: "1", t: locale === "pt" ? "Crie Seu Card" : "Create Your Card", d: locale === "pt" ? "Personalize com suas cores, logo, foto e links." : "Customize with your colors, logo, photo and links." },
                { s: "2", t: locale === "pt" ? "Compartilhe" : "Share", d: locale === "pt" ? "Via QR Code, link, WhatsApp ou redes sociais." : "Via QR Code, link, WhatsApp or social media." },
                { s: "3", t: locale === "pt" ? "Acompanhe" : "Track", d: locale === "pt" ? "Veja acessos, cliques e colete avaliacoes." : "See views, clicks and collect reviews." },
              ].map((item) => (
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
