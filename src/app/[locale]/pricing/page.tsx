import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { faqSchema, breadcrumbSchema, productSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return pageSeo({ title: t("title"), description: t("subtitle"), path: "/pricing", locale, keywords: "precos CRM, planos marketing automation, GoHighLevel pricing, CRM affordable" });
}

const plans = ["starter", "professional", "enterprise"] as const;

export default function PricingPage() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const pricingFaqs = locale === "pt" ? [
    { question: "Posso trocar de plano a qualquer momento?", answer: "Sim. Você pode fazer upgrade ou downgrade do seu plano a qualquer momento direto do dashboard. Mudanças entram em vigor no próximo ciclo de faturamento, sem multa, sem taxa, sem tempo mínimo. Mais de 80% dos clientes começam no Starter ($97/mês) e migram para Professional ($197/mês) em 60-90 dias conforme escalam." },
    { question: "Quanto custa o setup e o treinamento?", answer: "Zero. Setup completo da plataforma (configuração de pipelines, automações, formulários, calendário, telefonia) é incluído em todos os 3 planos. Treinamento ao vivo de 2 horas com sua equipe também está incluso. Setup leva em média 48 horas úteis após o pagamento. Valor de mercado: $497-$1.500." },
    { question: "Preciso assinar contrato anual?", answer: "Não. Todos os planos são mensais sem fidelidade. Cancele quando quiser direto do dashboard, sem ligações, sem perguntas. Se cancelar nos primeiros 14 dias, devolvemos 100% do valor. Após o teste grátis, mais de 92% dos clientes permanecem por 12+ meses." },
    { question: "Quais formas de pagamento vocês aceitam?", answer: "Aceitamos cartão de crédito (Visa, Mastercard, Amex, Discover) e transferência bancária ACH para planos Enterprise. Faturamento é mensal automático no dia que você ativou. Para empresas com 10+ usuários, oferecemos faturamento trimestral com 5% de desconto." },
    { question: "Quanto tempo dura o teste grátis e preciso de cartão?", answer: "O teste grátis dura 14 dias completos com acesso a 100% das funcionalidades do plano Professional ($197/mês). Não pedimos cartão de crédito para começar. Você só fornece o cartão se decidir continuar após os 14 dias." },
  ] : locale === "es" ? [
    { question: "Puedo cambiar de plan en cualquier momento?", answer: "Si. Puedes hacer upgrade o downgrade de tu plan cuando quieras desde el dashboard. Los cambios entran en vigor en el siguiente ciclo de facturacion, sin multa, sin tarifa, sin tiempo minimo. Mas del 80% de los clientes empiezan en Starter ($97/mes) y migran a Professional ($197/mes) en 60-90 dias." },
    { question: "Cuanto cuesta el setup y el entrenamiento?", answer: "Cero. Setup completo de la plataforma (configuracion de pipelines, automatizaciones, formularios, calendario, telefonia) esta incluido en los 3 planes. Entrenamiento en vivo de 2 horas con tu equipo tambien esta incluido. El setup tarda 48 horas habiles tras el pago. Valor de mercado: $497-$1.500." },
    { question: "Necesito firmar contrato anual?", answer: "No. Todos los planes son mensuales sin permanencia. Cancela cuando quieras desde el dashboard, sin llamadas, sin preguntas. Si cancelas en los primeros 14 dias, devolvemos el 100%. Despues de la prueba, mas del 92% de los clientes permanecen 12+ meses." },
    { question: "Que formas de pago aceptan?", answer: "Aceptamos tarjeta de credito (Visa, Mastercard, Amex, Discover) y transferencia ACH para planes Enterprise. La facturacion es mensual automatica el dia que activaste. Para empresas con 10+ usuarios, ofrecemos facturacion trimestral con 5% de descuento." },
    { question: "Cuanto dura la prueba gratis y necesito tarjeta?", answer: "La prueba gratis dura 14 dias completos con acceso al 100% de las funcionalidades del plan Professional ($197/mes). No pedimos tarjeta de credito para empezar. Solo das la tarjeta si decides continuar despues de los 14 dias." },
  ] : [
    { question: "Can I switch plans anytime?", answer: "Yes. You can upgrade or downgrade your plan anytime directly from the dashboard. Changes take effect on the next billing cycle, with no penalty, no fee, and no minimum commitment. Over 80% of customers start on the Starter plan ($97/month) and move up to Professional ($197/month) within 60-90 days as they scale." },
    { question: "How much does setup and training cost?", answer: "Zero. Complete platform setup (pipeline configuration, automations, forms, calendar, telephony) is included in all 3 plans. A live 2-hour training session with your team is also included. Setup takes an average of 48 business hours after payment. Market value: $497-$1,500." },
    { question: "Do I need to sign an annual contract?", answer: "No. All plans are monthly with no commitment. Cancel anytime directly from your dashboard — no calls, no questions. If you cancel within the first 14 days, we refund 100% of your payment. After the free trial, over 92% of customers stay for 12+ months." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards (Visa, Mastercard, Amex, Discover) and ACH bank transfer for Enterprise plans. Billing is automatic monthly on the day you activated. For companies with 10+ users, we offer quarterly billing with a 5% discount." },
    { question: "How long is the free trial and do I need a credit card?", answer: "The free trial lasts a full 14 days with access to 100% of Professional plan features ($197/month value). We don't ask for a credit card to start. You only provide the card if you decide to continue after the 14 days." },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(pricingFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Pricing", url: "https://beeprohub.com/pt/pricing" }])]} />

      {/* Hero - imagem de fundo de negocios */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80" alt="Bee Pro Hub pricing plans for small businesses in Massachusetts" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{t("title")}</div>
              <h1 className="section-heading text-white mb-5">{t("title")}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">{t("subtitle")}</p>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const pop = plan === "professional";
              return (
                <div key={plan} className={`relative rounded-3xl p-8 transition-all duration-500 ${pop ? "bg-gradient-to-br from-primary via-primary-hover to-amber-500 text-dark border-2 border-primary shadow-glow-lg md:scale-105" : "bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-card-hover card-gold"}`}>
                  {pop && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-dark text-primary font-extrabold text-xs px-5 py-1.5 rounded-full shadow-lg">{t(`${plan}.popular`)}</span>}
                  <h3 className={`text-xl font-bold mb-2 ${pop ? "text-dark" : "text-dark"}`}>{t(`${plan}.name`)}</h3>
                  <p className={`text-sm mb-6 ${pop ? "text-dark/70" : "text-gray-500"}`}>{t(`${plan}.description`)}</p>
                  <div className="mb-6">
                    <span className={`text-2xl font-extrabold ${pop ? "text-dark" : "text-dark"}`}>
                      {locale === "pt" ? "Fale Conosco" : locale === "es" ? "Contactenos" : "Contact Us"}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {(t.raw(`${plan}.features`) as string[]).map((f: string, i: number) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${pop ? "text-dark/80" : "text-gray-600"}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${pop ? "bg-dark/10" : "bg-primary/10"}`}>
                          <svg className={`w-3 h-3 ${pop ? "text-dark" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`} className={`block text-center font-bold py-3.5 rounded-xl transition-all btn-shine ${pop ? "bg-dark text-primary shadow-lg hover:-translate-y-1" : "bg-gradient-to-r from-primary to-primary-hover text-dark shadow-glow hover:-translate-y-1"}`}>
                    {t("cta")} &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">{t("guarantee")}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">FAQ</h2>
          <FAQ items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}
