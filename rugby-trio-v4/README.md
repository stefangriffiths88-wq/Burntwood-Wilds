# Burntwood Wilds — Rugby Trio Test 4

Versioned rugby-only playtest; earlier builds are unchanged. No changes from the separate RUN.world experiment have been imported.

## Stefan combat refinement

- Right hook travels only through a 126-degree forward arc aimed at the nearest target at the start of each strike. Aim is fixed for that strike; it is not a full-circle hit.
- Base reach 48 units (previously 30); Long Reach 65 (previously 45). Faint forward arc shows reach and aim.
- Visible wind-up .16s, hook .50s, recovery .16s; Fast Hands uses .10/.40/.12s. Starting interval 1.10s, Fast Hands .82s, two-hand combo .96s. Motion is slower and easier to read than the old .34-second full orbit.
- Striking paws enlarge from 3.8 to 8.5 units. Normal hit knockback increases from 75 to 160 impulse before enemy resistance.
- Final level alternates right and left hooks with a .28s delay. Each paw can hit an enemy once per combo. Brief stun and .9s post-stun immunity are retained.
- Push moves both paws horizontally outward. The pressure wave fires after .15s, affects nearby enemies in all directions within radius 82 plus enemy radius, and deals no damage. A thin blue circle shows its reach.
- Push impulse increases from 500 to 600; heavy multiplier .24 and Bruce multiplier .02. Test displacement ~77 / 18 / 1.5 units for small / heavy / Bruce. Push does not teleport Stefan. Shared 3s cooldown, .48s protection, .44s animation.

## Character selection

Full-screen layout replaces the framed card. Ava, Jackson and Stefan tabs sit across the bottom; selecting a name changes the large artwork, profile and stats. No upgrade lists on profiles. Stefan's older, text-free portrait uses the requested guard stance, raised right paw in front of shoulder, closed charcoal shoulders and mostly hidden brushed-back hair. His displayed name is Stefan; internal identifier stays `stef` for continuity. Jackson and Ava combat is unchanged.

Quick progression and Bruce at 60 active seconds are retained for testing. Stefan starts at level 1, with four upgrades through level 5; Jackson and Ava retain their five upgrade tiers. Panels pause the game.

## Validation / editing

`node rugby-trio-v4/test.cjs`: both previous characters' attack/upgrade regressions, frontal hooks avoiding targets behind, enlarged paws, reach, combo sequencing, horizontal Push with 360 knockback, size resistance and Bruce timing.

`browser.cjs`: actual mobile-viewport Chromium, three profiles, bottom name tabs, controls, upgrades, combat rendering, victory/selection and short-screen layout. Actual iPhone Safari play feel remains a user test.

Edit `game.js`, then run `python3 rugby-trio-v4/rebuild.py` to update the self-contained HTML while preserving embedded portraits. The HTML has no external assets or script dependencies.
