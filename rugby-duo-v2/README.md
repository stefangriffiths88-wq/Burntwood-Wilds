# Burntwood Wilds — Rugby Duo Test 2

Standalone, versioned rugby-only playtest. Previous games are preserved.

## Characters

| | Jackson | Ava |
|---|---|---|
| Health | 100 | 85 |
| Movement | 155 units/sec | 165 units/sec |
| Main hit | 26 | 18 |
| Attack interval | 0.82 sec | 0.95 sec |
| Dodge | ~46 units, 8 damage once per enemy | ~87 units, no damage |
| Special | Shoulder charge, 65 damage, 7 sec cooldown | Glitter Shower, 6 arena-wide damage, 30% slow for 3 sec, 9 sec cooldown |

Slow never compounds beyond 30%. Sticky magic deals 3/sec per affected enemy, regardless of attached star count. Stars stick for 2 seconds; at tier 2+ they recall and deal 18 damage once per enemy on the return path (including the original target). Tier 3/4 launch two/three stars in a sequence, 0.16 sec apart. Tier 5 makes each recalled star trigger a 9-damage burst, radius 55, at its original impact point when it reaches Ava.

Jackson retains the five cumulative ball tiers from test 1: rebound at 50%, two split balls at 50%, three split balls, split damage 75%, three hits per split ball. No other upgrade choices.

## Accelerated test

XP thresholds: 3, 8, 15, 24, 35. Timed upgrade offers guarantee all five by 44 seconds (at 8/17/26/35/44 seconds if XP has not already earned them). Upgrade screens pause the game. Bruce spawns at 60 seconds of active gameplay, with 1000 HP and his orange antler netting. These values are for testing, not final progression balance.

## Files / verification

`burntwood-rugby-duo-v2.html` is self-contained: no external scripts, image hosts or APIs. Character art is embedded, cropped from approved generated illustrations. Simple sprites use native Canvas paths, detached hands and no feet.

`game.js` contains gameplay; `rebuild.py` updates the self-contained page from game.js while preserving its embedded portraits. Edit game.js directly. `test.cjs` runs deterministic gameplay checks with a DOM/Canvas stub. A real Chromium phone-viewport smoke test is supplied in `browser.cjs`. Actual iPhone Safari testing remains a user check.

Build: `python3 rugby-duo-v2/rebuild.py`. Test: `node rugby-duo-v2/test.cjs`.
