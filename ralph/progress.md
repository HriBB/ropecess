# Ralph progress — Ropecess Design Preview

One dated entry per completed iteration: issue number, what was built, test/build
results, anything deferred or surprising for the next iteration. Newest at the top.

PRD: #2. Slices: #3–#11 (`ready-for-agent`), #12 is HITL (`ready-for-human` — not ours).

---

## 2026-06-05 — Issue #9: S7 Variant C (Editorial Calm) full site

**Built:** Complete Variant C Design Preview. `config.ts` updated: `VARIANT_C_ROUTE_FILES` constant added; variant-c routes live under `variant-c/layout.tsx` nested layout block; variants D–E retain home-only routes. Total paths: 41 (was 31). `variant-c/layout.tsx` provides the Editorial Calm header (Manrope extralight wordmark in uppercase, thin-rule separator, amber active nav, locale toggle, ThemeButton, mobile hamburger), footer (amber dot + "Design Preview" label), and PreviewSwitcher. `variant-c/home.tsx` wraps existing VariantC prototype with `makePreviewLh` helper. Five inner pages (about, services, spacenet, height-cleaning, contact): all built around the magazine `Chapter` component (sticky left label with amber dot, `py-36` breathing room, thin `border-t`). About: banner image framed in whitespace, story chapters alternate layout. Services: numbered featured list + all-services chapter with amber dot bullets. Spacenet and Contact carry full loader/action with preview subject tagging (`preview=true` hidden field). Height Cleaning: amber-dot bullet lists, image rows, CTA arrow button. Contact: minimal two-column form chapter.

**Test/build results:** 25 unit tests pass (4 files: theme, buildPreviewRoutes, getPreviewMeta, email.subject). `pnpm typecheck`, `pnpm lint`, `pnpm build` (4.55s) all clean. Build with token: 12 variant-c route paths confirmed in server bundle, noindex present, token absent from canonical/og:url.

**Deferred/surprising:** None. S8–S9 follow the same pattern (each variant needs own layout + inner pages). The shared `INNER_PAGES` constant and route file map pattern makes adding further variants mechanically identical.

---

## 2026-06-05 — Issue #8: S6 Variant B (Exaggerated Minimal) full site

**Built:** Complete Variant B Design Preview. `config.ts` restructured: `INNER_PAGES` shared constant replaces `VARIANT_A_INNER_PAGES`; variant-b routes live under `variant-b/layout.tsx` nested layout block; variants C–E retain home-only routes. Total paths: 31 (was 21). `variant-b/layout.tsx` provides the Exaggerated Minimal header (EB Garamond italic wordmark, Lato uppercase nav, safety orange (#EA580C) active state, ThemeButton, locale toggle, mobile hamburger), footer, and PreviewSwitcher. `variant-b/home.tsx` wraps existing VariantB prototype with `makePreviewLh` helper. Five inner pages (about, services, spacenet, height-cleaning, contact): numbered-section treatment, clamp() display headings in EB Garamond, safety orange accents, type-first aesthetic (no hero images on about/services/contact; spacenet and PHC use images as structural accents). Definition-list style for services. Spacenet and Contact carry full loader/action with preview subject tagging.

**Test/build results:** 24 unit tests pass (4 files: theme, buildPreviewRoutes, getPreviewMeta, email.subject). `pnpm typecheck`, `pnpm lint`, `pnpm build` (4.08s) all clean. Build with token: 12 variant-b route paths confirmed in server bundle, noindex present, token absent from canonical/og:url.

**Deferred/surprising:** None. S7–S9 follow the same pattern (each variant needs own layout + inner pages). The shared `INNER_PAGES` constant now makes adding further variants mechanically identical.

---

## 2026-06-05 — Issue #7: S5 Variant A (Airy Organic) full site

**Built:** Complete Variant A Design Preview. `routes/preview/utils.ts` adds shared preview path utilities (`parsePreviewPathname`, `previewHref`, `getPreviewAlternateUrl`). `config.ts` restructured: variant-a routes live under `variant-a/layout.tsx` (a nested layout block within the outer preview layout); variants B–E retain home-only routes. Total paths: 21 (was 11). `variant-a/layout.tsx` provides the Airy Organic header (Albert Sans, sage pill nav, locale toggle, ThemeButton, mobile hamburger), footer, and PreviewSwitcher for all variant-a pages. `variant-a/home.tsx` wraps VariantA with a `makePreviewLh` helper that maps production hrefs (`/contact`, `/spacenet`, etc.) to in-variant preview URLs, eliminating escaped links; also avoids the duplicate PreviewSwitcher that would arise if `variant-home.tsx` were used inside the layout. Five inner pages (about, services, spacenet, height-cleaning, contact) in Airy Organic style, all sourced from shared content modules. Spacenet and Contact pages carry own `action` functions (locale parsed from preview URL, `preview: true` wires S4 subject tagging); forms post to the preview route URL so `actionData` is displayed inline and the user stays in-variant.

**Test/build results:** 23 unit tests pass (4 files: theme, buildPreviewRoutes, getPreviewMeta, email.subject). `pnpm typecheck`, `pnpm lint`, `pnpm build` (3.90 s) all clean. Build with token: 12 variant-a route paths confirmed in server bundle, noindex present, token absent from canonical/og:url.

**Deferred/surprising:** `variant-home.tsx` (still used for B–E home pages) retains the all-variant Google Fonts link and its own PreviewSwitcher — both appropriate since B–E have no dedicated layouts yet. `home.tsx` inside the variant-a layout loads only Albert Sans (via the layout), keeping font scope correct. No remaining S5 items; S6–S9 follow the same pattern (each variant needs its own layout + inner pages).

---

## 2026-06-05 — Issue #6: S4 preview-tagged Inquiry subjects

**Built:** Pure `buildContactSubject(name, preview)` / `buildSpacenetSubject(name, preview)` functions in `app/utils/email.subject.ts`. Both Contact and Spacenet Inquiry schemas updated to accept an optional `preview` field (validated as `z.literal('true').optional()` — rejects arbitrary values). `sendContactEmail` / `sendSpacenetEmail` accept `preview?: boolean` and route through the subject builders. Actions in `contact.tsx` and `spacenet.tsx` extract and coerce the flag. Production forms carry no hidden field → subjects unchanged. Preview inner-page forms (S5–S9) will add `<input type="hidden" name="preview" value="true" />` to use this infrastructure.

**Test/build results:** 20 unit tests pass (4 files: theme, buildPreviewRoutes, getPreviewMeta, email.subject). `pnpm typecheck`, `pnpm lint`, `pnpm build` (3.45 s) all clean.

**Deferred/surprising:** Acceptance criterion "submissions from preview pages" cannot be exercised end-to-end until preview inner pages (S5–S9) add the hidden field. The subject builder is the testable seam; action wiring verified by typecheck + code review.

---

## 2026-06-05 — Issue #5: S3 retire homepage prototype, make new hero permanent

**Built:** Removed `HomePrototype` wrapper and `?variant=` query-param switching from `home.tsx` — production home route now renders directly without prototype indirection. Deleted `PrototypeSwitcher.tsx` (dev-only floating variant bar, not absorbed by preview tree). Stripped all PROTOTYPE annotation comments from `home.tsx` and `content/home.ts`. The hero image (rope access technician, `height-cleaning/banner.jpg`) is now permanent. `home-prototype/index.tsx` reduced to type-only exports (`HomeVariantData`, `HomeVariantProps`) still consumed by preview variant components and `variant-home.tsx`. `home-prototype/data.ts` shim and `VariantA-E.tsx` remain untouched — they serve the Design Preview tree.

**Test/build results:** 14 unit tests pass (3 files, unchanged). `pnpm typecheck` clean. `pnpm lint` clean. `pnpm build` succeeds in 3.49s. Dev server smoke still blocked by Netlify/Deno edge function setup (same systemic constraint as prior iterations).

**Deferred/surprising:** None. The `home-prototype/` folder still exists because `VariantA-E.tsx` are imported by `preview/variant-home.tsx`. The folder will be deleted when all Design Variants are fully migrated to the preview tree (S5–S9).

---

## 2026-06-05 — Issue #4: S2 token-gated Design Preview route tree

**Built:** `buildPreviewRoutes(token)` pure function (`app/routes/preview/config.ts`) maps a PREVIEW_TOKEN env var (read at build time) to a React Router 7 route tree: one layout route wrapping a launcher page + 5 variant home routes × 2 locales (11 child routes). No token → empty array → all `/p/*` paths 404. Production Header/Footer moved from `root.tsx` into a new `routes/production-layout.tsx` layout route; preview tree is bare. Launcher page at `/p/<token>/` lists the five Design Variants with links. Floating `PreviewSwitcher` on all variant home pages cycles a–e while preserving locale and links back to the launcher. `getPreviewMeta` utility returns `noindex, nofollow` with no canonical, hreflang, or og:url.

**Test/build results:** 14 unit tests pass (3 files: theme, buildPreviewRoutes, getPreviewMeta). `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean. Build with token: all 11 preview route paths confirmed in server bundle, no token in robots/canonical/og:url. Build without token: preview routes absent, server bundle ~80kB smaller. Dev server smoke blocked by Netlify/Deno ARM64 incompatibility (same as S1).

**Deferred/surprising:** The rolldown ARM64 blocker is resolved — `pnpm build` and `pnpm test` now work correctly in this sandbox (contrast with S1 notes). Dev server still blocked by Netlify's Deno edge functions setup. Variant home pages render without per-variant fonts loaded in production since Google Fonts link is client-side only; this is intentional. Inner-page links from variant components point to production routes (correct for this slice; preview inner pages come in S5–S9).

---

## 2026-06-05 — Issue #3: S1 shared site content module

**Built:** Extracted all localized (en+sl) page content from the six production routes into `app/content/{home,about,services,spacenet,height-cleaning,contact}.ts`. Each file holds the `data` bilingual object plus locale-independent image arrays (spacenet: `pageImages`; PHC: `serviceImages`/`howWeWorkImages`/`whyChooseImages`). Routes import from the shared module — no copy remains inline. `home-prototype/data.ts` folded into `~/content/home` and is now a thin re-export shim.

**Test/build results:** `tsc --noEmit` passes clean. `pnpm build`, `pnpm dev`, `pnpm test`, and `pnpm lint` all fail due to a **pre-existing sandbox environment issue** — missing `@rolldown/binding-linux-arm64-gnu` native binding (Vite 8 / rolldown). This is not a code regression; lint count went from 706 → 575. Smoke test blocked by the same issue.

**Deferred/surprising:** Cannot smoke routes in this sandbox. The rolldown ARM64 issue is a systemic blocker for all Vite-based operations. Future iterations will face the same constraint — TypeScript passing is the best available signal. Left issue #3 open (unverified: live smoke test).
