export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const PHONE = "(508) 499-9279";
export const PHONE_LINK = "tel:+15084999279";
export const WHATSAPP_LINK = "https://wa.me/17742852299?text=Hi!%20I%27m%20interested%20in%20Bee%20Pro%20Hub";
export const LOGIN_URL = "https://login.beeprohub.com/";
export const SITE_URL = "https://beeprohub.com";
