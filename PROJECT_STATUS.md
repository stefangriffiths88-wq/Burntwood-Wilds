# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md and this file before edits.

## Release in verification: 10.3.0 — Run charms
- Prior live release: **10.2.0**, Mimi, merge 710432d2863fbb47330060fc2203653ba3904ba8, PR #42. User now reports Mimi “Works perfect”.
- New versioned page: burntwood-journey-v10.3.0.html?v=1030; maintained burntwood-journey-v10.html remains compatible. latest.html points to the new release.
- Twelve run-only charms, three equipment slots, duplicate/spare bag, reward choices and same-copy fusion at Mabel.
- Heroic wildlife at 1:00 per arena; final boss at 2:00. Eight timed upgrades finish at 1:48.
- No permanent progression. Charms carry between arenas, reset on a new run.
- Full specification and numeric limits: journey-v10/CHARMS.md.

## Preserved decisions
- All seven heroes and their approved artwork remain. Portraits and playable sprites are separate. Mimi uses approved Little Headband sprite and exact woodland portrait; Zak Street sprite unchanged.
- Individual attacks, character upgrades and arena identities stay independently configurable.
- Charm mechanics own their own module; shared hooks integrate only the required effects. No global enemy nerf to favour one hero.
- Fusion consumes two identical same-rank copies into one higher rank; no duplicate equipped effects. Current three-arena route permits a meaningful choice between filling slots and rank-II fusion.

## Verification completed locally
- Build, syntax and existing seven-hero regression pass with new 120-second boss timing.
- All twelve effects tested: exact damage/cooldowns, nonstacking slows, no recursive procs, shield, healing, echo, knockback, caps.
- Heroic timing/rewards in all four arenas, paused reward UI, duplicate click prevention, fusion, bag/replacement, carry-over and new-run reset pass.
- 84 hero/charm combinations tested through actual normal/special/dodge actions.
- 21 full journeys / 63 arenas: seven heroes × three builds × rugby/Chasewater/quarry, actual attack kills, real upgrade/reward flow. Every journey completed.
- Three tested builds: storm/frost/ember, hunter/watch/moon, bell/locket/thorn. Scripted totals are in journey-v10/charm-test-results.json; no human balance ranking claimed.
- Browser tests and production checks must pass before merge/release declaration.

## Limits and next actions
- Full simulations use scripted positioning and invulnerability, not human skill or survival balance.
- Mobile Chromium is not native iPhone Safari. User playtest pending for charm pacing, heroic threat, fusion usability and combination feel.
- Rank III is supported but needs four base copies; current three-reward route normally permits rank II. No extra acquisition source has been added without discussion.
- Next: finish mobile screenshot review and CI, merge, verify Pages and public version, record exact release evidence. Then obtain user playtest feedback and fix reported systems specifically.
- No permanent-progression work is authorized in this update.
