export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://beeprohub.com/#organization",
    name: "Bee Pro Hub",
    url: "https://beeprohub.com",
    logo: {
      "@type": "ImageObject",
      url: "https://beeprohub.com/images/logo.png",
      width: 600,
      height: 600,
    },
    description: "All-in-one CRM and marketing automation platform for local businesses. Built on GoHighLevel. Serving businesses across Massachusetts and the entire United States.",
    telephone: "+15084999279",
    email: "contact@beeprohub.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marlborough",
      addressLocality: "Marlborough",
      addressRegion: "MA",
      postalCode: "01752",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "42.3459",
      longitude: "-71.5523",
    },
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

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://beeprohub.com/#website",
    name: "Bee Pro Hub",
    url: "https://beeprohub.com",
    description: "All-in-one CRM and marketing automation platform for local businesses",
    publisher: { "@id": "https://beeprohub.com/#organization" },
    inLanguage: ["pt-BR", "en-US", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://beeprohub.com/pt/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema(city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "MarketingAgency"],
    "@id": "https://beeprohub.com/#localbusiness",
    name: "Bee Pro Hub",
    description: city
      ? `Bee Pro Hub provides CRM, marketing automation, and lead generation services for businesses in ${city}, Massachusetts. All-in-one platform replacing 10+ tools.`
      : "All-in-one CRM and marketing automation platform for local businesses in Massachusetts and across the United States. Built on GoHighLevel.",
    url: "https://beeprohub.com",
    telephone: "+15084999279",
    image: "https://beeprohub.com/images/logo.png",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marlborough",
      addressLocality: city || "Marlborough",
      addressRegion: "MA",
      postalCode: "01752",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "42.3459",
      longitude: "-71.5523",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "50",
      ratingCount: "50",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Carlos Silva" },
        reviewBody: "Aumentamos em 250% nossa taxa de conversao em apenas 60 dias usando o CRM do Bee Pro Hub.",
        datePublished: "2025-12-15",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Marina Costa" },
        reviewBody: "Com as automacoes do Bee Pro Hub, nossa empresa passou de 5 para 50 vendas por mes sem contratar mais ninguem.",
        datePublished: "2026-01-10",
      },
    ],
    areaServed: {
      "@type": "State",
      name: "Massachusetts",
    },
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

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": "https://beeprohub.com/#organization" },
    areaServed: { "@type": "State", name: "Massachusetts" },
    serviceType: "Marketing and CRM Services",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://beeprohub.com",
      servicePhone: "+15084999279",
      availableLanguage: ["English", "Portuguese", "Spanish"],
    },
  };
}

export function productSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      offerCount: 3,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
    },
    brand: { "@type": "Brand", name: "Bee Pro Hub" },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
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

export function articleSchema(title: string, description: string, date: string, image: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: date,
    author: { "@type": "Organization", name: "Bee Pro Hub", "@id": "https://beeprohub.com/#organization" },
    publisher: {
      "@type": "Organization",
      name: "Bee Pro Hub",
      logo: { "@type": "ImageObject", url: "https://beeprohub.com/images/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

export function siteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Home", "About", "Services", "Pricing", "Blog", "BeeProCard", "Contact"],
    url: [
      "https://beeprohub.com/pt",
      "https://beeprohub.com/pt/about",
      "https://beeprohub.com/pt/services",
      "https://beeprohub.com/pt/pricing",
      "https://beeprohub.com/pt/blog",
      "https://beeprohub.com/pt/beeprocard",
      "https://beeprohub.com/pt/contact",
    ],
  };
}
