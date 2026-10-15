# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md, this file and AGENTS.md before editing.

## In development: 10.7.0 — Joseph
Branch joseph-rocket restores Joseph as The Overhyped Rocket using the approved Rugby Club portrait and Option 2 Hooded Training sprite. All fifteen upgrades, exact dialogue, targeted mechanics, thirty charm combinations and five-arena actual-attack smoke tests pass locally. CI/mobile visual review, merge and deployment are pending. Tom is approved and queued after Joseph. Thumbnail selection remains a separate task requiring approval. Specification: journey-v10/characters/JOSEPH.md.

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

## Verified release evidence
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
1. User Safari playtest: five-area pacing, charm/upgrade satisfaction, gold scarcity, shop reroll price, starter choice, inventory readability and Umbrella Man’s warnings/heal interruption. Diagnose specific feedback before changing shared balance.
2. Agree a map reference before changing Burntwood’s road layout.
3. Dedicated maintenance update from the completed audit: CI write-safety first, then an owned build template/central version metadata, registration checks and measured modular extraction. Current CI still runs the legacy importer and auto-commits generated files; do not mix the refactor with another feature release.
4. Future heroes require the complete approved portrait/sprite/moves/upgrades/stats gate in AGENTS.md. Preserve approved Zak Street and Mimi Little Headband/woodland assets.

## Previous release
10.5.0 living town/permanent ranks: PR #51 merge 233715d0070fae0a5679a2e12bcdf8bb81ee4917, branch CI 38756844724, main CI 38757339516, Pages 38757340088; all succeeded. 10.4.1 retained the final-first/heroic-second reward fix and Jackson’s boss knockback correction. Historical versioned links remain intact.
