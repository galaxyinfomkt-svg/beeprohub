"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width={32} height={32} fill="none" stroke="#059669" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="text-lg font-bold text-green-800">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("name")}</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[15px] text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")}</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[15px] text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("phone")}</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[15px] text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("company")}</label>
          <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[15px] text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("message")}</label>
        <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-[15px] text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-hover text-dark font-bold py-4 rounded-xl text-[17px] shadow-[0_4px_20px_rgba(245,184,0,0.3)] hover:-translate-y-0.5 transition-all animate-pulse-glow">
        {t("submit")}
      </button>
    </form>
  );
}
