import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { PHONE, PHONE_LINK, LOGIN_URL } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer>
      {/* CTA Banner */}
      <div style={{ background: "linear-gradient(135deg, #F5B800 0%, #E0A800 100%)", padding: "3.5rem 1rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: "#1A1A1A", marginBottom: 12 }}>
            {locale === "en" ? "Start Your Free Trial Now!" : locale === "es" ? "Comienza Tu Prueba Gratis!" : "Comece Seu Teste Gratis Agora!"}
          </h2>
          <p style={{ color: "rgba(26,26,26,0.7)", marginBottom: 24, fontSize: 16 }}>
            {locale === "en" ? "14 days of full access. Cancel anytime." : locale === "es" ? "14 dias de acceso total. Cancela cuando quieras." : "14 dias de acesso total. Cancele quando quiser."}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", alignItems: "center" }} className="sm:!flex-row">
            <a href={PHONE_LINK} style={{ background: "#1A1A1A", color: "#F5B800", fontWeight: 700, padding: "14px 32px", borderRadius: 12, fontSize: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              {locale === "en" ? "Call & Activate" : locale === "es" ? "Llamar y Activar" : "Ligar e Ativar"}
            </a>
            <Link href={`/${locale}/contact`} style={{ background: "#fff", color: "#1A1A1A", fontWeight: 700, padding: "14px 32px", borderRadius: 12, fontSize: 16 }}>
              {locale === "en" ? "Start Online Trial" : locale === "es" ? "Prueba Online" : "Teste Online"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: "#F9FAFB", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="md:!grid-cols-2 lg:!grid-cols-4">
            <div>
              <Image src="/images/logo.png" alt="Bee Pro Hub" width={140} height={48} style={{ height: 40, width: "auto", marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginBottom: 8 }}>{t("description")}</p>
              <p style={{ fontSize: 12, color: "#9CA3AF" }}>{t("byLine")}</p>
            </div>

            <div>
              <h3 style={{ color: "#1A1A1A", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>{t("navigation")}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: `/${locale}`, label: nav("home") },
                  { href: `/${locale}/about`, label: nav("about") },
                  { href: `/${locale}/services`, label: nav("services") },
                  { href: `/${locale}/pricing`, label: nav("pricing") },
                  { href: `/${locale}/blog`, label: nav("blog") },
                  { href: `/${locale}/beeprocard`, label: nav("beeprocard") },
                  { href: `/${locale}/contact`, label: nav("contact") },
                ].map((l) => (
                  <li key={l.href}><Link href={l.href} style={{ fontSize: 14, color: "#6B7280", transition: "color 0.2s" }}>{l.label}</Link></li>
                ))}
                <li><a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "#E0A800", fontWeight: 600 }}>{nav("login")}</a></li>
              </ul>
            </div>

            <div>
              <h3 style={{ color: "#1A1A1A", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>{t("resources")}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[t("crmComplete"), t("integratedCalendar"), t("quotesInvoices"), t("totalAutomation"), t("phoneSystem"), "BeeProCard"].map((item) => (
                  <li key={item}><Link href={`/${locale}/services`} style={{ fontSize: 14, color: "#6B7280" }}>{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ color: "#1A1A1A", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>{t("contactTitle")}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={PHONE_LINK} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#1A1A1A", fontWeight: 700 }}>
                  <svg width={18} height={18} fill="none" stroke="#F5B800" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {t("phone")}
                </a>
                <p style={{ fontSize: 13, color: "#6B7280" }}>{t("hours")}</p>
                <p style={{ fontSize: 13, color: "#6B7280" }}>{t("company")}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>{t("since")}</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB", marginTop: 32, paddingTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>&copy; {new Date().getFullYear()} {t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
