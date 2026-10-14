# Burntwood Wilds — Family Test 7

New playable page `burntwood-family-v7.html`. Five characters, Rugby Club/Bruce and Chasewater/Night Owl, fast test upgrades and bosses at 60 seconds. Previous pages remain intact. Evie is selected initially.

## Evie — Duck Commander

Approved Option B appearance: cream/grey cat, long blonde locks and high ponytail, large purple bow, purple eyes, deep-purple/black fitted jacket and scarf, grey/cream curved tail and detached padded paws. Slightly taller than Jackson; no arms, legs or feet. The user's approved selection portrait is embedded directly, without regeneration.

Base HP90, speed158, short non-damaging dash (410 speed, .24s, 1.65s cooldown), automatic throws every 1.15s when a target is within 300 and capacity exists. Thrown ducks travel at 205 units/s. They deal one impact hit, become allies, visibly wind up and hop for one further smash, then leave. They are not persistent contact-damage auras.

Weapon starts at level 1, with four cumulative upgrades:

1. Duck Attack: one throw, 12 impact damage and one 8-damage allied smash.
2. Double Trouble: two ducks launch .17s apart.
3. Mighty Ducks: radius 7→9, impact 18 and smash 12, larger impact animation.
4. Egg Defenders: after the allied smash, a duck returns near Evie and fires at most two 6-damage eggs, 1.2s apart, within its original lifetime.
5. Duckling Mayhem: successful egg hits hatch tiny ducks with two 3-damage smashes (2 against bosses). No recursive eggs/duck generation.

Limits: six regular ducks including thrown projectiles; six-second total lifetime from launch; flights expire at 2.8s if they miss. Queue reserves capacity; normal throws pause when full. Up to eight ducklings, each three-second lifetime; up to eighteen eggs with 2.5s flight lifetime. Allies select unclaimed targets where possible, return near Evie if too far, separate and respect the shoreline.

Ducks, Assemble!: active allied ducks/ducklings rush back at 480 units/s, with purple signal and trails. Each returning duck hits each crossed enemy at most once (12/8 regular damage according to tier, 3 tiny). Recall preserves remaining smashes, egg counts and lifetime. Thrown ducks and eggs continue their flights. A duck resumes its remaining role after gathering; empty ducks disappear. Ten-second cooldown; a no-allies attempt displays feedback and spends no cooldown.

## Jodie — Mimi and Tiny

Open, spread claws with three visible tips, forward swinging swipes, wind-up/follow-through and three faint arc trails. Her two 10-damage swipes, 55 reach and 1.05s interval now remain stable through progression. The old claw-range/speed/triple-strike upgrades are removed.

Five new upgrades: Sharp Claws (Mimi 8→11 damage and visible scratch marks), Quick Paws (recovery .9→.55s), Hunting Leap (pounce range 48→150), Double Scratch (one additional visible 6-damage follow-up after a successful pounce), Tiny Joins In (second permanent black cat with same companion upgrades). Tiny is stockier with a blue collar, Mimi has gold; target selection and separation reduce stacking. Tiny appears only once and resets between runs. Kitten Chaos retains six limited-life kittens (5s or three pounces, 6 damage/3.9 boss damage), plus the permanent cats. Catstep remains unchanged.

## Editing / validation

Edit `family-v7/game.js` and `menu.css`, then run `python3 family-v7/build.py`. Portraits persist inside the existing v7 page; the first build inherits v6 portraits. No external runtime assets or scripts, no changes to older builds and no RUN.world imports.

`node family-v7/test.cjs` covers previous heroes/arenas, new Mimi upgrades/Tiny, duck impact vs ally hit, sequential throws, mighty damage, exact egg limits, successful-hit hatching, duckling caps/two hits/no recursion, once-per-enemy recall, lifetime/attack preservation, projectiles excluded from recall, no-allies feedback, dodge, both new kits through both bosses and cleanup.

Mobile Chromium validates all five profiles and image loads, nonoverlapping menu sections, upgrades/touch controls, actual Canvas drawing and duck AI, recall, both bosses/victory and short-screen layout with no page errors. Actual iPhone Safari performance and play feel require a device playtest. Balance values are provisional.
