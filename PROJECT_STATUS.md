# Burntwood Wilds — project status

## 10.11.1 candidate — level-up glow and gold reward reveal
16 October 2026. User reported upgrades still felt fast/unrewarding and the popup annoying, then specifically requested a character glow followed fractions later by an impressive gold frame building around the choice screen. Implemented a 550ms anticipation using the existing safe upgrade pause, animated SVG gold frame and staggered cards, immediate reduced-motion alternative, synchronous cancellation and 0.35s resume grace. No new confirmation. Core reward frequency/strength remains the 10.11.0 system. Spec: journey-v10/BUILDS.md.

Local all-ten natural-XP/pause/cancellation tests and reward contracts passed; full release CI/mobile review/deployment pending. Character modules, portraits, progression saves and historical releases preserved. User emotional/visual acceptance remains pending; do not equate automated checks with fun.


## Current release: 10.11.0 — meaningful rewards and staged challenge
Updated 16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- User requested rewards that feel dramatic/exciting, then authorized whole-game reward/balance work. PR #65 merged at e847739b6103e0654bdcdfcc0338f04da2a73391; exact tested source 28714ecdfab6f610251ac5858cf90ffc9d23888f, tree 8fb50a001e39881b8989f2836708eac09c467f69. Specification/numbers/rationale: journey-v10/BUILDS.md, 10.11.0 section.
- Stronger capped stat gains (Common Power 3% → 10%, Rare 7% → 22%), two distinct ability choices when two paths remain, Rare+ stat milestones on picks 3/6 (Epic+ in areas 4/5). Explicit ability-step/final-upgrade labels separate investment from rolled rarity. Weapon upgrades begin on the next attack within .12s.
- Heroic spoils guarantee one Rare+ charm, Epic+ in areas 4/5, with equip/bag/fusion consequences labelled. Boss/heroic gold 35/20; ordinary gold drop chance 18%. Prices 30/55/95/150/220; distinct fresh stock includes an affordable charm when gold is at least 30. Reopening never refreshes stock. Scavenging grants 5/8/12/18/25 immediate gold as well as pickup range.
- Enemy HP/damage follows arena order, not selected levels. Existing enemies are not buffed by picking a reward; spawn pressure follows elapsed milestones. HP multipliers 1/1.4/1.9/2.45/3.1; damage 1/1.22/1.44/1.67/1.9. Fire/lightning/bleed perks scale once with Power. Existing timing, CC/proc/healing/cooldown caps remain.
- Zero-effect stats are filtered for critical suppression, insufficient crit investment, Last Light healing lockout and effective charm caps. Partial gains are clamped to remaining cap and shown. Reward banners/chimes and card progress hints are isolated in upgrades/feedback.js, with reduced-motion CSS and no extra confirmation.
- Ten character modules, their moves/upgrade definitions, 10.10.1 heights, all approved portraits, saved progression and permanent prices are byte-unchanged. Historical 10.10.1 and 10.10.0 HTML are preserved. No new hero/portrait/town geography work.
- Final feature CI 38832291748 passed: gameplay, Joseph/Tom/Havannah, builds, new reward contracts, town/save, encounters, all six browser suites and charm matrix/journeys. Final artifact 12017561944; all seven new reward captures reviewed at 390x844/650, including milestone, selected reward, mastery, heroic and shop views. Visuals suite retains all-ten idle/attack/town/short captures.
- New seeded 30-build/900-choice audit covers all ten heroes, real Common Power selection damage, no enemy drift, caps/partial gains, rarity, affordability, no free shop refresh, exact payouts and perk scaling. Artifact result exactly matches local seeded JSON. Existing charm suite includes 210 original-seven hero/charm actions and 21 five-area journeys / 105 arenas across those seven heroes and three builds. Newer heroes retain their focused thirty-charm and five-arena actual combat suites; do not claim the same 21-journey matrix covers all ten.
- Earlier candidate CI 38830775830 completed combat journeys but failed a stale expected 32-gold assertion. Corrected to 55 while retaining duplicate-payment checks; succeeding candidate 38831555968 passed, followed by the final cap-aware source/run above. No known failing check remains at the released source.
- Production Pages 38832806337 succeeded at the game merge. Public canonical/versioned HTML, latest.html and preserved 10.10.1 returned HTTP 200 and exactly matched local files. Canonical/versioned game is 288141 bytes, SHA256 08ce4ad20e65b01f24507acdbc90107458f58421da6308db29750f6f9fcbb41c.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.11.0.html?v=10110 ; latest.html points here.
- Final follow-up, 16 October 2026: automatic main post-merge CI 38832806942 completed successfully. Documentation-head Pages 38833045982 also succeeded. All release automation is green; user fun/balance/native Safari acceptance remains pending. Documentation-only closeout does not change runtime files.
- User feedback/limits: implementation, automated contracts and protected combat are verified; fun, human survival balance and native Safari acceptance of 10.11.0 remain pending. The prior height/consistency playtest is also not silently marked accepted. Next: user tests reward impact, ability choices and five-area difficulty ramp. Do not begin unrelated features automatically.
- Deferred: CI write-safety/legacy importer, central build version/template, town geography, portrait thumbnails and cinematic. CI phone review now runs before the long charm matrix so layout failures are detected sooner, without removing checks. Earlier 10.10.1 main CI 38828036109 ultimately succeeded.

## Previous checkpoints — historical; current state above takes precedence

## Current release: 10.10.1 — measured character heights
Updated 16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- User clarified/authorized: Stefan 6ft3, Jodie/Zak 5ft10, Jackson 5ft1 (9 inches shorter), Evie 5ft2 (one inch taller than Jackson). Corrected four character drawing scales; Jodie stays baseline. Other six sprites retain established sizes/builds.
- PR #64 merged at 34432b28a93d67274e726b3e8cc11011d3d35edf; tested source 77a66cadb75141f43fb75fad89277f4780ac18b2.
- Feature CI 38827119252 passed all gameplay/character/progression/save/encounter/charm and five mobile-browser suites. Artifact 12016320109; reviewed changed heroes' idle/attack/town/short-screen captures, plus native all-ten lineup/town render. Browser measurements (opaque idle silhouette, excluding shadow): Stefan 61, Jodie/Zak 57, Jackson 49.667, Evie 50.333 world units. Raster tolerance 1.2% around requested height ratios.
- Fresh local gameplay, Joseph/Tom/Havannah, builds, town and encounter checks passed. Quick audit passed manifest completeness/uniqueness, deterministic build, JS syntax, diff whitespace, ten unique portrait assets and consistent version/redirect. Character diff is exactly four drawing scale calls; combat logic/stats/hitboxes/progression/arenas untouched. Approved portraits and historical 10.10.0 unchanged.
- Versioned game: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.10.1.html?v=10101 ; latest.html points here.
- Production Pages 38828035318 succeeded. Public versioned/canonical HTML matched the tested bytes; latest redirect and preserved 10.10.0 also matched. Versioned/canonical HTML: 281199 bytes, SHA256 105e237eff496130c846cd64c167f486e271ed72216930d178f70366ba5cc5ea.
- Main post-merge CI 38828036109 was still running at closeout; the full pre-merge run passed at the exact unchanged source. Check its final result before further development.
- User requested a quick audit and closeout. No new defects found in this scope. Known CI auto-commit/legacy importer debt remains deferred; no unsolicited refactor. Native Safari/user visual acceptance of 10.10.1 remains pending.
- Next action: user phone comparison of corrected heights and silhouettes; do not claim visual acceptance or start unrelated work automatically. Preserve small/slim Jackson, rounder Evie, athletic Zak, tall/slim Stefan and smaller children.

## Earlier checkpoints (historical; current state above takes precedence)

Updated 16 October 2026. Read DEVELOPMENT_GUIDE.md, this file and AGENTS.md before editing.

## Historical 10.10.0 feedback — corrected scaling implemented in 10.10.1; user acceptance pending
Updated from user feedback, 16 October 2026 at 00:52–00:53 Europe/London, after the 10.10.0 testing sign-off.

The user reports: “The sizes and character consistency still being an issue.” This supersedes the earlier positive visual/playtest interpretation. The automated checks and deployment passed, but they did not prove that the size relationships and visual consistency meet the user's expectations. Do not describe the character presentation as accepted, fixed or fully consistent.

**Next chat's immediate priority:** investigate the current 10.10.0 character presentation before new feature work. Compare all ten playable characters side by side at the same camera scale in combat and town, including idle/moving/attacking states and phone-size views. Check actual rendered silhouette/body/head/paw proportions, not just collision radius or canvas scale constants. Identify the specific mismatches and propose a coherent correction using the approved identities and latest user direction. This message authorizes recording/investigation, not a speculative redesign or global gameplay rebalance.

Preserve the established targets: Jodie adult baseline; Jackson (11) small/slim; Ava (7) smaller; Stefan tallest/slim; Zak Jodie's height and athletic; Joseph larger than Ava; Evie slightly larger/rounder than Jackson; Tom stocky, Havannah young-child size and Mimi medium. Preserve detached floating paws/no conventional limbs and separate approved selection portraits. Do not revert or regenerate approved identities merely to equalise bounding boxes.

No new screenshot, named offending character or exact measurement was supplied with this report; do not invent a root cause. Current source is main, and visuals/README.md, character renderers, world/residents.js and visuals/cat-art.js describe the implemented 10.10.0 system. Keep all combat stats, hitboxes, attack reach/timing, upgrades and arena balance unchanged unless an actual related defect is established. Maintain the hold on unrelated development until this visual issue is resolved and user-tested. The 10.10.0 release remains live; this issue was documented without changing game code.

## Current verified release: 10.10.0 — coherent playable character proportions
- Release PR #60; merge ab86242be799422fa2f4a4a50ef5004780d0bc92 (reviewed 16 October 2026, Europe/London). Havannah, Joseph and Tom are already complete and playable; do not resume their old candidate branches or rebuild them.
- Open in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.10.0.html?v=10100
- Stable current entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Ten heroes, five arenas and thirty charms. Latest change is presentation only: Jodie adult baseline; Jackson small/slim (11), Ava smaller (7), Stefan tallest/slim, Zak Jodie's height and athletic, Joseph larger than Ava, Evie slightly larger/rounder than Jackson. Tom stays stocky, Havannah child-sized, Mimi medium. All have detached paws and no conventional limbs. Town and combat use character-owned sizing without old town correction multipliers.
- New visuals/cat-art.js contains shared drawing primitives; each character owns its identity, proportions and animation. Reference: journey-v10/visuals/README.md. Approved portraits and historical game files are preserved.

### Cross-check evidence — 16 October 2026
- Exact source: ab86242be799422fa2f4a4a50ef5004780d0bc92. Main CI 38822801386 and Pages 38822802195 (including deploy) succeeded. Main artifact 12014355172 contains 124 files, including forty ten-character idle/attack/town/short-screen captures. All forty sprite captures and the short Havannah selector were visually reviewed; native Safari/user visual acceptance is still pending.
- Rebuilt from manifest with build.py; game.js, canonical HTML and versioned 10.10.0 HTML reproduced exactly. JS syntax passed.
- Fresh local runs passed test.cjs, joseph-test.cjs, tom-test.cjs, havannah-test.cjs, builds-test.cjs, town-test.cjs and encounters-test.cjs. They cover existing combat/progression, all fifteen upgrades per new hero, dodge/CC/proc limits, save/import/storage failure, all five arenas, first charms, dialogue and retained journeys.
- The existing full CI also passed charms-test.cjs and all five browser suites (base, Joseph, Tom, Havannah, visuals). Charm artifact records 21 five-area journeys / 105 arenas across the original seven heroes and three builds; those heroes cover 210 single-charm combinations. Joseph/Tom/Havannah each add thirty single-charm checks and actual five-arena heroic/final combat. Havannah additionally has a retained five-area/30-choice journey. These counts do not mean all ten completed the same three-build journey matrix.
- Cross-compared 10.9.0 source at 85d0135f0cb5f106d1da2d1f32482133ae81f611: only eleven drawing-function bodies changed, six drawing helpers were added; all other top-level function declarations are unchanged. CHARACTERS, PROFILES, SPECIALS, DODGES and STAT_NAMES are identical. Portrait tree diff is empty. Mobile tests confirm collision radius remains 14 for all ten.
- Public versioned and canonical game: 281183 bytes, SHA256 571e9242992775344a9649344da6041073572c5428da580ccad848b580a8524f, exactly matching this tested source. latest.html destination is 10.10.0. All ten public portraits match repository bytes. Public 10.9.0 and 10.8.0 files also match their preserved historical bytes.
- No failing automated checks found. Human survival balance, sustained native iPhone performance and final visual acceptance are not established by protected scripted runs or Chromium automation. Town road geography remains illustrative. CI still runs the legacy importer and can push generated files; isolate that maintenance change from gameplay updates.

### Testing gate — 16 October 2026
- User feedback: “all seems good on testing.” Record as a positive playtest report, not proof that every device/character/build combination has been manually tested. Browser/device was not specified.
- Final check: main remains 435818fa85ef089de6a3414ba8e66d05322108d2 before this documentation update; no gameplay changes since the fully passing source ab86242be799422fa2f4a4a50ef5004780d0bc92. Main regression 38822801386 passed; latest documentation-head Pages 38825661684 succeeded. Repeat public checks verified canonical/versioned HTML, latest entry and all ten portraits match the tested files.
- Earlier testing result (superseded for visual acceptance): automated checks were green and initial playtest feedback was positive. The later size/consistency report above reopens the visual testing gate. Do not silently retune unrelated systems.
- No new gameplay build has been started. Further development must wait for a clear testing result and an agreed next update; each future build must pass its own gate.

### Current workflow checkpoint
- This review changes documentation only; no game version bump or gameplay/art change. It corrects this status file previously stopping at 10.9.0 despite a verified 10.10.0 release.
- Current authoritative source is main, not the stale original scratch checkout. A separate clean worktree was used so prior uncommitted 10.9.0 files could not overwrite the 10.10.0 artwork.
- Next: user Safari comparison of all ten sprites in town/combat, attack readability and size relationships; diagnose specific feedback locally. Thumbnail selector, opening cinematic, escape tokens and accurate road redesign remain separate/unstarted work. Dedicated CI write-safety/template/version-registration cleanup follows user priorities, not an automatic rewrite.
- Earlier sections below preserve release-time evidence. Their old latest.html destinations or playtest status describe those releases; this top section is the current truth.

## Released: 10.9.0 — Havannah
- PR #58 merged on 15 October 2026 at commit c25057951722d9d99f4224ca35673b466e502d31.
- Versioned game: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.9.0.html?v=1090
- Havannah: approved portrait and sprite, Sass Sparks, FULL TANTRUM, Can't Catch Me, fifteen upgrades and town dialogue. See journey-v10/characters/HAVANNAH.md.
- Feature CI 38806305369 and main CI 38807351836 passed; Pages deployment 38807351309 succeeded. User reported that the game works well. Human balance remains subject to further playtesting.
- Preserve prior releases. No known automated failures. Future fixes must target affected modules. Portrait thumbnails remain separate and unstarted.

## Released: 10.8.0 — Tom and Joseph playable
- Tom PR #56; merge 745d0030727494618542f878cced4e0d73f235ec. Joseph PR #55 was released/tested first (10.7.0); see below. Nine playable heroes, five arenas; no existing character module was changed by Tom's build.
- Safari URL: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.8.0.html?v=1080
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Tom: approved Option 3 tactical selection portrait, compact native Canvas tabby with two detached floating paws and no arms/legs/feet. Heavy Hands, Earthquake, Shoulder Barge, fifteen cumulative upgrades and exact general town dialogue. Shared stats/growth, charm equipment, workshop and save validation integrated. Full numeric/animation spec: journey-v10/characters/TOM.md.
- Third/fifth overlap produces one primary uppercut; collision hits do not recurse. Each expanding wave hits an enemy once. Legendary Earthquake has three total waves. Swept barge contact, bounded protection/recharge, one consumed Rebound and boss launch/knockback resistance are tested. Waves/launches have hard bounds and reset between arenas/characters.
- Existing name buttons wrap to two rows for usable phone targets; QUAKE is the compact action label, with full Earthquake name retained in profile/upgrades. No portrait-thumbnail redesign.
- Targeted Joseph and Tom tests cover all fifteen real upgrade choices each, thirty charm combinations each, exact proc/damage/CC/dodge rules, save ranks, dialogue, and actual heroic/first-charm plus final-boss combat in each of five arenas. Existing seven-hero charm matrix and five-area journeys retained. All existing character modules are byte-unchanged relative to 10.7.0.
- Final branch CI 38797152578 passed at 71dc9bded713b3367d3e4b6f27ce67064979d735 (initial 38795063657 also passed). Build, gameplay, both new characters, builds/stats, town/save, encounters, charm journeys and three browser suites passed. Final branch artifact 12002587680; inspected 390×844/650 selection, idle/punch/uppercut, airborne enemy, three-wave Earthquake, barge, town/dialogue and visible defeat sprite. Production Pages 38798210303 build/deploy succeeded; public game/portraits verified byte-for-byte. Main CI 38798211807 passed all checks.
- Public versioned/canonical HTML: 276071 bytes, SHA256 a69cf0b68207613e40f352845f0e92717084bd109793f859837fd244b2978284, exact match to the tested local build. latest.html points to 10.8.0; all nine public portraits exactly match local approved bytes. Approved Tom WebP: 512×526, 90572 bytes, SHA256 97318f8b22c8ea2c84495f66a2083f15144e191c698e7abc777a0d3346460ee5; Git blob 7c0b33087a383b05b4b3ac2b8fdd97d49ed838ba. Both original reference sheets are preserved as hash-verified binary assets; exact source crop/checksum in catalog. No upscale or regenerated portrait.
- User playtest/native Safari and human balance acceptance pending. Scripted protected positioning verifies integration, not survival balance. No known failing automated checks. Existing road geography, cinematic and escape-token plans remain deferred.

### Tom changed files (exact implementation/release set)
- .github/workflows/journey-v10.yml
- PROJECT_STATUS.md
- burntwood-journey-v10.8.0.html
- burntwood-journey-v10.html
- journey-v10/README.md
- journey-v10/assets/ART_DIRECTION.md
- journey-v10/assets/catalog.json
- journey-v10/assets/portraits/tom.webp
- journey-v10/assets/references/tom-approved-gameplay-reference.jpeg
- journey-v10/assets/references/tom-approved-portrait-options.jpeg
- journey-v10/browser.cjs
- journey-v10/build.py
- journey-v10/characters/TOM.md
- journey-v10/characters/tom.js
- journey-v10/controls.js
- journey-v10/engine/core.js
- journey-v10/game.js
- journey-v10/manifest.json
- journey-v10/menu.css
- journey-v10/registry.js
- journey-v10/state.js
- journey-v10/test.cjs
- journey-v10/tom-browser.cjs
- journey-v10/tom-test.cjs
- journey-v10/ui/menu.js
- journey-v10/upgrades/build-stats.js
- journey-v10/upgrades/permanent.js
- journey-v10/upgrades/progression.js
- journey-v10/world/conversations.js
- journey-v10/world/hub.js
- journey-v10/world/residents.js
- latest.html

## Released: 10.7.0 — Joseph
- PR #55; merge 4ce8336c88dea155a8eb72c69c16ab056e5a34fe.
- Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.7.0.html?v=1070
- Approved Rugby Club portrait and Option 2 Hooded Training native Canvas sprite. Rocket Fists, path-based OVERHYPE!, Turbo Dash and fifteen upgrades; exact general/Jodie dialogue, save/workshop/growth/charms/five-arena integration.
- Branch CI 38792926077 passed gameplay, focused Joseph, build/stat, town/save, encounter, charm/journeys and mobile-browser checks. Phone screenshots inspected (895×842 portrait and 390×844/650 layouts). Main CI 38793723366 passed; production Pages 38793721686 build/deploy succeeded.
- Public 264200-byte HTML exactly matches local; SHA256 342d0e77756a61bab4718e5acb7831bde880c28e07faea8339c8bf54c29de5f5. Public portrait exactly matches committed 203722 bytes; SHA256 fea4c2ffda6b350212125e7f8ac6e015217e46505cf1e6c40257c9c5779ec9d4.
- User playtest/native Safari and human balance acceptance pending. Scripted invulnerable combat verifies integration only. Character specification: journey-v10/characters/JOSEPH.md.
- Tom completed in 10.8.0 above. Portrait thumbnails remain a separate task requiring approval.

## Released: 10.6.0 — five-area builds and Chase Terrace Park
- Release PR #53; merge 00e05ccfa26919118a1ffff74cf22d15f23adf19.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.6.0.html?v=1060
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- A run requires all five distinct areas in any order. Six upgrade choices per area (30 total), heroic at 45s and final boss at 90s, plus boss fighting time. Each chosen level grants modest character-specific growth.
- Chase Terrace Park: Scrapper, Hedge Pouncer, Bin Bandit, Bench Bruiser, Spitter, heroic Patch and final Umbrella Man. Warned sweep/rush, stuck recovery, frontal umbrella guard and interruptible rubbish healing. Each completed heal is up to 5% max HP; total capped at 15%, even with replenished piles.
- Twelve stat tracks, Common–Legendary stat-roll magnitudes and coloured ability investment cards. Later areas improve rarity odds; fourth/fifth heroic offers guarantee an Epic-or-better choice. Five Legendary selections per stat or its lower cap; no upgrade beyond Legendary ability rank.
- Thirty charms: 8 Common / 8 Uncommon / 7 Rare / 5 Epic / 2 Legendary. Rarity is separate from fusion rank I–III. Three equipment slots; exact effects and conflicts in paused BUILD / BAG. Town-only equipment/fusion; stronger bag fusion retains the replaced weaker copy.
- New build mechanics include crit guarantee/damage, armour, lifesteal, stationary damage, special cooldown tradeoffs, shadow clone and once-per-arena lethal rescue. Lucky Paws and normal criticals share one multiplier and reset Patient Fang correctly; Blunt Promise suppresses criticals.
- Zero starting gold except an equipped Loaded Purse starter gives 100 once. Modest gold drops and direct heroic/final gold rewards. Mimi sells three single-purchase charm offers, refreshing after victories; essence rerolls cost 2/4/6… across the whole run.
- Stefan offers global permanent starter unlocks at 6/12/24/40/60 essence by rarity. Select one for future fresh runs, no repeat entrance charge. Existing modest per-character permanent upgrades and two-essence final-boss rewards are retained.
- Existing seven heroes, approved portraits, combat sprites, town conversations, shopkeeper swap, hub scales, wounded bosses and Jackson’s boss-damage/no-knockback behaviour are retained. Park has its own town/minimap boss marker and wounded preview.
- Ownership and exact numbers: journey-v10/BUILDS.md, CHARMS.md and TOWN.md. New modules: upgrades/build-stats.js, items/charm-catalog.js, items/economy.js and arenas/park.js.

## Verified release evidence — 10.6.0
- Final branch CI 38788156173 at eee9f9a0d57d0d5c75102448926b9117907ed8f5: passed build, gameplay, focused build mechanics, town/save, encounter, charm matrix/journeys and mobile checks.
- Main CI 38789350842 and production Pages 38789351184 succeeded.
- All seven publicly served portraits returned HTTP 200 and exactly matched their approved committed bytes.
- Public versioned HTML matches the tested local build byte-for-byte (SHA256 b348ef3df33e39abe06d06187ecd68d1ebeb0f1b831aea2e7d3ba3d306b793a6). BUILD_ID 10.6.0 and latest.html destination verified.
- Tests cover rarity boundaries/caps, seven growth profiles, crit conflicts, actual shrine/build damage calculation, proc bounds, finite healing, starter transactions, zero-gold/Purse rules, rising confirmed rerolls, inventory pause and v1 migration. Gameplay/save regression and Jackson charge/finisher isolation remain green.
- 35 fresh hero/arena first-charm acquisitions; 210 hero/charm combat combinations; 21 full actual-attack five-area journeys (105 arenas) using control/stationary, critical and cooldown/shadow/lifesteal builds. An earlier branch also passed 21 baseline-build journeys (105 arenas).
- Mobile tests cover all seven heroes, actual touch choices, five-area completion, purchases, starter unlock, reroll confirmation, real save reload, inventory pause, simultaneous movement/dodge, no zoom, all five wounded bosses, Park phases and 390×650 rarity cards.
- Release owner inspected 390×844 and 390×650 screenshots. Fixed shop rarity/price overlap, HUD covering upgrade panels, decimal formatting and Park label collision. Final Park healing screenshot uses a valid channel timer.

## Saving and limits
- Current key burntwood-wilds-progress-v2, schema 2; v1 browser saves and backups migrate without losing essence or hero ranks. The old key is not deleted. Starter IDs/selection are validated.
- Browser-local storage; no automatic device/cloud sync. Use workshop JSON backup/restore with explicit replacement confirmation. Purchases debit only after successful storage write. Corrupt originals are preserved; failed boss saving retains an in-memory reward with BACKUP NEEDED.
- Active run state is not restored on reload. New runs clear charms, gold and reroll escalation; permanent ranks, essence and starter unlocks survive.
- Scripted journeys use positioning/invulnerability and do not establish human survival balance. Mobile Chromium is not native Safari. User acceptance of 10.6.0 is pending.
- Town road geography remains illustrative, pending an agreed map reference. Opening spell cinematic, escape tokens and broader town overhaul are deferred. No additional hero or portrait is silently integrated.

## Exact next priorities
1. User Safari playtest: Tom punch weight/launches/barge, Joseph speed/ricochets/two dash charges and both approved sprites; then five-area pacing, charm/upgrade satisfaction, gold scarcity, shop reroll price, starter choice, inventory readability and Umbrella Man’s warnings/heal interruption. Diagnose specific feedback before changing shared balance.
2. Agree a map reference before changing Burntwood’s road layout.
3. Dedicated maintenance update from the completed audit: CI write-safety first, then an owned build template/central version metadata, registration checks and measured modular extraction. Current CI still runs the legacy importer and auto-commits generated files; do not mix the refactor with another feature release.
4. Future heroes require the complete approved portrait/sprite/moves/upgrades/stats gate in AGENTS.md. Preserve approved Zak Street and Mimi Little Headband/woodland assets.

## Previous release
10.5.0 living town/permanent ranks: PR #51 merge 233715d0070fae0a5679a2e12bcdf8bb81ee4917, branch CI 38756844724, main CI 38757339516, Pages 38757340088; all succeeded. 10.4.1 retained the final-first/heroic-second reward fix and Jackson’s boss knockback correction. Historical versioned links remain intact.
