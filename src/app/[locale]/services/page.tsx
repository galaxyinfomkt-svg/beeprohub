import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle"), alternates: { languages: { en: "/en/services", pt: "/pt/services", es: "/es/services" } } };
}

const serviceKeys = ["crm", "automation", "leadgen", "websites", "ads"] as const;
const icons = [
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = "pt";

  const faqs = [1, 2, 3, 4, 5].map((i) => ({ question: t(`faq.items.${i}.q`), answer: t(`faq.items.${i}.a`) }));
  const schemas = [
    ...serviceKeys.map((key) => serviceSchema(t(`items.${key}.title`), t(`items.${key}.description`), `https://beeprohub.com/pt/services`)),
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Services", url: "https://beeprohub.com/pt/services" }]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container-main">
          <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-left">
              <span className="section-tag">{t("title")}</span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.12, marginTop: 12, marginBottom: 16 }}>{t("title")}</h1>
              <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7 }}>{t("subtitle")}</p>
            </div>
            <HeroForm />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container-main" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {serviceKeys.map((key, idx) => (
            <div key={key} className="animate-fade-in-up" style={{ background: idx % 2 === 0 ? "#F9FAFB" : "#FFFBEB", borderRadius: 24, padding: "clamp(24px, 4vw, 40px)", border: "1px solid #F3F4F6" }}>
              <div style={{ display: "grid", gap: 32, alignItems: "center" }} className="lg:!grid-cols-2">
                <div style={{ order: idx % 2 === 1 ? 2 : 1 }} className={idx % 2 === 1 ? "lg:!order-2" : ""}>
                  <div className="icon-circle" style={{ marginBottom: 16, width: 56, height: 56, borderRadius: 16 }}>
                    <svg style={{ width: 28, height: 28, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[idx]} />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.6rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>{t(`items.${key}.title`)}</h2>
                  <p style={{ color: "#6B7280", marginBottom: 20, lineHeight: 1.7 }}>{t(`items.${key}.description`)}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {(t.raw(`items.${key}.features`) as string[]).map((feat: string, i: number) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4B5563" }}>
                        <svg style={{ width: 16, height: 16, color: "#F5B800", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className="btn-primary" style={{ padding: "12px 28px", fontSize: 15 }}>
                    {t(`items.${key}.title`)}
                  </Link>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", order: idx % 2 === 1 ? 1 : 2, minHeight: 200 }} className={idx % 2 === 1 ? "lg:!order-1" : ""}>
                  <svg style={{ width: 120, height: 120, color: "rgba(245,184,0,0.15)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d={icons[idx]} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 40 }}>{t("faq.title")}</h2>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
