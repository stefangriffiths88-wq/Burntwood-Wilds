# Burntwood Wilds — Progression Test 8

New standalone page: `burntwood-progression-v8.html`. Five heroes, both starting arenas, all prior artwork and weapon mechanics preserved. Previous versioned pages are unchanged.

## Run structure

Bosses arrive after 105 active gameplay seconds (1:45); upgrade menus pause the clock. Eight choices per arena, player level 1→9→17. XP comes from defeated enemies. Timed floors ensure offers at 8,19,31,43,56,69,83,98 seconds; sufficient earned XP can advance later offers by up to three seconds, but cannot trigger several screens back-to-back early in the fight. Further XP is capped by eight choices per arena; the second arena begins a fresh eight-choice schedule.

Every level-up offers three cards from different paths: weapon, special, dodge and stats. The omitted path rotates. Ability paths offer their next upgrade in order; stats are independent, nonrepeatable choices. Completed paths leave the pool. If fewer than three paths remain, spare slots explicitly offer a 25% heal or a cooldown reset, preserving three distinct choices without inventing extra ability ranks. One click takes one card; no free weapon advancement when choosing a different path.

After the first boss, Continue enters the other arena with the same weapon, special, dodge, stat ranks and level, plus remaining health and a 20%-of-max recovery heal. Temporary attacks/summons, enemies and arena hazards clear. Permanent cats are recreated at their retained weapon tier. Cooldowns reset. Finish Run returns to selection. The second boss ends the two-arena run; there is no third arena loop.

## Difficulty

Each player level adds 6% enemy HP and 3% damage. Live enemies scale proportionally without restoring their damaged HP fraction. Enemy mixes use both time and stage progress; spawn intervals shorten gradually. Round two adds 35% ordinary-enemy HP, 50% boss HP and 20% damage, plus faster mixed spawning. Existing telegraphs, behaviour differences, boss phases and small movement speeds remain. Enemy/duck/kitten/particle limits remain bounded.

## New upgrade paths — five of each per hero (75 total)

All weapon paths from v7 remain separate.

| Hero | Special path | Dodge path |
|---|---|---|
| Jackson | 20% farther charge; 85 shoulder damage; wider contact; short stagger (boss resists); forward 30-damage final impact | 20% farther; 12 damage; stronger contact push; 1.25s cooldown; 18 damage and better heavy push |
| Ava | 4.5s slow; 10 shower damage; 2/sec glitter for 3s; 7s cooldown; second half-damage shower | 15% farther; slowing trail; +.12s protection; 1.25s cooldown; slowing landing burst |
| Stefan | 2.6s flurry; +15 special reach/bigger paws; 30-damage flurry hits; 8s cooldown; forward 45-damage two-paw finisher | radius100; +25% push; .65s protection; 2.3s cooldown; short stun with heavy/boss resistance |
| Jodie | 6s kittens; longer pounces; four pounces per kitten; 9s cooldown; eight kittens | 15% farther; +.12s protection; 2s permanent-cat speed boost; 1.25s cooldown; small-enemy landing stagger |
| Evie | 25% faster recall; wider path contact; +50% recall damage; 8s cooldown; one regular-duck landing splash | 15% farther; +.12s protection; 2s nearby ally speed boost; 1.25s cooldown; 1.5s duck decoy for nearby ordinary walkers |

Five individual stats per hero: +15 max HP (+20 Stefan), +5% movement, 10% faster normal attacks (Jodie instead +15% claw damage), +25% XP pickup radius, +10% weapon damage (Jodie instead +10% permanent cat damage). A max-health purchase heals only the newly gained capacity. Source tagging prevents weapon bonuses accidentally boosting kitten or dodge damage. Profiles continue to describe starting stats, not an old run's upgrades.

## Readiness feedback

Special and dodge buttons are truly disabled and grey during cooldown, with countdown labels. When ready they regain their colours and briefly pulse. Evie's recall also stays grey with NO DUCKS until an active recallable ally exists. Ability guards remain independent of styling. Recall preserves duck lifetime/remaining attacks; final landing splash is once per regular returning duck, never recursive. Kittens remain duration/attack limited; Mimi/Tiny remain separate permanent companions.

## Editing and tests

Edit `progression-v8/game.js` and `menu.css`, run `python3 progression-v8/build.py`. The builder reuses the v7 embedded portraits; there are no external game assets/scripts. `node progression-v8/test.cjs` exercises offers/purchases and all 75 ranks, damage-source stats, weapon independence, actual special/dodge effects, grey readiness, living-enemy scaling, eight level-ups and 105-second boss timing, both arena orders for all five heroes, carryover/heal/cleanup and final victory.

`browser.cjs` uses real mobile Chromium for three clickable cards, cooldown grey/ready states, a complete two-arena progression run, five portraits, maximum special/dodge rendering on every hero, continuation UI, short-screen card layout and page-error checks. Gameplay simulations use invulnerability to isolate mechanics; they do not prove human difficulty or iPhone frame rate. Actual iPhone Safari balance/performance remain playtest work. No RUN.world code or audio imported.
