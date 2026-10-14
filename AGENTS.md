# Burntwood Wilds collaboration and source rules

- Continue the existing game. Preserve earlier versioned pages. Read current main source before editing.
- Current maintained source: `journey-v10/manifest.json` lists editable files. `journey-v10/README.md` describes ownership. `game.js` and the playable HTML are generated: edit owned source, then run build.py. Do not rerun one-off migration scripts.
- Characters, arenas and shared progression have separate owners. A character-specific bug must not be compensated for by silently changing arena difficulty. Diagnose hit registration before adjusting damage. Arena changes apply equally to every character using that arena.
- Keep one shared XP/choice/scaling/transition system for all heroes. Character-specific attack/special/dodge paths and values belong to that character's file. New arena definitions must work with the existing roster.
- New significant releases get a new versioned HTML and update `latest.html`. Show a visible build identifier. Keep delivering a direct playable GitHub Pages link, without manual downloads/uploads or extra sites for the user.
- Keep progress updates during work, with a simple five-block bar and honest approximate percentage. Explain current stage and remaining work. Never report 100% before tests, deployment and public-link verification succeed.
- An explicit pause means stop edits/publishing and examine/discuss only. Resume only when instructed.
- Match verification to the change: character changes test that hero and affected upgrades; arena changes test its content with ranged/melee heroes; shared-system changes test all affected heroes. Every release gets build/syntax/loading/control smoke checks. Reserve complete journey suites for shared changes or unexplained failures; do not repeat successful broad checks for cosmetic changes. Tests that directly grant powers alone do not establish that real level-up cards work.
- State actual test limits. Desktop/mobile Chromium is not native iPhone Safari. Invulnerable simulations test mechanics, not human balance.
- Public repository: do not upload private family photographs, credentials or court material. Approved game portrait assets already embedded in builds are game assets.
