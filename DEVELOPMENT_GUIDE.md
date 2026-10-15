# Burntwood Wilds — development and release guide

This file is the permanent handover for future ChatGPT development sessions. Read this file and `PROJECT_STATUS.md` **at the start of every chat and before editing**. Treat the repository as authoritative; verify file contents, tests and current deployment instead of trusting old chat summaries.

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

## Zak — released and user-confirmed in 10.1.2
- Approved full-resolution portrait: `journey-v10/assets/portraits/zak.webp`, 1024×1536, 249,644 bytes; exact Git blob `9ddf170497d78b5160a375f8b5d6041cff2d91fb`.
- All portraits use the same build discovery. The low-resolution override and zak-cap.svg are removed.
- Option A Street Zak gameplay sprite and Gas Blast / Toxic Fart Cloud / Gas-Powered Launch remain unchanged. User confirmed the portrait update worked perfectly.
- Do not redesign or replace this approved portrait or sprite without a new user request.

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

## Permanent working agreement
- Carry the authorized development cycle through investigation, smallest effective modular fix, affected-system tests, independent corrections, final necessary regression/mobile checks, merge, deployment and live verification. Do not stop after each step.
- Ask only for essential missing assets, creative choices, permission genuinely required, or significant scope changes. Preserve established systems and approved designs.
- Keep characters, arenas, weapons, upgrades, enemies, progression and interface settings independently configurable. Diagnose collision/registration before changing damage or difficulty.
- During iteration test affected modules and dependencies; run the necessary broader checks once stable. Repeat passed tests only when new changes or failures justify it. Inspect actual CI logs and rendered phone-size output.
- At meaningful checkpoints give a five-block progress bar, approximate percentage, completed work, current work, blockers and remaining release steps. Never equate estimates with proof.
- Evaluate improvements to implementation, testing, upload, communication and publishing; record proven improvements here and update relevant architecture/art documentation.
- At each completed update maintain PROJECT_STATUS.md with released version, completed features, design decisions, test evidence and limits, known problems, outstanding work and exact next priorities. GitHub is authoritative technical continuity.
- Once the workflow is verified, ask whether the user wants stable preferences reflected in ChatGPT Memory. Asking is not a memory write; never claim a memory update without confirmation from an available memory capability.
- Documentation-only housekeeping does not require a game-version bump or repeating gameplay tests. Check the diff and links; keep any triggered required checks green.


## Two-chat coordination and safe ownership
The user may develop gameplay in a separate ChatGPT Work chat while another chat audits progress and improves documentation. **Only one session owns gameplay implementation and releases at a time.** The audit chat must not modify gameplay, assets, version numbers, build scripts, CI workflow or PROJECT_STATUS.md during active development unless the user explicitly transfers ownership. Documentation edits should be limited to DEVELOPMENT_GUIDE.md or dedicated workflow notes and committed in a separate docs-only branch. Before opening a PR, inspect current main and active PRs; recheck the diff and branch head before merging. If there is a merge conflict or active release, pause the docs merge rather than overwrite Work's changes.

## One-request development contract
User input may be informal (e.g. "Evie's hits aren't registering"). Translate it into a small internal work ticket with: reported behaviour, expected behaviour, affected character/arena/system, likely owned module, reproduction steps, acceptance criteria, and whether any design approval is needed. Do not make the user fill out a form or repeat known context. First reproduce or identify evidence; fix the root cause rather than globally changing balance. Only request clarification if different plausible interpretations materially change the work.

Use three change classes:
- **Quick fix:** targeted implementation and focused test, followed by release smoke checks.
- **Feature update:** owned-module and dependency tests, then gameplay/mobile regression.
- **Major change:** staged implementation and explicit user playtest for substantial design decisions, then full release checks.

Don't rerun an unchanged full suite after every small edit. However, never skip required pre-merge checks or tests of shared dependencies.

## Release handover and user feedback
At the end of a verified release, update PROJECT_STATUS.md with: release version, exact commit SHA and PR, production URL, changed modules, passed test runs and screenshot evidence, known limitations, pending feedback, and the next action. Do not mark a reported issue resolved merely because CI passes; distinguish **implemented**, **automated checks passed**, **deployed**, and **user playtested/accepted**.

Record playtest feedback in a compact section of PROJECT_STATUS.md (or a dedicated feedback log once it becomes lengthy), with: release tested, character/arena, user-observed behaviour, expected behaviour, reproduction notes if known, investigation status, fix commit and user acceptance. Avoid inventing causes or test results.

When the user reports a bug, the next response should briefly restate the interpretation and proceed with diagnosis, not repeatedly solicit approval. When a release is ready, provide the full Safari URL and a short summary of what specifically needs the user's playtest.

## CI and build improvements to evaluate separately
The existing `.github/workflows/journey-v10.yml` generates files and may commit/push them during a test run. **Do not alter this while another chat is developing.** In a dedicated future change, evaluate separating deterministic build/verification from publication: build generated outputs in CI, fail if tracked generated files differ, upload screenshots as artifacts, and let the release owner commit generated outputs explicitly. Add a check that artwork files exist and meet expected dimensions (with documented exceptions). Evaluate automated release gates/branch protection appropriate to the repository. These are proposals, not completed changes.

## Proven art-upload continuity
Zak 10.1.2 established a working binary upload method; preserve the exact verified procedure above. For each new portrait, require an approved source, source-byte checksum, committed blob verification, dimension check, selection-screen screenshot, and an explicit distinction between automated visual inspection and the user's final playtest. Never require the user to manually use GitHub when a verified connected upload route is available.


## One-command character creation — user trigger: "Build a new character"
Treat "build a new character" (or equivalent) as a request to **start the established character-creation pipeline**, not as permission to invent a final design and deploy it immediately. The user should only have to describe the character in natural language, select a concept, approve its gameplay identity and playtest the result. Do not ask them to navigate GitHub, edit code or repeat established art rules.

### Phase 1 — recover existing design system
Before generating concepts, inspect all six current approved production portraits, `assets/catalog.json`, `assets/ART_DIRECTION.md`, `characters/*.js`, `registry.js`, `manifest.json`, selection UI, character upgrades and tests. Check which user-approved reference images are accessible; never claim to have seen an unavailable reference. Identify common visual rules (warm detailed cartoon portraits, coherent lighting, floating detached paws, no conventional arms/feet, consistent mobile framing) and gameplay interfaces. Do not copy another character's identity or overwrite an existing asset.

### Phase 2 — present concepts, then get approval
Ask only for an essential missing creative anchor if none is provided (for example animal/personality or character name); otherwise propose imaginative defaults. Generate **three genuinely distinct character variations within the same established game style**. Show visual concepts if image-generation capability is available; do not substitute text descriptions while claiming images were generated. Keep draft artwork separate from production assets. Briefly explain the visual distinctions and suggest possible unique combat identities. Invite the user to choose one or request alterations. **Do not integrate unapproved artwork or deploy a character before approval.**

### Phase 3 — gameplay proposal and modular implementation
After concept selection, propose an individual gameplay package: normal automatic weapon/attack, special ability, dodge, upgrade paths, stats, movement/attack effects, strengths, weaknesses and readability at phone scale. Avoid duplicating an existing hero's mechanics or introducing an obviously dominant character. Obtain approval for consequential creative choices, then implement a new independent `characters/<id>.js` module. Follow the actual interfaces in existing characters and register the new hero in `manifest.json`, `registry.js`, selection/HUD, upgrade/progression/shop systems as applicable. **Do not edit other characters' behaviour or global enemy difficulty merely to make the new hero work.** Keep arena rules unchanged unless explicitly requested.

### Phase 4 — approved artwork and verification
Generate or obtain the approved full-resolution selection portrait and appropriate gameplay sprite/animation. Verify exact identity, dimensions, detached paws, tail/costume details where relevant, phone framing and contrast. Use the verified GitHub binary upload method; verify source hash against committed blob, portrait registration and screenshot appearance. Test new hero selection, portrait loading, touch movement, automatic weapon, special, dodge, upgrades, effects, progression and save/load if present. Run affected tests during iteration, then required wider regression/mobile tests before release. Check other heroes are unchanged.

### Phase 5 — ship, playtest, preserve
Merge only after required checks pass, confirm production Pages deployment, provide full cache-busted Safari link and ask the user to play the new hero. Record approved visual and gameplay specifications in `assets/catalog.json` and relevant character docs; update `PROJECT_STATUS.md` with version, commit, evidence, playtest status and known issues. Treat user feedback as a focused change request. The command should become progressively more automatic as the pipeline is proven, but never skip approval or claim an unverified visual test.

### Future automation opportunity
Once two or more new characters have been shipped successfully with this process, evaluate a reusable character scaffold/generator that creates a new module, registry entries, portrait path, upgrade templates and test fixtures. Do not introduce a speculative generator or refactor the entire character system while another Work chat is actively developing an arena. Document a working scaffold only after testing it against the real repository.
