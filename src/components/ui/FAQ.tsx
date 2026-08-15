"use client";

import { useId, useState } from "react";

interface FAQItem { question: string; answer: string; }

// As respostas ficam SEMPRE no HTML renderizado, apenas colapsadas por CSS.
// Antes elas eram montadas condicionalmente ({open && <div/>}), o que deixava
// apenas a primeira resposta no DOM: o schema FAQPage declarava N respostas e a
// página entregava 1. Isso quebra o casamento schema↔conteúdo exigido pelo
// Google e esconde o conteúdo de crawlers de IA, que não clicam.
export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer transition-colors ${isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50"}`}
              >
                <span className="font-semibold text-dark pr-4 text-[15px]">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
