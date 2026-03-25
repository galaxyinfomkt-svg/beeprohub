"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "es", label: "ES", flag: "🇪🇸" },
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
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
            locale === lang.code
              ? "bg-primary text-dark"
              : "text-gray-400 hover:text-white hover:bg-dark-light"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
}
