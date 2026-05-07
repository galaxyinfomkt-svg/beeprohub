import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import HeroForm from "@/components/ui/HeroForm";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageSeo({ title: t("title"), description: t("mission.text").slice(0, 160), path: "/about", locale, keywords: "sobre bee pro hub, agencia marketing Massachusetts, Galaxy IT Marketing, quem somos" });
}

export default function AboutPage() {
  const t = useTranslations("about");
  const tExtras = useTranslations("extras");
  const locale = useLocale();

  return (
    <>
      <JsonLd data={[organizationSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "About", url: "https://beeprohub.com/pt/about" }])]} />

      {/* Hero - imagem de fundo de escritorio/equipe */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80" alt="Bee Pro Hub team in Marlborough Massachusetts collaborating on CRM solutions" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{t("title")}</div>
              <h1 className="section-heading text-white mb-5">{t("subtitle")}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-8">{t("mission.text")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-center">{tExtras("aboutContactCta")} &rarr;</Link>
              </div>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">{t("story.title")}</h2>
          <p className="text-gray-500 leading-loose text-base lg:text-lg">{t("story.text")}</p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gold-50 to-amber-50 py-16 lg:py-20 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-12">{t("whyUs.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-gold p-7">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold-200/30 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{t(`whyUs.items.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`whyUs.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Founder section (E01) — replace placeholders with real photo + bio */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-3">
            {locale === "pt" ? "Conheca Quem Esta por Tras do Bee Pro Hub" : locale === "es" ? "Conoce a Quien Esta Detras de Bee Pro Hub" : "Meet the Team Behind Bee Pro Hub"}
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10">
            {locale === "pt"
              ? "Construido em Marlborough, MA por uma equipe que conhece de perto os desafios dos pequenos negocios em Massachusetts."
              : locale === "es"
              ? "Construido en Marlborough, MA por un equipo que conoce de cerca los retos de las pequenas empresas en Massachusetts."
              : "Built in Marlborough, MA by a team that knows firsthand the challenges of small businesses in Massachusetts."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-gold p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-dark font-extrabold text-3xl">
                L
              </div>
              <h3 className="font-bold text-dark text-lg">Luiz</h3>
              <p className="text-sm text-primary font-semibold mb-2">{locale === "pt" ? "Founder & CEO" : locale === "es" ? "Founder & CEO" : "Founder & CEO"}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {locale === "pt"
                  ? "Empreendedor com mais de 20 anos de experiencia em tecnologia e marketing. Fundou a Galaxy IT em 2004."
                  : locale === "es"
                  ? "Emprendedor con mas de 20 anos de experiencia en tecnologia y marketing. Fundo Galaxy IT en 2004."
                  : "Entrepreneur with 20+ years of experience in tech and marketing. Founded Galaxy IT in 2004."}
              </p>
            </div>
            <div className="card-gold p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-300 to-amber-400 flex items-center justify-center text-dark font-extrabold text-3xl">
                A
              </div>
              <h3 className="font-bold text-dark text-lg">Ana</h3>
              <p className="text-sm text-primary font-semibold mb-2">{locale === "pt" ? "Conteudo & GBP" : locale === "es" ? "Contenido & GBP" : "Content & GBP"}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {locale === "pt"
                  ? "Lidera a estrategia de conteudo bilingue e otimizacao do Google Business Profile dos clientes."
                  : locale === "es"
                  ? "Lidera la estrategia de contenido bilingue y la optimizacion del Google Business Profile de los clientes."
                  : "Leads bilingual content strategy and client Google Business Profile optimization."}
              </p>
            </div>
            <div className="card-gold p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center text-white font-extrabold text-3xl">
                R
              </div>
              <h3 className="font-bold text-dark text-lg">Rhaideline</h3>
              <p className="text-sm text-primary font-semibold mb-2">{locale === "pt" ? "Dev & Tracking" : locale === "es" ? "Dev & Tracking" : "Dev & Tracking"}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {locale === "pt"
                  ? "Engenheira responsavel pela plataforma, integracoes, automacoes e analytics de conversao."
                  : locale === "es"
                  ? "Ingeniera responsable de la plataforma, integraciones, automatizaciones y analytics de conversion."
                  : "Engineer behind the platform, integrations, automations, and conversion analytics."}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-6 italic">
            {locale === "pt"
              ? "TODO: substituir iniciais por fotos reais da equipe."
              : locale === "es"
              ? "TODO: reemplazar iniciales por fotos reales del equipo."
              : "TODO: replace initials with real team photos."}
          </p>
        </div>
      </section>
    </>
  );
}
