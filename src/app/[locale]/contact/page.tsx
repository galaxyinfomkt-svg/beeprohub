import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK, WHATSAPP_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle"), alternates: { languages: { en: "/en/contact", pt: "/pt/contact", es: "/es/contact" } } };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Contact", url: "https://beeprohub.com/pt/contact" }])]} />

      <section className="hero-gradient" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container-main" style={{ textAlign: "center", maxWidth: 600 }}>
          <span className="section-tag">{t("title")}</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.12, marginTop: 12, marginBottom: 16 }}>{t("title")}</h1>
          <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7 }}>{t("subtitle")}</p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container-main">
          <div style={{ display: "grid", gap: 40 }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-left">
              <ContactForm />
            </div>

            <div className="animate-fade-in-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Phone */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t("info.phoneLabel")}</h3>
                <a href={PHONE_LINK} style={{ fontSize: 24, fontWeight: 800, color: "#F5B800" }}>{t("info.phone")}</a>
                <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>{t("info.hours")}</p>
              </div>

              {/* WhatsApp */}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                <div style={{ width: 48, height: 48, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={24} height={24} fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1A1A1A" }}>WhatsApp</p>
                  <p style={{ fontSize: 14, color: "#6B7280" }}>Fale conosco agora</p>
                </div>
              </a>

              {/* Location */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>Localizacao</h3>
                <p style={{ color: "#4B5563" }}>{t("info.location")}</p>
                <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Atendemos todo Massachusetts e EUA</p>
              </div>

              {/* Bonuses */}
              <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2D2D2D)", padding: 28, borderRadius: 20, color: "#fff" }}>
                <h3 style={{ color: "#F5B800", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{t("cta.title")}</h3>
                <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 16 }}>{t("cta.subtitle")}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#D1D5DB" }}>
                      <svg style={{ width: 16, height: 16, color: "#F5B800", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`cta.bonuses.${i}`)}
                    </li>
                  ))}
                </ul>
                <p style={{ color: "#F5B800", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{t("cta.total")}</p>
                <a href={PHONE_LINK} style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg, #F5B800, #E0A800)", color: "#1A1A1A", fontWeight: 700, padding: "14px 0", borderRadius: 12 }}>
                  {t("cta.callCta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
