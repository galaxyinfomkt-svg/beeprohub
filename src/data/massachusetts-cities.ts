// ---------------------------------------------------------------------------
// DADOS LOCAIS POR CIDADE
//
// Antes este arquivo tinha só nome, slug, população e condado. O template de
// cidade interpolava esses quatro campos no mesmo parágrafo e gerava 100×5×3 =
// 1.500 páginas. Medido em produção: 100% de sobreposição de tokens entre
// /marketing-agency-boston-ma e /marketing-agency-worcester-ma depois de
// normalizar os nomes próprios. Isso é a definição de doorway page.
//
// Agora cada cidade carrega fatos que só valem para ela — as rodovias e linhas
// de trem que a servem, os bairros e vilas reais, os setores que empregam ali,
// a instituição que ancora a economia e uma nota própria sobre o tecido
// comercial local, escrita nos três idiomas. O template compõe a partir disso,
// então nenhuma página repete o texto de outra.
//
// Ao adicionar uma cidade: preencha TODOS os campos com informação verificável.
// Um campo genérico aqui reintroduz duplicação em três páginas de uma vez.
// ---------------------------------------------------------------------------

/** Perfil econômico. Decide qual variação de parágrafo o template usa. */
export type CityProfile =
  | "capital"    // centro financeiro/corporativo
  | "regional"   // cidade-polo de uma região
  | "mill"       // antiga cidade industrial do rio
  | "port"       // economia marítima / pesca
  | "college"    // dominada por ensino superior
  | "suburb"     // subúrbio residencial de serviços
  | "retail"     // corredor comercial / varejo
  | "resort"     // turismo sazonal
  | "tech"       // corredor tecnológico
  | "industrial"; // manufatura e logística

/** Comunidades com presença comercial relevante — define quais idiomas o
 *  texto destaca no atendimento. */
export type Community = "br" | "hisp" | "pt" | "other";

export interface City {
  name: string;
  slug: string;
  population: number;
  county: string;
  /** Rodovias, pontes e linhas de trem que efetivamente servem a cidade. */
  access: string[];
  /** Bairros, vilas ou distritos comerciais reais. */
  districts: string[];
  /** Setores que empregam localmente. */
  industries: string[];
  /** Instituição, obra ou marco que ancora a economia local. */
  anchor: string;
  profile: CityProfile;
  communities?: Community[];
  /** Frase única sobre o tecido comercial da cidade, nos três idiomas.
   *  É o que impede duas páginas de dizerem a mesma coisa. */
  note: { en: string; pt: string; es: string };
}

export const massachusettsCities: City[] = [
  {
    name: "Boston", slug: "boston", population: 675647, county: "Suffolk",
    access: ["I-90 (Mass Pike)", "I-93", "Red, Orange, Green and Blue Lines"],
    districts: ["Back Bay", "South Boston", "Dorchester", "Jamaica Plain", "Charlestown"],
    industries: ["healthcare", "higher education", "biotech", "financial services", "hospitality"],
    anchor: "the Longwood Medical Area and the Financial District",
    profile: "capital",
    communities: ["hisp", "br"],
    note: {
      en: "Boston's service businesses compete against national brands with real ad budgets, so response time is the differentiator: a contractor or clinic that answers a Dorchester or JP lead in two minutes wins work the slower competitor never sees.",
      pt: "Os negócios de serviço em Boston competem com marcas nacionais que têm verba de anúncio de verdade, então o diferencial é o tempo de resposta: quem retorna um lead de Dorchester ou JP em dois minutos fecha trabalho que o concorrente mais lento nem chega a ver.",
      es: "Los negocios de servicios en Boston compiten con marcas nacionales con presupuesto publicitario real, asi que el diferencial es el tiempo de respuesta: quien responde un lead de Dorchester o JP en dos minutos cierra trabajo que el competidor mas lento nunca ve.",
    },
  },
  {
    name: "Worcester", slug: "worcester", population: 206518, county: "Worcester",
    access: ["I-290", "I-190", "Route 9", "the Framingham/Worcester commuter line"],
    districts: ["Shrewsbury Street", "the Canal District", "Main South", "Kelley Square"],
    industries: ["healthcare", "higher education", "biomanufacturing", "restaurants"],
    anchor: "UMass Memorial and the Polar Park redevelopment",
    profile: "regional",
    communities: ["hisp", "br"],
    note: {
      en: "Worcester's Canal District boom brought a wave of independent restaurants and trades that grew faster than their back office — most are still tracking estimates in text threads while nine colleges feed steady seasonal demand.",
      pt: "O boom do Canal District trouxe uma leva de restaurantes e prestadores independentes que cresceram mais rápido que o próprio back office — a maioria ainda controla orçamento em conversa de WhatsApp, enquanto nove faculdades alimentam uma demanda sazonal constante.",
      es: "El auge del Canal District trajo una ola de restaurantes y oficios independientes que crecieron mas rapido que su back office — la mayoria aun controla presupuestos por mensajes, mientras nueve universidades alimentan una demanda estacional constante.",
    },
  },
  {
    name: "Springfield", slug: "springfield", population: 155929, county: "Hampden",
    access: ["I-91", "I-291", "the Mass Pike", "the Hartford Line"],
    districts: ["Forest Park", "Sixteen Acres", "Mason Square", "the South End"],
    industries: ["healthcare", "insurance", "manufacturing", "hospitality"],
    anchor: "Baystate Medical Center and MGM Springfield",
    profile: "regional",
    communities: ["hisp"],
    note: {
      en: "Springfield is the commercial hub for all of Western Massachusetts, and its largest untapped market is Spanish-speaking: a home services company that quotes, texts and invoices in Spanish reaches customers competitors in Boston never bid on.",
      pt: "Springfield é o polo comercial de todo o oeste de Massachusetts, e seu maior mercado inexplorado fala espanhol: uma empresa de serviços que orça, manda SMS e fatura em espanhol alcança clientes que a concorrência de Boston nem disputa.",
      es: "Springfield es el centro comercial de todo el oeste de Massachusetts, y su mayor mercado sin explotar habla espanol: una empresa de servicios que cotiza, envia SMS y factura en espanol llega a clientes que la competencia de Boston ni disputa.",
    },
  },
  {
    name: "Cambridge", slug: "cambridge", population: 118977, county: "Middlesex",
    access: ["Route 2", "Memorial Drive", "the Red Line"],
    districts: ["Kendall Square", "Harvard Square", "Central Square", "East Cambridge"],
    industries: ["biotech", "software", "higher education", "professional services"],
    anchor: "the Kendall Square life sciences cluster",
    profile: "tech",
    note: {
      en: "Cambridge clients are used to software that works, so the bar is higher: a cleaning company or contractor serving Kendall and Harvard Square is judged on online booking and automated confirmations as much as on the work itself.",
      pt: "O cliente de Cambridge está acostumado a software que funciona, então a régua é mais alta: uma empresa de limpeza ou um contractor que atende Kendall e Harvard Square é julgado pelo agendamento online e pela confirmação automática tanto quanto pelo serviço.",
      es: "El cliente de Cambridge esta acostumbrado a software que funciona, asi que la vara es mas alta: una empresa de limpieza o un contratista que atiende Kendall y Harvard Square es juzgado por la reserva online y la confirmacion automatica tanto como por el trabajo.",
    },
  },
  {
    name: "Lowell", slug: "lowell", population: 115554, county: "Middlesex",
    access: ["Route 3", "I-495", "Route 110", "the Lowell commuter line"],
    districts: ["Downtown", "Belvidere", "Pawtucketville", "the Acre", "the Highlands"],
    industries: ["healthcare", "higher education", "small manufacturing", "restaurants"],
    anchor: "UMass Lowell and the Lowell National Historical Park mill district",
    profile: "mill",
    communities: ["hisp", "br", "other"],
    note: {
      en: "Lowell runs on immigrant-owned small business — Cambodian, Brazilian, Dominican and Puerto Rican owners across the Acre and Highlands — and most of them lose leads to language, not to price.",
      pt: "Lowell funciona à base de pequeno negócio de imigrante — donos cambojanos, brasileiros, dominicanos e porto-riquenhos no Acre e no Highlands — e a maioria perde lead por idioma, não por preço.",
      es: "Lowell funciona con pequenos negocios de inmigrantes — duenos camboyanos, brasilenos, dominicanos y puertorriquenos en el Acre y Highlands — y la mayoria pierde leads por idioma, no por precio.",
    },
  },
  {
    name: "Brockton", slug: "brockton", population: 105643, county: "Plymouth",
    access: ["Route 24", "Route 27", "Route 123", "the Middleborough/Lakeville line"],
    districts: ["Campello", "Montello", "Downtown", "the West Side"],
    industries: ["healthcare", "home services", "retail", "logistics"],
    anchor: "Good Samaritan Medical Center and the Brockton Fairgrounds",
    profile: "mill",
    communities: ["hisp", "other"],
    note: {
      en: "Brockton has one of the densest concentrations of Cape Verdean and Haitian-owned trades in New England — roofers, movers, home health agencies — and almost none of them have a system that follows up after the first missed call.",
      pt: "Brockton tem uma das maiores concentrações de prestadores cabo-verdianos e haitianos da Nova Inglaterra — telhadistas, mudanças, home care — e quase nenhum deles tem um sistema que faça o follow-up depois da primeira ligação perdida.",
      es: "Brockton tiene una de las mayores concentraciones de oficios caboverdianos y haitianos de Nueva Inglaterra — techadores, mudanzas, cuidado en casa — y casi ninguno tiene un sistema que haga seguimiento tras la primera llamada perdida.",
    },
  },
  {
    name: "New Bedford", slug: "new-bedford", population: 101079, county: "Bristol",
    access: ["I-195", "Route 140", "Route 6", "the new South Coast Rail line"],
    districts: ["the North End", "the South End", "the Historic District", "Clark's Point"],
    industries: ["commercial fishing", "seafood processing", "marine trades", "healthcare"],
    anchor: "the Port of New Bedford, the highest-value fishing port in the United States",
    profile: "port",
    communities: ["pt", "hisp"],
    note: {
      en: "New Bedford business runs on the fishing calendar and on Portuguese: shore-side trades, marine repair and food processing all quote in two languages, and the ones that automate follow-up hold customers through the slow months.",
      pt: "O comércio de New Bedford segue o calendário da pesca e o português: oficinas de terra, reparo naval e processamento de pescado orçam em dois idiomas, e quem automatiza o follow-up segura o cliente nos meses fracos.",
      es: "El comercio de New Bedford sigue el calendario pesquero y el portugues: talleres, reparacion naval y procesamiento de pescado cotizan en dos idiomas, y quien automatiza el seguimiento retiene clientes en los meses flojos.",
    },
  },
  {
    name: "Quincy", slug: "quincy", population: 101636, county: "Norfolk",
    access: ["I-93", "Route 3A", "the Red Line at Quincy Center, Wollaston and North Quincy"],
    districts: ["Quincy Center", "Wollaston", "Marina Bay", "Squantum", "Germantown"],
    industries: ["healthcare", "financial back office", "retail", "marine"],
    anchor: "the Quincy Center redevelopment and Marina Bay",
    profile: "suburb",
    communities: ["other", "hisp"],
    note: {
      en: "Quincy's Asian business corridor along Hancock Street is one of the fastest-growing in the state, and the Red Line puts every one of those customers 20 minutes from downtown Boston — competition for their attention is fierce.",
      pt: "O corredor comercial asiático da Hancock Street é um dos que mais crescem no estado, e a Red Line coloca cada um desses clientes a 20 minutos do centro de Boston — a disputa pela atenção deles é dura.",
      es: "El corredor comercial asiatico de Hancock Street es de los que mas crecen del estado, y la Red Line pone a cada uno de esos clientes a 20 minutos del centro de Boston — la competencia por su atencion es feroz.",
    },
  },
  {
    name: "Lynn", slug: "lynn", population: 101253, county: "Essex",
    access: ["Route 1A", "Route 107", "Route 129", "the Newburyport/Rockport line"],
    districts: ["the Diamond District", "Downtown", "Wyoma", "East Lynn"],
    industries: ["aviation manufacturing", "healthcare", "construction trades", "food service"],
    anchor: "GE Aerospace's Lynn plant and Lynn Woods",
    profile: "mill",
    communities: ["hisp"],
    note: {
      en: "Lynn is majority Latino and its trades economy runs on referral, which is exactly the pattern automation multiplies: one satisfied Diamond District job turns into three when the review request goes out the same afternoon.",
      pt: "Lynn é majoritariamente latina e sua economia de serviços funciona por indicação — o padrão que a automação multiplica: um trabalho bem feito no Diamond District vira três quando o pedido de avaliação sai na mesma tarde.",
      es: "Lynn es mayoritariamente latina y su economia de oficios funciona por referencia — justo el patron que la automatizacion multiplica: un trabajo bien hecho en el Diamond District se vuelve tres cuando la solicitud de resena sale esa misma tarde.",
    },
  },
  {
    name: "Fall River", slug: "fall-river", population: 93885, county: "Bristol",
    access: ["I-195", "Route 24", "Route 79", "the Braga Bridge"],
    districts: ["the Flint", "Corky Row", "the Highlands", "Maplewood"],
    industries: ["light manufacturing", "healthcare", "logistics", "food service"],
    anchor: "Battleship Cove and the Route 24 distribution corridor",
    profile: "mill",
    communities: ["pt", "hisp"],
    note: {
      en: "Fall River has the largest Portuguese-ancestry population of any US city, and in the Flint a business that texts in Portuguese isn't a nice touch — it's the difference between getting the call back and not.",
      pt: "Fall River tem a maior população de ascendência portuguesa dos Estados Unidos, e no Flint um negócio que manda mensagem em português não está sendo gentil — está sendo o que decide se o cliente retorna ou não.",
      es: "Fall River tiene la mayor poblacion de ascendencia portuguesa de EE.UU., y en el Flint un negocio que escribe en portugues no esta siendo amable — esta decidiendo si el cliente devuelve la llamada o no.",
    },
  },
  {
    name: "Newton", slug: "newton", population: 88923, county: "Middlesex",
    access: ["the Mass Pike", "Route 9", "Route 128", "the Green Line D branch"],
    districts: ["Newton Centre", "Newtonville", "West Newton", "Auburndale", "Nonantum"],
    industries: ["professional services", "healthcare", "education", "home renovation"],
    anchor: "Newton-Wellesley Hospital and the thirteen village centers",
    profile: "suburb",
    note: {
      en: "Newton's thirteen villages behave like thirteen separate markets, and its homeowners renovate on a schedule — a contractor with a follow-up sequence keeps the kitchen client through the bathroom job two years later.",
      pt: "As treze vilas de Newton se comportam como treze mercados separados, e o morador daqui reforma com regularidade — um contractor com sequência de follow-up mantém o cliente da cozinha até o banheiro, dois anos depois.",
      es: "Las trece villas de Newton funcionan como trece mercados distintos, y sus propietarios renuevan con regularidad — un contratista con secuencia de seguimiento conserva al cliente de la cocina hasta el bano, dos anos despues.",
    },
  },
  {
    name: "Lawrence", slug: "lawrence", population: 89143, county: "Essex",
    access: ["I-495", "I-93", "Route 114", "the Haverhill line"],
    districts: ["Tower Hill", "South Lawrence", "the Arlington District", "Prospect Hill"],
    industries: ["light manufacturing", "food service", "construction trades", "logistics"],
    anchor: "the Merrimack River mill complex and Lawrence General Hospital",
    profile: "mill",
    communities: ["hisp"],
    note: {
      en: "Lawrence is roughly 80% Latino and home to the largest Dominican community in New England — a Spanish-first CRM here isn't a translation layer, it's the primary interface for the whole customer base.",
      pt: "Lawrence é cerca de 80% latina e abriga a maior comunidade dominicana da Nova Inglaterra — aqui um CRM em espanhol não é uma camada de tradução, é a interface principal de toda a base de clientes.",
      es: "Lawrence es cerca del 80% latina y alberga la mayor comunidad dominicana de Nueva Inglaterra — aqui un CRM en espanol no es una capa de traduccion, es la interfaz principal de toda la base de clientes.",
    },
  },
  {
    name: "Somerville", slug: "somerville", population: 81045, county: "Middlesex",
    access: ["I-93", "Route 28", "Route 38", "the Green Line Extension and Red Line at Davis"],
    districts: ["Davis Square", "Union Square", "Assembly Row", "Ball Square", "Winter Hill"],
    industries: ["biotech", "food and beverage", "creative services", "hospitality"],
    anchor: "Assembly Row and the Union Square innovation district",
    profile: "tech",
    communities: ["br", "hisp"],
    note: {
      en: "Somerville turned over fast: East Somerville still has the Brazilian contractors and cleaners who built the city, while Assembly Row brought tenants who expect to book everything online — the businesses that win serve both.",
      pt: "Somerville virou rápido: o East Somerville ainda tem os contractors e as diaristas brasileiras que construíram a cidade, enquanto o Assembly Row trouxe moradores que esperam agendar tudo online — quem ganha atende os dois.",
      es: "Somerville cambio rapido: East Somerville aun tiene a los contratistas y limpiadoras brasilenos que construyeron la ciudad, mientras Assembly Row trajo residentes que esperan reservar todo online — gana quien atiende a ambos.",
    },
  },
  {
    name: "Framingham", slug: "framingham", population: 72032, county: "Middlesex",
    access: ["the Mass Pike", "Route 9", "Route 30", "Route 126", "the Framingham/Worcester line"],
    districts: ["Downtown", "Nobscot", "Saxonville", "Framingham Centre"],
    industries: ["retail", "healthcare", "cleaning and home services", "staffing", "restaurants"],
    anchor: "the Route 9 commercial corridor and MetroWest Medical Center",
    profile: "retail",
    communities: ["br", "hisp"],
    note: {
      en: "Framingham holds the largest Brazilian community in Massachusetts, and its downtown is effectively a Portuguese-language business district — cleaning companies, contractors, restaurants and agencies all competing for the same referral network.",
      pt: "Framingham concentra a maior comunidade brasileira de Massachusetts, e o centro é na prática um distrito comercial de língua portuguesa — empresas de limpeza, contractors, restaurantes e agências disputando a mesma rede de indicação.",
      es: "Framingham concentra la mayor comunidad brasilena de Massachusetts, y su centro es en la practica un distrito comercial en portugues — empresas de limpieza, contratistas, restaurantes y agencias compitiendo por la misma red de referencias.",
    },
  },
  {
    name: "Haverhill", slug: "haverhill", population: 67835, county: "Essex",
    access: ["I-495", "Route 97", "Route 110", "the Haverhill line"],
    districts: ["Bradford", "Downtown", "Riverside", "Mount Washington"],
    industries: ["healthcare", "distribution", "light manufacturing", "construction trades"],
    anchor: "the restored Merrimack riverfront mill district",
    profile: "mill",
    communities: ["hisp"],
    note: {
      en: "Haverhill's mill conversions pulled in younger renters who book by phone almost never — a trades business here loses work simply by not having a booking link, regardless of how good the crew is.",
      pt: "As conversões de fábrica em Haverhill trouxeram inquilinos jovens que praticamente não agendam por telefone — aqui um prestador perde trabalho só por não ter link de agendamento, por melhor que seja a equipe.",
      es: "Las conversiones de fabricas en Haverhill atrajeron inquilinos jovenes que casi nunca reservan por telefono — aqui un oficio pierde trabajo solo por no tener enlace de reserva, por buena que sea la cuadrilla.",
    },
  },
  {
    name: "Waltham", slug: "waltham", population: 62227, county: "Middlesex",
    access: ["Route 128/I-95", "Route 20", "Route 117", "the Fitchburg line"],
    districts: ["Moody Street", "Prospect Hill", "Cedarwood", "Bleachery"],
    industries: ["biotech", "higher education", "corporate services", "restaurants"],
    anchor: "the Route 128 corporate corridor, Brandeis and Bentley",
    profile: "tech",
    communities: ["hisp", "br"],
    note: {
      en: "Moody Street is one of the densest restaurant strips in MetroWest and the 128 office parks feed it every weekday — the operators who capture that lunch traffic into a list are the ones still full in February.",
      pt: "A Moody Street é uma das ruas com mais restaurantes do MetroWest e os escritórios da 128 a abastecem todo dia útil — quem transforma esse fluxo de almoço em lista é quem continua cheio em fevereiro.",
      es: "Moody Street es de las calles con mas restaurantes de MetroWest y las oficinas de la 128 la alimentan cada dia laboral — quien convierte ese flujo de almuerzo en una lista es quien sigue lleno en febrero.",
    },
  },
  {
    name: "Malden", slug: "malden", population: 66263, county: "Middlesex",
    access: ["Route 1", "I-93", "Route 60", "the Orange Line at Malden Center"],
    districts: ["Malden Center", "Edgeworth", "Maplewood", "Linden"],
    industries: ["healthcare", "retail", "food service", "home services"],
    anchor: "Malden Center and the Orange Line terminus",
    profile: "suburb",
    communities: ["other", "br", "hisp"],
    note: {
      en: "Malden is one of the most linguistically diverse cities in Massachusetts, with Chinese, Brazilian and Haitian business owners often on the same block — the operators who quote in the customer's language close noticeably more.",
      pt: "Malden é uma das cidades mais diversas linguisticamente de Massachusetts, com donos chineses, brasileiros e haitianos muitas vezes no mesmo quarteirão — quem orça no idioma do cliente fecha visivelmente mais.",
      es: "Malden es de las ciudades mas diversas linguisticamente de Massachusetts, con duenos chinos, brasilenos y haitianos a menudo en la misma cuadra — quien cotiza en el idioma del cliente cierra notablemente mas.",
    },
  },
  {
    name: "Brookline", slug: "brookline", population: 63191, county: "Norfolk",
    access: ["Route 9", "the Green Line C and D branches", "Beacon Street"],
    districts: ["Coolidge Corner", "Brookline Village", "Washington Square", "Chestnut Hill"],
    industries: ["healthcare", "professional services", "specialty retail", "home renovation"],
    anchor: "Coolidge Corner and the Longwood medical corridor next door",
    profile: "suburb",
    note: {
      en: "Brookline homeowners research thoroughly before they call, so the business that already has answers published — pricing ranges, process, timeline — is usually the only one that gets contacted.",
      pt: "O morador de Brookline pesquisa antes de ligar, então quem já publicou as respostas — faixa de preço, processo, prazo — costuma ser o único a receber o contato.",
      es: "El residente de Brookline investiga antes de llamar, asi que quien ya publico las respuestas — rango de precio, proceso, plazo — suele ser el unico que recibe el contacto.",
    },
  },
  {
    name: "Plymouth", slug: "plymouth", population: 61217, county: "Plymouth",
    access: ["Route 3", "Route 44", "Route 3A", "the Kingston/Plymouth line"],
    districts: ["the Waterfront", "Manomet", "Cedarville", "North Plymouth"],
    industries: ["tourism", "marine trades", "construction", "hospitality"],
    anchor: "the historic waterfront and Plymouth Harbor",
    profile: "resort",
    note: {
      en: "Plymouth is the largest town in Massachusetts by land area, which means a trades crew can burn an hour crossing from Cedarville to North Plymouth — routing and confirmed appointments matter more here than almost anywhere.",
      pt: "Plymouth é o maior município de Massachusetts em área, o que significa que uma equipe pode gastar uma hora indo de Cedarville a North Plymouth — roteirização e agendamento confirmado pesam mais aqui do que em quase qualquer lugar.",
      es: "Plymouth es el municipio mas extenso de Massachusetts, asi que una cuadrilla puede perder una hora cruzando de Cedarville a North Plymouth — la ruta y la cita confirmada pesan aqui mas que en casi ningun otro sitio.",
    },
  },
  {
    name: "Medford", slug: "medford", population: 59450, county: "Middlesex",
    access: ["I-93", "Route 16", "Route 60", "the Green Line Extension at Medford/Tufts"],
    districts: ["Medford Square", "West Medford", "Wellington", "Hillside"],
    industries: ["higher education", "healthcare", "home services", "restaurants"],
    anchor: "Tufts University and the Mystic River corridor",
    profile: "college",
    communities: ["br", "hisp"],
    note: {
      en: "The Green Line Extension reset Medford's market overnight: property values moved, renovation demand followed, and the Brazilian trades who have worked these streets for twenty years are now bidding against Boston firms.",
      pt: "A extensão da Green Line mudou o mercado de Medford da noite para o dia: o valor dos imóveis subiu, a demanda por reforma veio atrás, e os prestadores brasileiros que trabalham nessas ruas há vinte anos agora disputam com empresas de Boston.",
      es: "La extension de la Green Line cambio el mercado de Medford de un dia para otro: subieron los valores, siguio la demanda de renovacion, y los oficios brasilenos que llevan veinte anos en estas calles ahora compiten con firmas de Boston.",
    },
  },
  {
    name: "Taunton", slug: "taunton", population: 59365, county: "Bristol",
    access: ["Route 24", "Route 44", "Route 140", "I-495", "the South Coast Rail line"],
    districts: ["Taunton Green", "Weir Village", "Oakland", "East Taunton"],
    industries: ["logistics", "light manufacturing", "healthcare", "construction trades"],
    anchor: "Taunton Green and the Route 24 industrial corridor",
    profile: "industrial",
    communities: ["pt", "hisp"],
    note: {
      en: "Taunton sits at the crossroads of Route 24 and I-495, so its contractors routinely work three counties in a week — without a shared pipeline, the jobs that get forgotten are the ones farthest from the shop.",
      pt: "Taunton fica no cruzamento da Route 24 com a I-495, então seus contractors trabalham três condados numa semana — sem um pipeline compartilhado, os jobs esquecidos são justamente os mais distantes da oficina.",
      es: "Taunton esta en el cruce de la Route 24 con la I-495, asi que sus contratistas trabajan tres condados en una semana — sin un pipeline compartido, los trabajos olvidados son los mas lejanos al taller.",
    },
  },
  {
    name: "Chicopee", slug: "chicopee", population: 55126, county: "Hampden",
    access: ["the Mass Pike", "I-391", "Route 33", "Route 116"],
    districts: ["Chicopee Falls", "Willimansett", "Aldenville", "Fairview"],
    industries: ["manufacturing", "distribution", "defense", "food service"],
    anchor: "Westover Air Reserve Base and the Chicopee River mills",
    profile: "industrial",
    communities: ["hisp"],
    note: {
      en: "Westover keeps a steady base of military households in Chicopee — customers who relocate on orders, book on short notice and pay on time, but who will never wait two days for a callback.",
      pt: "A base de Westover mantém em Chicopee um fluxo constante de famílias militares — clientes que se mudam por ordem de transferência, agendam em cima da hora e pagam em dia, mas que não esperam dois dias por um retorno.",
      es: "La base de Westover mantiene en Chicopee un flujo constante de familias militares — clientes que se mudan por orden, reservan con poca antelacion y pagan a tiempo, pero que no esperan dos dias por una respuesta.",
    },
  },
  {
    name: "Weymouth", slug: "weymouth", population: 57746, county: "Norfolk",
    access: ["Route 3", "Route 18", "Route 53", "the Greenbush line"],
    districts: ["Weymouth Landing", "Columbian Square", "Jackson Square", "North Weymouth"],
    industries: ["healthcare", "retail", "construction trades", "marine"],
    anchor: "South Shore Health and the Union Point redevelopment",
    profile: "suburb",
    note: {
      en: "South Shore Health is the largest employer south of Boston and its shift workers drive Weymouth's demand curve — service businesses that only answer nine-to-five are invisible to half the town.",
      pt: "O South Shore Health é o maior empregador ao sul de Boston e seus plantonistas ditam a curva de demanda de Weymouth — quem só atende em horário comercial é invisível para metade da cidade.",
      es: "South Shore Health es el mayor empleador al sur de Boston y sus turnos marcan la curva de demanda de Weymouth — quien solo atiende en horario de oficina es invisible para media ciudad.",
    },
  },
  {
    name: "Revere", slug: "revere", population: 62186, county: "Suffolk",
    access: ["Route 1A", "Route 16", "Route 60", "the Blue Line at Wonderland and Revere Beach"],
    districts: ["Revere Beach", "Beachmont", "Point of Pines", "Shirley Ave"],
    industries: ["hospitality", "retail", "home services", "construction trades"],
    anchor: "Revere Beach, the oldest public beach in the United States",
    profile: "suburb",
    communities: ["br", "hisp", "other"],
    note: {
      en: "Shirley Ave is one of the most concentrated immigrant business strips in Greater Boston — Brazilian, Moroccan and Central American owners side by side, most of them running the whole operation off one phone.",
      pt: "A Shirley Ave é uma das ruas comerciais de imigrantes mais concentradas da Grande Boston — donos brasileiros, marroquinos e centro-americanos lado a lado, a maioria tocando a operação inteira de um celular só.",
      es: "Shirley Ave es de las calles comerciales de inmigrantes mas concentradas del Gran Boston — duenos brasilenos, marroquies y centroamericanos uno al lado del otro, la mayoria manejando todo desde un solo telefono.",
    },
  },
  {
    name: "Peabody", slug: "peabody", population: 54251, county: "Essex",
    access: ["Route 128", "Route 1", "Route 114", "Route 95"],
    districts: ["Peabody Square", "West Peabody", "South Peabody", "the Tannery district"],
    industries: ["retail", "leather goods manufacturing", "healthcare", "professional services"],
    anchor: "the Northshore Mall and the Centennial Park office district",
    profile: "retail",
    note: {
      en: "The Northshore Mall pulls shoppers from a dozen towns into Peabody, which is why local service businesses here compete on convenience — the one that offers same-week booking usually beats the one that offers a better price.",
      pt: "O Northshore Mall puxa consumidores de uma dúzia de cidades para Peabody, e é por isso que o negócio local aqui compete em conveniência — quem oferece agendamento na mesma semana costuma ganhar de quem oferece preço melhor.",
      es: "El Northshore Mall atrae compradores de una docena de pueblos a Peabody, por eso el negocio local aqui compite en conveniencia — quien ofrece cita en la misma semana suele ganarle a quien ofrece mejor precio.",
    },
  },
  {
    name: "Methuen", slug: "methuen", population: 50706, county: "Essex",
    access: ["I-93", "I-495", "Route 110", "Route 213"],
    districts: ["Methuen Center", "Marsh Corner", "the Loop"],
    industries: ["retail", "healthcare", "construction trades", "logistics"],
    anchor: "the Loop retail center at the I-93/I-495 interchange",
    profile: "retail",
    communities: ["hisp"],
    note: {
      en: "Methuen sits between Lawrence and the New Hampshire line, so its trades quote across a tax border every week — the ones with clean, fast estimates win the New Hampshire jobs that others take too long to price.",
      pt: "Methuen fica entre Lawrence e a divisa de New Hampshire, então seus prestadores orçam cruzando fronteira fiscal toda semana — quem tem orçamento rápido e limpo ganha os jobs de New Hampshire que os outros demoram a precificar.",
      es: "Methuen esta entre Lawrence y la linea de New Hampshire, asi que sus oficios cotizan cruzando frontera fiscal cada semana — quien tiene presupuestos rapidos y claros gana los trabajos que otros tardan en cotizar.",
    },
  },
  {
    name: "Barnstable", slug: "barnstable", population: 44641, county: "Barnstable",
    access: ["Route 6", "Route 28", "Route 132", "Route 6A"],
    districts: ["Hyannis", "Osterville", "Centerville", "Marstons Mills", "Cotuit"],
    industries: ["tourism", "healthcare", "marine trades", "seasonal construction"],
    anchor: "Hyannis, the commercial capital of Cape Cod, and Cape Cod Hospital",
    profile: "resort",
    note: {
      en: "Barnstable's seven villages make it the Cape's commercial center, and the season is brutal: a contractor books a year of revenue between April and September, so a lead lost in May is not recoverable in November.",
      pt: "As sete vilas de Barnstable fazem dela o centro comercial do Cape, e a temporada é impiedosa: o contractor fatura o ano inteiro entre abril e setembro, então lead perdido em maio não se recupera em novembro.",
      es: "Las siete villas de Barnstable la convierten en el centro comercial del Cape, y la temporada es brutal: un contratista factura el ano entre abril y septiembre, asi que un lead perdido en mayo no se recupera en noviembre.",
    },
  },
  {
    name: "Pittsfield", slug: "pittsfield", population: 42514, county: "Berkshire",
    access: ["Route 7", "Route 8", "Route 9", "Route 20"],
    districts: ["Downtown", "Morningside", "the West Side", "Coltsville"],
    industries: ["healthcare", "plastics manufacturing", "arts and culture", "tourism"],
    anchor: "Berkshire Medical Center and the Colonial Theatre arts district",
    profile: "regional",
    note: {
      en: "Pittsfield is the only real commercial center in the Berkshires, so its businesses serve a 40-mile radius with almost no local competition — but also almost no walk-in traffic, which makes online presence the entire funnel.",
      pt: "Pittsfield é o único centro comercial de verdade nos Berkshires, então seus negócios atendem um raio de 60 km quase sem concorrência local — mas também quase sem tráfego de rua, o que faz da presença online o funil inteiro.",
      es: "Pittsfield es el unico centro comercial real de los Berkshires, asi que sus negocios atienden un radio de 60 km casi sin competencia local — pero tambien casi sin trafico peatonal, lo que hace de la presencia online todo el embudo.",
    },
  },
  {
    name: "Attleboro", slug: "attleboro", population: 45237, county: "Bristol",
    access: ["I-95", "Route 1A", "Route 123", "the Providence/Stoughton line"],
    districts: ["Downtown", "South Attleboro", "Hebronville", "Dodgeville"],
    industries: ["jewelry manufacturing", "healthcare", "logistics", "construction trades"],
    anchor: "the historic jewelry district and Capron Park",
    profile: "industrial",
    communities: ["pt", "hisp"],
    note: {
      en: "Attleboro built its economy on jewelry manufacturing and still runs on precision small shops — owners who are excellent at the craft and, almost without exception, have no system tracking who called last week.",
      pt: "Attleboro construiu sua economia na joalheria e ainda funciona à base de pequenas oficinas de precisão — donos excelentes no ofício e que, quase sem exceção, não têm sistema nenhum registrando quem ligou semana passada.",
      es: "Attleboro construyo su economia en la joyeria y aun funciona con pequenos talleres de precision — duenos excelentes en el oficio que, casi sin excepcion, no tienen sistema alguno que registre quien llamo la semana pasada.",
    },
  },
  {
    name: "Arlington", slug: "arlington", population: 46308, county: "Middlesex",
    access: ["Route 2", "Route 60", "Route 3", "the Minuteman Bikeway"],
    districts: ["Arlington Center", "Arlington Heights", "East Arlington", "Brattle Square"],
    industries: ["professional services", "home renovation", "retail", "healthcare"],
    anchor: "the Minuteman Bikeway and Arlington Center",
    profile: "suburb",
    note: {
      en: "Arlington has almost no commercial zoning and a housing stock built before 1940, which produces a steady renovation market — and homeowners who compare three quotes and pick the one that arrived first with real detail.",
      pt: "Arlington tem quase nenhuma zona comercial e um parque habitacional anterior a 1940, o que gera um mercado constante de reforma — com moradores que comparam três orçamentos e escolhem o que chegou primeiro e com detalhe de verdade.",
      es: "Arlington casi no tiene zona comercial y un parque de viviendas anterior a 1940, lo que genera un mercado constante de renovacion — con propietarios que comparan tres presupuestos y eligen el que llego primero y con detalle real.",
    },
  },
  {
    name: "Everett", slug: "everett", population: 49075, county: "Middlesex",
    access: ["Route 16", "Route 99", "Route 1", "the Silver Line to Chelsea"],
    districts: ["Everett Square", "Glendale", "the Village", "Lower Broadway"],
    industries: ["hospitality", "logistics", "construction trades", "food service"],
    anchor: "Encore Boston Harbor and the Lower Broadway industrial corridor",
    profile: "industrial",
    communities: ["br", "hisp", "other"],
    note: {
      en: "Encore reshaped Everett's labor market and its rents at the same time, and the Brazilian and Haitian trades who built Lower Broadway now compete for the same jobs as crews coming in from three towns over.",
      pt: "O Encore reconfigurou ao mesmo tempo o mercado de trabalho e os aluguéis de Everett, e os prestadores brasileiros e haitianos que ergueram a Lower Broadway agora disputam os mesmos jobs com equipes de três cidades de distância.",
      es: "Encore reconfiguro a la vez el mercado laboral y los alquileres de Everett, y los oficios brasilenos y haitianos que levantaron Lower Broadway ahora compiten por los mismos trabajos con cuadrillas de tres pueblos mas alla.",
    },
  },
  {
    name: "Salem", slug: "salem", population: 44480, county: "Essex",
    access: ["Route 114", "Route 1A", "Route 107", "the Newburyport/Rockport line"],
    districts: ["Downtown", "the Point", "Salem Willows", "North Salem"],
    industries: ["tourism", "healthcare", "higher education", "hospitality"],
    anchor: "the Essex Street pedestrian mall and Salem State University",
    profile: "resort",
    communities: ["hisp"],
    note: {
      en: "October alone can be a third of the annual revenue for a Salem business, which means the whole year is decided by how well the off-season list was built — and most operators never build one.",
      pt: "Só outubro pode ser um terço do faturamento anual de um negócio em Salem, o que significa que o ano inteiro se decide pela lista construída fora de temporada — e a maioria nunca constrói uma.",
      es: "Solo octubre puede ser un tercio de la facturacion anual de un negocio en Salem, lo que significa que el ano entero se decide por la lista construida fuera de temporada — y la mayoria nunca la construye.",
    },
  },
  {
    name: "Westfield", slug: "westfield", population: 41204, county: "Hampden",
    access: ["the Mass Pike", "Route 20", "Route 10", "Route 202"],
    districts: ["Downtown", "Wyben", "Little River"],
    industries: ["manufacturing", "higher education", "aviation", "agriculture"],
    anchor: "Barnes Regional Airport and Westfield State University",
    profile: "industrial",
    note: {
      en: "Westfield's Mass Pike exit makes it the logistics door to the Pioneer Valley, and its manufacturers sell B2B on long cycles — the deals are won by whoever still follows up in month four.",
      pt: "A saída da Mass Pike faz de Westfield a porta logística do Pioneer Valley, e seus fabricantes vendem B2B em ciclos longos — o negócio fica com quem ainda está fazendo follow-up no quarto mês.",
      es: "La salida de la Mass Pike hace de Westfield la puerta logistica del Pioneer Valley, y sus fabricantes venden B2B en ciclos largos — el negocio queda con quien sigue haciendo seguimiento en el cuarto mes.",
    },
  },
  {
    name: "Leominster", slug: "leominster", population: 43782, county: "Worcester",
    access: ["Route 2", "Route 12", "Route 117", "I-190", "the Fitchburg line"],
    districts: ["Downtown", "North Leominster", "French Hill"],
    industries: ["plastics manufacturing", "retail", "healthcare", "construction trades"],
    anchor: "the Mall at Whitney Field and the plastics industry that named the city",
    profile: "industrial",
    communities: ["hisp"],
    note: {
      en: "Known as the Pioneer Plastics City, Leominster still has dozens of family molding shops — second-generation owners inheriting a customer list that lives in a filing cabinet and a founder's memory.",
      pt: "Conhecida como Pioneer Plastics City, Leominster ainda tem dezenas de moldarias familiares — donos de segunda geração herdando uma carteira de clientes que mora num arquivo de aço e na memória do fundador.",
      es: "Conocida como Pioneer Plastics City, Leominster aun tiene decenas de talleres familiares de moldeo — duenos de segunda generacion heredando una cartera de clientes que vive en un archivador y en la memoria del fundador.",
    },
  },
  {
    name: "Fitchburg", slug: "fitchburg", population: 40790, county: "Worcester",
    access: ["Route 2", "Route 12", "Route 31", "the Fitchburg line terminus"],
    districts: ["Downtown", "Cleghorn", "South Fitchburg", "West Fitchburg"],
    industries: ["higher education", "healthcare", "manufacturing", "construction trades"],
    anchor: "Fitchburg State University and the Nashua River mill corridor",
    profile: "college",
    communities: ["hisp"],
    note: {
      en: "Fitchburg is the end of the commuter line, which keeps costs low and brings a steady inflow of first-time homeowners — buyers who need a contractor and have no idea who to call, so whoever ranks gets the job.",
      pt: "Fitchburg é o fim da linha do trem, o que mantém o custo baixo e traz um fluxo constante de gente comprando a primeira casa — compradores que precisam de contractor e não sabem a quem ligar, então quem ranqueia leva o serviço.",
      es: "Fitchburg es el final de la linea de tren, lo que mantiene bajos los costos y trae un flujo constante de compradores primerizos — gente que necesita un contratista y no sabe a quien llamar, asi que quien posiciona se lleva el trabajo.",
    },
  },
  {
    name: "Beverly", slug: "beverly", population: 42062, county: "Essex",
    access: ["Route 128", "Route 1A", "Route 62", "the Newburyport/Rockport line"],
    districts: ["Beverly Farms", "Montserrat", "North Beverly", "Ryal Side"],
    industries: ["healthcare", "higher education", "marine trades", "professional services"],
    anchor: "Beverly Hospital, Endicott College and Beverly Harbor",
    profile: "suburb",
    note: {
      en: "Beverly splits sharply between the working harbor and the estates of Beverly Farms, and a service business that prices both the same loses one of them — usually the more profitable one.",
      pt: "Beverly se divide claramente entre o porto de trabalho e as propriedades de Beverly Farms, e quem precifica os dois igual perde um deles — em geral o mais lucrativo.",
      es: "Beverly se divide netamente entre el puerto de trabajo y las fincas de Beverly Farms, y quien cotiza igual para ambos pierde uno — normalmente el mas rentable.",
    },
  },
  {
    name: "Holyoke", slug: "holyoke", population: 38280, county: "Hampden",
    access: ["I-91", "Route 5", "Route 202", "Route 116"],
    districts: ["the Flats", "Churchill", "the Highlands", "Ingleside"],
    industries: ["healthcare", "green energy", "light manufacturing", "food service"],
    anchor: "the Holyoke Canal System and Holyoke Gas & Electric's low-cost hydropower",
    profile: "mill",
    communities: ["hisp"],
    note: {
      en: "Holyoke has the highest per-capita Puerto Rican population in the mainland United States, and its cheap hydropower keeps drawing small manufacturers — two very different customer bases that most local businesses only serve one of.",
      pt: "Holyoke tem a maior população porto-riquenha per capita dos Estados Unidos continentais, e sua energia hidrelétrica barata segue atraindo pequenos fabricantes — duas bases de clientes muito diferentes, e a maioria dos negócios locais só atende uma.",
      es: "Holyoke tiene la mayor poblacion puertorriquena per capita de EE.UU. continental, y su hidroelectrica barata sigue atrayendo pequenos fabricantes — dos bases de clientes muy distintas, y la mayoria de los negocios locales solo atiende una.",
    },
  },
  {
    name: "Marlborough", slug: "marlborough", population: 41793, county: "Middlesex",
    access: ["I-495", "Route 20", "Route 85", "Route 9 via Northborough"],
    districts: ["Downtown Main Street", "French Hill", "Marlborough Hills", "Indian Head"],
    industries: ["technology", "life sciences", "manufacturing", "home services", "restaurants"],
    anchor: "the I-495 technology corridor and the Downtown Main Street district",
    profile: "tech",
    communities: ["br", "hisp"],
    note: {
      en: "Marlborough is where Bee Pro Hub is based, and the split here is stark: corporate campuses on the I-495 side, and a Main Street of Brazilian-owned restaurants, cleaners and contractors on the other — we built the platform for the second group.",
      pt: "Marlborough é onde fica a sede do Bee Pro Hub, e o contraste aqui é claro: campi corporativos do lado da I-495 e uma Main Street de restaurantes, empresas de limpeza e contractors brasileiros do outro — a plataforma foi feita para o segundo grupo.",
      es: "Marlborough es donde esta la sede de Bee Pro Hub, y el contraste aqui es nitido: campus corporativos del lado de la I-495 y una Main Street de restaurantes, limpiezas y contratistas brasilenos del otro — la plataforma se hizo para el segundo grupo.",
    },
  },
  {
    name: "Woburn", slug: "woburn", population: 40228, county: "Middlesex",
    access: ["I-93", "I-95/Route 128", "Route 38", "the Anderson Regional Transportation Center"],
    districts: ["Woburn Center", "North Woburn", "Four Corners", "Cummings Park"],
    industries: ["distribution", "biotech", "retail", "professional services"],
    anchor: "the I-93/I-95 interchange and Cummings Park",
    profile: "industrial",
    note: {
      en: "Woburn sits at the intersection of two interstates, which made it a distribution hub and gives its service businesses an unusual advantage: a crew based here can reach forty towns before traffic builds.",
      pt: "Woburn fica no cruzamento de duas interestaduais, o que a tornou um polo de distribuição e dá aos negócios de serviço daqui uma vantagem incomum: uma equipe baseada aqui alcança quarenta cidades antes do trânsito engarrafar.",
      es: "Woburn esta en el cruce de dos interestatales, lo que la hizo un polo de distribucion y da a sus negocios de servicios una ventaja inusual: una cuadrilla con base aqui llega a cuarenta pueblos antes de que se forme el trafico.",
    },
  },
  {
    name: "Chelsea", slug: "chelsea", population: 40787, county: "Suffolk",
    access: ["Route 1", "the Tobin Bridge", "Route 16", "the Silver Line"],
    districts: ["Bellingham Square", "Prattville", "Admirals Hill", "Broadway"],
    industries: ["food distribution", "logistics", "construction trades", "food service"],
    anchor: "the New England Produce Center, which supplies most of the region's restaurants",
    profile: "industrial",
    communities: ["hisp"],
    note: {
      en: "Roughly two thirds of Chelsea is Latino and the produce market runs before dawn, so the businesses here operate on hours no nine-to-five competitor covers — the ones with automated after-hours response own that window.",
      pt: "Cerca de dois terços de Chelsea é latina e o mercado de hortifrúti opera antes do amanhecer, então os negócios daqui funcionam em horários que nenhum concorrente de horário comercial cobre — quem tem resposta automática fora do horário domina essa janela.",
      es: "Cerca de dos tercios de Chelsea es latina y el mercado de productos opera antes del amanecer, asi que los negocios de aqui funcionan en horarios que ningun competidor de oficina cubre — quien tiene respuesta automatica fuera de horario domina esa ventana.",
    },
  },
  {
    name: "Braintree", slug: "braintree", population: 39867, county: "Norfolk",
    access: ["I-93", "Route 3", "Route 37", "the Red Line terminus at Braintree"],
    districts: ["Braintree Highlands", "South Braintree", "East Braintree", "Weymouth Landing"],
    industries: ["retail", "healthcare", "professional services", "construction trades"],
    anchor: "South Shore Plaza, the second-largest mall in New England",
    profile: "retail",
    note: {
      en: "The Red Line terminus and South Shore Plaza make Braintree the funnel point for the whole South Shore — every competitor from Quincy to Plymouth is bidding on the same customers here.",
      pt: "O fim da Red Line e o South Shore Plaza fazem de Braintree o ponto de funil de toda a South Shore — todo concorrente de Quincy a Plymouth está disputando os mesmos clientes aqui.",
      es: "El final de la Red Line y South Shore Plaza hacen de Braintree el punto de embudo de toda la South Shore — cada competidor de Quincy a Plymouth disputa los mismos clientes aqui.",
    },
  },
  {
    name: "Shrewsbury", slug: "shrewsbury", population: 38526, county: "Worcester",
    access: ["Route 9", "Route 20", "I-290", "Route 140"],
    districts: ["Shrewsbury Center", "Edgemere", "Lake View", "White City"],
    industries: ["healthcare", "retail", "professional services", "home renovation"],
    anchor: "Lake Quinsigamond and the UMass Chan Medical School campus nearby",
    profile: "suburb",
    communities: ["other"],
    note: {
      en: "Shrewsbury's fast-growing South Asian community reshaped Route 9 retail in a decade, and its households research heavily online before booking anything — reviews and clear pricing decide the shortlist.",
      pt: "A comunidade sul-asiática em rápido crescimento reconfigurou o varejo da Route 9 em uma década, e essas famílias pesquisam muito online antes de contratar qualquer coisa — avaliação e preço claro definem a lista curta.",
      es: "La comunidad surasiatica en rapido crecimiento reconfiguro el comercio de la Route 9 en una decada, y esos hogares investigan mucho online antes de contratar — resenas y precio claro definen la lista corta.",
    },
  },
  {
    name: "Dartmouth", slug: "dartmouth", population: 34477, county: "Bristol",
    access: ["I-195", "Route 6", "Route 177", "Route 88"],
    districts: ["North Dartmouth", "South Dartmouth", "Padanaram", "Smith Mills"],
    industries: ["higher education", "retail", "agriculture", "marine trades"],
    anchor: "UMass Dartmouth and Padanaram Harbor",
    profile: "college",
    communities: ["pt"],
    note: {
      en: "Dartmouth stretches from a university campus to working farms to a yacht harbor in fifteen minutes, and the Portuguese-speaking families who own much of that land are the core customer base for local trades.",
      pt: "Dartmouth vai de um campus universitário a fazendas em atividade e a um porto de iates em quinze minutos, e as famílias de língua portuguesa que possuem boa parte dessa terra são a base principal dos prestadores locais.",
      es: "Dartmouth va de un campus universitario a granjas en actividad y a un puerto de yates en quince minutos, y las familias lusohablantes que poseen buena parte de esa tierra son la base principal de los oficios locales.",
    },
  },
  {
    name: "Chelmsford", slug: "chelmsford", population: 35940, county: "Middlesex",
    access: ["Route 3", "I-495", "Route 110", "Route 129"],
    districts: ["Chelmsford Center", "North Chelmsford", "Westlands", "South Chelmsford"],
    industries: ["technology", "professional services", "healthcare", "home renovation"],
    anchor: "the Route 3 technology corridor between Boston and Nashua",
    profile: "tech",
    note: {
      en: "Chelmsford households mostly work in tech along Route 3, which means they expect a booking confirmation the second they submit a form — an hour of silence reads as a business that doesn't exist.",
      pt: "As famílias de Chelmsford trabalham majoritariamente em tecnologia ao longo da Route 3, o que significa que esperam confirmação no segundo em que enviam o formulário — uma hora de silêncio parece um negócio que não existe.",
      es: "Los hogares de Chelmsford trabajan mayormente en tecnologia a lo largo de la Route 3, asi que esperan confirmacion en el segundo en que envian el formulario — una hora de silencio parece un negocio que no existe.",
    },
  },
  {
    name: "Andover", slug: "andover", population: 36498, county: "Essex",
    access: ["I-93", "I-495", "Route 28", "Route 133", "the Haverhill line"],
    districts: ["Downtown", "Ballardvale", "Shawsheen Village", "West Andover"],
    industries: ["pharmaceutical manufacturing", "professional services", "education", "home renovation"],
    anchor: "Phillips Academy and the pharmaceutical campuses along I-93",
    profile: "suburb",
    note: {
      en: "Andover has one of the highest median incomes in Essex County and a homeowner base that renovates in large, planned projects — the contractor with a documented process beats the one with the lower number.",
      pt: "Andover tem uma das maiores rendas medianas do Essex County e moradores que reformam em projetos grandes e planejados — o contractor com processo documentado ganha de quem só tem o número mais baixo.",
      es: "Andover tiene de las rentas medianas mas altas del condado de Essex y propietarios que renuevan en proyectos grandes y planificados — el contratista con proceso documentado le gana al del numero mas bajo.",
    },
  },
  {
    name: "Natick", slug: "natick", population: 36504, county: "Middlesex",
    access: ["the Mass Pike", "Route 9", "Route 27", "Route 135", "the Framingham/Worcester line"],
    districts: ["Natick Center", "South Natick", "Felchville", "West Natick"],
    industries: ["retail", "defense research", "professional services", "restaurants"],
    anchor: "the Natick Mall and the US Army Natick Soldier Systems Center",
    profile: "retail",
    note: {
      en: "Natick Center rebuilt itself as a walkable downtown while Route 9 kept the mall traffic, so local businesses here have two entirely different funnels running at once and usually only measure one.",
      pt: "O Natick Center se reconstruiu como um centro caminhável enquanto a Route 9 manteve o fluxo do shopping, então o negócio local aqui tem dois funis completamente diferentes rodando ao mesmo tempo — e costuma medir só um.",
      es: "Natick Center se reconstruyo como un centro peatonal mientras la Route 9 conservaba el trafico del mall, asi que el negocio local aqui tiene dos embudos completamente distintos a la vez y suele medir solo uno.",
    },
  },
  {
    name: "Randolph", slug: "randolph", population: 34984, county: "Norfolk",
    access: ["Route 24", "Route 28", "Route 139", "I-93"],
    districts: ["Randolph Center", "North Randolph", "the Route 28 corridor"],
    industries: ["healthcare", "home care", "construction trades", "retail"],
    anchor: "the Route 28 commercial corridor",
    profile: "suburb",
    communities: ["other", "hisp"],
    note: {
      en: "Randolph is one of the most diverse towns in Massachusetts, with large Haitian and Cape Verdean communities running home care agencies and trades — businesses whose entire growth comes from word of mouth they never systematize.",
      pt: "Randolph é uma das cidades mais diversas de Massachusetts, com grandes comunidades haitiana e cabo-verdiana tocando agências de home care e prestadores — negócios cujo crescimento inteiro vem de um boca a boca que nunca é sistematizado.",
      es: "Randolph es de los pueblos mas diversos de Massachusetts, con grandes comunidades haitiana y caboverdiana operando agencias de cuidado en casa y oficios — negocios cuyo crecimiento viene de un boca a boca que nunca sistematizan.",
    },
  },
  {
    name: "Watertown", slug: "watertown", population: 35939, county: "Middlesex",
    access: ["Route 16", "Route 20", "Arsenal Street", "the Charles River path"],
    districts: ["Watertown Square", "East Watertown", "Coolidge Square", "Bemis"],
    industries: ["biotech", "retail", "professional services", "restaurants"],
    anchor: "Arsenal Yards and the biotech labs along Arsenal Street",
    profile: "tech",
    communities: ["other"],
    note: {
      en: "Watertown holds one of the largest Armenian communities in the country alongside a new biotech corridor, and businesses that serve both usually discover the older customer base is the more loyal one.",
      pt: "Watertown abriga uma das maiores comunidades armênias do país ao lado de um novo corredor de biotecnologia, e quem atende as duas costuma descobrir que a base de clientes mais antiga é a mais fiel.",
      es: "Watertown alberga una de las mayores comunidades armenias del pais junto a un nuevo corredor biotecnologico, y quien atiende a ambas suele descubrir que la base de clientes mas antigua es la mas fiel.",
    },
  },
  {
    name: "Franklin", slug: "franklin", population: 34087, county: "Norfolk",
    access: ["I-495", "Route 140", "Route 126", "the Franklin line"],
    districts: ["Downtown", "Unionville", "Franklin Center"],
    industries: ["light manufacturing", "higher education", "professional services", "construction trades"],
    anchor: "Dean College and the I-495 manufacturing corridor",
    profile: "suburb",
    note: {
      en: "Franklin sits at the far edge of the commuter belt, so its residents pick local providers over Boston ones almost by default — the town's businesses lose more work to each other than to outside competition.",
      pt: "Franklin fica na borda do cinturão de commuters, então seus moradores escolhem prestadores locais em vez dos de Boston quase por padrão — os negócios da cidade perdem mais trabalho uns para os outros do que para fora.",
      es: "Franklin esta en el borde del cinturon de commuters, asi que sus residentes eligen proveedores locales sobre los de Boston casi por defecto — los negocios del pueblo pierden mas trabajo entre si que ante la competencia externa.",
    },
  },
  {
    name: "Needham", slug: "needham", population: 31388, county: "Norfolk",
    access: ["Route 128/I-95", "Route 135", "Route 9", "the Needham line"],
    districts: ["Needham Center", "Needham Heights", "Birds Hill", "Charles River Village"],
    industries: ["technology", "healthcare", "professional services", "home renovation"],
    anchor: "the New England Business Center and Beth Israel Deaconess Needham",
    profile: "tech",
    note: {
      en: "Needham's office parks put a dense B2B market inside a residential town, which gives local service businesses a rare double market — most only ever sell to one side of the street.",
      pt: "Os parques de escritórios de Needham colocam um mercado B2B denso dentro de uma cidade residencial, o que dá aos negócios locais um mercado duplo raro — a maioria só vende para um lado da rua.",
      es: "Los parques de oficinas de Needham ponen un mercado B2B denso dentro de un pueblo residencial, lo que da a los negocios locales un doble mercado poco comun — la mayoria solo vende a un lado de la calle.",
    },
  },
  {
    name: "Northampton", slug: "northampton", population: 28549, county: "Hampshire",
    access: ["I-91", "Route 9", "Route 5", "Route 10"],
    districts: ["Downtown", "Florence", "Leeds", "Bay State"],
    industries: ["higher education", "arts and culture", "healthcare", "hospitality"],
    anchor: "Smith College and the Main Street arts district",
    profile: "college",
    note: {
      en: "Northampton's Main Street is one of the most independent retail streets in New England — almost no chains, which means every business here lives or dies on its own list and its own reviews.",
      pt: "A Main Street de Northampton é uma das ruas de varejo mais independentes da Nova Inglaterra — quase nenhuma rede, o que significa que cada negócio aqui vive ou morre da própria lista e das próprias avaliações.",
      es: "La Main Street de Northampton es de las calles comerciales mas independientes de Nueva Inglaterra — casi ninguna cadena, lo que significa que cada negocio vive o muere de su propia lista y sus propias resenas.",
    },
  },
  {
    name: "Agawam", slug: "agawam", population: 28438, county: "Hampden",
    access: ["Route 57", "Route 5", "Route 159", "Route 187"],
    districts: ["Agawam Center", "Feeding Hills", "Mittineague"],
    industries: ["tourism", "manufacturing", "construction trades", "agriculture"],
    anchor: "Six Flags New England on the Connecticut River",
    profile: "resort",
    note: {
      en: "Six Flags gives Agawam a hard seasonal spike, and the local trades that book their winter work during the summer rush are the ones that don't lay off crew in January.",
      pt: "O Six Flags dá a Agawam um pico sazonal forte, e os prestadores locais que fecham o trabalho de inverno durante o pique do verão são os que não dispensam equipe em janeiro.",
      es: "Six Flags da a Agawam un pico estacional fuerte, y los oficios locales que cierran el trabajo de invierno durante el auge del verano son los que no despiden cuadrilla en enero.",
    },
  },
  {
    name: "West Springfield", slug: "west-springfield", population: 28391, county: "Hampden",
    access: ["I-91", "Route 5", "the Mass Pike", "Route 20"],
    districts: ["Merrick", "Mittineague", "Riverdale", "the Memorial Avenue corridor"],
    industries: ["events and hospitality", "retail", "distribution", "food service"],
    anchor: "the Eastern States Exposition, host of The Big E",
    profile: "retail",
    communities: ["other"],
    note: {
      en: "The Big E brings roughly a million and a half visitors to West Springfield every September, and the businesses that capture contact details during those seventeen days sell to that list all year.",
      pt: "O Big E traz cerca de um milhão e meio de visitantes a West Springfield todo setembro, e quem captura contato durante esses dezessete dias vende para essa lista o ano inteiro.",
      es: "El Big E trae cerca de un millon y medio de visitantes a West Springfield cada septiembre, y quien captura contactos durante esos diecisiete dias vende a esa lista todo el ano.",
    },
  },
  {
    name: "Danvers", slug: "danvers", population: 27549, county: "Essex",
    access: ["Route 128", "Route 1", "Route 114", "Route 62"],
    districts: ["Danvers Square", "Hathorne", "Putnamville", "the Endicott Street corridor"],
    industries: ["big-box retail", "medical devices", "logistics", "restaurants"],
    anchor: "the Liberty Tree Mall and the Endicott Street retail strip",
    profile: "retail",
    note: {
      en: "Endicott Street concentrates most of the North Shore's big-box retail, which trains Danvers customers to expect chain-level convenience from independent businesses that rarely deliver it.",
      pt: "A Endicott Street concentra a maior parte do varejo de grande porte da North Shore, o que acostuma o cliente de Danvers a esperar conveniência de rede em negócios independentes que raramente entregam isso.",
      es: "Endicott Street concentra la mayor parte del retail grande de la North Shore, lo que acostumbra al cliente de Danvers a esperar comodidad de cadena en negocios independientes que rara vez la entregan.",
    },
  },
  {
    name: "Stoughton", slug: "stoughton", population: 28915, county: "Norfolk",
    access: ["Route 24", "Route 138", "Route 27", "the Stoughton line"],
    districts: ["Stoughton Center", "West Stoughton", "the Route 138 corridor"],
    industries: ["retail", "construction trades", "logistics", "healthcare"],
    anchor: "Stoughton Center and the Route 24 corridor",
    profile: "suburb",
    communities: ["other"],
    note: {
      en: "Stoughton's commuter rail line makes it a bedroom town where most decisions get made after 7pm — a business that can't take a booking at night is competing for a much smaller share of the day.",
      pt: "A linha de trem faz de Stoughton uma cidade-dormitório onde a maioria das decisões é tomada depois das 19h — quem não consegue receber agendamento à noite disputa uma fatia muito menor do dia.",
      es: "La linea de tren hace de Stoughton un pueblo dormitorio donde la mayoria de las decisiones se toman despues de las 19h — quien no puede recibir citas de noche compite por una porcion mucho menor del dia.",
    },
  },
  {
    name: "Gloucester", slug: "gloucester", population: 30273, county: "Essex",
    access: ["Route 128 terminus", "Route 127", "Route 133", "the Rockport line"],
    districts: ["Downtown", "East Gloucester", "Magnolia", "Annisquam", "Lanesville"],
    industries: ["commercial fishing", "seafood processing", "tourism", "marine trades"],
    anchor: "Gloucester Harbor, the oldest working fishing port in America",
    profile: "port",
    communities: ["pt", "other"],
    note: {
      en: "Gloucester's economy still turns on the fleet and on a summer that ends abruptly in September — businesses here need a system that keeps the winter pipeline warm while everyone else goes quiet.",
      pt: "A economia de Gloucester ainda gira em torno da frota e de um verão que acaba de repente em setembro — os negócios daqui precisam de um sistema que mantenha o pipeline de inverno aquecido enquanto o resto silencia.",
      es: "La economia de Gloucester aun gira en torno a la flota y a un verano que termina de golpe en septiembre — los negocios de aqui necesitan un sistema que mantenga el pipeline de invierno caliente mientras el resto calla.",
    },
  },
  {
    name: "Dracut", slug: "dracut", population: 32090, county: "Middlesex",
    access: ["Route 113", "Route 38", "Route 110", "I-93 via Methuen"],
    districts: ["Kenwood", "Collinsville", "Navy Yard", "East Dracut"],
    industries: ["construction trades", "retail", "landscaping", "logistics"],
    anchor: "the Merrimack River frontage across from Lowell",
    profile: "suburb",
    note: {
      en: "Dracut is largely owner-occupied single-family housing with big lots, which makes it one of the strongest landscaping and exterior-trades markets in the Merrimack Valley — and one of the most seasonal.",
      pt: "Dracut é majoritariamente casa própria unifamiliar com lote grande, o que faz dela um dos mercados mais fortes de paisagismo e serviços externos do Merrimack Valley — e um dos mais sazonais.",
      es: "Dracut es mayormente vivienda unifamiliar propia con lotes grandes, lo que la hace uno de los mercados mas fuertes de paisajismo y oficios exteriores del Merrimack Valley — y uno de los mas estacionales.",
    },
  },
  {
    name: "Milford", slug: "milford", population: 28789, county: "Worcester",
    access: ["I-495", "Route 16", "Route 109", "Route 140"],
    districts: ["Downtown", "the Plains", "South Milford"],
    industries: ["healthcare", "manufacturing", "construction trades", "restaurants"],
    anchor: "Milford Regional Medical Center and the granite quarries that built the town",
    profile: "industrial",
    communities: ["br", "hisp"],
    note: {
      en: "Milford has one of the largest Brazilian and Ecuadorian populations in Central Massachusetts, and its downtown trades economy runs almost entirely on Portuguese and Spanish word of mouth.",
      pt: "Milford tem uma das maiores populações brasileira e equatoriana do centro de Massachusetts, e a economia de serviços do centro roda quase inteiramente no boca a boca em português e espanhol.",
      es: "Milford tiene de las mayores poblaciones brasilena y ecuatoriana del centro de Massachusetts, y la economia de oficios del centro funciona casi por completo con boca a boca en portugues y espanol.",
    },
  },
  {
    name: "Dedham", slug: "dedham", population: 25330, county: "Norfolk",
    access: ["Route 128/I-95", "Route 1", "Route 109", "the Franklin line"],
    districts: ["Dedham Square", "Oakdale", "Riverdale", "East Dedham", "Endicott"],
    industries: ["legal services", "retail", "professional services", "home renovation"],
    anchor: "Legacy Place and the Norfolk County courthouse complex",
    profile: "retail",
    note: {
      en: "The Norfolk County courts put a dense professional-services market in Dedham Square, and those firms buy local — a B2B service business here has a customer base most towns simply don't offer.",
      pt: "Os tribunais do Norfolk County colocam um mercado denso de serviços profissionais na Dedham Square, e esses escritórios compram local — um negócio B2B aqui tem uma base de clientes que a maioria das cidades simplesmente não oferece.",
      es: "Los tribunales del condado de Norfolk ponen un mercado denso de servicios profesionales en Dedham Square, y esos despachos compran local — un negocio B2B aqui tiene una base que la mayoria de los pueblos no ofrece.",
    },
  },
  {
    name: "Billerica", slug: "billerica", population: 43468, county: "Middlesex",
    access: ["Route 3", "Route 129", "Route 3A", "I-495"],
    districts: ["Billerica Center", "North Billerica", "Nutting Lake", "Pinehurst"],
    industries: ["manufacturing", "technology", "distribution", "construction trades"],
    anchor: "the Route 3 industrial parks and the Concord River mills",
    profile: "industrial",
    note: {
      en: "Billerica's industrial parks sit next to some of the largest residential lots in Middlesex County, so a single trades business here can sell to a factory in the morning and a homeowner in the afternoon.",
      pt: "Os parques industriais de Billerica ficam ao lado de alguns dos maiores lotes residenciais do Middlesex County, então um único prestador aqui vende para uma fábrica de manhã e para um morador à tarde.",
      es: "Los parques industriales de Billerica estan junto a algunos de los lotes residenciales mas grandes del condado de Middlesex, asi que un mismo oficio vende a una fabrica por la manana y a un propietario por la tarde.",
    },
  },
  {
    name: "Wakefield", slug: "wakefield", population: 27045, county: "Middlesex",
    access: ["I-95/Route 128", "Route 129", "Route 1", "the Haverhill line"],
    districts: ["Wakefield Center", "Greenwood", "Montrose", "West Side"],
    industries: ["professional services", "technology", "retail", "home renovation"],
    anchor: "Lake Quannapowitt and the Route 128 office corridor",
    profile: "suburb",
    note: {
      en: "Wakefield's Main Street wraps a lake that the whole town walks around, which produces unusually strong local word of mouth — and punishes any business that mishandles a job in public view.",
      pt: "A Main Street de Wakefield contorna um lago que a cidade inteira caminha, o que gera um boca a boca local excepcionalmente forte — e pune qualquer negócio que erre um serviço à vista de todos.",
      es: "La Main Street de Wakefield rodea un lago que todo el pueblo camina, lo que genera un boca a boca local inusualmente fuerte — y castiga a cualquier negocio que falle un trabajo a la vista.",
    },
  },
  {
    name: "North Andover", slug: "north-andover", population: 31187, county: "Essex",
    access: ["I-495", "Route 114", "Route 125", "Route 133"],
    districts: ["the Old Center", "Machine Shop Village", "the Route 114 corridor"],
    industries: ["higher education", "retail", "restaurants", "construction trades"],
    anchor: "Merrimack College and the Stevens Mill district",
    profile: "suburb",
    note: {
      en: "North Andover's Route 114 corridor serves as the retail spine for four towns, and its residents overwhelmingly compare online before driving anywhere — visibility decides the shortlist before price does.",
      pt: "O corredor da Route 114 funciona como espinha comercial de quatro cidades, e os moradores comparam online antes de dirigir a qualquer lugar — a visibilidade define a lista curta antes do preço.",
      es: "El corredor de la Route 114 funciona como espina comercial de cuatro pueblos, y sus residentes comparan online antes de conducir a ningun sitio — la visibilidad define la lista corta antes que el precio.",
    },
  },
  {
    name: "Reading", slug: "reading", population: 25500, county: "Middlesex",
    access: ["I-93", "I-95/Route 128", "Route 28", "the Haverhill line"],
    districts: ["Reading Center", "the Depot district", "West Side"],
    industries: ["retail", "professional services", "construction trades", "healthcare"],
    anchor: "Reading Depot and the Route 128/I-93 interchange",
    profile: "suburb",
    note: {
      en: "Reading sits where I-93 and Route 128 cross, giving local crews access to the entire north suburban ring — the constraint is never reach here, it is keeping track of who asked for what.",
      pt: "Reading fica onde a I-93 cruza a Route 128, dando às equipes locais acesso a todo o anel norte — aqui o limite nunca é alcance, é lembrar quem pediu o quê.",
      es: "Reading esta donde la I-93 cruza la Route 128, dando a las cuadrillas acceso a todo el anillo norte — aqui el limite nunca es el alcance, es recordar quien pidio que.",
    },
  },
  {
    name: "Easton", slug: "easton", population: 24600, county: "Bristol",
    access: ["Route 24", "Route 138", "Route 106", "Route 123"],
    districts: ["North Easton", "South Easton", "Eastondale", "Furnace Village"],
    industries: ["higher education", "construction trades", "retail", "landscaping"],
    anchor: "Stonehill College and the Ames Shovel Works historic district",
    profile: "suburb",
    note: {
      en: "Easton is four distinct villages with no single downtown, which means a business that only advertises in one of them is invisible to three quarters of the town.",
      pt: "Easton são quatro vilas distintas sem um centro único, o que significa que um negócio que só anuncia em uma delas é invisível para três quartos da cidade.",
      es: "Easton son cuatro villas distintas sin un centro unico, lo que significa que un negocio que solo se anuncia en una es invisible para tres cuartos del pueblo.",
    },
  },
  {
    name: "Saugus", slug: "saugus", population: 28326, county: "Essex",
    access: ["Route 1", "Route 99", "Route 107", "Route 129"],
    districts: ["Cliftondale", "East Saugus", "Saugus Center", "Golden Hills"],
    industries: ["retail", "restaurants", "construction trades", "automotive"],
    anchor: "the Route 1 commercial strip, the busiest retail corridor north of Boston",
    profile: "retail",
    communities: ["hisp", "br"],
    note: {
      en: "Route 1 through Saugus carries tens of thousands of cars a day past every business on it, which means visibility is cheap here and conversion is the actual problem — most owners are measuring the wrong number.",
      pt: "A Route 1 em Saugus passa dezenas de milhares de carros por dia em frente a cada negócio, o que torna a visibilidade barata e faz da conversão o problema real — a maioria dos donos mede o número errado.",
      es: "La Route 1 en Saugus lleva decenas de miles de autos al dia frente a cada negocio, lo que abarata la visibilidad y hace de la conversion el problema real — la mayoria de los duenos mide el numero equivocado.",
    },
  },
  {
    name: "Middleborough", slug: "middleborough", population: 25594, county: "Plymouth",
    access: ["Route 44", "Route 28", "Route 105", "I-495", "the Middleborough/Lakeville line"],
    districts: ["Middleborough Center", "South Middleborough", "the Nemasket district"],
    industries: ["cranberry agriculture", "logistics", "construction trades", "retail"],
    anchor: "the cranberry bogs and the I-495/Route 44 freight junction",
    profile: "industrial",
    note: {
      en: "Middleborough is the cranberry capital of the region and its business year follows the harvest — cash is tight in spring and flush in October, which is exactly when most local marketing budgets are set backwards.",
      pt: "Middleborough é a capital regional do cranberry e seu ano comercial segue a colheita — caixa apertado na primavera e cheio em outubro, que é justamente quando a maioria dos orçamentos de marketing local é definida ao contrário.",
      es: "Middleborough es la capital regional del arandano y su ano comercial sigue la cosecha — caja ajustada en primavera y llena en octubre, justo cuando la mayoria de los presupuestos de marketing local se fijan al reves.",
    },
  },
  {
    name: "Mansfield", slug: "mansfield", population: 24200, county: "Bristol",
    access: ["I-495", "Route 106", "Route 140", "the Providence/Stoughton line"],
    districts: ["Downtown", "the Cabot Business Park", "West Mansfield"],
    industries: ["technology manufacturing", "events", "logistics", "professional services"],
    anchor: "the Xfinity Center amphitheater and the Cabot Business Park",
    profile: "industrial",
    note: {
      en: "Mansfield is halfway between Boston and Providence, which makes its businesses compete in two metro markets at once — and makes clear service-area targeting worth more here than in any single-metro town.",
      pt: "Mansfield fica na metade do caminho entre Boston e Providence, o que faz seus negócios competirem em duas regiões metropolitanas ao mesmo tempo — e torna a definição clara de área de atendimento mais valiosa aqui do que em qualquer cidade de metrópole única.",
      es: "Mansfield esta a medio camino entre Boston y Providence, lo que hace que sus negocios compitan en dos areas metropolitanas a la vez — y vuelve la definicion clara del area de servicio mas valiosa aqui que en cualquier pueblo de una sola metropoli.",
    },
  },
  {
    name: "Webster", slug: "webster", population: 17227, county: "Worcester",
    access: ["I-395", "Route 12", "Route 16", "Route 193"],
    districts: ["Downtown", "the Lake district", "North Village"],
    industries: ["light manufacturing", "retail", "lake tourism", "construction trades"],
    anchor: "Webster Lake, whose full Nipmuc name is the longest place name in the country",
    profile: "mill",
    communities: ["hisp"],
    note: {
      en: "Webster sits on the Connecticut border with a summer lake economy layered over a year-round mill town — two customer bases with almost no overlap, and most local businesses serve them with one message.",
      pt: "Webster fica na divisa com Connecticut, com uma economia de lago no verão sobreposta a uma cidade fabril o ano inteiro — duas bases de clientes quase sem sobreposição, e a maioria dos negócios locais atende as duas com uma mensagem só.",
      es: "Webster esta en la frontera con Connecticut, con una economia de lago en verano sobre un pueblo fabril todo el ano — dos bases de clientes casi sin solape, y la mayoria de los negocios les habla con un solo mensaje.",
    },
  },
  {
    name: "Norwood", slug: "norwood", population: 29446, county: "Norfolk",
    access: ["Route 1", "I-95/Route 128", "Route 1A", "the Franklin line"],
    districts: ["Norwood Center", "South Norwood", "the Automile"],
    industries: ["automotive retail", "healthcare", "professional services", "aviation"],
    anchor: "Norwood Memorial Airport and the Route 1 Automile",
    profile: "retail",
    note: {
      en: "The Automile made Norwood the car-buying destination for the whole southwest suburbs, and it trained local customers to expect financing options and instant quotes from every kind of business.",
      pt: "A Automile fez de Norwood o destino de compra de carro de todo o subúrbio sudoeste, e acostumou o cliente local a esperar opção de financiamento e orçamento instantâneo de qualquer tipo de negócio.",
      es: "La Automile hizo de Norwood el destino de compra de autos de todo el suburbio suroeste, y acostumbro al cliente local a esperar financiacion y presupuesto instantaneo de cualquier tipo de negocio.",
    },
  },
  {
    name: "Wilmington", slug: "wilmington", population: 23390, county: "Middlesex",
    access: ["I-93", "Route 38", "Route 129", "the Lowell and Haverhill lines"],
    districts: ["Wilmington Center", "North Wilmington", "Silver Lake"],
    industries: ["distribution", "manufacturing", "technology", "construction trades"],
    anchor: "the I-93 distribution corridor and the Analog Devices campus",
    profile: "industrial",
    note: {
      en: "Wilmington's two commuter lines and I-93 access made it a warehousing hub, which means its B2B buyers are procurement people who want a written quote — not a phone call — within the same business day.",
      pt: "As duas linhas de trem e o acesso à I-93 fizeram de Wilmington um polo de armazenagem, o que significa que seus compradores B2B são gente de compras que quer orçamento escrito — não ligação — no mesmo dia útil.",
      es: "Las dos lineas de tren y el acceso a la I-93 hicieron de Wilmington un polo de almacenaje, asi que sus compradores B2B son gente de compras que quiere presupuesto escrito — no una llamada — el mismo dia habil.",
    },
  },
  {
    name: "Bridgewater", slug: "bridgewater", population: 27509, county: "Plymouth",
    access: ["Route 24", "Route 18", "Route 104", "the Middleborough line"],
    districts: ["Bridgewater Center", "Scotland", "Stanley"],
    industries: ["higher education", "construction trades", "retail", "public sector"],
    anchor: "Bridgewater State University, the largest state university outside the UMass system",
    profile: "college",
    note: {
      en: "Bridgewater State turns the town over every September and empties it every May, so local businesses that build a year-round resident list instead of chasing student traffic are the ones that survive the summer.",
      pt: "A Bridgewater State renova a cidade todo setembro e a esvazia todo maio, então os negócios locais que constroem uma lista de moradores fixos em vez de correr atrás do fluxo estudantil são os que atravessam o verão.",
      es: "Bridgewater State renueva el pueblo cada septiembre y lo vacia cada mayo, asi que los negocios que construyen una lista de residentes permanentes en vez de perseguir al estudiante son los que sobreviven el verano.",
    },
  },
  {
    name: "Whitman", slug: "whitman", population: 15000, county: "Plymouth",
    access: ["Route 18", "Route 27", "Route 14", "the Kingston line"],
    districts: ["Whitman Center", "the Route 18 corridor"],
    industries: ["construction trades", "retail", "small manufacturing", "food service"],
    anchor: "the Toll House site, where the chocolate chip cookie was invented",
    profile: "suburb",
    note: {
      en: "Whitman is small enough that reputation travels in a single afternoon — which cuts both ways, and makes systematic review collection worth more here than any advertising budget.",
      pt: "Whitman é pequena o bastante para a reputação circular em uma tarde — o que corta dos dois lados, e faz da coleta sistemática de avaliações algo mais valioso aqui do que qualquer verba de anúncio.",
      es: "Whitman es lo bastante pequena para que la reputacion circule en una tarde — lo que corta en ambos sentidos, y hace que recolectar resenas sistematicamente valga aqui mas que cualquier presupuesto publicitario.",
    },
  },
  {
    name: "Abington", slug: "abington", population: 16557, county: "Plymouth",
    access: ["Route 18", "Route 123", "Route 58", "the Kingston line"],
    districts: ["Abington Center", "North Abington", "the Island Grove district"],
    industries: ["roofing and exterior trades", "landscaping", "retail", "automotive"],
    anchor: "Island Grove Park and the Route 18 corridor",
    profile: "suburb",
    note: {
      en: "Abington's housing stock is mostly mid-century single-family, which produces a predictable cycle of roof, window and HVAC replacements — a contractor with a follow-up calendar knows when to call before the customer does.",
      pt: "O parque habitacional de Abington é majoritariamente unifamiliar de meados do século, o que gera um ciclo previsível de troca de telhado, janela e HVAC — o contractor com calendário de follow-up sabe a hora de ligar antes do cliente.",
      es: "El parque de viviendas de Abington es mayormente unifamiliar de mediados de siglo, lo que genera un ciclo previsible de cambio de techo, ventanas y HVAC — el contratista con calendario de seguimiento sabe cuando llamar antes que el cliente.",
    },
  },
  {
    name: "Hudson", slug: "hudson", population: 20390, county: "Middlesex",
    access: ["I-495", "Route 85", "Route 62", "Route 117"],
    districts: ["Downtown Main Street", "Hudson Center", "the Assabet Valley"],
    industries: ["technology manufacturing", "restaurants", "construction trades", "retail"],
    anchor: "the Assabet River Rail Trail and the semiconductor campus on Route 62",
    profile: "tech",
    communities: ["br", "pt"],
    note: {
      en: "Hudson's Main Street revival was built largely by Brazilian and Portuguese owners, and the rail trail now brings weekend traffic those restaurants and shops never had — the ones capturing contacts are compounding it.",
      pt: "A retomada da Main Street de Hudson foi construída em grande parte por donos brasileiros e portugueses, e o rail trail agora traz um fluxo de fim de semana que esses restaurantes e lojas nunca tiveram — quem captura contato está capitalizando isso.",
      es: "La recuperacion de la Main Street de Hudson la construyeron en gran parte duenos brasilenos y portugueses, y el rail trail trae ahora un flujo de fin de semana que esos negocios nunca tuvieron — quien captura contactos lo esta capitalizando.",
    },
  },
  {
    name: "Grafton", slug: "grafton", population: 19468, county: "Worcester",
    access: ["Route 140", "Route 122", "Route 30", "the Grafton commuter stop"],
    districts: ["North Grafton", "South Grafton", "Farnumsville", "Grafton Common"],
    industries: ["veterinary and life sciences", "manufacturing", "construction trades", "retail"],
    anchor: "the Tufts Cummings School of Veterinary Medicine",
    profile: "college",
    note: {
      en: "Grafton's commuter stop turned it into a Boston bedroom town while the Tufts veterinary campus anchors a specialized professional base — two customer types that need entirely different messaging.",
      pt: "A estação de trem transformou Grafton em cidade-dormitório de Boston enquanto o campus veterinário da Tufts ancora uma base profissional especializada — dois tipos de cliente que precisam de mensagens completamente diferentes.",
      es: "La parada de tren convirtio a Grafton en pueblo dormitorio de Boston mientras el campus veterinario de Tufts ancla una base profesional especializada — dos tipos de cliente que necesitan mensajes completamente distintos.",
    },
  },
  {
    name: "Northbridge", slug: "northbridge", population: 16681, county: "Worcester",
    access: ["Route 122", "Route 146", "Route 16"],
    districts: ["Whitinsville", "Rockdale", "Linwood", "Northbridge Center"],
    industries: ["manufacturing", "construction trades", "retail", "healthcare"],
    anchor: "the Whitin Machine Works complex in the Blackstone River Valley",
    profile: "mill",
    note: {
      en: "Whitinsville was a company town and still feels like one — business here moves on personal relationships, which is why the operators who automate follow-up without sounding automated win disproportionately.",
      pt: "Whitinsville foi uma company town e ainda parece uma — aqui o negócio anda por relação pessoal, e é por isso que quem automatiza o follow-up sem soar automático ganha desproporcionalmente.",
      es: "Whitinsville fue un pueblo de compania y aun lo parece — aqui el negocio se mueve por relacion personal, y por eso quien automatiza el seguimiento sin sonar automatico gana desproporcionadamente.",
    },
  },
  {
    name: "Amesbury", slug: "amesbury", population: 17474, county: "Essex",
    access: ["I-95", "Route 110", "Route 150", "Route 495"],
    districts: ["the Mill Yard", "Point Shore", "Amesbury Center"],
    industries: ["light manufacturing", "marine trades", "retail", "construction trades"],
    anchor: "the restored Powow River Mill Yard",
    profile: "mill",
    note: {
      en: "Amesbury sits on the New Hampshire line, so its retail competes against a state with no sales tax — local businesses win on service and proximity, never on price, and have to say so explicitly.",
      pt: "Amesbury fica na divisa com New Hampshire, então seu varejo compete com um estado sem imposto sobre vendas — o negócio local ganha por serviço e proximidade, nunca por preço, e precisa dizer isso explicitamente.",
      es: "Amesbury esta en la linea con New Hampshire, asi que su comercio compite con un estado sin impuesto a las ventas — el negocio local gana por servicio y cercania, nunca por precio, y tiene que decirlo explicitamente.",
    },
  },
  {
    name: "Walpole", slug: "walpole", population: 25015, county: "Norfolk",
    access: ["I-95", "Route 1A", "Route 27", "Route 109", "the Franklin line"],
    districts: ["Walpole Center", "East Walpole", "South Walpole", "the Bird district"],
    industries: ["manufacturing", "professional services", "construction trades", "retail"],
    anchor: "Adams Farm and the Bird & Son mill legacy in East Walpole",
    profile: "suburb",
    note: {
      en: "Walpole's three village centers each have their own commuter stop and their own commercial rhythm — a business that treats the town as one market misses two thirds of it.",
      pt: "Os três centros de vila de Walpole têm cada um sua estação de trem e seu próprio ritmo comercial — quem trata a cidade como um mercado único perde dois terços dela.",
      es: "Los tres centros de villa de Walpole tienen cada uno su parada de tren y su propio ritmo comercial — quien trata al pueblo como un solo mercado pierde dos tercios.",
    },
  },
  {
    name: "Canton", slug: "canton", population: 24370, county: "Norfolk",
    access: ["I-93", "I-95", "Route 138", "the Stoughton line"],
    districts: ["Canton Center", "Ponkapoag", "the Royall Street corporate district"],
    industries: ["corporate headquarters", "technology", "healthcare", "professional services"],
    anchor: "the Blue Hills Reservation and the Royall Street corporate campuses",
    profile: "tech",
    note: {
      en: "Canton packs a surprising density of corporate headquarters into a town of 24,000, which means its best local customers are facilities managers with recurring contracts — a very different sale from a homeowner.",
      pt: "Canton concentra uma densidade surpreendente de sedes corporativas numa cidade de 24 mil habitantes, o que significa que seus melhores clientes locais são gerentes de facilities com contrato recorrente — uma venda bem diferente da de um morador.",
      es: "Canton concentra una densidad sorprendente de sedes corporativas en un pueblo de 24 mil habitantes, asi que sus mejores clientes locales son gerentes de instalaciones con contratos recurrentes — una venta muy distinta a la de un propietario.",
    },
  },
  {
    name: "Foxborough", slug: "foxborough", population: 18618, county: "Norfolk",
    access: ["I-95", "Route 1", "Route 140", "the Foxboro event rail service"],
    districts: ["Foxborough Center", "Patriot Place", "the Route 1 corridor"],
    industries: ["events and hospitality", "retail", "construction trades", "restaurants"],
    anchor: "Gillette Stadium and Patriot Place",
    profile: "resort",
    note: {
      en: "Foxborough absorbs 65,000 visitors on a game day and then goes quiet, so the businesses that hold the town's revenue are the ones selling to the 18,000 residents on the other 340 days.",
      pt: "Foxborough absorve 65 mil visitantes em dia de jogo e depois silencia, então quem sustenta o faturamento da cidade é quem vende para os 18 mil moradores nos outros 340 dias.",
      es: "Foxborough absorbe 65 mil visitantes en dia de partido y luego calla, asi que quien sostiene la facturacion del pueblo es quien vende a los 18 mil residentes los otros 340 dias.",
    },
  },
  {
    name: "Rockland", slug: "rockland", population: 17670, county: "Plymouth",
    access: ["Route 3", "Route 123", "Route 139", "Union Street"],
    districts: ["Rockland Center", "the Union Street corridor", "North Rockland"],
    industries: ["construction trades", "retail", "small manufacturing", "automotive"],
    anchor: "the Union Street commercial district and the Route 3 interchange",
    profile: "suburb",
    note: {
      en: "Rockland's Route 3 exit makes it a staging point for South Shore trades — crews live here and work three towns out, so the business risk is scheduling, not demand.",
      pt: "A saída da Route 3 faz de Rockland um ponto de apoio para prestadores da South Shore — as equipes moram aqui e trabalham três cidades adiante, então o risco do negócio é a agenda, não a demanda.",
      es: "La salida de la Route 3 hace de Rockland un punto de apoyo para oficios de la South Shore — las cuadrillas viven aqui y trabajan tres pueblos mas alla, asi que el riesgo del negocio es la agenda, no la demanda.",
    },
  },
  {
    name: "Hingham", slug: "hingham", population: 24464, county: "Plymouth",
    access: ["Route 3", "Route 3A", "Route 228", "the Greenbush line", "the Boston commuter ferry"],
    districts: ["Hingham Square", "Crow Point", "the Shipyard", "World's End"],
    industries: ["retail", "marine trades", "professional services", "home renovation"],
    anchor: "the Hingham Shipyard and Derby Street Shops",
    profile: "suburb",
    note: {
      en: "The Hingham ferry puts residents in downtown Boston in 35 minutes, which produces a high-income household that is rarely home during business hours — evening and weekend availability is the whole game here.",
      pt: "O ferry de Hingham leva o morador ao centro de Boston em 35 minutos, o que gera famílias de alta renda que quase nunca estão em casa em horário comercial — aqui a disponibilidade à noite e no fim de semana é o jogo inteiro.",
      es: "El ferry de Hingham lleva al residente al centro de Boston en 35 minutos, lo que genera hogares de alto ingreso que casi nunca estan en casa en horario laboral — aqui la disponibilidad de noche y fin de semana lo es todo.",
    },
  },
  {
    name: "Marshfield", slug: "marshfield", population: 25892, county: "Plymouth",
    access: ["Route 3", "Route 139", "Route 3A"],
    districts: ["Brant Rock", "Green Harbor", "Marshfield Hills", "Ocean Bluff"],
    industries: ["marine trades", "construction", "seasonal tourism", "retail"],
    anchor: "the Marshfield Fair and the Green Harbor marina",
    profile: "resort",
    note: {
      en: "Marshfield's coastal villages fill with summer residents and empty in October, and the trades that book winter interior work from their summer exterior clients are the ones with year-round cash flow.",
      pt: "As vilas costeiras de Marshfield enchem de veranistas e esvaziam em outubro, e os prestadores que fecham o trabalho interno de inverno com os clientes de fachada do verão são os que têm caixa o ano todo.",
      es: "Las villas costeras de Marshfield se llenan de veraneantes y se vacian en octubre, y los oficios que cierran el trabajo interior de invierno con sus clientes de verano son los que tienen caja todo el ano.",
    },
  },
  {
    name: "Sandwich", slug: "sandwich", population: 20257, county: "Barnstable",
    access: ["Route 6", "Route 6A", "Route 130", "the Sagamore Bridge"],
    districts: ["Sandwich Village", "East Sandwich", "Forestdale", "the Canal district"],
    industries: ["tourism", "construction trades", "retail", "marine"],
    anchor: "the Cape Cod Canal and the Sandwich Glass Museum",
    profile: "resort",
    note: {
      en: "Sandwich is the first town over the bridge, which makes it the Cape's year-round base — its contractors serve permanent residents while everyone further out chases the season.",
      pt: "Sandwich é a primeira cidade depois da ponte, o que faz dela a base do Cape o ano inteiro — seus contractors atendem moradores fixos enquanto todo mundo mais adiante corre atrás da temporada.",
      es: "Sandwich es el primer pueblo pasando el puente, lo que la hace la base del Cape todo el ano — sus contratistas atienden residentes permanentes mientras el resto persigue la temporada.",
    },
  },
  {
    name: "Falmouth", slug: "falmouth", population: 32660, county: "Barnstable",
    access: ["Route 28", "Route 151", "the Steamship Authority ferry to Martha's Vineyard"],
    districts: ["Woods Hole", "East Falmouth", "North Falmouth", "Waquoit", "Falmouth Village"],
    industries: ["marine science", "tourism", "seasonal construction", "hospitality"],
    anchor: "the Woods Hole Oceanographic Institution and the Vineyard ferry terminal",
    profile: "resort",
    communities: ["br"],
    note: {
      en: "Falmouth combines a research institution that operates year-round with a summer economy that triples the population — and a Brazilian workforce that staffs most of the seasonal trades.",
      pt: "Falmouth combina uma instituição de pesquisa que funciona o ano todo com uma economia de verão que triplica a população — e uma mão de obra brasileira que sustenta boa parte dos serviços sazonais.",
      es: "Falmouth combina una institucion de investigacion que opera todo el ano con una economia de verano que triplica la poblacion — y una fuerza laboral brasilena que sostiene buena parte de los oficios estacionales.",
    },
  },
  {
    name: "Yarmouth", slug: "yarmouth", population: 23793, county: "Barnstable",
    access: ["Route 6", "Route 28", "Route 6A"],
    districts: ["South Yarmouth", "West Yarmouth", "Yarmouth Port", "Bass River"],
    industries: ["tourism", "hospitality", "seasonal trades", "retail"],
    anchor: "the Route 28 resort corridor along Nantucket Sound",
    profile: "resort",
    note: {
      en: "Route 28 through Yarmouth is a wall of motels and rental cottages, which means the local trades market is dominated by property managers placing repeat orders — a completely different sale from a homeowner.",
      pt: "A Route 28 em Yarmouth é uma parede de motéis e casas de aluguel, o que faz do mercado de serviços local um jogo de administradores de imóveis com pedidos recorrentes — uma venda completamente diferente da de um morador.",
      es: "La Route 28 en Yarmouth es un muro de moteles y casas de alquiler, lo que hace que el mercado local lo dominen administradores de propiedades con pedidos recurrentes — una venta muy distinta a la de un propietario.",
    },
  },
  {
    name: "Dennis", slug: "dennis", population: 14207, county: "Barnstable",
    access: ["Route 6", "Route 6A", "Route 134", "Route 28"],
    districts: ["Dennis Port", "West Dennis", "East Dennis", "South Dennis", "Dennis Village"],
    industries: ["arts", "tourism", "marine trades", "construction trades"],
    anchor: "the Cape Playhouse, the oldest continuously operating summer theater in the country",
    profile: "resort",
    note: {
      en: "Dennis is five villages spread across both shores of the Cape, and its second-home owners hire remotely — the contractor who sends photo updates without being asked gets the next three jobs.",
      pt: "Dennis são cinco vilas espalhadas pelas duas margens do Cape, e seus donos de segunda residência contratam à distância — o contractor que manda foto do andamento sem ser pedido leva os três próximos jobs.",
      es: "Dennis son cinco villas repartidas por ambas orillas del Cape, y sus duenos de segunda residencia contratan a distancia — el contratista que envia fotos del avance sin que se las pidan se lleva los tres trabajos siguientes.",
    },
  },
  {
    name: "Wareham", slug: "wareham", population: 22666, county: "Plymouth",
    access: ["I-195", "Route 6", "Route 28", "Route 25"],
    districts: ["Onset", "West Wareham", "East Wareham", "Wareham Village"],
    industries: ["cranberry agriculture", "marine trades", "tourism", "retail"],
    anchor: "Onset Bay and the cranberry bogs at the head of Buzzards Bay",
    profile: "resort",
    note: {
      en: "Wareham is the gateway to the Cape, so its businesses catch traffic that never stops — converting a fraction of that flow into a contact list is worth more here than any local advertising.",
      pt: "Wareham é a porta de entrada do Cape, então seus negócios recebem um fluxo que não para — converter uma fração desse tráfego em lista de contatos vale mais aqui do que qualquer anúncio local.",
      es: "Wareham es la puerta de entrada al Cape, asi que sus negocios reciben un flujo que no para — convertir una fraccion de ese trafico en lista de contactos vale aqui mas que cualquier anuncio local.",
    },
  },
  {
    name: "Bourne", slug: "bourne", population: 19754, county: "Barnstable",
    access: ["Route 6", "Route 28", "the Bourne and Sagamore Bridges", "Route 25"],
    districts: ["Buzzards Bay", "Sagamore", "Monument Beach", "Pocasset", "Cataumet"],
    industries: ["marine trades", "tourism", "construction", "education"],
    anchor: "the Cape Cod Canal and the Massachusetts Maritime Academy",
    profile: "port",
    note: {
      en: "Bourne is the only town on both sides of the Cape Cod Canal, and both bridges funnel through it — a business here is either capturing that traffic deliberately or being driven past.",
      pt: "Bourne é a única cidade nos dois lados do Cape Cod Canal, e as duas pontes passam por ela — um negócio aqui ou captura esse fluxo de propósito, ou é apenas ultrapassado.",
      es: "Bourne es el unico pueblo a ambos lados del Cape Cod Canal, y los dos puentes pasan por el — un negocio aqui o captura ese trafico a proposito, o simplemente lo pasan de largo.",
    },
  },
  {
    name: "Mashpee", slug: "mashpee", population: 14175, county: "Barnstable",
    access: ["Route 28", "Route 151", "Route 130"],
    districts: ["Mashpee Commons", "New Seabury", "Popponesset"],
    industries: ["retail", "tourism", "construction trades", "golf and hospitality"],
    anchor: "Mashpee Commons and the seat of the Mashpee Wampanoag Tribe",
    profile: "resort",
    note: {
      en: "Mashpee Commons functions as the Upper Cape's downtown, and its year-round retirement population gives local trades something rare on the Cape — steady demand in February.",
      pt: "O Mashpee Commons funciona como o centro do Upper Cape, e sua população aposentada fixa dá aos prestadores locais algo raro no Cape — demanda constante em fevereiro.",
      es: "Mashpee Commons funciona como el centro del Upper Cape, y su poblacion jubilada permanente da a los oficios locales algo raro en el Cape — demanda constante en febrero.",
    },
  },
  {
    name: "Acton", slug: "acton", population: 24021, county: "Middlesex",
    access: ["Route 2", "Route 27", "Route 111", "the Fitchburg line at South Acton"],
    districts: ["West Acton", "South Acton", "Acton Center", "North Acton"],
    industries: ["technology", "professional services", "home renovation", "retail"],
    anchor: "NARA Park and the South Acton commuter station",
    profile: "tech",
    communities: ["other"],
    note: {
      en: "Acton has one of the highest concentrations of engineers and one of the largest Chinese and Indian communities west of Boston — a customer base that reads reviews carefully and books online without calling.",
      pt: "Acton tem uma das maiores concentrações de engenheiros e uma das maiores comunidades chinesa e indiana a oeste de Boston — uma base de clientes que lê avaliação com atenção e agenda online sem ligar.",
      es: "Acton tiene una de las mayores concentraciones de ingenieros y de las mayores comunidades china e india al oeste de Boston — una base que lee resenas con cuidado y reserva online sin llamar.",
    },
  },
  {
    name: "Concord", slug: "concord", population: 19999, county: "Middlesex",
    access: ["Route 2", "Route 62", "Route 126", "the Fitchburg line"],
    districts: ["Concord Center", "West Concord", "Nine Acre Corner"],
    industries: ["tourism and history", "professional services", "agriculture", "home renovation"],
    anchor: "Minute Man National Historical Park and Walden Pond",
    profile: "suburb",
    note: {
      en: "Concord's historic district restricts what can be changed on a property, which makes its renovation market slow, permit-heavy and high-value — the contractor who documents the process wins on trust, not price.",
      pt: "O distrito histórico de Concord restringe o que pode ser alterado num imóvel, o que torna o mercado de reforma lento, cheio de licença e de alto valor — quem documenta o processo ganha por confiança, não por preço.",
      es: "El distrito historico de Concord restringe lo que se puede cambiar en una propiedad, lo que hace su mercado de renovacion lento, lleno de permisos y de alto valor — quien documenta el proceso gana por confianza, no por precio.",
    },
  },
  {
    name: "Lexington", slug: "lexington", population: 34454, county: "Middlesex",
    access: ["Route 2", "Route 128/I-95", "Route 4", "Route 225", "the Minuteman Bikeway"],
    districts: ["Lexington Center", "East Lexington", "the Hartwell Avenue corridor"],
    industries: ["biotech", "professional services", "education", "home renovation"],
    anchor: "the Lexington Battle Green and the Hartwell Avenue life sciences corridor",
    profile: "tech",
    communities: ["other"],
    note: {
      en: "Hartwell Avenue turned Lexington into a biotech address while the town center stayed historic, and its households — among the most educated in the state — compare providers the way they read a spec sheet.",
      pt: "A Hartwell Avenue transformou Lexington num endereço de biotecnologia enquanto o centro seguiu histórico, e suas famílias — das mais escolarizadas do estado — comparam fornecedores como quem lê uma ficha técnica.",
      es: "Hartwell Avenue convirtio a Lexington en una direccion biotecnologica mientras el centro seguia historico, y sus hogares — de los mas educados del estado — comparan proveedores como quien lee una ficha tecnica.",
    },
  },
  {
    name: "Winchester", slug: "winchester", population: 22970, county: "Middlesex",
    access: ["I-93", "Route 3", "Route 38", "the Lowell line"],
    districts: ["Winchester Center", "Symmes Corner", "Wedgemere", "the Highlands"],
    industries: ["healthcare", "professional services", "home renovation", "retail"],
    anchor: "Winchester Hospital and the Mystic Lakes",
    profile: "suburb",
    note: {
      en: "Winchester's housing stock is largely pre-war and expensive to maintain, producing a steady renovation pipeline for whoever the town's word-of-mouth network currently trusts — a position that turns over slowly and pays well.",
      pt: "O parque habitacional de Winchester é em grande parte pré-guerra e caro de manter, gerando um fluxo constante de reforma para quem a rede de indicação da cidade confia no momento — uma posição que muda devagar e paga bem.",
      es: "El parque de viviendas de Winchester es en gran parte de preguerra y caro de mantener, lo que genera un flujo constante de renovacion para quien la red de referencias del pueblo confia — una posicion que rota despacio y paga bien.",
    },
  },
  {
    name: "Belmont", slug: "belmont", population: 26330, county: "Middlesex",
    access: ["Route 2", "Route 60", "the Fitchburg line", "the Route 73 bus to Harvard"],
    districts: ["Belmont Center", "Cushing Square", "Waverley", "Payson Park"],
    industries: ["healthcare", "professional services", "education", "home renovation"],
    anchor: "McLean Hospital and the Belmont Hill ridge",
    profile: "suburb",
    note: {
      en: "Belmont has almost no commercial land and three small village squares, so nearly every local business is competing for the same few hundred storefront-adjacent customers — differentiation has to happen online.",
      pt: "Belmont quase não tem área comercial e tem três pequenas praças de vila, então praticamente todo negócio local disputa os mesmos poucos milhares de clientes próximos das lojas — a diferenciação precisa acontecer online.",
      es: "Belmont casi no tiene suelo comercial y tiene tres pequenas plazas de villa, asi que casi todo negocio local compite por los mismos pocos miles de clientes cercanos — la diferenciacion tiene que ocurrir online.",
    },
  },
  {
    name: "Stoneham", slug: "stoneham", population: 24126, county: "Middlesex",
    access: ["I-93", "Route 28", "Route 128", "Route 38"],
    districts: ["Stoneham Square", "the Fellsway", "North Stoneham"],
    industries: ["retail", "restaurants", "construction trades", "logistics"],
    anchor: "the Middlesex Fells Reservation and the Stone Zoo",
    profile: "suburb",
    note: {
      en: "Stoneham sits directly on I-93 with the Fells on one side, which keeps it compact and dense — a crew can do four jobs in a day here, if the schedule holds.",
      pt: "Stoneham fica direto sobre a I-93 com o Fells de um lado, o que a mantém compacta e densa — aqui uma equipe faz quatro serviços num dia, se a agenda se sustentar.",
      es: "Stoneham esta directamente sobre la I-93 con el Fells a un lado, lo que la mantiene compacta y densa — aqui una cuadrilla hace cuatro trabajos en un dia, si la agenda aguanta.",
    },
  },
  {
    name: "Melrose", slug: "melrose", population: 28016, county: "Middlesex",
    access: ["Route 99", "I-93", "Route 1", "the Haverhill line"],
    districts: ["Melrose Highlands", "Wyoming", "Melrose Center", "Cedar Park"],
    industries: ["restaurants", "retail", "professional services", "home renovation"],
    anchor: "Melrose Common and the four commuter rail stops along Main Street",
    profile: "suburb",
    note: {
      en: "Melrose has four commuter stops in a two-mile town, which produced a walkable Main Street and a customer base that will not drive to a competitor — local search visibility decides almost everything.",
      pt: "Melrose tem quatro estações de trem em três quilômetros de cidade, o que gerou uma Main Street caminhável e um cliente que não vai de carro até o concorrente — a visibilidade na busca local decide quase tudo.",
      es: "Melrose tiene cuatro paradas de tren en tres kilometros de pueblo, lo que produjo una Main Street peatonal y un cliente que no conduce hasta el competidor — la visibilidad en busqueda local decide casi todo.",
    },
  },
  {
    name: "Winthrop", slug: "winthrop", population: 18544, county: "Suffolk",
    access: ["Route 145", "the Winthrop ferry to Boston", "Route 1A via East Boston"],
    districts: ["Winthrop Center", "Point Shirley", "Cottage Park", "Court Road"],
    industries: ["marine trades", "construction", "food service", "small retail"],
    anchor: "Winthrop Beach and the harbor ferry landing",
    profile: "port",
    communities: ["hisp", "br"],
    note: {
      en: "Winthrop is a peninsula with one road in, which makes it the definition of a closed local market — a business that earns the town's trust owns it, and one that loses it has nowhere to go.",
      pt: "Winthrop é uma península com uma única via de entrada, o que a torna a definição de mercado local fechado — quem conquista a confiança da cidade a domina, e quem a perde não tem para onde ir.",
      es: "Winthrop es una peninsula con una sola via de entrada, lo que la convierte en la definicion de mercado local cerrado — quien gana la confianza del pueblo lo posee, y quien la pierde no tiene a donde ir.",
    },
  },
  {
    name: "Swampscott", slug: "swampscott", population: 15184, county: "Essex",
    access: ["Route 1A", "Route 129", "the Newburyport/Rockport line"],
    districts: ["Swampscott Center", "Beach Bluff", "the Machon district"],
    industries: ["professional services", "retail", "marine trades", "home renovation"],
    anchor: "Fisherman's Beach and the Humphrey Street corridor",
    profile: "suburb",
    note: {
      en: "Swampscott is three square miles of high-value coastal property, which means fewer customers than neighboring Lynn but a far higher average job — the math rewards precision over volume.",
      pt: "Swampscott são oito quilômetros quadrados de imóvel costeiro de alto valor, o que significa menos clientes que a vizinha Lynn mas um ticket médio muito maior — a conta premia precisão, não volume.",
      es: "Swampscott son ocho kilometros cuadrados de propiedad costera de alto valor, lo que significa menos clientes que la vecina Lynn pero un ticket medio mucho mayor — la cuenta premia precision, no volumen.",
    },
  },
  {
    name: "Marblehead", slug: "marblehead", population: 20667, county: "Essex",
    access: ["Route 114", "Route 129", "Atlantic Avenue"],
    districts: ["Old Town", "Marblehead Neck", "Clifton", "Devereux"],
    industries: ["marine and yachting", "tourism", "retail", "home renovation"],
    anchor: "Marblehead Harbor, one of the busiest recreational sailing harbors in the country",
    profile: "port",
    note: {
      en: "Marblehead's Old Town streets predate cars and its harbor fills with several hundred moored boats each summer — a trades business here needs scheduling discipline more than it needs more leads.",
      pt: "As ruas do Old Town de Marblehead são anteriores ao automóvel e o porto enche de centenas de barcos ancorados a cada verão — aqui um prestador precisa mais de disciplina de agenda do que de mais leads.",
      es: "Las calles del Old Town de Marblehead son anteriores al automovil y el puerto se llena de cientos de barcos amarrados cada verano — aqui un oficio necesita mas disciplina de agenda que mas leads.",
    },
  },
];

/** Serviço único por cidade. Antes eram 5 slugs de serviço multiplicando cada
 *  cidade por 5 (e por 3 locales = 1.500 URLs de texto idêntico). Agora cada
 *  cidade tem UMA página, e os 4 slugs antigos redirecionam 301 para ela — ver
 *  next.config.ts. */
export const CITY_PAGE_SLUG = "marketing-agency";

/** Slugs de serviço descontinuados, mantidos aqui só para gerar os redirects. */
export const LEGACY_SERVICE_SLUGS = [
  "crm-services",
  "lead-generation",
  "business-automation",
  "digital-marketing",
];

export function cityPagePath(citySlug: string): string {
  return `${CITY_PAGE_SLUG}-${citySlug}-ma`;
}

export function findCityBySlug(slug: string): City | undefined {
  return massachusettsCities.find((c) => c.slug === slug);
}

/** Cidades vizinhas reais: mesmo condado, ordenadas pela proximidade de porte,
 *  para os links internos fazerem sentido geográfico e comercial. */
export function nearbyCities(city: City, limit = 6): City[] {
  return massachusettsCities
    .filter((c) => c.county === city.county && c.slug !== city.slug)
    .sort((a, b) => Math.abs(a.population - city.population) - Math.abs(b.population - city.population))
    .slice(0, limit);
}

const countyToRegion: Record<string, { region: string; hubs: string[] }> = {
  Suffolk: { region: "Greater Boston", hubs: ["Boston", "Cambridge", "Quincy"] },
  Middlesex: { region: "Greater Boston / MetroWest", hubs: ["Cambridge", "Newton", "Framingham", "Marlborough"] },
  Norfolk: { region: "Greater Boston / South Shore", hubs: ["Brookline", "Quincy", "Braintree"] },
  Essex: { region: "North Shore", hubs: ["Lynn", "Salem", "Beverly", "Lawrence"] },
  Worcester: { region: "Worcester Region / Central MA", hubs: ["Worcester", "Leominster", "Fitchburg"] },
  Hampden: { region: "Pioneer Valley / Western MA", hubs: ["Springfield", "Chicopee", "Holyoke"] },
  Hampshire: { region: "Pioneer Valley / Western MA", hubs: ["Northampton", "Amherst"] },
  Bristol: { region: "South Coast", hubs: ["New Bedford", "Fall River", "Taunton"] },
  Plymouth: { region: "South Shore", hubs: ["Plymouth", "Brockton", "Weymouth"] },
  Barnstable: { region: "Cape Cod", hubs: ["Barnstable", "Falmouth", "Sandwich"] },
  Berkshire: { region: "Berkshires / Western MA", hubs: ["Pittsfield"] },
};

export function getCityRegion(county: string): { region: string; hubs: string[] } {
  return countyToRegion[county] || { region: "Massachusetts", hubs: [] };
}

export function citySize(population: number): "large" | "mid" | "small" {
  if (population >= 100000) return "large";
  if (population >= 30000) return "mid";
  return "small";
}
