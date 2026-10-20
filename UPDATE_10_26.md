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

## Validation correction checkpoint
- CI39449990189 exposed stale Evie health expectation (92 → 100 after authorised workshop +10), corrected. New browser saved-portrait setup now disables the compatibility fixture flag so it uses real checkpoint storage. Screenshot review caught narrow vertical build explanations; moved them into full-width expandable rows. Perfect-defence phone staging now enters the actual physical Rugby route and centres the player correctly. No automated rendering is claimed as Safari/user acceptance.

## Final candidate review
- Source497763c4c5de781db3f0ab4e82df7f82eebd8437, generated head713f649dd975c961a8d9158a586cc9ae06c45ba4. CI39450821464 changed-review passed; full browser job reached final long charm matrix after all prior mechanics and phone steps passed.
- Reviewed all21 targeted screenshots in artifact12279046404: both heroes route/build/real defence taps at390×844,320×568,844×390, plus saved Jodie portrait at all three sizes. Portrait is large, landscape art visible, recovery/actions remain reachable through scrolling, build descriptions read across full panel width. Artifact also contains broader phone suite captures.
- Canonical/versioned local generated HTML SHA25666d133330dd20870e2066c8dd4ed79aff5f23bc24c5a7281ac3e73b8461bf5b7 (verify public bytes after deployment). Long charm result, merge and live Pages verification still pending.

## Ready for merge
Feature CI39450821464 passed both jobs at source497763c4c5de781db3f0ab4e82df7f82eebd8437/generated713f649dd975c961a8d9158a586cc9ae06c45ba4, including the full long charm matrix/journeys and all phone suites. Targeted21 screenshots reviewed; approved image/Bruce/RUN files unchanged. Next action: merge PR89, verify main checks and Pages/public bytes, record release in PROJECT_STATUS.md, deliver GitHub test link. Native Safari/human balance remain pending.

## Released GitHub playtest
PR89 merged a0ed7166bbd95b4f20b738c27dd6453929817dc5. Main CI39452221209 passed both jobs; Pages39452221676 passed. All28 public files match tested bytes (tests/public-10.26.json). Play https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.26.0.html?v=10260 . Ready for Stef’s native iPhone playtest. RUN remains on10.25; the future unlock plan above remains required before its next release.
