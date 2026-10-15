# Run charms — 10.3.0

Approved direction: three run-only charm slots, 12 items, heroic wildlife at 60 seconds, final bosses at 120 seconds. Eight timed upgrade choices now end at 108 seconds. No permanent progression.

## Acquisition and fusion
Each arena has one heroic challenger: rugby stag, Chasewater fox, Sankeys courier, quarry badger. 300 base HP with shared scaling, readable 0.85 second charge warning, stronger than ordinary enemies but below final boss. Killing it pauses for three distinct choices; select one charm. An owned rank-I item is deliberately included among later choices when available, providing a fusion opportunity instead of filling another slot.

First three distinct charms equip automatically. Duplicate/spare copies stay in the run bag. At Mabel, equip or replace without destroying old items. Two matching copies at the same rank fuse for free; they are consumed to make one higher-rank charm. No duplicate equipped effects. Rank cap III; the current three-reward route normally permits rank II, while III needs four matching base copies and is reserved for longer routes. Inventory and equipment survive arena transitions and disappear on a new run.

## Effects
- Storm Button: chain to two foes, 8 damage each, 1.5 second global cooldown.
- Pocket Watch: special cooldown multiplier 0.80 / 0.72 / 0.65 by rank.
- Cracked Bell: eight qualifying hits release 12-damage, 95-radius shockwave. Per-target 0.15 second charge gate and 0.5 second proc gate.
- Hunters Badge: +25% heroic/final-boss damage.
- Frost Marble: 25% slow for 1.5 seconds, resisted by heroic/final bosses. Strongest slow applies, never multiplied with existing slows.
- Scratched Locket: every twelve defeats drops ten healing.
- Echo Coin: fifth successful normal-attack start primes one echo on the next normal weapon hit, 40% actual damage; 0.16 second delay. Compatible with immediate sword hits and delayed projectiles; does not duplicate companions or specials.
- Thorn Brooch: taking actual damage releases 18-damage, 100-radius knockback burst; 3 second gate.
- Ember Acorn: defeats leave 2 second, 30-radius patches; 4 damage each 0.5 seconds; maximum eight patches; overlapping patches do not multiply ticks.
- Moon Ribbon: dodge through a foe to mark for four seconds; next normal weapon hit consumes mark for +50% damage. Stefs push counts as his defensive action.
- Guardian Bell: block one hit after 20 / 16 / 12 seconds without damage. No shield stacking.
- Bramble Ring: knockback exposes for two seconds, +15% subsequent damage (the triggering hit also benefits).

Rank II increases most numeric strengths by 50%; rank III doubles base strengths. Slow caps at 40%; durations/cooldowns stay fixed except Watch and Guardian. Explicit charmDetail() strings are authoritative display values.

## Isolation and limits
items/charms.js owns inventory, UI, fusion and proc queues. arenas/heroic.js owns heroic behaviour. Shared hooks integrate damage, attacks, cooldowns, movement slows and run resets; character sprites and attacks remain intact. Proc damage uses source=charm; it cannot trigger charms or boss perks. Proc queue capped at 48, fire at eight patches; health pickups capped. Pause states freeze combat. Single duplicate UI click cannot grant twice. Rewards pending on a simultaneous boss victory are handled before returning to the win screen without paying coins twice.

## Validation
charms-test.cjs verifies effects, timing, all four arenas, fusion/carry-over/reset, 84 single hero/charm combinations, and 21 full three-arena journeys using all seven heroes with three builds. Full journeys use actual attacks, real upgrades/rewards, scripted positioning and invulnerability. They establish functional viability, not human balance. Results are written to charm-test-results.json and uploaded by CI. Browser suite covers reward buttons, paused clocks, inventory replacement, fusion and heroic rendering.

## Shared encounter lifecycle (10.4.1)
Heroic spawning and defeat-to-reward scheduling belong to arenas/heroic.js, invoked by the shared engine and onDefeated hook. items/charms.js owns equipment, reward choices, fusion and effects; acquiring a first charm does not depend on a hero module or equipped charm proc state. A living heroic displays a health bar labelled “DEFEAT FOR A CHARM”. Reward still requires defeating that heroic, not merely reaching 1:00.

encounters-test.cjs starts all seven heroes with zero charms in all four arenas: timed spawn, real attacks, reward choice, pause and duplicate guard. Positioning/invulnerability are test aids, not human balance evidence. Jackson charge tests cover base/upgraded contact and finisher against all four final bosses plus heroics; ordinary enemy knockback remains.
