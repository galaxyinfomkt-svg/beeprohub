"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
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
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          style={{
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: locale === lang.code ? "#F5B800" : "transparent",
            color: locale === lang.code ? "#1A1A1A" : "#6B7280",
          }}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
