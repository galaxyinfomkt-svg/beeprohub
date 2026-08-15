import type { City, CityProfile } from "./massachusetts-cities";

// ---------------------------------------------------------------------------
// Blocos de texto que variam por SETOR e por PERFIL econômico da cidade.
//
// Só trocar o nome da cidade dentro do mesmo parágrafo não resolve duplicação —
// foi exatamente assim que as 1.500 páginas antigas chegaram a 100% de
// sobreposição. Aqui cada cidade renderiza os blocos dos SEUS quatro setores e
// a variação de "por que nós" do SEU perfil econômico, então duas cidades só
// escrevem igual se tiverem economia idêntica.
// ---------------------------------------------------------------------------

/** Os 69 rótulos de setor usados em massachusetts-cities.ts, agrupados. */
const INDUSTRY_GROUP: Record<string, string> = {
  retail: "retail", "specialty retail": "retail", "small retail": "retail",
  "big-box retail": "retail",
  healthcare: "healthcare", "home care": "healthcare",
  "construction trades": "trades", construction: "trades", "home renovation": "trades",
  "home services": "trades", landscaping: "trades", "seasonal construction": "trades",
  "seasonal trades": "trades", "cleaning and home services": "trades",
  "roofing and exterior trades": "trades",
  "professional services": "professional", "legal services": "professional",
  "corporate services": "professional", staffing: "professional",
  "financial services": "professional", insurance: "professional",
  "financial back office": "professional", "corporate headquarters": "professional",
  "public sector": "professional",
  "higher education": "education", education: "education",
  tourism: "tourism", hospitality: "tourism", "seasonal tourism": "tourism",
  "lake tourism": "tourism", "tourism and history": "tourism",
  "golf and hospitality": "tourism", "events and hospitality": "tourism", events: "tourism",
  manufacturing: "manufacturing", "light manufacturing": "manufacturing",
  "small manufacturing": "manufacturing", "plastics manufacturing": "manufacturing",
  "jewelry manufacturing": "manufacturing", "technology manufacturing": "manufacturing",
  "aviation manufacturing": "manufacturing", "pharmaceutical manufacturing": "manufacturing",
  biomanufacturing: "manufacturing", defense: "manufacturing", aviation: "manufacturing",
  "green energy": "manufacturing", "leather goods manufacturing": "manufacturing",
  "medical devices": "manufacturing",
  "marine trades": "marine", marine: "marine", "commercial fishing": "marine",
  "seafood processing": "marine", "marine science": "marine", "marine and yachting": "marine",
  restaurants: "restaurants", "food service": "restaurants",
  "food and beverage": "restaurants", "food distribution": "restaurants",
  logistics: "logistics", distribution: "logistics",
  technology: "tech", biotech: "tech", software: "tech", "life sciences": "tech",
  "creative services": "tech", "defense research": "tech",
  "veterinary and life sciences": "tech",
  agriculture: "agriculture", "cranberry agriculture": "agriculture",
  automotive: "automotive", "automotive retail": "automotive",
  "arts and culture": "arts", arts: "arts",
};

type Locale = "pt" | "es" | "en";

interface Block { label: string; body: string }

/** Como o Bee Pro Hub atua em cada setor. Renderizado só para os setores que a
 *  cidade realmente tem. */
const INDUSTRY_COPY: Record<string, Record<Locale, Block>> = {
  retail: {
    pt: { label: "Varejo e comércio local", body: "Loja de rua vive de recorrência, e recorrência morre quando ninguém tem o contato do cliente. Capturamos o contato no balcão e no site, segmentamos por compra e disparamos campanha sazonal sozinha." },
    es: { label: "Retail y comercio local", body: "El comercio de calle vive de la recurrencia, y la recurrencia muere cuando nadie tiene el contacto del cliente. Capturamos el contacto en el mostrador y en el sitio, segmentamos por compra y lanzamos campanas estacionales solas." },
    en: { label: "Retail and local commerce", body: "A storefront lives on repeat business, and repeat business dies when nobody has the customer's contact. We capture it at the counter and on the site, segment by purchase, and let seasonal campaigns run themselves." },
  },
  healthcare: {
    pt: { label: "Saúde e cuidado domiciliar", body: "Clínica e agência de home care perdem receita em falta e remarcação. Lembrete automático por SMS e WhatsApp corta a taxa de não comparecimento, e a agenda online libera a recepção para atender quem está na sala." },
    es: { label: "Salud y cuidado en casa", body: "Clinicas y agencias de cuidado en casa pierden ingresos por ausencias y reprogramaciones. El recordatorio automatico por SMS y WhatsApp reduce las faltas, y la agenda online libera a recepcion para atender a quien esta en la sala." },
    en: { label: "Healthcare and home care", body: "Clinics and home care agencies lose revenue to no-shows and reschedules. Automated SMS and WhatsApp reminders cut the no-show rate, and online scheduling frees the front desk to handle the people already in the room." },
  },
  trades: {
    pt: { label: "Contractors e serviços residenciais", body: "O lead chega enquanto você está no telhado. Se ninguém responde em minutos, ele liga para o próximo. Resposta automática, orçamento assinado pelo celular e cobrança integrada resolvem o buraco entre a ligação e o pagamento." },
    es: { label: "Contratistas y servicios residenciales", body: "El lead llega mientras estas en el techo. Si nadie responde en minutos, llama al siguiente. Respuesta automatica, presupuesto firmado desde el celular y cobro integrado cierran el hueco entre la llamada y el pago." },
    en: { label: "Contractors and home services", body: "The lead arrives while you are on the roof. If nobody answers within minutes, they call the next name. Automated response, an estimate signed from the phone, and integrated payment close the gap between the call and the deposit." },
  },
  professional: {
    pt: { label: "Serviços profissionais e escritórios", body: "Venda consultiva tem ciclo longo e morre no esquecimento. O pipeline mostra em que etapa cada proposta está, e a sequência de follow-up continua trabalhando no terceiro e no quarto mês, quando o concorrente já desistiu." },
    es: { label: "Servicios profesionales y despachos", body: "La venta consultiva tiene ciclo largo y muere en el olvido. El pipeline muestra en que etapa esta cada propuesta, y la secuencia de seguimiento sigue trabajando en el tercer y cuarto mes, cuando el competidor ya desistio." },
    en: { label: "Professional services and firms", body: "Consultative sales run long and die of neglect. The pipeline shows exactly where each proposal stands, and the follow-up sequence keeps working in month three and four, after the competitor has given up." },
  },
  education: {
    pt: { label: "Ensino e formação", body: "Matrícula é um funil com prazo. Formulário de interesse, nutrição por e-mail e lembrete de matrícula rodam sozinhos, e a equipe só entra quando o candidato já demonstrou intenção real." },
    es: { label: "Educacion y formacion", body: "La matricula es un embudo con plazo. Formulario de interes, nutricion por email y recordatorio de inscripcion funcionan solos, y el equipo entra solo cuando el candidato ya mostro intencion real." },
    en: { label: "Education and training", body: "Enrollment is a funnel with a deadline. Interest forms, email nurture, and enrollment reminders run on their own, and staff only step in once a prospect has shown real intent." },
  },
  tourism: {
    pt: { label: "Turismo, eventos e hospitalidade", body: "Temporada curta exige lista longa. Capturamos contato de quem visitou uma vez e reativamos antes da próxima temporada — é o que separa quem enche a agenda em abril de quem espera o telefone tocar." },
    es: { label: "Turismo, eventos y hospitalidad", body: "Temporada corta exige lista larga. Capturamos el contacto de quien visito una vez y lo reactivamos antes de la proxima temporada — eso separa a quien llena la agenda en abril de quien espera que suene el telefono." },
    en: { label: "Tourism, events, and hospitality", body: "A short season demands a long list. We capture contacts from first-time visitors and reactivate them before the next season — the difference between a full April calendar and waiting for the phone to ring." },
  },
  manufacturing: {
    pt: { label: "Indústria e manufatura", body: "Venda B2B industrial passa por cotação, amostra e aprovação, às vezes ao longo de meses. Registrar cada etapa e automatizar o retorno evita que uma cotação de $40 mil morra porque ninguém lembrou de ligar de volta." },
    es: { label: "Industria y manufactura", body: "La venta B2B industrial pasa por cotizacion, muestra y aprobacion, a veces durante meses. Registrar cada etapa y automatizar el seguimiento evita que una cotizacion de $40 mil muera porque nadie recordo devolver la llamada." },
    en: { label: "Industry and manufacturing", body: "Industrial B2B moves through quote, sample, and approval, sometimes over months. Logging every step and automating the callback keeps a $40,000 quote from dying because nobody remembered to follow up." },
  },
  marine: {
    pt: { label: "Náutica e economia do mar", body: "Marina, estaleiro e pesca trabalham com janela climática e cliente sazonal. O sistema guarda o histórico de cada embarcação e dispara a manutenção preventiva antes de o dono lembrar que precisa." },
    es: { label: "Nautica y economia del mar", body: "Marinas, astilleros y pesca trabajan con ventana climatica y cliente estacional. El sistema guarda el historial de cada embarcacion y dispara el mantenimiento preventivo antes de que el dueno lo recuerde." },
    en: { label: "Marine and waterfront trades", body: "Marinas, boatyards, and fishing operations work against weather windows and seasonal customers. The system keeps each vessel's service history and triggers preventive maintenance before the owner remembers to ask." },
  },
  restaurants: {
    pt: { label: "Restaurantes e alimentação", body: "Reserva, delivery e evento privado chegam por canais diferentes e ninguém consolida. Unificamos em uma caixa de entrada, com confirmação automática e campanha para quem não volta há 60 dias." },
    es: { label: "Restaurantes y alimentacion", body: "Reservas, delivery y eventos privados llegan por canales distintos y nadie los consolida. Los unificamos en una bandeja, con confirmacion automatica y campana para quien no vuelve hace 60 dias." },
    en: { label: "Restaurants and food service", body: "Reservations, delivery, and private events arrive through different channels and nobody consolidates them. We unify them into one inbox, with automatic confirmation and a campaign for anyone who has not returned in 60 days." },
  },
  logistics: {
    pt: { label: "Logística e distribuição", body: "Comprador de logística quer cotação escrita no mesmo dia, não ligação. Formulário estruturado, proposta gerada em minutos e histórico completo de cada conta encurtam o ciclo sem aumentar a equipe." },
    es: { label: "Logistica y distribucion", body: "El comprador de logistica quiere cotizacion escrita el mismo dia, no una llamada. Formulario estructurado, propuesta generada en minutos e historial completo de cada cuenta acortan el ciclo sin ampliar el equipo." },
    en: { label: "Logistics and distribution", body: "Logistics buyers want a written quote the same day, not a phone call. A structured form, a proposal generated in minutes, and full account history shorten the cycle without adding headcount." },
  },
  tech: {
    pt: { label: "Tecnologia e ciências da vida", body: "Comprador técnico avalia processo antes de avaliar preço. Rastreamos cada ponto de contato, do primeiro download à proposta, e mostramos de onde vieram os negócios que realmente fecharam." },
    es: { label: "Tecnologia y ciencias de la vida", body: "El comprador tecnico evalua el proceso antes que el precio. Rastreamos cada punto de contacto, del primer descargo a la propuesta, y mostramos de donde vinieron los negocios que realmente cerraron." },
    en: { label: "Technology and life sciences", body: "Technical buyers evaluate process before price. We track every touchpoint, from first download to proposal, and show which sources actually produced the deals that closed." },
  },
  agriculture: {
    pt: { label: "Agricultura e produção sazonal", body: "Caixa apertado fora da safra e cheio na colheita quebra qualquer plano de marketing fixo. Campanhas por período e cobrança programada acompanham o ciclo em vez de brigar com ele." },
    es: { label: "Agricultura y produccion estacional", body: "Caja ajustada fuera de temporada y llena en la cosecha rompe cualquier plan de marketing fijo. Campanas por periodo y cobro programado acompanan el ciclo en vez de pelear con el." },
    en: { label: "Agriculture and seasonal production", body: "Tight cash out of season and flush at harvest breaks any fixed marketing plan. Period-based campaigns and scheduled billing follow the cycle instead of fighting it." },
  },
  automotive: {
    pt: { label: "Automotivo", body: "Cliente de oficina e concessionária some por dois anos e volta sem aviso. Histórico de serviço com lembrete de revisão traz a mesma pessoa de volta antes de ela procurar o concorrente da esquina." },
    es: { label: "Automotriz", body: "El cliente de taller y concesionaria desaparece dos anos y vuelve sin aviso. El historial de servicio con recordatorio de revision trae a la misma persona antes de que busque al competidor de la esquina." },
    en: { label: "Automotive", body: "Shop and dealership customers disappear for two years and come back unannounced. Service history with a maintenance reminder brings the same person back before they try the competitor down the street." },
  },
  arts: {
    pt: { label: "Cultura e economia criativa", body: "Público de teatro, galeria e escola de arte é fiel, mas só se for lembrado. Lista segmentada por interesse e disparo antes de cada temporada substituem o cartaz na vitrine." },
    es: { label: "Cultura y economia creativa", body: "El publico de teatro, galeria y escuela de arte es fiel, pero solo si se le recuerda. Una lista segmentada por interes y un envio antes de cada temporada reemplazan al cartel en la vitrina." },
    en: { label: "Arts and creative economy", body: "Theater, gallery, and arts-school audiences are loyal, but only if they are reminded. A list segmented by interest and a send before each season replace the poster in the window." },
  },
};

/** Variação de "por que nós" por perfil econômico da cidade. */
const PROFILE_WHY: Record<CityProfile, Record<Locale, string>> = {
  capital: {
    pt: "Aqui o comprador já tem fornecedor e já foi abordado esta semana. Ganhar espaço exige responder mais rápido e lembrar de tudo o que foi dito na conversa anterior — que é exatamente o que um CRM com histórico completo faz e uma planilha não faz.",
    es: "Aqui el comprador ya tiene proveedor y ya fue contactado esta semana. Ganar espacio exige responder mas rapido y recordar todo lo dicho en la conversacion anterior — justo lo que hace un CRM con historial completo y no hace una hoja de calculo.",
    en: "Here the buyer already has a vendor and was already pitched this week. Winning space takes a faster reply and total recall of the last conversation — exactly what a CRM with full history does and a spreadsheet does not.",
  },
  regional: {
    pt: "Uma cidade-polo atende um raio muito maior que o próprio município, e é aí que a operação trava: equipe cobrindo três condados sem um pipeline compartilhado perde justamente os jobs mais distantes e mais rentáveis.",
    es: "Una ciudad-polo atiende un radio mucho mayor que su municipio, y ahi se traba la operacion: un equipo cubriendo tres condados sin pipeline compartido pierde justo los trabajos mas lejanos y rentables.",
    en: "A regional hub serves a radius far larger than the city itself, and that is where operations break: a crew covering three counties without a shared pipeline loses exactly the farthest and most profitable jobs.",
  },
  mill: {
    pt: "Cidade fabril reconvertida vive de pequeno negócio de dono presente, que faz tudo e por isso deixa lead esfriar. A automação não substitui o dono — ela cobre as seis horas por dia em que ele está com a mão na massa.",
    es: "La ciudad fabril reconvertida vive del pequeno negocio de dueno presente, que hace todo y por eso deja enfriar los leads. La automatizacion no reemplaza al dueno — cubre las seis horas al dia en que esta con las manos ocupadas.",
    en: "A converted mill town runs on owner-operated small business, where the owner does everything and leads go cold because of it. Automation does not replace the owner — it covers the six hours a day their hands are full.",
  },
  port: {
    pt: "Economia do mar tem meses de pico e meses de silêncio, e quem não constrói lista no pico passa fome na baixa. O sistema guarda cada cliente da temporada e reativa antes da próxima, sem depender de memória.",
    es: "La economia del mar tiene meses de pico y meses de silencio, y quien no construye lista en el pico pasa hambre en la baja. El sistema guarda cada cliente de temporada y lo reactiva antes de la proxima, sin depender de la memoria.",
    en: "A waterfront economy has peak months and silent ones, and whoever fails to build a list at the peak goes hungry in the trough. The system holds every season's customers and reactivates them before the next, without relying on memory.",
  },
  college: {
    pt: "O calendário acadêmico enche e esvazia a cidade duas vezes por ano. Quem só vende para o fluxo estudantil vive de sobressalto; quem constrói uma lista de moradores fixos atravessa o verão inteiro faturando.",
    es: "El calendario academico llena y vacia la ciudad dos veces al ano. Quien solo vende al flujo estudiantil vive en sobresalto; quien construye una lista de residentes permanentes atraviesa el verano facturando.",
    en: "The academic calendar fills and empties the town twice a year. Selling only to student traffic means living on a cliff edge; building a year-round resident list carries you through the summer.",
  },
  suburb: {
    pt: "Em mercado residencial a indicação vale mais que qualquer anúncio — e indicação se multiplica quando o pedido de avaliação sai automaticamente no fim de cada serviço, em vez de depender de o dono lembrar.",
    es: "En un mercado residencial la recomendacion vale mas que cualquier anuncio — y se multiplica cuando la solicitud de resena sale automaticamente al final de cada servicio, en vez de depender de que el dueno se acuerde.",
    en: "In a residential market a referral outweighs any ad — and referrals multiply when the review request goes out automatically at the end of every job instead of depending on the owner remembering.",
  },
  retail: {
    pt: "Corredor de alto tráfego resolve visibilidade e não resolve conversão. O problema real aqui não é quantas pessoas passam, é quantas deixam contato e quantas voltam — e isso se mede e se automatiza.",
    es: "Un corredor de alto trafico resuelve la visibilidad y no la conversion. El problema real aqui no es cuanta gente pasa, sino cuanta deja su contacto y cuanta vuelve — y eso se mide y se automatiza.",
    en: "A high-traffic corridor solves visibility, not conversion. The real problem here is not how many people pass by but how many leave a contact and how many come back — and that can be measured and automated.",
  },
  resort: {
    pt: "Temporada curta precisa financiar o ano inteiro, o que torna cada lead perdido em julho impossível de recuperar em janeiro. Resposta automática fora do horário é o que impede que a demanda de pico vaze pelo ralo.",
    es: "Una temporada corta debe financiar el ano entero, lo que vuelve imposible recuperar en enero un lead perdido en julio. La respuesta automatica fuera de horario es lo que impide que la demanda pico se escurra.",
    en: "A short season has to fund the whole year, which makes a lead lost in July unrecoverable in January. Automated after-hours response is what keeps peak demand from draining away.",
  },
  tech: {
    pt: "Público acostumado a software que funciona julga o atendimento pelo mesmo padrão: confirmação instantânea, agendamento sem ligação e comunicação rastreável. Uma hora de silêncio depois do formulário já custou o cliente.",
    es: "Un publico acostumbrado a software que funciona juzga la atencion con el mismo estandar: confirmacion instantanea, reserva sin llamada y comunicacion rastreable. Una hora de silencio tras el formulario ya costo el cliente.",
    en: "An audience used to software that works judges service by the same standard: instant confirmation, booking without a call, and traceable communication. An hour of silence after the form has already cost you the customer.",
  },
  industrial: {
    pt: "Ciclo B2B longo é decidido por persistência estruturada. O negócio fica com quem ainda está fazendo follow-up no quarto mês — e ninguém faz isso de cabeça com quarenta cotações abertas ao mesmo tempo.",
    es: "El ciclo B2B largo lo decide la persistencia estructurada. El negocio queda con quien sigue haciendo seguimiento en el cuarto mes — y nadie hace eso de memoria con cuarenta cotizaciones abiertas.",
    en: "A long B2B cycle is decided by structured persistence. The deal goes to whoever still follows up in month four — and nobody does that from memory with forty open quotes.",
  },
};

/** Blocos de setor da cidade, sem repetir grupo. */
export function industryBlocks(city: City, locale: string, max = 4): Block[] {
  const l = (["pt", "es", "en"].includes(locale) ? locale : "en") as Locale;
  const seen = new Set<string>();
  const out: Block[] = [];

  for (const industry of city.industries) {
    const group = INDUSTRY_GROUP[industry];
    if (!group || seen.has(group)) continue;
    const copy = INDUSTRY_COPY[group];
    if (!copy) continue;
    seen.add(group);
    out.push(copy[l]);
    if (out.length >= max) break;
  }
  return out;
}

export function profileWhy(city: City, locale: string): string {
  const l = (["pt", "es", "en"].includes(locale) ? locale : "en") as Locale;
  return PROFILE_WHY[city.profile][l];
}
