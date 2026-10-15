# Burntwood Wilds — development and release guide

This file is the permanent handover for future ChatGPT development sessions. Read it **before editing**. Treat the repository as authoritative; verify file contents, tests and current deployment instead of trusting old chat summaries.

## Project
- Repository: `stefangriffiths88-wq/Burntwood-Wilds`, branch `main`.
- Published game: `https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.html`.
- Mobile HTML Canvas roguelike with characters Ava, Jackson, Stefan, Jodie, Evie, Zak.
- Core files: `journey-v10/build.py`, `state.js`, `manifest.json`, `menu.css`, `ui/menu.js`, `characters/*.js`, `assets/portraits/*`, `assets/catalog.json`, `assets/ART_DIRECTION.md`, `test.cjs`, `browser.cjs`.
- The generated published HTML is `burntwood-journey-v10.html`.

## Operating procedure
1. Inspect relevant code, `assets/catalog.json`, `assets/ART_DIRECTION.md`, and actual artwork before changing anything.
2. Scope edits to the affected character, weapon, arena or upgrade module. Never globally alter difficulty to compensate for a single character's hit-detection issue.
3. Create a feature branch. Fetch files with their current SHAs. Make incremental commits, fixing errors without asking the user to restart the task.
4. Test changed modules first, then gameplay regression and mobile-browser checks. Inspect GitHub Actions job logs on failure; do not treat an unverified assertion as proof.
5. Check rendered artwork at real phone size. A green CI result cannot establish visual quality. Confirm image resolution, aspect ratio, cropping, readability and gameplay.
6. Merge only when checks pass, then confirm the **main-branch Pages deployment** completed. Give the exact versioned Safari URL with a cache-busting `?v=` parameter. Never call a branch preview a live release.
7. Give honest progress updates; don't stop at arbitrary percentages. If tools block an action, say exactly what is missing and what is still unpublished.

## GitHub connector workflow
Discover available `mcp__GitHub__*` actions in `functions.exec` using `ALL_TOOLS`. Previously working actions: `fetch_file`, `update_file`, `create_file`, `create_branch`, `create_pull_request`, `merge_pull_request`, `fetch`, `fetch_workflow_run_jobs`, `fetch_workflow_job_logs`. Read the tool's current schema; pass the latest file SHA when updating a text file.

To inspect Actions, GitHub REST `GET /repos/stefangriffiths88-wq/Burntwood-Wilds/actions/runs?branch=<branch>&per_page=3` is supported by the connector `fetch`. Check each run's `status` and `conclusion`, then fetch failing job logs. Do not merge while the latest relevant run is pending or failing.

### Binary image upload — crucial
Other character portraits were extracted from `burntwood-rewards-v9.html` by `journey-v10/assets/import_legacy_portraits.py`; **Zak was not**. The GitHub text `create_file` and `update_file` actions are for UTF-8 text, not image bytes. `create_blob` can accept Base64, but the blob must be placed into a Git tree, committed, and the branch ref updated. Discover `create_blob`, `create_tree`, `create_commit`, `update_ref` and inspect their schemas if needed. Verify actual source bytes are accessible before attempting upload. A local `/mnt/data` path is not automatically readable by a GitHub connector. Never substitute a tiny SVG-embedded thumbnail or claim the binary was committed when it wasn't.

For future art: obtain the approved full-size image, verify dimensions and exact character identity, upload it to `journey-v10/assets/portraits/<name>.webp`, confirm the GitHub tree reports realistic image byte size, update `catalog.json`, verify `build.py` references it, rebuild and check screenshot output.

## Portrait rules
Portraits are **not** playable sprites. Keep both independent. Never change an approved playable sprite while fixing its portrait. All six characters must use the same asset discovery in `build.py`; remove character-specific overrides when the replacement is available. Avoid multiple matching `<name>.webp/png/jpg/svg` files when the build expects exactly one. Preserve floating paws, no arms/legs/feet, and character-specific details from `ART_DIRECTION.md`. Check the actual image at display size, not only its dimensions.

## Zak — current state and unfinished portrait correction
- User approved the **Option A Street Zak** playable sprite in `journey-v10/characters/zak.js` (version 10.1.1) and says it is great. **Do not change it.**
- Keep Gas Blast ranged attack, Toxic Fart Cloud special, Gas-Powered Launch dodge and Zak-specific upgrades untouched.
- User approved a detailed **1024×1536** full portrait of Zak outside Sankey's Corner: teenage purple-grey cat, brown fringe, green eyes, sideways dark cap, dark hoodie, fluffy tail, detached paws, no limbs. The original was supplied as a chat image. A generated file was `/mnt/data/zak_sankeys_full_portrait.webp` in one session; verify it exists in the *current* session, never assume paths persist.
- **Known defect:** `build.py` hardcodes `zak-cap.svg` instead of normal `zak.webp`. GitHub tree on 2026-10-15: `zak-cap.svg` 2,057 bytes, `zak.webp` 3,276 bytes. Both are unsuitable low-resolution images. The correct full-resolution portrait has not been committed.
- **Fix:** Upload the *exact approved* full-resolution WebP binary, verify its GitHub size/content, remove the `zak-cap.svg` override and make the portrait registry resolve to `zak.webp`. Update catalog, retire obsolete placeholder appropriately, rebuild, test all character selection screens on mobile, run regression tests, deploy and verify. Do not claim complete until the actual live portrait is sharp and correctly framed.
- Never regenerate the portrait when the approved image is available. Do not change Zak gameplay, sprite, other characters or arenas for this fix.

## Character additions
Use each character's isolated module, unique portrait file, normal weapon, special, dodge and upgrade definitions. Add targeted tests. Preserve existing characters and arenas. A new character must not require ad hoc hardcoded portrait exceptions.

## Release checklist
- [ ] Changes are limited to intended modules and assets
- [ ] Artwork matches approved reference and is correctly framed at phone size
- [ ] All assets exist in GitHub at the correct resolution
- [ ] Version consistent in build and state
- [ ] Targeted tests pass
- [ ] Full regression and mobile tests pass
- [ ] Main branch merged and production Pages deployment succeeded
- [ ] Exact Safari game URL supplied

**Development should continue through fixes and retests in one working session when possible. Do not claim background execution after the response ends.**

## Verified image transfer procedure — 10.1.2
The approved full-resolution Zak image is now `journey-v10/assets/portraits/zak.webp` (1024×1536). All characters use identical build discovery; the obsolete zak-cap.svg is retired. Preserve the approved Street Zak gameplay module.

For future sessions: GitHub tools may be named `mcp__codex_apps__github_*`; discover current schemas. Recover attachment bytes through Library search and its current download helper. Read the local binary as Base64, call create_blob with encoding base64, include its SHA in create_tree based on the current main tree, create_commit with the branch head as parent, and update_ref with expected_sha. Verify the committed blob SHA against the local Git blob hash. Use feature branches and inspect CI and Pages deployment after merge. No personal access token or manual user image upload is needed with these connected operations available.
