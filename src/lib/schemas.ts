export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bee Pro Hub",
    url: "https://beeprohub.com",
    logo: "https://beeprohub.com/images/logo.png",
    description: "All-in-one CRM and marketing automation platform for local businesses. Built on GoHighLevel.",
    telephone: "+17742852299",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marlborough",
      addressRegion: "MA",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.facebook.com/beeprohub",
      "https://www.instagram.com/beeprohub",
      "https://www.linkedin.com/company/beeprohub",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Galaxy IT & Marketing",
    },
  };
}

export function localBusinessSchema(city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://beeprohub.com",
    name: "Bee Pro Hub",
    description: city
      ? `Bee Pro Hub provides CRM, marketing automation, and lead generation services for businesses in ${city}, Massachusetts.`
      : "All-in-one CRM and marketing automation platform for local businesses in Massachusetts.",
    url: "https://beeprohub.com",
    telephone: "+17742852299",
    image: "https://beeprohub.com/images/logo.png",
    priceRange: "$97-$397",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
    },
    areaServed: {
      "@type": "State",
      name: "Massachusetts",
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
    provider: {
      "@type": "Organization",
      name: "Bee Pro Hub",
    },
    areaServed: {
      "@type": "State",
      name: "Massachusetts",
    },
  };
}

export function productSchema(name: string, description: string, price: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: "Bee Pro Hub" },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
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
    author: {
      "@type": "Organization",
      name: "Bee Pro Hub",
    },
    publisher: {
      "@type": "Organization",
      name: "Bee Pro Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://beeprohub.com/images/logo.png",
      },
    },
    mainEntityOfPage: url,
  };
}
