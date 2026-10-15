# Visual standards — do not infer from old placeholders

The approved target is the user's **Burntwood Wilds character-selection and four-arena mock-up** supplied in the October 2026 conversation. The source reference image must be stored in this repository before claiming the game matches it. The screenshot is **not yet committed**. Do not regenerate it from memory or replace it with simple SVG geometry.

## Character artwork
- Warm, detailed, expressive animal characters, consistent lighting and depth.
- Rounded, clean silhouette; **detached floating paws, no arms or feet**. Paws are intentionally spaced apart and independently animated in gameplay.
- Distinct clothing, hairstyle and personality. In-game sprites need to remain readable at actual phone scale.
- Selection artwork and gameplay sprites are different deliverables; compare both against their references.
- The current Zak SVG is a **placeholder** and fails the detailed portrait art target.

## Zak — approved direction, implementation pending
- Kind, friendly 15-year-old with a decent, moderately broad build; purple cat, brown near-bowl-cut hair.
- Stylish dark hoodie **without a paw emblem**, textured folds and details; fluffy tail and floating paws.
- Warm Sankey's Corner street scene in selection portrait.
- Toxic Farts, Laughing Gas and Gas-Powered Launch are gameplay identities.
- Do not call Zak finished until his actual portrait matches the supplied detailed reference and his in-game sprite matches the game's family style.

## Arena direction
Local Burntwood locations, real wildlife with comic exaggeration; no generic fantasy crystals or monsters. Rugby Club, Chasewater, Sankey's Corner and Burntwood Quarry. Keep three arena visits per run until user changes the rule.

## Visual acceptance
Capture: all six menu portraits, Zak portrait full-size, Zak in-game sprite idle/moving/attacking, and quarry arena at mobile viewport. Compare against approved assets and report mismatches before release. Automated loading tests are necessary but insufficient.


## Mandatory artwork preflight — before generating any concepts
1. Inspect `assets/catalog.json`, the existing six `assets/portraits/*.webp`, and relevant gameplay character module. Use the approved user-supplied screenshots where available; if missing, disclose that rather than improvising.
2. Compare silhouette, detached floating paws, absent arms/feet, proportions, costume, lighting, palette and local background with the existing selection art.
3. Create three variations **within the existing visual system**, not three unrelated game styles. Keep gameplay sprites unchanged unless explicitly requested.
4. Show concepts for user selection before replacing any asset; never integrate unapproved concept art.
5. Validate crop, phone-scale readability and character-selection presentation before release.
6. Keep artwork references and candidates catalogued separately from production portraits, and mark approved versus draft status explicitly.


## Approved Zak direction and character expansion procedure — October 2026
- User selected Zak portrait concept **Option 3: cap**. Maintain the established purple-grey cat, brown fringe, hoodie, floating paws without limbs, fluffy tail and Sankey's Corner background. Concept selection is not approval of a production asset crop; do not claim portrait integrated until it is.
- Target gameplay identity: automatic ranged **Gas Blast** weapon; **Toxic Fart Cloud** area special; **Gas-Powered Launch** dodge. Preserve the game's separate weapon/special/dodge upgrades and shared stat upgrades; don't let lingering-cloud gameplay be the only viable way to fight.
- New-character checklist: compare against existing six portraits; create independent `characters/<id>.js` module; register it in `manifest.json` and `registry.js`; provide character stats, PROFILES, five special upgrades, five dodge upgrades, weapon progression, five stat names, reset/update/draw and effects; verify selection UI, HUD, shop, save/progression and touch controls; test full combat and mobile selection; do not modify other characters to accommodate a new one.
- Keep concept artwork separate from production portraits, and get user approval before replacing portrait assets.
