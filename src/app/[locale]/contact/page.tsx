import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schemas";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageSeo({ title: t("title"), description: t("subtitle"), path: "/contact", locale, keywords: "contato bee pro hub, demo gratis, teste gratis CRM" });
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: "https://beeprohub.com" }, { name: "Contact", url: "https://beeprohub.com/pt/contact" }])]} />

      {/* Hero - imagem de fundo de atendimento */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80" alt="Contact Bee Pro Hub support team in Marlborough Massachusetts" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-20 relative z-10 text-center">
          <div className="badge-gold mb-6 mx-auto">{t("title")}</div>
          <h1 className="section-heading text-white mb-5">{t("title")}</h1>
          <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div><ContactForm /></div>
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl p-7 border-2 border-primary/10">
                <h3 className="text-primary font-extrabold text-xl mb-3">{t("cta.title")}</h3>
                <p className="text-gray-600 text-sm mb-4">{t("cta.subtitle")}</p>
                <ul className="space-y-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t(`cta.bonuses.${i}`)}
                    </li>
                  ))}
                </ul>
                <p className="text-primary font-extrabold text-xl">{t("cta.total")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
