import { NextRequest, NextResponse } from "next/server";
import { isBusinessEmail, validateEmail } from "@/lib/email-validation";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_LEAD || "https://n8n.galaxyinfo.us/webhook/beeprohub-lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Todos os campos sao obrigatorios" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Email invalido" }, { status: 400 });
    }

    if (!isBusinessEmail(email)) {
      return NextResponse.json({ success: false, error: "Por favor, use um email profissional (nao aceita Gmail, Hotmail, Yahoo, etc.)" }, { status: 400 });
    }

    const webhookPayload = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || "",
      email,
      phone,
      source: source || "Website - Hero Form (Free Trial)",
      date: new Date().toISOString(),
      tags: ["website-lead", "free-trial", "hero-form"],
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });
    } catch {
      console.error("Webhook delivery failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro interno" }, { status: 500 });
  }
}
