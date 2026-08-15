import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { organizationSchema, localBusinessSchema, faqSchema, websiteSchema, siteNavigationSchema, softwareSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";
import { PLAN_OFFERS } from "@/data/plans";
import { testimonials, getQuote, getResult } from "@/data/testimonials";
import { PHONE, PHONE_LINK, SITE_URL } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return pageSeo({ title: t("home.title"), description: t("home.description"), keywords: tMeta("keywords"), path: "", locale });
}

function Check() {
  return <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>;
}

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const contactHref = `/${locale}/contact`;
  const homeFaqs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({ question: t(`services.faq.items.${i}.q`), answer: t(`services.faq.items.${i}.a`) }));

  return (
    <>
      <JsonLd data={[
        organizationSchema(),
        localBusinessSchema(),
        websiteSchema(locale),
        siteNavigationSchema(locale),
        softwareSchema({
          name: "Bee Pro Hub",
          description: t("hero.subtitle"),
          url: `${SITE_URL}/${locale}/pricing`,
          offers: PLAN_OFFERS,
        }),
        faqSchema(homeFaqs),
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" alt="Bee Pro Hub CRM dashboard helping Massachusetts businesses manage leads and sales" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left */}
            <div className="animate-fade-left">
              <div className="badge-gold mb-6 animate-wiggle">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {t("hero.badge")}
              </div>

              <h1 className="section-heading text-white mb-5">
                <span className="text-gradient-gold">{t("hero.title")}</span>
              </h1>

              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">{t("hero.subtitle")}</p>

              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-100 text-sm">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href={contactHref} className="btn-primary btn-shine animate-pulse-yellow text-center">
                  {t("hero.cta")}
                </Link>
                <a href={PHONE_LINK} className="btn-outline text-center">
                  {PHONE}
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${i===1?'bg-primary/20':i===2?'bg-blue-200':i===3?'bg-green-200':'bg-pink-200'}`} />
                  ))}
                </div>
                <span className="text-white/70 font-medium">{t("hero.trust")}</span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                  <span className="text-primary font-bold">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="text-white text-xs">{t("hero.rating")}</span>
                </div>
              </div>
            </div>

            {/* Right - Dashboard image + floating badges */}
            <div className="relative animate-fade-right">
              <div className="relative bg-gradient-to-br from-primary/5 to-gold-100/30 rounded-3xl p-4 border-2 border-primary/20 shadow-glow-lg">
                <Image src="/images/dashboard-multidevice.webp" alt="BeeProHub Dashboard - CRM e automacao de marketing" width={560} height={440} className="rounded-2xl w-full h-auto animate-float" priority />

                {/* Floating badge top-right */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-primary/20 animate-bounce-in">
                  <p className="text-primary font-extrabold text-lg leading-none">{t("stats.trial.value")}</p>
                  <p className="text-gray-500 text-[10px] font-semibold">{t("stats.trial.label")}</p>
                </div>

                {/* Floating badge bottom-left */}
                <div className="absolute -bottom-4 -left-4 bg-dark rounded-xl px-4 py-2 shadow-lg border border-primary/30 animate-bounce-in delay-300">
                  <p className="text-primary font-extrabold text-lg leading-none">{t("stats.support.value")}</p>
                  <p className="text-gray-400 text-[10px] font-semibold">{t("stats.support.label")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="bg-gradient-to-r from-dark to-dark-light py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key) => (
              <div key={key} className="glass-card text-center p-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">{t(`stats.${key}.value`)}</div>
                <div className="text-[11px] text-gray-400 mt-1">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INTEGRATIONS / BUILT-ON STRIP (E05 SaaS-adapted) ========== */}
      <section className="bg-white py-10 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            {locale === "pt"
              ? "Construído sobre · Integra com"
              : locale === "es"
              ? "Construido sobre · Integra con"
              : "Built on · Integrates with"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400">
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12l2-2 2 2-2 2-2-2zm14 0l2-2 2 2-2 2-2-2zM10 5l2-2 2 2-2 2-2-2zm0 14l2-2 2 2-2 2-2-2zM10 12l2-2 2 2-2 2-2-2z" /></svg>
              <span className="font-bold text-sm">GoHighLevel</span>
            </div>
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" /></svg>
              <span className="font-bold text-sm">Google Calendar</span>
            </div>
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              <span className="font-bold text-sm">WhatsApp Business</span>
            </div>
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              <span className="font-bold text-sm">Mailgun</span>
            </div>
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5.79 14.32c-.86 0-1.55-.7-1.55-1.55v-1.55c0-.86.7-1.55 1.55-1.55h.78v4.65h-.78zm12.42-4.65v4.65h-.78V9.67h.78zM12 7.34c-2.57 0-4.66 2.08-4.66 4.66S9.43 16.66 12 16.66s4.66-2.08 4.66-4.66S14.57 7.34 12 7.34zm0 7.76c-1.71 0-3.1-1.39-3.1-3.1s1.39-3.1 3.1-3.1 3.1 1.39 3.1 3.1-1.39 3.1-3.1 3.1z" /></svg>
              <span className="font-bold text-sm">Twilio</span>
            </div>
            <div className="flex items-center gap-2 hover:text-dark transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" /></svg>
              <span className="font-bold text-sm">Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MINI CTA ========== */}
      <section className="bg-gradient-animated py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark font-bold text-base sm:text-lg text-center sm:text-left">{t("extras.miniCtaText")}</p>
          <Link href={contactHref} className="bg-dark text-primary font-bold px-8 py-3 rounded-xl text-sm btn-shine whitespace-nowrap">
            {t("extras.miniCtaButton")} &rarr;
          </Link>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="bg-white py-16 lg:py-24 bg-dots" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="badge-gold mb-4">{t("features.sectionTag")}</div>
            <h2 className="section-heading text-dark">{t("features.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("features.subtitle")}</p>
          </div>

          {/* Feature 01 - CRM - Light bg */}
          <div className="mb-16 rounded-3xl border-2 border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover">
            <div className="bg-gradient-to-br from-gold-50 to-white p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="feature-number">01</span>
                    <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">{t("features.crm.tag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.crm.title")}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">{t("features.crm.description")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="card-gold !p-4">
                        <h4 className="font-bold text-sm text-dark mb-1">{t(`features.crm.features.${i}.title`)}</h4>
                        <p className="text-xs text-gray-500">{t(`features.crm.features.${i}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-gold-50 border-l-4 border-primary rounded-r-xl p-4 mb-6">
                    <p className="italic text-gray-600 text-sm">&ldquo;{t("features.crm.testimonial.quote")}&rdquo;</p>
                    <p className="text-xs text-gray-400 mt-2 not-italic font-bold">&mdash; {t("features.crm.testimonial.author")}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={contactHref} className="btn-primary btn-shine">{t("features.crm.cta")} &rarr;</Link>
                    <Link href={contactHref} className="btn-outline">{t("features.crm.ctaSecondary")}</Link>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image src="/images/mobile-crm.webp" alt="CRM BeeProHub" width={260} height={520} className="rounded-2xl shadow-2xl animate-float" />
                    <div className="absolute -bottom-3 -right-3 bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">{t("extras.conversionBadge")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 02 - Calendar - Dark bg */}
          <div className="mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-dark to-dark-light relative">
            <div className="absolute inset-0 bg-dots opacity-20" />
            <div className="relative z-10 p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center order-2 lg:order-1">
                  <Image src="/images/hand-phone-calendar.webp" alt="Calendario BeeProHub" width={240} height={420} className="rounded-2xl animate-float drop-shadow-2xl" />
                </div>
                <div className="order-1 lg:order-2 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-7xl font-black text-primary/20">02</span>
                    <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">{t("features.calendar.tag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("features.calendar.title")}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{t("features.calendar.description")}</p>
                  <div className="space-y-3 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="glass-card p-4 flex gap-3">
                        <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0"><Check /></div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{t(`features.calendar.features.${i}.title`)}</h4>
                          <p className="text-xs text-gray-400">{t(`features.calendar.features.${i}.desc`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={contactHref} className="btn-primary btn-shine">{t("features.calendar.cta")} &rarr;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 04 - Automation - Light bg */}
          <div className="mb-16 rounded-3xl border-2 border-orange-100 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover">
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="feature-number">04</span>
                    <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">{t("features.automation.tag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.automation.title")}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">{t("features.automation.description")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="card-gold !p-4 !bg-gradient-to-br !from-orange-50 !to-amber-50 !border-orange-100">
                        <h4 className="font-bold text-sm text-dark mb-1">{t(`features.automation.types.${i}.title`)}</h4>
                        <p className="text-xs text-gray-500">{t(`features.automation.types.${i}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-6">
                    <p className="italic text-gray-600 text-sm">&ldquo;{t("features.automation.testimonial.quote")}&rdquo;</p>
                    <p className="text-xs text-gray-400 mt-2 not-italic font-bold">&mdash; {t("features.automation.testimonial.author")}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={contactHref} className="btn-primary btn-shine">{t("features.automation.cta")} &rarr;</Link>
                    <a href={PHONE_LINK} className="btn-outline">{PHONE}</a>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image src="/images/dashboard-multidevice.webp" alt="Automacao BeeProHub" width={480} height={380} className="rounded-2xl shadow-xl animate-float" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 05 - Telephony - Dark bg */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-dark to-dark-light relative">
            <div className="absolute inset-0 bg-dots opacity-20" />
            <div className="relative z-10 p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center order-2 lg:order-1">
                  <Image src="/images/mobile-opportunities.webp" alt="Telefonia BeeProHub" width={280} height={560} className="rounded-2xl shadow-2xl animate-float" />
                </div>
                <div className="order-1 lg:order-2 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-7xl font-black text-primary/20">05</span>
                    <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">{t("features.telephony.tag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("features.telephony.title")}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{t("features.telephony.description")}</p>
                  <ul className="space-y-2.5 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center"><svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                        {t(`features.telephony.features.${i}`)}
                      </li>
                    ))}
                  </ul>
                  <div className="glass-card p-4 mb-6">
                    <p className="text-sm text-gray-300"><strong className="text-primary">{t("extras.bonusLabel")}</strong> {t("features.telephony.bonus")}</p>
                  </div>
                  <Link href={contactHref} className="btn-primary btn-shine">{t("features.telephony.cta")} &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REVIEWS / SOCIAL PROOF ========== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="badge-gold mb-4">
              {locale === "pt" ? "O Que Nossos Clientes Dizem" : locale === "es" ? "Lo Que Dicen Nuestros Clientes" : "What Our Clients Say"}
            </div>
            {/* Sem nota agregada aqui: a média era calculada sobre depoimentos
                marcados como fictícios no código e ia para o schema como
                AggregateRating. Estrelas na SERP vêm do Google Business
                Profile, não de markup no próprio site. */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-3">
              {locale === "pt"
                ? `${testimonials.length} negócios de Massachusetts contam o que mudou`
                : locale === "es"
                ? `${testimonials.length} negocios de Massachusetts cuentan que cambio`
                : `${testimonials.length} Massachusetts businesses on what changed`}
            </h2>
            <Link href={`/${locale}/reviews`} className="text-primary font-semibold hover:text-primary-hover text-sm">
              {locale === "pt" ? "Ver todas as avaliacoes" : locale === "es" ? "Ver todas las resenas" : "See all reviews"} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 6).map((tm) => (
              <article key={tm.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/30 transition-all card-gold">
                <div className="flex items-center gap-1 mb-3 text-primary text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{getQuote(tm, locale)}&rdquo;</p>
                <div className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full inline-block mb-3">{getResult(tm, locale)}</div>
                <div className="border-t border-gray-100 pt-3">
                  <p className="font-bold text-dark text-sm">{tm.authorName}</p>
                  <p className="text-xs text-gray-500">{tm.authorRole}, {tm.company}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tm.city} &middot; {tm.industry}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BIG CTA ========== */}
      <section className="bg-gradient-animated py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-4">{t("cta.ready")}</h2>
          <p className="text-dark/70 mb-8 text-lg">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href={contactHref} className="btn-secondary btn-shine text-lg">
              {t("extras.freeTrialBtn")} &rarr;
            </Link>
            <a href={PHONE_LINK} className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:-translate-y-1 transition-all btn-shine">
              {t("extras.callPrefix")} {PHONE}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-dark/60">
            <span className="flex items-center gap-1"><Check /> {t("cta.noCard")}</span>
            <span className="flex items-center gap-1"><Check /> {t("cta.cancel")}</span>
            <span className="flex items-center gap-1"><Check /> {t("cta.support")}</span>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS ========== */}
      <section className="bg-white py-16 lg:py-24 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="badge-gold mb-4">{t("benefits.sectionTag")}</div>
            <h2 className="section-heading text-dark">{t("benefits.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const colors = ["from-gold-50 to-amber-50 border-primary/20", "from-white to-gray-50 border-gray-100", "from-orange-50 to-amber-50 border-orange-200", "from-gold-50 to-white border-primary/10", "from-white to-gold-50 border-gray-100", "from-amber-50 to-white border-primary/20"];
              return (
                <div key={i} className={`bg-gradient-to-br ${colors[i-1]} p-7 rounded-2xl border-2 card-gold`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold-200/30 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">{t(`benefits.items.${i}.title`)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`benefits.items.${i}.desc`)}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link href={contactHref} className="btn-primary btn-shine animate-pulse-yellow text-lg px-12 py-5">
              {t("extras.freeTrialBtn")} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BEEPROCARD ========== */}
      <section className="bg-gradient-to-br from-dark to-dark-light py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="bg-primary text-dark font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wide">{t("beeprocard.sectionTag")}</span>
            <h2 className="section-heading text-white mt-4">{t("beeprocard.title")}</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">{t("beeprocard.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check />
                </div>
                <h3 className="font-bold text-white mb-2">{t(`beeprocard.features.${i}.title`)}</h3>
                <p className="text-sm text-gray-400">{t(`beeprocard.features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${locale}/beeprocard`} className="btn-primary btn-shine animate-pulse-yellow text-lg">
              {t("beeprocard.cta")} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="badge-gold mb-4">{t("services.faq.title")}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{t("services.faq.title")}</h2>
          </div>
          <FAQ items={homeFaqs} />
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">{t("extras.stillQuestions")}</p>
            <Link href={contactHref} className="btn-primary btn-shine">{t("extras.talkSpecialist")} &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="bg-gradient-animated py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-4">{t("extras.finalCtaTitle")}</h2>
          <p className="text-dark/70 mb-3 text-lg">{t("extras.finalCtaSubtitle")}</p>
          <p className="text-dark font-bold mb-8">{t("extras.finalCtaBonus")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="btn-secondary btn-shine text-lg">{t("extras.callNowPrefix")} {PHONE}</a>
            <Link href={contactHref} className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-xl hover:-translate-y-1 transition-all btn-shine">
              {t("extras.finalTestOnline")} &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
