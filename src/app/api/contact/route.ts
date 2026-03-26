import { NextRequest, NextResponse } from "next/server";
import { isBusinessEmail, validateEmail } from "@/lib/email-validation";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_CONTACT || "https://n8n.galaxyinfo.us/webhook/beeprohub-contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, source } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Nome e email sao obrigatorios" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalido" }, { status: 400 });
    }

    if (!isBusinessEmail(email)) {
      return NextResponse.json({ success: false, error: "Por favor, use um email profissional (nao aceita Gmail, Hotmail, Yahoo, etc.)" }, { status: 400 });
    }

    // Send to n8n webhook
    const webhookPayload = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || "",
      email,
      phone: phone || "",
      company: company || "",
      message: message || "",
      source: source || "Website - Contact Form",
      date: new Date().toISOString(),
      locale: req.headers.get("accept-language") || "pt",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });
    } catch {
      // Webhook failure should not block user - log and continue
      console.error("Webhook delivery failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro interno" }, { status: 500 });
  }
}
