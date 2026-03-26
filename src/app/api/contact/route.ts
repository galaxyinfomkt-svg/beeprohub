import { NextRequest, NextResponse } from "next/server";
import { isBusinessEmail, validateEmail } from "@/lib/email-validation";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_CONTACT || "https://n8n.galaxyinfo.us/webhook/beeprohub-contact";
const AUTOREPLY_URL = "https://n8n.galaxyinfo.us/webhook/beeprohub-autoreply-contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, source, page } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Nome e email sao obrigatorios" }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalido" }, { status: 400 });
    }
    if (!isBusinessEmail(email)) {
      return NextResponse.json({ success: false, error: "Por favor, use um email profissional (nao aceita Gmail, Hotmail, Yahoo, etc.)" }, { status: 400 });
    }

    const payload = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || "",
      email, phone: phone || "", company: company || "",
      message: message || "",
      source: source || "BeeProHub - Contact Form",
      page: page || "contact",
      date: new Date().toISOString(),
      locale: req.headers.get("accept-language") || "pt",
    };

    // Send to main webhook + auto-reply in parallel
    await Promise.allSettled([
      fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
      fetch(AUTOREPLY_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro interno" }, { status: 500 });
  }
}
