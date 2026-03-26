"use client";

import { useState } from "react";
import { isBusinessEmail } from "@/lib/email-validation";
import { trackLeadSubmit } from "@/lib/tracking";

export default function HeroForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isBusinessEmail(form.email)) {
      setErrorMsg("Por favor, use um email profissional (nao aceita Gmail, Hotmail, Yahoo, etc.)");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, source: "BeeProHub - Free Trial", page: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      const data = await res.json();
      if (data.success) {
        trackLeadSubmit("BeeProHub - Free Trial");
        setStatus("sent");
      } else {
        setErrorMsg(data.error || "Erro ao enviar. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexao. Tente novamente.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="animate-bounce-in bg-white rounded-2xl p-8 text-center shadow-xl border-2 border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width={32} height={32} fill="none" stroke="#059669" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="font-extrabold text-dark text-xl">Mensagem enviada!</p>
        <p className="text-gray-500 text-sm mt-2">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center mb-5">
          <div className="inline-block bg-red-500 text-white font-bold text-[10px] px-3 py-1 rounded-full mb-3 animate-pulse uppercase tracking-wider">OFERTA LIMITADA</div>
          <h3 className="font-extrabold text-xl text-dark">Teste Gratis por 14 Dias</h3>
          <p className="text-sm text-gray-500 mt-1">Sem cartao de credito. Sem compromisso.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Seu nome completo" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50/50 focus:bg-white placeholder:text-gray-400" />
          <input type="tel" placeholder="WhatsApp / Telefone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50/50 focus:bg-white placeholder:text-gray-400" />
          <div>
            <input type="email" placeholder="Seu email profissional (empresa)" required value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrorMsg(""); }}
              className={`w-full px-4 py-3.5 border-2 rounded-xl text-sm text-dark outline-none focus:ring-2 transition-all bg-gray-50/50 focus:bg-white placeholder:text-gray-400 ${errorMsg ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-primary/20"}`} />
            <p className="text-[10px] text-gray-400 mt-1 ml-1">* Somente email corporativo (nao aceita Gmail, Hotmail, etc.)</p>
          </div>
          <button type="submit" disabled={status === "loading"}
            className={`w-full bg-gradient-to-r from-primary to-primary-hover text-dark font-extrabold py-4 rounded-xl text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all btn-shine ${status === "loading" ? "opacity-70 cursor-wait" : "animate-pulse-yellow"}`}>
            {status === "loading" ? "ENVIANDO..." : "COMECAR MEU TESTE GRATIS →"}
          </button>
          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Dados 100% seguros
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Ativacao imediata
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
