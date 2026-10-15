# Havannah — The Tiny Terror

User approved Tiny Rebel option 3, blonde side ponytail/yellow clip, plum hoodie/turquoise star and a direct menacing-cheeky expression. User then specified BLUE eyes and approved the detailed selection portrait. She represents a sassy six-year-old girl transformed into a cream/ginger cat: compact child silhouette, two detached floating paws, no arms/legs/feet. No family relationships invented. Gameplay stats/effects/upgrades and balancing were explicitly delegated: “Yeah do what you think I’ll test and then we will change as appropriate.” This is a complete initial playtest build, not a claim of final balance acceptance.

## Assets and ownership
Approved 1024×1536 portrait: assets/portraits/havannah.webp. Exact source PNG and chosen-option sheet preserved in assets/references; catalog records source checksum. The sheet has green eyes; the later blue-eye instruction and approved portrait override that. Gameplay is a separate native Canvas drawing with blue eyes, not a portrait crop.

characters/havannah.js owns projectiles, counters, rings, tantrum pulses, decoy and skip. Registry reuses existing motion/avoidHit hooks; a small optional goal hook lets ordinary enemies chase the decoy. Market, Quarry and Park now query enemyGoal in their existing target/orbit calculations. Other heroes still get their previous target, and bosses/heroics/heavies/committed charges are not redirected. No unrelated character modules or enemy stats were changed. Every new-run/arena/town transition resets all Havannah effects.

## Defaults
Health 78, speed 185, normal damage 10 every 0.55s, special cooldown 12s, dodge cooldown 1.9s. Growth/level: health 0.7, power 0.55%, tempo 0.2%. Ranged control fighter; lower health than Ava (85), faster movement than Ava (165), lower individual hit damage (10 vs 18). Initial human balance feedback is pending.

## Sass Sparks — five cumulative upgrades
Automatic turquoise bolt targets within 400, travels at 390, base damage 10. Every fourth main-bolt impact splits into 3 tiny sparks (3 damage each). Fragments never increment this counter, split or ricochet; each fragment hits once. Main-hit ricochets count as main impacts. Newly spawned fragments are processed starting next update, not recursively inside the parent loop.
1. Star Power: normal and split-spark damage +15%.
2. More Mouth: attack 20% faster.
3. Spark Pop: fourth-hit burst has 5 sparks; base spark damage 3 → 4.5.
4. Double Attitude: every third normal attack adds one full-power bolt after 0.1s. The follow-up cannot recursively schedule more follow-ups.
5. STARS IN YOUR EYES: main bolts ricochet to two more unique enemies (3 total hits), 220 reacquisition range; no revisiting, no fragment chains.
Projectiles max 72, follow-up queue max 8; finite range/lifetime, swept segment contact and target-removal safety.

## FULL TANTRUM — five cumulative upgrades
Base 3 pulses, 0.45s apart, damage 12 each, radius 105, ordinary slow 1s, boss/heroic slow 0.4s. Base cast stays at its origin; no invulnerability. Each pulse applies once per enemy, never per render frame.
1. Louder Please: radius +25%.
2. Big Feelings: 4 total pulses.
3. No Talking!: ordinary slow 2s, smaller-enemy stun 0.2s; bosses/heroics/heavies resist stun.
4. Not Finished: cooldown 12 → 10s.
5. TOTAL MELTDOWN: 6 total pulses, damage +30%, follow the player as a moving storm.
Pulse count replaces earlier totals rather than adding six on top. Bosses take damage but are not shoved or stunned. At most 12 cosmetic rings.

## Can’t Catch Me — five cumulative upgrades
0.23s directional skip, speed 560 tapering to 40%; only 0.02–0.19s of active skip avoids damage. No persistent p.inv assignment. Leave one stationary ghost decoy for 1s. Within 160, walking swarms, foxes, geese, pigeons, rabbits and scrappers chase it. Existing attack contact still targets the real player; the decoy does not provide a damage shield. Rubbish-carrying bandits and ranged enemies keep their own tasks.
1. Try and Keep Up: skip distance +20%.
2. Look Over There: decoy lifetime 1.8s, distraction range 200.
3. Too Quick: cooldown −20% (1.52s before stat bonuses).
4. Cheeky Comeback: expired/replaced decoy fires 3 small stars for 6 damage each.
5. LAST WORD: expires/replaced decoy bursts for 22 damage in radius 70, firing 6 small stars instead of 3.
Retaliation source is dodge, so it cannot advance normal-hit splitting or trigger weapon-recursive effects. Resetting/removing a decoy for transition never explodes it. Bounds use existing walkable geometry.

## Town
General: “I’m not scared. They should be scared of ME!” Post-victory: “Told you. Tiny paws, massive attitude.” No duplicate when selected. Existing shopkeepers/workshop unchanged. Save validation includes Havannah; existing essence and starter-unlock schema retained.

## Tests and release gate
havannah-test.cjs covers exact weapon damage/proc limits, all fifteen real upgrade choices, pulse counts/anchored-vs-moving origin, cooldown/protection, actual decoy-following AI in all five arenas, boss/heroic immunity, save/workshop, resets, 30 charm combinations and actual heroic/first-charm/final-boss combat in each arena, plus a complete retained five-area journey (30 upgrade choices). Protected scripted positioning is integration evidence, not human survival balance. Mobile Chromium screenshots verify approved portrait/framing, blue eyes/sprite/limbs, touch movement, effects, decoy, dialogue, defeat and 390×650 selector. Native Safari and user balance feedback remain pending.
