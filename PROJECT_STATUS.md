# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md and this file before edits.

## Released: 10.3.0 — Run charms
- Release merge: `0d011a1cd1b048f71203935a6a4099d5d9b84af8`, PR #44.
- Prior live release: **10.2.0**, Mimi, merge 710432d2863fbb47330060fc2203653ba3904ba8, PR #42. User now reports Mimi “Works perfect”.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.3.0.html?v=1030
- Maintained burntwood-journey-v10.html remains compatible. latest.html points to 10.3.0, verified publicly.
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
- Branch CI run 38729350423 passed: standard regression, extended charm matrix and mobile tests. Inspected charm-reward.png, charm-fusion.png and heroic-quarry.png at 390×844; UI fits, fusion values visible, heroic telegraph readable. Main run 38729722446 passed the same expanded gameplay/mobile checks; Pages run 38729722013 succeeded. Public versioned HTML byte-for-byte matches the verified build.

## Limits and next actions
- Full simulations use scripted positioning and invulnerability, not human skill or survival balance.
- Mobile Chromium is not native iPhone Safari. User playtest pending for charm pacing, heroic threat, fusion usability and combination feel.
- Rank III is supported but needs four base copies; current three-reward route normally permits rank II. No extra acquisition source has been added without discussion.
- Next: user playtest heroic threat at 1:00, charm choice usefulness, three-slot HUD, Mabel fusion and final boss timing at 2:00. Fix specific feedback; do not introduce permanent progression.
- No permanent-progression work is authorized in this update.

## Release files
New modules: items/charms.js and arenas/heroic.js. Shared integration: core damage/attack hooks, progression timing/cooldowns, arena slow handling, reward UI/HUD, shop workshop and browser tests. CI adds charms-test.cjs; versioned page and latest link updated. Approved character modules and portrait bytes remain unchanged.

## Next release: 10.4.0 — living town and boss entrances
Implementation authorized: unselected characters populate the hub; Mimi shopkeeper or Jodie when playing Mimi, exact approved greetings above inventory; actual boss sprites replace gates and support direct map taps. Existing nearby actions retained. Details and deferred story/essence/token design are in journey-v10/TOWN.md.

Local build/syntax, expanded seven-hero roster/shop/entrance tests and existing gameplay regression passed. Final branch CI 38745357119 passed including seven-hero hub/roster tests, actual mobile shop/boss taps, standard gameplay, charm matrix and 21 full journey configurations. Inspected both keeper dialogues, residents and boss entrances at 390×844. Shop scroll reset corrected and verified. Production verification follows merge. No opening scene, permanent progression or building overhaul implemented. Next user playtest priorities: residents look familiar, correct shopkeeper/greeting, and boss taps enter the correct arenas.
