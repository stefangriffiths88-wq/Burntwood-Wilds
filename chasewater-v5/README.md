# Burntwood Wilds — Chasewater Test 5

Adds a second selectable arena while preserving the Rugby Club and Bruce. New self-contained page: `burntwood-chasewater-v5.html`. Chasewater is selected by default. All three characters and their previous upgrade paths are retained. Fast test upgrades and the 60-second boss arrival remain.

## Chasewater

A woodland/lakeside arena with a visible shoreline, moving water ripples, reeds, trees, winding gravel paths, benches, flowers, picnic-style seating and a fallen branch. Water is outside the walkable area; scenery on land is decorative to avoid snagging or trapping players. Shoreline constraints apply to movement, dodge, charge, knockback and enemy separation.

Enemy introduction: geese initially, foxes after 7s, diving owls after 14s, mud spitters after 24s, heavy stags after 34s. Waves stop at boss arrival, but surviving enemies remain.

- Hissing geese approach with surrounding offsets, stretch their necks during a .4s warning and rush at 155 units/s.
- Foxes flank to either side, lock a direction during a .65s wind-up, lunge at 315 units/s, then recover.
- Owls circle, mark a fixed impact point for .8s, dive to that point, then recover. They remain damageable so melee characters have fair access.
- Mud spitters stay near shore and visibly wind up before firing slow mud projectiles. Shots cause 6 damage and respect invulnerability; shots/particles are capped.
- Heavy stags resist ordinary knockback, telegraph a short headbutt for .95s, then recover. No rugby shirts or orange netting: those stay with Rugby Club/Bruce.

## Chasewater Night Owl

1100 HP. Alternates fixed-target dive warnings, dives and recovery windows with a directional wing-gust wind-up. The gust pushes players within its cone; it does not directly deal damage. Below half health it can summon two smaller owls, limited by a four-owl check. Only one major boss attack state runs at once. Telegraphs show impact circles, lunge lanes and gust cones. Invulnerability, slows, stuns and character attacks are integrated; stuns pause the custom attack state. Bruce remains the separate rugby boss with his orange antler netting.

## Validation / editing

`node chasewater-v5/test.cjs` runs prior character/combat regressions plus custom AI, fixed dive markers, actual projectile damage, heavy wind-ups, terrain, boss dive/gust/summons, victory, and both arenas/all characters through boss arrival.

`browser.cjs` runs real Chromium at a mobile viewport: selector, character controls/upgrades, wildlife attacks, Night Owl fight/victory, preserved Bruce, and a short-screen menu. Actual iPhone Safari play feel remains a user playtest.

Edit `game.js`, run `python3 chasewater-v5/rebuild.py` to update the self-contained HTML using its existing portraits. No external scripts/assets and no changes imported from RUN.world.

## Stefan refinement

Fitted waist-length jacket replaces the flared coat in both portrait and Canvas body. By Order! is a separate ten-second cooldown special: a brief cap-touch gesture followed by two seconds of fast forward hooks with enlarged paws, gold arcs and short stagger/stun. Movement is 70% during the flurry, with no extra invulnerability. Push remains the three-second dodge and can interrupt the special; bosses resist knockback. The flurry does not hit behind Stefan.
