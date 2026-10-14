# Burntwood Wilds — Journey Test 10 (10.0.1)

Play `latest.html`, a permanent entry point redirected to this versioned build. Previous builds remain unchanged. Build number is visible in selection and the game menu button.

## Source ownership

- `state.js`: shared runtime state and registry containers.
- `characters/{jackson,ava,stef,jodie,evie}.js`: each character's base stats, profile, ability implementation, sprite functions and upgrade descriptions. Change Evie's duck values here; do not change arena difficulty to compensate for one hero.
- `arenas/{rugby,chasewater,sankeys}.js`: environment, enemy content and arena configuration. All five heroes use these same definitions. Arena order/difficulty progression is shared.
- `upgrades/progression.js`: one XP/level clock, three-card selection, purchases and shared stat application for all characters. Character-specific paths are read from the active character tables.
- `upgrades/rewards.js`: shared boss elemental perks and healing drops.
- `world/hub.js`: travel and three-arena run orchestration; `world/shrines.js`: optional shrine and timed blessings.
- `engine/core.js`: simulation, movement, collision, damage, common rendering primitives and existing action processing.
- `registry.js`: character attack/draw/special/dodge/update dispatch and arena spawn/ground/wave dispatch. These replace the former main-attack/update branch chains.
- `ui/menu.js`, `controls.js`, `menu.css`: selection, touch guards, HUD and bootstrap.

This is a staged modular refactor using an explicit ordered manifest and shared lexical runtime, not isolated ES module classes. Some existing action processing and shared effect hooks still depend on character flags. Character balance, arena content and progression tables now have separate editable owners; further engine extraction can happen without changing the delivery workflow.

`game.js` and `burntwood-journey-v10.html` are generated. **Do not edit them.** `python3 journey-v10/build.py` combines `manifest.json` source files and reuses approved portrait assets embedded in Test 9. Build determinism is checked in CI. Do not rerun the one-off migration scripts; they are not part of the maintained project.

## New playtest content

- Safe stylised Burntwood travel hub, small buildings and collision walls, bushes, twelve harmless wandering animals, three arena gates, small overview map. This is a compact illustrative hub, not a geographically surveyed Burntwood map. Walk near a gate then tap ENTER. Combat/XP clocks pause in travel. Menu can end a run.
- Three arenas can be visited once each, in any chosen order. Eight choices before each 105-second boss. Level, chosen upgrades, health and one existing boss perk carry over; temporary summons/hazards clear. Clear a boss and use continue to return to hub; first continue picks one of three random elemental perks. After the third boss the run finishes. Second/third ordinary HP scale 1.35^round, bosses 1.5^round, damage 1.2^round, on top of existing level scaling.
- Sankey's Corner: pigeons swarm, couriers wind up dashes, traders throw goods, heavy trolley pushers charge. Trolley King alternates telegraphed charges and a fan of thrown shopping; below half health the fan widens and failed charges release pigeons. Knockback resistance uses existing heavy/boss rules. Shopfronts are scenery, not collision barriers inside the combat arena.
- Stefan larger body, fast straight left jabs initially, reach/speed/stun upgrades, final weapon upgrade adds higher-damage hooks. Special remains flurry; Push remains his non-damaging dodge substitute. No arena stats changed to balance him.
- Jodie retains all five special/dodge/stat paths, with visible summon pulse and companion-speed rings. Evie retains all paths; recall also accepts ducks in flight and has a longer post-impact window. A recalled thrown duck cancels its unspent initial impact, never duplicates it. Duck count/lifetime/egg caps preserved.
- Optional shrine: 20% independent chance per entered arena, once only. Activate within 70 using USE SHRINE; heals 20% max HP and offers three random distinct blessings out of five. Barrier absorbs 20% max HP; regen 1%/sec; damage +20%; speed +15%; critical chance 20% at 1.5x. Blessings last 30 active combat seconds and pause in upgrade screens. No relic system.

## Validation

`node journey-v10/test.cjs` checks real purchase routes for every hero/path, retained effects/regressions, all heroes through three arenas, eight choices each, bosses, retained progression, hub pause, shrine offers/timer/healing. Invulnerability and periodic ordinary-enemy clears isolate systems; these are not claims of human balance or difficulty.

`browser.cjs` uses mobile Chromium for real touch selection cards on every hero, all three arenas, boss names, hub rendering, specials/dodge, shrine, short-screen layout, two-finger movement/dodge, zoom guards and page errors. CI uploads screenshots. Actual iPhone Safari smoothness/balance remain device playtests.
