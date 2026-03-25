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

  const homeFaqs = [
    { question: t("services.faq.items.1.q"), answer: t("services.faq.items.1.a") },
    { question: t("services.faq.items.2.q"), answer: t("services.faq.items.2.a") },
    { question: t("services.faq.items.3.q"), answer: t("services.faq.items.3.a") },
    { question: t("services.faq.items.4.q"), answer: t("services.faq.items.4.a") },
    { question: t("services.faq.items.5.q"), answer: t("services.faq.items.5.a") },
  ];

  const checkIcon = (
    <svg style={{ width: 20, height: 20, color: "#F5B800", flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* ===== HERO ===== */}
      <section className="hero-gradient" style={{ overflow: "hidden", paddingTop: 32, paddingBottom: 48 }}>
        <div className="container-main">
          <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-left">
              <span className="section-tag" style={{ marginBottom: 20, display: "inline-block" }}>{t("hero.badge")}</span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.12, marginBottom: 20 }}>
                {t("hero.title").split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-gradient">{t("hero.title").split(" ").slice(3).join(" ")}</span>
              </h1>
              <p style={{ fontSize: 17, color: "#4B5563", marginBottom: 28, lineHeight: 1.7, maxWidth: 520 }}>
                {t("hero.subtitle")}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#374151", fontSize: 15 }}>
                    {checkIcon}
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14, color: "#6B7280" }}>
                <span>{t("hero.trust")}</span>
                <span style={{ color: "#F5B800", fontWeight: 700 }}>&#9733; {t("hero.rating")}</span>
              </div>
            </div>

            {/* Hero Form */}
            <div>
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ background: "#fff", padding: "2.5rem 0", borderBottom: "1px solid #F3F4F6" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="md:!grid-cols-3 lg:!grid-cols-6">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key, i) => (
              <div key={key} className={`stat-card animate-fade-in-up delay-${(i + 1) * 100}`}>
                <div style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#F5B800" }}>{t(`stats.${key}.value`)}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{t(`stats.${key}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section-padding" style={{ background: "#fff" }} id="features">
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">{t("features.sectionTag")}</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>{t("features.title")}</h2>
            <p style={{ color: "#6B7280", marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>{t("features.subtitle")}</p>
          </div>

          {/* CRM */}
          <div className="animate-fade-in-up" style={{ marginBottom: 72, background: "#F9FAFB", borderRadius: 24, padding: "clamp(24px, 4vw, 48px)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 56, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>01</span>
                  <span className="section-tag">{t("features.crm.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>{t("features.crm.title")}</h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.crm.description")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 20 }} className="sm:!grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A", marginBottom: 4 }}>{t(`features.crm.features.${i}.title`)}</h4>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.crm.features.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
                <blockquote style={{ borderLeft: "4px solid #F5B800", paddingLeft: 16, fontStyle: "italic", color: "#4B5563", fontSize: 14, marginBottom: 20, background: "#fff", borderRadius: "0 12px 12px 0", padding: "16px 16px 16px 20px" }}>
                  &ldquo;{t("features.crm.testimonial.quote")}&rdquo;
                  <footer style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8, fontStyle: "normal" }}>&mdash; {t("features.crm.testimonial.author")}</footer>
                </blockquote>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/mobile-crm.webp" alt="CRM mobile app" width={280} height={560} className="animate-float" style={{ borderRadius: 20, maxWidth: "100%", height: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.12)" }} />
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="animate-fade-in-up" style={{ marginBottom: 72, background: "#FFFBEB", borderRadius: 24, padding: "clamp(24px, 4vw, 48px)", border: "1px solid rgba(245,184,0,0.15)" }}>
            <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
              <div style={{ display: "flex", justifyContent: "center", order: 2 }} className="lg:!order-1">
                <Image src="/images/hand-phone-calendar.webp" alt="Smart calendar" width={260} height={460} className="animate-float" style={{ borderRadius: 20, maxWidth: "100%", height: "auto" }} />
              </div>
              <div style={{ order: 1 }} className="lg:!order-2">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 56, fontWeight: 800, color: "rgba(245,184,0,0.15)", lineHeight: 1 }}>02</span>
                  <span className="section-tag">{t("features.calendar.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>{t("features.calendar.title")}</h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.calendar.description")}</p>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <div className="icon-circle">{checkIcon}</div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A" }}>{t(`features.calendar.features.${i}.title`)}</h4>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.calendar.features.${i}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automation */}
          <div className="animate-fade-in-up" style={{ marginBottom: 72, background: "#F9FAFB", borderRadius: 24, padding: "clamp(24px, 4vw, 48px)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 56, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>04</span>
                  <span className="section-tag">{t("features.automation.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>{t("features.automation.title")}</h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.automation.description")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="sm:!grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A", marginBottom: 4 }}>{t(`features.automation.types.${i}.title`)}</h4>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.automation.types.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/dashboard-multidevice.webp" alt="Automation dashboard" width={500} height={400} className="animate-float" style={{ borderRadius: 16, maxWidth: "100%", height: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">{t("benefits.sectionTag")}</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>{t("benefits.title")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="md:!grid-cols-2 lg:!grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card" style={{ padding: 28 }}>
                <div className="icon-circle" style={{ marginBottom: 16 }}>
                  <svg style={{ width: 24, height: 24, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t(`benefits.items.${i}.title`)}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: "linear-gradient(135deg, #F5B800 0%, #E0A800 100%)", padding: "4rem 0" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#1A1A1A", marginBottom: 12 }}>{t("cta.ready")}</h2>
          <p style={{ color: "rgba(26,26,26,0.7)", marginBottom: 28 }}>{t("cta.subtitle")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", alignItems: "center" }} className="sm:!flex-row">
            <a href={PHONE_LINK} style={{ background: "#1A1A1A", color: "#F5B800", fontWeight: 700, padding: "16px 32px", borderRadius: 12, fontSize: 17, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>{PHONE}</a>
            <Link href="/pt/contact" style={{ background: "#fff", color: "#1A1A1A", fontWeight: 700, padding: "16px 32px", borderRadius: 12, fontSize: 17 }}>{t("cta.button")}</Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-tag">{t("services.faq.title")}</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>{t("services.faq.title")}</h2>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
