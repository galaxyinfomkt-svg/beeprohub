// Títulos curtos para a SERP, separados do H1 do artigo.
//
// O H1 é copy: pode e deve ser longo e persuasivo. A tag <title> é outra coisa
// — o Google corta por volta de 60-65 caracteres, e um título de 82 chega ao
// usuário truncado, perdendo justamente o final. Antes o <title> era o H1
// direto, e 36 das 57 versões de artigo estouravam o limite.
//
// Regra ao adicionar um artigo: até 60 caracteres, com o termo de busca no
// começo. A marca NÃO entra — o template de `pageSeo` já decide isso.

export interface SeoTitleSet {
  en: string;
  pt: string;
  es: string;
}

export const blogSeoTitles: Record<string, SeoTitleSet> = {
  "crm-for-contractors-massachusetts": {
    en: "CRM for Contractors in Massachusetts (2026 Guide)",
    pt: "CRM para Contractors em Massachusetts: Guia 2026",
    es: "CRM para Contractors en Massachusetts: Guia 2026",
  },
  "marketing-automation-small-business": {
    en: "Marketing Automation for Small Business: 2026 Guide",
    pt: "Automação de Marketing para Pequenas Empresas 2026",
    es: "Automatizacion de Marketing para PYMES: Guia 2026",
  },
  "lead-generation-strategies-usa": {
    en: "10 Lead Generation Strategies for Local Business",
    pt: "10 Estratégias de Geração de Leads para Negócios Locais",
    es: "10 Estrategias de Generacion de Leads Locales",
  },
  "best-crm-small-business-2026": {
    en: "Best CRM for Small Business in 2026: Buyer's Guide",
    pt: "Melhor CRM para Pequenas Empresas em 2026",
    es: "Mejor CRM para Pequenas Empresas en 2026",
  },
  "whatsapp-marketing-business-guide": {
    en: "WhatsApp Marketing for Business: 3x More Leads",
    pt: "Marketing por WhatsApp: 3x Mais Leads Convertidos",
    es: "Marketing por WhatsApp: 3x Mas Leads Convertidos",
  },
  "cleaning-company-marketing-strategies": {
    en: "7 Marketing Strategies for Cleaning Companies",
    pt: "7 Estratégias de Marketing para Empresas de Limpeza",
    es: "7 Estrategias de Marketing para Empresas de Limpieza",
  },
  "roofing-lead-generation-guide": {
    en: "Roofing Lead Generation: 50+ Qualified Leads a Month",
    pt: "Geração de Leads para Roofing: 50+ Leads por Mês",
    es: "Generacion de Leads para Roofing: 50+ al Mes",
  },
  "google-reviews-local-business": {
    en: "How to Get 100+ Google Reviews for a Local Business",
    pt: "Como Conseguir 100+ Avaliações no Google",
    es: "Como Conseguir 100+ Resenas en Google",
  },
  "painting-contractor-business-growth": {
    en: "Painting Contractor Marketing: Fill Your Schedule",
    pt: "Marketing para Pintores: Agenda Cheia o Ano Todo",
    es: "Marketing para Pintores: Agenda Llena Todo el Ano",
  },
  "landscaping-business-automation": {
    en: "Landscaping Automation: Save 20 Hours a Week",
    pt: "Automação para Paisagismo: 20 Horas a Menos por Semana",
    es: "Automatizacion para Paisajismo: 20 Horas Menos",
  },
  "sms-marketing-local-business": {
    en: "SMS Marketing for Local Business: 2026 Playbook",
    pt: "SMS Marketing para Negócios Locais em 2026",
    es: "SMS Marketing para Negocios Locales en 2026",
  },
  "hvac-contractor-crm-marketing": {
    en: "HVAC Marketing: How Contractors Get 3x More Calls",
    pt: "Marketing para HVAC: 3x Mais Ligações de Clientes",
    es: "Marketing para HVAC: 3x Mas Llamadas de Clientes",
  },
  "facebook-ads-local-business-guide": {
    en: "Facebook Ads for Local Business: $5 Leads That Convert",
    pt: "Facebook Ads para Negócios Locais: Leads a $5",
    es: "Facebook Ads para Negocios Locales: Leads a $5",
  },
  "email-marketing-automation-beginners": {
    en: "Email Marketing Automation: A Beginner's Guide",
    pt: "Automação de E-mail Marketing para Iniciantes",
    es: "Automatizacion de Email Marketing para Principiantes",
  },
  "business-phone-system-voip": {
    en: "Business Phone Systems: What Small Firms Need in 2026",
    pt: "Sistema Telefônico Empresarial: O Que Ter em 2026",
    es: "Sistema Telefonico Empresarial: Que Tener en 2026",
  },
  "appointment-scheduling-no-shows": {
    en: "Cut No-Shows by 80% with Automated Scheduling",
    pt: "Reduza Faltas em 80% com Agendamento Automático",
    es: "Reduce Ausencias en 80% con Agendamiento Automatico",
  },
  "digital-marketing-portuguese-businesses-usa": {
    en: "Digital Marketing for Brazilian Businesses in the USA",
    pt: "Marketing Digital para Empresas Brasileiras nos EUA",
    es: "Marketing Digital para Empresas Brasilenas en EE.UU.",
  },
  "sales-funnel-local-service-business": {
    en: "How to Build a Sales Funnel for Service Businesses",
    pt: "Como Construir um Funil de Vendas que Converte",
    es: "Como Construir un Embudo de Ventas que Convierte",
  },
  "customer-retention-strategies-service-business": {
    en: "Customer Retention for Service Businesses",
    pt: "Retenção de Clientes em Negócios de Serviço",
    es: "Retencion de Clientes en Negocios de Servicio",
  },
};

/** Título de SERP do artigo; cai para o H1 se não houver versão curta. */
export function seoTitleFor(slug: string, locale: string, fallback: string): string {
  const set = blogSeoTitles[slug];
  if (!set) return fallback;
  if (locale === "pt") return set.pt;
  if (locale === "es") return set.es;
  return set.en;
}
