// SURA case study — bilingual content.
// Contenido separado del layout para habilitar EN sin duplicar JSX.
// Patrón: importar en page.tsx, elegir por locale.

export type SuraContent = {
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

export const suraContent: Record<"es" | "en", SuraContent> = {
  es: {
    eyebrow: "SURA · Seguros de salud",
    title: "CRM Vigencias",
    heroDesc:
      "Sistema centralizado que calcula vigencias automaticamente, unifica 3 bases de datos dispersas y ejecuta alertas proactivas para fidelizacion y recaudo.",
    metaDates: ["1 mes de implementacion", "Enero 2026 — Feb 2026"],
    statsBanner: [
      { stat: "0", label: "Errores en calculo de vigencias" },
      { stat: "20h", label: "Recuperadas por mes" },
      { stat: "200+", label: "Registros centralizados" },
    ],
    challengeEyebrow: "El desafio",
    challengeHeading:
      "Un error de 1 día y tu cliente espera un mes sin cobertura medica.",
    challengeBody: [
      "SURA establece que las afiliaciones recibidas en los primeros 5 días habiles del mes inician cobertura el mes siguiente (M+1). Si llegan despues, la cobertura se retrasa al subsiguiente (M+2).",
      "Calcular manualmente cuando cae el \u201cdía habil 5\u201d es casi imposible sin errores. Los festivos colombianos cambian cada ano \u2014 Semana Santa se mueve, los puentes se mueven.",
      "El resultado: 2-3 errores por mes. Cada uno significaba un cliente esperando un mes adicional por la cobertura medica que ya pago.",
    ],
    challengeCards: [
      {
        stat: "2-3",
        title: "Errores de calculo por mes",
        desc: "Cada error retrasaba la cobertura del cliente un mes completo \u2014 generando frustraci\u00f3n, reprocesos y riesgo de cancelaci\u00f3n.",
      },
      {
        stat: "3",
        title: "Fuentes de datos dispersas",
        desc: "Informaci\u00f3n de clientes repartida en hojas de c\u00e1lculo de redes sociales, reportes de SURA y listas de referidos.",
      },
      {
        stat: "15 min",
        title: "Armando la agenda cada ma\u00f1ana",
        desc: "Sin alertas automaticas, el asesor dependía de su memoria para renovaciones, cumplea\u00f1os y seguimiento de pagos.",
      },
    ],
    solutionEyebrow: "La solucion",
    solutionHeading: "Un CRM que conoce las reglas del negocio.",
    solutionSteps: [
      {
        step: "01",
        title: "Cálculo automático",
        desc: "El sistema determina el día hábil 5 de cada mes con festivos colombianos incluidos y calcula si la vigencia inicia en M+1 o M+2 \u2014 sin que el asesor haga ningún cálculo.",
      },
      {
        step: "02",
        title: "5 vistas especializadas",
        desc: "Cada etapa del cliente (prospección, trámite, activo, mora) tiene su propia pantalla con solo los campos relevantes. El asesor ve lo que necesita, cuando lo necesita.",
      },
      {
        step: "03",
        title: "6 alertas automaticas",
        desc: "Próximo contacto, inicio de cobertura, cumpleaños, día de pago, renovación 30 días antes, mora. Todo via email a las 6-9am \u2014 la agenda del día se arma sola.",
      },
    ],
    resultsEyebrow: "Resultados",
    resultsHeading: "1 mes en producción. Cero errores.",
    tableHeaders: ["Metrica", "Antes", "Despues"],
    tableRows: [
      {
        metric: "Cálculo de vigencias",
        before: "5-10 min por tramite (manual)",
        after: "0 min \u2014 automático al ingresar fecha",
      },
      {
        metric: "Errores en Regla del día 5",
        before: "2-3 por mes",
        after: "0 en 6 meses",
      },
      {
        metric: "Fuentes de datos",
        before: "3 dispersas (Excel, SURA, papel)",
        after: "1 centralizada",
      },
      {
        metric: "Revisión diaria de agenda",
        before: "15-20 min cada mañana",
        after: "2 min \u2014 email automático",
      },
      {
        metric: "Clientes perdidos por olvido",
        before: "1-2 por a\u00f1o",
        after: "0 \u2014 alerta 30 días antes",
      },
    ],
    impactStats: [
      { value: "0", label: "Errores en vigencias" },
      { value: "20h", label: "Recuperadas por mes" },
      { value: "200+", label: "Registros centralizados" },
      { value: "6", label: "Alertas automáticas" },
    ],
    stackEyebrow: "Stack técnico",
    stackHeading: "Herramientas utilizadas.",
    stackNote:
      "Costo operativo mensual: ~$216,692 COP (~$60 USD). Plan team de SmartSuite/3 usuarios.",
    ctaHeading: "¿Tu negocio tiene fechas criticas que gestionas a mano?",
    ctaBody:
      "Una llamada de 20 minutos y sales con un díagnostico concreto \u2014 aunque no trabajemos juntos.",
    ctaButton: "Hablemos de tu proceso",
  },

  en: {
    eyebrow: "SURA · Health Insurance",
    title: "Policy CRM",
    heroDesc:
      "A centralized system that calculates policy effective dates automatically, unifies 3 scattered databases, and sends proactive alerts for renewals and collections.",
    metaDates: ["6 months of implementation", "Aug 2025 — Feb 2026"],
    statsBanner: [
      { stat: "0", label: "Errors in policy calculations" },
      { stat: "20h", label: "Recovered per month" },
      { stat: "200+", label: "Centralized records" },
    ],
    challengeEyebrow: "The challenge",
    challengeHeading:
      "One wrong date means a client waits a full month without medical coverage.",
    challengeBody: [
      "SURA rules state that enrollments received in the first 5 business days of the month start coverage the following month (M+1). If they arrive later, coverage is pushed back by another month (M+2).",
      "Calculating exactly when 'business day 5' falls is nearly impossible to do manually without errors. Colombian holidays shift every year — Easter moves, long weekends move.",
      "The result: 2-3 errors per month. Each one meant a client waiting an extra month for medical coverage they had already paid for.",
    ],
    challengeCards: [
      {
        stat: "2-3",
        title: "Calculation errors per month",
        desc: "Each error delayed a client's coverage by a full month — causing frustration, rework, and risk of cancellation.",
      },
      {
        stat: "3",
        title: "Scattered data sources",
        desc: "Client information spread across social medía spreadsheets, SURA reports, and referral lists.",
      },
      {
        stat: "15 min",
        title: "Building the daily agenda",
        desc: "Without automatic alerts, the advisor relied on memory for renewals, birthdays and payment follow-ups.",
      },
    ],
    solutionEyebrow: "The solution",
    solutionHeading: "A CRM that knows the business rules.",
    solutionSteps: [
      {
        step: "01",
        title: "Automatic calculation",
        desc: "The system determines business day 5 for each month — Colombian holidays included — and calculates whether coverage starts M+1 or M+2. Zero manual math required.",
      },
      {
        step: "02",
        title: "5 specialized views",
        desc: "Each client stage (prospecting, processing, active, overdue) has its own screen showing only the relevant fields. The advisor sees what they need, when they need it.",
      },
      {
        step: "03",
        title: "6 automatic alerts",
        desc: "Next contact, coverage start, birthday, payment day, renewal 30 days out, overdue. All via email at 6-9am — the daily agenda builds itself.",
      },
    ],
    resultsEyebrow: "Results",
    resultsHeading: "6 months in production. Zero errors.",
    tableHeaders: ["Metric", "Before", "After"],
    tableRows: [
      {
        metric: "Policy date calculation",
        before: "5-10 min per record (manual)",
        after: "0 min — automatic on date entry",
      },
      {
        metric: "Errors in Day-5 Rule",
        before: "2-3 per month",
        after: "0 in 6 months",
      },
      {
        metric: "Data sources",
        before: "3 scattered (Excel, SURA, paper)",
        after: "1 centralized",
      },
      {
        metric: "Daily agenda review",
        before: "15-20 min every morning",
        after: "2 min — automatic email",
      },
      {
        metric: "Clients lost to oversight",
        before: "1-2 per year",
        after: "0 — alert 30 days in advance",
      },
    ],
    impactStats: [
      { value: "0", label: "Policy errors" },
      { value: "20h", label: "Recovered per month" },
      { value: "200+", label: "Centralized records" },
      { value: "6", label: "Automatic alerts" },
    ],
    stackEyebrow: "Technical stack",
    stackHeading: "Tools used.",
    stackNote:
      "Monthly operating cost: ~$216,692 COP (~$60 USD). Smartsuite team plan/3 users.",
    ctaHeading: "Does your business have critical dates you manage manually?",
    ctaBody:
      "A 20-minute call and you walk away with a concrete díagnosis — even if we never work together.",
    ctaButton: "Let's talk about your process",
  },
};
