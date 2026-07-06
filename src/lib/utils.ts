export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const PHONE = "(35) 2299-0041";
export const PHONE_LINK = "tel:+553522990041";
export const WHATSAPP = "+55 35 2299-0041";
export const WHATSAPP_LINK = "https://wa.me/553522990041";
export const LOGIN_URL = "https://login.beeprohub.com/";
export const SITE_URL = "https://beeprohub.com";
