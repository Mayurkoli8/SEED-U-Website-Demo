/**
 * Shared, claim-sensitive content. Anything with `pending` must be confirmed
 * by SEED U before the approval markers are switched off (CONTENT_APPROVALS.md).
 */

export type BuiltItem = { title: string; body: string; status: string; pending: string };

export const builtItems: BuiltItem[] = [
  {
    title: "A data-first foundation for Indian languages",
    body: "Our work starts with verified multilingual data: the foundation that every answer stands on.",
    status: "In progress",
    pending: "Confirm dataset scope, languages covered and current status.",
  },
  {
    title: "Retrieval designed to minimise hallucination",
    body: "We are building retrieval-augmented generation (RAG) that answers from verified sources rather than guesswork.",
    status: "In progress",
    pending: "Confirm pipeline status and how it is evaluated.",
  },
  {
    title: "Marathi agriculture as the first use case",
    body: "Agricultural guidance for Marathi-speaking farmers is our focused first use case.",
    status: "Current focus",
    pending: "Confirm prototype stage and what can be shown publicly.",
  },
];

export type PartnerType = { title: string; short: string; body: string; icon: "kvk" | "fpo" | "farmer" | "research" | "ngo" | "tech" };

export const partnerTypes: PartnerType[] = [
  {
    title: "Krishi Vigyan Kendras",
    short: "KVKs",
    body: "Ground-level agricultural expertise. Together we could check that guidance matches local practice and crops.",
    icon: "kvk",
  },
  {
    title: "FPOs & FPCs",
    short: "Farmer producer organisations",
    body: "They reach farmers directly and know the questions farmers actually ask, season by season.",
    icon: "fpo",
  },
  {
    title: "Farmer-facing organisations",
    short: "Extension & helplines",
    body: "Extension networks, agri-input networks and helplines that already speak with farmers every day.",
    icon: "farmer",
  },
  {
    title: "Research institutions",
    short: "Universities & institutes",
    body: "Agricultural universities and institutes whose verified knowledge can ground the system.",
    icon: "research",
  },
  {
    title: "NGOs",
    short: "Rural livelihoods",
    body: "Organisations working on rural livelihoods that can help design for inclusion, trust and real-world use.",
    icon: "ngo",
  },
  {
    title: "Technology & data partners",
    short: "Speech, data, infrastructure",
    body: "Partners in speech, language data, infrastructure and responsible AI.",
    icon: "tech",
  },
];

export const horizons = [
  { when: "Now", label: "Current work", body: "Marathi agriculture. One language, one sector, done carefully." },
  { when: "Next", label: "Planned", body: "More Indian languages for farmers, built with partners who know each region." },
  {
    when: "Later",
    label: "Long-term vision",
    body: "A shared linguistic intelligence layer for India, so any service can understand people in the language they speak.",
  },
];
