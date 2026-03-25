import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bee Pro Hub | All-in-One CRM & Marketing Automation",
    template: "%s | Bee Pro Hub",
  },
  description: "Transform leads into loyal customers on autopilot. CRM, automation, telephony, and financial management in one platform. 14-day free trial.",
  metadataBase: new URL("https://beeprohub.com"),
  openGraph: {
    type: "website",
    siteName: "Bee Pro Hub",
    images: [{ url: "/images/logo.png", width: 600, height: 600 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
