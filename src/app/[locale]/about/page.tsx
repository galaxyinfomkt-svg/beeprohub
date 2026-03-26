import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("mission.text").slice(0, 160) };
}

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <>
      <JsonLd data={[organizationSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "About", url: "https://beeprohub.com/pt/about" }])]} />

      {/* Hero - Gradiente escuro com imagem */}
      <section className="relative bg-gradient-to-br from-dark via-dark-light to-dark overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{t("title")}</div>
              <h1 className="section-heading text-white mb-5">{t("subtitle")}</h1>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8">{t("mission.text")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-center">
                  FALE CONOSCO &rarr;
                </Link>
                <a href={PHONE_LINK} className="btn-outline text-center">{PHONE}</a>
              </div>
            </div>
            <div className="animate-fade-right">
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-4 border border-primary/20">
                <Image src="/images/dashboard-multidevice.webp" alt="BeeProHub Platform" width={560} height={440} className="rounded-2xl animate-float" />
                <div className="absolute -top-3 -right-3 bg-primary text-dark font-bold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce-in">
                  Desde 2004
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">{t("story.title")}</h2>
          <p className="text-gray-500 leading-loose text-base lg:text-lg">{t("story.text")}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gradient-to-br from-gold-50 to-amber-50 py-16 lg:py-20 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-12">{t("whyUs.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-gold p-7">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold-200/30 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`whyUs.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-animated py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">Quer Saber Mais?</h2>
          <p className="text-dark/70 mb-6">Entre em contato e descubra como podemos transformar seu negocio.</p>
          <Link href={`/${locale}/contact`} className="btn-secondary btn-shine">FALAR COM ESPECIALISTA &rarr;</Link>
        </div>
      </section>
    </>
  );
}
