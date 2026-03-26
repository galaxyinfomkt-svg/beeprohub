import { NextRequest, NextResponse } from "next/server";
import { isBusinessEmail, validateEmail } from "@/lib/email-validation";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_LEAD || "https://n8n.galaxyinfo.us/webhook/beeprohub-lead";
const AUTOREPLY_URL = "https://n8n.galaxyinfo.us/webhook/beeprohub-autoreply-lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source, page } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Todos os campos sao obrigatorios" }, { status: 400 });
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
      email, phone,
      source: source || "BeeProHub - Free Trial",
      page: page || "homepage",
      date: new Date().toISOString(),
      tags: ["beeprohub", "free-trial", "hero-form"],
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
