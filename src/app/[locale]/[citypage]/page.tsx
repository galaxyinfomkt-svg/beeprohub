import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { massachusettsCities, cityServices } from "@/data/massachusetts-cities";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK } from "@/lib/utils";

function parseCityPage(slug: string) {
  for (const svc of cityServices) {
    if (slug.startsWith(svc.slug + "-") && slug.endsWith("-ma")) {
      const citySlug = slug.slice(svc.slug.length + 1, -3);
      const city = massachusettsCities.find((c) => c.slug === citySlug);
      if (city) return { service: svc, city };
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { citypage: string }[] = [];
  for (const city of massachusettsCities) {
    for (const svc of cityServices) {
      params.push({ citypage: `${svc.slug}-${city.slug}-ma` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ citypage: string }> }): Promise<Metadata> {
  const { citypage } = await params;
  const result = parseCityPage(citypage);
  if (!result) return {};
  const { service, city } = result;
  return {
    title: `${service.title} in ${city.name}, MA | Bee Pro Hub`,
    description: `${service.description} in ${city.name}, Massachusetts. CRM, marketing automation, and lead generation. Start free trial.`,
    keywords: `${service.title} ${city.name}, CRM ${city.name} MA, marketing automation ${city.name}`,
  };
}

const labels = {
  pt: {
    badge: (city: string) => `${city}, Massachusetts`,
    title: (svc: string, city: string) => `${svc} em ${city}, MA`,
    desc: (svc: string, city: string, county: string) => `Procurando ${svc.toLowerCase()} em ${city}? O Bee Pro Hub ajuda negocios locais em ${city}, ${county} County a automatizar marketing, gerenciar leads e crescer receita com nossa plataforma CRM all-in-one.`,
    whatWeOffer: (city: string) => `O Que Oferecemos para Negocios em ${city}`,
    whyChoose: (city: string) => `Por Que Negocios em ${city} Escolhem Bee Pro Hub`,
    whyText: (city: string, county: string) => `Baseados em Marlborough, Massachusetts, entendemos o mercado local em ${county} County. Seja voce um contractor, empresa de limpeza, restaurante ou qualquer negocio de servicos em ${city}, nossa plataforma e feita para ajudar voce a competir e vencer. Com suporte em Portugues, Ingles e Espanhol.`,
    faqTitle: (city: string) => `FAQ Sobre Nossos Servicos em ${city}`,
    ctaTitle: (city: string) => `Pronto para Crescer Seu Negocio em ${city}?`,
    ctaBtn: "COMECAR TESTE GRATIS",
    services: (city: string) => [
      { title: "CRM Inteligente", desc: `Gerencie todos os relacionamentos com clientes de ${city} em uma plataforma centralizada.` },
      { title: "Automacao de Marketing", desc: `Automatize email, SMS e WhatsApp para alcançar clientes de ${city} no momento perfeito.` },
      { title: "Geracao de Leads", desc: `Atraia mais leads qualificados de ${city} e ${city} com funis otimizados.` },
      { title: "Sistema Telefonico", desc: `Sistema telefonico profissional com presença local em ${city}. Gravacao e SMS integrados.` },
      { title: "Agendamento", desc: `Clientes de ${city} agendam online. Lembretes automaticos reduzem faltas em 80%.` },
      { title: "Orcamentos e Faturas", desc: `Crie propostas profissionais para clientes de ${city} em minutos.` },
    ],
    faq: (city: string, svc: string, county: string) => [
      { question: `Quais servicos de CRM o Bee Pro Hub oferece em ${city}?`, answer: `CRM completo, automacao de marketing, geracao de leads, sistema telefonico, agendamento e faturamento para negocios em ${city}, MA.` },
      { question: `O Bee Pro Hub esta disponivel para pequenas empresas em ${city}?`, answer: `Sim! Projetado para pequenas e medias empresas em ${city} e todo Massachusetts.` },
      { question: `Voces oferecem suporte presencial em ${city}?`, answer: `Somos de Marlborough, MA e atendemos todo ${county} County incluindo ${city}. Suporte remoto 24/7 em PT, EN e ES.` },
      { question: `Quanto custa o ${svc.toLowerCase()} em ${city}?`, answer: `Temos varios planos com 14 dias de teste gratis. Sem cartao de credito.` },
    ],
    alsoServe: (county: string) => `Tambem Atendemos Cidades Proximas em ${county} County`,
    stats: { sales: "Aumento Medio", hours: "Economizado/Semana", cost: "Reducao de Custos", support: "Suporte" },
  },
  es: {
    badge: (city: string) => `${city}, Massachusetts`,
    title: (svc: string, city: string) => `${svc} en ${city}, MA`,
    desc: (svc: string, city: string, county: string) => `Buscando ${svc.toLowerCase()} en ${city}? Bee Pro Hub ayuda negocios locales en ${city}, ${county} County a automatizar marketing, gestionar leads y crecer ingresos.`,
    whatWeOffer: (city: string) => `Lo Que Ofrecemos para Negocios en ${city}`,
    whyChoose: (city: string) => `Por Que Negocios en ${city} Eligen Bee Pro Hub`,
    whyText: (city: string, county: string) => `Basados en Marlborough, Massachusetts, entendemos el mercado local en ${county} County. Con soporte en Espanol, Ingles y Portugues.`,
    faqTitle: (city: string) => `FAQ Sobre Nuestros Servicios en ${city}`,
    ctaTitle: (city: string) => `Listo para Crecer Tu Negocio en ${city}?`,
    ctaBtn: "COMENZAR PRUEBA GRATIS",
    services: (city: string) => [
      { title: "CRM Inteligente", desc: `Gestiona relaciones con clientes de ${city} en una plataforma.` },
      { title: "Automatizacion de Marketing", desc: `Automatiza email, SMS y WhatsApp para clientes de ${city}.` },
      { title: "Generacion de Leads", desc: `Atrae leads calificados de ${city} con embudos optimizados.` },
      { title: "Sistema Telefonico", desc: `Sistema telefonico profesional con presencia local en ${city}.` },
      { title: "Agendamiento", desc: `Clientes de ${city} agendan online. Recordatorios automaticos.` },
      { title: "Presupuestos y Facturas", desc: `Crea propuestas profesionales para clientes de ${city} en minutos.` },
    ],
    faq: (city: string, svc: string, county: string) => [
      { question: `Que servicios ofrece Bee Pro Hub en ${city}?`, answer: `CRM completo, automatizacion, generacion de leads, telefonia, agendamiento y facturacion para negocios en ${city}, MA.` },
      { question: `Esta disponible para pequenas empresas en ${city}?`, answer: `Si! Disenado para pequenas y medianas empresas en ${city}.` },
      { question: `Ofrecen soporte en ${city}?`, answer: `Somos de Marlborough, MA. Soporte 24/7 en ES, EN y PT.` },
      { question: `Cuanto cuesta en ${city}?`, answer: `Tenemos varios planes con 14 dias gratis. Sin tarjeta.` },
    ],
    alsoServe: (county: string) => `Tambien Servimos Ciudades Cercanas en ${county} County`,
    stats: { sales: "Aumento Promedio", hours: "Ahorrado/Semana", cost: "Reduccion de Costos", support: "Soporte" },
  },
  en: {
    badge: (city: string) => `${city}, Massachusetts`,
    title: (svc: string, city: string) => `${svc} in ${city}, MA`,
    desc: (svc: string, city: string, county: string) => `Looking for professional ${svc.toLowerCase()} in ${city}? Bee Pro Hub helps local businesses in ${city}, ${county} County automate their marketing, manage leads, and grow revenue.`,
    whatWeOffer: (city: string) => `What We Offer Businesses in ${city}`,
    whyChoose: (city: string) => `Why ${city} Businesses Choose Bee Pro Hub`,
    whyText: (city: string, county: string) => `Based in Marlborough, Massachusetts, we understand the local market in ${county} County. With support in English, Portuguese, and Spanish.`,
    faqTitle: (city: string) => `FAQ About Our Services in ${city}`,
    ctaTitle: (city: string) => `Ready to Grow Your ${city} Business?`,
    ctaBtn: "START FREE TRIAL",
    services: (city: string) => [
      { title: "Smart CRM", desc: `Manage all your ${city} customer relationships in one platform.` },
      { title: "Marketing Automation", desc: `Automate email, SMS, and WhatsApp to reach ${city} customers.` },
      { title: "Lead Generation", desc: `Attract qualified leads from ${city} with optimized funnels.` },
      { title: "Phone System", desc: `Professional phone system with local ${city} presence.` },
      { title: "Scheduling", desc: `Let ${city} clients book online. Auto reminders reduce no-shows 80%.` },
      { title: "Quotes & Invoicing", desc: `Create professional proposals for ${city} clients in minutes.` },
    ],
    faq: (city: string, svc: string, county: string) => [
      { question: `What CRM services does Bee Pro Hub offer in ${city}?`, answer: `Complete CRM, marketing automation, lead generation, phone system, scheduling, and invoicing for businesses in ${city}, MA.` },
      { question: `Is Bee Pro Hub available for small businesses in ${city}?`, answer: `Yes! Designed for small and medium businesses in ${city} and throughout Massachusetts.` },
      { question: `Do you offer support in ${city}?`, answer: `Based in Marlborough, MA serving all of ${county} County. 24/7 support in EN, PT, ES.` },
      { question: `How much does ${svc.toLowerCase()} cost in ${city}?`, answer: `We have several plans with a 14-day free trial. No credit card required.` },
    ],
    alsoServe: (county: string) => `We Also Serve Nearby Cities in ${county} County`,
    stats: { sales: "Avg Sales Increase", hours: "Saved Per Week", cost: "Cost Reduction", support: "Support" },
  },
};

export default async function CityPage({ params }: { params: Promise<{ citypage: string; locale: string }> }) {
  const { citypage, locale } = await params;
  const result = parseCityPage(citypage);
  if (!result) notFound();
  const { service, city } = result;
  const l = labels[locale as keyof typeof labels] || labels.en;

  const nearbyCities = massachusettsCities.filter((c) => c.county === city.county && c.slug !== city.slug).slice(0, 6);
  const cityFaqs = l.faq(city.name, service.title, city.county);
  const svcs = l.services(city.name);

  return (
    <>
      <JsonLd data={[localBusinessSchema(city.name), serviceSchema(service.title, service.description, `https://beeprohub.com/${locale}/${citypage}`), faqSchema(cityFaqs), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: service.title, url: `https://beeprohub.com/${locale}/services` }, { name: `${city.name}`, url: `https://beeprohub.com/${locale}/${citypage}` }])]} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80" alt={city.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-primary/20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <div className="badge-gold mb-6">{l.badge(city.name)}</div>
              <h1 className="section-heading text-white mb-5">{l.title(service.title, city.name)}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-6">{l.desc(service.description, city.name, city.county)}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-center">{l.ctaBtn} &rarr;</Link>
                <a href={PHONE_LINK} className="btn-outline text-center">{PHONE}</a>
              </div>
            </div>
            <div className="animate-fade-right"><HeroForm /></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10">{l.whatWeOffer(city.name)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {svcs.map((item, i) => (
              <div key={i} className="card-gold p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-dark to-dark-light py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-extrabold text-primary">300%</div><div className="text-xs text-gray-400">{l.stats.sales}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">15h</div><div className="text-xs text-gray-400">{l.stats.hours}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">70%</div><div className="text-xs text-gray-400">{l.stats.cost}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">24/7</div><div className="text-xs text-gray-400">{l.stats.support}</div></div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-gradient-to-br from-gold-50 to-amber-50 py-16 bg-dots">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-5">{l.whyChoose(city.name)}</h2>
          <p className="text-white/80 leading-relaxed text-lg">{l.whyText(city.name, city.county)}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-dark text-center mb-10">{l.faqTitle(city.name)}</h2>
          <FAQ items={cityFaqs} />
        </div>
      </section>

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-dark text-center mb-6">{l.alsoServe(city.county)}</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyCities.map((c) => (
                <Link key={c.slug} href={`/${locale}/${service.slug}-${c.slug}-ma`} className="bg-white border border-gray-200 hover:border-primary text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm transition-all">
                  {service.title} {locale === "pt" ? "em" : locale === "es" ? "en" : "in"} {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-animated py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">{l.ctaTitle(city.name)}</h2>
          <Link href={`/${locale}/contact`} className="btn-secondary btn-shine">{l.ctaBtn} &rarr;</Link>
        </div>
      </section>
    </>
  );
}
