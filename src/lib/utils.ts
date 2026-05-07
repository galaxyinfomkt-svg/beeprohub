export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const LOGIN_URL = "https://login.beeprohub.com/";
export const SITE_URL = "https://beeprohub.com";
