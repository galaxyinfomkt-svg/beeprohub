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

function Check({ className = "" }: { className?: string }) {
  return <svg className={`w-5 h-5 text-primary shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>;
}

export default function HomePage() {
  const t = useTranslations();
  const homeFaqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`services.faq.items.${i}.q`), answer: t(`services.faq.items.${i}.a`) }));

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* ===== HERO - Gradient vibrante ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-12 lg:py-20">
        {/* Circles decorativos */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] bg-orange-200/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-in-left">
              {/* Badge animado */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-orange-100 text-amber-800 font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-full border border-primary/30 mb-6 animate-wiggle">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {t("hero.badge")}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight mb-5">
                {t("hero.title").split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-gradient">{t("hero.title").split(" ").slice(3).join(" ")}</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
                {t("hero.subtitle")}
              </p>

              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className={`flex items-start gap-3 text-gray-700 text-sm animate-fade-in-up delay-${i}00`}>
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <span className="text-primary font-bold text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="text-gray-600">{t("hero.rating")}</span>
                </div>
                <span className="text-gray-500 font-medium">{t("hero.trust")}</span>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS - Coloridos ===== */}
      <section className="bg-dark py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key, i) => (
              <div key={key} className={`text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up delay-${i}00`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">{t(`stats.${key}.value`)}</div>
                <div className="text-xs text-gray-400">{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Intermediario ===== */}
      <section className="bg-animated-gradient py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark font-bold text-lg text-center sm:text-left">Pronto para transformar seu negocio?</p>
          <Link href="/pt/contact" className="bg-dark text-primary font-bold px-8 py-3 rounded-xl text-sm hover:bg-dark-light transition-all whitespace-nowrap btn-shine">
            COMECAR AGORA &rarr;
          </Link>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-white py-16 lg:py-24" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-4">
              {t("features.sectionTag")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark">{t("features.title")}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("features.subtitle")}</p>
          </div>

          {/* CRM */}
          <div className="mb-16 rounded-3xl overflow-hidden border-2 border-primary/20 hover-glow">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-1">
              <div className="bg-white rounded-2xl p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">01</span>
                      <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full">{t("features.crm.tag")}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.crm.title")}</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">{t("features.crm.description")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover-lift">
                          <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.crm.features.${i}.title`)}</h4>
                          <p className="text-xs text-gray-500">{t(`features.crm.features.${i}.desc`)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-orange-50 border-l-4 border-primary rounded-r-xl p-4 mb-5">
                      <p className="italic text-gray-600 text-sm">&ldquo;{t("features.crm.testimonial.quote")}&rdquo;</p>
                      <p className="text-xs text-gray-400 mt-2 not-italic font-semibold">&mdash; {t("features.crm.testimonial.author")}</p>
                    </div>
                    <Link href="/pt/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm transition-all btn-shine animate-pulse-glow">
                      {t("features.crm.cta")} &rarr;
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <Image src="/images/mobile-crm.webp" alt="CRM mobile app" width={260} height={520} className="rounded-2xl shadow-2xl animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-dark to-dark-light p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/hand-phone-calendar.webp" alt="Calendar" width={240} height={420} className="rounded-2xl animate-float drop-shadow-2xl" />
              </div>
              <div className="order-1 lg:order-2 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-primary">02</span>
                  <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full">{t("features.calendar.tag")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("features.calendar.title")}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("features.calendar.description")}</p>
                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                        <Check className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">{t(`features.calendar.features.${i}.title`)}</h4>
                        <p className="text-xs text-gray-400">{t(`features.calendar.features.${i}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/pt/contact" className="inline-flex items-center gap-2 bg-primary text-dark font-bold px-6 py-3 rounded-xl text-sm btn-shine animate-pulse-glow">
                  {t("features.calendar.cta")} &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Automation */}
          <div className="mb-16 rounded-3xl overflow-hidden border-2 border-orange-100 hover-glow">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-1">
              <div className="bg-white rounded-2xl p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent">04</span>
                      <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">{t("features.automation.tag")}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{t("features.automation.title")}</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">{t("features.automation.description")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100 hover-lift">
                          <h4 className="font-semibold text-sm text-dark mb-1">{t(`features.automation.types.${i}.title`)}</h4>
                          <p className="text-xs text-gray-500">{t(`features.automation.types.${i}.desc`)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/pt/contact" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-dark font-bold px-6 py-3 rounded-xl text-sm btn-shine animate-pulse-glow">
                        {t("features.automation.cta")} &rarr;
                      </Link>
                      <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary text-gray-600 hover:text-primary font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                        {PHONE}
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Image src="/images/dashboard-multidevice.webp" alt="Automation" width={480} height={380} className="rounded-2xl shadow-xl animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Telephony */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-dark to-dark-light p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image src="/images/dashboard-multidevice.webp" alt="Telephony" width={460} height={360} className="rounded-2xl shadow-2xl" />
              </div>
              <div className="order-1 lg:order-2 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-primary">05</span>
                  <span className="bg-primary text-dark font-bold text-xs px-3 py-1.5 rounded-full">{t("features.telephony.tag")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("features.telephony.title")}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("features.telephony.description")}</p>
                <ul className="space-y-2.5 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {t(`features.telephony.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-5">
                  <p className="text-sm text-gray-300"><strong className="text-primary">Bonus:</strong> {t("features.telephony.bonus")}</p>
                </div>
                <Link href="/pt/contact" className="inline-flex items-center gap-2 bg-primary text-dark font-bold px-6 py-3 rounded-xl text-sm btn-shine animate-pulse-glow">
                  {t("features.telephony.cta")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Grande ===== */}
      <section className="bg-animated-gradient py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-3 animate-fade-in-up">{t("cta.ready")}</h2>
          <p className="text-dark/70 mb-8 text-lg">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href={PHONE_LINK} className="bg-dark text-primary font-bold px-10 py-4 rounded-xl text-lg shadow-xl hover:bg-dark-light transition-all btn-shine">
              {PHONE}
            </a>
            <Link href="/pt/contact" className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all btn-shine">
              {t("cta.button")} &rarr;
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-dark/60">
            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> {t("cta.noCard")}</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> {t("cta.cancel")}</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> {t("cta.support")}</span>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-primary/20 mb-4">
              {t("benefits.sectionTag")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark">{t("benefits.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`p-7 rounded-2xl border-2 hover-lift hover-glow animate-fade-in-up delay-${i}00 ${i === 1 ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-primary/20" : i === 4 ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200" : "bg-white border-gray-100"}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${i <= 2 ? "bg-primary/10" : i <= 4 ? "bg-orange-100" : "bg-amber-100"}`}>
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`benefits.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          {/* CTA dentro dos benefits */}
          <div className="text-center mt-12">
            <Link href="/pt/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-dark font-bold px-10 py-4 rounded-xl text-lg transition-all btn-shine animate-pulse-glow shadow-lg">
              COMECAR TESTE GRATIS &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BEEPROCARD ===== */}
      <section className="bg-dark py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary text-dark font-bold text-xs px-4 py-2 rounded-full">{t("beeprocard.sectionTag")}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4">{t("beeprocard.title")}</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">{t("beeprocard.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center hover-lift backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check />
                </div>
                <h3 className="font-bold text-white mb-2">{t(`beeprocard.features.${i}.title`)}</h3>
                <p className="text-sm text-gray-400">{t(`beeprocard.features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/pt/beeprocard" className="inline-flex items-center gap-2 bg-primary text-dark font-bold px-10 py-4 rounded-xl text-lg btn-shine animate-pulse-glow">
              {t("beeprocard.cta")} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark">{t("services.faq.title")}</h2>
          </div>
          <FAQ items={homeFaqs} />
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">Ainda tem duvidas?</p>
            <Link href="/pt/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-3 rounded-xl text-sm transition-all btn-shine">
              FALAR COM ESPECIALISTA &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-animated-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">Ultima Chance! Comece Agora Sem Pagar Nada!</h2>
          <p className="text-dark/70 mb-6 text-lg">14 dias de acesso total. Sem cartao. Sem compromisso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_LINK} className="bg-dark text-primary font-bold px-10 py-4 rounded-xl text-lg shadow-xl btn-shine">
              LIGAR AGORA: {PHONE}
            </a>
            <Link href="/pt/contact" className="bg-white text-dark font-bold px-10 py-4 rounded-xl text-lg shadow-lg btn-shine">
              TESTE GRATIS ONLINE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
