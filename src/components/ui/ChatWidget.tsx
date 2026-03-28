"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page: window.location.pathname }),
      });
    } catch { /* silent */ }
    setStatus("sent");
    setTimeout(() => { setStatus("idle"); setOpen(false); setForm({ name: "", email: "", phone: "", message: "" }); }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat"
        className="fixed bottom-6 left-6 z-[900] bg-primary text-dark w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(245,184,0,0.4)] hover:scale-110 transition-transform"
      >
        {open ? (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-[901] w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
          <div className="bg-dark p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg width={20} height={20} fill="none" stroke="#1A1A1A" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Bee Pro Hub</p>
                <p className="text-gray-400 text-xs">Responde em minutos</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {status === "sent" ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg width={24} height={24} fill="none" stroke="#059669" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-semibold text-dark text-sm">Mensagem enviada!</p>
                <p className="text-xs text-gray-500 mt-1">Responderemos em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">
                  Ola! Como podemos ajudar? Envie uma mensagem.
                </div>
                <input type="text" placeholder="Seu nome" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-dark outline-none focus:border-primary" />
                <input type="email" placeholder="Seu email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-dark outline-none focus:border-primary" />
                <input type="tel" placeholder="Seu telefone / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-dark outline-none focus:border-primary" />
                <textarea placeholder="Sua mensagem..." required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-dark outline-none focus:border-primary resize-none" />
                <button type="submit" disabled={status === "loading"} className={`w-full bg-primary hover:bg-primary-hover text-dark font-bold py-2.5 rounded-lg text-sm transition-colors ${status === "loading" ? "opacity-70" : ""}`}>
                  {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
