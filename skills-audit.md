# Skills Audit — `.agents/skills/`

Read-only analysis of every `SKILL.md` under `.agents/skills/`, plus the two Anthropic-native design skills. No files were modified, installed, or run.

**Scope note:** The 13 local skills were each read in full. The two Anthropic-native skills (`frontend-design`, `design-inspiration`) are registered/available in this session but their source files are **not locatable on disk** — they're bundled into the harness, not present under `.agents/skills/` or anywhere else in the project. They are summarized from their registered descriptions and flagged accordingly.

A useful mental split up front: these skills fall into three functional buckets that mostly don't compete with each other, plus one bucket that heavily overlaps internally.

- **Image generators** (produce images, not code): `brandkit`, `imagegen-frontend-web`, `imagegen-frontend-mobile`
- **Code/taste generators** (produce frontend code): `design-taste-frontend`, `design-taste-frontend-v1`, `gpt-taste`, `high-end-visual-design`, `redesign-existing-projects`, `image-to-code`, native `frontend-design`
- **Fixed-aesthetic style sheets** (opinionated single look): `industrial-brutalist-ui`, `minimalist-ui`
- **Format/meta** (not aesthetic at all): `full-output-enforcement`, `stitch-design-taste`, native `design-inspiration`

---

## 1. brandkit

1. **Name:** brandkit
2. **What it does:** Generates brand-identity *images* — logo-system boards, brand-guideline decks, identity presentation grids (3×3, 2×3, etc.). It walks through brand strategy (category, metaphor, symbol logic) before producing a multi-panel "brand world" image. Produces images only, not code.
3. **Aesthetic direction:** Leans premium/minimal/cinematic/editorial by default, but is multi-mode (dark developer, security, luxury, voice, cultural, editorial). Effectively **premium-minimal-neutral** — not locked to one look.
4. **Triggers:** Requests for brand kits, logo systems, identity decks, brand-guideline boards, visual-world presentations.
5. **Overlap:** Low. Only image-gen skill focused on *brand identity/logos* rather than website/app screens. No real duplicate.

## 2. imagegen-frontend-web

1. **Name:** imagegen-frontend-web
2. **What it does:** Generates premium *website design reference images* — one horizontal image per section (8 sections = 8 images). Enforces composition variety, hero-scale variety, one consistent palette, anti-slop rules. Images only, no code.
3. **Aesthetic direction:** None/neutral — it's a variation engine (light/dark/studio-solid/neutral themes) designed to avoid a single default look.
4. **Triggers:** "Design a landing page / marketing site / product comp," requests for website *reference images* or mockups (not implementation).
5. **Overlap:** Strong conceptual overlap with `image-to-code` (both generate per-section website images with near-identical anti-slop language and combinatorial engines). Difference: this one **stops at images**; `image-to-code` continues into implementation. Also overlaps with `imagegen-frontend-mobile` (sibling: web vs mobile).

## 3. imagegen-frontend-mobile

1. **Name:** imagegen-frontend-mobile
2. **What it does:** Generates premium *mobile app screen images* and multi-screen flows (iOS/Android/cross-platform), inside clean phone mockups by default. Enforces safe-area awareness, flow logic, multi-screen consistency, readable text. Images only, no code.
3. **Aesthetic direction:** None/neutral — style-variation engine across many app themes (light, dark, wellness, editorial luxe, etc.).
4. **Triggers:** "Design a mobile app / onboarding flow / app screens," mobile UI concept requests.
5. **Overlap:** Direct sibling of `imagegen-frontend-web` (shares the whole rule structure, just mobile-scoped). They're complementary, not redundant — different output medium (phone screens vs website sections).

## 4. design-taste-frontend (v2)

1. **Name:** design-taste-frontend
2. **What it does:** The flagship anti-slop *code* skill for landing pages, portfolios, and redesigns. Reads the brief, sets three dials (variance/motion/density), maps the brief to a real design system (Fluent/Carbon/Material/shadcn/etc.) or an honest aesthetic build, then ships React/Tailwind/Motion with a very strict pre-flight checklist (hero discipline, eyebrow restraint, palette locks, a11y contrast, etc.).
3. **Aesthetic direction:** None/neutral by design — it *infers* the right direction per brief and explicitly bans defaulting to any one look (anti-purple, anti-serif-default, anti-beige-craft).
4. **Triggers:** "Build/redesign a landing page, portfolio, marketing site," frontend implementation where design quality matters.
5. **Overlap:** This is the superset. Overlaps heavily with `design-taste-frontend-v1` (its own predecessor), `high-end-visual-design`, `gpt-taste`, and `redesign-existing-projects` (redesign flow). It is the most complete and current of the code-taste family.

## 5. design-taste-frontend-v1

1. **Name:** design-taste-frontend-v1
2. **What it does:** The original version of the above — same dial system (8/6/4), same anti-slop directives, a "Creative Arsenal" of effects, a Bento "motion engine" paradigm, and a pre-flight check. Explicitly preserved only for backward compatibility.
3. **Aesthetic direction:** None/neutral (premium/high-agency), same philosophy as v2 but less refined.
4. **Triggers:** Same as v2 — but its own description says to use it *only* if you need exact v1 behavior.
5. **Overlap:** **Direct duplicate of `design-taste-frontend` (v2).** Same lineage; v2 is a rewrite/superset. Kept intentionally as a legacy pin.

## 6. gpt-taste

1. **Name:** gpt-taste
2. **What it does:** Awwwards-level frontend *code* skill emphasizing GSAP motion. Forces a "Python RNG" randomization ritual to pick layouts, enforces AIDA page structure, wide editorial typography (bans 6-line headings), gapless bento grids, and specific GSAP scroll paradigms (pinning, stacking, scrubbing).
3. **Aesthetic direction:** None/neutral aesthetically, but strongly **motion-forward / editorial-agency** in flavor.
4. **Triggers:** "Build an award-winning / animated / GSAP-heavy landing page," creative marketing sites.
5. **Overlap:** Overlaps with `design-taste-frontend` and `high-end-visual-design` (all three are anti-slop premium code generators with motion). Distinct hook: the forced-randomization + heavy GSAP scroll choreography.

## 7. high-end-visual-design

1. **Name:** high-end-visual-design
2. **What it does:** "$150k agency" frontend *code* skill. Defines a specific premium component vocabulary — "Double-Bezel" nested card architecture, button-in-button CTAs, macro-whitespace, custom cubic-bezier motion, a Vibe/Layout "variance engine," and a banned-defaults list.
3. **Aesthetic direction:** Leans **Apple/Linear-tier premium** (glassy dark, editorial luxury, soft structuralism) — more opinionated toward a "polished expensive" look than the taste-frontend skills.
4. **Triggers:** "Make this look expensive / high-end / agency-grade," premium UI code.
5. **Overlap:** Substantial overlap with `design-taste-frontend`, `gpt-taste`, and `redesign-existing-projects` (shared banned-fonts/anti-AI-tell/motion-guardrail content). Its distinctive contribution is the Double-Bezel component recipe.

## 8. redesign-existing-projects

1. **Name:** redesign-existing-projects
2. **What it does:** Audit-first *code* skill for upgrading an existing site/app. Scan → diagnose (long checklist of generic AI patterns) → apply targeted fixes without rewriting or breaking the stack. Framework-agnostic.
3. **Aesthetic direction:** None/neutral — it applies the same premium standards but is defined by *process* (audit + incremental fix), not a look.
4. **Triggers:** "Redesign / improve / upgrade / clean up this existing project."
5. **Overlap:** The audit content overlaps with `design-taste-frontend`'s redesign path and shares the AI-tell/banned-defaults vocabulary of `high-end-visual-design`. Distinct value: the explicit "work with existing stack, don't rewrite" audit workflow, which the others don't own.

## 9. image-to-code

1. **Name:** image-to-code
2. **What it does:** Image-first *code* skill for Codex: generate section reference images first, deeply analyze them (typography/spacing/color/component extraction), then implement the frontend to match faithfully. Emphasizes one large image per section and anti-drift implementation.
3. **Aesthetic direction:** None/neutral — a workflow/fidelity skill, not a look.
4. **Triggers:** Visually-important website tasks in Codex where the flow should be "generate design → analyze → build."
5. **Overlap:** The *image-generation half* duplicates `imagegen-frontend-web` almost line-for-line (same combinatorial engine, same anti-slop, same per-section rule). The *implementation half* overlaps with `design-taste-frontend`. It's essentially `imagegen-frontend-web` + an implementation stage bolted on.

## 10. industrial-brutalist-ui

1. **Name:** industrial-brutalist-ui
2. **What it does:** A fixed-aesthetic *code* style sheet: Swiss-industrial-print OR tactical-CRT-terminal interfaces. Rigid grids, extreme type-scale contrast, monospace, hazard-red accent, analog degradation (halftone, scanlines, noise), zero border-radius.
3. **Aesthetic direction:** **Brutalist / industrial / military-terminal.** Strongly opinionated, single-look.
4. **Triggers:** "Brutalist," "blueprint," "terminal," "declassified," data-heavy dashboards or editorial sites wanting that raw mechanical feel.
5. **Overlap:** None. Unique aesthetic. Directly *opposes* `minimalist-ui` and the "premium/soft" defaults of the taste skills.

## 11. minimalist-ui

1. **Name:** minimalist-ui
2. **What it does:** A fixed-aesthetic *code* style sheet: editorial "document-style" minimalism. Warm monochrome palette, serif+sans+mono typographic contrast, flat bento grids, muted pastel spot-accents, near-zero shadows, no gradients, no pill-shaped large containers.
3. **Aesthetic direction:** **Minimalist / editorial / Notion-like.** Strongly opinionated, single-look.
4. **Triggers:** "Minimalist," "clean editorial," "document-style," warm-monochrome interfaces.
5. **Overlap:** None as a whole, but it is the **aesthetic opposite** of `industrial-brutalist-ui`, and its "minimalist/editorial" trigger competes with the low-dial minimalist mode of `design-taste-frontend`.

## 12. full-output-enforcement

1. **Name:** full-output-enforcement
2. **What it does:** A behavior/format override, not a design skill. Bans truncation and placeholder patterns (`// ...`, "rest follows the same pattern"), enforces complete code output, and defines a clean split protocol when hitting token limits.
3. **Aesthetic direction:** None/neutral (not a design skill at all).
4. **Triggers:** Any task needing exhaustive, unabridged output.
5. **Overlap:** None. Orthogonal to every other skill — it's a completeness enforcer that could stack on top of any of them.

## 13. stitch-design-taste

1. **Name:** stitch-design-taste
2. **What it does:** A meta/generator skill: produces a `DESIGN.md` file for **Google Stitch** (screen-generation tool), translating the anti-slop taste rules into Stitch's semantic natural-language format. It doesn't build UI itself — it emits a design-spec document for a different tool.
3. **Aesthetic direction:** None/neutral — encodes the same premium anti-slop standards as the taste family, but as a spec.
4. **Triggers:** "Generate a Stitch DESIGN.md," using Google Stitch, needing a semantic design system doc.
5. **Overlap:** Shares the *rule content* with `design-taste-frontend` (bans, palette, motion), but the **output target is unique** (a Stitch config file, not code or images). Not redundant — different deliverable and platform.

## 14. frontend-design (Anthropic-native) — *source not locatable on disk*

1. **Name:** frontend-design (native)
2. **What it does:** Anthropic's built-in skill for creating distinctive, production-grade frontend interfaces (components, pages, apps) that avoid generic AI aesthetics. General-purpose polished-code generator.
3. **Aesthetic direction:** None/neutral — "avoid mediocre AI aesthetics," not a specific look.
4. **Triggers:** "Build a web component / page / app," generic frontend-build requests.
5. **Overlap:** Broadly overlaps with `design-taste-frontend`, `high-end-visual-design`, and `gpt-taste` in intent (anti-generic frontend code). It's the vendor baseline the local taste skills are trying to beat/extend. *Summary based on registered description; SKILL.md file not found in this environment.*

## 15. design-inspiration (Anthropic-native) — *not present in this session*

1. **Name:** design-inspiration (native)
2. **What it does:** Not resolvable. No skill named `design-inspiration` is registered in this session's available-skills list, and no source file exists on disk. Cannot be summarized reliably.
3. **Aesthetic direction:** Unknown — not locatable.
4. **Triggers:** Unknown.
5. **Overlap:** Cannot assess. *Flagged as unavailable/unverifiable in this environment; do not assume it exists here.*

---

## Summary Table

| Skill | Bucket | Output | Aesthetic direction | Triggers on | Duplicates / conflicts |
|---|---|---|---|---|---|
| brandkit | Image-gen | Images | Premium-neutral (multi-mode) | Brand kits, logos, identity decks | None significant |
| imagegen-frontend-web | Image-gen | Images | None/neutral | Website reference images | Overlaps `image-to-code` (img half); sibling of mobile |
| imagegen-frontend-mobile | Image-gen | Images | None/neutral | Mobile app screens/flows | Sibling of web (complementary) |
| design-taste-frontend (v2) | Code taste | Code | None/neutral (infers) | Landing/portfolio/redesign build | Superset of v1; overlaps HEV, gpt-taste, redesign |
| design-taste-frontend-v1 | Code taste | Code | None/neutral | Same as v2 (legacy) | **Direct dup of v2** (kept for compat) |
| gpt-taste | Code taste | Code | Neutral, motion/editorial-forward | GSAP/animated award-tier sites | Overlaps v2, HEV |
| high-end-visual-design | Code taste | Code | Apple/Linear premium | "Make it expensive/agency" | Overlaps v2, gpt-taste, redesign |
| redesign-existing-projects | Code taste | Code | None/neutral (process) | Upgrade existing site/app | Overlaps v2 redesign path |
| image-to-code | Code taste | Images→Code | None/neutral | Codex image-first build | Img half ≈ imagegen-frontend-web; impl half ≈ v2 |
| industrial-brutalist-ui | Fixed aesthetic | Code | **Brutalist/industrial** | Brutalist/terminal/blueprint | **Conflicts w/ minimalist-ui** |
| minimalist-ui | Fixed aesthetic | Code | **Minimalist/editorial** | Minimalist/document-style | **Conflicts w/ industrial-brutalist-ui** |
| full-output-enforcement | Meta/format | Behavior | None | Exhaustive output needed | None (orthogonal) |
| stitch-design-taste | Meta/generator | DESIGN.md | None/neutral | Google Stitch spec | Shares rules w/ v2; unique deliverable |
| frontend-design (native) | Code taste | Code | None/neutral | Generic frontend build | Vendor baseline; overlaps taste family. *File not on disk* |
| design-inspiration (native) | Unknown | — | Unknown | Unknown | *Not present in this session* |

---

## Flagged Recommendation

### Redundant — safe to remove (or consolidate)

- **`design-taste-frontend-v1`** — The clearest cut. It is explicitly a legacy backward-compat pin, and `design-taste-frontend` (v2) is a full rewrite/superset. Keep it **only** if some workflow hard-depends on exact v1 behavior; otherwise remove. Having both live doubles the "which taste skill fires?" ambiguity.
- **`image-to-code`** vs **`imagegen-frontend-web`** — These share their entire image-generation engine. `image-to-code` = `imagegen-frontend-web` + an implementation stage. Recommend keeping **one**: if you want image-only references keep `imagegen-frontend-web`; if you want the full image→code Codex flow keep `image-to-code`; running both invites the model to pick the shallower one arbitrarily. Do not keep both as-is.
- **Code-taste cluster** (`design-taste-frontend`, `high-end-visual-design`, `gpt-taste`, native `frontend-design`) — Four skills that all say "generate premium anti-generic frontend code" with overlapping banned-lists and motion guardrails. This is the biggest source of collision. Recommend **keeping `design-taste-frontend` as the primary** and demoting the others to *specialists* only if their unique hook is worth it:
  - `gpt-taste` → keep only if you specifically want the GSAP-scroll-choreography specialization.
  - `high-end-visual-design` → keep only for its distinctive "Double-Bezel" component recipe.
  - native `frontend-design` → this is the vendor default; the local taste skills exist to override it. Consider it the fallback, not a peer.

### Actively conflicting (should not both fire on the same job)

- **`industrial-brutalist-ui` ⟷ `minimalist-ui`** — Direct aesthetic opposites (raw brutalist zero-radius hazard-red vs. warm-monochrome soft-editorial no-gradients). Both are legitimate and worth keeping *individually*, but they must never be active on the same request. They only conflict if a router might load both; keep them as explicit, mutually-exclusive opt-ins.
- **Fixed-aesthetic skills ⟷ the neutral taste skills** — `design-taste-frontend` (and friends) deliberately *infer* a direction and ban committing to one look; `industrial-brutalist-ui`/`minimalist-ui` *impose* one. On a vague brief, a "minimalist" or "brutalist" vibe word could plausibly trigger either the fixed style sheet or the taste skill's low-dial mode. Decide precedence explicitly (recommend: named-aesthetic keyword → fixed style sheet; everything else → `design-taste-frontend`).
- **Motion philosophy clash (minor):** `gpt-taste` and `high-end-visual-design` push perpetual/heavy motion; `minimalist-ui` demands "invisible" motion. Not a hard conflict, but they encode opposite motion defaults — don't stack them.

### Genuinely distinct — keep

- **`brandkit`** — only brand-identity/logo image generator. No real overlap.
- **`imagegen-frontend-web`** and **`imagegen-frontend-mobile`** — complementary siblings (website sections vs phone screens); keep both, but resolve the `image-to-code` overlap above.
- **`redesign-existing-projects`** — the only skill defined by an audit-first, don't-rewrite-the-stack *process*. Distinct enough to keep even alongside `design-taste-frontend`'s redesign path (this one is more conservative/framework-agnostic).
- **`industrial-brutalist-ui`** and **`minimalist-ui`** — each is a coherent, unique, fixed aesthetic. Keep both; just gate them so they never co-fire.
- **`full-output-enforcement`** — orthogonal completeness enforcer; stacks cleanly on anything. Keep.
- **`stitch-design-taste`** — unique deliverable (a Google Stitch `DESIGN.md`), not code or images. Keep if you use Stitch; otherwise it's dead weight but not a conflict.
- **`design-taste-frontend`** — the strongest, most current, most complete taste skill. Keep as the primary/default of the code-taste family.

### Net suggestion
The collection is heaviest in the **code-taste bucket** (5–6 near-siblings) and the **website-image bucket** (2 near-duplicates). If you want a lean set: keep `design-taste-frontend`, `redesign-existing-projects`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`, `industrial-brutalist-ui`, `minimalist-ui`, `full-output-enforcement`, and `stitch-design-taste` (if Stitch is used). Retire `design-taste-frontend-v1`, fold `image-to-code` into one of the imagegen skills (or keep exactly one), and treat `gpt-taste` / `high-end-visual-design` as optional specialists rather than always-on peers.
