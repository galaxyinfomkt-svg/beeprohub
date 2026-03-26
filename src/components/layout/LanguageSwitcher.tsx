"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

function Flag({ code }: { code: string }) {
  if (code === "pt") return (
    <svg width="20" height="14" viewBox="0 0 640 480" className="rounded-sm shrink-0">
      <rect width="640" height="480" fill="#009b3a"/>
      <polygon points="320,39 604,240 320,441 36,240" fill="#fedf00"/>
      <circle cx="320" cy="240" r="80" fill="#002776"/>
      <path d="M230,240 Q320,180 410,240" fill="none" stroke="#fff" strokeWidth="6"/>
    </svg>
  );
  if (code === "en") return (
    <svg width="20" height="14" viewBox="0 0 640 480" className="rounded-sm shrink-0">
      <rect width="640" height="480" fill="#bd3d44"/>
      <rect y="37" width="640" height="37" fill="#fff"/><rect y="111" width="640" height="37" fill="#fff"/><rect y="185" width="640" height="37" fill="#fff"/><rect y="259" width="640" height="37" fill="#fff"/><rect y="333" width="640" height="37" fill="#fff"/><rect y="407" width="640" height="37" fill="#fff"/>
      <rect width="256" height="259" fill="#192f5d"/>
    </svg>
  );
  return (
    <svg width="20" height="14" viewBox="0 0 640 480" className="rounded-sm shrink-0">
      <rect width="640" height="160" fill="#c60b1e"/>
      <rect y="160" width="640" height="160" fill="#ffc400"/>
      <rect y="320" width="640" height="160" fill="#c60b1e"/>
    </svg>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const scrollY = window.scrollY;
    router.replace(segments.join("/"), { scroll: false });
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-bold rounded-lg transition-all ${
            locale === lang.code
              ? "bg-primary text-dark shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          <Flag code={lang.code} />
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
