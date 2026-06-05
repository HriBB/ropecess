# Ralph progress — Ropecess Design Preview

One dated entry per completed iteration: issue number, what was built, test/build
results, anything deferred or surprising for the next iteration. Newest at the top.

PRD: #2. Slices: #3–#11 (`ready-for-agent`), #12 is HITL (`ready-for-human` — not ours).

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
