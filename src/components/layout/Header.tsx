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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #F3F4F6" : "1px solid #E5E7EB",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Image src="/images/logo.png" alt="Bee Pro Hub Logo" width={140} height={48} style={{ height: 44, width: "auto" }} priority />
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: "none", alignItems: "center", gap: 24 }} className="lg:!flex">
              {links.map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: 14, fontWeight: 500, color: "#374151", transition: "color 0.2s", whiteSpace: "nowrap" }}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div style={{ display: "none", alignItems: "center", gap: 12 }} className="lg:!flex">
              <LanguageSwitcher />
              <a href={PHONE_LINK} style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}>
                {PHONE}
              </a>
              <Link href={`/${locale}/contact`} className="animate-pulse-glow" style={{
                background: "linear-gradient(135deg, #F5B800, #E0A800)", color: "#1A1A1A", fontWeight: 700,
                padding: "10px 22px", borderRadius: 10, fontSize: 14, whiteSpace: "nowrap",
                boxShadow: "0 4px 15px rgba(245,184,0,0.3)",
              }}>
                {t("getDemo")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:!hidden" style={{ padding: 8, color: "#1A1A1A" }} aria-label="Menu">
              <svg width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="animate-slide-down" style={{
          position: "fixed", inset: 0, zIndex: 999, background: "#ffffff",
          display: "flex", flexDirection: "column", paddingTop: 80, overflowY: "auto",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                color: "#1A1A1A", fontSize: 18, fontWeight: 500, padding: "14px 16px",
                borderRadius: 12, borderBottom: "1px solid #F3F4F6",
              }}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 16, marginTop: "auto", borderTop: "1px solid #F3F4F6" }}>
            <LanguageSwitcher />
            <a href={PHONE_LINK} style={{ textAlign: "center", color: "#1A1A1A", fontWeight: 700, fontSize: 20, padding: 12 }}>
              {PHONE}
            </a>
            <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)} style={{
              background: "linear-gradient(135deg, #F5B800, #E0A800)", color: "#1A1A1A", fontWeight: 700,
              padding: "16px 24px", borderRadius: 12, fontSize: 16, textAlign: "center",
            }}>
              {t("getDemo")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
