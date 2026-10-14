# Burntwood Wilds — Rewards Test 9

New versioned page: `burntwood-rewards-v9.html`. Implements the Jackson/Ava playtest notes and boss reward system. Keeps five heroes, two 1:45 arenas, three choices per level and prior weapon/special progression. Previous pages remain intact.

## Changes

- First boss victory offers a bonus perk before continuing: three distinct random draws from Fire, Ice, Lightning, Vampiric and Wounding. The roll happens once, no rerolls, one selection; then the other arena starts automatically. No perk is guaranteed based on health. Perk persists for the remaining run and resets for a new run.
- Fire: hits burn for 2.4s (2 damage/.4s); an already burning enemy's defeat spreads a shorter burn to one enemy within 65. Ice: 30% slow for 1.2s, refreshing rather than multiplying existing slows. Lightning: a hit arcs 8 damage to a different enemy within 120, with a shared .65s cooldown. Vampiric: 4% of actual non-overkill hit damage, capped by a shared 2HP/sec token budget. Wounding: up to three bleed stacks, a .2s per-enemy stacking gate, 1.5 damage/stack every .5s for 3s. Perk damage never procs another perk; caps apply across summons/projectiles. World status cues and a HUD label identify the selected perk.
- Healing hearts: guaranteed on every twelfth ordinary defeat, plus cooldown-limited random drops (6% normally, 28% below 45% HP). At most six hearts, 30s lifetime, small 52-unit attraction range. Restore at least 10 HP (roughly 10% max), never overheal. Hearts remain at full HP until expiry so they can be collected after taking damage. Bosses do not drop them. Existing +20% transition heal remains.
- Jackson's dodge now deals 10 base contact damage. Upgrades give 30% farther travel, 18 damage/extra protection, short resisted contact stuns plus stronger push, 1.05s cooldown, then 26 damage and improved heavy push. Visible impact rings accompany actual contact hits. Ordinary attacks and shoulder-charge progression remain intact.
- Stat choices roll a random unowned stat. Cards say STAT — ONE-OFF, without rank 1→5; weapon/special/dodge paths retain ordered ranks. HUD stat count indicates collected perks, not a forced sequence.
- Ava's final Glitterstorm upgrade keeps the initial shower, then calls a fixed-target glitter meteor after .75s. Target favours nearby groups. Marked radius150, visible falling star/trail, 48–80 impact damage across the area, slowing burst and restrained shake. Replaces the weak half-damage second shower.
- Small health bars appear above damaged ordinary enemies; heavies always show a clearer bar. Boss HUD remains the boss health display. Bars change colour with remaining health.
- Boss-name fix: the second arena already spawned its own boss, but the old HUD text could remain. Continuation now updates that text, and the live boss label also derives from the actual boss object. Tests verify both arena orders.
- Safari touch guard: retain CSS touch-action rules, add non-passive touch-end cancellation for game surfaces, manual single-click forwarding for menu/card buttons, and dblclick/gesture cancellation. Pointer-based joystick/actions remain separate, avoiding double activation. Two-finger joystick+dodge and double-tap behaviour are tested in mobile Chromium; actual iPhone Safari needs the user's device test. No claim of native Safari verification.

## Build / tests

Edit `rewards-v9/game.js` and `menu.css`; run `python3 rewards-v9/build.py`. Embeds the existing approved portraits with no external game assets or libraries. No other character redesigns or RUN.world imports.

`node rewards-v9/test.cjs`: full prior progression/effect regressions; all heroes through both 105s arena orders, reward gate and carryover; random/unowned stat offers; three-of-five rewards, omission of Vampiric, immutable roll and single selection; both actual second bosses/HUD names; all five bounded perk effects; actual-damage vampire cap; guaranteed/capped healing and no overheal; fixed-target delayed meteor.

`browser.cjs`: real mobile Chromium, clickable touch cards and boss perks, complete two-arena progression, all five portraits/ability render checks, correct second-boss HUD, falling meteor/health-bar screenshots, real simultaneous joystick+dodge, double taps and cancellation, short-screen layout and no page errors. Simulations use invulnerability to isolate mechanics; human balance and device performance remain playtest findings.
