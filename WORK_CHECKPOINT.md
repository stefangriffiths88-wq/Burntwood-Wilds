# ACTIVE — combined 10.13.0 update
Owner: Work implementation; branch feature/monster-town; draft PR71. User authorised all agreed work together on 16 October. Specification: UPDATE_SPEC.md. Live remains 10.12.0.

Implemented locally: native town footprint/layout/collision/routes/objectives; compact stats; interruption pause; cooldown fill; monster art/AI/warnings/props; three-track Mythic selection and effect hooks; first four boss charm rewards; final Mimi text; green healing orb and elemental charm additions.

Focused monster-town-test passes: ten hero evolution/defence activation, town solids, boss charms, five boss AI/renderers, Wisp healing. Syntax/build pass. Full integration and browser review NOT passed yet. Legacy assertions still expect boss perks, 30 charms and old defence outcomes; adapt intentionally without dropping unrelated contracts. Tom defence currently braces instead of native barge; inspect whether to retain useful native movement. Joseph capacity comparison fixed. Need dedicated ability icons, phone visual QA, route/collision checks, independent per-hero rendering depth, actual element effects/bounded procs tests, final Mimi portrait, final version/redirect, all release gates.

Browser unavailable locally so far; runtime Playwright exists but no installed Chromium found. Use CI browser or install supported browser. Baseline full CI38884068113 passed unchanged10.12.0; new candidate is not released. Preserve PR70 design/reference; do not overwrite independent audit docs. Commit source incrementally and verify remote checkpoint.

Next: finish icons/integration tests and visual review, then one full candidate gate. No final readiness claim until deployment is verified.

## Integration checkpoint — 16 October, continued afternoon
- First phone job38913223735 changed-review passed; artifact12051575859 reviewed. Found and locally fixed action fill escaping circle (position relative), tall stat details padding, boss label background, isolated actor depth and Mythic fixture extra buttons. Richer pitched roofs/gardens/lamps, dedicated ability icons and final Mimi portrait added. Needs refreshed captures.
- Local main gameplay/town/Joseph/Tom/Havannah/builds/reward/level reveal/reward-world checks passed after intentional assertions updated. New monster-town test additionally covers90 Mythic choices, exact elements/two lightning targets/nonrecursion, Leech/Wisp lockouts, gold guard and geography.
- Encounter test exposed boss custom handler skipping Jackson charge contact; fixed in monster-bosses.js and exact charge assertions now pass. Simultaneous heroic/boss tests must consume BOTH chests; final fifth gives no chest. Charms count now38, seven-hero actions266; the21 retained journeys still need completion.
- Browser available in CI only; local Playwright Chromium download was truncated. Use changed-review job/screens rather than repeat local installation. Never claim native iPhone acceptance.
- First source checkpoint branch initially based on old tree accidentally reverted3 release docs; corrected next commit using fresh main base. Main docs preserved. No release yet.
