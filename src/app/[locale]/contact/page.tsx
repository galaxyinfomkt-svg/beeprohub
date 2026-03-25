import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";
import { PHONE, PHONE_LINK, WHATSAPP_LINK } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { languages: { en: "/en/contact", pt: "/pt/contact", es: "/es/contact" } },
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <JsonLd data={[
        localBusinessSchema(),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "Contact", url: "https://beeprohub.com/en/contact" },
        ]),
      ]} />

      <section className="bg-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-400">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Phone */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-dark mb-2">{t("info.phoneLabel")}</h3>
                <a href={PHONE_LINK} className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
                  {t("info.phone")}
                </a>
                <p className="text-sm text-gray-500 mt-1">{t("info.hours")}</p>
              </div>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 p-6 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-dark">WhatsApp</p>
                  <p className="text-sm text-gray-500">Chat with us instantly</p>
                </div>
              </a>

              {/* Location */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-dark mb-2">Location</h3>
                <p className="text-gray-600">{t("info.location")}</p>
                <p className="text-sm text-gray-500 mt-1">Serving all of Massachusetts and the entire US</p>
              </div>

              {/* Bonuses CTA */}
              <div className="bg-dark p-6 rounded-2xl text-white">
                <h3 className="font-bold text-primary text-xl mb-3">{t("cta.title")}</h3>
                <p className="text-gray-400 text-sm mb-4">{t("cta.subtitle")}</p>
                <ul className="space-y-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`cta.bonuses.${i}`)}
                    </li>
                  ))}
                </ul>
                <p className="text-primary font-bold text-lg mb-4">{t("cta.total")}</p>
                <div className="flex gap-3">
                  <a href={PHONE_LINK} className="bg-primary hover:bg-primary-hover text-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors flex-1 text-center">
                    {t("cta.callCta")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
