type NicheT = {
  heroTitle: string;
  heroSubtitle: string;
  painTitle: string;
  benefitTitle: string;
  painPoints: string[];
  benefits: string[];
  description: string;
  ctaTitle: string;
  faq: { q: string; a: string }[];
};

type NicheTranslations = Record<string, Record<string, NicheT>>;

export const nicheTranslations: NicheTranslations = {
  contractors: {
    pt: {
      heroTitle: "Pare de Perder Servicos. Comece a Fechar Mais Contratos.",
      heroSubtitle: "A plataforma all-in-one para contractors que querem automatizar follow-ups, gerenciar leads e crescer a receita sem caos.",
      painTitle: "Isso Soa Familiar?",
      benefitTitle: "Com o Bee Pro Hub Voce Ganha:",
      painPoints: ["Perdendo leads porque esta ocupado demais no trabalho para fazer follow-up", "Gastando horas criando orcamentos e faturas manualmente", "Sem sistema para rastrear quais trabalhos estao em andamento", "Perdendo ligacoes de clientes enquanto esta no servico"],
      benefits: ["Follow-ups automaticos para nenhum lead escapar", "Orcamentos e faturas profissionais em 3 minutos", "Visao completa do pipeline de cada trabalho", "Nunca perca uma ligacao com sistema telefonico integrado"],
      description: "O Bee Pro Hub ajuda contractors a gerenciar todo o negocio em uma plataforma. Da primeira ligacao ate a fatura final, cada etapa e rastreada e automatizada.",
      ctaTitle: "Pronto para Crescer Seu Negocio de Contractor?",
      faq: [
        { q: "Qual o melhor CRM para contractors?", a: "O Bee Pro Hub e o CRM mais completo para contractors. Combina gestao de leads, follow-ups automaticos, agendamento, faturamento e telefonia — tudo feito para negocios de servicos." },
        { q: "Quanto custa o Bee Pro Hub para contractors?", a: "Planos a partir de $97/mes com 14 dias de teste gratis. Sem cartao de credito, sem contratos." },
        { q: "Posso automatizar o marketing do meu negocio?", a: "Sim! O Bee Pro Hub automatiza email, SMS, WhatsApp e follow-ups de voz projetados especificamente para contractors. Configure uma vez e deixe rodar 24/7." },
        { q: "Tem suporte em portugues?", a: "Sim! Suporte 24/7 em Portugues, Ingles e Espanhol." },
      ],
    },
    es: {
      heroTitle: "Deja de Perder Trabajos. Cierra Mas Contratos.",
      heroSubtitle: "La plataforma todo-en-uno para contractors que quieren automatizar follow-ups, gestionar leads y crecer ingresos sin caos.",
      painTitle: "Te Suena Familiar?",
      benefitTitle: "Con Bee Pro Hub Obtienes:",
      painPoints: ["Perdiendo leads porque estas muy ocupado en obra para hacer follow-up", "Gastando horas creando presupuestos y facturas manualmente", "Sin sistema para rastrear que trabajos estan en progreso", "Perdiendo llamadas de clientes mientras estas en el trabajo"],
      benefits: ["Follow-ups automaticos para que ningun lead se escape", "Presupuestos y facturas profesionales en 3 minutos", "Vision completa del pipeline de cada trabajo", "Nunca pierdas una llamada con sistema telefonico integrado"],
      description: "Bee Pro Hub ayuda a contractors a gestionar todo su negocio en una plataforma. Desde la primera llamada hasta la factura final.",
      ctaTitle: "Listo para Crecer Tu Negocio?",
      faq: [
        { q: "Cual es el mejor CRM para contractors?", a: "Bee Pro Hub es el CRM mas completo para contractors. Combina gestion de leads, follow-ups automaticos, agendamiento, facturacion y telefonia." },
        { q: "Cuanto cuesta Bee Pro Hub?", a: "Planes desde $97/mes con 14 dias de prueba gratis. Sin tarjeta de credito." },
        { q: "Puedo automatizar el marketing?", a: "Si! Bee Pro Hub automatiza email, SMS, WhatsApp y follow-ups de voz. Configura una vez y dejalo funcionar 24/7." },
        { q: "Tienen soporte en espanol?", a: "Si! Soporte 24/7 en Espanol, Ingles y Portugues." },
      ],
    },
  },
  cleaning: {
    pt: {
      heroTitle: "Preencha Sua Agenda. Mantenha Clientes Voltando.",
      heroSubtitle: "Automatize agendamentos, follow-ups e avaliacoes para focar em entregar resultados impecaveis.",
      painTitle: "Isso Soa Familiar?",
      benefitTitle: "Com o Bee Pro Hub Voce Ganha:",
      painPoints: ["Agendamentos inconsistentes e horarios vazios", "Clientes esquecendo compromissos ou cancelando", "Sem sistema para coletar e mostrar avaliacoes", "Gastando muito tempo no telefone e mensagens"],
      benefits: ["Agendamento online que preenche sua agenda automaticamente", "Lembretes automaticos que reduzem faltas em 80%", "Solicitacoes automaticas de avaliacao apos cada servico", "Automacao WhatsApp e SMS para comunicacao instantanea"],
      description: "O Bee Pro Hub da as ferramentas para empresas de limpeza automatizarem agendamento, comunicacao e construirem reputacao online.",
      ctaTitle: "Pronto para Crescer Sua Empresa de Limpeza?",
      faq: [
        { q: "Qual o melhor CRM para empresas de limpeza?", a: "Bee Pro Hub e ideal para empresas de limpeza. Agendamento, lembretes, avaliacoes e automacao em uma plataforma." },
        { q: "Quanto custa?", a: "A partir de $97/mes. Teste gratis por 14 dias." },
        { q: "Posso automatizar o marketing?", a: "Sim! Email, SMS, WhatsApp automaticos. Configure uma vez." },
        { q: "Tem suporte em portugues?", a: "Sim! Suporte 24/7 em PT, EN e ES." },
      ],
    },
    es: {
      heroTitle: "Llena Tu Agenda. Mantiene Clientes Regresando.",
      heroSubtitle: "Automatiza reservas, follow-ups y resenas para enfocarte en entregar resultados impecables.",
      painTitle: "Te Suena Familiar?",
      benefitTitle: "Con Bee Pro Hub Obtienes:",
      painPoints: ["Reservas inconsistentes y horarios vacios", "Clientes olvidando citas o cancelando", "Sin sistema para recopilar y mostrar resenas", "Gastando mucho tiempo en telefono y mensajes"],
      benefits: ["Reservas online que llenan tu agenda automaticamente", "Recordatorios automaticos que reducen ausencias en 80%", "Solicitudes automaticas de resenas despues de cada servicio", "Automatizacion WhatsApp y SMS para comunicacion instantanea"],
      description: "Bee Pro Hub da las herramientas para empresas de limpieza automaticen agendamiento y construyan reputacion online.",
      ctaTitle: "Listo para Crecer Tu Empresa de Limpieza?",
      faq: [
        { q: "Cual es el mejor CRM para empresas de limpieza?", a: "Bee Pro Hub es ideal. Agendamiento, recordatorios, resenas y automatizacion en una plataforma." },
        { q: "Cuanto cuesta?", a: "Desde $97/mes. Prueba gratis 14 dias." },
        { q: "Puedo automatizar el marketing?", a: "Si! Email, SMS, WhatsApp automaticos." },
        { q: "Soporte en espanol?", a: "Si! Soporte 24/7 en ES, EN y PT." },
      ],
    },
  },
  roofing: {
    pt: {
      heroTitle: "Mais Leads de Telhado. Mais Negocios Fechados.",
      heroSubtitle: "De leads de danos por tempestade a clientes recorrentes, gerencie todo seu negocio de roofing em uma plataforma.",
      painTitle: "Isso Soa Familiar?",
      benefitTitle: "Com o Bee Pro Hub Voce Ganha:",
      painPoints: ["Pagando por leads que nunca convertem porque o follow-up e lento", "Perdendo controle de orcamentos enviados e trabalhos em andamento", "Sem forma de alcançar clientes automaticamente apos tempestades", "Concorrentes conseguem os trabalhos porque respondem mais rapido"],
      benefits: ["Follow-up instantaneo em cada lead em segundos", "Pipeline completo da inspecao ao pagamento final", "Campanhas automaticas baseadas em clima para gerar leads", "Orcamentos profissionais com assinatura eletronica do celular"],
      description: "Bee Pro Hub e a ferramenta definitiva para empresas de roofing. Capture leads, faca follow-up instantaneo, rastreie trabalhos e receba pagamentos mais rapido.",
      ctaTitle: "Pronto para Crescer Seu Negocio de Roofing?",
      faq: [
        { q: "Qual o melhor CRM para roofing?", a: "Bee Pro Hub combina CRM, automacao, telefonia e faturamento em uma plataforma feita para roofing." },
        { q: "Quanto custa?", a: "A partir de $97/mes. 14 dias gratis." },
        { q: "Posso automatizar campanhas de tempestade?", a: "Sim! Lance campanhas SMS e email automaticamente apos mau tempo." },
        { q: "Suporte em portugues?", a: "Sim! 24/7 em PT, EN e ES." },
      ],
    },
    es: {
      heroTitle: "Mas Leads de Techos. Mas Negocios Cerrados.",
      heroSubtitle: "Desde leads de danos por tormenta hasta clientes recurrentes, gestiona todo tu negocio de roofing en una plataforma.",
      painTitle: "Te Suena Familiar?",
      benefitTitle: "Con Bee Pro Hub Obtienes:",
      painPoints: ["Pagando por leads que nunca convierten", "Perdiendo control de presupuestos y trabajos", "Sin forma de contactar clientes despues de tormentas", "Competidores consiguen los trabajos porque responden mas rapido"],
      benefits: ["Follow-up instantaneo en cada lead", "Pipeline completo de inspeccion a pago", "Campanas automaticas basadas en clima", "Presupuestos profesionales con firma electronica"],
      description: "Bee Pro Hub es la herramienta definitiva para empresas de roofing.",
      ctaTitle: "Listo para Crecer Tu Negocio de Roofing?",
      faq: [
        { q: "Mejor CRM para roofing?", a: "Bee Pro Hub combina CRM, automatizacion, telefonia y facturacion para roofing." },
        { q: "Cuanto cuesta?", a: "Desde $97/mes. 14 dias gratis." },
        { q: "Automatizar campanas de tormenta?", a: "Si! SMS y email automaticos despues de mal clima." },
        { q: "Soporte en espanol?", a: "Si! 24/7 en ES, EN y PT." },
      ],
    },
  },
  painting: {
    pt: {
      heroTitle: "Pinte um Futuro Maior para Seu Negocio.",
      heroSubtitle: "Gerencie leads, automatize orcamentos e construa reputacao que mantem sua agenda cheia o ano todo.",
      painTitle: "Isso Soa Familiar?",
      benefitTitle: "Com o Bee Pro Hub Voce Ganha:",
      painPoints: ["Queda sazonal com agenda vazia no inverno", "Criar orcamentos demora muito e muitas vezes e esquecido", "Sem sistema para manter contato com clientes anteriores", "Boca a boca nao e suficiente para continuar crescendo"],
      benefits: ["Campanhas sazonais por email e SMS para preencher meses lentos", "Orcamentos rapidos com fotos enviados em minutos", "Follow-ups automaticos com clientes anteriores", "Automacao de Google Reviews para atrair novos clientes"],
      description: "Bee Pro Hub ajuda painters a crescer o ano todo com marketing automatizado, CRM inteligente e ferramentas que tornam orcamentos e comunicacao faceis.",
      ctaTitle: "Pronto para Crescer Seu Negocio de Pintura?",
      faq: [
        { q: "Melhor CRM para pintores?", a: "Bee Pro Hub com CRM, orcamentos, agendamento e automacao." },
        { q: "Quanto custa?", a: "A partir de $97/mes. 14 dias gratis." },
        { q: "Automatizar marketing sazonal?", a: "Sim! Campanhas automaticas por estacao." },
        { q: "Suporte em portugues?", a: "Sim! 24/7." },
      ],
    },
    es: {
      heroTitle: "Pinta un Futuro Mas Grande para Tu Negocio.",
      heroSubtitle: "Gestiona leads, automatiza presupuestos y construye reputacion que mantiene tu agenda llena todo el ano.",
      painTitle: "Te Suena Familiar?",
      benefitTitle: "Con Bee Pro Hub Obtienes:",
      painPoints: ["Baja estacional con agenda vacia en invierno", "Crear presupuestos tarda mucho", "Sin sistema para mantener contacto con clientes anteriores", "Boca a boca no es suficiente para seguir creciendo"],
      benefits: ["Campanas estacionales por email y SMS", "Presupuestos rapidos con fotos en minutos", "Follow-ups automaticos con clientes anteriores", "Automatizacion de Google Reviews"],
      description: "Bee Pro Hub ayuda a pintores a crecer todo el ano con marketing automatizado y CRM inteligente.",
      ctaTitle: "Listo para Crecer Tu Negocio de Pintura?",
      faq: [
        { q: "Mejor CRM para pintores?", a: "Bee Pro Hub con CRM, presupuestos, agendamiento y automatizacion." },
        { q: "Cuanto cuesta?", a: "Desde $97/mes. 14 dias gratis." },
        { q: "Automatizar marketing estacional?", a: "Si! Campanas automaticas por estacion." },
        { q: "Soporte en espanol?", a: "Si! 24/7." },
      ],
    },
  },
  landscaping: {
    pt: {
      heroTitle: "Cresca Seu Negocio de Paisagismo Como Nunca.",
      heroSubtitle: "Automatize comunicacao com clientes, preencha sua agenda e gerencie equipes — tudo em uma plataforma.",
      painTitle: "Isso Soa Familiar?",
      benefitTitle: "Com o Bee Pro Hub Voce Ganha:",
      painPoints: ["Gerenciando varias equipes e locais sem sistema", "Clientes pedindo orcamentos que demoram dias", "Sem forma de vender servicos sazonais para clientes existentes", "Perdendo clientes porque alguem respondeu mais rapido"],
      benefits: ["Respostas automaticas instantaneas para cada consulta", "Orcamentos rapidos com templates para servicos comuns", "Campanhas sazonais automaticas para sua base de clientes", "Agendamento de equipes e rastreamento de trabalhos em um so lugar"],
      description: "Bee Pro Hub da a empresas de paisagismo a vantagem que precisam. Da captura de leads ao agendamento de equipes, tudo conectado.",
      ctaTitle: "Pronto para Crescer Seu Negocio de Paisagismo?",
      faq: [
        { q: "Melhor CRM para paisagismo?", a: "Bee Pro Hub com CRM, agendamento, orcamentos e automacao." },
        { q: "Quanto custa?", a: "A partir de $97/mes. 14 dias gratis." },
        { q: "Automatizar vendas sazonais?", a: "Sim! Campanhas automaticas por estacao." },
        { q: "Suporte em portugues?", a: "Sim! 24/7." },
      ],
    },
    es: {
      heroTitle: "Crece Tu Negocio de Paisajismo Como Nunca.",
      heroSubtitle: "Automatiza comunicacion con clientes, llena tu agenda y gestiona equipos — todo en una plataforma.",
      painTitle: "Te Suena Familiar?",
      benefitTitle: "Con Bee Pro Hub Obtienes:",
      painPoints: ["Gestionando varios equipos y ubicaciones sin sistema", "Clientes pidiendo presupuestos que tardan dias", "Sin forma de vender servicios estacionales", "Perdiendo clientes porque alguien respondio mas rapido"],
      benefits: ["Respuestas automaticas instantaneas", "Presupuestos rapidos con templates", "Campanas estacionales automaticas", "Agendamiento de equipos en un solo lugar"],
      description: "Bee Pro Hub da a empresas de paisajismo la ventaja que necesitan.",
      ctaTitle: "Listo para Crecer Tu Negocio de Paisajismo?",
      faq: [
        { q: "Mejor CRM para paisajismo?", a: "Bee Pro Hub con CRM, agendamiento, presupuestos y automatizacion." },
        { q: "Cuanto cuesta?", a: "Desde $97/mes. 14 dias gratis." },
        { q: "Automatizar ventas estacionales?", a: "Si!" },
        { q: "Soporte en espanol?", a: "Si! 24/7." },
      ],
    },
  },
};
