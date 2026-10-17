# Active release — 10.16.0 engagement flow

17 October2026. Explicit user update authorises the next small engagement-focused release. Scope: physical opt-in heroic/boss charm chests, same-screen equip/replace/bag selection, safe post-clear walkout and exit, simple town interaction instead of combat buttons, clearer non-overlapping road junctions and workshop frontage, filled individual charm illustrations/simple elemental wording. Cow Queen/story expansion and enemy damage tuning remain separate next pieces, as explained to user.

Branch feature/chests-town-flow. Current main base9bb7cf4a3bc3763f1a9de53c714157dabdcb2c2a (10.15.0), no competing feature PR.

Implementation complete; local50 actual production hero/arena flow checks, ten-hero Rugby route, existing town/effect and broad baseline mechanics passed. Browser/CI review pending. Production uses real chests and cleared-area movement. Legacy enterCombatArena / __test.reset bounded combat fixtures explicitly retain old automatic rewards so unchanged combat matrices remain usable; new reward-flow tests exercise real production behavior. Do not confuse legacy reward adapters with chest coverage.

Physical chests never auto-open. The player deliberately opens one, sees three choices, then chooses equipment slot or bag. Replaced charm stays in bag. Duplicate copies go to bag. Area completion awards essence once, stops threats, keeps controls for walking, and exposes an exit; leaving unclaimed loot is explicitly labelled. No extra abandonment/reward confirmation modal. Other hero/boss combat stats and permanent save schema unchanged. Fifth-stage ending still uses existing completion until the separate Cow Queen update.

NEXT: inspect actual phone layouts and run required CI, fix failures, merge, verify Pages/publicbytes and close release records.

Phone review artifact12116637055 passed real chest/equip/bag/exit interactions across portrait/short/landscape. Fixed cramped comparison labels, added exit idle guidance and a pocket garden; stopped combat animations at clear while retaining pickup movement. Elemental descriptions concise; Leech correctly says healing, since it does not add damage. Initial broad checks reached the charm matrix successfully. Feature concurrency now cancels superseded runs instead of queueing obsolete matrices; main remains uncancelled. Final source gate still required.

FINAL candidate fba18f667893f2bf630c8ffbbedade8b65d700c8, CI39075096905. Changed-review job117520547377 passed; final phone artifact12116991078 inspected (swap/short/landscape, full town, inside workshop, chests and exits). Existing broader checks are still running. No further runtime edits planned. Runtime390715bytes/SHA2566322b1c3f66596c1ada893b7dbc10da0ae2240773cf100fa4214aad20e51beb9/blobef95e8c6581bb3ce0d3d205b918c2f7e794be6b5.
