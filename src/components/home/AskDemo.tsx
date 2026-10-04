"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { askSeedU, detectLanguage, isLiveAsk, samples, type AskAnswer, type AskLanguage } from "@/lib/ask";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/primitives";

const THINKING = {
  en: ["Reading your language", "Finding verified knowledge", "Writing a clear answer"],
  mr: ["तुमची भाषा समजून घेत आहे", "पडताळलेली माहिती शोधत आहे", "स्पष्ट उत्तर लिहित आहे"],
};

const UI = {
  en: { label: "Your question", placeholder: "Describe what you see on your farm…", ask: "Ask", suggestions: "Try a sample question" },
  mr: { label: "तुमचा प्रश्न", placeholder: "तुमच्या शेतात काय दिसते ते लिहा…", ask: "विचारा", suggestions: "नमुना प्रश्न वापरून पाहा" },
};

type Phase = "idle" | "thinking" | "answered";

export function AskDemo() {
  const [uiLang, setUiLang] = useState<AskLanguage>("mr");
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [thinkingStep, setThinkingStep] = useState(0);
  const [answer, setAnswer] = useState<AskAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setInterval(() => setThinkingStep((s) => Math.min(s + 1, 2)), 650);
    return () => clearInterval(t);
  }, [phase]);

  async function submit(q: string) {
    const text = q.trim();
    if (!text || phase === "thinking") return;
    setAsked(text);
    setQuestion("");
    setAnswer(null);
    setError(null);
    setThinkingStep(0);
    setPhase("thinking");
    try {
      const [result] = await Promise.all([askSeedU(text), new Promise((r) => setTimeout(r, 2000))]);
      setAnswer(result);
      setPhase("answered");
      track("ask_demo_submit", { language: result.language, matched: result.matched, source: result.source });
    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("idle");
    }
  }

  const askedLang = asked ? detectLanguage(asked) : uiLang;
  const ui = UI[uiLang];

  return (
    <div className="rounded-[2rem] bg-paper p-5 shadow-[0_40px_80px_-50px_rgba(29,58,42,0.55)] ring-1 ring-forest/10 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!isLiveAsk && (
          <span className="inline-flex items-center gap-2 rounded-full bg-turmeric/15 px-3 py-1.5 text-sm font-semibold text-soil">
            <span aria-hidden className="h-2 w-2 rounded-full bg-turmeric" />
            Demo · sample answers, not live AI
          </span>
        )}
        <div role="group" aria-label="Sample question language" className="inline-flex rounded-full bg-cream p-1 ring-1 ring-forest/10">
          {(["mr", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={uiLang === l}
              onClick={() => setUiLang(l)}
              className={cx(
                "min-h-10 rounded-full px-4 text-sm font-semibold transition-colors",
                uiLang === l ? "bg-forest text-cream" : "text-forest hover:bg-sage-soft",
                l === "mr" && "font-deva",
              )}
            >
              {l === "mr" ? "मराठी" : "English"}
            </button>
          ))}
        </div>
      </div>

      <p className={cx("mt-6 text-sm font-semibold text-muted", uiLang === "mr" && "font-deva")}>{ui.suggestions}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {samples.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              lang={uiLang}
              onClick={() => submit(s[uiLang].question)}
              disabled={phase === "thinking"}
              className={cx(
                "rounded-2xl bg-mist px-4 py-2.5 text-left text-[0.95rem] text-forest ring-1 ring-forest/10 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sage-soft disabled:opacity-50",
                uiLang === "mr" && "font-deva",
              )}
            >
              {s[uiLang].question}
            </button>
          </li>
        ))}
      </ul>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit(question);
        }}
      >
        <label htmlFor={inputId} className={cx("block text-sm font-semibold text-forest", uiLang === "mr" && "font-deva")}>
          {ui.label}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <textarea
            id={inputId}
            rows={2}
            lang={uiLang}
            value={question}
            maxLength={500}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(question);
              }
            }}
            placeholder={ui.placeholder}
            className={cx(
              "min-h-14 flex-1 resize-none rounded-2xl bg-cream px-4 py-3 text-lg text-ink ring-1 ring-forest/15 placeholder:text-muted/70 focus:ring-2 focus:ring-leaf focus:outline-none",
              uiLang === "mr" && "font-deva",
            )}
          />
          <button
            type="submit"
            disabled={!question.trim() || phase === "thinking"}
            className={cx(
              "inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-forest px-7 text-lg font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:translate-y-0 disabled:opacity-50",
              uiLang === "mr" && "font-deva",
            )}
          >
            {ui.ask}
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
              <path d="M3 10h12m-4-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm text-soil">
            {error}
          </p>
        )}
      </form>

      <div aria-live="polite" className="mt-6 min-h-8">
        <AnimatePresence mode="wait">
          {asked && (
            <motion.div key={asked} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <motion.p
                lang={askedLang}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cx("ml-auto max-w-[85%] rounded-3xl rounded-br-md bg-sage-soft px-5 py-3 text-lg text-forest", askedLang === "mr" && "font-deva")}
              >
                {asked}
              </motion.p>

              {phase === "thinking" && (
                <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 px-1" aria-label="Working">
                  {THINKING[askedLang].map((label, i) => (
                    <li
                      key={label}
                      className={cx(
                        "flex items-center gap-3 text-[0.95rem] transition-colors duration-500",
                        i <= thinkingStep ? "text-forest" : "text-muted/50",
                        askedLang === "mr" && "font-deva",
                      )}
                    >
                      <span className="relative flex h-3 w-3">
                        {i === thinkingStep && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf/50" />}
                        <span className={cx("relative inline-flex h-3 w-3 rounded-full", i <= thinkingStep ? "bg-leaf" : "bg-sage")} />
                      </span>
                      {label}
                    </li>
                  ))}
                </motion.ol>
              )}

              {phase === "answered" && answer && (
                <motion.article
                  lang={answer.language}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cx("max-w-[95%] rounded-3xl rounded-bl-md bg-forest p-6 text-cream sm:p-7", answer.language === "mr" && "font-deva")}
                >
                  <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sage uppercase" lang="en">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-turmeric" />
                    SEED U {answer.source === "demo" ? "· demo answer" : ""}
                  </p>
                  <h3 className={cx("mt-2 text-2xl text-cream", answer.language === "mr" && "font-deva font-semibold")}>{answer.title}</h3>
                  <p className="mt-2 text-lg text-sage-soft/90">{answer.summary}</p>
                  <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                    {answer.steps.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 + i * 0.12 }}
                        className="rounded-2xl bg-forest-soft p-4 ring-1 ring-sage/15"
                      >
                        <p className="text-sm font-semibold text-turmeric">
                          {i + 1}. {step.label}
                        </p>
                        <p className="mt-1 text-cream/90">{step.text}</p>
                      </motion.li>
                    ))}
                  </ol>
                  <p className="mt-5 border-t border-sage/20 pt-4 text-sm text-sage">{answer.disclaimer}</p>
                </motion.article>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
