import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { productSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title"), description: t("subtitle"), alternates: { languages: { en: "/en/pricing", pt: "/pt/pricing", es: "/es/pricing" } } };
}

const plans = ["starter", "professional", "enterprise"] as const;

export default function PricingPage() {
  const t = useTranslations("pricing");

  const pricingFaqs = [
    { question: "Posso trocar de plano depois?", answer: "Sim, voce pode fazer upgrade ou downgrade a qualquer momento. As mudancas entram em vigor no proximo ciclo de faturamento." },
    { question: "Tem taxa de setup?", answer: "Nao! Todos os planos incluem setup gratuito e treinamento de onboarding." },
    { question: "Preciso de contrato longo?", answer: "Nao. Todos os planos sao mensais. Cancele quando quiser sem multa." },
    { question: "Quais formas de pagamento?", answer: "Aceitamos todos os cartoes de credito (Visa, MasterCard, American Express) e transferencia bancaria." },
  ];

  return (
    <>
      <JsonLd data={[
        productSchema("Bee Pro Hub Starter", "Plano starter de CRM e automacao", "97"),
        productSchema("Bee Pro Hub Professional", "CRM completo, automacao e telefonia", "197"),
        productSchema("Bee Pro Hub Enterprise", "Plano enterprise com white-label e API", "397"),
        faqSchema(pricingFaqs),
        breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }]),
      ]} />

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

      {/* Plans */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container-main">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="md:!grid-cols-3">
            {plans.map((plan) => {
              const isPopular = plan === "professional";
              return (
                <div key={plan} className={isPopular ? "" : "glass-card"} style={{
                  position: "relative", borderRadius: 24, padding: 32,
                  background: isPopular ? "linear-gradient(135deg, #1A1A1A, #2D2D2D)" : "#fff",
                  color: isPopular ? "#fff" : "#1A1A1A",
                  border: isPopular ? "2px solid #F5B800" : "1px solid #E5E7EB",
                  boxShadow: isPopular ? "0 20px 60px rgba(245,184,0,0.15)" : undefined,
                  transform: isPopular ? "scale(1.03)" : undefined,
                  transition: "all 0.3s",
                }}>
                  {isPopular && (
                    <span style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #F5B800, #E0A800)", color: "#1A1A1A", fontWeight: 700, fontSize: 12, padding: "6px 20px", borderRadius: 50 }}>
                      {t(`${plan}.popular`)}
                    </span>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t(`${plan}.name`)}</h3>
                  <p style={{ fontSize: 14, color: isPopular ? "#9CA3AF" : "#6B7280", marginBottom: 16 }}>{t(`${plan}.description`)}</p>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 40, fontWeight: 800, color: isPopular ? "#F5B800" : "#1A1A1A" }}>{t(`${plan}.price`)}</span>
                    <span style={{ fontSize: 14, color: isPopular ? "#6B7280" : "#9CA3AF" }}>{t(`${plan}.period`)}</span>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {(t.raw(`${plan}.features`) as string[]).map((feat: string, i: number) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: isPopular ? "#D1D5DB" : "#4B5563" }}>
                        <svg style={{ width: 16, height: 16, color: "#F5B800", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pt/contact" style={{
                    display: "block", textAlign: "center", fontWeight: 700, padding: "14px 0", borderRadius: 12,
                    background: isPopular ? "linear-gradient(135deg, #F5B800, #E0A800)" : "#1A1A1A",
                    color: isPopular ? "#1A1A1A" : "#fff",
                    transition: "all 0.3s",
                  }}>
                    {t("cta")}
                  </Link>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 24 }}>{t("guarantee")}</p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 40 }}>FAQ</h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
