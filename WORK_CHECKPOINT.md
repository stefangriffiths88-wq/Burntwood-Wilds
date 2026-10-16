# ACTIVE — combined 10.13.0 update
Owner: Work implementation; branch feature/monster-town; draft PR71. User authorised all agreed work together on 16 October. Specification: UPDATE_SPEC.md. Live remains 10.12.0.

Implemented locally: native town footprint/layout/collision/routes/objectives; compact stats; interruption pause; cooldown fill; monster art/AI/warnings/props; three-track Mythic selection and effect hooks; first four boss charm rewards; final Mimi text; green healing orb and elemental charm additions.

Focused monster-town-test passes: ten hero evolution/defence activation, town solids, boss charms, five boss AI/renderers, Wisp healing. Syntax/build pass. Full integration and browser review NOT passed yet. Legacy assertions still expect boss perks, 30 charms and old defence outcomes; adapt intentionally without dropping unrelated contracts. Tom defence currently braces instead of native barge; inspect whether to retain useful native movement. Joseph capacity comparison fixed. Need dedicated ability icons, phone visual QA, route/collision checks, independent per-hero rendering depth, actual element effects/bounded procs tests, final Mimi portrait, final version/redirect, all release gates.

Browser unavailable locally so far; runtime Playwright exists but no installed Chromium found. Use CI browser or install supported browser. Baseline full CI38884068113 passed unchanged10.12.0; new candidate is not released. Preserve PR70 design/reference; do not overwrite independent audit docs. Commit source incrementally and verify remote checkpoint.

Next: finish icons/integration tests and visual review, then one full candidate gate. No final readiness claim until deployment is verified.
