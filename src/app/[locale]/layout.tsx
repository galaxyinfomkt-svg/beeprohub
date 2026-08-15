import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import GHLFormTracker from "@/components/ui/GHLFormTracker";

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

  const aiSummary = messages?.meta?.aiSummary as string | undefined;

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <meta name="theme-color" content="#F5B800" />
        <meta name="format-detection" content="telephone=no" />
        {aiSummary && <meta name="ai-summary" content={aiSummary} />}

        {/*
          O bloco de <link rel="alternate" hreflang> que ficava aqui foi removido.
          Ele era emitido em TODAS as páginas apontando sempre para a home, e
          usava códigos (pt-BR/en-US) diferentes dos que o pageSeo emitia (pt/en).
          Dois conjuntos conflitantes fazem o Google descartar o cluster inteiro.

          Agora o hreflang sai de uma fonte única — `alternatesFor()` em
          src/lib/seo.ts — chamada no generateMetadata de cada template, com o
          alternate apontando para a própria página e x-default para /en.
        */}

        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
      </head>
      <body className="m-0 p-0 min-h-screen bg-white text-dark antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="pt-[100px] sm:pt-[104px]">{children}</main>
          <Footer />
          <FloatingContact />
          <GHLFormTracker />
        </NextIntlClientProvider>

        {/* Scripts de terceiros movidos para o fim do body com next/script:
            no <head> eles competiam com o LCP em todas as páginas. */}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}

        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
