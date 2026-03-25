"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setOpen(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 14,
    color: "#1A1A1A",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 900,
          background: "#F5B800",
          color: "#1A1A1A",
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(245,184,0,0.4)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        {open ? (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div style={{
          position: "fixed",
          bottom: 92,
          left: 24,
          zIndex: 901,
          width: 320,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}>
          <div style={{ background: "#1A1A1A", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "#F5B800", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={20} height={20} fill="none" stroke="#1A1A1A" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Bee Pro Hub</p>
                <p style={{ color: "#6B7280", fontSize: 12 }}>Usually replies within minutes</p>
              </div>
            </div>
          </div>

          <div style={{ padding: 16 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 48, height: 48, background: "#ECFDF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width={24} height={24} fill="none" stroke="#059669" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 14 }}>Message sent!</p>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: "#F3F4F6", borderRadius: 10, padding: 12, fontSize: 13, color: "#4B5563", lineHeight: 1.5 }}>
                  Hi! How can we help you today?
                </div>
                <input type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <textarea placeholder="Your message..." required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                <button type="submit" style={{ width: "100%", background: "#F5B800", color: "#1A1A1A", fontWeight: 700, padding: "12px 0", borderRadius: 8, fontSize: 14, border: "none", cursor: "pointer" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
