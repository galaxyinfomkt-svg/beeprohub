// Block personal email providers - only allow professional/business emails
const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.com.br", "yahoo.es", "yahoo.co.uk",
  "hotmail.com", "hotmail.com.br", "hotmail.es",
  "outlook.com", "outlook.com.br",
  "live.com", "live.com.br",
  "msn.com",
  "aol.com",
  "icloud.com", "me.com", "mac.com",
  "protonmail.com", "proton.me",
  "zoho.com",
  "mail.com",
  "yandex.com", "yandex.ru",
  "tutanota.com", "tuta.io",
  "gmx.com", "gmx.net",
  "fastmail.com",
  "hushmail.com",
  "inbox.com",
  "rediffmail.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "ig.com.br",
  "globo.com",
  "r7.com",
];

export function isBusinessEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase().trim();
  return !BLOCKED_DOMAINS.includes(domain);
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
