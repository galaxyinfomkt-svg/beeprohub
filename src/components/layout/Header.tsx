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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(26,26,26,0.98)" : "rgba(26,26,26,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            {/* Logo */}
            <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Image
                src="/images/logo.png"
                alt="Bee Pro Hub Logo"
                width={140}
                height={48}
                style={{ height: 44, width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: "none", alignItems: "center", gap: 28 }} className="lg:!flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#9CA3AF",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5B800")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div style={{ display: "none", alignItems: "center", gap: 12 }} className="lg:!flex">
              <LanguageSwitcher />
              <a
                href={PHONE_LINK}
                style={{ fontSize: 14, fontWeight: 700, color: "#F5B800", whiteSpace: "nowrap" }}
              >
                {PHONE}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="animate-pulse-glow"
                style={{
                  background: "#F5B800",
                  color: "#1A1A1A",
                  fontWeight: 700,
                  padding: "10px 24px",
                  borderRadius: 10,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  transition: "all 0.3s",
                }}
              >
                {t("getDemo")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:!hidden"
              style={{ padding: 8, color: "#fff", background: "none", border: "none" }}
              aria-label="Toggle menu"
            >
              <svg width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(26,26,26,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            paddingTop: 80,
            overflowY: "auto",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "1rem 1.5rem", gap: 4 }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: "#D1D5DB",
                  fontSize: 18,
                  fontWeight: 500,
                  padding: "14px 16px",
                  borderRadius: 12,
                  transition: "all 0.2s",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
            <LanguageSwitcher />
            <a
              href={PHONE_LINK}
              style={{
                textAlign: "center",
                color: "#F5B800",
                fontWeight: 700,
                fontSize: 20,
                padding: "12px 0",
              }}
            >
              {PHONE}
            </a>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              style={{
                background: "#F5B800",
                color: "#1A1A1A",
                fontWeight: 700,
                padding: "16px 24px",
                borderRadius: 12,
                fontSize: 16,
                textAlign: "center",
                display: "block",
              }}
            >
              {t("getDemo")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
