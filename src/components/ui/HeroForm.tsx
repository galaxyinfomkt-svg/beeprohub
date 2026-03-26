"use client";

import { useState } from "react";

export default function HeroForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="animate-scale-in bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-200">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width={28} height={28} fill="none" stroke="#059669" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="font-bold text-dark text-lg">Mensagem enviada!</p>
        <p className="text-gray-500 text-sm mt-2">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
      <h3 className="font-bold text-lg text-dark mb-1 text-center">Teste Gratis por 14 Dias</h3>
      <p className="text-sm text-gray-500 mb-5 text-center">Sem cartao de credito. Sem compromisso.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Seu nome" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
        <input type="tel" placeholder="Seu telefone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
        <input type="email" placeholder="Seu email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
        <button type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-dark font-bold py-3.5 rounded-xl text-base transition-all animate-pulse-glow">
          COMECAR TESTE GRATIS
        </button>
        <p className="text-[11px] text-gray-400 text-center">Seus dados estao 100% seguros</p>
      </form>
    </div>
  );
}
