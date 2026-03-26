import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { PHONE, PHONE_LINK, LOGIN_URL } from "@/lib/utils";
import { massachusettsCities } from "@/data/massachusetts-cities";

const topCities = massachusettsCities.slice(0, 30);

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer>
      {/* CTA Banner */}
      <section className="bg-gradient-animated py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-3">
            {locale === "en" ? "Start Your Free Trial Now!" : locale === "es" ? "Comienza Tu Prueba Gratis!" : "Comece Seu Teste Gratis Agora!"}
          </h2>
          <p className="text-dark/70 mb-6 text-base">
            {locale === "en" ? "14 days full access. Cancel anytime." : locale === "es" ? "14 dias acceso total. Cancela cuando quieras." : "14 dias de acesso total. Cancele quando quiser."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_LINK} className="btn-secondary btn-shine">
              {locale === "en" ? "Call & Activate" : locale === "es" ? "Llamar y Activar" : "Ligar e Ativar"}
            </a>
            <Link href={`/${locale}/contact`} className="bg-white text-dark font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:-translate-y-1 transition-all btn-shine">
              {locale === "en" ? "Start Online" : locale === "es" ? "Prueba Online" : "Teste Online"}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer - Dark, legible */}
      <div className="bg-dark text-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Image src="/images/logo.png" alt="Bee Pro Hub" width={140} height={48} className="h-10 w-auto mb-5" />
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{t("description")}</p>
              <p className="text-xs text-gray-500">{t("byLine")}</p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wide">{t("navigation")}</h3>
              <ul className="space-y-3">
                {[
                  { href: `/${locale}`, label: nav("home") },
                  { href: `/${locale}/about`, label: nav("about") },
                  { href: `/${locale}/services`, label: nav("services") },
                  { href: `/${locale}/pricing`, label: nav("pricing") },
                  { href: `/${locale}/blog`, label: nav("blog") },
                  { href: `/${locale}/beeprocard`, label: nav("beeprocard") },
                  { href: `/${locale}/contact`, label: nav("contact") },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:text-primary-hover transition-colors">
                    {nav("login")} &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources + Landing Pages */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wide">{t("resources")}</h3>
              <ul className="space-y-3">
                {[t("crmComplete"), t("integratedCalendar"), t("quotesInvoices"), t("totalAutomation"), t("phoneSystem"), "BeeProCard"].map((item) => (
                  <li key={item}>
                    <Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
              <h4 className="text-white font-bold text-sm mt-6 mb-3 uppercase tracking-wide">Landing Pages</h4>
              <ul className="space-y-2">
                {["contractors", "cleaning", "roofing", "painting", "landscaping"].map((n) => (
                  <li key={n}>
                    <Link href={`/${locale}/landing/${n}`} className="text-xs text-gray-500 hover:text-primary transition-colors capitalize">{n}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wide">{t("contactTitle")}</h3>
              <div className="space-y-4">
                <a href={PHONE_LINK} className="flex items-center gap-2.5 text-primary font-bold text-lg hover:text-primary-hover transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {t("phone")}
                </a>
                <p className="text-sm text-gray-400">{t("hours")}</p>
                <div className="border-t border-gray-800 pt-3">
                  <p className="text-sm text-gray-400 font-semibold">{t("company")}</p>
                  <p className="text-xs text-gray-500">{t("since")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cities Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">
              {locale === "en" ? "We Serve All Massachusetts Cities" : locale === "es" ? "Servimos Todas las Ciudades de Massachusetts" : "Atendemos Todas as Cidades de Massachusetts"}
            </h3>
            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
              {topCities.map((city, i) => (
                <span key={city.slug}>
                  <Link href={`/en/marketing-agency-${city.slug}-ma`} className="text-xs text-gray-500 hover:text-primary transition-colors">
                    {city.name}
                  </Link>
                  {i < topCities.length - 1 && <span className="text-gray-700 mx-0.5">&middot;</span>}
                </span>
              ))}
              <Link href={`/${locale}/services`} className="text-xs text-primary font-semibold ml-1">
                {locale === "en" ? "& more..." : locale === "es" ? "y mas..." : "e mais..."}
              </Link>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              &copy; 2026 Bee Pro Hub by{" "}
              <a href="https://galaxyinfo.us" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover font-semibold">
                Galaxy IT &amp; Marketing
              </a>
              . {locale === "en" ? "All rights reserved." : locale === "es" ? "Todos los derechos reservados." : "Todos os direitos reservados."}
            </p>
            <p className="text-xs text-gray-600">Transformando negocios atraves da tecnologia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
