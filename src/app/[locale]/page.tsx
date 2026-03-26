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

function Check() {
  return <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>;
}

export default function HomePage() {
  const t = useTranslations();
  const homeFaqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`services.faq.items.${i}.q`), answer: t(`services.faq.items.${i}.a`) }));

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* HERO */}
      <section className="bg-primary-light py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-6">
                {t("hero.badge")}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">
                {t("hero.title")}
              </h1>
              <p className="text-base lg:text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
                {t("hero.subtitle")}
              </p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <Check />
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <span>{t("hero.trust")}</span>
                <span className="text-primary font-bold">&#9733; {t("hero.rating")}</span>
              </div>
            </div>
            <div>
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key) => (
              <div key={key} className="text-center p-4 rounded-xl bg-white border border-gray-100">
                <div className="text-xl sm:text-2xl font-extrabold text-primary">{t(`stats.${key}.value`)}</div>
                <div className="text-xs text-gray-500 mt-1">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 lg:py-24" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-4">
              {t("features.sectionTag")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark">{t("features.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("features.subtitle")}</p>
          </div>

          {/* CRM */}
          <div className="mb-20 bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-5xl font-extrabold text-gray-200 mb-2">01</div>
                <div className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full mb-3">{t("features.crm.tag")}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.crm.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.crm.description")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.crm.features.${i}.title`)}</h4>
                      <p className="text-xs text-gray-500">{t(`features.crm.features.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-l-4 border-primary bg-white rounded-r-xl p-4 mb-4">
                  <p className="italic text-gray-500 text-sm">&ldquo;{t("features.crm.testimonial.quote")}&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-2">&mdash; {t("features.crm.testimonial.author")}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/images/mobile-crm.webp" alt="CRM mobile app" width={260} height={520} className="rounded-2xl shadow-xl animate-float" />
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-20 bg-primary-light rounded-2xl p-6 sm:p-10 border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/hand-phone-calendar.webp" alt="Calendar" width={240} height={420} className="rounded-2xl animate-float" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="text-5xl font-extrabold text-primary/10 mb-2">02</div>
                <div className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full mb-3">{t("features.calendar.tag")}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.calendar.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.calendar.description")}</p>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0"><Check /></div>
                      <div>
                        <h4 className="font-semibold text-sm text-dark">{t(`features.calendar.features.${i}.title`)}</h4>
                        <p className="text-xs text-gray-500">{t(`features.calendar.features.${i}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Automation */}
          <div className="mb-20 bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-5xl font-extrabold text-gray-200 mb-2">04</div>
                <div className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full mb-3">{t("features.automation.tag")}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.automation.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.automation.description")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.automation.types.${i}.title`)}</h4>
                      <p className="text-xs text-gray-500">{t(`features.automation.types.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/images/dashboard-multidevice.webp" alt="Automation" width={480} height={380} className="rounded-2xl shadow-xl animate-float" />
              </div>
            </div>
          </div>

          {/* Telephony */}
          <div className="bg-primary-light rounded-2xl p-6 sm:p-10 border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/dashboard-multidevice.webp" alt="Telephony" width={460} height={360} className="rounded-2xl shadow-xl" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="text-5xl font-extrabold text-primary/10 mb-2">05</div>
                <div className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full mb-3">{t("features.telephony.tag")}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.telephony.title")}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{t("features.telephony.description")}</p>
                <ul className="space-y-2 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check />
                      {t(`features.telephony.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/60 border border-primary/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600"><strong className="text-primary">Bonus:</strong> {t("features.telephony.bonus")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-4">
              {t("benefits.sectionTag")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark">{t("benefits.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`benefits.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-hover py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-3">{t("cta.ready")}</h2>
          <p className="text-dark/70 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="bg-dark text-primary font-bold px-8 py-4 rounded-xl text-lg shadow-lg">{PHONE}</a>
            <Link href="/pt/contact" className="bg-white text-dark font-bold px-8 py-4 rounded-xl text-lg">{t("cta.button")}</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{t("services.faq.title")}</h2>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
