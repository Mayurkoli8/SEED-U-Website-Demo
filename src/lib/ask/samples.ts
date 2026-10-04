import type { AskLanguage, AskStep } from "./types";

/**
 * Illustrative demo content only. These are general "what to check" prompts,
 * not diagnoses or product output. Marathi copy needs native-speaker and
 * agronomist review before launch (see CONTENT_APPROVALS.md).
 */

type Localised = { question: string; title: string; summary: string; steps: string[] };

export type Sample = {
  id: string;
  keywords: string[];
  en: Localised;
  mr: Localised;
};

export const stepLabels: Record<AskLanguage, string[]> = {
  en: ["Check the crop", "Observe the soil", "Consider the weather", "Plan the next action"],
  mr: ["पीक तपासा", "माती पाहा", "हवामानाचा विचार करा", "पुढची कृती ठरवा"],
};

export const disclaimers: Record<AskLanguage, string> = {
  en: "Illustrative demo answer, not live AI. Always confirm with your local Krishi Vigyan Kendra (KVK) or agriculture officer.",
  mr: "हे फक्त प्रात्यक्षिक उत्तर आहे, थेट AI नाही. कृपया जवळच्या कृषी विज्ञान केंद्र (KVK) किंवा कृषी अधिकाऱ्याकडून खात्री करून घ्या.",
};

export const samples: Sample[] = [
  {
    id: "yellow-leaves",
    keywords: ["yellow", "pale", "पिवळ", "पिवळी"],
    en: {
      question: "My crop leaves are turning yellow. What should I check?",
      title: "Yellowing leaves: what to check",
      summary:
        "Yellow leaves can have several causes: water, nutrients, pests or disease. These checks help narrow it down before you act.",
      steps: [
        "Notice which leaves turned yellow first: older lower leaves, or new top leaves. Look under the leaves for insects or spots.",
        "Is the soil waterlogged, or very dry? Both can stress the roots and turn leaves yellow.",
        "Think about heavy rain, heat or cold over the past week.",
        "Note what fertiliser you used and when. Show a photo to your local KVK or agriculture officer before buying any input.",
      ],
    },
    mr: {
      question: "माझ्या पिकाची पाने पिवळी पडत आहेत. काय तपासावे?",
      title: "पाने पिवळी पडणे: काय तपासावे",
      summary:
        "पाने पिवळी पडण्याची अनेक कारणे असू शकतात: पाणी, अन्नद्रव्ये, कीड किंवा रोग. उपाय करण्यापूर्वी या गोष्टी तपासा.",
      steps: [
        "आधी कोणती पाने पिवळी झाली ते पाहा: खालची जुनी पाने की वरची नवी पाने. पानांच्या खालच्या बाजूला कीड किंवा ठिपके आहेत का ते पाहा.",
        "माती पाणथळ आहे की खूप कोरडी? दोन्हीमुळे मुळांवर ताण येऊन पाने पिवळी पडू शकतात.",
        "गेल्या आठवड्यात जोरदार पाऊस, जास्त उष्णता किंवा थंडी होती का, ते आठवा.",
        "कोणते खत कधी दिले याची नोंद ठेवा. कोणतेही खत किंवा औषध विकत घेण्यापूर्वी जवळच्या कृषी विज्ञान केंद्राला (KVK) किंवा कृषी अधिकाऱ्याला फोटो दाखवा.",
      ],
    },
  },
  {
    id: "too-much-water",
    keywords: ["water", "wet", "irrigat", "flood", "drain", "पाणी", "ओल", "निचरा"],
    en: {
      question: "How do I know if my field has too much water?",
      title: "Too much water? Signs to look for",
      summary: "Too much water keeps air away from the roots and weakens the crop.",
      steps: [
        "Wilting even though the soil is wet, or yellowing lower leaves, can point to waterlogged roots.",
        "Press a handful of soil from root depth. If water drips out or it stays sticky, it is too wet.",
        "If more rain is expected, hold off on irrigation.",
        "Open drainage channels where water stands, and water again only when the top layer has dried.",
      ],
    },
    mr: {
      question: "शेतात पाणी जास्त झाले आहे हे कसे ओळखावे?",
      title: "पाणी जास्त झाले आहे का? ही लक्षणे पाहा",
      summary: "जास्त पाण्यामुळे मुळांना हवा मिळत नाही आणि पीक कमजोर होते.",
      steps: [
        "माती ओली असूनही पीक कोमेजत असेल किंवा खालची पाने पिवळी पडत असतील, तर मुळांजवळ पाणी साचले असू शकते.",
        "मुळांच्या खोलीवरची मूठभर माती दाबून पाहा. पाणी गळत असेल किंवा माती चिकट राहत असेल, तर ती जास्त ओली आहे.",
        "आणखी पावसाचा अंदाज असेल, तर पाणी देणे थांबवा.",
        "जिथे पाणी साचते तिथे निचऱ्यासाठी चर काढा आणि वरचा थर कोरडा झाल्यावरच पुन्हा पाणी द्या.",
      ],
    },
  },
  {
    id: "pests",
    keywords: ["pest", "insect", "worm", "caterpillar", "eating", "chew", "hole", "bug", "कीड", "किड", "अळी"],
    en: {
      question: "Insects are eating my leaves. What should I look for?",
      title: "Leaf damage from pests: what to look for",
      summary: "Identifying the pest correctly comes before choosing any control.",
      steps: [
        "Look at the top and underside of leaves in the early morning or evening. Note holes, chewed edges, or curled or sticky leaves.",
        "Check the base of plants and nearby weeds. Some pests hide there during the day.",
        "Note whether damage spread after a warm, humid spell.",
        "Count how many plants are affected before spraying anything. Take a clear photo to your KVK or agriculture officer to identify the pest and an approved control.",
      ],
    },
    mr: {
      question: "पानांवर कीड पडली आहे. काय पाहावे?",
      title: "किडीमुळे पानांचे नुकसान: काय पाहावे",
      summary: "योग्य उपायासाठी आधी कीड नेमकी कोणती आहे ते ओळखणे महत्त्वाचे आहे.",
      steps: [
        "सकाळी लवकर किंवा संध्याकाळी पानांची वरची आणि खालची बाजू पाहा. छिद्रे, कुरतडलेल्या कडा, गुंडाळलेली किंवा चिकट पाने आहेत का ते नोंदवा.",
        "झाडांच्या बुंध्याजवळ आणि आसपासच्या तणांमध्ये पाहा. काही किडी दिवसा तिथे लपतात.",
        "उबदार, दमट हवामानानंतर नुकसान वाढले का ते लक्षात घ्या.",
        "फवारणीपूर्वी किती झाडांवर परिणाम झाला आहे ते मोजा. किडीची ओळख आणि योग्य, मान्यताप्राप्त उपायासाठी स्पष्ट फोटो KVK किंवा कृषी अधिकाऱ्याला दाखवा.",
      ],
    },
  },
  {
    id: "spray-rain",
    keywords: ["spray", "rain", "pesticide", "फवार", "पाऊस", "पावसा"],
    en: {
      question: "Rain may come today. Should I spray?",
      title: "Spraying when rain is possible",
      summary: "Rain soon after spraying can wash the product off the leaves.",
      steps: [
        "Make sure spraying is actually needed. Confirm the problem first.",
        "Avoid working on very wet, muddy fields where runoff is likely.",
        "Check the local forecast from a trusted source before you start.",
        "Read the label for how long the product needs without rain. Spray in calm air, morning or evening, and wear protective gear.",
      ],
    },
    mr: {
      question: "आज पाऊस येऊ शकतो. फवारणी करावी का?",
      title: "पावसाची शक्यता असताना फवारणी",
      summary: "फवारणीनंतर लगेच पाऊस आला तर औषध पानांवरून धुऊन जाऊ शकते.",
      steps: [
        "फवारणीची खरोखर गरज आहे का, याची आधी समस्या ओळखून खात्री करा.",
        "खूप ओल्या, चिखलाच्या शेतात फवारणी टाळा, जिथे पाणी वाहून जाण्याची शक्यता असते.",
        "सुरुवात करण्यापूर्वी विश्वसनीय स्रोताकडून स्थानिक हवामान अंदाज तपासा.",
        "औषधाला पावसाशिवाय किती वेळ हवा ते लेबलवर वाचा. वारा शांत असताना, सकाळी किंवा संध्याकाळी फवारणी करा आणि संरक्षक साधने वापरा.",
      ],
    },
  },
];

export const fallback: Record<AskLanguage, { title: string; summary: string; steps: string[] }> = {
  en: {
    title: "This demo only knows a few questions",
    summary:
      "The live product will answer open questions from verified agricultural knowledge. This demo has a small set of sample answers. Try one of the suggested questions.",
    steps: [
      "Describe what you see on the plant: colour, spots, holes, wilting.",
      "Say what the soil is like: wet, dry, cracked.",
      "Mention recent weather: rain, heat, cold.",
      "Ask what to check next. A good answer helps you decide, it does not decide for you.",
    ],
  },
  mr: {
    title: "या प्रात्यक्षिकात काहीच प्रश्न आहेत",
    summary:
      "पूर्ण उत्पादन पडताळलेल्या कृषी माहितीतून प्रश्नांची उत्तरे देईल. या प्रात्यक्षिकात फक्त काही नमुना उत्तरे आहेत. सुचवलेल्यांपैकी एक प्रश्न विचारून पाहा.",
    steps: [
      "झाडावर काय दिसते ते सांगा: रंग, ठिपके, छिद्रे, कोमेजणे.",
      "माती कशी आहे ते सांगा: ओली, कोरडी, भेगा पडलेली.",
      "अलीकडचे हवामान सांगा: पाऊस, उष्णता, थंडी.",
      "पुढे काय तपासावे ते विचारा. चांगले उत्तर निर्णय घेण्यास मदत करते, निर्णय तुमचाच असतो.",
    ],
  },
};

export function buildSteps(language: AskLanguage, texts: string[]): AskStep[] {
  return texts.map((text, i) => ({ label: stepLabels[language][i] ?? "", text }));
}
