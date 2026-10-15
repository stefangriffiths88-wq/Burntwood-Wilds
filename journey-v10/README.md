# Burntwood Wilds — maintained game architecture

Read `../DEVELOPMENT_GUIDE.md`, `../PROJECT_STATUS.md` and `../AGENTS.md` first. The status file is the source of truth for the current verified release (see PROJECT_STATUS.md for verified deployment). The maintained source is `journey-v10/`; `manifest.json` controls concatenation order. `game.js`, root `burntwood-journey-v10.html` and versioned HTML releases are generated outputs; do not edit them directly. `latest.html` is the stable public entry point.

## Source ownership
- `characters/{ava,jackson,stef,jodie,evie,zak,mimi}.js`: seven individual heroes, moves, stats, gameplay Canvas drawings and upgrades.
- `arenas/{rugby,chasewater,sankeys,quarry,park}.js`: five arenas and their visuals/encounters; `arenas/heroic.js`: heroic encounters and reward scheduling.
- `items/{charm-catalog,charms,economy}.js`: 30 run-only charms, rarity, fusion, inventory, gold shops and starter unlocks. See `CHARMS.md`.
- `world/{hub,residents,conversations,workshop,shopkeeper,shrines,burntwood-details}.js`: town, resident display, shopkeeper and interactions. See `TOWN.md`.
- `upgrades/{build-stats,progression,rewards}.js`: shared run upgrades and boss rewards; `upgrades/permanent.js`: saved essence, character ranks and validated backups.
- `engine/core.js`, `state.js`, `registry.js`: shared runtime, state and character/arena dispatch.
- `ui/menu.js`, `controls.js`, `menu.css`: selection, interface and mobile controls.
- `assets/portraits/*`: approved separate selection portraits; `assets/catalog.json` and `assets/ART_DIRECTION.md` record artwork status and visual standards.
- `test.cjs`, `builds-test.cjs`, `town-test.cjs`, `encounters-test.cjs`, `charms-test.cjs`, `browser.cjs`: gameplay, encounter, charm and mobile-browser checks.
- `build.py`: current generator. Generated `game.js` and HTML are not primary sources.

## Artwork and new characters
Preserve user-approved source/reference assets and record their status in the catalog. Seven production portraits exist, including approved full-resolution Zak WebP and Mimi PNG; the old Zak placeholder description is obsolete. Selection portraits and in-game Canvas sprites are different assets and both require visual checks. For a new character, complete and obtain approval of **all** artwork, normal/special/dodge moves, effects, upgrades and stats **before** integrating on an isolated branch. No incomplete character on main.

## Current technical debt and safe migration order
1. Correct documentation and keep future chat instructions consistent (this file, `AGENTS.md`, guide, status).
2. Separate CI build verification from publishing; currently `.github/workflows/journey-v10.yml` auto-commits generated files. Plan and test this as a dedicated change.
3. Replace HTML extraction from `burntwood-rewards-v9.html` with an owned template while preserving exact runtime output and old URLs.
4. Centralise version and character/portrait registration; validate manifest order and generated-output consistency.
5. Extract shared enemy/combat logic only where tests demonstrate safe boundaries; then consider test and asset directory moves.
6. Preserve historical prototypes and public URLs; do not bulk-delete or relocate legacy HTML without redirect and link checks.

Use focused tests for iteration, required release checks before merge, and real iPhone Safari playtests for visual/gameplay acceptance. CI simulation does not prove human balance.
