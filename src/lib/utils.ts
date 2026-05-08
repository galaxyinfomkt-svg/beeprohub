export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const PHONE = "+55 32 2299-0041";
export const PHONE_LINK = "tel:+553222990041";
export const LOGIN_URL = "https://login.beeprohub.com/";
export const SITE_URL = "https://beeprohub.com";
