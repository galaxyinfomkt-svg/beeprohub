"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { LOGIN_URL } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/pricing`, label: t("pricing") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/beeprocard`, label: t("beeprocard") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      {/* Fixed wrapper for top bar + nav */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        {/* Top Bar - always visible */}
        <div className="bg-dark text-white text-xs py-2 hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="bg-primary text-dark font-bold px-3 py-0.5 rounded-full text-[10px] animate-pulse">
                {locale === "pt" ? "Teste Gratis por 14 Dias!" : locale === "es" ? "Prueba Gratis 14 Dias!" : "Free 14-Day Trial!"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                {locale === "pt" ? "JA TENHO CONTA" : locale === "es" ? "YA TENGO CUENTA" : "LOGIN"}
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <header className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100" : "bg-white/90 backdrop-blur-md border-b border-gray-200/50"}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href={`/${locale}`} className="shrink-0">
                <Image src="/images/logo.png" alt="Bee Pro Hub" width={130} height={44} className="h-10 w-auto" priority />
              </Link>

              <nav className="hidden lg:flex items-center gap-5">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-[13px] font-semibold text-gray-600 hover:text-primary uppercase tracking-wide transition-colors relative group whitespace-nowrap">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                <Link href={`/${locale}/contact`} className="bg-gradient-to-r from-primary to-primary-hover text-dark font-bold px-5 py-2.5 rounded-xl text-sm shadow-glow animate-pulse-yellow btn-shine whitespace-nowrap">
                  {t("getDemo")}
                </Link>
              </div>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-dark" aria-label="Menu">
                <svg width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col pt-20 overflow-y-auto">
          <nav className="flex flex-col px-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-dark text-lg font-semibold py-3.5 px-4 border-b border-gray-100 uppercase tracking-wide">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 flex flex-col gap-4 mt-auto border-t border-gray-100">
            <LanguageSwitcher />
            <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)} className="btn-primary text-center text-lg">{t("getDemo")}</Link>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="text-center text-gray-500 text-sm">
              {locale === "pt" ? "JA TENHO CONTA" : locale === "es" ? "YA TENGO CUENTA" : "LOGIN"} &rarr;
            </a>
          </div>
        </div>
      )}
    </>
  );
}
