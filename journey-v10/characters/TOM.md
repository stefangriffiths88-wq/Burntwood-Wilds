# Tom — The Wrecking Ball

Approved by the user on 15 October 2026: Option 3 olive tactical selection portrait; compact orange-brown tabby, green eyes, brown fringe, two detached floating paws, broad torso and tail. No arms, legs or feet in the playable drawing. Artwork source files and crop/checksum are registered in assets/catalog.json. The portrait is a 512×526 faithful right-pane crop; not an invented full-resolution replacement. Gameplay is native Canvas, separately rendered from the portrait. The supplied sheet's alternative title/feet in tiny frames are superseded by the explicit approved Wrecking Ball/no-limbs specification.

## Defaults and owned systems
140 health, speed 132, punch 25 every 0.9s, special cooldown 17s, barge cooldown 2.4s. Tougher/slower than Joseph (80/200/7/0.29); no other hero is rebalanced. Growth per level: health 1.5, power 0.6%, armour 0.1. Normal movement uses the shared engine; barge, slam, expanding waves, per-wave hit sets and bounded launch/collision state live in tom.js. Reuse optional motion/avoidHit hooks introduced for Joseph. Optional enemyDraw hook raises airborne enemies visually without changing shared hitboxes or arena AI.

## Heavy Hands — five cumulative upgrades
Base alternates detached paws; every third attack is a 135% double-paw smash, with knockback. Iron Fists: +15% damage. Double Trouble: third-hit splash (55 radius, 65% punch damage; primary excluded). Bone Rattler: heavy hits stun smaller enemies 0.28s. Unstoppable Hands: 20% faster and 30% stronger knockback. THE KNOCKOUT: every fifth attack is a 200% uppercut, launching smaller enemies; collision deals 60% punch damage once per struck enemy per launch. Fifth takes precedence on third/fifth overlap, so primary damage is never duplicated and no third-hit splash is added. Collision cannot trigger punch progression. Bosses/heroics receive damage but no launch/knockback/stun; heavy/bruiser/badger cannot be launched.

## Earthquake — five cumulative upgrades
Base 110-radius expanding shockwave, 38 damage, 0.18s smaller-enemy stun. Aftershock: second wave at 80% radius/60% damage. Fault Line: all radii +25%. Tremor: slow 2s (boss/heroic 0.5s). Seismic Fury: all wave damage +30%, smaller stun 0.4s. THE BIG ONE: three total waves (not five); final wave +15% radius/damage and airborne smaller enemies. Starts at 0.16/0.46/0.76s; each expands over 0.42s and has its own one-hit set. No stacking damage per frame.

## Shoulder Barge — five cumulative upgrades
0.28s forward lunge, 440 starting speed with taper; protection ends at 0.25s and does not set lasting player invulnerability. Base pushes ordinary enemies. Heavy Momentum: distance +20%. Make Way!: 18 contact damage once per enemy. Hard to Stop: cooldown −20%. Rebound: contact empowers the next normal punch 60%, consumed once without stacking. HUMAN WRECKING BALL: 32 contact damage, multiple smaller-enemy launches and an 85-radius/26-damage end shockwave. Swept segment contact prevents tunnelling; walkable bounds constrain motion. Bosses take contact/end-wave damage but remain anchored.

## Town and integration
Exact general line for every approaching hero: “I’ve seen bigger monsters in the pub on a Friday night!” No special relationships. No duplicate resident when Tom is selected. Supports all five arenas, shared stat/charms/essence workshop and save validation. Selection remains name buttons, wrapped to preserve usable touch widths; no portrait thumbnails.

## Verification and limits
Targeted tests: all fifteen real upgrade choices, exact damage/overlaps, nonrecursive collision hits, three-wave cap, slow/stun/launch resistance, barge window/cooldown/boundaries/rebound, save ranks, dialogue for every other hero, 30 charm combinations and actual combat against a heroic/first charm and final boss in each arena. Mobile Chromium checks cover portrait and short-screen selection, animations, abilities, dialogue, town and defeat. Inspect screenshots before merge. Scripted invulnerable positioning verifies integration, not human balance or native Safari performance. User playtest remains required.
