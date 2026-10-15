# Visual standards — do not infer from old placeholders

The approved target is the user's **Burntwood Wilds character-selection and four-arena mock-up** supplied in the October 2026 conversation. The source reference image must be stored in this repository before claiming the game matches it. The screenshot is **not yet committed**. Do not regenerate it from memory or replace it with simple SVG geometry.

## Character artwork
- Warm, detailed, expressive animal characters, consistent lighting and depth.
- Rounded, clean silhouette; **detached floating paws, no arms or feet**. Paws are intentionally spaced apart and independently animated in gameplay.
- Distinct clothing, hairstyle and personality. In-game sprites need to remain readable at actual phone scale.
- Selection artwork and gameplay sprites are different deliverables; compare both against their references.
- Zak's approved full-resolution portrait is committed as `portraits/zak.webp` (10.1.2). The obsolete low-resolution SVG is retired.

## Zak — approved and released
- Kind, friendly 15-year-old with a decent, moderately broad build; purple cat, brown near-bowl-cut hair.
- Stylish dark hoodie **without a paw emblem**, textured folds and details; fluffy tail and floating paws.
- Warm Sankey's Corner street scene in selection portrait.
- Toxic Farts, Laughing Gas and Gas-Powered Launch are gameplay identities.
- Portrait correction completed in 10.1.2 and user-confirmed on 15 October 2026. Preserve the approved Option A Street Zak playable sprite.

## Arena direction
Local Burntwood locations, real wildlife with comic exaggeration; no generic fantasy crystals or monsters. Rugby Club, Chasewater, Sankey's Corner and Burntwood Quarry. The approved 10.6 update adds Chase Terrace Park and requires all five arena visits per run.

## Visual acceptance
Capture: all seven menu portraits, Zak portrait full-size, Zak in-game sprite idle/moving/attacking, and quarry arena at mobile viewport. Compare against approved assets and report mismatches before release. Automated loading tests are necessary but insufficient.


## Mandatory artwork preflight — before generating any concepts
1. Inspect `assets/catalog.json`, the existing six `assets/portraits/*.webp`, and relevant gameplay character module. Use the approved user-supplied screenshots where available; if missing, disclose that rather than improvising.
2. Compare silhouette, detached floating paws, absent arms/feet, proportions, costume, lighting, palette and local background with the existing selection art.
3. Create three variations **within the existing visual system**, not three unrelated game styles. Keep gameplay sprites unchanged unless explicitly requested.
4. Show concepts for user selection before replacing any asset; never integrate unapproved concept art.
5. Validate crop, phone-scale readability and character-selection presentation before release.
6. Keep artwork references and candidates catalogued separately from production portraits, and mark approved versus draft status explicitly.


## Approved Zak direction and character expansion procedure — October 2026
- User selected Zak portrait concept **Option 3: cap**. Maintain the established purple-grey cat, brown fringe, hoodie, floating paws without limbs, fluffy tail and Sankey's Corner background. The exact approved 1024×1536 production portrait is now integrated and user-confirmed; do not regenerate it.
- Target gameplay identity: automatic ranged **Gas Blast** weapon; **Toxic Fart Cloud** area special; **Gas-Powered Launch** dodge. Preserve the game's separate weapon/special/dodge upgrades and shared stat upgrades; don't let lingering-cloud gameplay be the only viable way to fight.
- New-character checklist: compare against existing six portraits; create independent `characters/<id>.js` module; register it in `manifest.json` and `registry.js`; provide character stats, PROFILES, five special upgrades, five dodge upgrades, weapon progression, five stat names, reset/update/draw and effects; verify selection UI, HUD, shop, save/progression and touch controls; test full combat and mobile selection; do not modify other characters to accommodate a new one.
- Keep concept artwork separate from production portraits, and get user approval before replacing portrait assets.

## Chase Terrace Park — approved gameplay direction
Native Canvas scenery: grass, crossing paths, benches, bins, hedges and swings. Rival cats have simple readable silhouettes and detached paws. Umbrella Man is a fictional slim, hunched, untidy cartoon figure with a closed/open umbrella, readable sweep/rush warnings, frontal guard and interruptible rubbish healing. Patch has a scar and torn-ear silhouette. Existing hero portraits and sprites are unchanged. New arena screenshots require release-owner inspection; human visual acceptance remains pending. Town placement is illustrative; accurate road geography requires an agreed map reference.

## Joseph — approved Hooded Training, 15 October 2026
Golden-orange tabby, green eyes, cream muzzle/paws, hood up with visible ears, black hoodie with red/green trim, tail and two detached paws. No arms/legs/feet. Native Canvas sprite follows Option 2 in references/joseph-approved-sprite-options.jpeg. Selection portrait is an unpainted 895×842 crop from the approved Rugby Club poster (source rectangle 66,178–961,1020), excluding poster text/buttons. All head/paws/tail remain visible. Original approved sources are preserved in assets/references. No thumbnail redesign in this build.

## Tom — approved tactical design, 15 October 2026
Selection: exact Option 3 (right pane) from references/tom-approved-portrait-options.jpeg, cropped 1024,0–1536,526 to remove number badge. 512×526 WebP, no repainting. Detailed muscular orange-brown tabby, green eyes, brown hair, olive tactical vest/paw badge and tattoos. Gameplay: compact broad torso and oversized head, tail and two detached floating paws from references/tom-approved-gameplay-reference.jpeg. No conventional limbs even where tiny concept frames have feet; explicit character specification takes priority. Selection portrait and native Canvas sprite remain separate. Title is The Wrecking Ball.

## Havannah — approved Tiny Rebel and blue eyes
Six-year-old girl cat, cream/ginger fur, blonde high side ponytail, yellow rectangular clip, plum hoodie with turquoise star, fluffy tail and direct menacing-cheeky gaze. Blue eyes are the user's explicit correction after selecting option 3; the approved portrait PNG is authoritative over the earlier green-eyed sprite sheet. Native Canvas gameplay has two detached floating paws, compact child proportions and no arms/legs/feet. Preserve approved 1024×1536 selection image; do not regenerate. Sources: references/havannah-approved-portrait.png and references/havannah-sprite-options.png.
