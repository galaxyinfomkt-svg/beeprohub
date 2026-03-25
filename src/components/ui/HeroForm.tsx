"use client";

import { useState } from "react";

export default function HeroForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", border: "1px solid #E5E7EB",
    borderRadius: 12, fontSize: 15, color: "#1A1A1A", outline: "none",
    background: "#fff", boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  if (sent) {
    return (
      <div className="animate-scale-in" style={{
        background: "#fff", borderRadius: 20, padding: 32, textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB",
      }}>
        <div style={{ width: 56, height: 56, background: "#ECFDF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width={28} height={28} fill="none" stroke="#059669" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{ fontWeight: 700, color: "#1A1A1A", fontSize: 18 }}>Mensagem enviada!</p>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 8 }}>Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up delay-300" style={{
      background: "#fff", borderRadius: 20, padding: 28,
      boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB",
    }}>
      <h3 style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 4, textAlign: "center" }}>
        Teste Gratis por 14 Dias
      </h3>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, textAlign: "center" }}>
        Sem cartao de credito. Sem compromisso.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="text" placeholder="Seu nome" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        <input type="tel" placeholder="Seu telefone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
        <input type="email" placeholder="Seu email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        <button type="submit" className="animate-pulse-glow" style={{
          width: "100%", background: "linear-gradient(135deg, #F5B800, #E0A800)",
          color: "#1A1A1A", fontWeight: 700, padding: "16px 0", borderRadius: 12,
          fontSize: 16, border: "none", cursor: "pointer",
          boxShadow: "0 4px 20px rgba(245,184,0,0.3)",
          transition: "all 0.3s",
        }}>
          COMECAR TESTE GRATIS
        </button>
        <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
          Seus dados estao 100% seguros
        </p>
      </form>
    </div>
  );
}
