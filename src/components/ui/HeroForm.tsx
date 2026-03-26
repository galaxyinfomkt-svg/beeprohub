"use client";

import { useState } from "react";

export default function HeroForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="animate-bounce-in bg-white rounded-2xl p-8 text-center shadow-xl border-2 border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width={32} height={32} fill="none" stroke="#059669" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="font-bold text-dark text-xl">Mensagem enviada!</p>
        <p className="text-gray-500 text-sm mt-2">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-5">
          <div className="inline-block bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full mb-3 animate-pulse">OFERTA LIMITADA</div>
          <h3 className="font-extrabold text-xl text-dark">Teste Gratis por 14 Dias</h3>
          <p className="text-sm text-gray-500 mt-1">Sem cartao de credito. Sem compromisso.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Seu nome completo" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white" />
          <input type="tel" placeholder="Seu telefone (WhatsApp)" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white" />
          <input type="email" placeholder="Seu melhor email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white" />
          <button type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold py-4 rounded-xl text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all animate-pulse-glow btn-shine">
            COMECAR MEU TESTE GRATIS &rarr;
          </button>
          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Dados seguros
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Ativacao imediata
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
