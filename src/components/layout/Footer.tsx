import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { PHONE, PHONE_LINK, LOGIN_URL } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-dark text-gray-300">
      {/* CTA Banner */}
      <div className="bg-primary py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
            {locale === "pt"
              ? "Comece Seu Teste Gratuito Agora!"
              : locale === "es"
              ? "Comienza Tu Prueba Gratis Ahora!"
              : "Start Your Free Trial Now!"}
          </h2>
          <p className="text-dark/80 mb-6">
            {locale === "pt"
              ? "14 dias de acesso total sem pagar nada. Cancele quando quiser."
              : locale === "es"
              ? "14 dias de acceso total sin pagar nada. Cancela cuando quieras."
              : "14 days of full access without paying anything. Cancel anytime."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_LINK}
              className="bg-dark text-primary font-bold px-8 py-3 rounded-lg hover:bg-dark-light transition-colors"
            >
              {locale === "pt" ? "Ligar e Ativar" : locale === "es" ? "Llamar y Activar" : "Call & Activate"}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-dark font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {locale === "pt" ? "Teste Online" : locale === "es" ? "Prueba Online" : "Start Online Trial"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Bee Pro Hub"
              width={140}
              height={48}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 mb-4">{t("description")}</p>
            <p className="text-xs text-gray-500">{t("byLine")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}`} className="text-sm text-gray-400 hover:text-primary transition-colors">{nav("home")}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-sm text-gray-400 hover:text-primary transition-colors">{nav("about")}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{nav("services")}</Link></li>
              <li><Link href={`/${locale}/pricing`} className="text-sm text-gray-400 hover:text-primary transition-colors">{nav("pricing")}</Link></li>
              <li><Link href={`/${locale}/blog`} className="text-sm text-gray-400 hover:text-primary transition-colors">{nav("blog")}</Link></li>
              <li><a href={LOGIN_URL} className="text-sm text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">{nav("login")}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("resources")}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{t("crmComplete")}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{t("integratedCalendar")}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{t("quotesInvoices")}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{t("totalAutomation")}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-sm text-gray-400 hover:text-primary transition-colors">{t("phoneSystem")}</Link></li>
              <li><Link href={`/${locale}/beeprocard`} className="text-sm text-gray-400 hover:text-primary transition-colors">BeeProCard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <a href={PHONE_LINK} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t("phone")}
                </a>
              </li>
              <li className="text-sm text-gray-500">{t("hours")}</li>
              <li className="text-sm text-gray-500">{t("company")}</li>
              <li className="text-xs text-gray-600">{t("since")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
