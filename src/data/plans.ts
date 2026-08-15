// Fonte única do preço dos planos.
//
// A página de preços exibia "Fale Conosco" em todos os cards, enquanto o FAQ
// logo abaixo citava "$97/mês" e "$197/mês" em texto corrido e a meta
// `ai-summary` do site afirmava "a partir de $97/mês". Três respostas
// diferentes para a mesma pergunta na mesma página — o Google não sabe qual
// indexar e modelos de IA tendem a não citar nenhuma.
//
// Os valores abaixo são os que já estavam em src/i18n/messages/*.json
// (pricing.starter.price etc). Agora eles alimentam ao mesmo tempo o card
// visível e o schema Offer, então não há como divergirem de novo.

export interface Plan {
  /** Chave usada em messages/*.json → pricing.<key> */
  key: "starter" | "professional" | "enterprise";
  /** Preço mensal em USD. */
  price: number;
  /** Plano destacado como "Mais Popular". */
  popular?: boolean;
}

export const PLANS: Plan[] = [
  { key: "starter", price: 97 },
  { key: "professional", price: 197, popular: true },
  { key: "enterprise", price: 397 },
];

/** Nomes em inglês para o schema — schema.org não é traduzido por página. */
const OFFER_NAMES: Record<Plan["key"], string> = {
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
};

export const PLAN_OFFERS = PLANS.map((p) => ({
  name: OFFER_NAMES[p.key],
  price: p.price,
}));

export const TRIAL_DAYS = 14;
