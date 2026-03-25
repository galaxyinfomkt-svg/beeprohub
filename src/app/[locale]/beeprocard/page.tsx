import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "beeprocard" });
  return {
    title: "BeeProCard - Digital Business Card",
    description: t("subtitle"),
    alternates: { languages: { en: "/en/beeprocard", pt: "/pt/beeprocard", es: "/es/beeprocard" } },
  };
}

export default function BeeProCardPage() {
  const t = useTranslations("beeprocard");

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "BeeProCard", url: "https://beeprohub.com/en/beeprocard" },
        ]),
      ]} />

      <section className="bg-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <span className="text-primary font-bold text-sm uppercase tracking-wider">{t("sectionTag")}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-400">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">{t("tagline")}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">{t("description")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-sm text-gray-500">{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>

          {/* How it Works */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold text-dark text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Create Your Card", desc: "Sign up and customize your digital business card with your brand colors, logo, photo, and all your important links." },
                { step: "2", title: "Share Anywhere", desc: "Share your card via QR code, direct link, WhatsApp, email, or add it to your social media bios." },
                { step: "3", title: "Track & Grow", desc: "See who viewed your card, which links they clicked, and collect Google reviews automatically." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-dark font-extrabold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/en/contact" className="bg-primary hover:bg-primary-hover text-dark font-bold px-10 py-4 rounded-xl text-lg transition-colors animate-pulse-glow">
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
