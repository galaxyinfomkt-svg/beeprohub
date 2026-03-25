"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "pt", label: "PT", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "en", label: "EN", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "es", label: "ES", flag: "\u{1F1EA}\u{1F1F8}" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          style={{
            padding: "6px 10px",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: locale === lang.code ? "#F5B800" : "transparent",
            color: locale === lang.code ? "#1A1A1A" : "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 16 }}>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
