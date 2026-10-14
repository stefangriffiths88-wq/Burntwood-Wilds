# Burntwood Wilds — Family Test 6

New self-contained version: `burntwood-family-v6.html`. Both arenas remain selectable; bosses arrive at 60 seconds and all weapon upgrades are available by 44 seconds. Earlier pages are untouched.

## Jodie

Option C translated into the existing simple Canvas style: ginger bun/fringe and locks, cream face and detached paws, fitted teal torso, rose scarf, curved tail and cat charm. No arms or feet. Base HP 95, movement 158, double claw hits of 10 each with a 1.05-second attack interval. Forward swipes are animated and use swept arc collisions, not a damage aura. Catstep is a medium dash with no damage and a 1.65-second cooldown.

A permanent black cat independently hunts, prepares and visibly pounces; damage occurs once at landing, not on continuous contact. It favours Jodie's current target and nearby ranged mud spitters, stays near Jodie and respects the shoreline. Base damage 8 plus 2 per weapon tier. Companion is decorative outside attacks and does not block the player.

Kitten Chaos summons six separated kittens. Each lasts at most five seconds and attempts at most three pounces. Each pounce deals 6 damage (3.9 against bosses), with no duplicated continuous damage. Special cooldown 12 seconds. Reset or switching heroes clears summons. Only one permanent cat exists per run.

Five sequential upgrades: Long Claws (45→62 reach), Quick Paws (faster combo/interval), Pouncing Partner (longer companion pounces), Double Trouble (combo calls a 1.5× companion follow-up, queued if busy), Cat Frenzy (three alternating claws and faster companion recovery). Character stats describe the starting kit; progression is shown in the gameplay HUD and upgrade panel.

## Portraits and selection

All four use warm woodland rugby-pitch portraits with soft 3D fur rendering, detached paws and consistent framing. Jodie follows the approved ginger/teal/rose design; Ava is reframed vertically. Stefan's longer coat is restored with separate straight open panels instead of a flared closed skirt, also reflected in the Canvas sprite. His separate By Order! special and Push dodge remain intact.

The menu uses a responsive grid, all four names along the bottom, portrait above profile, and arena and Play controls below. Each profile has the same four stats and labelled Attack, Special and Dodge rows. No upgrade lists on selection. Portrait artwork is illustrative; playable sprites are simple Canvas drawings.

## Build and validation

Edit `family-v6/game.js` and `menu.css`; run `python3 family-v6/build.py`. The build preserves portraits embedded in the existing v6 HTML. Raw user reference photographs are not included. Source image-generation prompts are in `art-prompts.md`; portraits are embedded WebP data in the HTML so the game has no external asset dependency.

`node family-v6/test.cjs` exercises previous character regressions, both arenas, custom enemy/boss behaviours and Jodie: wind-up, exact double/triple hits, no rear hits, extra range/speed, non-damaging dodge, single-hit cat pounces, six kittens with limited lifetime/attacks, both bosses and reset/switch cleanup. Real Chromium checks cover all four profiles, no overlapping sections, small phone height, touch controls, upgrades, combat, boss victory and no page errors. Actual iPhone Safari performance/play feel requires device testing. No RUN.world code/audio has been imported.
