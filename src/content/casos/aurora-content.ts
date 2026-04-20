// Aurora case study — bilingual content.
// Contenido separado del layout para habilitar EN sin duplicar JSX.
// Patrón: importar en page.tsx, elegir por locale.

export type AuroraContent = {
  eyebrow: string;
  title: string;
  heroDesc: string;
  metaDates: [string, string];
  statsBanner: { stat: string; label: string }[];
  challengeEyebrow: string;
  challengeHeading: string;
  challengeBody: string[];
  challengeCards: { stat: string; title: string; desc: string }[];
  solutionEyebrow: string;
  solutionHeading: string;
  solutionSteps: { step: string; title: string; desc: string }[];
  resultsEyebrow: string;
  resultsHeading: string;
  tableHeaders: [string, string, string];
  tableRows: { metric: string; before: string; after: string }[];
  impactStats: { value: string; label: string }[];
  stackEyebrow: string;
  stackHeading: string;
  stackNote: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
};

export const auroraContent: Record<"es" | "en", AuroraContent> = {
  es: {
    eyebrow: "Want2Peak · Academia de idiomas",
    title: "Aurora",
    heroDesc:
      "Agente conversacional de IA que responde consultas 24/7 en WhatsApp, califica leads automaticamente y escala al equipo solo cuando es necesario.",
    metaDates: ["43 dias en produccion", "Ene — Feb 2026"],
    statsBanner: [
      { stat: "119x", label: "ROI neto" },
      { stat: "98.8%", label: "Autonomia del agente" },
      { stat: "$11.34M", label: "COP valor generado" },
    ],
    challengeEyebrow: "El desafio",
    challengeHeading:
      "70% de las consultas llegaban cuando nadie podia responder.",
    challengeBody: [
      "Want2Peak English Academy recibia mensajes de WhatsApp todos los dias: precios, horarios, disponibilidad, inscripciones. El 70% de esos mensajes llegaban entre las 7pm y 11pm — completamente fuera del horario del equipo.",
      "Para cuando respondian al dia siguiente, muchos leads ya habian contactado a la competencia.",
    ],
    challengeCards: [
      {
        stat: "992",
        title: "Mensajes por mes",
        desc: "Respondidos manualmente por un equipo pequeno — 55 horas/mes de trabajo solo en WhatsApp.",
      },
      {
        stat: "12h+",
        title: "Tiempo de respuesta fuera de horario",
        desc: "Leads que escribian de noche recibian respuesta al dia siguiente. Muchos ya no estaban interesados.",
      },
      {
        stat: "$609K",
        title: "COP en tiempo de personal",
        desc: "Costo mensual de responder manualmente — equivalente a 7 dias completos de un empleado.",
      },
    ],
    solutionEyebrow: "La solucion",
    solutionHeading: "Un sistema en 3 capas que nunca duerme.",
    solutionSteps: [
      {
        step: "01",
        title: "Responde",
        desc: "Aurora contesta consultas en WhatsApp en menos de 10 segundos — a cualquier hora, los 7 dias de la semana. Usa lenguaje natural, no menus roboticos.",
      },
      {
        step: "02",
        title: "Califica",
        desc: "Identifica automaticamente el tipo de lead (demo gratuita, programa kids, inscripcion directa) y recopila datos de contacto completos sin friccion.",
      },
      {
        step: "03",
        title: "Escala",
        desc: "Solo el 1.2% de las conversaciones necesitaron intervencion humana. El equipo recibe una notificacion en Slack con el contexto completo — sin repreguntas.",
      },
    ],
    resultsEyebrow: "Resultados",
    resultsHeading: "Numeros reales. Periodo de 43 dias.",
    tableHeaders: ["Metrica", "Antes", "Despues"],
    tableRows: [
      {
        metric: "Tiempo de respuesta",
        before: "Horas (o nunca fuera de horario)",
        after: "< 10 segundos, 24/7",
      },
      {
        metric: "Horas en WhatsApp",
        before: "55 horas/mes",
        after: "0 horas — 100% autonomo",
      },
      {
        metric: "Leads calificados",
        before: "0 sistema de calificacion",
        after: "56 leads con datos completos",
      },
      {
        metric: "Inscripciones generadas",
        before: "Seguimiento manual",
        after: "6 directas ($8.93M) + 15 Kids ($1.8M) = $10.73M COP",
      },
      {
        metric: "Costo del sistema",
        before: "—",
        after: "$95,000 COP / mes",
      },
      {
        metric: "Escalacion a humano",
        before: "100% manual",
        after: "1.2% — solo 12 de 992 mensajes",
      },
    ],
    impactStats: [
      { value: "992", label: "Mensajes procesados" },
      { value: "144", label: "Personas atendidas" },
      { value: "56", label: "Leads calificados" },
      { value: "119x", label: "ROI neto" },
    ],
    stackEyebrow: "Stack tecnico",
    stackHeading: "Herramientas utilizadas.",
    stackNote:
      "Costo operativo mensual: $77,662 COP (~$18 USD). Incluye APIs, servidor y almacenamiento.",
    ctaHeading: "¿Quieres algo asi para tu negocio?",
    ctaBody:
      "Una llamada de 20 minutos y sales con un diagnostico concreto — aunque no trabajemos juntos.",
    ctaButton: "Agendar llamada",
  },

  en: {
    eyebrow: "Want2Peak · Language Academy",
    title: "Aurora",
    heroDesc:
      "A conversational AI agent that handles student inquiries 24/7 on WhatsApp, qualifies leads automatically, and escalates to the team only when truly needed.",
    metaDates: ["43 days in production", "Jan — Feb 2026"],
    statsBanner: [
      { stat: "119x", label: "Net ROI" },
      { stat: "98.8%", label: "Agent autonomy" },
      { stat: "$11.34M", label: "COP value generated" },
    ],
    challengeEyebrow: "The challenge",
    challengeHeading: "70% of inquiries arrived when no one could respond.",
    challengeBody: [
      "Want2Peak English Academy received WhatsApp messages every day: pricing, schedules, availability, enrollments. 70% of those messages arrived between 7pm and 11pm — completely outside business hours.",
      "By the time the team replied the next morning, many leads had already signed up with a competitor.",
    ],
    challengeCards: [
      {
        stat: "992",
        title: "Messages per month",
        desc: "All handled manually by a small team — 55 hours/month of work just on WhatsApp.",
      },
      {
        stat: "12h+",
        title: "Response time after hours",
        desc: "Leads who wrote at night got a reply the next day. Many had lost interest by then.",
      },
      {
        stat: "$609K",
        title: "COP in staff time",
        desc: "Monthly cost of manual responses — equivalent to 7 full work days from one employee.",
      },
    ],
    solutionEyebrow: "The solution",
    solutionHeading: "A 3-layer system that never sleeps.",
    solutionSteps: [
      {
        step: "01",
        title: "Responds",
        desc: "Aurora answers WhatsApp inquiries in under 10 seconds — any hour, 7 days a week. Natural language, no robotic menus.",
      },
      {
        step: "02",
        title: "Qualifies",
        desc: "Automatically identifies lead type (free demo, kids program, direct enrollment) and collects full contact details — frictionlessly.",
      },
      {
        step: "03",
        title: "Escalates",
        desc: "Only 1.2% of conversations needed human intervention. The team gets a Slack notification with full context — no repeat questions.",
      },
    ],
    resultsEyebrow: "Results",
    resultsHeading: "Real numbers. 43-day period.",
    tableHeaders: ["Metric", "Before", "After"],
    tableRows: [
      {
        metric: "Response time",
        before: "Hours (or never after hours)",
        after: "< 10 seconds, 24/7",
      },
      {
        metric: "Hours on WhatsApp",
        before: "55 hours/month",
        after: "0 hours — 100% autonomous",
      },
      {
        metric: "Qualified leads",
        before: "No qualification system",
        after: "56 leads with full contact data",
      },
      {
        metric: "Enrollments generated",
        before: "Manual follow-up",
        after: "6 direct ($8.93M) + 15 Kids ($1.8M) = $10.73M COP",
      },
      {
        metric: "System cost",
        before: "—",
        after: "$95,000 COP / month",
      },
      {
        metric: "Escalation to human",
        before: "100% manual",
        after: "1.2% — only 12 of 992 messages",
      },
    ],
    impactStats: [
      { value: "992", label: "Messages processed" },
      { value: "144", label: "People served" },
      { value: "56", label: "Qualified leads" },
      { value: "119x", label: "Net ROI" },
    ],
    stackEyebrow: "Technical stack",
    stackHeading: "Tools used.",
    stackNote:
      "Monthly operating cost: $77,662 COP (~$18 USD). Includes APIs, server and storage.",
    ctaHeading: "Want something like this for your business?",
    ctaBody:
      "A 20-minute call and you walk away with a concrete diagnosis — even if we never work together.",
    ctaButton: "Book a call",
  },
};
