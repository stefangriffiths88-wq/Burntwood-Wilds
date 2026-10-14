# Burntwood Wilds — Rugby Trio Test 3

Adds Stef alongside the unchanged Jackson and Ava kits from Rugby Duo Test 2. Previous versioned pages remain available.

Stef: 110 health, speed 150, 23 damage per paw, base 1.05s attack interval. He begins at level 1 with a right-paw sweep. Level 2 extends reach from 30 to 45 units; level 3 speeds the sweep from .50 to .34 seconds and attack interval from 1.05 to .64 seconds; level 4 adds a .38s stun (.12s on Bruce), with .9s immunity after the stun ends. Level 5 uses both paws; each can hit each enemy once per sweep. Contact follows each animated paw's angular sweep within its reach, rather than an instant area damage pulse.

Push replaces Stef's dodge; both Space and Shift activate the same shared 3s cooldown, and the mobile interface shows one PUSH button. He stays in place, gains .4s protection, and his paws make a fast circular push. No damage. Radius 82 plus enemy radius; knockback impulse 500 for small enemies, 300 for charging bucks, 120 for heavy enemies, 10 for Bruce. Deterministic stationary-target test displacements were about 64 / 15 / 1.3 units for small / heavy / Bruce. Push interrupts small enemy charges, but does not cancel Bruce's charge.

All characters keep accelerated test progression and Bruce at 60 seconds of active play. Stef has four upgrade offers (levels 2–5), guaranteed by 8/20/32/44 seconds if XP has not earned them sooner. Jackson and Ava retain their five upgrade tiers and timing. Upgrade screens pause the game.

Selection portraits have no upgrade lists. Stef uses mature cat artwork, changed stance, flat cap, charcoal shoulder patch, and separate floating paws. The simple in-game sprite has a closed coat outline and subtle brushed-back temple hair.

Files: self-contained `burntwood-rugby-trio-v3.html`, editable `game.js`, `rebuild.py` (preserves the embedded artwork), deterministic gameplay `test.cjs`, real Chromium mobile-viewport `browser.cjs`.

Run: `node rugby-trio-v3/test.cjs`; rebuild: `python3 rugby-trio-v3/rebuild.py`. Browser workflow captures profiles and in-game actions. Actual iPhone Safari verification is still a user playtest.

## Requested for the next update (deferred by Stef)

Do not revise the artwork again in this build. Next time a game update is requested, change Stef's portrait stance or raise his right floating paw in front of the shoulder so the missing limb is less conspicuous. Keep this correction deferred until that next update.
