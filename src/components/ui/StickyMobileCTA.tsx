"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

// Sticky bottom bar visible only on mobile. Replaces the removed click-to-call
// (X01 in SOP Galaxy-001) by giving users a persistent path to the contact
// form regardless of scroll position. Hidden on desktop where the header CTA
// is always visible.

export default function StickyMobileCTA() {
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label =
    locale === "pt"
      ? "Teste Grátis 14 Dias"
      : locale === "es"
      ? "Prueba Gratis 14 Días"
      : "Start 14-Day Free Trial";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[800] lg:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="bg-dark/95 backdrop-blur-md border-t-2 border-primary px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <Link
          href={`/${locale}/contact`}
          className="block w-full bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold text-center py-3 rounded-xl text-sm shadow-glow btn-shine animate-pulse-yellow"
        >
          {label} &rarr;
        </Link>
      </div>
    </div>
  );
}
