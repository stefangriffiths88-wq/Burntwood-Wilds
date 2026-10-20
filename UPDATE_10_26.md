# 10.26.0 — authorised GitHub-only playtest, 20 October 2026

Owner: this Work development session, feature/10.26-guidance-builds. Stef explicitly authorised “update for testing”.

## Scope
- One clear objective, destination-labelled overhead arrow, first Rugby rescue → car park guard/charm → well → Bruce → Sankeys/workshop guidance. Returning players retain concise guidance without recurring teaching pauses.
- Rugby forward, progress-based lane/car-park encounters; passed sections never respawn, survivors are retained, no time-based enemy deletion. Bounded forward groups lead towards the objective. Car park reinforcements cease at the well.
- Existing controls: readable committed deer/Bruce warnings, recovery openings, forgiving timed defence feedback and bounded benefit; readable damage/defence.
- Tom/Stefan character-specific defence cards and build information; stronger Bramble Ring, Cracked Bell, Echo Coin, Pocket Watch and Opportunist's Pin; visible proc cues, bounded rank improvements and relevant rewards. Preserve portraits and Bruce art.
- Keep all 12 characters unlocked for testing. GitHub Pages release/test link only. Do NOT change the RUN release request or deploy RUN.

## Next RUN release — explicit user requirement
Before the NEXT RUN update, replace testing-wide character access with earned unlocks: selected characters from boss defeats, a character from completing the game, and one character purchasable with essence. Exact character assignments/cost and existing-save migration must be agreed before RUN publication; do not silently invent them. Keep these locks OFF in this GitHub test update. Preserve starting choices Ava, Jackson and Mimi unless Stef changes them.

## Current checkpoint
- Baseline remote main 4e010734fedaf9fb292a28f3bbf19e6ad0e5976c (10.25.0 / RUN 1.0.4).
- Read current repository instructions, status, architecture and affected source. Other open PRs 70/40/26 are older unrelated art/docs; no competing gameplay feature.
- Implementation checkpoint: progress waves with 12-enemy/12-per-section caps, monotonic passed-section cutoff, well cutoff and no artificial timer gates; labelled moving arrow/reward instructions; 350ms geometric perfect-defence window and 20% direct-hit recovery opening; character-specific Tom/Stefan defence descriptions; Bramble 30/40/50%, Bell 30/45/60 damage with rank-scaled radius, Echo 70/90/110% plus 35% at III, Watch perfect-defence refunds 1/1.5/2s, Opportunist 35/52.5/70%; rank details/synergy hints, relevant weighted rewards, visible charge/impact feedback.
- Focused progress-builds test passed; legacy core/Tom/monster/build/reward/first-journey/recovery suites passed. Old timer and charm expected values updated intentionally. Full charm journeys and CI phone/release checks in progress. Browser review includes native actual button taps; iPhone Safari remains separate.
- Source checkpoint 4066c5d00be856866de3a59b05dd836ff97478b6; PR89. No change to RUN request/credentials/vendor files.
- Native Safari, human comprehension, combat feel and balance require user testing; automated simulations cannot establish those.

## Additional authorised playtest feedback, 20 October
Stef reports Sankeys upgrades too weak and selected portrait too small (10.25 screenshot). Fix saved-journey portrait shrinking: restore at least 240px portrait in portrait mode, retain visible art in landscape with accessible scrolling. Permanent workshop per-rank benefits now +10 health / +8% normal-companion damage / +3% speed / −4% special cooldown / +10% healing. Five-rank caps and essence prices remain; saved ranks retained. Current before/after cards and next-fresh-journey rules remain. Native appearance/strength require user feedback.
