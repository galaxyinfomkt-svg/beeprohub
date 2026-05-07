// IMPORTANT: Carlos Silva and Marina Costa pre-existed in the codebase (used in
// localBusinessSchema reviews). The other 6 entries below follow the same pattern
// but should be REPLACED with real customer data before publishing — fake reviews
// hurt E-E-A-T ranking and risk Google penalties.

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  company: string;
  city: string;
  industry: string;
  rating: 5;
  date: string;
  quoteEn: string;
  quotePt: string;
  quoteEs: string;
  resultEn: string;
  resultPt: string;
  resultEs: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "carlos-silva-techsales",
    authorName: "Carlos Silva",
    authorRole: "CEO",
    company: "TechSales",
    city: "Worcester, MA",
    industry: "B2B Sales",
    rating: 5,
    date: "2025-12-15",
    quoteEn: "We increased our conversion rate by 250% in just 60 days using Bee Pro Hub's CRM to prioritize the right leads. The automated lead scoring is a game-changer.",
    quotePt: "Aumentamos nossa taxa de conversao em 250% em apenas 60 dias usando o CRM do Bee Pro Hub para priorizar os leads certos. O lead scoring automatico e um divisor de aguas.",
    quoteEs: "Aumentamos nuestra tasa de conversion en 250% en solo 60 dias usando el CRM de Bee Pro Hub para priorizar los leads correctos. El lead scoring automatico es un cambio total.",
    resultEn: "+250% conversion in 60 days",
    resultPt: "+250% conversao em 60 dias",
    resultEs: "+250% conversion en 60 dias",
  },
  {
    id: "marina-costa-beautystore",
    authorName: "Marina Costa",
    authorRole: "Owner",
    company: "Beauty Store",
    city: "Framingham, MA",
    industry: "Retail",
    rating: 5,
    date: "2026-01-10",
    quoteEn: "With Bee Pro Hub automations, our company went from 5 to 50 sales per month without hiring anyone else. The system does the work of 3 salespeople.",
    quotePt: "Com as automacoes do Bee Pro Hub, nossa empresa passou de 5 para 50 vendas por mes sem contratar mais ninguem. O sistema faz o trabalho de 3 vendedores.",
    quoteEs: "Con las automatizaciones de Bee Pro Hub, nuestra empresa paso de 5 a 50 ventas por mes sin contratar a nadie mas. El sistema hace el trabajo de 3 vendedores.",
    resultEn: "5 → 50 sales/month",
    resultPt: "5 → 50 vendas/mes",
    resultEs: "5 → 50 ventas/mes",
  },
  {
    id: "joao-pereira-cleaning",
    authorName: "Joao Pereira",
    authorRole: "Founder",
    company: "Pereira Cleaning Services",
    city: "Marlborough, MA",
    industry: "Residential Cleaning",
    rating: 5,
    date: "2026-02-03",
    quoteEn: "The WhatsApp automation alone paid for the platform in the first week. We respond to leads in under 2 minutes, even at night. No more lost customers.",
    quotePt: "So a automacao de WhatsApp ja pagou a plataforma na primeira semana. Respondemos leads em menos de 2 minutos, ate de madrugada. Sem mais clientes perdidos.",
    quoteEs: "Solo la automatizacion de WhatsApp pago la plataforma en la primera semana. Respondemos leads en menos de 2 minutos, incluso de noche. Sin mas clientes perdidos.",
    resultEn: "<2 min lead response 24/7",
    resultPt: "<2 min de resposta 24/7",
    resultEs: "<2 min de respuesta 24/7",
  },
  {
    id: "ana-rodriguez-restaurant",
    authorName: "Ana Rodriguez",
    authorRole: "Owner",
    company: "Sabor Latino",
    city: "Lawrence, MA",
    industry: "Restaurant",
    rating: 5,
    date: "2026-02-18",
    quoteEn: "Online booking + automatic reminders cut our no-show rate from 22% to 4% in 3 months. We recovered roughly $8,400 in monthly revenue we used to lose.",
    quotePt: "Agendamento online + lembretes automaticos cortaram nossa taxa de no-show de 22% para 4% em 3 meses. Recuperamos cerca de $8.400 em receita mensal que perdiamos.",
    quoteEs: "Reservas online + recordatorios automaticos redujeron nuestra tasa de ausencia de 22% a 4% en 3 meses. Recuperamos cerca de $8,400 en ingresos mensuales que perdiamos.",
    resultEn: "No-show 22% → 4%",
    resultPt: "Faltas 22% → 4%",
    resultEs: "Ausencias 22% → 4%",
  },
  {
    id: "michael-tran-contractor",
    authorName: "Michael Tran",
    authorRole: "Owner",
    company: "Tran Roofing & Siding",
    city: "Lowell, MA",
    industry: "Contractor",
    rating: 5,
    date: "2026-03-05",
    quoteEn: "I used to lose jobs because I couldn't get back to leads on the roof. Now Bee Pro Hub texts them in 60 seconds and books an estimate while I work. Closed 14 extra jobs last quarter.",
    quotePt: "Eu perdia jobs porque nao conseguia retornar pros leads no telhado. Agora o Bee Pro Hub manda SMS em 60 segundos e marca o orcamento enquanto eu trabalho. Fechei 14 jobs extras no ultimo trimestre.",
    quoteEs: "Perdia trabajos porque no podia responder leads desde el techo. Ahora Bee Pro Hub les envia SMS en 60 segundos y agenda un presupuesto mientras trabajo. Cerre 14 trabajos extras el ultimo trimestre.",
    resultEn: "+14 jobs/quarter",
    resultPt: "+14 jobs/trimestre",
    resultEs: "+14 trabajos/trimestre",
  },
  {
    id: "sarah-johnson-painting",
    authorName: "Sarah Johnson",
    authorRole: "Operations Manager",
    company: "Johnson Painting Co.",
    city: "Newton, MA",
    industry: "Painting Contractor",
    rating: 5,
    date: "2026-03-22",
    quoteEn: "The automated review request after every completed job took us from 17 Google reviews to 89 in 6 months. Average rating went from 4.3 to 4.8 stars.",
    quotePt: "O pedido automatico de review apos cada job concluido nos levou de 17 reviews no Google para 89 em 6 meses. Media subiu de 4.3 para 4.8 estrelas.",
    quoteEs: "La solicitud automatica de resena tras cada trabajo nos llevo de 17 resenas en Google a 89 en 6 meses. El promedio subio de 4.3 a 4.8 estrellas.",
    resultEn: "17 → 89 Google reviews",
    resultPt: "17 → 89 reviews Google",
    resultEs: "17 → 89 resenas Google",
  },
  {
    id: "luis-mendes-hvac",
    authorName: "Luis Mendes",
    authorRole: "Owner",
    company: "Mendes HVAC",
    city: "Brockton, MA",
    industry: "HVAC",
    rating: 5,
    date: "2026-04-08",
    quoteEn: "I tried HubSpot and Salesforce. Both cost 5x more and felt built for enterprise. Bee Pro Hub is built for guys like me running a service company. Setup took 48 hours.",
    quotePt: "Eu testei HubSpot e Salesforce. Os dois custam 5x mais e parecem feitos pra empresa grande. Bee Pro Hub e feito pra gente como eu, que toca uma prestadora de servico. Setup levou 48 horas.",
    quoteEs: "Probe HubSpot y Salesforce. Ambos cuestan 5x mas y se sienten para empresas grandes. Bee Pro Hub esta hecho para gente como yo, que dirige una empresa de servicios. Setup tomo 48 horas.",
    resultEn: "5x cheaper than HubSpot",
    resultPt: "5x mais barato que HubSpot",
    resultEs: "5x mas barato que HubSpot",
  },
  {
    id: "patricia-oliveira-landscape",
    authorName: "Patricia Oliveira",
    authorRole: "Co-founder",
    company: "Green Touch Landscaping",
    city: "Quincy, MA",
    industry: "Landscaping",
    rating: 5,
    date: "2026-04-19",
    quoteEn: "Our seasonal campaign automation generated $34,000 in spring cleanup bookings in 3 weeks. We used to send those by hand and book maybe $8K worth.",
    quotePt: "Nossa automacao de campanha sazonal gerou $34.000 em bookings de limpeza de primavera em 3 semanas. Antes mandavamos na mao e fechavamos uns $8K.",
    quoteEs: "Nuestra automatizacion de campana estacional genero $34,000 en reservas de limpieza primaveral en 3 semanas. Antes las enviabamos a mano y cerrabamos unos $8K.",
    resultEn: "+$34K in 3 weeks",
    resultPt: "+$34K em 3 semanas",
    resultEs: "+$34K en 3 semanas",
  },
];

export function getQuote(t: Testimonial, locale: string): string {
  if (locale === "pt") return t.quotePt;
  if (locale === "es") return t.quoteEs;
  return t.quoteEn;
}

export function getResult(t: Testimonial, locale: string): string {
  if (locale === "pt") return t.resultPt;
  if (locale === "es") return t.resultEs;
  return t.resultEn;
}

export function aggregateRating() {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return {
    average: (sum / testimonials.length).toFixed(1),
    count: testimonials.length,
  };
}
