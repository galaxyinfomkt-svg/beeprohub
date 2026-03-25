import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { organizationSchema, localBusinessSchema, faqSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      languages: { en: "/en", pt: "/pt", es: "/es" },
    },
  };
}

export default function HomePage() {
  const t = useTranslations();

  const homeFaqs = [
    { question: "What is Bee Pro Hub?", answer: "Bee Pro Hub is an all-in-one CRM and marketing automation platform built on GoHighLevel. It combines CRM, email, SMS, phone, scheduling, invoicing, and automation in one platform for local businesses." },
    { question: "How much does it cost?", answer: "Plans start at $97/month. All plans include a 14-day free trial with no credit card required." },
    { question: "Is there a free trial?", answer: "Yes! You get 14 days of full access completely free. No credit card required, no commitments." },
    { question: "What kind of businesses use Bee Pro Hub?", answer: "Contractors, cleaning companies, roofing businesses, painting contractors, landscaping companies, and any local service business that wants to automate marketing and manage leads." },
    { question: "Do you offer support in other languages?", answer: "Yes! We offer full 24/7 support in English, Portuguese, and Spanish." },
  ];

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* HERO SECTION */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-light" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-primary/20 text-primary font-bold text-sm px-4 py-2 rounded-full mb-6">
                {t("hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-xl">
                {t("hero.subtitle")}
              </p>

              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/en/contact"
                  className="bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-4 rounded-xl text-lg transition-all animate-pulse-glow text-center"
                >
                  {t("hero.cta")}
                </Link>
                <a
                  href={PHONE_LINK}
                  className="border-2 border-gray-600 hover:border-primary text-white hover:text-primary font-semibold px-8 py-4 rounded-xl text-lg transition-colors text-center"
                >
                  {PHONE}
                </a>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-gray-400">
                <span>{t("hero.trust")}</span>
                <span className="text-primary font-semibold">{t("hero.rating")}</span>
              </div>
            </div>

            <div className="relative animate-float hidden lg:block">
              <Image
                src="/images/dashboard-multidevice.webp"
                alt="Bee Pro Hub CRM Dashboard showing lead management on multiple devices - tablet, desktop and mobile"
                width={600}
                height={500}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key) => (
              <div key={key} className="text-center p-4">
                <div className="text-2xl md:text-3xl font-extrabold text-primary">{t(`stats.${key}.value`)}</div>
                <div className="text-xs text-gray-500 mt-1">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">{t("features.sectionTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">{t("features.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>

          {/* Feature 1 - CRM */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-6xl font-extrabold text-gray-100">{t("features.crm.number")}</span>
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full ml-3">{t("features.crm.tag")}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">{t("features.crm.title")}</h3>
                <p className="text-gray-500 mb-6">{t("features.crm.description")}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-dark text-sm">{t(`features.crm.features.${i}.title`)}</h4>
                      <p className="text-xs text-gray-500 mt-1">{t(`features.crm.features.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 text-sm mb-6">
                  &ldquo;{t("features.crm.testimonial.quote")}&rdquo;
                  <footer className="text-xs text-gray-400 mt-1 not-italic">&mdash; {t("features.crm.testimonial.author")}</footer>
                </blockquote>
                <div className="flex gap-3">
                  <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.crm.cta")}</Link>
                  <Link href="/en/contact" className="border border-gray-300 hover:border-primary text-gray-600 hover:text-primary font-semibold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.crm.ctaSecondary")}</Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/images/mobile-crm.webp" alt="Bee Pro Hub CRM mobile app showing lead management and opportunity tracking" width={300} height={600} className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Feature 2 - Calendar */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <Image src="/images/hand-phone-calendar.webp" alt="Smart scheduling calendar app on mobile phone for appointment booking" width={280} height={500} className="rounded-2xl" />
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-6xl font-extrabold text-gray-100">{t("features.calendar.number")}</span>
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full ml-3">{t("features.calendar.tag")}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">{t("features.calendar.title")}</h3>
                <p className="text-gray-500 mb-6">{t("features.calendar.description")}</p>
                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark text-sm">{t(`features.calendar.features.${i}.title`)}</h4>
                        <p className="text-xs text-gray-500">{t(`features.calendar.features.${i}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600"><strong className="text-primary">Bonus:</strong> {t("features.calendar.bonus")}</p>
                </div>
                <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.calendar.cta")}</Link>
              </div>
            </div>
          </div>

          {/* Feature 3 - Financial */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-6xl font-extrabold text-gray-100">{t("features.financial.number")}</span>
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full ml-3">{t("features.financial.tag")}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">{t("features.financial.title")}</h3>
                <p className="text-gray-500 mb-6">{t("features.financial.description")}</p>
                <ul className="space-y-2 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`features.financial.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-100 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600">{t("features.financial.timeSave")}</p>
                </div>
                <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.financial.cta")}</Link>
              </div>
              <div className="flex justify-center">
                <Image src="/images/dashboard-multidevice.webp" alt="Bee Pro Hub financial management dashboard for quotes and invoices" width={500} height={400} className="rounded-2xl shadow-xl" />
              </div>
            </div>
          </div>

          {/* Feature 4 - Automation */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <Image src="/images/mobile-opportunities.webp" alt="Marketing automation dashboard showing automated workflows and campaigns" width={300} height={600} className="rounded-2xl shadow-2xl" />
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-6xl font-extrabold text-gray-100">{t("features.automation.number")}</span>
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full ml-3">{t("features.automation.tag")}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">{t("features.automation.title")}</h3>
                <p className="text-gray-500 mb-6">{t("features.automation.description")}</p>
                <div className="space-y-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-dark text-sm">{t(`features.automation.types.${i}.title`)}</h4>
                      <p className="text-xs text-gray-500 mt-1">{t(`features.automation.types.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 text-sm mb-6">
                  &ldquo;{t("features.automation.testimonial.quote")}&rdquo;
                  <footer className="text-xs text-gray-400 mt-1 not-italic">&mdash; {t("features.automation.testimonial.author")}</footer>
                </blockquote>
                <div className="flex gap-3">
                  <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.automation.cta")}</Link>
                  <Link href="/en/contact" className="border border-gray-300 hover:border-primary text-gray-600 hover:text-primary font-semibold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.automation.ctaSecondary")}</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5 - Telephony */}
          <div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-6xl font-extrabold text-gray-100">{t("features.telephony.number")}</span>
                <span className="inline-block bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full ml-3">{t("features.telephony.tag")}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">{t("features.telephony.title")}</h3>
                <p className="text-gray-500 mb-6">{t("features.telephony.description")}</p>
                <ul className="space-y-2 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`features.telephony.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600"><strong className="text-primary">Special Bonus:</strong> {t("features.telephony.bonus")}</p>
                </div>
                <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors">{t("features.telephony.cta")}</Link>
              </div>
              <div className="flex justify-center">
                <Image src="/images/hand-phone-calendar.webp" alt="Integrated phone system on mobile device for business calls and SMS" width={280} height={500} className="rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-dark">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t("cta.ready")}</h2>
          <p className="text-gray-400 mb-8">{t("cta.subtitle")}</p>
          <Link
            href="/en/contact"
            className="inline-block bg-primary hover:bg-primary-hover text-dark font-bold px-10 py-4 rounded-xl text-lg transition-all animate-pulse-glow"
          >
            {t("cta.button")}
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
            <span>{t("cta.noCard")}</span>
            <span>{t("cta.cancel")}</span>
            <span>{t("cta.support")}</span>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-white" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">{t("benefits.sectionTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">{t("benefits.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`benefits.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEEPROCARD SECTION */}
      <section className="py-20 bg-gray-50" id="beeprocard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">{t("beeprocard.sectionTag")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">{t("beeprocard.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{t("beeprocard.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 text-center hover:shadow-lg transition-all">
                <h3 className="font-bold text-dark mb-2">{t(`beeprocard.features.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`beeprocard.features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/en/beeprocard" className="bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-4 rounded-xl text-lg transition-colors">{t("beeprocard.cta")}</Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (AEO) */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dark">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3">Everything you need to know about Bee Pro Hub</p>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
            {t("cta.ready")}
          </h2>
          <p className="text-dark/70 mb-6">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="bg-dark text-primary font-bold px-8 py-4 rounded-xl text-lg hover:bg-dark-light transition-colors">
              {PHONE}
            </a>
            <Link href="/en/contact" className="bg-white text-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-colors">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
