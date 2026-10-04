export type Language = {
  code: string;
  native: string;
  english: string;
  status: "focus" | "roadmap";
  note: string;
};

/**
 * Marathi is the current focus. Every other language is shown as part of
 * the long-term vision and must not be presented as supported today.
 */
export const languages: Language[] = [
  {
    code: "mr",
    native: "मराठी",
    english: "Marathi",
    status: "focus",
    note: "Current focus. We are building agricultural guidance for Marathi-speaking farmers first.",
  },
  { code: "hi", native: "हिन्दी", english: "Hindi", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "ta", native: "தமிழ்", english: "Tamil", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "te", native: "తెలుగు", english: "Telugu", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "bn", native: "বাংলা", english: "Bengali", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "ml", native: "മലയാളം", english: "Malayalam", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "as", native: "অসমীয়া", english: "Assamese", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
  { code: "ur", native: "اردو", english: "Urdu", status: "roadmap", note: "Part of the long-term India-first vision. Not supported yet." },
];
