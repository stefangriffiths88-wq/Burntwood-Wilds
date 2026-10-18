# Immy — The Wildheart

Design locked18 October2026: user selected option2 sprite, approved portrait and proposed Druid package, then explicitly authorised “I’m happy for you to build it and put it in”. Independent characters/immy.js; no changes to other hero balance or arena difficulty.

Identity: smoky-grey/cream cat, long brown-to-blonde hair, clear glasses, red hoodie, detached cream paws and fluffy grey/cream tail. Normal/native sprite and approved detailed portrait are separate.

Starting110 health,146 movement,16 weapon damage,0.7s interval. Bramble Lash165 range/0.36-radian half arc, up to205 range,25% damage,wider0.65 arc,20% faster, every third second lash at65%. Wild Form6s (upgrade8),105-range1.15-arc claws at1.6x (upgrade2x),25%-max-HP consumable shield (upgrade40%),20s cooldown (upgrade16), final40-damage145-radius burst at rank5. Never heals, changes max HP or collision radius; pause freezes duration, exit/new run resets.

Rootstep0.22s440-speed directional collision-respecting dash, brief damage avoidance,2.2s cooldown. Leaves48-radius1.4s roots: ordinary enemy held once0.65s, bosses/heroics only slowed. Upgrades20% distance,2.2s patch/1.1s hold,72-radius,1.65s cooldown,one20-damage burst when leaving. At most4 root patches/8 lash visuals. Shared defence guard/evolutions still apply; generic replacement defence upgrades/burst are bypassed only for Immy.

Public TEST_ROSTER_UNLOCK=true reveals/selects all11 heroes for testing without changing persistent unlock flags. Shops still require first final boss victory. Retained lock-rule tests explicitly turn the toggle off; new Immy browser verifies actual default public access with no privileged fixture. Toggle is temporary; saved earned progression stays intact.

Local focused tests and required release CI/phone review tracked in PROJECT_STATUS/WORK_CHECKPOINT. Protected scripted tests do not prove native Safari or human balance.

##10.19.1 approved Wild Form revision
User chose quadruped lynx option2 and authorised Update on18 October2026. visuals/immy-lynx.js owns a genuine four-legged animal body, idle, running gait, left/right/front/rear presentation and attached forepaw swipe. drawImmyBody dispatches to it only during Wild Form. No combat or collision changes; normal portrait/sprite retained.
