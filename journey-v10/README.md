# Burntwood Wilds — maintained game architecture

Read `../DEVELOPMENT_GUIDE.md`, `../PROJECT_STATUS.md` and `../AGENTS.md` first. The status file is the source of truth for the current verified release (see PROJECT_STATUS.md for verified deployment). The maintained source is `journey-v10/`; `manifest.json` controls concatenation order. `game.js`, root `burntwood-journey-v10.html` and versioned HTML releases are generated outputs; do not edit them directly. `latest.html` is the stable public entry point.

## Source ownership
- `characters/{ava,jackson,stef,jodie,evie,zak,mimi,joseph,tom,havannah}.js`: ten individual heroes, moves, stats, gameplay Canvas drawings and upgrades.
- `arenas/{rugby,chasewater,sankeys,quarry,park}.js`: five arenas and their visuals/encounters; `arenas/heroic.js`: heroic encounters and reward scheduling.
- `items/{charm-catalog,charms,economy}.js`: 38 run-only charms, rarity, fusion, inventory, gold shops and starter unlocks. See `CHARMS.md`.
- `world/{hub,residents,conversations,workshop,shopkeeper,shrines,burntwood-details}.js`: town, resident display, shopkeeper and interactions. See `TOWN.md`.
- `upgrades/{build-stats,progression,rewards}.js`: shared run upgrades and boss rewards; `upgrades/permanent.js`: saved essence, character ranks and validated backups.
- `engine/core.js`, `state.js`, `registry.js`: shared runtime, state and character/arena dispatch.
- `ui/menu.js`, `controls.js`, `menu.css`: selection, interface and mobile controls.
- `assets/portraits/*`: approved separate selection portraits; `assets/catalog.json` and `assets/ART_DIRECTION.md` record artwork status and visual standards.
- `test.cjs`, `builds-test.cjs`, `town-test.cjs`, `encounters-test.cjs`, `charms-test.cjs`, `browser.cjs`: gameplay, encounter, charm and mobile-browser checks.
- `build.py`: current generator. Generated `game.js` and HTML are not primary sources.

## Artwork and new characters
Preserve user-approved source/reference assets and record their status in the catalog. Ten production portraits exist, including approved full-resolution Zak WebP and Mimi PNG; the old Zak placeholder description is obsolete. Selection portraits and in-game Canvas sprites are different assets and both require visual checks. For a new character, complete and obtain approval of **all** artwork, normal/special/dodge moves, effects, upgrades and stats **before** integrating on an isolated branch. No incomplete character on main.

## Current technical debt and safe migration order
1. Correct documentation and keep future chat instructions consistent (this file, `AGENTS.md`, guide, status).
2. Separate CI build verification from publishing; currently `.github/workflows/journey-v10.yml` auto-commits generated files. Plan and test this as a dedicated change.
3. Replace HTML extraction from `burntwood-rewards-v9.html` with an owned template while preserving exact runtime output and old URLs.
4. Centralise version and character/portrait registration; validate manifest order and generated-output consistency.
5. Extract shared enemy/combat logic only where tests demonstrate safe boundaries; then consider test and asset directory moves.
6. Preserve historical prototypes and public URLs; do not bulk-delete or relocate legacy HTML without redirect and link checks.

Use focused tests for iteration, required release checks before merge, and real iPhone Safari playtests for visual/gameplay acceptance. CI simulation does not prove human balance.

Joseph’s isolated implementation and locked specification are in characters/joseph.js and characters/JOSEPH.md. The selector uses the approved coloured portrait icons.

Tom’s isolated implementation/specification: characters/tom.js and characters/TOM.md; targeted tom-test.cjs and tom-browser.cjs.

Havannah: characters/havannah.js and characters/HAVANNAH.md; targeted havannah-test.cjs and havannah-browser.cjs. User delegated the initial full gameplay tuning for playtest.

## 10.13.0 module ownership
Town geometry/collision/routing: world/town-layout.js; objectives: ui/guidance.js. Monster boss patterns/warnings: arenas/monster-bosses.js; boss materials/silhouettes: visuals/monster-art.js; arena props: arenas/objects.js. Level-six choices and elemental effects: upgrades/evolutions.js. Character defensive identity/guard/evolution: characters/defences.js, retaining native movement hooks. Ability illustrations: ui/ability-art.js. Monster-town tests cover90 Mythic choices, exact effect sources/caps, geometry and interruptions; phone suite includes portrait, short portrait and landscape. Existing full suites retain combat/save/transaction checks with boss-charm expectations.

## 10.18.0 access and workshop ownership
Saved access/migration is in upgrades/permanent.js. Menu locks and no-portrait??? buttons use heroUnlocked; all production service entry paths use serviceOpen. First arena boss persists firstBossDefeated; heroic rewards do not. Jackson’s gift persists jacksonGiftClaimed atomically with the permanent rank. Stefan/Jackson welcome logic is in world/workshop.js, native shutter/open-front drawings in world/town-layout.js. Actual production access is verified by roster-workshop-test/browser.cjs; __test.select/reset enable explicit full-access compatibility fixtures for existing mechanics suites.

## Sankeys and charm interface (10.22 candidate)

`items/charms.js` owns selected same-rank fusion, equipment-slot preservation, swap conservation and icon inspection. `items/economy.js` owns prices, inspect-before-buy, rerolls, saved starter unlocks and paused inventory. `world/shopkeeper.js` owns separate Mimi and Ava service entry; `world/town-layout.js` places Mimi, Stefan/Jackson and Ava/Evie together at Sankeys. Covering keepers must remain distinct from the selected hero. Equipment changes remain town-only; different newly earned charms still auto-equip into empty slots.

`ui/charm-art.js` uses a unique SVG ID prefix per rendered instance. Never reuse document-global filter/gradient IDs between hidden shop, inventory and HUD instances: a hidden source can make visible object art disappear.

`ui/audio.js` provides an original procedural score (not a recorded acoustic soundtrack), a shared AudioContext/effects bus, independent saved volumes, gesture start and visibility suspension. Score gain automation updates only when its target changes; tones disconnect on completion. Native Safari sound quality and balance require user testing.

Arena-music playtest: `ARENA_SCORES` within that module owns five combat identities and base tempos. Bosses ramp to120% tempo with extra percussion; cleared walkout/treasure/victory returns to the town theme after a short resolution. Phrase buses retire on transition/mute/pause; noise is cached and uses no combat RNG. `arena-music-test.cjs` covers scheduling/lifecycle; `arena-music-browser.cjs` checks actual state transitions and real offline synthesis graphs. The isolated preview packager preserves production save keys and release paths. See `WORK_ARENA_MUSIC.md`.

Normal upgrade cards inspect first and commit through a separate Choose button. Preserve the 550ms reveal, armed-pointer protection and Mythic deferred choice. Tests must exercise both inspection and confirmation; direct mechanics fixtures are not a substitute for phone interaction checks.

## 10.24 recovery and portable distribution
`ui/journey-recovery.js` owns validated device-local journey checkpoints, safe area-entry rollback, saved cleared treasure and deliberate menu resume/replacement. Persistent progression stays in its existing validated save. `package_run.py` emits a complete relative-path distribution and checksummed ZIP without importing or publishing to RUN. See RUN_READINESS.md for storage limits and required actual-host acceptance. Introduction action labels now use the same character label helper as normal combat.

## Chasewater physical journey (10.27)
`arenas/chasewater-route.js` owns café/crossing/woodland/long-wall topology, finite forward arrivals, lakeside guard/recovery, labelled objectives, route-only Night Owl patterns and old cleared-save geometry migration. `arenas/chasewater-route-art.js` owns native stone wall, reservoir, railway, café, trees and brick tower. `arenas/chasewater.js` retains legacy combat geometry when physical entry is disabled for old simulations. Targeted route tests cover twelve heroes; the production phone suite follows actual guidance through the route and checks chest → exit → Sankeys.


## Town and Rugby scenery (10.28)
`world/town-layout.js` owns the three-frontage Sankeys square, local destination entrances and journey-victory decoration. `world/residents.js` limits names/bubbles to nearby residents. `arenas/rugby-route.js` owns parked-car/brick-wall footprints shared by `rugby-route-art.js`; its guided centreline remains open. New scenery VM/phone suites cover all twelve heroes, solid props, the complete route, real shop taps and phone artwork. RUN remains a separate release.

## 10.29 Elder Lane and clear combat cues
`arenas/park-route.js` owns Burntwood Park's physical geometry, finite forward groups, play-area guard, recovery and deliberate field boss approach. `park-route-art.js` owns the map-informed Elder Lane entrance, southern woodland/gardens, central play equipment/bike track and northern field. It is a compressed level, not a surveyed map. The legacy arena adapter remains for older combat matrices. Saves restart at the entrance or retain/migrate cleared treasure.

Joseph's module owns exterior Overhype impacts with visible recoil and rank3/5 dash healing. Last Light still blocks that recovery. Guardian Bell's actual one-hit protection drives the hero shield in defences.js and the health-orb state in ui/session.js. UI open-state serialization must match native DOM so Help is not recreated every animation frame. build.py asserts required startup controls before producing HTML.

The approved RUN icon lives in run-host/artwork; package_run_host.py overrides only the thumbnail while preserving the pinned Studio SDK/tracking wrapper. The deploy helper stages the same verified thumbnail at public/thumbnail.jpg for the official CLI.

## 10.30 signatures and charm builds
`upgrades/signatures.js` owns the twelve one-off10-essence definitions and bounded secondary shots/patches/swipes. Each character module owns its trigger. `world/signature-workshop.js` owns the distinct signature card, illustrative preview and atomic confirmation; the five stat tracks and Jackson gift are retained. Optional `progress.signatures` validates hero IDs; `run.signature` snapshots the next fresh journey and participates in validated recovery. Existing saves default to no signatures. Companion Mimi's clone uses Jodie's pet renderer, never the playable ninja Mimi.

`items/charm-builds.js` owns the six behaviour-charm descriptions, freezing/shattering, explosions, guardian waves, recognisable echo visuals, explicit combinations and immediate boss strengthening. Existing charm IDs, fusion, starter unlocks and saved equipment remain compatible. New proc sources cannot recursively trigger signatures/evolutions; overlapping signature clouds have a per-target clock. Jodie kittens use the complete9/11s lifetime; rank3 adds a second scratch, and revenge no longer despawns them. Native phone/balance acceptance remains user playtest.

## 10.31 testing candidate — curse and restoration
`world/curse-story.js` owns five area stories, destructible knots/rescues/omens, quiet beats, local root hazards, caller/stalker roles and validated journey rescue IDs. `visuals/curse-art.js` owns deterministic native corruption, distance-based cleansing, freed guardians and rescued town residents. All attacks use existing character damage; no hero/arena balance workaround. `curse-story-test.cjs` covers all12 heroes ×five areas, attackable objectives, safe warnings, enemy roles, physical victory/recovery and save boundaries; `curse-story-browser.cjs` reviews three phone sizes with real defence/pause taps. RUN publication is prohibited pending Stef’s test. Source remains on its feature branch; only the versioned Pages test file is to be published. Canonical/latest stay10.30.
