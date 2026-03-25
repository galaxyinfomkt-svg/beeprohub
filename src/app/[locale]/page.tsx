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
    alternates: { languages: { en: "/en", pt: "/pt", es: "/es" } },
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

      {/* ===== HERO ===== */}
      <section className="bg-hero-gradient" style={{ position: "relative", overflow: "hidden", paddingTop: "6rem", paddingBottom: "4rem" }}>
        {/* Glow effects */}
        <div style={{ position: "absolute", top: 40, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(245,184,0,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -50, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(245,184,0,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="section-tag" style={{ marginBottom: 20 }}>{t("hero.badge")}</span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
                {t("hero.title")}
              </h1>
              <p style={{ fontSize: 18, color: "#9CA3AF", marginBottom: 32, maxWidth: 540, lineHeight: 1.7 }}>
                {t("hero.subtitle")}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "#D1D5DB", fontSize: 15 }}>
                    <svg style={{ width: 20, height: 20, color: "#F5B800", flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t(`hero.features.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="sm:!flex-row">
                <Link href="/en/contact" className="btn-primary animate-pulse-glow" style={{ fontSize: 17, padding: "16px 32px" }}>
                  {t("hero.cta")}
                </Link>
                <a href={PHONE_LINK} className="btn-secondary">
                  {PHONE}
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24, fontSize: 14, color: "#6B7280" }}>
                <span>{t("hero.trust")}</span>
                <span style={{ color: "#F5B800", fontWeight: 700 }}>{t("hero.rating")}</span>
              </div>
            </div>

            <div className="lg:!flex animate-float" style={{ display: "none", justifyContent: "center" }}>
              <Image
                src="/images/dashboard-multidevice.webp"
                alt="Bee Pro Hub CRM Dashboard showing lead management on multiple devices"
                width={580}
                height={480}
                style={{ borderRadius: 16, maxWidth: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ background: "#fff", borderBottom: "1px solid #F3F4F6", padding: "3rem 0" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="md:!grid-cols-3 lg:!grid-cols-6">
            {(["trial", "support", "companies", "sales", "messages", "uptime"] as const).map((key) => (
              <div key={key} style={{ textAlign: "center", padding: 16 }}>
                <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#F5B800", lineHeight: 1.2 }}>
                  {t(`stats.${key}.value`)}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                  {t(`stats.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section-padding" style={{ background: "#F9FAFB" }} id="features">
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-tag">{t("features.sectionTag")}</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>{t("features.title")}</h2>
            <p style={{ color: "#6B7280", marginTop: 16, maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontSize: 16 }}>
              {t("features.subtitle")}
            </p>
          </div>

          {/* Feature 1 - CRM */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="lg:!grid-cols-2">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>{t("features.crm.number")}</span>
                  <span className="section-tag">{t("features.crm.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                  {t("features.crm.title")}
                </h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.crm.description")}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }} className="sm:!grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 14, marginBottom: 4 }}>{t(`features.crm.features.${i}.title`)}</h4>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.crm.features.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>

                <blockquote style={{ borderLeft: "4px solid #F5B800", paddingLeft: 16, fontStyle: "italic", color: "#4B5563", fontSize: 14, marginBottom: 24 }}>
                  &ldquo;{t("features.crm.testimonial.quote")}&rdquo;
                  <footer style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4, fontStyle: "normal" }}>
                    &mdash; {t("features.crm.testimonial.author")}
                  </footer>
                </blockquote>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href="/en/contact" className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>{t("features.crm.cta")}</Link>
                  <Link href="/en/contact" style={{ display: "inline-flex", alignItems: "center", border: "1px solid #D1D5DB", color: "#4B5563", fontWeight: 600, padding: "12px 24px", borderRadius: 12, fontSize: 14, transition: "all 0.3s" }}>
                    {t("features.crm.ctaSecondary")}
                  </Link>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/mobile-crm.webp" alt="Bee Pro Hub CRM mobile app" width={300} height={600} style={{ borderRadius: 20, maxWidth: "100%", height: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          </div>

          {/* Feature 2 - Calendar */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="lg:!grid-cols-2">
              <div style={{ display: "flex", justifyContent: "center", order: 2 }} className="lg:!order-1">
                <Image src="/images/hand-phone-calendar.webp" alt="Smart scheduling calendar" width={280} height={500} style={{ borderRadius: 20, maxWidth: "100%", height: "auto" }} />
              </div>
              <div style={{ order: 1 }} className="lg:!order-2">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>{t("features.calendar.number")}</span>
                  <span className="section-tag">{t("features.calendar.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                  {t("features.calendar.title")}
                </h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.calendar.description")}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 36, height: 36, background: "rgba(245,184,0,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg style={{ width: 18, height: 18, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 14 }}>{t(`features.calendar.features.${i}.title`)}</h4>
                        <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.calendar.features.${i}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(245,184,0,0.05)", border: "1px solid rgba(245,184,0,0.2)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                  <p style={{ fontSize: 14, color: "#4B5563" }}><strong style={{ color: "#F5B800" }}>Bonus:</strong> {t("features.calendar.bonus")}</p>
                </div>
                <Link href="/en/contact" className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>{t("features.calendar.cta")}</Link>
              </div>
            </div>
          </div>

          {/* Feature 3 - Automation */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="lg:!grid-cols-2">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>{t("features.automation.number")}</span>
                  <span className="section-tag">{t("features.automation.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                  {t("features.automation.title")}
                </h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.automation.description")}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }} className="sm:!grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="feature-card">
                      <h4 style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 14, marginBottom: 4 }}>{t(`features.automation.types.${i}.title`)}</h4>
                      <p style={{ fontSize: 13, color: "#6B7280" }}>{t(`features.automation.types.${i}.desc`)}</p>
                    </div>
                  ))}
                </div>

                <blockquote style={{ borderLeft: "4px solid #F5B800", paddingLeft: 16, fontStyle: "italic", color: "#4B5563", fontSize: 14, marginBottom: 24 }}>
                  &ldquo;{t("features.automation.testimonial.quote")}&rdquo;
                  <footer style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4, fontStyle: "normal" }}>
                    &mdash; {t("features.automation.testimonial.author")}
                  </footer>
                </blockquote>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href="/en/contact" className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>{t("features.automation.cta")}</Link>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/mobile-opportunities.webp" alt="Marketing automation dashboard" width={300} height={600} style={{ borderRadius: 20, maxWidth: "100%", height: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          </div>

          {/* Feature 4 - Telephony */}
          <div>
            <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="lg:!grid-cols-2">
              <div style={{ display: "flex", justifyContent: "center", order: 2 }} className="lg:!order-1">
                <Image src="/images/dashboard-multidevice.webp" alt="Integrated phone system" width={500} height={400} style={{ borderRadius: 16, maxWidth: "100%", height: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }} />
              </div>
              <div style={{ order: 1 }} className="lg:!order-2">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: "#F3F4F6", lineHeight: 1 }}>{t("features.telephony.number")}</span>
                  <span className="section-tag">{t("features.telephony.tag")}</span>
                </div>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                  {t("features.telephony.title")}
                </h3>
                <p style={{ color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>{t("features.telephony.description")}</p>

                <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4B5563" }}>
                      <svg style={{ width: 16, height: 16, color: "#F5B800", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`features.telephony.features.${i}`)}
                    </li>
                  ))}
                </ul>

                <div style={{ background: "rgba(245,184,0,0.05)", border: "1px solid rgba(245,184,0,0.2)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                  <p style={{ fontSize: 14, color: "#4B5563" }}><strong style={{ color: "#F5B800" }}>Special Bonus:</strong> {t("features.telephony.bonus")}</p>
                </div>
                <Link href="/en/contact" className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>{t("features.telephony.cta")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{ background: "#1A1A1A", padding: "4rem 0" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>{t("cta.ready")}</h2>
          <p style={{ color: "#6B7280", marginBottom: 32, fontSize: 16 }}>{t("cta.subtitle")}</p>
          <Link href="/en/contact" className="btn-primary animate-pulse-glow" style={{ fontSize: 18, padding: "18px 40px" }}>
            {t("cta.button")}
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 24, fontSize: 14, color: "#6B7280" }}>
            <span>{t("cta.noCard")}</span>
            <span>{t("cta.cancel")}</span>
            <span>{t("cta.support")}</span>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section-padding" style={{ background: "#fff" }} id="benefits">
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">{t("benefits.sectionTag")}</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>{t("benefits.title")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="md:!grid-cols-2 lg:!grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-hover" style={{ background: "#F9FAFB", padding: 24, borderRadius: 16, border: "1px solid #F3F4F6" }}>
                <div style={{ width: 48, height: 48, background: "rgba(245,184,0,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <svg style={{ width: 24, height: 24, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t(`benefits.items.${i}.title`)}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{t(`benefits.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEEPROCARD ===== */}
      <section className="section-padding" style={{ background: "#F9FAFB" }} id="beeprocard">
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">{t("beeprocard.sectionTag")}</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>{t("beeprocard.title")}</h2>
            <p style={{ color: "#6B7280", marginTop: 16, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{t("beeprocard.subtitle")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, marginBottom: 40 }} className="md:!grid-cols-2 lg:!grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-hover" style={{ background: "#fff", padding: 24, borderRadius: 16, border: "1px solid #E5E7EB", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, background: "rgba(245,184,0,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg style={{ width: 24, height: 24, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t(`beeprocard.features.${i}.title`)}</h3>
                <p style={{ fontSize: 14, color: "#6B7280" }}>{t(`beeprocard.features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/en/beeprocard" className="btn-primary" style={{ fontSize: 17, padding: "16px 36px" }}>{t("beeprocard.cta")}</Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ (AEO) ===== */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p style={{ color: "#6B7280", marginTop: 12 }}>Everything you need to know about Bee Pro Hub</p>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ background: "#F5B800", padding: "4rem 0" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#1A1A1A", marginBottom: 12 }}>
            {t("cta.ready")}
          </h2>
          <p style={{ color: "rgba(26,26,26,0.7)", marginBottom: 28, fontSize: 16 }}>{t("cta.subtitle")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", alignItems: "center" }} className="sm:!flex-row">
            <a href={PHONE_LINK} style={{ background: "#1A1A1A", color: "#F5B800", fontWeight: 700, padding: "16px 32px", borderRadius: 12, fontSize: 17, transition: "all 0.3s", textAlign: "center" }}>
              {PHONE}
            </a>
            <Link href="/en/contact" style={{ background: "#fff", color: "#1A1A1A", fontWeight: 700, padding: "16px 32px", borderRadius: 12, fontSize: 17, transition: "all 0.3s", textAlign: "center" }}>
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
