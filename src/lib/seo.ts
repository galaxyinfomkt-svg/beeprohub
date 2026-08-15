import type { Metadata } from "next";
import { SITE_URL } from "./utils";

export const LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Códigos hreflang emitidos para cada locale. Precisam ser consistentes em
 *  TODO o site — antes o layout emitia pt-BR/en-US e o pageSeo emitia pt/en,
 *  o que fazia o Google descartar o cluster inteiro. */
export const HREFLANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es",
};

export const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

/**
 * O x-default é a versão servida a quem o Google não consegue casar com nenhum
 * idioma declarado. O público prioritário é a comunidade brasileira em
 * Massachusetts, e a operação atende em português — então o padrão é /pt.
 *
 * (Estava em /en por uma leitura anterior, de que o alvo era o mercado
 * americano geral. Com o alvo definido como negócios brasileiros em MA, o
 * português é a porta de entrada certa.)
 */
export const X_DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Monta o bloco `alternates` de uma página: canonical da própria URL +
 * um alternate por idioma apontando para a MESMA página (não para a home) +
 * x-default. Esta é a única fonte de hreflang do site.
 *
 * @param path caminho depois do locale, começando com "/" ou vazio para a home.
 */
export function alternatesFor(path: string, locale: string): Metadata["alternates"] {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  const languages: Record<string, string> = {};

  for (const l of LOCALES) {
    languages[HREFLANG[l]] = `${SITE_URL}/${l}${clean}`;
  }
  languages["x-default"] = `${SITE_URL}/${X_DEFAULT_LOCALE}${clean}`;

  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages,
  };
}

const BRAND_SUFFIX = " | Bee Pro Hub";
/** O Google trunca o título por volta de 60-65 caracteres. */
const TITLE_BUDGET = 62;

/**
 * Decide se o título recebe o sufixo da marca.
 *
 * O layout raiz aplica o template `%s | Bee Pro Hub` a todo título string. Em
 * páginas de título curto isso é bom — reforça a marca. Em títulos longos
 * (artigos do blog, landing pages de nicho) os 14 caracteres da marca empurram
 * o texto útil para fora da SERP e o Google corta justamente a parte que
 * responde à busca. Nesses casos devolvemos um título absoluto, sem sufixo.
 */
function titleFor(title: string): string | { absolute: string } {
  return title.length + BRAND_SUFFIX.length <= TITLE_BUDGET ? title : { absolute: title };
}

/** O Google corta a description por volta de 160 caracteres no desktop. */
const DESC_BUDGET = 158;

/**
 * Trava de segurança: garante que nenhuma description passe do orçamento da
 * SERP. Corta na última frase completa que couber; se não houver, na última
 * palavra. Templates que interpolam nomes de bairro e cidade têm comprimento
 * variável — sem esta trava, cidades de nome longo estouram o limite.
 */
function clampDescription(text: string): string {
  const d = text.trim().replace(/\s+/g, " ");
  if (d.length <= DESC_BUDGET) return d;

  const head = d.slice(0, DESC_BUDGET);
  const lastSentence = Math.max(head.lastIndexOf(". "), head.lastIndexOf("! "), head.lastIndexOf("? "));
  if (lastSentence > DESC_BUDGET * 0.6) return head.slice(0, lastSentence + 1);

  const lastSpace = head.lastIndexOf(" ");
  return `${head.slice(0, lastSpace > 0 ? lastSpace : DESC_BUDGET).replace(/[,;:\-—]$/, "")}…`;
}

export function pageSeo({
  title,
  description,
  keywords,
  path,
  locale,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  locale: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  const url = `${SITE_URL}/${locale}${clean}`;
  const ogImage = image || `${SITE_URL}/opengraph-image`;
  const l = (isLocale(locale) ? locale : "en") as Locale;

  const desc = clampDescription(description);

  return {
    title: titleFor(title),
    description: desc,
    ...(keywords ? { keywords } : {}),
    alternates: alternatesFor(clean, locale),
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "Bee Pro Hub",
      locale: OG_LOCALE[l],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}
