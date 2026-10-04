export type AskLanguage = "en" | "mr";

export type AskStep = { label: string; text: string };

export type AskAnswer = {
  language: AskLanguage;
  title: string;
  summary: string;
  steps: AskStep[];
  disclaimer: string;
  /** "demo" = local sample answer. "api" = a real SEED U endpoint. */
  source: "demo" | "api";
  /** False when the demo had no sample answer for the question. */
  matched: boolean;
};

export type AskRequest = { question: string; language: AskLanguage };

/** Contract a future SEED U endpoint should satisfy. */
export interface AskProvider {
  ask(request: AskRequest): Promise<AskAnswer>;
}
