import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt" | "es")) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const hrefLangMap: Record<string, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es",
  };

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        {/* hreflang tags */}
        {routing.locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={hrefLangMap[l]} href={`https://beeprohub.com/${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://beeprohub.com/pt" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Google Analytics - replace GA_MEASUREMENT_ID with your actual ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');` }} />
          </>
        )}
        {/* Facebook Pixel - replace FB_PIXEL_ID with your actual ID */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');fbq('track','PageView');` }} />
        )}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script src="https://link.msgsndr.com/js/form_embed.js" async />
      </head>
      <body className="m-0 p-0 min-h-screen bg-white text-dark antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="pt-[100px] sm:pt-[104px]">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
