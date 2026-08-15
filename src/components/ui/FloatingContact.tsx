"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { PHONE, PHONE_LINK, WHATSAPP_LINK } from "@/lib/utils";

// Substitui FloatingCallButton + FloatingWhatsAppButton + StickyMobileCTA.
//
// Os três renderizavam ao mesmo tempo: dois botões redondos nos cantos
// inferiores e uma barra fixa de largura total por baixo deles. No mobile eles
// se sobrepunham e cobriam o conteúdo — inclusive o rodapé e o fim dos artigos.
//
// Agora: no mobile, UMA barra com as duas ações principais; no desktop, UM
// botão de WhatsApp. Sem sobreposição.

const copy: Record<string, { call: string; whatsapp: string; trial: string }> = {
  pt: { call: "Ligar", whatsapp: "WhatsApp", trial: "Teste Grátis" },
  es: { call: "Llamar", whatsapp: "WhatsApp", trial: "Prueba Gratis" },
  en: { call: "Call", whatsapp: "WhatsApp", trial: "Free Trial" },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={22} height={22} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function FloatingContact() {
  const locale = useLocale();
  const c = copy[locale] || copy.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile: barra única */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[900] lg:hidden transition-transform duration-300 motion-reduce:transition-none ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-dark/95 backdrop-blur-md border-t-2 border-primary px-3 py-2.5 flex items-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.whatsapp}
            className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold text-sm h-12 px-4 rounded-xl shrink-0"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="sr-only sm:not-sr-only">{c.whatsapp}</span>
          </a>
          <Link
            href={`/${locale}/contact`}
            className="flex-1 bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold text-center text-sm h-12 rounded-xl flex items-center justify-center btn-shine"
          >
            {c.trial} &rarr;
          </Link>
          <a
            href={PHONE_LINK}
            aria-label={`${c.call} ${PHONE}`}
            className="flex items-center justify-center bg-white/10 text-primary h-12 w-12 rounded-xl shrink-0"
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Desktop: um único botão */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={c.whatsapp}
        className="hidden lg:flex fixed bottom-6 right-6 z-[900] bg-[#25D366] text-white h-14 pl-4 pr-5 items-center gap-2 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform motion-reduce:transition-none"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="font-extrabold text-sm">{c.whatsapp}</span>
      </a>
    </>
  );
}
