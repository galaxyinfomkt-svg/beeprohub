import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { organizationSchema, localBusinessSchema, faqSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description"), keywords: t("keywords"), alternates: { languages: { en: "/en", pt: "/pt", es: "/es" } } };
}

export default function HomePage() {
  const t = useTranslations();
  const homeFaqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`services.faq.items.${i}.q`), answer: t(`services.faq.items.${i}.a`) }));

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* HERO */}
      <section className="hero-gradient overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-in-left">
              <span className="section-tag mb-5 inline-block">{t("hero.badge")}</span>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-dark leading-[1.1] mb-5">
                {t("hero.title")}
              </h1>
              <p className="text-[17px] text-gray-500 mb-7 leading-relaxed max-w-[520px]">{t("hero.subtitle")}</p>
              <ul className="flex flex-col gap-3 mb-7">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <span>{t("hero.trust")}</span>
                <span className="text-primary font-bold">&#9733; {t("hero.rating")}</span>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key) => (
              <div key={key} className="stat-card">
                <div className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-primary">{t(`stats.${key}.value`)}</div>
                <div className="text-xs text-gray-500 mt-1">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding bg-white" id="features">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-tag">{t("features.sectionTag")}</span>
            <h2 className="section-title mt-3">{t("features.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-[600px] mx-auto">{t("features.subtitle")}</p>
          </div>

          {/* CRM */}
          <div className="mb-16 bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-gray-100">01</span>
                  <span className="section-tag">{t("features.crm.tag")}</span>
                </div>
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-dark mb-3">{t("features.crm.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.crm.description")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.crm.features.${i}.title`)}</h4>
                      <p className="text-[13px] text-gray-500">{t(`features.crm.features.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary bg-white rounded-r-xl p-4 italic text-gray-500 text-sm mb-5">
                  &ldquo;{t("features.crm.testimonial.quote")}&rdquo;
                  <footer className="text-xs text-gray-400 mt-2 not-italic">&mdash; {t("features.crm.testimonial.author")}</footer>
                </blockquote>
              </div>
              <div className="flex justify-center">
                <Image src="/images/mobile-crm.webp" alt="CRM mobile app" width={280} height={560} className="rounded-2xl shadow-2xl animate-float max-w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-16 bg-primary-light rounded-3xl p-6 sm:p-8 lg:p-12 border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/hand-phone-calendar.webp" alt="Calendar" width={260} height={460} className="rounded-2xl animate-float max-w-full h-auto" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-primary/10">02</span>
                  <span className="section-tag">{t("features.calendar.tag")}</span>
                </div>
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-dark mb-3">{t("features.calendar.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.calendar.description")}</p>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <div className="icon-circle">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-dark">{t(`features.calendar.features.${i}.title`)}</h4>
                      <p className="text-[13px] text-gray-500">{t(`features.calendar.features.${i}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automation */}
          <div className="mb-16 bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-gray-100">04</span>
                  <span className="section-tag">{t("features.automation.tag")}</span>
                </div>
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-dark mb-3">{t("features.automation.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.automation.description")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.automation.types.${i}.title`)}</h4>
                      <p className="text-[13px] text-gray-500">{t(`features.automation.types.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/images/dashboard-multidevice.webp" alt="Automation" width={500} height={400} className="rounded-2xl shadow-xl animate-float max-w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Telephony */}
          <div className="bg-primary-light rounded-3xl p-6 sm:p-8 lg:p-12 border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/dashboard-multidevice.webp" alt="Telephony" width={480} height={380} className="rounded-2xl shadow-xl max-w-full h-auto" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-primary/10">05</span>
                  <span className="section-tag">{t("features.telephony.tag")}</span>
                </div>
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-dark mb-3">{t("features.telephony.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.telephony.description")}</p>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t(`features.telephony.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/60 border border-primary/20 rounded-xl p-4 mb-5">
                  <p className="text-sm text-gray-600"><strong className="text-primary">Bonus:</strong> {t("features.telephony.bonus")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-tag">{t("benefits.sectionTag")}</span>
            <h2 className="section-title mt-3">{t("benefits.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-7">
                <div className="icon-circle mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-[17px] font-bold text-dark mb-2">{t(`benefits.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-hover py-16">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-dark mb-3">{t("cta.ready")}</h2>
          <p className="text-dark/70 mb-7">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_LINK} className="bg-dark text-primary font-bold px-8 py-4 rounded-xl text-[17px] shadow-lg">{PHONE}</a>
            <Link href="/pt/contact" className="bg-white text-dark font-bold px-8 py-4 rounded-xl text-[17px]">{t("cta.button")}</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="max-w-[720px] mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-tag">{t("services.faq.title")}</span>
            <h2 className="section-title mt-3">{t("services.faq.title")}</h2>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
