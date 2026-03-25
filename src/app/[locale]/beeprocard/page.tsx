import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "beeprocard" });
  return { title: "BeeProCard - Cartao Digital", description: t("subtitle"), alternates: { languages: { en: "/en/beeprocard", pt: "/pt/beeprocard", es: "/es/beeprocard" } } };
}

export default function BeeProCardPage() {
  const t = useTranslations("beeprocard");

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "BeeProCard", url: "https://beeprohub.com/pt/beeprocard" }])]} />

      <section className="hero-gradient" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div className="container-main">
          <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:!grid-cols-2">
            <div className="animate-fade-in-left">
              <span className="section-tag">{t("sectionTag")}</span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.12, marginTop: 12, marginBottom: 16 }}>{t("title")}</h1>
              <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7 }}>{t("subtitle")}</p>
            </div>
            <HeroForm />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">{t("tagline")}</h2>
            <p style={{ color: "#6B7280", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>{t("description")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, marginBottom: 48 }} className="md:!grid-cols-2 lg:!grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card" style={{ padding: 28, textAlign: "center" }}>
                <div className="icon-circle" style={{ margin: "0 auto 16px" }}>
                  <svg style={{ width: 24, height: 24, color: "#F5B800" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{t(`features.${i}.title`)}</h3>
                <p style={{ fontSize: 14, color: "#6B7280" }}>{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background: "#F9FAFB", borderRadius: 24, padding: "clamp(24px, 4vw, 48px)", border: "1px solid #F3F4F6", marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A", textAlign: "center", marginBottom: 32 }}>Como Funciona</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="md:!grid-cols-3">
              {[
                { step: "1", title: "Crie Seu Card", desc: "Cadastre-se e personalize seu cartao digital com suas cores, logo, foto e links." },
                { step: "2", title: "Compartilhe", desc: "Compartilhe via QR Code, link direto, WhatsApp, email ou redes sociais." },
                { step: "3", title: "Acompanhe", desc: "Veja quem acessou, quais botoes clicaram e colete avaliacoes automaticamente." },
              ].map((item) => (
                <div key={item.step} style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #F5B800, #E0A800)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#1A1A1A", fontWeight: 800, fontSize: 22 }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#6B7280" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/pt/contact" className="btn-primary animate-pulse-glow" style={{ fontSize: 17, padding: "16px 40px" }}>{t("cta")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
