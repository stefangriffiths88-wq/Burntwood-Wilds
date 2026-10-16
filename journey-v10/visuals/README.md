# Character presentation — 10.10.0

User authorized a full playable-sprite consistency pass, 16 October 2026.
Jodie is the adult baseline. Jackson (11) is small/slim; Ava (7) is smaller.
Joseph is larger than Ava. Evie is slightly larger/rounder than Jackson.
Zak is Jodie's height with a broad athletic torso. Stefan is the tallest and slim.
Tom remains stocky; Havannah retains young-child proportions; Mimi is medium sized.

Character modules own their visual proportions, costume, expressions and animations.
`cat-art.js` shares drawing primitives, not character identity or gameplay state.
Town uses exactly the same character sizes; old town-only corrective multipliers removed.
Portrait files and historical releases are unchanged. No stats, collision, attack reach,
projectiles, upgrade effects or motion timing are retuned by this visual update.

Sizes refer to silhouette, not identical pixel boxes: hats, hair, weapons, tails and
animated paws extend outside bodies. All base player collision radii remain 14.
Stefan's floating coat has one continuous hem, no trouser/leg silhouette.
Older heroes get larger readable eyes, chibi faces, outfit seams and detached paws.
Mimi gets expressive layered eyes and cloth detail. Newer native drawings keep their
identity, with local body scaling that never scales world-space attack effects.

Validate all ten in arena and town at 390x844 and 390x650; compare idle and active
attacks. Mobile Chromium is not native Safari or final user visual acceptance.

## 10.10.1 — measured height correction
User specified Stefan 6ft3, Jodie/Zak 5ft10, Jackson 9 inches shorter
(5ft1), Evie one inch taller than Jackson (5ft2). Height ratios are
75:70:70:61:62, measured from opaque front-idle silhouettes, excluding
translucent shadows. Jodie remains unchanged at roughly 57 world units.
Jackson ~49.5, Evie ~50.5, Zak ~57, Stefan ~61. These are raster measurements,
not assumptions based on scale constants. Uniform corrections retain build;
Jackson stays slim, Evie rounder, Zak athletic and Stefan slim/tallest.
Ava, Havannah, Joseph, Mimi and Tom retain their established sizes.
Paws/effects that communicate combat reach retain their existing coordinates.
Browser visual checks assert actual rendered relative heights within 1.2%.
User visual acceptance remains pending.
