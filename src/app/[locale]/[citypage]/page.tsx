import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  massachusettsCities,
  findCityBySlug,
  nearbyCities,
  cityPagePath,
  getCityRegion,
  CITY_PAGE_SLUG,
  type City,
} from "@/data/massachusetts-cities";
import { industryBlocks, profileWhy } from "@/data/city-copy";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import HeroForm from "@/components/ui/HeroForm";
import { localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";
import { PHONE, PHONE_LINK, SITE_URL } from "@/lib/utils";

// ---------------------------------------------------------------------------
// UMA página por cidade, montada a partir dos dados próprios de cada uma.
//
// Antes: 5 slugs de serviço × 100 cidades × 3 idiomas = 1.500 URLs, com 100%
// de sobreposição de texto entre elas (medido em produção). Agora: 100 cidades
// × 3 idiomas = 300 URLs, e cada página fala de rodovias, bairros, setores,
// instituição-âncora e realidade comercial que só existem naquela cidade.
// Os 4 slugs de serviço antigos redirecionam 301 — ver next.config.ts.
// ---------------------------------------------------------------------------

function parseCityPage(slug: string): City | null {
  if (!slug.startsWith(`${CITY_PAGE_SLUG}-`) || !slug.endsWith("-ma")) return null;
  const citySlug = slug.slice(CITY_PAGE_SLUG.length + 1, -3);
  return findCityBySlug(citySlug) || null;
}

export function generateStaticParams() {
  return massachusettsCities.map((city) => ({ citypage: cityPagePath(city.slug) }));
}

/** "a, b e c" / "a, b y c" / "a, b and c" */
function list(items: string[], locale: string, max = 4): string {
  const take = items.slice(0, max);
  if (take.length <= 1) return take[0] || "";
  const conj = locale === "pt" ? "e" : locale === "es" ? "y" : "and";
  return `${take.slice(0, -1).join(", ")} ${conj} ${take[take.length - 1]}`;
}

const num = (n: number, locale: string) =>
  n.toLocaleString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US");

// --- Metadata ---------------------------------------------------------------

const metaCopy: Record<string, (c: City) => { title: string; description: string }> = {
  // Cada idioma fala com a SUA comunidade, em vez de os três serem a mesma
  // frase traduzida. É a vantagem competitiva real: as agências americanas de
  // MA não disputam a busca em português, e as brasileiras não disputam a
  // busca em espanhol.
  //
  // Descriptions cabem no orçamento da SERP (~158 chars) mesmo para cidades de
  // nome longo: dois bairros, não três, e sem repetir o condado.
  pt: (c) => ({
    title: `Marketing e CRM para Brasileiros em ${c.name}, MA`,
    description: `Agência brasileira de CRM, automação e geração de leads para negócios em ${c.name}, MA. Atendimento em português. Teste grátis de 14 dias.`,
  }),
  es: (c) => ({
    title: `Marketing para Negocios Latinos en ${c.name}, MA`,
    description: `CRM, automatizacion y generacion de leads para negocios latinos en ${c.name}, MA. Atencion en espanol. Prueba gratis de 14 dias.`,
  }),
  en: (c) => ({
    title: `Marketing & CRM Agency in ${c.name}, MA`,
    description: `CRM, automation and lead generation for ${c.name}, MA businesses. Serving ${list(c.districts, "en", 2)} from Marlborough. 14-day free trial, no credit card.`,
  }),
};

export async function generateMetadata({ params }: { params: Promise<{ citypage: string; locale: string }> }): Promise<Metadata> {
  const { citypage, locale } = await params;
  const city = parseCityPage(citypage);
  if (!city) return {};

  // Metadata no idioma da página, com canonical e hreflang próprios. Antes o
  // generateMetadata nem recebia o locale: /pt/... servia título em inglês, e
  // nenhuma das 1.500 páginas declarava canonical.
  const m = (metaCopy[locale] || metaCopy.en)(city);
  const kw =
    locale === "pt"
      ? [`agência de marketing ${city.name} MA`, `CRM ${city.name} Massachusetts`, `geração de leads ${city.name}`, `automação de marketing ${city.name}`]
      : locale === "es"
      ? [`agencia de marketing ${city.name} MA`, `CRM ${city.name} Massachusetts`, `generacion de leads ${city.name}`, `automatizacion de marketing ${city.name}`]
      : [`marketing agency ${city.name} MA`, `CRM ${city.name} Massachusetts`, `lead generation ${city.name}`, `marketing automation ${city.name}`];

  return pageSeo({
    title: m.title,
    description: m.description,
    keywords: kw.join(", "),
    path: `/${citypage}`,
    locale,
  });
}

// --- Copy por idioma --------------------------------------------------------

interface Copy {
  badge: string;
  h1: string;
  intro: string;
  landscapeTitle: string;
  landscapeBody: string;
  accessTitle: string;
  accessBody: string;
  servicesTitle: string;
  services: { title: string; desc: string }[];
  whyTitle: string;
  whyBody: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  mapTitle: string;
  nearbyTitle: string;
  nearbyLink: (name: string) => string;
  ctaTitle: string;
  ctaBtn: string;
  stats: { sales: string; hours: string; cost: string; support: string };
}

const PROFILE_ANGLE: Record<string, Record<City["profile"], string>> = {
  pt: {
    capital: "um mercado corporativo denso, onde o comprador compara três fornecedores antes de responder",
    regional: "o papel de cidade-polo, atendendo um raio muito maior que o próprio município",
    mill: "uma economia de antiga cidade fabril, hoje sustentada por pequenos negócios de dono presente",
    port: "um calendário ditado pelo mar, com meses de pico e meses de silêncio",
    college: "um ciclo acadêmico que enche e esvazia a cidade duas vezes por ano",
    suburb: "um mercado residencial em que a indicação entre vizinhos vale mais que qualquer anúncio",
    retail: "um corredor comercial de alto tráfego, onde a disputa é por conversão, não por visibilidade",
    resort: "uma temporada curta que precisa financiar o ano inteiro",
    tech: "um público acostumado a software que funciona, que julga o atendimento pelo mesmo padrão",
    industrial: "um mercado B2B de ciclo longo, em que o negócio fica com quem ainda faz follow-up no quarto mês",
  },
  es: {
    capital: "un mercado corporativo denso, donde el comprador compara tres proveedores antes de responder",
    regional: "el papel de ciudad-polo, atendiendo un radio mucho mayor que el propio municipio",
    mill: "una economia de antigua ciudad fabril, hoy sostenida por pequenos negocios de dueno presente",
    port: "un calendario dictado por el mar, con meses de pico y meses de silencio",
    college: "un ciclo academico que llena y vacia la ciudad dos veces al ano",
    suburb: "un mercado residencial donde la recomendacion entre vecinos vale mas que cualquier anuncio",
    retail: "un corredor comercial de alto trafico, donde la disputa es por conversion, no por visibilidad",
    resort: "una temporada corta que tiene que financiar el ano entero",
    tech: "un publico acostumbrado a software que funciona, que juzga la atencion con el mismo estandar",
    industrial: "un mercado B2B de ciclo largo, donde el negocio queda con quien sigue haciendo seguimiento en el cuarto mes",
  },
  en: {
    capital: "a dense corporate market, where the buyer compares three vendors before replying",
    regional: "the role of a regional hub, serving a radius far larger than the city itself",
    mill: "a former mill-town economy now carried by owner-operated small business",
    port: "a calendar set by the water, with peak months and silent ones",
    college: "an academic cycle that fills and empties the town twice a year",
    suburb: "a residential market where a neighbor's referral outweighs any ad budget",
    retail: "a high-traffic commercial corridor, where the fight is over conversion, not visibility",
    resort: "a short season that has to fund the entire year",
    tech: "an audience used to software that works, judging service by the same standard",
    industrial: "a long-cycle B2B market, where the deal goes to whoever still follows up in month four",
  },
};

const COMMUNITY_LINE: Record<string, Record<string, string>> = {
  pt: {
    br: "Atendemos em português — boa parte do comércio local aqui é de donos brasileiros.",
    hisp: "Atendemos em espanhol — a comunidade hispânica é parte central do comércio local.",
    pt: "Atendemos em português — a herança lusófona é forte no comércio desta cidade.",
    other: "Atendemos em inglês, português e espanhol, o que cobre a maior parte do comércio local.",
  },
  es: {
    br: "Atendemos en portugues — buena parte del comercio local aqui es de duenos brasilenos.",
    hisp: "Atendemos en espanol — la comunidad hispana es parte central del comercio local.",
    pt: "Atendemos en portugues — la herencia lusofona es fuerte en el comercio de esta ciudad.",
    other: "Atendemos en ingles, portugues y espanol, lo que cubre la mayor parte del comercio local.",
  },
  en: {
    br: "We work in Portuguese — much of the local business community here is Brazilian-owned.",
    hisp: "We work in Spanish — the Hispanic community is central to local business here.",
    pt: "We work in Portuguese — Lusophone heritage runs deep in this city's business community.",
    other: "We work in English, Portuguese, and Spanish, which covers most of the local business community.",
  },
};

function buildCopy(city: City, locale: string): Copy {
  const { region, hubs } = getCityRegion(city.county);
  const otherHubs = hubs.filter((h) => h !== city.name).slice(0, 3);
  const angle = (PROFILE_ANGLE[locale] || PROFILE_ANGLE.en)[city.profile];
  const community = city.communities?.length
    ? (COMMUNITY_LINE[locale] || COMMUNITY_LINE.en)[city.communities[0]]
    : (COMMUNITY_LINE[locale] || COMMUNITY_LINE.en).other;
  const note = locale === "pt" ? city.note.pt : locale === "es" ? city.note.es : city.note.en;
  const pop = num(city.population, locale);
  const districts = list(city.districts, locale);
  const industries = list(city.industries, locale);
  const access = list(city.access, locale);
  const d = (i: number) => city.districts[i % city.districts.length];
  const ind = (i: number) => city.industries[i % city.industries.length];
  const acc = (i: number) => city.access[i % city.access.length];
  const nb = nearbyCities(city, 3).map((n) => n.name);


  // Cidades com comunidade brasileira documentada em massachusetts-cities.ts
  // recebem o gancho local explícito; as demais recebem o enquadramento geral
  // de atendimento em português, sem inventar comunidade onde não há.
  const hasBr = city.communities?.includes("br") ?? false;
  const hasHisp = city.communities?.includes("hisp") ?? false;

  if (locale === "pt") {
    return {
      badge: `${city.name}, ${city.county} County`,
      h1: `Marketing e CRM para Brasileiros em ${city.name}, MA`,
      intro: hasBr
        ? `${city.name} tem ${pop} habitantes, é servida por ${access} e concentra uma comunidade brasileira relevante no comércio de ${districts}. Somos uma agência brasileira com escritório em Marlborough, MA: CRM, automação de follow-up e geração de leads em uma plataforma só, com tudo em português — do treinamento ao suporte.`
        : `${city.name} tem ${pop} habitantes e é servida por ${access}. O comércio local se concentra em ${districts} e a economia gira em torno de ${industries}. Somos uma agência brasileira com escritório em Marlborough, MA, e atendemos negócios daqui em português: CRM, automação de follow-up e geração de leads em uma plataforma só.`,
      landscapeTitle: `Como é vender em ${city.name}`,
      landscapeBody: `${note} A âncora econômica da cidade é ${city.anchor}, e quem vende aqui enfrenta ${angle}. ${community}`,
      accessTitle: `Alcance e logística em ${city.name}`,
      accessBody: `Com acesso por ${access}, uma equipe baseada em ${city.name} cobre boa parte do ${region} sem perder o dia no trânsito — desde que a agenda esteja organizada. É aí que a maioria dos negócios locais perde dinheiro: não por falta de demanda, mas por orçamento esquecido, retorno que não saiu e visita marcada duas vezes no mesmo horário.${otherHubs.length ? ` Também atendemos os polos vizinhos de ${list(otherHubs, locale, 3)}.` : ""}`,
      servicesTitle: `O que implantamos para negócios em ${city.name}`,
      services: [
        { title: "CRM com pipeline visual", desc: `Cada contato de ${d(0)} e ${d(1)} em um só lugar, com histórico de ligação, orçamento e etapa da negociação.` },
        { title: "Follow-up automático", desc: `E-mail, SMS e WhatsApp disparados sozinhos. Quem procura você perto de ${city.anchor} recebe resposta em segundos, inclusive de madrugada.` },
        { title: "Geração de leads", desc: `Páginas feitas para quem busca ${ind(0)} ou ${ind(1)} em ${city.name} — não para tráfego genérico de Massachusetts.` },
        { title: "Sistema telefônico", desc: `Número local, gravação e transcrição. A ligação de quem viu seu anúncio na ${acc(0)} não some no correio de voz.` },
        { title: "Agendamento online", desc: `Cliente de ${d(2)} marca sozinho, recebe lembrete automático e a taxa de não comparecimento cai.` },
        { title: "Orçamentos e faturas", desc: `Proposta profissional enviada do celular no meio de uma visita em ${city.county} County, com assinatura digital e cobrança integrada.` },
      ],
      whyTitle: `Por que empresários brasileiros em ${city.name} escolhem o Bee Pro Hub`,
      whyBody: `${profileWhy(city, locale)} Somos brasileiros, com escritório em Marlborough, no ${region}, e trabalhamos com quem abriu negócio aqui — contractor, empresa de limpeza, restaurante, salão, prestadora de serviço. Isso muda o produto: a plataforma foi montada para quem responde lead no telhado, entre uma visita e outra, do celular, e não tem tempo de traduzir manual de software. Substituímos CRM, e-mail marketing, SMS, telefonia, agenda e faturamento por uma assinatura só, com implantação em 48 horas úteis e treinamento ao vivo em português. As agências americanas de ${city.name} não atendem no seu idioma; nós começamos por aí.`,
      faqTitle: `Perguntas frequentes sobre nossos serviços em ${city.name}`,
      faqs: [
        {
          question: `Vocês atendem negócios em ${city.name}, MA?`,
          answer: `Sim. Atendemos ${city.name} e todo o ${city.county} County a partir do escritório em Marlborough, com implantação remota e treinamento ao vivo. Já trabalhamos com negócios de ${industries} na região.`,
        },
        {
          question: `Qual serviço faz mais diferença para um negócio em ${city.name}?`,
          answer: `Depende do perfil, mas em ${city.name} o ganho mais rápido costuma ser o follow-up automático: ${note.charAt(0).toLowerCase() + note.slice(1)}`,
        },
        {
          question: `Quanto custa e existe teste grátis?`,
          answer: `São três planos, de $97 a $397 por mês, com setup e treinamento inclusos e sem contrato de fidelidade. O teste grátis dura 14 dias e não pede cartão de crédito.`,
        },
        {
          question: `Vocês atendem em português e espanhol em ${city.name}?`,
          answer: `Sim. Suporte, treinamento e as automações de mensagem funcionam em inglês, português e espanhol. ${community}`,
        },
        {
          question: `Vocês atendem só ${city.name} ou também as cidades vizinhas?`,
          answer: `Atendemos ${city.name} e o entorno em ${city.county} County${nb.length ? `, incluindo ${list(nb, locale, 3)}` : ""}. Como o acesso é por ${acc(0)}, uma equipe baseada aqui cobre a região sem perder o dia no trânsito.`,
        },
        {
          question: `Por que negócios em ${city.name} perdem lead?`,
          answer: `Quase nunca é preço. Em ${city.name} o padrão é ${angle} — e nesse cenário o lead vai para quem responde primeiro. ${note}`,
        },
        {
          question: `Quanto tempo leva para colocar no ar?`,
          answer: `Em média 48 horas úteis após a contratação, incluindo configuração de pipeline, automações, formulários, agenda e telefonia. O treinamento ao vivo de 2 horas com a equipe está incluso em todos os planos.`,
        },
      ],
      mapTitle: `Atendendo ${city.name}, MA e região`,
      nearbyTitle: `Também atendemos em ${city.county} County`,
      nearbyLink: (name) => `Marketing e CRM em ${name}`,
      ctaTitle: `Pronto para crescer seu negócio em ${city.name}?`,
      ctaBtn: "COMEÇAR TESTE GRÁTIS",
      stats: { sales: "Aumento médio em vendas", hours: "Horas economizadas/semana", cost: "Redução de custo com ferramentas", support: "Suporte" },
    };
  }

  if (locale === "es") {
    return {
      badge: `${city.name}, condado de ${city.county}`,
      h1: `Marketing y CRM para Negocios Latinos en ${city.name}, MA`,
      intro: hasHisp
        ? `${city.name} tiene ${pop} habitantes, esta servida por ${access} y la comunidad latina es parte central del comercio en ${districts}. Tenemos oficina en Marlborough, MA y atendemos en espanol: CRM, automatizacion de seguimiento y generacion de leads en una sola plataforma.`
        : `${city.name} tiene ${pop} habitantes y esta servida por ${access}. El comercio local se concentra en ${districts} y la economia gira en torno a ${industries}. Tenemos oficina en Marlborough, MA y atendemos negocios de aqui en espanol: CRM, automatizacion de seguimiento y generacion de leads en una sola plataforma.`,
      landscapeTitle: `Como es vender en ${city.name}`,
      landscapeBody: `${note} El ancla economica de la ciudad es ${city.anchor}, y quien vende aqui enfrenta ${angle}. ${community}`,
      accessTitle: `Alcance y logistica en ${city.name}`,
      accessBody: `Con acceso por ${access}, una cuadrilla con base en ${city.name} cubre buena parte del ${region} sin perder el dia en el trafico — siempre que la agenda este organizada. Ahi es donde la mayoria de los negocios locales pierde dinero: no por falta de demanda, sino por presupuestos olvidados, llamadas sin devolver y visitas agendadas dos veces a la misma hora.${otherHubs.length ? ` Tambien atendemos los polos vecinos de ${list(otherHubs, locale, 3)}.` : ""}`,
      servicesTitle: `Lo que implementamos para negocios en ${city.name}`,
      services: [
        { title: "CRM con pipeline visual", desc: `Cada contacto de ${d(0)} y ${d(1)} en un solo lugar, con historial de llamada, presupuesto y etapa de la negociacion.` },
        { title: "Seguimiento automatico", desc: `Email, SMS y WhatsApp que salen solos. Quien te busca cerca de ${city.anchor} recibe respuesta en segundos, incluso de madrugada.` },
        { title: "Generacion de leads", desc: `Paginas hechas para quien busca ${ind(0)} o ${ind(1)} en ${city.name} — no para trafico generico de Massachusetts.` },
        { title: "Sistema telefonico", desc: `Numero local, grabacion y transcripcion. La llamada de quien vio tu anuncio en ${acc(0)} no se pierde en el buzon.` },
        { title: "Agenda online", desc: `El cliente de ${d(2)} reserva solo, recibe recordatorio automatico y la tasa de ausencias cae.` },
        { title: "Presupuestos y facturas", desc: `Propuesta profesional enviada desde el celular en medio de una visita en el condado de ${city.county}, con firma digital y cobro integrado.` },
      ],
      whyTitle: `Por que los negocios latinos de ${city.name} eligen Bee Pro Hub`,
      whyBody: `${profileWhy(city, locale)} Tenemos oficina en Marlborough, en el ${region}, y trabajamos con quien abrio su negocio aqui — contratistas, empresas de limpieza, restaurantes, salones, prestadores de servicios. Eso cambia el producto: la plataforma se armo para quien responde un lead desde el techo, entre una visita y otra, con el celular, y no tiene tiempo de traducir un manual de software. Reemplazamos CRM, email marketing, SMS, telefonia, agenda y facturacion por una sola suscripcion, con implementacion en 48 horas habiles y entrenamiento en vivo en espanol. Las agencias americanas de ${city.name} no atienden en tu idioma; nosotros empezamos por ahi.`,
      faqTitle: `Preguntas frecuentes sobre nuestros servicios en ${city.name}`,
      faqs: [
        {
          question: `Atienden negocios en ${city.name}, MA?`,
          answer: `Si. Atendemos ${city.name} y todo el condado de ${city.county} desde la oficina en Marlborough, con implementacion remota y entrenamiento en vivo. Ya trabajamos con negocios de ${industries} en la region.`,
        },
        {
          question: `Que servicio marca mas diferencia para un negocio en ${city.name}?`,
          answer: `Depende del perfil, pero en ${city.name} la ganancia mas rapida suele ser el seguimiento automatico: ${note.charAt(0).toLowerCase() + note.slice(1)}`,
        },
        {
          question: `Cuanto cuesta y hay prueba gratis?`,
          answer: `Son tres planes, de $97 a $397 al mes, con setup y entrenamiento incluidos y sin contrato de permanencia. La prueba gratis dura 14 dias y no pide tarjeta de credito.`,
        },
        {
          question: `Atienden en espanol y portugues en ${city.name}?`,
          answer: `Si. Soporte, entrenamiento y las automatizaciones de mensajes funcionan en ingles, portugues y espanol. ${community}`,
        },
        {
          question: `Atienden solo ${city.name} o tambien las ciudades vecinas?`,
          answer: `Atendemos ${city.name} y su entorno en el condado de ${city.county}${nb.length ? `, incluyendo ${list(nb, locale, 3)}` : ""}. Como el acceso es por ${acc(0)}, una cuadrilla con base aqui cubre la region sin perder el dia en el trafico.`,
        },
        {
          question: `Por que los negocios de ${city.name} pierden leads?`,
          answer: `Casi nunca es el precio. En ${city.name} el patron es ${angle} — y en ese escenario el lead se va con quien responde primero. ${note}`,
        },
        {
          question: `Cuanto tarda la puesta en marcha?`,
          answer: `En promedio 48 horas habiles tras la contratacion, incluyendo configuracion de pipeline, automatizaciones, formularios, agenda y telefonia. El entrenamiento en vivo de 2 horas con el equipo esta incluido en todos los planes.`,
        },
      ],
      mapTitle: `Atendiendo ${city.name}, MA y region`,
      nearbyTitle: `Tambien atendemos en el condado de ${city.county}`,
      nearbyLink: (name) => `Marketing y CRM en ${name}`,
      ctaTitle: `Listo para crecer tu negocio en ${city.name}?`,
      ctaBtn: "COMENZAR PRUEBA GRATIS",
      stats: { sales: "Aumento promedio en ventas", hours: "Horas ahorradas/semana", cost: "Reduccion de costo en herramientas", support: "Soporte" },
    };
  }

  return {
    badge: `${city.name}, ${city.county} County`,
    h1: `Marketing & CRM Agency in ${city.name}, MA`,
    intro: `${city.name} has ${pop} residents and is served by ${access}. Local commerce concentrates in ${districts}, and the economy runs on ${industries}. Bee Pro Hub works with businesses here from our Marlborough office, combining CRM, automated follow-up, and lead generation in one platform.`,
    landscapeTitle: `What selling in ${city.name} actually looks like`,
    landscapeBody: `${note} The city's economic anchor is ${city.anchor}, and anyone selling here is working against ${angle}. ${community}`,
    accessTitle: `Reach and logistics in ${city.name}`,
    accessBody: `With access via ${access}, a crew based in ${city.name} can cover much of the ${region} without losing the day to traffic — provided the schedule holds. That is where most local businesses actually lose money: not from lack of demand, but from a forgotten estimate, a callback that never went out, and two appointments booked at the same hour.${otherHubs.length ? ` We also serve the nearby hubs of ${list(otherHubs, locale, 3)}.` : ""}`,
    servicesTitle: `What we set up for ${city.name} businesses`,
    services: [
      { title: "CRM with a visual pipeline", desc: `Every contact from ${d(0)} and ${d(1)} in one place, with call history, estimate, and deal stage.` },
      { title: "Automated follow-up", desc: `Email, SMS, and WhatsApp that send themselves. Someone searching near ${city.anchor} gets an answer in seconds, including at 2am.` },
      { title: "Lead generation", desc: `Pages built for someone searching ${ind(0)} or ${ind(1)} in ${city.name} — not for generic Massachusetts traffic.` },
      { title: "Phone system", desc: `Local number, recording, and transcription. The call from someone who saw your sign on ${acc(0)} never lands in voicemail.` },
      { title: "Online scheduling", desc: `A customer in ${d(2)} books themselves, gets an automatic reminder, and the no-show rate drops.` },
      { title: "Quotes and invoicing", desc: `Professional proposals sent from your phone mid-visit anywhere in ${city.county} County, with digital signature and integrated payment.` },
    ],
    whyTitle: `Why ${city.name} businesses choose Bee Pro Hub`,
    whyBody: `${profileWhy(city, locale)} We are based in Marlborough, in the ${region}, and we work with Massachusetts service businesses — not with enterprise clients in another state. That changes the product: the platform was built for someone answering a lead from a rooftop, between two site visits, on a phone. We replace CRM, email marketing, SMS, telephony, scheduling, and invoicing with one subscription, set up in 48 business hours with live training included. And we work in English, Portuguese, and Spanish, because in ${city.name} that is not a differentiator — it is a requirement.`,
    faqTitle: `Frequently asked questions about our services in ${city.name}`,
    faqs: [
      {
        question: `Do you serve businesses in ${city.name}, MA?`,
        answer: `Yes. We serve ${city.name} and all of ${city.county} County from our Marlborough office, with remote setup and live training. We already work with businesses in ${industries} across the region.`,
      },
      {
        question: `Which service makes the biggest difference for a ${city.name} business?`,
        answer: `It depends on the business, but in ${city.name} the fastest gain is usually automated follow-up: ${note.charAt(0).toLowerCase() + note.slice(1)}`,
      },
      {
        question: `How much does it cost, and is there a free trial?`,
        answer: `There are three plans, from $97 to $397 per month, with setup and training included and no long-term contract. The free trial runs 14 days and does not require a credit card.`,
      },
      {
        question: `Do you offer support in Portuguese and Spanish in ${city.name}?`,
        answer: `Yes. Support, training, and the messaging automations all work in English, Portuguese, and Spanish. ${community}`,
      },
      {
        question: `Do you serve only ${city.name} or the surrounding towns too?`,
        answer: `We serve ${city.name} and the surrounding area in ${city.county} County${nb.length ? `, including ${list(nb, locale, 3)}` : ""}. Because access runs through ${acc(0)}, a crew based here covers the region without losing the day to traffic.`,
      },
      {
        question: `Why do ${city.name} businesses lose leads?`,
        answer: `It is almost never price. In ${city.name} the pattern is ${angle} — and in that situation the lead goes to whoever replies first. ${note}`,
      },
      {
        question: `How long does setup take?`,
        answer: `An average of 48 business hours after signup, including pipeline configuration, automations, forms, scheduling, and telephony. A live 2-hour training session with your team is included in every plan.`,
      },
    ],
    mapTitle: `Serving ${city.name}, MA and the surrounding area`,
    nearbyTitle: `We also serve ${city.county} County`,
    nearbyLink: (name) => `Marketing & CRM in ${name}`,
    ctaTitle: `Ready to grow your ${city.name} business?`,
    ctaBtn: "START FREE TRIAL",
    stats: { sales: "Average sales increase", hours: "Hours saved per week", cost: "Tool cost reduction", support: "Support" },
  };
}

// --- Page -------------------------------------------------------------------

export default async function CityPage({ params }: { params: Promise<{ citypage: string; locale: string }> }) {
  const { citypage, locale } = await params;
  const city = parseCityPage(citypage);
  if (!city) notFound();

  const l = buildCopy(city, locale);
  // Blocos escolhidos pelos setores REAIS da cidade. Duas cidades só recebem
  // os mesmos blocos se tiverem a mesma economia.
  const sectors = industryBlocks(city, locale);
  const nearby = nearbyCities(city);
  const url = `${SITE_URL}/${locale}/${citypage}`;
  const mapQuery = encodeURIComponent(`${city.name}, ${city.county} County, MA`);

  return (
    <>
      <JsonLd data={[
        // areaServed com a cidade, endereço sempre o de Marlborough. Antes o
        // schema trocava o addressLocality pelo nome da cidade e mantinha o CEP
        // 01752 — cada página declarava um endereço que não existe.
        localBusinessSchema(city.name),
        serviceSchema({
          name: l.h1,
          description: l.intro,
          url,
          areaServed: city.name,
        }),
        faqSchema(l.faqs),
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: `${city.county} County`, url: `${SITE_URL}/${locale}/services` },
          { name: city.name, url },
        ]),
      ]} />

      {/* Hero — sem foto externa de 1.400px com priority: o LCP passa a ser
          o texto, que é o que importa nesta página. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark to-dark-light py-14 lg:py-20">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-[-160px] right-[-160px] w-[520px] h-[520px] bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <div className="badge-gold mb-5">{l.badge}</div>
              <h1 className="section-heading text-white mb-5">{l.h1}</h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-7">{l.intro}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-primary btn-shine animate-pulse-yellow text-center">
                  {l.ctaBtn} &rarr;
                </Link>
                <a href={PHONE_LINK} className="btn-outline text-center">{PHONE}</a>
              </div>
            </div>
            <div><HeroForm /></div>
          </div>
        </div>
      </section>

      {/* Panorama local — o bloco que torna cada página diferente das outras 99 */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-5 leading-tight">{l.landscapeTitle}</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-8">{l.landscapeBody}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-primary/15 bg-gold-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary mb-2">
                {locale === "pt" ? "Bairros e distritos" : locale === "es" ? "Barrios y distritos" : "Neighborhoods & districts"}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{city.districts.join(" · ")}</p>
            </div>
            <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-wide text-gray-500 mb-2">
                {locale === "pt" ? "Setores que empregam aqui" : locale === "es" ? "Sectores que emplean aqui" : "Industries that employ here"}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{city.industries.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Setores — conteúdo determinado pela economia real da cidade */}
      {sectors.length > 0 && (
        <section className="bg-white pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-8 leading-tight">
              {locale === "pt"
                ? `Com quem trabalhamos em ${city.name}`
                : locale === "es"
                ? `Con quien trabajamos en ${city.name}`
                : `Who we work with in ${city.name}`}
            </h2>
            <div className="flex flex-col gap-6">
              {sectors.map((s, i) => (
                <div key={i} className="border-l-4 border-primary pl-5">
                  <h3 className="font-bold text-dark text-lg mb-1.5">{s.label}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Acesso e logística */}
      <section className="bg-gradient-to-br from-gold-50 to-amber-50 py-14 bg-dots">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4 leading-tight">{l.accessTitle}</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{l.accessBody}</p>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark text-center mb-10 leading-tight">{l.servicesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {l.services.map((item, i) => (
              <div key={i} className="card-gold p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-dark to-dark-light py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-extrabold text-primary">300%</div><div className="text-xs text-gray-400 mt-1">{l.stats.sales}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">15h</div><div className="text-xs text-gray-400 mt-1">{l.stats.hours}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">70%</div><div className="text-xs text-gray-400 mt-1">{l.stats.cost}</div></div>
          <div><div className="text-3xl font-extrabold text-primary">24/7</div><div className="text-xs text-gray-400 mt-1">{l.stats.support}</div></div>
        </div>
      </section>

      {/* Por que nós */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-5 leading-tight">{l.whyTitle}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{l.whyBody}</p>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-dark text-center mb-6">{l.mapTitle}</h2>
          <div className="rounded-2xl overflow-hidden border-2 border-primary/10 shadow-lg">
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="340"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={l.mapTitle}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-dark text-center mb-10 leading-tight">{l.faqTitle}</h2>
          <FAQ items={l.faqs} />
        </div>
      </section>

      {/* Cidades vizinhas */}
      {nearby.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-dark text-center mb-6">{l.nearbyTitle}</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${locale}/${cityPagePath(n.slug)}`}
                  className="bg-white border border-gray-200 hover:border-primary text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm transition-all"
                >
                  {l.nearbyLink(n.name)}
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">{l.ctaTitle}</h2>
          <Link href={`/${locale}/contact`} className="btn-secondary btn-shine">{l.ctaBtn} &rarr;</Link>
        </div>
      </section>
    </>
  );
}
