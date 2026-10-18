# Earned rewards and clearer player flow — 10.17.0

Authorised 18 October 2026: “Ok let’s update these”. Small playtest fixes to 10.16.0. Runtime owner: implementation session; branch feature/earned-rewards-flow / PR75.

- Production level-ups require XP physically collected from defeated enemies. Remove automatic timed XP and waiting gates; retain existing per-area thresholds and six-choice cap. Legacy bounded combat fixtures explicitly keep their timed adapter; production tests must use enterArena.
- Rugby waves continue for120 active seconds, then ordinary enemies retreat without rewards and guidance leads to the objective. Retain physical guard/well/Bruce ordering. Predominantly does/stags, occasional rabbits, using existing combat roles without a global damage rebalance.
- Selecting a new charm automatically equips an empty slot. Only full equipment opens replace/bag choices. Preserve replaced equipment and duplicate copies; duplicate equipped charms use the bag rather than duplicate active slots.
- Rugby entrance is at the north/top of Bruce’s pitch. Persistent direction arrow, visible chevrons and large marker lead there. The action is ENTER; it returns to town and shows one short boss-specific Mimi screen about helping the area and using earned essence at the workshop. Preserve existing fifth-area ending until the separately agreed finale.
- Normal-attack upgrade cards use the selected hero’s approved icon. Special and defence upgrades share their gameplay-button icons; labels read NORMAL ATTACK / SPECIAL / DEFENCE. Preserve choices/ability effects. Correct Stef’s By Order! duration/damage/cooldown wording. His jab-hand change was cancelled and must not be implemented.

Ownership: upgrades/progression.js (XP); arenas/rugby-route.js and rugby.js / visuals/enemy-art.js (route and wildlife); world/reward-flow.js (equip/exit/arrival); ui/ability-art.js, clarity.js and upgrades/feedback.js (icons/labels); characters/stef.js (wording). Generated outputs only through build.py. Approved portraits/save schema unchanged.

Validation: production XP pickup/no-time-award contracts across five areas,50 hero/area chest/equip/return flows, actual movement to the Rugby exit, two-minute real route navigation, seeded deer mix, matching all-ten ability icons and phone portrait/short/landscape screenshots. Required feature CI before merge, then Pages/public-byte verification. Protected legacy simulations are compatibility evidence, not native Safari or human balance acceptance.

Separate pending work: low incoming-damage investigation and hit feedback; Mimi opening; Cow Queen/husky finale after five areas, final lead-in and approved cat-food victory line. No implementation of these in10.17.0.
