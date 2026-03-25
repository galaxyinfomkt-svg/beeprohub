"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              textAlign: "left",
              cursor: "pointer",
              background: openIndex === i ? "#F9FAFB" : "#fff",
              border: "none",
              font: "inherit",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1A1A1A", paddingRight: 16, fontSize: 15 }}>{item.question}</span>
            <svg
              style={{
                width: 20,
                height: 20,
                color: "#F5B800",
                flexShrink: 0,
                transition: "transform 0.3s",
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div style={{ padding: "0 20px 16px", color: "#6B7280", fontSize: 14, lineHeight: 1.7 }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
