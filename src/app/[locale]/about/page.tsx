import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("mission.text").slice(0, 160), alternates: { languages: { en: "/en/about", pt: "/pt/about", es: "/es/about" } } };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <JsonLd data={[organizationSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "About", url: "https://beeprohub.com/pt/about" }])]} />

      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container-main">
          <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-left">
              <span className="section-tag">{t("title")}</span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.12, marginTop: 12, marginBottom: 16 }}>{t("subtitle")}</h1>
              <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7 }}>{t("mission.text")}</p>
            </div>
            <HeroForm />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container-main" style={{ maxWidth: 800 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>{t("story.title")}</h2>
          <p style={{ color: "#4B5563", lineHeight: 1.8, fontSize: 17 }}>{t("story.text")}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div className="container-main">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 40 }}>{t("whyUs.title")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="md:!grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card" style={{ padding: 28 }}>
                <div className="icon-circle" style={{ marginBottom: 16 }}>
                  <svg style={{ width: 24, height: 24, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t(`whyUs.items.${i}.title`)}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
