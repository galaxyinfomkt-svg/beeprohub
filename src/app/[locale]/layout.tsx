import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

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

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff", color: "#1A1A1A" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main style={{ flex: 1, paddingTop: 72 }}>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
