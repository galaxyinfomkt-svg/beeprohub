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
    <div className="flex items-center gap-0.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${
            locale === lang.code
              ? "bg-primary text-dark"
              : "text-gray-500 hover:text-dark hover:bg-gray-100"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className="text-base">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
