"use client";

import { useEffect } from "react";
import { trackLeadSubmit } from "@/lib/tracking";

// Listens for GoHighLevel form-submission postMessage events from any
// embedded GHL iframe and forwards them to GA4 / Facebook Pixel via
// trackLeadSubmit().
//
// GoHighLevel iframes (api.leadconnectorhq.com/widget/form/*) post a
// message with shape { type: 'form-submission', formId, ... } when a lead
// submits. This listener captures that and fires the conversion event.
// Source: https://help.gohighlevel.com (form embed events).

export default function GHLFormTracker() {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== "string") return;
      if (!/leadconnectorhq\.com|msgsndr\.com/.test(e.origin)) return;
      const data = e.data;
      if (!data || typeof data !== "object") return;

      const type = (data as { type?: string }).type;
      const eventName = (data as { event?: string }).event;
      const isSubmission =
        type === "form-submission" ||
        type === "FORM_SUBMITTED" ||
        eventName === "form_submit" ||
        eventName === "FORM_SUBMIT";

      if (isSubmission) {
        const formId = (data as { formId?: string }).formId || "ghl_form";
        trackLeadSubmit(`ghl:${formId}`);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
