# Joseph — The Overhyped Rocket, approved 15 October 2026

Art/moves/all fifteen upgrades/dialogue approved by the user’s complete implementation handover. Tagline: Fast feet, bigger dreams. Orange tabby, green eyes, black hooded training kit with red/green trim, cream muzzle/paws, fluffy tail. Two detached paws; no arms, legs or feet. Assets/references retain the approved originals; portrait is an exact-content crop of the Rugby Club poster excluding baked-in UI. No portrait regeneration. Gameplay uses independent native Canvas shapes, not the portrait.

## Stats and behaviour
80 HP, 200 movement speed, 7 base punch damage, .29s normal attack interval, 12s OVERHYPE cooldown. Fragile/fast melee identity; existing heroes and arena balance unchanged. Growth per chosen level: +.65 HP, +.55% Power, +.3% Tempo. Existing generic stats/charms/saved ranks apply.

Rocket Fists alternates paws, 58 reach plus enemy radius. Every third normal punch is a 1.65× uppercut, with slight displacement/stagger on ordinary enemies; final/heroic bosses are anchored. Turbo Paws: 15% faster; third punch adds a radius-44 pulse for 4 damage; +20% punch/pulse damage; after dash five 65%-power punches; every fifth normal punch adds two follow-ups for three total. Extra hits never increment the normal-punch counter or trigger another combo/pulse. Third/fifth overlap produces one uppercut, one pulse and two ordinary follow-ups. Follow-ups validate target/range again.

OVERHYPE restores the original V8.3 identity of animated path-based ricochets, adapted to the current engine and approved new move set. 5/7/10 impacts by rank (7 at special 1, 10 at special 4), 360 target range, 900 motion speed, 3.2s safety timeout. Impact 14 base; revisiting a target halves damage; last impact ×1.6. Special 2 adds 10% damage per successive impact; special 3 stuns ordinary enemies .18s; special 5 finishes with a radius-110, 24-damage explosion. Empty targets spend no cooldown. Deleted targets are reacquired safely. Offensive movement is protected only while the bounded chain is active. All positions use walkable arena bounds.

Turbo Dash lasts .24s, speed 650 tapering to 45%, 1.8s serial recharge. Damage avoidance occurs only from .045 to .17s. Dodge 1 travels 25% farther; dodge 2 marks traversed enemies for the next punch +30% within 3s; dodge 3 reduces recharge 20%; dodge 4 counters one avoided mid-dash hit for 24 damage against a reachable enemy; dodge 5 holds two charges, recharging one at a time. Base dodge is defensive and does not deal contact damage. Existing hit invulnerability and other defensive charms retain their separate effects.

## Presentation and integration
Breathing/ear movement, directional lean/back view, independent punches/uppercuts, hood/paw tuck during dash, orange trails, pulse impacts, hurt blink and collapsed defeat pose. Bounded effects/queues. Small synthesized hit tones unlock on the first pointer interaction; no audio assets/network dependency.

New registry hooks motion(dt) and avoidHit(amount,source) allow Joseph’s bespoke movement/protection without changing other heroes. Special-cooldown and weapon-data dispatch explicitly handle Joseph. His IDs are added to save validation, growth, name selector, portrait discovery and town residents. Town renderer uses Joseph’s body renderer directly without replacing player/combat state.

General dialogue: “If those monsters think they’re getting past me, they’ve never seen my tackle!”
Selected Jodie takes priority: “Mum! Mum! Watch me take this monster down!”
These exact lines persist after victories; no extra relationship dialogue.

## Verification
joseph-test.cjs checks exact combos/overlap, all fifteen tiers, bounded chains, target removal, dash windows/marks/counters/recharge, town priority, saves and actual-attack heroic/final-boss clears across all five arenas. Scripted combat uses positioning/invulnerability and does not establish human balance. joseph-browser.cjs exercises actual mobile controls, portrait, chain, charges, dialogues, defeat and 390×650 selector. Required older-character regression remains separate. Native Safari/human balance acceptance is pending.

Tom remains the next approved character build. Portrait thumbnails are a separate task requiring explicit approval after Joseph; do not silently begin that redesign.
