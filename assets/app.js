const STORAGE_KEY = "perceptris-workshop-state-v3";
const SCHEMA_VERSION = 3;
const DEFAULT_HOURLY_RATE = 20;
const DEMO_DATA_PATH = "./demo-data/sample-data.json";

const OPTIONS = {
  hierarchyLevel: [
    "Bereichsleitung",
    "Geschäftsführung",
    "Gesellschafter",
    "Mitarbeitend",
    "Teamleitung"
  ].sort(localeSort),
  domain: [
    "Entwicklung",
    "Einkauf",
    "Finanzen",
    "HR",
    "IT",
    "Marketing",
    "Operations",
    "Produktion",
    "Service",
    "Support",
    "Vertrieb"
  ].sort(localeSort),
  descriptionCategory: [
    "Abstimmung / Koordination",
    "Dokumentenerstellung",
    "Manuelle Tätigkeiten",
    "Produktionsprozess",
    "Qualitätssicherung",
    "Recherche / Zusammenstellung",
    "Reporting",
    "Robotik / Handling",
    "Sensorik / Datenerfassung",
    "Sichtprüfung / Bilderkennung",
    "Wiederkehrende Administration"
  ].sort(localeSort),
  frequency: [
    { value: "daily", label: "Täglich" },
    { value: "monthly", label: "Monatlich" },
    { value: "weekly", label: "Wöchentlich" }
  ].sort((a, b) => localeSort(a.label, b.label)),
  painLevel: [
    { value: "1", label: "Mild" },
    { value: "2", label: "Spürbar" },
    { value: "3", label: "Kritisch" },
    { value: "4", label: "Akut" }
  ],
  errorProne: [
    { value: "", label: "Bitte wählen" },
    { value: "no", label: "Nein" },
    { value: "yes", label: "Ja" }
  ],
  dataAvailability: [
    "Gut strukturiert digital vorhanden",
    "Kaum digital verfügbar",
    "Teilweise digital, verteilt",
    "Überwiegend unstrukturiert"
  ].sort(localeSort),
  automatable: [
    { value: "", label: "Bitte wählen" },
    { value: "maybe", label: "Teilweise" },
    { value: "no", label: "Nein" },
    { value: "yes", label: "Ja" }
  ].sort((a, b) => localeSort(a.label, b.label)),
  impact: [
    { value: "", label: "Bitte wählen" },
    { value: "high", label: "Hoch" },
    { value: "low", label: "Niedrig" },
    { value: "medium", label: "Mittel" }
  ].sort((a, b) => localeSort(a.label, b.label))
};

const IMPACT_ORDER = { high: 3, medium: 2, low: 1, "": 0 };
const IMPACT_LABELS = { high: "Hoch", medium: "Mittel", low: "Niedrig", "": "Offen" };
const AUTOMATABLE_LABELS = { yes: "Ja", maybe: "Teilweise", no: "Nein", "": "Offen" };
const PAIN_LEVEL_LABELS = {
  1: "Mild",
  2: "Spürbar",
  3: "Kritisch",
  4: "Akut",
  "": "Offen"
};
const PAIN_LEVEL_ORDER = [
  "Mild",
  "Spürbar",
  "Kritisch",
  "Akut",
  "Offen"
];

const BUNDLED_DEMO_STATE = {
  "projectMeta": {
    "projectName": "Perceptris KI-Workshop Demounternehmen"
  },
  "useCases": [
    {
      "id": "demo-1",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Entwicklung",
      "roleTitle": "QA Engineer",
      "processName": "Regressionstests für Builds manuell dokumentieren",
      "descriptionCategory": "Qualitätssicherung",
      "descriptionNote": "Testergebnisse werden aus mehreren Tools zusammengeführt und für Releases manuell in Tabellen übertragen.",
      "frequency": "weekly",
      "minutesPerRun": 45,
      "countPerFrequency": 4,
      "hourlyRate": 42,
      "painLevel": 3,
      "errorProne": "yes",
      "errorProneNote": "Fehlende Testläufe oder falsche Versionsstände werden bei hohem Tempo leicht übersehen.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Informationen in mehreren Quellen",
        "Viele manuelle Schritte"
      ],
      "inefficiencyNote": "Build-Pipeline, Ticketing und Testdokumentation sind nicht durchgängig verbunden.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-2",
      "hierarchyLevel": "Teamleitung",
      "domain": "Entwicklung",
      "roleTitle": "Product Owner",
      "processName": "Sprint-Rückmeldungen aus Tickets und Meetings verdichten",
      "descriptionCategory": "Abstimmung / Koordination",
      "descriptionNote": "Statusinformationen aus Tickets, Meetings und Chatkanälen werden manuell in Stakeholder-Updates überführt.",
      "frequency": "weekly",
      "minutesPerRun": 55,
      "countPerFrequency": 2,
      "hourlyRate": 58,
      "painLevel": 2,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele Rückfragen oder Abstimmungen",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Der Konsolidierungsaufwand liegt vor allem in der Abstimmung zwischen Fachbereich und Entwicklung.",
      "automatable": "maybe",
      "impact": "medium"
    },
    {
      "id": "demo-3",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Vertrieb",
      "roleTitle": "Vertriebsinnendienst",
      "processName": "Manuelle Angebotserstellung für Sonderteile",
      "descriptionCategory": "Dokumentenerstellung",
      "descriptionNote": "Pro Woche werden Sonderteilangebote manuell zusammengestellt, Preise aus mehreren Quellen verglichen und PDFs nachbearbeitet.",
      "frequency": "weekly",
      "minutesPerRun": 28,
      "countPerFrequency": 12,
      "hourlyRate": 28,
      "painLevel": 3,
      "errorProne": "yes",
      "errorProneNote": "Falsche Preispositionen und vergessene Rabatte kommen regelmäßig vor.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Informationen in mehreren Quellen",
        "Viele Rückfragen oder Abstimmungen"
      ],
      "inefficiencyNote": "CRM, Preislisten und alte Vorlagen müssen manuell abgeglichen werden.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-4",
      "hierarchyLevel": "Bereichsleitung",
      "domain": "Vertrieb",
      "roleTitle": "Vertriebsleitung",
      "processName": "Pipeline-Reviews aus CRM und Excel zusammenführen",
      "descriptionCategory": "Reporting",
      "descriptionNote": "Forecast, Risiken und vertriebliche Maßnahmen werden aus CRM, Excel und Gesprächsnotizen verdichtet.",
      "frequency": "weekly",
      "minutesPerRun": 70,
      "countPerFrequency": 1,
      "hourlyRate": 64,
      "painLevel": 2,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Informationen in mehreren Quellen",
        "Viele manuelle Schritte"
      ],
      "inefficiencyNote": "Die operative Sicht liegt im CRM, Sonderfälle aber häufig außerhalb des Systems.",
      "automatable": "maybe",
      "impact": "medium"
    },
    {
      "id": "demo-5",
      "hierarchyLevel": "Teamleitung",
      "domain": "Service",
      "roleTitle": "Servicekoordination",
      "processName": "Einsatzplanung von Technikern per Telefon und Excel",
      "descriptionCategory": "Abstimmung / Koordination",
      "descriptionNote": "Täglich werden Termine, Ersatzteile und Touren telefonisch abgestimmt und in mehreren Listen nachgeführt.",
      "frequency": "daily",
      "minutesPerRun": 20,
      "countPerFrequency": 8,
      "hourlyRate": 26,
      "painLevel": 4,
      "errorProne": "yes",
      "errorProneNote": "Doppelte Termine und fehlende Materialinfo führen zu Leerlauf auf der Baustelle.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele Rückfragen oder Abstimmungen",
        "Informationen in mehreren Quellen",
        "Fehlende Standards oder klare Abläufe"
      ],
      "inefficiencyNote": "Die Disposition springt zwischen Telefon, Outlook, ERP und Excel.",
      "automatable": "maybe",
      "impact": "high"
    },
    {
      "id": "demo-6",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Produktion",
      "roleTitle": "Linienbedienung",
      "processName": "Manuelle Sichtprüfung von Bauteilen vor Verpackung",
      "descriptionCategory": "Sichtprüfung / Bilderkennung",
      "descriptionNote": "Bauteile werden nach jeder Charge manuell gesichtet, gezählt und auf Schäden kontrolliert.",
      "frequency": "daily",
      "minutesPerRun": 15,
      "countPerFrequency": 20,
      "hourlyRate": 24,
      "painLevel": 2,
      "errorProne": "yes",
      "errorProneNote": "Kleine Defekte werden bei hohem Takt leicht übersehen.",
      "dataAvailability": "Kaum digital verfügbar",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Manuelle Prüf- oder Dokumentationsarbeit"
      ],
      "inefficiencyNote": "Die Qualitätsprüfung ist personengebunden und nur in Papierlisten dokumentiert.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-7",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Produktion",
      "roleTitle": "Schichtführung",
      "processName": "Nachführen von Störungsgründen pro Maschine",
      "descriptionCategory": "Sensorik / Datenerfassung",
      "descriptionNote": "Störungen werden je Schicht händisch notiert, später in Excel zusammengeführt und analysiert.",
      "frequency": "daily",
      "minutesPerRun": 12,
      "countPerFrequency": 10,
      "hourlyRate": 29,
      "painLevel": 3,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Überwiegend unstrukturiert",
      "inefficiencyReasons": [
        "Manuelle Prüf- oder Dokumentationsarbeit",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Maschinenmeldungen, Handschriften und Rückmeldungen werden erst spät konsolidiert.",
      "automatable": "maybe",
      "impact": "medium"
    },
    {
      "id": "demo-8",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Einkauf",
      "roleTitle": "Operativer Einkauf",
      "processName": "Preisvergleiche für kritische Komponenten",
      "descriptionCategory": "Recherche / Zusammenstellung",
      "descriptionNote": "Lieferantenpreise, Lieferzeiten und Mindestmengen werden jede Woche manuell aus Mails, Portalen und ERP zusammengetragen.",
      "frequency": "weekly",
      "minutesPerRun": 35,
      "countPerFrequency": 7,
      "hourlyRate": 27,
      "painLevel": 3,
      "errorProne": "yes",
      "errorProneNote": "Veraltete Preislisten und übersehene Lieferzeiten führen zu Fehlentscheidungen.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Hoher Such- oder Rüstaufwand",
        "Informationen in mehreren Quellen",
        "Viele manuelle Schritte"
      ],
      "inefficiencyNote": "Preis- und Lieferanteninformationen sind in Portalen, E-Mails und ERP verteilt.",
      "automatable": "yes",
      "impact": "medium"
    },
    {
      "id": "demo-9",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Marketing",
      "roleTitle": "Marketing Manager",
      "processName": "Leads aus Messekontakten manuell qualifizieren",
      "descriptionCategory": "Recherche / Zusammenstellung",
      "descriptionNote": "Kontakte aus Scans, Visitenkarten und Formularen werden manuell geprüft, ergänzt und im CRM angelegt.",
      "frequency": "weekly",
      "minutesPerRun": 30,
      "countPerFrequency": 6,
      "hourlyRate": 34,
      "painLevel": 2,
      "errorProne": "yes",
      "errorProneNote": "Dublette Kontakte und unvollständige Felder führen zu Nacharbeit im Vertrieb.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Die Daten liegen in Scans, Excel-Dateien und Formularen vor und müssen zusammengeführt werden.",
      "automatable": "yes",
      "impact": "medium"
    },
    {
      "id": "demo-10",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "IT",
      "roleTitle": "Systemadministration",
      "processName": "Zugriffsanträge aus Mails in Tickets überführen",
      "descriptionCategory": "Wiederkehrende Administration",
      "descriptionNote": "Freigaben, Rückfragen und Ticketanlage laufen über mehrere Kanäle und werden manuell konsolidiert.",
      "frequency": "daily",
      "minutesPerRun": 18,
      "countPerFrequency": 10,
      "hourlyRate": 38,
      "painLevel": 2,
      "errorProne": "yes",
      "errorProneNote": "Unklare Berechtigungen und fehlende Freigaben verzögern die Bearbeitung.",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele Rückfragen oder Abstimmungen",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Mail, Ticketing und IAM-Systeme sind nicht direkt verbunden.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-11",
      "hierarchyLevel": "Teamleitung",
      "domain": "IT",
      "roleTitle": "Service Desk Lead",
      "processName": "Incidents nach Dringlichkeit manuell vorsortieren",
      "descriptionCategory": "Wiederkehrende Administration",
      "descriptionNote": "Tickets werden manuell gelesen, kategorisiert und priorisiert, bevor sie an Teams weitergeleitet werden.",
      "frequency": "daily",
      "minutesPerRun": 14,
      "countPerFrequency": 16,
      "hourlyRate": 41,
      "painLevel": 3,
      "errorProne": "yes",
      "errorProneNote": "Falsch priorisierte Tickets verursachen Eskalationen und Mehrarbeit.",
      "dataAvailability": "Gut strukturiert digital vorhanden",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Fehlende Standards oder klare Abläufe"
      ],
      "inefficiencyNote": "Die Regeln zur Klassifizierung sind bekannt, werden aber noch nicht systematisch unterstützt.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-12",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Support",
      "roleTitle": "Customer Support",
      "processName": "Standardantworten aus Altfällen zusammensuchen",
      "descriptionCategory": "Recherche / Zusammenstellung",
      "descriptionNote": "Supportmitarbeitende durchsuchen alte Tickets, Vorlagen und Produktdokumentation für wiederkehrende Fälle.",
      "frequency": "daily",
      "minutesPerRun": 12,
      "countPerFrequency": 18,
      "hourlyRate": 25,
      "painLevel": 2,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Hoher Such- oder Rüstaufwand",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Wissen liegt in Tickets, PDF-Handbüchern und privaten Textbausteinen.",
      "automatable": "yes",
      "impact": "medium"
    },
    {
      "id": "demo-13",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Finanzen",
      "roleTitle": "Debitorenbuchhaltung",
      "processName": "Zahlungseingänge mit offenen Posten abgleichen",
      "descriptionCategory": "Wiederkehrende Administration",
      "descriptionNote": "Kontoauszüge, Verwendungszwecke und ERP-Offenposten werden manuell abgeglichen und kommentiert.",
      "frequency": "daily",
      "minutesPerRun": 22,
      "countPerFrequency": 7,
      "hourlyRate": 31,
      "painLevel": 3,
      "errorProne": "yes",
      "errorProneNote": "Mehrdeutige Verwendungszwecke führen zu falschen Zuordnungen.",
      "dataAvailability": "Gut strukturiert digital vorhanden",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Bankdaten und ERP-Informationen sind vorhanden, aber der Abgleich ist noch manuell.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-14",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "HR",
      "roleTitle": "HR Administration",
      "processName": "Bewerbungsunterlagen für Fachbereiche vorsortieren",
      "descriptionCategory": "Recherche / Zusammenstellung",
      "descriptionNote": "Unterlagen werden gelesen, mit Stellenprofilen verglichen und für Fachbereiche aufbereitet.",
      "frequency": "weekly",
      "minutesPerRun": 25,
      "countPerFrequency": 12,
      "hourlyRate": 30,
      "painLevel": 2,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Viele Rückfragen oder Abstimmungen"
      ],
      "inefficiencyNote": "Unterschiedliche Erwartungen der Fachbereiche führen zu mehrfachen Schleifen.",
      "automatable": "no",
      "impact": "medium"
    },
    {
      "id": "demo-15",
      "hierarchyLevel": "Gesellschafter",
      "domain": "Operations",
      "roleTitle": "Geschäftsentwicklung",
      "processName": "Monatliches Managementreporting aus vier Systemen",
      "descriptionCategory": "Reporting",
      "descriptionNote": "Kennzahlen aus ERP, CRM, Service und Produktion werden monatlich manuell zusammengeführt und für das Management aufbereitet.",
      "frequency": "monthly",
      "minutesPerRun": 300,
      "countPerFrequency": 1,
      "hourlyRate": 55,
      "painLevel": 2,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Gut strukturiert digital vorhanden",
      "inefficiencyReasons": [
        "Informationen in mehreren Quellen",
        "Viele manuelle Schritte"
      ],
      "inefficiencyNote": "Die Inhalte sind vorhanden, aber die Aufbereitung ist repetitiv und bindet hochqualifizierte Zeit.",
      "automatable": "yes",
      "impact": "high"
    },
    {
      "id": "demo-16",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "HR",
      "roleTitle": "Personalentwicklung",
      "processName": "Mitarbeitergespräche in Freitextprotokolle übertragen",
      "descriptionCategory": "Dokumentenerstellung",
      "descriptionNote": "Gesprächsnotizen werden individuell formuliert, abgestimmt und archiviert, ohne klare Struktur für eine belastbare Auswertung.",
      "frequency": "weekly",
      "minutesPerRun": 40,
      "countPerFrequency": 4,
      "hourlyRate": 33,
      "painLevel": 1,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Überwiegend unstrukturiert",
      "inefficiencyReasons": [
        "Viele manuelle Schritte",
        "Fehlende Standards oder klare Abläufe"
      ],
      "inefficiencyNote": "Die Inhalte sind stark situationsabhängig und leben von persönlicher Formulierung und Einordnung.",
      "automatable": "no",
      "impact": "low"
    },
    {
      "id": "demo-17",
      "hierarchyLevel": "Mitarbeitend",
      "domain": "Marketing",
      "roleTitle": "Eventkoordination",
      "processName": "Messeauftritt mit externen Partnern abstimmen",
      "descriptionCategory": "Abstimmung / Koordination",
      "descriptionNote": "Absprachen mit Veranstaltern, Standbauern und internen Beteiligten laufen über viele Einzelfälle und individuelle Entscheidungen.",
      "frequency": "weekly",
      "minutesPerRun": 50,
      "countPerFrequency": 2,
      "hourlyRate": 36,
      "painLevel": 1,
      "errorProne": "no",
      "errorProneNote": "",
      "dataAvailability": "Teilweise digital, verteilt",
      "inefficiencyReasons": [
        "Viele Rückfragen oder Abstimmungen",
        "Informationen in mehreren Quellen"
      ],
      "inefficiencyNote": "Der Aufwand ist real, aber stark durch persönliche Abstimmung und einmalige Rahmenbedingungen geprägt.",
      "automatable": "no",
      "impact": "low"
    }
  ],
  "uiPreferences": {
    "activeView": "overview",
    "sortBy": "score",
    "filterRole": "",
    "filterAutomatable": "",
    "filterImpact": ""
  },
  "schemaVersion": 3
};

const state = {
  projectMeta: { projectName: "" },
  useCases: [],
  uiPreferences: {
    activeView: "overview",
    sortBy: "score",
    filterRole: "",
    filterAutomatable: "",
    filterImpact: ""
  },
  schemaVersion: SCHEMA_VERSION,
  localMeta: {
    demoMode: false,
    previousUserState: null
  }
};

const networkState = {
  nodes: [],
  hoverNodeId: null,
  focusedNodeId: null
};

const refs = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheRefs();
  bindEvents();
  hydrateState();
  populateStaticOptions();
  ensureFilterOptions();
  ensureWizardProgress();
  syncMetaInputs();
  updateDemoButton();
  setView(state.uiPreferences.activeView || "overview");
  renderAll();
  startNetwork();
}

function cacheRefs() {
  refs.projectName = document.getElementById("projectName");
  refs.storageStatus = document.getElementById("storageStatus");
  refs.navButtons = [...document.querySelectorAll(".topnav__button")];
  refs.views = [...document.querySelectorAll(".view")];
  refs.networkCanvas = document.getElementById("networkCanvas");
  refs.networkTooltip = document.getElementById("networkTooltip");
  refs.matrixIndexCount = document.getElementById("matrixIndexCount");
  refs.matrixIndexList = document.getElementById("matrixIndexList");
  refs.useCaseForm = document.getElementById("useCaseForm");
  refs.useCaseTableBody = document.getElementById("useCaseTableBody");
  refs.filterRole = document.getElementById("filterRole");
  refs.filterAutomatable = document.getElementById("filterAutomatable");
  refs.filterImpact = document.getElementById("filterImpact");
  refs.sortBy = document.getElementById("sortBy");
  refs.wizardProgress = document.getElementById("wizardProgress");
  refs.wizardTitle = document.getElementById("wizardTitle");
  refs.wizardModeBadge = document.getElementById("wizardModeBadge");
  refs.wizardBack = document.getElementById("wizardBack");
  refs.wizardNext = document.getElementById("wizardNext");
  refs.wizardSave = document.getElementById("wizardSave");
  refs.formMessage = document.getElementById("formMessage");
  refs.liveComputationPreview = document.getElementById("liveComputationPreview");
  refs.tableCountBadge = document.getElementById("tableCountBadge");
  refs.kpiGrid = document.getElementById("kpiGrid");
  refs.executiveSummary = document.getElementById("executiveSummary");
  refs.chartTargets = {
    automationDonut: document.getElementById("automationDonut"),
    topScoreChart: document.getElementById("topScoreChart"),
    roleTimeChart: document.getElementById("roleTimeChart"),
    painChart: document.getElementById("painChart"),
    impactChart: document.getElementById("impactChart"),
    automatableChart: document.getElementById("automatableChart"),
    domainRadarChart: document.getElementById("domainRadarChart")
  };
}

function bindEvents() {
  refs.navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  refs.projectName.addEventListener("input", () => {
    detachDemoMode("Der Demo-Datensatz wurde in einen bearbeitbaren Arbeitsdatensatz überführt.");
    state.projectMeta.projectName = refs.projectName.value.trim();
    persistState();
  });

  refs.useCaseForm.addEventListener("submit", handleUseCaseSubmit);
  refs.useCaseForm.addEventListener("input", updateLivePreview);
  refs.useCaseForm.addEventListener("change", updateLivePreview);

  refs.filterRole.addEventListener("change", handleFilterChange);
  refs.filterAutomatable.addEventListener("change", handleFilterChange);
  refs.filterImpact.addEventListener("change", handleFilterChange);
  refs.sortBy.addEventListener("change", handleFilterChange);

  refs.wizardBack.addEventListener("click", () => changeWizardStep(-1));
  refs.wizardNext.addEventListener("click", () => changeWizardStep(1));

  document.getElementById("startWizardButton").addEventListener("click", startNewWizard);
  document.getElementById("openWizardFromOverview").addEventListener("click", () => {
    setView("usecases");
    startNewWizard();
  });
  document.getElementById("focusHighestScore").addEventListener("click", focusHighestScoreNode);

  document.getElementById("exportJsonButton").addEventListener("click", exportState);
  document.getElementById("importJsonInput").addEventListener("change", importStateFromFile);
  document.getElementById("multiImportJsonInput").addEventListener("change", importMultipleStatesFromFiles);
  document.getElementById("loadSampleButton").addEventListener("click", toggleDemoData);
  document.getElementById("resetAllButton").addEventListener("click", resetAllData);

  refs.networkCanvas.addEventListener("mousemove", handleNetworkMove);
  refs.networkCanvas.addEventListener("mouseleave", handleNetworkLeave);
  refs.networkCanvas.addEventListener("click", handleNetworkDoubleClick);
  refs.networkCanvas.addEventListener("dblclick", handleNetworkDoubleClick);
  window.addEventListener("resize", () => {
    resizeCanvas();
    buildNetworkNodes();
  });
}

function hydrateState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (validateImportedState(parsed)) {
      state.projectMeta = { projectName: repairText(parsed.projectMeta?.projectName) || "" };
      state.useCases = parsed.useCases.map(normalizeUseCase);
      state.uiPreferences = { ...state.uiPreferences, ...(parsed.uiPreferences || {}) };
      state.schemaVersion = parsed.schemaVersion || SCHEMA_VERSION;
      state.localMeta = {
        demoMode: Boolean(parsed.localMeta?.demoMode),
        previousUserState: validateImportedState(parsed.localMeta?.previousUserState) ? parsed.localMeta.previousUserState : null
      };
    }
  } catch (error) {
    console.warn("Konnte gespeicherten Zustand nicht laden:", error);
  }
}

function populateStaticOptions() {
  fillSelect(refs.useCaseForm.elements.hierarchyLevel, OPTIONS.hierarchyLevel);
  fillSelect(refs.useCaseForm.elements.domain, OPTIONS.domain);
  fillSelect(refs.useCaseForm.elements.descriptionCategory, OPTIONS.descriptionCategory, true);
  fillSelect(refs.useCaseForm.elements.frequency, OPTIONS.frequency, false, true);
  fillSelect(refs.useCaseForm.elements.painLevel, OPTIONS.painLevel, false, true);
  fillSelect(refs.useCaseForm.elements.errorProne, OPTIONS.errorProne, false, true);
  fillSelect(refs.useCaseForm.elements.dataAvailability, OPTIONS.dataAvailability, true);
  fillSelect(refs.useCaseForm.elements.automatable, OPTIONS.automatable, false, true);
  fillSelect(refs.useCaseForm.elements.impact, OPTIONS.impact, false, true);

  refs.filterAutomatable.innerHTML = `
    <option value="">Alle</option>
    <option value="maybe">Teilweise</option>
    <option value="no">Nein</option>
    <option value="yes">Ja</option>
  `;
  refs.filterImpact.innerHTML = `
    <option value="">Alle</option>
    <option value="high">Hoch</option>
    <option value="low">Niedrig</option>
    <option value="medium">Mittel</option>
  `;
}

function fillSelect(select, options, includePlaceholder = true, objects = false) {
  const currentValue = select.value;
  select.innerHTML = includePlaceholder ? '<option value="">Bitte wählen</option>' : "";
  const items = objects ? options : options.map((item) => ({ value: item, label: item }));
  items.forEach((item) => select.append(new Option(item.label, item.value)));
  select.value = currentValue || "";
}

function ensureRoleFilterOptions() {
  const current = refs.filterRole.value;
  refs.filterRole.innerHTML = '<option value="">Alle</option>';
  getUniqueRoleLabels().forEach((label) => refs.filterRole.append(new Option(label, label)));
  refs.filterRole.value = current || state.uiPreferences.filterRole || "";
}

function ensureFilterOptions() {
  refs.filterAutomatable.value = state.uiPreferences.filterAutomatable || "";
  refs.filterImpact.value = state.uiPreferences.filterImpact || "";
  refs.sortBy.value = state.uiPreferences.sortBy || "score";
}

function ensureWizardProgress() {
  refs.wizardProgress.innerHTML = "";
  for (let index = 0; index < 6; index += 1) {
    const step = document.createElement("span");
    step.className = "wizard-progress__step";
    step.textContent = String(index + 1);
    step.dataset.stepIndicator = String(index);
    refs.wizardProgress.append(step);
  }
  refs.useCaseForm.dataset.currentStep = "0";
  updateWizardUI();
}

function syncMetaInputs() {
  refs.projectName.value = state.projectMeta.projectName || "";
}

function setView(view) {
  state.uiPreferences.activeView = view;
  refs.navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  refs.views.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
  if (view === "overview") {
    resizeCanvas();
    buildNetworkNodes();
  }
  persistState(false);
}

function handleFilterChange() {
  state.uiPreferences.filterRole = refs.filterRole.value;
  state.uiPreferences.filterAutomatable = refs.filterAutomatable.value;
  state.uiPreferences.filterImpact = refs.filterImpact.value;
  state.uiPreferences.sortBy = refs.sortBy.value;
  renderUseCaseTable();
  buildNetworkNodes();
  persistState(false);
}

function startNewWizard() {
  refs.useCaseForm.reset();
  refs.useCaseForm.elements.useCaseId.value = "";
  refs.useCaseForm.elements.hourlyRate.value = String(DEFAULT_HOURLY_RATE);
  refs.formMessage.textContent = "";
  refs.formMessage.className = "form-message";
  refs.wizardTitle.textContent = "Neuen Use Case anlegen";
  refs.wizardModeBadge.textContent = "Wizard";
  refs.useCaseForm.dataset.currentStep = "0";
  updateWizardUI();
  updateLivePreview();
}

function handleUseCaseSubmit(event) {
  event.preventDefault();
  const formData = new FormData(refs.useCaseForm);
  const payload = readUseCaseForm(formData);
  const validationError = validateUseCase(payload);
  if (validationError) {
    showFormMessage(validationError, "error");
    return;
  }

  detachDemoMode("Der Demo-Datensatz wurde in einen bearbeitbaren Arbeitsdatensatz überführt.");
  const now = new Date().toISOString();
  const normalized = normalizeUseCase({
    ...payload,
    createdAt: getUseCaseById(payload.id)?.createdAt || now,
    updatedAt: now
  });

  const index = state.useCases.findIndex((entry) => entry.id === normalized.id);
  if (index >= 0) state.useCases[index] = normalized;
  else state.useCases.push(normalized);

  showFormMessage("Use Case gespeichert. Tabelle, Dashboard und Übersicht wurden aktualisiert.", "success");
  recalculateState();
}

function readUseCaseForm(formData) {
  return {
    id: String(formData.get("useCaseId") || crypto.randomUUID()),
    hierarchyLevel: String(formData.get("hierarchyLevel") || "").trim(),
    domain: String(formData.get("domain") || "").trim(),
    roleTitle: String(formData.get("roleTitle") || "").trim(),
    processName: String(formData.get("processName") || "").trim(),
    descriptionCategory: String(formData.get("descriptionCategory") || "").trim(),
    descriptionNote: String(formData.get("descriptionNote") || "").trim(),
    frequency: String(formData.get("frequency") || "").trim(),
    minutesPerRun: toNumber(formData.get("minutesPerRun")),
    countPerFrequency: toNumber(formData.get("countPerFrequency")),
    hourlyRate: toNumber(formData.get("hourlyRate"), DEFAULT_HOURLY_RATE),
    painLevel: normalizePainLevel(formData.get("painLevel")),
    errorProne: String(formData.get("errorProne") || "").trim(),
    errorProneNote: String(formData.get("errorProneNote") || "").trim(),
    dataAvailability: String(formData.get("dataAvailability") || "").trim(),
    inefficiencyReasons: formData.getAll("inefficiencyReasons").map(String),
    inefficiencyNote: String(formData.get("inefficiencyNote") || "").trim(),
    automatable: String(formData.get("automatable") || "").trim(),
    impact: String(formData.get("impact") || "").trim()
  };
}

function validateUseCase(useCase) {
  if (!useCase.hierarchyLevel || !useCase.domain || !useCase.roleTitle || !useCase.processName || !useCase.minutesPerRun || !useCase.countPerFrequency) {
    return "Hierarchiestufe, Domäne, Rollenbezeichnung, Prozessname, Zeitaufwand und Anzahl sind Pflichtfelder.";
  }
  if (!useCase.frequency) return "Bitte waehle eine Haeufigkeit.";
  if (useCase.descriptionNote && useCase.descriptionNote.length < 20) return "Die Prozessbeschreibung sollte mindestens 20 Zeichen umfassen.";
  if (useCase.errorProneNote && useCase.errorProneNote.length < 20) return "Die Fehlernotiz sollte mindestens 20 Zeichen umfassen.";
  if (useCase.inefficiencyNote && useCase.inefficiencyNote.length < 20) return "Die Kontextnotiz zur Ineffizienz sollte mindestens 20 Zeichen umfassen.";
  return "";
}

function changeWizardStep(delta) {
  const nextStep = clamp(Number(refs.useCaseForm.dataset.currentStep || 0) + delta, 0, 5);
  refs.useCaseForm.dataset.currentStep = String(nextStep);
  updateWizardUI();
}

function updateWizardUI() {
  const currentStep = Number(refs.useCaseForm.dataset.currentStep || 0);
  [...refs.useCaseForm.querySelectorAll(".wizard-step")].forEach((section) => {
    section.classList.toggle("is-active", Number(section.dataset.step) === currentStep);
  });
  [...refs.wizardProgress.children].forEach((indicator) => {
    const step = Number(indicator.dataset.stepIndicator);
    indicator.classList.toggle("is-active", step === currentStep);
    indicator.classList.toggle("is-complete", step < currentStep);
  });
  refs.wizardBack.disabled = currentStep === 0;
  refs.wizardNext.style.display = currentStep === 5 ? "none" : "inline-flex";
  refs.wizardSave.style.display = currentStep === 5 ? "inline-flex" : "none";
}

function updateLivePreview() {
  const preview = computeDerivedMetrics({
    frequency: refs.useCaseForm.elements.frequency.value,
    minutesPerRun: toNumber(refs.useCaseForm.elements.minutesPerRun.value),
    countPerFrequency: toNumber(refs.useCaseForm.elements.countPerFrequency.value),
    hourlyRate: toNumber(refs.useCaseForm.elements.hourlyRate.value, DEFAULT_HOURLY_RATE),
    painLevel: normalizePainLevel(refs.useCaseForm.elements.painLevel.value),
    impact: refs.useCaseForm.elements.impact.value,
    automatable: refs.useCaseForm.elements.automatable.value,
    errorProne: refs.useCaseForm.elements.errorProne.value
  });

  refs.liveComputationPreview.innerHTML = `
    <strong>Live-Vorschau:</strong>
    ${formatMinutes(preview.weeklyMinutes)} pro Woche,
    ${formatHours(preview.annualHours)} pro Jahr,
    ${formatCurrency(preview.annualCost)} jaehrliche Prozesskosten,
    Score ${preview.score}/100.
  `;
}

function recalculateState() {
  state.useCases = state.useCases.map((entry) => normalizeUseCase(entry));
  renderAll();
  persistState();
}

function renderAll() {
  ensureRoleFilterOptions();
  renderUseCaseTable();
  renderDashboard();
  buildNetworkNodes();
  updateDemoButton();
  updateStorageStatus();
  updateLivePreview();
}

function renderUseCaseTable() {
  refs.useCaseTableBody.innerHTML = "";
  const rows = getFilteredUseCases();
  refs.tableCountBadge.textContent = `${rows.length} Eintraege`;

  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.append(renderEmptyState());
    tr.append(td);
    refs.useCaseTableBody.append(tr);
    return;
  }

  rows.forEach((useCase) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${escapeHtml(useCase.processName)}</strong>
        <div>${escapeHtml(useCase.descriptionCategory || "Ohne Charakterisierung")}</div>
      </td>
      <td>${escapeHtml(useCase.roleLabel)}</td>
      <td>${formatMinutes(useCase.weeklyMinutes)}</td>
      <td>${formatCurrency(useCase.hourlyRate)}</td>
      <td>${formatCurrency(useCase.annualCost)}</td>
      <td><span class="score-badge">${useCase.score}</span></td>
      <td><span class="impact-badge" data-impact="${useCase.impact}">${IMPACT_LABELS[useCase.impact]}</span></td>
      <td>
        <div class="row-actions">
          <button class="button button--ghost button--small" data-edit="${useCase.id}">Bearbeiten</button>
          <button class="button button--ghost button--small" data-delete="${useCase.id}">Loeschen</button>
        </div>
      </td>
    `;
    tr.querySelector("[data-edit]").addEventListener("click", () => editUseCase(useCase.id));
    tr.querySelector("[data-delete]").addEventListener("click", () => deleteUseCase(useCase.id));
    refs.useCaseTableBody.append(tr);
  });
}

function renderDashboard() {
  const totals = computeTotals(state.useCases);
  const kpis = [
    { label: "Use Cases", value: String(state.useCases.length), hint: "Erfasste Kandidaten", variant: "" },
    { label: "Zeit / Woche", value: formatMinutes(totals.weeklyMinutes), hint: "Gesamter Aufwand", variant: "" },
    { label: "Zeit / Jahr", value: formatHours(totals.annualHours), hint: "Arbeit pro Jahr", variant: "" },
    { label: "Jaehrliche Kosten", value: formatCurrency(totals.annualCost), hint: "Basis heutiger Aufwaende", variant: "" },
    { label: "Einsparung 50%", value: formatCurrency(totals.savings50), hint: "Konservative Annahme", variant: "chart-card--saving-50" },
    { label: "Einsparung 75%", value: formatCurrency(totals.savings75), hint: "Ambitioniertes Szenario", variant: "chart-card--saving-75" },
    { label: "Einsparung 100%", value: formatCurrency(totals.savings100), hint: "Theoretisches Maximum", variant: "chart-card--saving-100" }
  ];

  refs.kpiGrid.innerHTML = "";
  kpis.forEach((kpi) => {
    const card = document.createElement("article");
    card.className = `chart-card ${kpi.variant}`.trim();
    card.innerHTML = `<p>${kpi.label}</p><h4>${kpi.value}</h4><p>${kpi.hint}</p>`;
    refs.kpiGrid.append(card);
  });

  renderCharts();
  renderExecutiveSummary();
}

function renderExecutiveSummary() {
  refs.executiveSummary.innerHTML = "";
  const useCases = state.useCases.slice();
  if (!useCases.length) {
    refs.executiveSummary.append(renderEmptyState());
    return;
  }

  const byRole = groupAndAggregate(useCases, "roleLabel", "weeklyMinutes");
  const byDomain = groupAndAggregate(useCases, "domain", "weeklyMinutes");
  const topTime = useCases.slice().sort((a, b) => b.weeklyMinutes - a.weeklyMinutes)[0];
  const topCost = useCases.slice().sort((a, b) => b.annualCost - a.annualCost)[0];
  const topCandidate = useCases.slice().sort((a, b) => b.score - a.score)[0];

  const items = [
    { title: "Auffälligste Rolle", body: `<span class="summary-emphasis">${escapeHtml(byRole[0]?.label || "Keine Rolle")}</span> bindet aktuell am meisten Aufwand mit ${formatMinutes(byRole[0]?.value || 0)} pro Woche.` },
    { title: "Auffälligste Domäne", body: `<span class="summary-emphasis">${escapeHtml(byDomain[0]?.label || "Keine Domäne")}</span> trägt aktuell den größten Wochenaufwand.` },
    { title: "Größter Zeitfresser", body: `<span class="summary-emphasis">${escapeHtml(topTime?.processName || "Kein Prozess")}</span> verursacht ${formatMinutes(topTime?.weeklyMinutes || 0)} pro Woche.` },
    { title: "Teuerster Prozess", body: `<span class="summary-emphasis">${escapeHtml(topCost?.processName || "Kein Prozess")}</span> liegt bei geschätzten ${formatCurrency(topCost?.annualCost || 0)} pro Jahr.` },
    { title: "Attraktivster Automatisierungskandidat", body: `<span class="summary-emphasis">${escapeHtml(topCandidate?.processName || "Kein Prozess")}</span> führt mit Score ${topCandidate?.score || 0}/100.` }
  ];

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "summary-item";
    article.innerHTML = `<h4>${item.title}</h4><p>${item.body}</p>`;
    refs.executiveSummary.append(article);
  });
}

function renderCharts() {
  const useCases = state.useCases.slice();
  refs.chartTargets.automationDonut.innerHTML = renderDonutChart(calculateAutomationDistribution(useCases));
  refs.chartTargets.topScoreChart.innerHTML = renderBarList(
    useCases.slice().sort((a, b) => b.score - a.score).slice(0, 6).map((item) => ({ label: item.processName, value: item.score, suffix: "/100" })),
    100
  );

  const roleItems = groupAndAggregate(useCases, "roleLabel", "weeklyMinutes").map((item) => ({
    label: item.label,
    value: Math.round(item.value / 60),
    suffix: " h"
  }));

  refs.chartTargets.roleTimeChart.innerHTML = renderBarList(
    roleItems,
    Math.max(...roleItems.map((item) => item.value), 1)
  );

  refs.chartTargets.painChart.innerHTML = renderColumnChart(
    countBy(useCases, (entry) => PAIN_LEVEL_LABELS[entry.painLevel] || PAIN_LEVEL_LABELS[""], PAIN_LEVEL_ORDER),
    { title: "Problemdruck", yLabel: "Anzahl" }
  );
  refs.chartTargets.impactChart.innerHTML = renderColumnChart(countBy(useCases, (entry) => IMPACT_LABELS[entry.impact]), { title: "Impact", yLabel: "Anzahl" });
  refs.chartTargets.automatableChart.innerHTML = renderColumnChart(countBy(useCases, (entry) => AUTOMATABLE_LABELS[entry.automatable]), { title: "Automatisierbarkeit", yLabel: "Anzahl" });
  refs.chartTargets.domainRadarChart.innerHTML = renderDomainRadarChart(aggregateDomains(useCases));
}

function renderDonutChart(data) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const segments = data.segments.map((segment) => {
    const fraction = segment.value / 100;
    const dash = `${fraction * circumference} ${circumference}`;
    const currentOffset = offset;
    offset += fraction * circumference;
    return `<circle r="${radius}" cx="100" cy="100" fill="transparent" stroke="${segment.color}" stroke-width="24" stroke-dasharray="${dash}" stroke-dashoffset="${-currentOffset}" transform="rotate(-90 100 100)"></circle>`;
  }).join("");

  return `
    <div style="display:grid;grid-template-columns:minmax(220px,320px) 1fr;gap:16px;align-items:center;">
      <svg viewBox="0 0 200 200" class="chart-svg">
        <circle r="${radius}" cx="100" cy="100" fill="transparent" stroke="rgba(24,95,124,0.08)" stroke-width="24"></circle>
        ${segments}
        <text x="100" y="96" text-anchor="middle" font-size="26" font-weight="800" fill="#111827">${data.average}%</text>
        <text x="100" y="120" text-anchor="middle" font-size="12" font-weight="700" fill="#526173">Ø Automatisierung</text>
      </svg>
      <div class="summary-list">
        ${data.segments.map((segment) => `<div class="summary-item"><h4 style="color:${segment.color};">${segment.label}</h4><p>${segment.value}% Anteil</p></div>`).join("")}
      </div>
    </div>
  `;
}

function renderBarList(items, maxValue) {
  if (!items.length) return renderChartEmptyState();
  return `
    <div class="bar-list">
      ${items.map((item) => {
        const width = ((item.value || 0) / (maxValue || 1)) * 100;
        return `
          <div class="bar-row">
            <div class="bar-row__label">${escapeHtml(item.label)}</div>
            <div class="bar-row__track"><div class="bar-row__fill" style="width:${Math.max(width, 2)}%"></div></div>
            <div class="bar-row__value">${item.value}${item.suffix || ""}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderColumnChart(items, options = {}) {
  if (!items.length) return renderChartEmptyState();
  const max = Math.max(options.maxValue || 0, ...items.map((item) => item.value), 1);
  const ticks = 4;
  const width = Math.max(420, items.length * 110);
  const height = 288;
  const chartLeft = 66;
  const chartBottom = 226;
  const chartTop = 46;
  const chartWidth = width - chartLeft - 24;
  const chartHeight = chartBottom - chartTop;
  const step = chartWidth / items.length;

  const tickLines = [];
  for (let index = 0; index <= ticks; index += 1) {
    const value = Math.round((max / ticks) * index);
    const y = chartBottom - (chartHeight / ticks) * index;
    tickLines.push(`
      <line x1="${chartLeft}" y1="${y}" x2="${width - 24}" y2="${y}" stroke="rgba(24,95,124,0.12)"></line>
      <text x="${chartLeft - 10}" y="${y + 4}" text-anchor="end" fill="#526173" font-size="11" font-weight="700">${value}</text>
    `);
  }

  const bars = items.map((item, index) => {
    const barWidth = Math.min(52, step * 0.54);
    const x = chartLeft + step * index + step * 0.23;
    const barHeight = chartHeight * (item.value / max);
    const y = chartBottom - barHeight;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="14" fill="#185f7c"></rect>
      <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="#111827" font-size="11" font-weight="800">${item.value}</text>
      <text x="${x + barWidth / 2}" y="${chartBottom + 18}" text-anchor="middle" fill="#526173" font-size="10" font-weight="700">${escapeHtml(truncate(item.label, 14))}</text>
    `;
  }).join("");

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
      <text x="${width / 2}" y="24" text-anchor="middle" fill="#111827" font-size="13" font-weight="800">${escapeHtml(options.title || "")}</text>
      ${tickLines.join("")}
      <line x1="${chartLeft}" y1="${chartBottom}" x2="${width - 24}" y2="${chartBottom}" stroke="rgba(24,95,124,0.28)" stroke-width="1.5"></line>
      <line x1="${chartLeft}" y1="${chartTop}" x2="${chartLeft}" y2="${chartBottom}" stroke="rgba(24,95,124,0.28)" stroke-width="1.5"></line>
      <text x="20" y="${chartTop + chartHeight / 2}" text-anchor="middle" transform="rotate(-90 20 ${chartTop + chartHeight / 2})" fill="#526173" font-size="11" font-weight="700">${options.yLabel || "Wert"}</text>
      ${bars}
    </svg>
  `;
}

function renderDomainRadarChart(items) {
  if (!items.length) return renderChartEmptyState();
  const width = 760;
  const height = 600;
  const cx = width / 2;
  const cy = 268;
  const radius = 207;
  const levels = 4;
  const maxCount = Math.max(...items.map((item) => item.count), 1);
  const axes = items.length;

  const grids = [];
  for (let level = 1; level <= levels; level += 1) {
    const r = (radius / levels) * level;
    grids.push(`<polygon points="${items.map((_, index) => pointOnCircle(cx, cy, r, index, axes)).map((p) => `${p.x},${p.y}`).join(" ")}" fill="none" stroke="rgba(24,95,124,0.14)"></polygon>`);
  }

  const countPoints = items.map((item, index) => pointOnCircle(cx, cy, radius * (item.count / maxCount), index, axes)).map((p) => `${p.x},${p.y}`).join(" ");
  const automationPoints = items.map((item, index) => pointOnCircle(cx, cy, radius * item.averageAutomation, index, axes)).map((p) => `${p.x},${p.y}`).join(" ");
  const axisLabels = items.map((item, index) => {
    const labelPoint = pointOnCircle(cx, cy, radius + 26, index, axes);
    return `<text x="${labelPoint.x}" y="${labelPoint.y}" text-anchor="middle" fill="#111827" font-size="13.5" font-weight="700">${escapeHtml(item.domain)}</text>`;
  }).join("");
  const spokes = items.map((_, index) => {
    const p = pointOnCircle(cx, cy, radius, index, axes);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="rgba(24,95,124,0.14)"></line>`;
  }).join("");

  return `
    <div class="radar-layout">
      <div class="radar-card radar-card--visual">
        <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
          ${grids.join("")}
          ${spokes}
          <polygon points="${countPoints}" fill="rgba(24,95,124,0.16)" stroke="#185f7c" stroke-width="2"></polygon>
          <polygon points="${automationPoints}" fill="rgba(183,66,66,0.14)" stroke="#b74242" stroke-width="2"></polygon>
          ${axisLabels}
        </svg>
        <div class="radar-legend">
          <div class="radar-legend__item">
            <span class="radar-legend__dot radar-legend__dot--count"></span>
            Anzahl Use Cases
          </div>
          <div class="radar-legend__item">
            <span class="radar-legend__dot radar-legend__dot--automation"></span>
            Theoretische Automatisierbarkeit
          </div>
        </div>
      </div>
      <div class="radar-card radar-card--table radar-table-wrap">
        <table class="radar-table">
          <thead>
            <tr>
              <th>Domäne</th>
              <th>Use Cases</th>
              <th>Automatisierbar</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item) => `
              <tr>
                <td>${escapeHtml(item.domain)}</td>
                <td style="color:#185f7c;font-weight:800;">${item.count}</td>
                <td style="color:#b74242;font-weight:800;">${Math.round(item.averageAutomation * 100)}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderChartEmptyState() {
  return `<div class="empty-state"><h3>Noch keine Daten</h3><p>Lege zuerst Use Cases an, damit das Diagramm gefuellt werden kann.</p></div>`;
}

function computeTotals(useCases) {
  return useCases.reduce((acc, entry) => {
    acc.weeklyMinutes += entry.weeklyMinutes;
    acc.annualHours += entry.annualHours;
    acc.annualCost += entry.annualCost;
    acc.savings50 += entry.savings50;
    acc.savings75 += entry.savings75;
    acc.savings100 += entry.savings100;
    return acc;
  }, { weeklyMinutes: 0, annualHours: 0, annualCost: 0, savings50: 0, savings75: 0, savings100: 0 });
}

function computeDerivedMetrics(useCase) {
  const weeklyUnits = frequencyToWeeklyUnits(useCase.frequency, useCase.countPerFrequency);
  const weeklyMinutes = (useCase.minutesPerRun || 0) * weeklyUnits;
  const annualHours = (weeklyMinutes * 52) / 60;
  const hourlyRate = toNumber(useCase.hourlyRate, DEFAULT_HOURLY_RATE);
  const annualCost = annualHours * hourlyRate;
  const automationFactor = useCase.automatable === "yes" ? 1 : useCase.automatable === "maybe" ? 0.5 : 0;
  const score = calculateScore({ ...useCase, weeklyMinutes });
  return {
    weeklyMinutes,
    annualHours,
    annualCost,
    savings50: annualCost * 0.5,
    savings75: annualCost * 0.75,
    savings100: annualCost,
    automationFactor,
    score
  };
}

function calculateScore(useCase) {
  const weeklyHours = (useCase.weeklyMinutes || 0) / 60;
  const timeScore = clamp((weeklyHours / 10) * 30, 0, 30);
  const painScore = clamp((normalizePainLevel(useCase.painLevel) / 4) * 20, 0, 20);
  const impactScore = { high: 18, medium: 10, low: 4 }[useCase.impact] || 0;
  const automatableScore = { yes: 16, maybe: 8, no: 0 }[useCase.automatable] || 0;
  const errorScore = useCase.errorProne === "yes" ? 8 : 0;
  return Math.round(clamp(timeScore + painScore + impactScore + automatableScore + errorScore, 0, 100));
}

function frequencyToWeeklyUnits(frequency, count) {
  if (!count) return 0;
  if (frequency === "daily") return count * 5;
  if (frequency === "monthly") return count * (12 / 52);
  return count;
}

function normalizeUseCase(input) {
  const entry = {
    id: repairText(input.id) || crypto.randomUUID(),
    hierarchyLevel: repairText(input.hierarchyLevel) || "",
    domain: repairText(input.domain) || "",
    roleTitle: repairText(input.roleTitle || input.role) || "",
    processName: repairText(input.processName) || "",
    descriptionCategory: repairText(input.descriptionCategory) || "",
    descriptionNote: repairText(input.descriptionNote) || "",
    frequency: repairText(input.frequency) || "",
    minutesPerRun: toNumber(input.minutesPerRun),
    countPerFrequency: toNumber(input.countPerFrequency),
    hourlyRate: toNumber(input.hourlyRate, input.defaultHourlyRate ?? DEFAULT_HOURLY_RATE),
    painLevel: normalizePainLevel(input.painLevel),
    errorProne: repairText(input.errorProne) || "",
    errorProneNote: repairText(input.errorProneNote) || "",
    dataAvailability: repairText(input.dataAvailability) || "",
    inefficiencyReasons: Array.isArray(input.inefficiencyReasons) ? input.inefficiencyReasons.map(repairText).filter(Boolean) : [],
    inefficiencyNote: repairText(input.inefficiencyNote) || "",
    automatable: repairText(input.automatable) || "",
    impact: repairText(input.impact) || "",
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString()
  };
  return {
    ...entry,
    roleLabel: formatRoleLabel(entry),
    ...computeDerivedMetrics(entry)
  };
}

function getFilteredUseCases() {
  const filtered = state.useCases.filter((useCase) => {
    const matchesRole = !state.uiPreferences.filterRole || useCase.roleLabel === state.uiPreferences.filterRole;
    const matchesAutomatable = !state.uiPreferences.filterAutomatable || useCase.automatable === state.uiPreferences.filterAutomatable;
    const matchesImpact = !state.uiPreferences.filterImpact || useCase.impact === state.uiPreferences.filterImpact;
    return matchesRole && matchesAutomatable && matchesImpact;
  });

  return filtered.sort((a, b) => {
    switch (state.uiPreferences.sortBy) {
      case "weeklyMinutes": return b.weeklyMinutes - a.weeklyMinutes;
      case "painLevel": return b.painLevel - a.painLevel;
      case "annualCost": return b.annualCost - a.annualCost;
      case "impact": return IMPACT_ORDER[b.impact] - IMPACT_ORDER[a.impact];
      case "score":
      default: return b.score - a.score;
    }
  });
}

function editUseCase(id) {
  const entry = getUseCaseById(id);
  if (!entry) return;
  refs.useCaseForm.elements.useCaseId.value = entry.id;
  refs.useCaseForm.elements.hierarchyLevel.value = entry.hierarchyLevel;
  refs.useCaseForm.elements.domain.value = entry.domain;
  refs.useCaseForm.elements.roleTitle.value = entry.roleTitle;
  refs.useCaseForm.elements.processName.value = entry.processName;
  refs.useCaseForm.elements.descriptionCategory.value = entry.descriptionCategory;
  refs.useCaseForm.elements.descriptionNote.value = entry.descriptionNote;
  refs.useCaseForm.elements.frequency.value = entry.frequency;
  refs.useCaseForm.elements.minutesPerRun.value = entry.minutesPerRun || "";
  refs.useCaseForm.elements.countPerFrequency.value = entry.countPerFrequency || "";
  refs.useCaseForm.elements.hourlyRate.value = entry.hourlyRate || DEFAULT_HOURLY_RATE;
  refs.useCaseForm.elements.painLevel.value = entry.painLevel || "";
  refs.useCaseForm.elements.errorProne.value = entry.errorProne;
  refs.useCaseForm.elements.errorProneNote.value = entry.errorProneNote;
  refs.useCaseForm.elements.dataAvailability.value = entry.dataAvailability;
  [...refs.useCaseForm.querySelectorAll('input[name="inefficiencyReasons"]')].forEach((checkbox) => {
    checkbox.checked = entry.inefficiencyReasons.includes(checkbox.value);
  });
  refs.useCaseForm.elements.inefficiencyNote.value = entry.inefficiencyNote;
  refs.useCaseForm.elements.automatable.value = entry.automatable;
  refs.useCaseForm.elements.impact.value = entry.impact;
  refs.wizardTitle.textContent = `Use Case bearbeiten: ${entry.processName}`;
  refs.wizardModeBadge.textContent = "Bearbeitung";
  refs.useCaseForm.dataset.currentStep = "0";
  refs.formMessage.textContent = "Schnellbearbeitung aktiv. Nach dem Speichern werden Tabelle, Dashboard und Übersicht aktualisiert.";
  refs.formMessage.className = "form-message";
  updateWizardUI();
  updateLivePreview();
  setView("usecases");
}

function deleteUseCase(id) {
  const entry = getUseCaseById(id);
  if (!entry) return;
  if (!window.confirm(`Soll "${entry.processName}" wirklich gelöscht werden?`)) return;
  detachDemoMode("Der Demo-Datensatz wurde in einen bearbeitbaren Arbeitsdatensatz überführt.");
  state.useCases = state.useCases.filter((item) => item.id !== id);
  recalculateState();
}

function getUseCaseById(id) {
  return state.useCases.find((entry) => entry.id === id);
}

function exportState() {
  const payload = createSerializableState();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = "perceptris-use-cases.json";
  link.click();
  URL.revokeObjectURL(objectUrl);
}

function toggleDemoData() {
  if (state.localMeta.demoMode) {
    unloadDemoData();
    return;
  }
  loadDemoData();
}

async function loadDemoData() {
  try {
    state.localMeta.previousUserState = createSerializableState();
    state.localMeta.demoMode = true;
    const demoState = await loadBundledDemoState();
    applyImportedState(demoState, { preserveLocalMeta: true });
    showFormMessage("Demo-Datensatz wurde geladen. Sobald du etwas änderst, wird daraus dein bearbeitbarer Arbeitsdatensatz.", "success");
  } catch (error) {
    state.localMeta.demoMode = false;
    state.localMeta.previousUserState = null;
    showFormMessage(`Demo-Datensatz konnte nicht geladen werden: ${error.message}`, "error");
  }
}

function unloadDemoData() {
  const fallback = state.localMeta.previousUserState ? cloneJson(state.localMeta.previousUserState) : null;
  state.localMeta.demoMode = false;
  state.localMeta.previousUserState = null;
  if (fallback && validateImportedState(fallback)) {
    applyImportedState(fallback, { preserveLocalMeta: true });
    showFormMessage("Demo-Datensatz wurde entladen. Dein vorheriger Arbeitsstand ist wieder aktiv.", "success");
    return;
  }

  applyImportedState({
    projectMeta: { projectName: "" },
    useCases: [],
    uiPreferences: { ...state.uiPreferences, activeView: state.uiPreferences.activeView || "overview" },
    schemaVersion: SCHEMA_VERSION
  }, { preserveLocalMeta: true });
  showFormMessage("Demo-Datensatz wurde entladen.", "success");
}

function importStateFromFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  readJsonFile(file)
    .then((parsed) => {
      if (!validateImportedState(parsed)) throw new Error("Ungueltiges JSON-Schema.");
      applyImportedState(parsed);
      showFormMessage("JSON erfolgreich importiert.", "success");
    })
    .catch((error) => {
      showFormMessage(`Import fehlgeschlagen: ${error.message}`, "error");
    })
    .finally(() => {
      event.target.value = "";
    });
}

function importMultipleStatesFromFiles(event) {
  const files = [...(event.target.files || [])];
  if (!files.length) return;

  Promise.all(files.map((file) =>
    readJsonFile(file)
      .then((parsed) => ({ file, parsed, error: null }))
      .catch((error) => ({ file, parsed: null, error }))
  )).then((results) => {
    const validEntries = [];
    const invalidEntries = [];

    results.forEach(({ file, parsed, error }) => {
      if (error) {
        invalidEntries.push({ file, reason: error.message });
      } else if (validateImportedState(parsed)) {
        validEntries.push({ file, parsed });
      } else {
        invalidEntries.push({ file, reason: "Ungueltiges JSON-Schema." });
      }
    });

    if (!validEntries.length) {
      const details = invalidEntries.length ? ` (${invalidEntries.length} Datei(en) ungueltig)` : "";
      throw new Error(`Kein gueltiger Datensatz gefunden${details}.`);
    }

    const mergedState = {
      projectMeta: { projectName: repairText(validEntries[0].parsed.projectMeta?.projectName) || "" },
      useCases: validEntries.flatMap(({ parsed }) => Array.isArray(parsed.useCases) ? parsed.useCases : []),
      uiPreferences: { ...state.uiPreferences },
      schemaVersion: SCHEMA_VERSION
    };

    applyImportedState(mergedState);

    const importedFiles = validEntries.length;
    const skippedFiles = invalidEntries.length;
    const importedUseCases = mergedState.useCases.length;
    const summary = skippedFiles
      ? `${importedUseCases} Use Cases aus ${importedFiles} Datei(en) zusammengeführt, ${skippedFiles} Datei(en) übersprungen.`
      : `${importedUseCases} Use Cases aus ${importedFiles} Datei(en) zusammengeführt.`;
    showFormMessage(summary, "success");
  }).catch((error) => {
    showFormMessage(`Multi-Import fehlgeschlagen: ${error.message}`, "error");
  }).finally(() => {
    event.target.value = "";
  });
}

function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result)));
      } catch (error) {
        reject(new Error(`${file.name}: ${error.message}`));
      }
    };
    reader.onerror = () => reject(new Error(`${file.name}: Datei konnte nicht gelesen werden.`));
    reader.readAsText(file);
  });
}

function applyImportedState(data, options = {}) {
  state.projectMeta = { projectName: repairText(data.projectMeta?.projectName) || "" };
  state.useCases = Array.isArray(data.useCases) ? data.useCases.map(normalizeUseCase) : [];
  state.uiPreferences = { ...state.uiPreferences, ...(data.uiPreferences || {}) };
  state.schemaVersion = data.schemaVersion || SCHEMA_VERSION;
  if (!options.preserveLocalMeta) {
    state.localMeta.demoMode = false;
    state.localMeta.previousUserState = null;
  }
  syncMetaInputs();
  recalculateState();
}

function validateImportedState(data) {
  return Boolean(data && typeof data === "object" && Array.isArray(data.useCases));
}

function resetAllData() {
  if (!window.confirm("Soll der gesamte lokale Zustand gelöscht werden?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function persistState(renderStatus = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...createSerializableState(),
    localMeta: {
      demoMode: state.localMeta.demoMode,
      previousUserState: state.localMeta.previousUserState
    }
  }));
  if (renderStatus) updateStorageStatus();
}

function updateStorageStatus() {
  const prefix = state.localMeta.demoMode ? "Demo-Datensatz aktiv · " : "";
  refs.storageStatus.textContent = `${prefix}Zuletzt aktualisiert: ${new Date().toLocaleTimeString("de-AT", {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

function showFormMessage(message, type = "") {
  refs.formMessage.textContent = message;
  refs.formMessage.className = "form-message";
  if (type) refs.formMessage.classList.add(`is-${type}`);
}

function renderEmptyState() {
  return document.getElementById("emptyStateTemplate").content.cloneNode(true);
}

function calculateAutomationDistribution(useCases) {
  if (!useCases.length) {
    return {
      average: 0,
      segments: [
        { label: "Ja", value: 0, color: "#185f7c" },
        { label: "Vielleicht", value: 0, color: "#69a8c2" },
        { label: "Nein", value: 100, color: "#d8e7ee" }
      ]
    };
  }
  const totalWeight = useCases.reduce((sum, item) => sum + (item.automationFactor || 0), 0);
  const yes = percentage(useCases.filter((item) => item.automatable === "yes").length, useCases.length);
  const maybe = percentage(useCases.filter((item) => item.automatable === "maybe").length, useCases.length);
  return {
    average: Math.round((totalWeight / useCases.length) * 100),
    segments: [
      { label: "Ja", value: yes, color: "#185f7c" },
      { label: "Vielleicht", value: maybe, color: "#69a8c2" },
      { label: "Nein", value: Math.max(0, 100 - yes - maybe), color: "#d8e7ee" }
    ]
  };
}

function aggregateDomains(useCases) {
  const map = new Map();
  OPTIONS.domain.forEach((domain) => {
    map.set(domain, { domain, count: 0, automationSum: 0 });
  });
  useCases.forEach((item) => {
    const domain = item.domain || "Nicht zugeordnet";
    const entry = map.get(domain) || { domain, count: 0, automationSum: 0 };
    entry.count += 1;
    entry.automationSum += item.automationFactor || 0;
    map.set(domain, entry);
  });
  return [...map.values()]
    .map((entry) => ({ ...entry, averageAutomation: entry.count ? entry.automationSum / entry.count : 0 }))
    .sort((a, b) => localeSort(a.domain, b.domain));
}

function groupAndAggregate(items, groupKey, valueKey) {
  const map = new Map();
  items.forEach((item) => {
    const label = item[groupKey] || "Nicht zugeordnet";
    map.set(label, (map.get(label) || 0) + (item[valueKey] || 0));
  });
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function countBy(items, mapper, order = null) {
  const map = new Map();
  items.forEach((item) => {
    const label = mapper(item) || "Offen";
    map.set(label, (map.get(label) || 0) + 1);
  });
  const entries = [...map.entries()].map(([label, value]) => ({ label, value }));
  if (!order?.length) return entries;

  const rank = new Map(order.map((label, index) => [label, index]));
  return entries.sort((a, b) => {
    const aRank = rank.has(a.label) ? rank.get(a.label) : Number.MAX_SAFE_INTEGER;
    const bRank = rank.has(b.label) ? rank.get(b.label) : Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return localeSort(a.label, b.label);
  });
}

function buildNetworkNodes() {
  const { width, height } = getNetworkViewport();
  const source = getFilteredUseCases();
  const plot = getQuadrantPlotGeometry(width, height);
  const timeBuckets = getTimeBucketConfig(source);
  const cellWidth = plot.width / timeBuckets.count;
  const rowHeight = plot.height / 4;
  const grouped = new Map();

  source.forEach((item, index) => {
    const bucketIndex = getTimeBucketIndex(item.weeklyMinutes, timeBuckets);
    const painIndex = clamp((item.painLevel || 1) - 1, 0, 3);
    const rowFromTop = 3 - painIndex;
    const cellKey = `${rowFromTop}-${bucketIndex}`;
    const cell = grouped.get(cellKey) || [];
    cell.push({
      id: item.id,
      useCase: item,
      number: index + 1,
      bucketIndex,
      painIndex,
      rowFromTop,
      bucketLabel: timeBuckets.labels[bucketIndex] || "",
      painLabel: PAIN_LEVEL_LABELS[item.painLevel] || "Offen"
    });
    grouped.set(cellKey, cell);
  });

  networkState.nodes = [];
  grouped.forEach((items, cellKey) => {
    const [rowFromTop, bucketIndex] = cellKey.split("-").map(Number);
    const cellRect = {
      left: plot.left + bucketIndex * cellWidth,
      top: plot.top + rowFromTop * rowHeight,
      width: cellWidth,
      height: rowHeight
    };
    networkState.nodes.push(...positionNodesInCell(items, cellRect));
  });

  networkState.nodes.sort((a, b) => a.number - b.number);
  networkState.meta = { plot, timeBuckets };
  renderMatrixIndex();
  drawNetwork();
}

function startNetwork() {
  resizeCanvas();
  buildNetworkNodes();
}

function resizeCanvas() {
  const rect = refs.networkCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const ratio = window.devicePixelRatio || 1;
  refs.networkCanvas.width = rect.width * ratio;
  refs.networkCanvas.height = rect.height * ratio;
  const ctx = refs.networkCanvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function updateNetworkPhysics() {
  drawNetwork();
}

function drawNetwork() {
  const ctx = refs.networkCanvas.getContext("2d");
  const { width, height } = getNetworkViewport();
  const plot = networkState.meta?.plot || getQuadrantPlotGeometry(width, height);
  ctx.clearRect(0, 0, width, height);
  drawQuadrantBackground(ctx, plot, networkState.meta?.timeBuckets || getTimeBucketConfig([]));

  networkState.nodes.forEach((node) => {
    const isFocused = node.id === networkState.focusedNodeId;
    const isHovered = node.id === networkState.hoverNodeId;
    const radius = isFocused ? node.radius + 2 : node.radius;

    if (isFocused) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 7, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(24,95,124,0.14)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 7, 0, Math.PI * 2);
      ctx.strokeStyle = "#0f4359";
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.fillStyle = getAutomationColor(node.useCase.automatable);
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isFocused ? "#0f4359" : isHovered ? "#245d7a" : "rgba(255,255,255,0.96)";
    ctx.lineWidth = isFocused ? 3 : 2;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 13px Aptos, Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(node.number), node.x, node.y + 0.5);

    if (isFocused) {
      const badgeWidth = 40;
      const badgeHeight = 18;
      const badgeX = node.x - (badgeWidth / 2);
      const badgeY = node.y - radius - 26;
      ctx.fillStyle = "#0f4359";
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 9);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 10px Aptos, Segoe UI";
      ctx.fillText("TOP", node.x, badgeY + (badgeHeight / 2) + 0.5);
    }
  });

  if (!networkState.nodes.length) {
    return;
  }
}

async function loadBundledDemoState() {
  try {
    const response = await fetch(DEMO_DATA_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const parsed = await response.json();
    if (!validateImportedState(parsed)) throw new Error("Ungueltiges JSON-Schema.");
    return parsed;
  } catch (error) {
    return cloneJson(BUNDLED_DEMO_STATE);
  }
}

function handleNetworkMove(event) {
  const rect = refs.networkCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const node = networkState.nodes.find((candidate) => {
    const dx = candidate.x - x;
    const dy = candidate.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= candidate.radius;
  });

  networkState.hoverNodeId = node?.id || null;
  if (!node) {
    refs.networkTooltip.hidden = true;
    drawNetwork();
    return;
  }

  drawNetwork();
  refs.networkTooltip.hidden = false;
  refs.networkTooltip.style.left = `${x + 22}px`;
  refs.networkTooltip.style.top = `${y + 22}px`;
  refs.networkTooltip.innerHTML = [
    `<strong>#${node.number} ${escapeHtml(node.useCase.processName)}</strong>`,
    `<div>${escapeHtml(node.useCase.roleLabel)}</div>`,
    `<div>Zeit: ${formatMinutes(node.useCase.weeklyMinutes)} pro Woche</div>`,
    `<div>Problemdruck: ${escapeHtml(PAIN_LEVEL_LABELS[node.useCase.painLevel] || "Offen")}</div>`,
    `<div>Automatisierbarkeit: ${AUTOMATABLE_LABELS[node.useCase.automatable]}</div>`,
    `<div>${escapeHtml(node.bucketLabel)} · Score ${node.useCase.score} · Impact ${IMPACT_LABELS[node.useCase.impact]}</div>`
  ].join("");
}

function handleNetworkLeave() {
  networkState.hoverNodeId = null;
  refs.networkTooltip.hidden = true;
  drawNetwork();
}

function handleNetworkDoubleClick(event) {
  const rect = refs.networkCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const node = networkState.nodes.find((candidate) => {
    const dx = candidate.x - x;
    const dy = candidate.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= candidate.radius;
  });
  if (node) editUseCase(node.id);
}

function focusHighestScoreNode() {
  const top = getFilteredUseCases().slice().sort((a, b) => b.score - a.score)[0];
  networkState.focusedNodeId = top?.id || null;
  if (top) {
    setView("overview");
    drawNetwork();
  }
}

function detachDemoMode(message = "") {
  if (!state.localMeta.demoMode) return;
  state.localMeta.demoMode = false;
  state.localMeta.previousUserState = null;
  updateDemoButton();
  if (message) showFormMessage(message, "success");
}

function updateDemoButton() {
  const button = document.getElementById("loadSampleButton");
  if (!button) return;
  button.textContent = state.localMeta.demoMode ? "Demo-Datensatz entladen" : "Demo-Datensatz laden";
  button.classList.toggle("button--secondary", !state.localMeta.demoMode);
  button.classList.toggle("button--ghost", state.localMeta.demoMode);
}

function createSerializableState() {
  return {
    projectMeta: { ...state.projectMeta },
    useCases: state.useCases.map(({ roleLabel, weeklyMinutes, annualHours, annualCost, savings50, savings75, savings100, automationFactor, score, ...rest }) => ({
      ...rest
    })),
    uiPreferences: { ...state.uiPreferences },
    schemaVersion: state.schemaVersion
  };
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatRoleLabel(roleLike) {
  return [roleLike.hierarchyLevel, roleLike.domain, roleLike.roleTitle].filter(Boolean).join(" · ") || "Nicht zugeordnet";
}

function getUniqueRoleLabels() {
  return [...new Set(state.useCases.map((useCase) => useCase.roleLabel).filter(Boolean))].sort(localeSort);
}

function getNetworkViewport() {
  const rect = refs.networkCanvas.getBoundingClientRect();
  return { width: rect.width || 1200, height: rect.height || 760 };
}

function getQuadrantPlotGeometry(width, height) {
  return {
    left: 110,
    right: width - 44,
    top: 54,
    bottom: height - 90,
    width: width - 154,
    height: height - 144
  };
}

function getTimeBucketConfig(items) {
  const count = 4;
  const values = items.map((item) => item.weeklyMinutes).filter((value) => Number.isFinite(value) && value >= 0);
  if (!values.length) {
    return {
      count,
      start: 0,
      bucketSize: 120,
      labels: ["0-2 h", "2-4 h", "4-6 h", "6-8 h"]
    };
  }

  const minMinutes = Math.min(...values);
  const maxMinutes = Math.max(...values);
  const start = Math.max(0, Math.floor(minMinutes / 60) * 60);
  const roundedMax = Math.max(start + 60, Math.ceil(maxMinutes / 60) * 60);
  const bucketSize = Math.max(60, Math.ceil(((roundedMax - start) / count) / 60) * 60);

  return {
    count,
    start,
    bucketSize,
    labels: Array.from({ length: count }, (_, index) => {
      const bucketStart = start + (index * bucketSize);
      const bucketEnd = bucketStart + bucketSize;
      return `${formatAxisHours(bucketStart)}-${formatAxisHours(bucketEnd)} h`;
    })
  };
}

function getTimeBucketIndex(minutes, config) {
  if (!config?.count) return 0;
  const relative = Math.max(0, minutes - config.start);
  return clamp(Math.floor(relative / config.bucketSize), 0, config.count - 1);
}

function positionNodesInCell(items, cellRect) {
  if (!items.length) return [];

  const padding = 14;
  const diameterGap = 6;
  const cols = Math.ceil(Math.sqrt(items.length));
  const rows = Math.ceil(items.length / cols);
  const usableWidth = Math.max(40, cellRect.width - padding * 2);
  const usableHeight = Math.max(40, cellRect.height - padding * 2);
  const radiusByWidth = (usableWidth - Math.max(0, cols - 1) * diameterGap) / (cols * 2);
  const radiusByHeight = (usableHeight - Math.max(0, rows - 1) * diameterGap) / (rows * 2);
  const densityLimit = items.length >= 4 ? 16 : 18;
  const radius = clamp(Math.min(densityLimit, radiusByWidth, radiusByHeight), 9, densityLimit);
  const gridWidth = cols * radius * 2 + Math.max(0, cols - 1) * diameterGap;
  const gridHeight = rows * radius * 2 + Math.max(0, rows - 1) * diameterGap;
  const startX = cellRect.left + (cellRect.width - gridWidth) / 2 + radius;
  const startY = cellRect.top + (cellRect.height - gridHeight) / 2 + radius;

  return items.map((item, index) => {
    const column = index % cols;
    const row = Math.floor(index / cols);
    return {
      ...item,
      x: startX + column * ((radius * 2) + diameterGap),
      y: startY + row * ((radius * 2) + diameterGap),
      radius
    };
  });
}

function renderMatrixIndex() {
  if (!refs.matrixIndexList || !refs.matrixIndexCount) return;
  refs.matrixIndexCount.textContent = String(networkState.nodes.length);

  if (!networkState.nodes.length) {
    refs.matrixIndexList.innerHTML = '<div class="matrix-index__item"><div class="matrix-index__meta">Noch keine Use Cases in der Übersicht sichtbar.</div></div>';
    return;
  }

  refs.matrixIndexList.innerHTML = networkState.nodes.map((node) => `
    <article class="matrix-index__item">
      <div class="matrix-index__title">
        <span class="matrix-index__number">#${node.number}</span>
        <span>${escapeHtml(node.useCase.processName)}</span>
      </div>
    </article>
  `).join("");
}

function drawQuadrantBackground(ctx, plot, timeBuckets) {
  const splitX = plot.left + (plot.width / 2);
  const splitY = plot.top + (plot.height / 2);
  const columnWidth = plot.width / 4;
  const rowHeight = plot.height / 4;
  const painLabelsTopToBottom = ["Akut", "Kritisch", "Spürbar", "Mild"];

  ctx.fillStyle = "rgba(24,95,124,0.04)";
  ctx.fillRect(plot.left, plot.top, plot.width / 2, plot.height / 2);
  ctx.fillStyle = "rgba(24,95,124,0.08)";
  ctx.fillRect(splitX, plot.top, plot.width / 2, plot.height / 2);
  ctx.fillStyle = "rgba(24,95,124,0.06)";
  ctx.fillRect(plot.left, splitY, plot.width / 2, plot.height / 2);
  ctx.fillStyle = "rgba(24,95,124,0.10)";
  ctx.fillRect(splitX, splitY, plot.width / 2, plot.height / 2);

  ctx.strokeStyle = "rgba(24,95,124,0.14)";
  ctx.lineWidth = 1;
  for (let index = 0; index <= 4; index += 1) {
    const x = plot.left + columnWidth * index;
    const y = plot.top + rowHeight * index;
    ctx.beginPath();
    ctx.moveTo(x, plot.top);
    ctx.lineTo(x, plot.bottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(plot.left, y);
    ctx.lineTo(plot.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(15,67,89,0.48)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(splitX, plot.top);
  ctx.lineTo(splitX, plot.bottom);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(plot.left, splitY);
  ctx.lineTo(plot.right, splitY);
  ctx.stroke();

  ctx.strokeStyle = "rgba(24,95,124,0.36)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(plot.left, plot.top, plot.width, plot.height);

  ctx.fillStyle = "#526173";
  ctx.font = "700 12px Aptos, Segoe UI";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Gesamtzeit pro Woche", plot.left + plot.width / 2, plot.bottom + 52);
  ctx.save();
  ctx.translate(plot.left - 68, plot.top + plot.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Problemdruck", 0, 0);
  ctx.restore();

  timeBuckets.labels.forEach((label, index) => {
    ctx.fillText(label, plot.left + columnWidth * index + (columnWidth / 2), plot.bottom + 26);
  });

  painLabelsTopToBottom.forEach((label, index) => {
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(label, plot.left - 14, plot.top + rowHeight * index + (rowHeight / 2));
  });

  ctx.fillStyle = "#1f2937";
  ctx.font = "700 14px Aptos, Segoe UI";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Quick Wins", plot.left + 16, plot.top + 24);
  ctx.fillText("Pilotprojekte", splitX + 16, plot.top + 24);
  ctx.fillText("Beobachten", plot.left + 16, splitY + 28);
  ctx.fillText("Gezielt verbessern", splitX + 16, splitY + 28);
}

function getAutomationColor(automatable) {
  if (automatable === "yes") return "#185f7c";
  if (automatable === "maybe") return "#6f9ec6";
  return "#ceddea";
}

function pointOnCircle(cx, cy, radius, index, total) {
  const angle = (-Math.PI / 2) + (index * ((Math.PI * 2) / total));
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
}

function percentage(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function formatMinutes(value) {
  if (!value) return "0 Min";
  if (value >= 60) return `${(value / 60).toLocaleString("de-AT", { maximumFractionDigits: 1 })} Std.`;
  return `${Math.round(value)} Min`;
}

function formatAxisHours(minutes) {
  const hours = minutes / 60;
  return Number.isInteger(hours)
    ? String(hours)
    : hours.toLocaleString("de-AT", { maximumFractionDigits: 1 });
}

function formatHours(value) {
  return `${value.toLocaleString("de-AT", { maximumFractionDigits: 1 })} Std.`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizePainLevel(value) {
  const parsed = toNumber(value);
  if (!parsed) return 0;
  if (parsed <= 1) return 1;
  if (parsed <= 4) return parsed;
  return 4;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function repairText(value) {
  if (value == null) return value;
  if (typeof value !== "string") return value;
  return value
    .replaceAll("Ã¤", "ä")
    .replaceAll("Ã¶", "ö")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ã„", "Ä")
    .replaceAll("Ã–", "Ö")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("ÃŸ", "ß")
    .replaceAll("Â·", "·")
    .replaceAll("â€“", "–")
    .replaceAll("â€”", "—")
    .replaceAll("â€ž", "„")
    .replaceAll("â€œ", "“")
    .replaceAll("â€š", "‚")
    .replaceAll("â€™", "’")
    .replaceAll("â€¦", "…");
}

function truncate(value, length) {
  if (!value) return "";
  return value.length > length ? `${value.slice(0, length - 1)}...` : value;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function localeSort(a, b) {
  return String(a).localeCompare(String(b), "de");
}

function formatRoleLabel(roleLike) {
  return [roleLike.hierarchyLevel, roleLike.domain, roleLike.roleTitle].filter(Boolean).join(' · ') || 'Nicht zugeordnet';
}


