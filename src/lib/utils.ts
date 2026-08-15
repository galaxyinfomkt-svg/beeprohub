export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ---------------------------------------------------------------------------
// NAP (Name / Address / Phone) — FONTE ÚNICA DA VERDADE
//
// O número de contato é brasileiro (+55 35, Sul de Minas) por decisão de
// negócio, enquanto o endereço declarado é Marlborough, MA. Ele funciona
// normalmente para o usuário em todo o site: header, rodapé, botão flutuante,
// links tel: e WhatsApp.
//
// COMO ISSO É TRATADO NO SCHEMA
//
// `telephone` dentro de um LocalBusiness com addressCountry "US" é lido pelo
// Google como o telefone daquele endereço. Um +55 ali cria uma contradição de
// NAP que impede o casamento com o Google Business Profile e pode reduzir a
// confiança na entidade inteira.
//
// Solução adotada: o número NÃO entra como `telephone` do LocalBusiness, mas
// entra como `contactPoint` da Organization, com `contactType: "sales"` e
// `availableLanguage`. Um ContactPoint é um canal de atendimento — não implica
// presença física naquele endereço — então a entidade tem telefone nos dados
// estruturados sem declarar nada contraditório. Ver src/lib/schemas.ts.
//
// SE UM DIA HOUVER UM DID DE MASSACHUSETTS (508/774 MetroWest e Worcester,
// 617/857 Boston, 978 Merrimack Valley): troque as três constantes [NAP]
// abaixo e vire PHONE_IS_FOREIGN para false. O telefone volta ao LocalBusiness
// automaticamente e o pacote de mapas passa a ser disputável. Atualize também
// o mesmo número no Google Business Profile.
// ---------------------------------------------------------------------------

/** [NAP] Telefone como exibido ao usuário. */
export const PHONE = "(35) 2299-0041";
/** [NAP] Telefone em formato E.164 para href="tel:" e para schema.org. */
export const PHONE_E164 = "+553522990041";
/** [NAP] Número do WhatsApp como exibido ao usuário. */
export const WHATSAPP = "+55 35 2299-0041";

/** True enquanto o telefone não for um número dos EUA. Usado para omitir o
 *  `telephone` dos schemas LocalBusiness/Service, evitando declarar ao Google
 *  um NAP que ele vai identificar como inconsistente. Vire para `false` depois
 *  de trocar as constantes [NAP] acima. */
export const PHONE_IS_FOREIGN = PHONE_E164.startsWith("+55");

export const PHONE_LINK = `tel:${PHONE_E164}`;
export const WHATSAPP_LINK =
  `https://wa.me/${PHONE_E164.replace("+", "")}?text=` +
  encodeURIComponent("Olá, vim pelo site e gostaria de mais informações.");

/** [NAP] Endereço da sede. Precisa bater exatamente com o Google Business Profile. */
export const ADDRESS = {
  street: "186 Main Street Suite 3",
  city: "Marlborough",
  region: "MA",
  postalCode: "01752",
  country: "US",
  lat: "42.3459",
  lng: "-71.5523",
} as const;

export const EMAIL = "contact@beeprohub.com";
export const LOGIN_URL = "https://login.beeprohub.com/";
export const SITE_URL = "https://beeprohub.com";
