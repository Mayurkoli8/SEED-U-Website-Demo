# Content approvals

The build brief requires that no unsupported claim is published. Every item
below is either flagged on the site with a **Pending approval** badge or is
copy that needs a specialist review. Once SEED U approves (or removes) every
item, set `NEXT_PUBLIC_SHOW_APPROVAL_MARKERS=false`.

## Claims flagged on the site

| Where | Claim | What to confirm |
| --- | --- | --- |
| Home §04, Platform | "Curated, verified multilingual datasets" | Dataset sources, languages covered, verification process |
| Home §08, What We Have Built | Data-first foundation for Indian languages | Scope, languages, current status |
| Home §08, What We Have Built | RAG designed to minimise hallucination | Pipeline status and how it is evaluated |
| Home §08, What We Have Built | Marathi agriculture as first use case | Prototype stage and what can be shown publicly |
| Platform | "A linguistic foundation" layer | Dataset scope and current status |
| About | "India's first Linguistic OS" | Evidence for the priority claim ("first") |
| Contact, footer of legal pages | `hello@seedu.io` | No email is published on the current site. Confirm the real address (`NEXT_PUBLIC_CONTACT_EMAIL`) |

## Deliberately left out (from the current seedu.io)

These appear on the current site but were **not** carried over, per brief §2:

- "22+ languages" (as a product capability)
- "500M+ users underserved"
- "95% AI data gap" / "<5% AI data coverage"
- "19,500+ dialects" (the new site only states the verifiable fact of 22 languages in the Eighth Schedule of the Constitution)
- "1.4 billion voices"

Re-add any of them only with an approved source.

## Copy needing specialist review

- **Marathi text** (hero animation, Ask demo answers in `src/lib/ask/samples.ts`, Marathi page): native-speaker review.
- **Agricultural guidance** in the demo answers: agronomist / KVK review. The answers are written as "what to check" prompts, not diagnoses.
- **Privacy policy and Terms**: legal review (including India's DPDP Act, 2023). Both pages show a draft banner.
- **Blog posts** in `src/content/posts.ts` are `draft: true` (labelled, `noindex`, excluded from the sitemap). Set `draft: false` when approved.
- **Corn-growing Lottie** (`design/lottie/corn-growing.source.json`): its metadata only says it was exported with the LottieFiles After Effects plugin. Confirm where it came from and that its licence allows commercial use.
- **Team roles** on /about are copied from seedu.io. Confirm they are current.
