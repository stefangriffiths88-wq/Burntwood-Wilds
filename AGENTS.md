# Burntwood Wilds — repository agent instructions

**Before any game update:** read `DEVELOPMENT_GUIDE.md`, `PROJECT_STATUS.md`, `journey-v10/README.md`, `journey-v10/assets/ART_DIRECTION.md`, `journey-v10/assets/catalog.json`, and the affected source modules. Verify current main and open PRs; do not rely on old chat summaries. The status file records the latest verified release; documentation does not supersede live code.

## Ownership and safety
- One Work session owns gameplay/release changes at a time. A parallel audit chat may update documentation only. Do not collide with an active feature branch.
- The maintained source is `journey-v10/`; `manifest.json` determines JS concatenation order. `journey-v10/game.js` and published HTML are **generated**, never edit directly. Keep historical versions and public links working.
- Scope character bugs to the character and its shared dependencies; do not silently rebalance every arena. Keep shared XP, rewards, collision and transitions consistent across heroes.
- **Character completion gate:** concepts and approved portraits are not permission to integrate. Obtain explicit approval of the complete portrait, playable sprite, normal attack, special, dodge, effects, upgrades and stats before implementing. Implement on a feature branch; do not release placeholders or partially complete heroes.
- All approved selection art is stored as individual assets in `journey-v10/assets/portraits/`. Gameplay Canvas sprites are separate; verify both against approved references. Zak's approved WebP and Mimi's approved PNG are committed production assets. Do not run legacy portrait import scripts for routine updates.
- Public repository: never upload private family photos, court material or secrets.

## Change and release contract
- Translate informal feedback into a targeted reproducible change. Use proportional focused tests during development, and required release checks before merge. Browser automation is not native iPhone Safari; scripted invulnerable runs are not evidence of human balance.
- Give honest progress checkpoints, with the five-block progress bar for meaningful updates. Respect explicit pauses.
- Build with `python3 journey-v10/build.py`, but **be aware that current CI auto-commits generated files**. Avoid concurrent feature/release pushes and check for CI-created commits; separating verification and publication is a priority future refactor, not yet implemented.
- Merge only tested complete work. Verify main-branch Pages, publish an exact versioned playable link and update `PROJECT_STATUS.md` with commit, tests, limitations and user playtest status.
- Do not reorganise or rename gameplay paths during another Work update. For structural cleanup, first update docs, then isolate build/CI refactors, then modular extraction, each with its own tests and rollout.
