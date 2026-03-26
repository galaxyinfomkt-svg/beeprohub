"use client";

import { useState } from "react";

interface FAQItem { question: string; answer: string; }

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer transition-colors ${openIndex === i ? "bg-gray-50" : "bg-white hover:bg-gray-50"}`}
          >
            <span className="font-semibold text-dark pr-4 text-[15px]">{item.question}</span>
            <svg
              className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
