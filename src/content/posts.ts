/**
 * Blog / news content. Kept as typed data so no CMS is needed yet.
 * `draft: true` posts are labelled, set to noindex and left out of the sitemap.
 * To add a post: append an entry. To move to MDX or a CMS later, keep this shape.
 */

export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
  draft: boolean;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "why-we-are-starting-with-marathi-agriculture",
    title: "Why we are starting with Marathi agriculture",
    description: "Building Indian-language AI starts with one language and one community, done carefully. Here is why ours is Marathi-speaking farmers.",
    date: "2026-10-04",
    author: "SEED U",
    tags: ["Marathi agriculture AI", "Indian language AI"],
    draft: true,
    body: [
      {
        type: "p",
        text: "Indian-language AI is a big ambition. Big ambitions are easiest to get wrong when they start everywhere at once. So we are starting with one language and one sector: Marathi, and agriculture.",
      },
      { type: "h2", text: "A real question, asked every day" },
      {
        type: "p",
        text: "Farmers make decisions daily about water, pests, nutrients and timing. Useful knowledge exists, in research, advisories and the experience of extension workers, but it rarely arrives in the farmer's language, in a short form, at the moment it is needed.",
      },
      { type: "h2", text: "Why one language first" },
      {
        type: "p",
        text: "Language is more than translation. Local crop names, units, idioms and the way people describe a problem all matter. Building deeply for Marathi first lets us learn these details properly before expanding to other Indian languages.",
      },
      { type: "h2", text: "What we will not do" },
      {
        type: "ul",
        items: [
          "Claim capabilities the product does not have.",
          "Publish impact numbers we cannot verify.",
          "Replace local experts. Good guidance points farmers to KVKs and agriculture officers when a decision needs confirmation.",
        ],
      },
    ],
  },
  {
    slug: "what-verified-should-mean-in-agricultural-ai",
    title: "What “verified” should mean in agricultural AI",
    description: "An AI answer is only as trustworthy as the knowledge behind it. A short note on why we build from verified sources.",
    date: "2026-10-04",
    author: "SEED U",
    tags: ["Verified datasets", "Responsible AI"],
    draft: true,
    body: [
      {
        type: "p",
        text: "Large language models are fluent. Fluency is not the same as accuracy. In agriculture, a confident wrong answer can cost a farmer a season.",
      },
      { type: "h2", text: "Answers grounded in sources" },
      {
        type: "p",
        text: "Our approach is retrieval-augmented generation: when a question arrives, the system first finds relevant passages from checked sources, then writes an answer grounded in them. The goal is to minimise hallucination and make answers traceable.",
      },
      { type: "h2", text: "Verified is a process, not a label" },
      {
        type: "ul",
        items: [
          "Know where each piece of knowledge came from.",
          "Prefer sources that agricultural experts already trust.",
          "Review answers with people who understand local farming.",
          "Be clear when the system does not know.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
