"use client";

import { PHONE, PHONE_LINK } from "@/lib/utils";
import { useLocale } from "next-intl";

export default function FloatingCallButton() {
  const locale = useLocale();
  const label =
    locale === "pt" ? "Ligar agora" : locale === "es" ? "Llamar ahora" : "Call now";

  return (
    <a
      href={PHONE_LINK}
      aria-label={`${label} ${PHONE}`}
      className="fixed bottom-6 left-6 z-[900] bg-primary text-dark h-14 pl-4 pr-5 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(245,184,0,0.45)] hover:scale-105 transition-transform"
    >
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="font-extrabold text-sm hidden sm:inline">{label}</span>
    </a>
  );
}
