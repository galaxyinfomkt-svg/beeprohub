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

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" alt="Business dashboard" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 via-purple-800/60 to-primary/40" />
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

              <p className="text-gray-500 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">{t("hero.subtitle")}</p>

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
                <Link href="/pt/contact" className="btn-primary btn-shine animate-pulse-yellow text-center">
                  TESTAR GRATIS POR 14 DIAS
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
                <span className="text-gray-500 font-medium">{t("hero.trust")}</span>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  <span className="text-primary font-bold">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="text-gray-600 text-xs">{t("hero.rating")}</span>
                </div>
              </div>
            </div>

            {/* Right - Dashboard image + floating badges */}
            <div className="relative animate-fade-right">
              <div className="relative bg-gradient-to-br from-primary/5 to-gold-100/30 rounded-3xl p-4 border-2 border-primary/20 shadow-glow-lg">
                <Image src="/images/dashboard-multidevice.webp" alt="BeeProHub Dashboard - CRM e automacao de marketing" width={560} height={440} className="rounded-2xl w-full h-auto animate-float" priority />

                {/* Floating badge top-right */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-primary/20 animate-bounce-in">
                  <p className="text-primary font-extrabold text-lg leading-none">14 Dias</p>
                  <p className="text-gray-500 text-[10px] font-semibold">Teste Gratis</p>
                </div>

                {/* Floating badge bottom-left */}
                <div className="absolute -bottom-4 -left-4 bg-dark rounded-xl px-4 py-2 shadow-lg border border-primary/30 animate-bounce-in delay-300">
                  <p className="text-primary font-extrabold text-lg leading-none">24/7</p>
                  <p className="text-gray-400 text-[10px] font-semibold">Suporte Total</p>
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

      {/* ========== MINI CTA ========== */}
      <section className="bg-gradient-animated py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark font-bold text-base sm:text-lg text-center sm:text-left">Pronto para transformar seu negocio?</p>
          <Link href="/pt/contact" className="bg-dark text-primary font-bold px-8 py-3 rounded-xl text-sm btn-shine whitespace-nowrap">
            COMECAR AGORA &rarr;
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
                    <Link href="/pt/contact" className="btn-primary btn-shine">{t("features.crm.cta")} &rarr;</Link>
                    <Link href="/pt/contact" className="btn-outline">{t("features.crm.ctaSecondary")}</Link>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image src="/images/mobile-crm.webp" alt="CRM BeeProHub" width={260} height={520} className="rounded-2xl shadow-2xl animate-float" />
                    <div className="absolute -bottom-3 -right-3 bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">+250% conversao</div>
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
                  <Link href="/pt/contact" className="btn-primary btn-shine">{t("features.calendar.cta")} &rarr;</Link>
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
                    <Link href="/pt/contact" className="btn-primary btn-shine">{t("features.automation.cta")} &rarr;</Link>
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
                    <p className="text-sm text-gray-300"><strong className="text-primary">Bonus Especial:</strong> {t("features.telephony.bonus")}</p>
                  </div>
                  <Link href="/pt/contact" className="btn-primary btn-shine">{t("features.telephony.cta")} &rarr;</Link>
                </div>
              </div>
            </div>
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
            <Link href="/pt/contact" className="btn-secondary btn-shine text-lg">
              COMECAR TESTE GRATIS &rarr;
            </Link>
            <a href={PHONE_LINK} className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:-translate-y-1 transition-all btn-shine">
              LIGAR: {PHONE}
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
            <Link href="/pt/contact" className="btn-primary btn-shine animate-pulse-yellow text-lg px-12 py-5">
              COMECAR TESTE GRATIS &rarr;
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
            <Link href="/pt/beeprocard" className="btn-primary btn-shine animate-pulse-yellow text-lg">
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
            <p className="text-gray-500 mb-4">Ainda tem duvidas?</p>
            <Link href="/pt/contact" className="btn-primary btn-shine">FALAR COM ESPECIALISTA &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="bg-gradient-animated py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-4">Ultima Chance! Comece Agora Sem Pagar Nada!</h2>
          <p className="text-dark/70 mb-3 text-lg">14 dias de acesso total. Sem cartao. Sem compromisso.</p>
          <p className="text-dark font-bold mb-8">Bonus: $944 em recursos GRATIS ao se cadastrar hoje!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="btn-secondary btn-shine text-lg">LIGAR AGORA: {PHONE}</a>
            <Link href="/pt/contact" className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-xl hover:-translate-y-1 transition-all btn-shine">
              TESTE GRATIS ONLINE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
