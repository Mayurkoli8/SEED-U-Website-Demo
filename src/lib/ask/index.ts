import { buildSteps, disclaimers, fallback, samples } from "./samples";
import type { AskAnswer, AskLanguage, AskProvider } from "./types";

export type { AskAnswer, AskLanguage, AskRequest } from "./types";
export { samples } from "./samples";

const DEVANAGARI = /[ऀ-ॿ]/;

export function detectLanguage(text: string): AskLanguage {
  return DEVANAGARI.test(text) ? "mr" : "en";
}

/** Local, offline provider used until a real SEED U endpoint exists. */
export const demoProvider: AskProvider = {
  async ask({ question, language }) {
    const q = question.toLowerCase();
    const match = samples.find((s) => s.keywords.some((k) => q.includes(k)));
    if (match) {
      const copy = match[language];
      return {
        language,
        title: copy.title,
        summary: copy.summary,
        steps: buildSteps(language, copy.steps),
        disclaimer: disclaimers[language],
        source: "demo",
        matched: true,
      };
    }
    const fb = fallback[language];
    return {
      language,
      title: fb.title,
      summary: fb.summary,
      steps: buildSteps(language, fb.steps),
      disclaimer: disclaimers[language],
      source: "demo",
      matched: false,
    };
  },
};

/**
 * Provider for a future SEED U API. Enabled by setting
 * NEXT_PUBLIC_SEEDU_ASK_ENDPOINT. Expects POST { question, language } and
 * a JSON body matching AskAnswer (minus `source`).
 */
function apiProvider(endpoint: string): AskProvider {
  return {
    async ask(request) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!res.ok) throw new Error(`Ask endpoint returned ${res.status}`);
      const data = (await res.json()) as Omit<AskAnswer, "source">;
      return { ...data, source: "api" };
    },
  };
}

const endpoint = process.env.NEXT_PUBLIC_SEEDU_ASK_ENDPOINT;
export const askProvider: AskProvider = endpoint ? apiProvider(endpoint) : demoProvider;
export const isLiveAsk = Boolean(endpoint);

export function askSeedU(question: string): Promise<AskAnswer> {
  return askProvider.ask({ question, language: detectLanguage(question) });
}
