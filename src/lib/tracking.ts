// Conversion tracking for Google Analytics + Facebook Pixel

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackConversion(eventName: string, data?: Record<string, string>) {
  // Google Analytics event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "conversion",
      event_label: data?.source || "website",
      value: 1,
      ...data,
    });
  }

  // Facebook Pixel event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName === "lead_form_submit" ? "Lead" : "Contact", data);
  }
}

export function trackLeadSubmit(source: string) {
  trackConversion("lead_form_submit", { source, page: window.location.pathname });
}

export function trackContactSubmit(source: string) {
  trackConversion("contact_form_submit", { source, page: window.location.pathname });
}

export function trackChatMessage() {
  trackConversion("chat_message", { source: "chat_widget", page: window.location.pathname });
}

export function trackPhoneClick() {
  trackConversion("phone_click", { source: "website" });
}

export function trackWhatsAppClick() {
  trackConversion("whatsapp_click", { source: "website" });
}
