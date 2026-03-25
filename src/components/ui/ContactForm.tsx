"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    fontSize: 15,
    color: "#1A1A1A",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: "#374151",
    marginBottom: 6,
  };

  if (sent) {
    return (
      <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 16, padding: 40, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width={32} height={32} fill="none" stroke="#059669" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#065F46" }}>{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="sm:!grid-cols-2">
        <div>
          <label style={labelStyle}>{t("name")}</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t("email")}</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="sm:!grid-cols-2">
        <div>
          <label style={labelStyle}>{t("phone")}</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t("company")}</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>{t("message")}</label>
        <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
      </div>
      <button type="submit" className="animate-pulse-glow" style={{ width: "100%", background: "#F5B800", color: "#1A1A1A", fontWeight: 700, padding: "16px 0", borderRadius: 12, fontSize: 17, border: "none", cursor: "pointer" }}>
        {t("submit")}
      </button>
    </form>
  );
}
