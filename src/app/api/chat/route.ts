import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://n8n.galaxyinfo.us/webhook/beeprohub-chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, page } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Todos os campos sao obrigatorios" }, { status: 400 });
    }

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, page: page || "unknown", date: new Date().toISOString() }),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Erro interno" }, { status: 500 });
  }
}
