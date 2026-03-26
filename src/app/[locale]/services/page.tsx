import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

const serviceKeys = ["crm", "automation", "leadgen", "websites", "ads"] as const;
const icons = ["M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z","M13 10V3L4 14h7v7l9-11h-7z","M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z","M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9","M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"];

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();
  const faqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`faq.items.${i}.q`), answer: t(`faq.items.${i}.a`) }));

  return (
    <>
      <JsonLd data={[...serviceKeys.map((k) => serviceSchema(t(`items.${k}.title`), t(`items.${k}.description`), `https://beeprohub.com/pt/services`)), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Services", url: "https://beeprohub.com/pt/services" }])]} />

      {/* Hero - Gradiente amarelo vibrante com form */}
      <section className="relative bg-gradient-to-br from-primary via-primary-hover to-amber-500 overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dark/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="inline-flex items-center gap-2 bg-dark/20 text-white font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                5 FERRAMENTAS EM 1
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">{t("title")}</h1>
              <p className="text-dark/70 text-base lg:text-lg leading-relaxed mb-6">{t("subtitle")}</p>
              <div className="flex items-center gap-3">
                <Image src="/images/mobile-crm.webp" alt="CRM" width={48} height={48} className="w-12 h-12 rounded-lg shadow-md" />
                <Image src="/images/hand-phone-calendar.webp" alt="Calendar" width={48} height={48} className="w-12 h-12 rounded-lg shadow-md" />
                <Image src="/images/dashboard-multidevice.webp" alt="Dashboard" width={48} height={48} className="w-12 h-12 rounded-lg shadow-md" />
                <span className="text-dark/60 text-sm font-semibold ml-2">+ muito mais</span>
              </div>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 lg:py-24 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          {serviceKeys.map((key, idx) => {
            const isDark = idx % 2 === 1;
            return (
              <div key={key} className={`rounded-3xl overflow-hidden ${isDark ? "bg-gradient-to-br from-dark to-dark-light" : "bg-gradient-to-br from-gold-50 to-white border-2 border-primary/10 hover:border-primary/30"} transition-all duration-500 hover:shadow-card-hover`}>
                <div className={`p-6 sm:p-10 ${isDark ? "relative" : ""}`}>
                  {isDark && <div className="absolute inset-0 bg-dots opacity-20" />}
                  <div className={`relative z-10 ${isDark ? "" : ""}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-primary/20" : "bg-gradient-to-br from-primary/20 to-gold-200/30"}`}>
                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[idx]} /></svg>
                      </div>
                      <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-dark"}`}>{t(`items.${key}.title`)}</h2>
                    </div>
                    <p className={`mb-6 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t(`items.${key}.description`)}</p>
                    <ul className="space-y-2 mb-6">
                      {(t.raw(`items.${key}.features`) as string[]).map((f: string, i: number) => (
                        <li key={i} className={`flex items-center gap-2.5 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${isDark ? "bg-primary/20" : "bg-primary/10"}`}>
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/${locale}/contact`} className={`${isDark ? "btn-primary" : "btn-primary"} btn-shine`}>
                      {t(`items.${key}.title`)} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">{t("faq.title")}</h2>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
