# 10.31 — Break the curse (testing candidate)

21 October 2026. Stef authorised the discussed map corruption/recovery, story objectives, enemy roles, boss anticipation and town consequences: “Ok do these but not on run until I’ve tested”. This session owns gameplay implementation. RUN publication is explicitly prohibited until his playtest/approval.

- Five area-owned stories: Rugby/Nell, Chasewater/Fern, Elder Lane Burntwood Park/Kit, Quarry/Ash, Sankeys streets/Bea. Fictional supporting residents use native cat art, not new playable heroes or replacement portraits.
- Two destructible curse knots per area. The first frees a stranded resident; reaching them rescues them. Optional objectives redirect guidance locally without replacing heroic/boss gates. Unrescued residents become safe when the area is cleared.
- Corrupted roots, motes and local scenery: flickering Rugby lamps, watching water, moving Park swings, cracked Quarry stone, ensnared shopping trolleys. Clear boss: controllable expanding restoration front, flowers, safe area and resting guardian. Bruce sheds orange netting and leaves after a short recovery. Existing active boss art retained.
- Early boss glimpses/clues and five-second quiet beats suppress new arrivals, never silently delete enemies/attacks. Boss dialogue identifies the guardians as victims of the Cow Queen. Existing heroic, recovery and boss topology/timing remains owned by its area.
- Warned, avoidable roots near surviving knots. Ordinary callers grant nearby ordinary enemies25% contact damage, removed immediately on caller death; stalkers flank, visibly commit to a lunge and recover. Heroics/bosses excluded. All hero stats, charms, signatures, currencies and essence prices retained.
- Rescued neighbours return to town; area entrances shed curse roots individually; town dialogue responds to the relevant victory. Optional validated journey rescue IDs preserve boundary-save semantics and old saves. Cleared reload restores the area without replaying rewards.

Implementation: world/curse-story.js owns state/data/AI; visuals/curse-art.js owns deterministic native art. Small explicit hooks in runtime, routes, guidance, victory, town, audio, save and enemy drawing. No generated-file editing, private reference uploads, replacement hero art or RUN request changes.

Delivery plan: keep source on feature/curse-restoration-10-31, run changed-system contracts/browser review and required CI, publish only the exact versioned10.31 Pages test file. Keep canonical/latest/10.30 and RUN1.0.6 unchanged until user acceptance. Production release status remains10.30.0. Do not merge this feature or upload RUN before user testing.

Acceptance: candidate not yet user-tested; automated movement/invulnerability proves integration, not fun/survival balance. Native Safari/audio/visual acceptance pending.

## Verified candidate
Final source/art a635a34e, generated QA head28dc51e. Full mechanics39639702818 passed (266 combinations;21 protected journeys/105 arenas); final focused39641104739 and exact-preview39641104809 passed. Retired obsolete rescue/boss captions, retained Joseph/Tom initial banter and Chasewater crossing directions; restored Rugby lamps remain warm/steady. Native drawings cannot consume combat RNG or mutate encounter state.93 final phone captures in12365650088; actual HTML/metadata byte-verified. Preview uses separate permanent/journey keys and only a read-only initial progress fallback. Native Safari/fun/survival acceptance remains pending.

Pages test file only: burntwood-preview-v10.31.0.html. Publication31cf9285e9017e4117f04222d995e710fb8fab7c leaves canonical/latest/10.30/RUN unchanged. See TEST_10_31.md and public verification record when complete. Source remains unmerged; no RUN publication authorised.
