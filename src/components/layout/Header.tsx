"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { PHONE, PHONE_LINK } from "@/lib/utils";

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
      <header className={`fixed top-0 left-0 right-0 z-[1000] bg-white backdrop-blur-xl border-b transition-all duration-300 ${scrolled ? "border-gray-100 shadow-md" : "border-gray-200"}`}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Image src="/images/logo.png" alt="Bee Pro Hub" width={140} height={48} className="h-11 w-auto" priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <a href={PHONE_LINK} className="text-sm font-bold text-dark whitespace-nowrap">{PHONE}</a>
              <Link href={`/${locale}/contact`} className="bg-gradient-to-r from-primary to-primary-hover text-dark font-bold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shadow-[0_4px_15px_rgba(245,184,0,0.3)] hover:-translate-y-0.5 transition-all animate-pulse-glow">
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

      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col pt-20 overflow-y-auto animate-slide-down">
          <nav className="flex flex-col p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-dark text-lg font-medium py-3.5 px-4 rounded-xl border-b border-gray-100">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 flex flex-col gap-4 mt-auto border-t border-gray-100">
            <LanguageSwitcher />
            <a href={PHONE_LINK} className="text-center text-dark font-bold text-xl py-3">{PHONE}</a>
            <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)} className="bg-gradient-to-r from-primary to-primary-hover text-dark font-bold py-4 px-6 rounded-xl text-center text-lg">
              {t("getDemo")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
