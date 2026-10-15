# Burntwood Wilds — maintained game architecture (10.0.6)

## Read this first when continuing in another chat
The only maintained gameplay is **journey-v10/**. Read `AGENTS.md`, this document, `assets/ART_DIRECTION.md`, `assets/catalog.json`, and `manifest.json` before editing. The public entry point is `latest.html`; the generated playable file is `burntwood-journey-v10.html`.

**Do not edit** `journey-v10/game.js` or `burntwood-journey-v10.html` directly. Build with `python3 journey-v10/build.py`. Do not modify old prototype files or delete historical versions.

## Ownership and file map
- `characters/{ava,jackson,stef,jodie,evie,zak}.js`: gameplay stats, unique abilities, Canvas sprite drawing, upgrades.
- `arenas/{rugby,chasewater,sankeys,quarry}.js`: per-arena visuals, waves, enemies and bosses.
- `assets/portraits/<character>.<format>`: one selection portrait per hero. **Replace the file to change the artwork**, not the build script.
- `assets/catalog.json`: artwork status, approval, and reference/implementation gaps.
- `assets/ART_DIRECTION.md`: binding visual style and review checklist.
- `world/hub.js`: four destinations, three arenas per run; `world/shrines.js`: optional shrines.
- `upgrades/progression.js` and `upgrades/rewards.js`: shared upgrade and rewards logic.
- `state.js`: state and version; `registry.js`: character/arena dispatch; `engine/core.js`: common engine.
- `ui/menu.js`, `controls.js`, `menu.css`: selection and mobile controls.
- `manifest.json`: explicit ordered JS sources.

## Artwork pipeline
1. Preserve the approved reference in the asset directory (or record that the reference has **not yet been uploaded**).
2. Mark approval and intended usage in `assets/catalog.json`. Do not mark a placeholder approved.
3. Add/replace a single portrait asset. The build fails if a portrait is missing or duplicated across extensions.
4. Implement matching in-game animation in its character module. Keep floating paws detached, no conventional arms or feet.
5. Build and compare actual mobile menu screenshot and gameplay sprite against approved references. Technical tests alone do not prove a visual match.
6. Run targeted regression tests and browser smoke checks; publish only after review.

Existing approved five portraits are recovered from the historic v9 build by `python3 journey-v10/assets/import_legacy_portraits.py` **once**; the script never overwrites them. Zak's current SVG is recovered as an explicitly unapproved placeholder. Once these files are committed, the build uses files rather than embedded portrait data. **The user's newer detailed Zak reference is not yet a repository asset.**

## Known technical debt (do not silently broaden changes)
- The HTML shell and some CSS are still inherited from the historical v9 page. The portrait data itself is now replaced by explicit asset paths; eventually extract the HTML shell into a maintained template.
- Gameplay sprites are still Canvas functions, not external sprite sheets; character artwork and gameplay visuals are separate and must be compared.
- Version strings still occur in more than one location; build and state should agree, and release tests should assert this.
- The legacy versioned HTML files and older workflows remain intentionally archived in-place. Do not treat them as active source.
- Mobile Chromium automation is not equivalent to iPhone Safari validation.
