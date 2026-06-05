# Ralph progress — Ropecess Design Preview

One dated entry per completed iteration: issue number, what was built, test/build
results, anything deferred or surprising for the next iteration. Newest at the top.

PRD: #2. Slices: #3–#11 (`ready-for-agent`), #12 is HITL (`ready-for-human` — not ours).

---

## 2026-06-05 — Issue #3: S1 shared site content module

**Built:** Extracted all localized (en+sl) page content from the six production routes into `app/content/{home,about,services,spacenet,height-cleaning,contact}.ts`. Each file holds the `data` bilingual object plus locale-independent image arrays (spacenet: `pageImages`; PHC: `serviceImages`/`howWeWorkImages`/`whyChooseImages`). Routes import from the shared module — no copy remains inline. `home-prototype/data.ts` folded into `~/content/home` and is now a thin re-export shim.

**Test/build results:** `tsc --noEmit` passes clean. `pnpm build`, `pnpm dev`, `pnpm test`, and `pnpm lint` all fail due to a **pre-existing sandbox environment issue** — missing `@rolldown/binding-linux-arm64-gnu` native binding (Vite 8 / rolldown). This is not a code regression; lint count went from 706 → 575. Smoke test blocked by the same issue.

**Deferred/surprising:** Cannot smoke routes in this sandbox. The rolldown ARM64 issue is a systemic blocker for all Vite-based operations. Future iterations will face the same constraint — TypeScript passing is the best available signal. Left issue #3 open (unverified: live smoke test).
