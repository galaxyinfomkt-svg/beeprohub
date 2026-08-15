import { ADDRESS, EMAIL, PHONE_E164, PHONE_IS_FOREIGN, SITE_URL } from "./utils";

// ---------------------------------------------------------------------------
// NOTA SOBRE AVALIAÇÕES
//
// Removidos daqui: `aggregateRating` e o array `review`. Havia dois problemas.
//
// 1. Os dados eram inventados — `reviewCount: "50"` com 8 depoimentos no site,
//    e os próprios depoimentos estão marcados como fictícios em testimonials.ts.
// 2. Mesmo com dados reais, marcar AggregateRating em LocalBusiness/Product com
//    avaliações hospedadas pelo próprio negócio ("self-serving reviews") é
//    explicitamente desqualificado pelo Google desde 2019 — as estrelas não
//    aparecem e a marcação inválida pode contaminar os outros schemas da página.
//
// O caminho correto para estrelas na SERP é acumular avaliações reais no Google
// Business Profile. Elas aparecem sozinhas, sem markup no site.
// ---------------------------------------------------------------------------

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.city,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: ADDRESS.lat,
  longitude: ADDRESS.lng,
};

/** `telephone` de um LocalBusiness é lido como o telefone daquele endereço.
 *  Enquanto o número não for dos EUA, ele fica fora daqui para não criar
 *  contradição de NAP com o addressCountry "US". */
const telephone = PHONE_IS_FOREIGN ? {} : { telephone: PHONE_E164 };

/** Canal de atendimento da Organization. Ao contrário de `telephone`, um
 *  ContactPoint não afirma presença física no endereço — então o número real
 *  aparece nos dados estruturados mesmo sendo internacional, e o Google e os
 *  modelos de IA conseguem citar um contato válido da empresa. */
const contactPoint = {
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: PHONE_E164,
      email: EMAIL,
      availableLanguage: ["English", "Portuguese", "Spanish"],
      areaServed: "US",
    },
  ],
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Bee Pro Hub",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 600,
      height: 600,
    },
    image: `${SITE_URL}/opengraph-image`,
    description:
      "All-in-one CRM and marketing automation platform for local businesses. Built on GoHighLevel. Serving businesses across Massachusetts and the entire United States.",
    ...telephone,
    ...contactPoint,
    email: EMAIL,
    address: postalAddress,
    geo,
    sameAs: [
      "https://www.facebook.com/galaxymkt.us",
      "https://www.instagram.com/galaxy.mkt",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Galaxy IT & Marketing",
      url: "https://galaxyinfo.us",
      foundingDate: "2004",
    },
    foundingDate: "2024",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 20 },
    knowsLanguage: ["en", "pt", "es"],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "State", name: "Massachusetts" },
    ],
  };
}

export function websiteSchema(locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Bee Pro Hub",
    url: SITE_URL,
    description: "All-in-one CRM and marketing automation platform for local businesses",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["pt-BR", "en-US", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * LocalBusiness da SEDE. O endereço é sempre o de Marlborough.
 *
 * Antes, `localBusinessSchema(city)` trocava o `addressLocality` pelo nome da
 * cidade mas mantinha o CEP e as coordenadas de Marlborough — cada uma das
 * páginas de cidade declarava um endereço que não existe (Boston com CEP 01752).
 * Agora a cidade entra em `areaServed`, que é o campo correto para "atendemos
 * essa região sem ter endereço lá".
 */
export function localBusinessSchema(servedCity?: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Bee Pro Hub",
    description: servedCity
      ? `Bee Pro Hub provides CRM, marketing automation, and lead generation services for businesses in ${servedCity}, Massachusetts, from its office in Marlborough, MA.`
      : "All-in-one CRM and marketing automation platform for local businesses in Massachusetts and across the United States. Built on GoHighLevel.",
    url: SITE_URL,
    ...telephone,
    email: EMAIL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Bank Transfer",
    address: postalAddress,
    geo,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: servedCity
      ? [
          { "@type": "City", name: `${servedCity}, MA`, containedInPlace: { "@type": "State", name: "Massachusetts" } },
          { "@type": "State", name: "Massachusetts" },
        ]
      : [{ "@type": "State", name: "Massachusetts" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bee Pro Hub Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM & Lead Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Phone System" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Appointment Scheduling" } },
      ],
    },
  };
}

export function serviceSchema({
  name,
  description,
  url,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  /** Cidade específica quando a página for local; padrão é o estado. */
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: areaServed
      ? { "@type": "City", name: `${areaServed}, MA`, containedInPlace: { "@type": "State", name: "Massachusetts" } }
      : { "@type": "State", name: "Massachusetts" },
    serviceType: "Marketing and CRM Services",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      ...(PHONE_IS_FOREIGN ? {} : { servicePhone: PHONE_E164 }),
      availableLanguage: ["English", "Portuguese", "Spanish"],
    },
  };
}

/**
 * SoftwareApplication com ofertas reais. Sem `aggregateRating` — ver nota no
 * topo do arquivo. As ofertas precisam bater com o preço exibido na página.
 */
export function softwareSchema({
  name,
  description,
  url,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  offers: { name: string; price: number; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web-based (any modern browser), iOS, Android",
    provider: { "@id": `${SITE_URL}/#organization` },
    brand: { "@type": "Brand", name: "Bee Pro Hub" },
    featureList: [
      "CRM and pipeline management",
      "Email, SMS and WhatsApp automation",
      "Business phone system with call recording",
      "Online appointment scheduling with reminders",
      "Quotes, invoices and payments",
      "Landing pages and funnels",
    ],
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      ...(o.description ? { description: o.description } : {}),
      price: o.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: o.price.toFixed(2),
        priceCurrency: "USD",
        unitCode: "MON",
        billingIncrement: 1,
      },
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

const SCHEMA_LOCALE: Record<string, string> = { pt: "pt-BR", en: "en-US", es: "es" };

/**
 * Article no idioma da página. Antes o `headline` usava sempre o título em
 * inglês e o `inLanguage` era fixo em "en-US" nas três versões, contradizendo
 * o conteúdo renderizado.
 */
export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  image,
  url,
  locale,
  author,
  keywords,
  wordCount,
  section,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  locale: string;
  author: string;
  keywords?: string[];
  wordCount?: number;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title.slice(0, 110),
    description,
    image: [image],
    datePublished,
    dateModified,
    author: { "@type": "Person", name: author, worksFor: { "@id": `${SITE_URL}/#organization` } },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: SCHEMA_LOCALE[locale] || "en-US",
    isAccessibleForFree: true,
    ...(section ? { articleSection: section } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
  };
}

export function siteNavigationSchema(locale: string) {
  const pages = [
    ["Home", ""],
    ["About", "/about"],
    ["Services", "/services"],
    ["Pricing", "/pricing"],
    ["Blog", "/blog"],
    ["BeeProCard", "/beeprocard"],
    ["Contact", "/contact"],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: pages.map(([label]) => label),
    url: pages.map(([, path]) => `${SITE_URL}/${locale}${path}`),
  };
}
