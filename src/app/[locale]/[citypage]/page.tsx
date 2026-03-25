import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { massachusettsCities, cityServices } from "@/data/massachusetts-cities";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
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
    description: `Looking for ${service.description.toLowerCase()} in ${city.name}, Massachusetts? Bee Pro Hub offers CRM, marketing automation, and lead generation services for local businesses in ${city.name}, ${city.county} County. Start your free trial today.`,
    keywords: `${service.title} ${city.name}, CRM ${city.name} MA, marketing automation ${city.name}, lead generation ${city.name} Massachusetts`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ citypage: string; locale: string }> }) {
  const { citypage, locale } = await params;
  const result = parseCityPage(citypage);
  if (!result) notFound();
  const { service, city } = result;

  const nearbyCities = massachusettsCities
    .filter((c) => c.county === city.county && c.slug !== city.slug)
    .slice(0, 6);

  const cityFaqs = [
    {
      question: `What CRM services does Bee Pro Hub offer in ${city.name}?`,
      answer: `Bee Pro Hub provides complete CRM, marketing automation, lead generation, integrated phone system, scheduling, and invoicing services for businesses in ${city.name}, MA. Our platform replaces 10+ separate tools with one unified solution.`,
    },
    {
      question: `How much does ${service.title.toLowerCase()} cost in ${city.name}?`,
      answer: `Plans start at $97/month with a 14-day free trial. All plans include CRM, automation, and support. No credit card required to start.`,
    },
    {
      question: `Is Bee Pro Hub available for small businesses in ${city.name}?`,
      answer: `Absolutely! Bee Pro Hub is specifically designed for small and medium businesses in ${city.name} and throughout Massachusetts. We serve contractors, cleaning companies, roofing businesses, and all local service providers.`,
    },
    {
      question: `Do you offer in-person support in ${city.name}, Massachusetts?`,
      answer: `We're based in Marlborough, MA and serve all of ${city.county} County including ${city.name}. We offer remote support 24/7 in English, Portuguese, and Spanish, plus can arrange in-person consultations for businesses in the area.`,
    },
  ];

  return (
    <>
      <JsonLd data={[
        localBusinessSchema(city.name),
        serviceSchema(service.title, `${service.description} for businesses in ${city.name}, MA`, `https://beeprohub.com/en/${citypage}`),
        faqSchema(cityFaqs),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "Services", url: "https://beeprohub.com/en/services" },
          { name: `${service.title} in ${city.name}`, url: `https://beeprohub.com/en/${citypage}` },
        ]),
      ]} />

      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/20 text-primary font-bold text-sm px-4 py-2 rounded-full mb-4">
                {city.name}, Massachusetts
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                {service.title} in {city.name}, MA
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Looking for professional {service.description.toLowerCase()} in {city.name}? Bee Pro Hub helps local businesses in {city.name}, {city.county} County automate their marketing, manage leads, and grow revenue with our all-in-one CRM platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${locale}/contact`} className="bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-4 rounded-xl text-lg transition-all animate-pulse-glow text-center">
                  Get Free Demo
                </Link>
                <a href={PHONE_LINK} className="border-2 border-gray-600 hover:border-primary text-white hover:text-primary font-semibold px-8 py-4 rounded-xl text-lg transition-colors text-center">
                  {PHONE}
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image src="/images/dashboard-multidevice.webp" alt={`CRM and marketing automation dashboard for businesses in ${city.name} MA`} width={500} height={400} className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services for this city */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-10">
            What We Offer Businesses in {city.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Smart CRM", desc: `Manage all your ${city.name} customer relationships in one centralized platform. Track every lead, call, and interaction.` },
              { title: "Marketing Automation", desc: `Automate your email, SMS, and WhatsApp marketing to reach ${city.name} customers at the perfect time.` },
              { title: "Lead Generation", desc: `Attract more qualified leads from ${city.name} and ${city.county} County with optimized funnels and ad campaigns.` },
              { title: "Phone System", desc: `Professional phone system with local ${city.name} presence. Call recording, voicemail, and SMS built in.` },
              { title: "Scheduling", desc: `Let ${city.name} clients book appointments online. Automatic reminders reduce no-shows by 80%.` },
              { title: "Quotes & Invoicing", desc: `Create professional proposals for ${city.name} clients in minutes. Track payments and follow up automatically.` },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for this city */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">
            Why {city.name} Businesses Choose Bee Pro Hub
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Based in Marlborough, Massachusetts, we understand the local market in {city.county} County. Whether you&apos;re a contractor, cleaning company, restaurant, or any local service business in {city.name}, our platform is built to help you compete and win. With support in English, Portuguese, and Spanish, we serve the diverse business community across Massachusetts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">300%</div>
              <div className="text-xs text-gray-500">Avg Sales Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">15h</div>
              <div className="text-xs text-gray-500">Saved Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">70%</div>
              <div className="text-xs text-gray-500">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary">24/7</div>
              <div className="text-xs text-gray-500">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-10">
            FAQ About Our Services in {city.name}
          </h2>
          <FAQ items={cityFaqs} />
        </div>
      </section>

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-dark text-center mb-8">
              We Also Serve Nearby Cities in {city.county} County
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/${service.slug}-${c.slug}-ma`}
                  className="bg-white border border-gray-200 hover:border-primary text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {service.title} in {c.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {cityServices
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${locale}/${s.slug}-${city.slug}-ma`}
                    className="bg-white border border-gray-200 hover:border-primary text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {s.title} in {city.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-dark mb-4">
            Ready to Grow Your {city.name} Business?
          </h2>
          <p className="text-dark/70 mb-6">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link href={`/${locale}/contact`} className="inline-block bg-dark text-primary font-bold px-10 py-4 rounded-xl text-lg hover:bg-dark-light transition-colors">
            Start Free Trial
          </Link>
        </div>
      </section>
    </>
  );
}
