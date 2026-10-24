# Burntwood Wilds — development and release guide

This file is the permanent handover for future ChatGPT development sessions. Read this file and `PROJECT_STATUS.md` **at the start of every chat and before editing**. Treat the repository as authoritative; verify file contents, tests and current deployment instead of trusting old chat summaries.

## Continuous continuity — user direction, 16 October 2026

Stef has lost chats to the conversation limit without an opportunity to request a handover. Do not rely on a final prompt or a warning: the assistant cannot reliably see remaining chat capacity or guarantee an advance warning.

- Treat this guide as a living working agreement. Whenever a workaround, correction, communication preference or verified process improvement is established, persist it promptly with its date, reason and replacement rule. Consolidate superseded guidance rather than leave contradictory instructions. Clearly distinguish proposed workarounds from proven ones.
- Save meaningful decisions and approved designs as they are agreed, including approval scope, rejected approaches and why, known defects and reproduction, and pending user acceptance. Preserve approved source assets in the appropriate project records. Never put private family material or secrets in this public repository.
- The implementation owner must commit recoverable work at meaningful milestones (a completed module, resolved blocker, approval or test checkpoint), before a long operation or change of phase, and before ending a working turn. Do not wait until release or imminent chat exhaustion. Small coherent commits are preferred over repeating unchanged tests.
- Keep a concise dated working checkpoint on the active feature branch: owner/session role, branch and exact commit, goal/authorization, completed work, in-progress/remaining work, affected files, latest tests and failures, approved decisions/assets, blockers and exact next action. Link it from the PR body as soon as the PR exists. Distinguish committed work from unsaved local work and implemented from tested/deployed/user-accepted.
- PROJECT_STATUS.md remains the verified release record. Active work belongs on its owner's branch/PR; do not label an unfinished candidate as the live release or overwrite another session's status. An audit chat records review findings and workflow improvements only, on a separate documentation branch.
- After saving, verify the remote file/commit/ref exists and give a short checkpoint link. An uploaded blob, local file, chat memory or promise to save is not a repository checkpoint. If saving fails, state what remains unsaved and provide a compact copyable recovery note immediately.
- Every new chat must read AGENTS.md, this guide and PROJECT_STATUS.md, then inspect current main, open PRs, active branch checkpoints, latest commits and relevant CI/Pages evidence. Resume the recorded next action; do not rebuild already completed work, regenerate approved art, repeat rejected approaches or rerun unchanged checks merely because the chat is new. Resolve contradictions using current source and the latest explicit user instruction; ask only for genuinely missing decisions.
- A handover prompt is a convenience, not the source of truth. "Continue Burntwood Wilds; read the repository instructions and active work checkpoint" should be enough when the repository checkpoint is current.
- Keep ownership explicit: this audit chat is review-only except for expressly requested workflow documentation. Suggestions do not authorise game implementation. Never edit, merge or publish competing gameplay changes.

This routine reduces loss of project knowledge; it does not automatically archive every chat message. Do not claim another chat's unpublished/local work has been recovered or saved without verifying it.

## Project
- Repository: `stefangriffiths88-wq/Burntwood-Wilds`, branch `main`.
- Published game: `https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.html`.
- Mobile HTML Canvas roguelike with characters Ava, Jackson, Stefan, Jodie, Evie, Zak, Mimi, Joseph, Tom and Havannah.
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
Portraits are **not** playable sprites. Keep both independent. Never change an approved playable sprite while fixing its portrait. All characters must use the same asset discovery in `build.py`; remove character-specific overrides when the replacement is available. Avoid multiple matching `<name>.webp/png/jpg/svg` files when the build expects exactly one. Preserve floating paws, no arms/legs/feet, and character-specific details from `ART_DIRECTION.md`. Check the actual image at display size, not only its dimensions.

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
Before generating concepts, inspect all current approved production portraits, `assets/catalog.json`, `assets/ART_DIRECTION.md`, `characters/*.js`, `registry.js`, `manifest.json`, selection UI, character upgrades and tests. Check which user-approved reference images are accessible; never claim to have seen an unavailable reference. Identify common visual rules (warm detailed cartoon portraits, coherent lighting, floating detached paws, no conventional arms/feet, consistent mobile framing) and gameplay interfaces. Do not copy another character's identity or overwrite an existing asset.

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


## Mandatory character completion gate — lessons from Mimi
**No unfinished character may enter the playable game, production character selection, main branch or public release.** Starting a character-design conversation, choosing a concept or approving a portrait does **not** authorize implementation or deployment. In particular, do not begin integrating a character while the user is still deciding or revising moves and artwork.

Use explicit lifecycle states:
1. **Concept in progress:** brainstorm names, personality, silhouettes and combat ideas; draft artwork stays outside production assets.
2. **Design awaiting approval:** assemble one complete character specification covering final approved selection portrait, in-game sprite/animation direction, normal weapon, special ability, dodge/mobility, their effects and visual animations, upgrades, stats and identity. Mark missing decisions visibly.
3. **Design locked:** the user has clearly approved **the entire specification**, including all moves and artwork. Record approval and a versioned specification in a non-production design record. Approval of one element is not approval of the others. If the user requests a design change, reopen the gate and wait for renewed approval of the affected specification.
4. **Implementation on isolated feature branch:** only after design lock, build and test the complete character off main. A draft branch must not trigger public Pages publication; do not merge or expose unfinished character through selection. Production asset directories should contain only approved artwork.
5. **Release ready:** all approved art and moves are implemented, visual assets are verified, character-specific and regression/mobile tests pass, and no placeholders, missing upgrades or disabled mechanics remain. The user must approve any intentional change from the locked design.
6. **Released / awaiting playtest:** merge, verify public deployment and provide the playable link. Record user feedback separately; post-release balancing remains allowed through focused updates.

**Pre-integration checklist (all required):** approved portrait; approved gameplay sprite/animation direction; normal attack and its visual effects; special and effects; dodge and effects; upgrade paths; starting stats; gameplay strengths/weaknesses; confirmed name/identity; any character-specific interaction; user confirmation that character design is complete. Ask one concise question about remaining missing decisions, rather than asking for each item individually. Do not interpret "build a new character" as permission to skip this gate.

**Mimi-specific instruction:** the user reports that Mimi's Work session began processing/integrating her before the design was finished. If that session is still active, its release owner must stop any merge/publication until Mimi's full final artwork and move set have been explicitly approved and implemented. Existing draft work may be retained on a private feature branch; do not discard useful work or overwrite the approved design. This documentation change alone does not stop an already-running Work task; the user should tell that session directly to respect this gate.

**No speculative production:** do not add placeholder heroes, partially wired selection buttons, unapproved portrait substitutions or temporary attacks to main merely to demonstrate progress. If an early playable prototype is specifically requested, keep it isolated and label it as a prototype, never a production release.

## Binary transfer verification refinement
Large exec output can truncate Base64 even when an upload succeeds. Read binary in chunks (for example 99,999 bytes, a multiple of three), concatenate complete Base64 chunks, and compare local Git blob hash with create_blob SHA before committing. Correct a mismatched blob before merge.

## Town interaction verification
Town residents and boss previews are presentation only: preserve the selected hero, player object and combat state while reusing character renderers. Test every hero selection for unique resident identities and the correct shopkeeper. Verify boss taps with viewport-to-world coordinates and drag/repeat/cleared guards. Reset scroll when opening reused shop panels; inspect both keeper greetings at phone size. See journey-v10/TOWN.md.

## First-item acquisition checks
For shared loot systems, test every hero starting with empty equipment through the real spawn/defeat/choice path. Tests that pre-equip builds verify effects but cannot alone prove first acquisition. Keep encounter lifecycle independent of item proc state. Record reported build/version separately; never claim an unreproduced user symptom is fixed solely because tests pass. Share latest.html as the stable entry alongside the exact versioned release link; old versioned pages remain old builds.


## Structural audit handover — 15 October 2026, verified 10.4.1
The audit of main found seven playable heroes, four arenas, 12 charms, living town, separate heroic encounters and passing main CI/Pages for 10.4.1. `AGENTS.md` and `journey-v10/README.md` have been refreshed to remove obsolete Zak placeholder and six-hero claims. This documentation update is **not** a game-code refactor.

**Confirmed risks and priority order:**
1. CI `.github/workflows/journey-v10.yml` runs the one-time portrait importer and auto-commits/pushes generated assets/HTML during tests. In a dedicated release-owner task, separate read-only validation from explicit publishing; preserve artifacts, branch safety and required checks.
2. `journey-v10/build.py` slices its HTML shell from `burntwood-rewards-v9.html`, uses string replacements to insert heroes/UI and hardcodes portrait names and release numbers. Extract an owned template and centralised metadata in a separate carefully tested update. First compare byte output, DOM IDs, artwork, mobile screenshots and published entry points.
3. `manifest.json` has manual concatenation order and source files use shared globals. Introduce a static registration/manifest consistency check before changing module loading; avoid speculative rewrites.
4. The repository root contains numerous historical HTML prototypes and legacy workflows. Do not delete or relocate public HTML without an inventory of live URLs and redirects. Deactivate obsolete workflows only after checking triggers and history.
5. Tests and generated results sit alongside source. Move or reorganise only after CI path updates and smoke checks; optimise focused tests while retaining required release gates.
6. Character art/catalog and character registrations need a single verifiable approved specification before implementation; preserve the character completion gate.

**Execution protocol:** audit and docs are owned by the oversight chat; game implementation remains with Work. Future Work must read this section before starting the next feature, but should **not** interrupt an active update for a sweeping restructure. Propose a small dedicated maintenance release: first CI write-safety, then template/version centralisation, then character/arena registration checks, then measured module extraction, then archival cleanup. Each phase is separately reviewable, reversible and validated on mobile; do not combine a restructuring phase with new character/arena gameplay.

## Saved progression verification — proven in 10.5.0
Keep persistent roster progress separate from run equipment/coins. Validate imported schema, balances, hero IDs and rank bounds before replacement; require an explicit restore confirmation. Commit a purchase to browser storage before changing in-memory currency/ranks. Preserve corrupt saves and provide a backup path when storage is unavailable. Deduplicate boss awards and test both final/heroic defeat orders. Snapshot bonuses per journey and refresh at its first arena entry so starting-town purchases work without changing a journey midway. Test a real browser reload, unavailable storage and invalid/corrupt restores alongside unit checks. Document browser-local storage and the absence of automatic device sync.

For town UI, keep the hub renderer active behind paused conversations and shop panels. When mobile tests change viewport size, wait for the canvas resize before converting map taps. Verify post-run town access, wounded boss retention and an explicit fresh-run transition. See journey-v10/TOWN.md for current ownership and save schema.

## Five-area build verification (10.6 source)
Keep charm identity/rarity, effect processing, economy and stat aggregation in their respective modules. Use builds-test.cjs for rarity boundaries/caps, growth, old-save migration, starter and reroll transactions, crit conflicts and bounded Park healing. Retain first-acquisition checks for every hero/arena and the actual-attack charm matrix/journeys. When changing intentional pacing rules, update stale test expectations explicitly; do not remove unrelated combat assertions. Inspect 390×844 and 390×650 inventory/shop/rarity/boss screenshots before merge. Generated images are unnecessary for native Canvas arena additions; never replace approved hero art for a systems update.

## Release evidence and critical-hit integration — proven in 10.6.0
Verify the exact final branch head after fixes, not an earlier successful run. Inspect refreshed phone screenshots after CSS changes; a green tap test can miss overlapping labels or HUD controls above a modal. Capture valid AI timers and disable screenshot animations for reliable visual review. Keep inventory controls below upgrade overlays, and rarity labels separate from price grid cells.

When multiple systems can create a critical hit, calculate one final multiplier and reset guarantee counters for every actual critical. Test through the real damage pipeline, including shrine effects and critical-suppression items; direct helper tests alone can miss double multiplication.

Record the tested commit, workflow run IDs, public-file comparison and explicit simulation limits in PROJECT_STATUS.md. Generated test-result JSON is an example run, not a substitute for the final workflow artifact. Keep accurate road geography pending a user-agreed reference, and record deferred work rather than silently inventing it. The 10.6 release used hash-verified UTF-8 blobs, a tree, commit and expected-SHA branch update through the connected GitHub tools; images were unchanged.

## Character combat and approved-source extraction — Joseph/Tom workflow
Keep optional character motion and damage-avoidance hooks in the registry; heroes without hooks retain existing movement/hurt behaviour. Own the new hero's counters, wave hit sets, swept contacts, dash recharge and bounded effects inside its module. Use reset hooks at new run, arena and town transitions. A small optional enemy renderer can show launch height without changing hitboxes or unrelated AI. Test overlapping third/fifth effects with exact damage and prove extra hits do not recurse. Test all fifteen upgrades through actual choices, every charm, anchored boss damage and all arena boundaries before broad regression.

Approved poster/concept sheets must be preserved as binary references. Extract the exact approved image pane without repainting or upscale claims; record source checksum, crop rectangle, output dimensions, committed blob hash and approval status in the catalog. Verify source image bytes locally before Base64 upload. Confirm the image-bearing tree commit, not only the blob. Selection portraits and native Canvas gameplay sprites remain separate.

Check portrait/ability/defeat/town screenshots at 390×844 and 390×650. Long round-button labels may need a compact alias (Tom uses QUAKE; full Earthquake name remains in profile/upgrades). Preserve touch widths as the name-button roster grows; portrait thumbnails remain a separately approved future UI task. Scripted protected combat tests and mobile Chromium are not human balance or native Safari acceptance.

## Verified 10.9.0 continuity — repeatable working agreement
- Start each session by checking current main, latest production Pages deployment, open PRs, running CI, PROJECT_STATUS.md, AGENTS.md, this guide, and affected source. Never trust an older chat handover over GitHub.
- Treat user feedback as a focused ticket: observed versus expected behaviour, character/arena, reproduction, owned module, acceptance criteria. Investigate hit registration, collision, cooldown and state before altering strength or global difficulty.
- Preserve independent modules for characters, arenas, enemies, upgrades, charms, UI and assets. A new duck, enemy or upgrade should not require retuning unrelated characters or arenas. Touch shared systems only for demonstrated shared causes and test their dependants.
- During iteration run changed-module and dependency tests. After stabilisation, run the relevant integration and mobile-browser checks; require full release gates before merge. Do not repeatedly rerun an unchanged full suite. Native phone playtesting and balance remain separate from automated pass/fail.
- Save incremental work on an isolated feature branch and open a PR early. Before interruptions, commit recoverable progress and record done/in-progress/remaining work. A fresh Work session should inspect branches, commits, PRs and CI and resume, not rebuild. Uncommitted temporary workspace changes may not be recoverable.
- Use a single gameplay/release owner. Documentation audits can be parallel only on isolated docs branches. Never overwrite approved artwork or generated files manually. Confirm versioned Pages deployment, main CI and exact game link before calling a release finished.
- Provide useful progress checkpoints when an update takes time: five-block indicator, completed/current/remaining, blockers and estimated completion clearly labelled as estimates. Avoid narrating repeated test passes.
- Keep PROJECT_STATUS.md current with exact release, PR/commit, test and Pages run IDs, approved art, known limitations, user playtest feedback and next priorities. For documentation-only corrections, avoid game version bumps and unnecessary gameplay retesting.
- As of 15 October 2026, 10.9.0 Havannah is merged, deployed, main CI passed and the user reports the game works well. Do not reimplement Havannah, Joseph or Tom merely because a previous chat ended. Portrait thumbnail selector remains a separate unstarted design task.

## Verified 10.10.0 review — 16 October 2026
- Current release is 10.10.0, PR #60, main ab86242be799422fa2f4a4a50ef5004780d0bc92. Main CI 38822801386 / Pages 38822802195 passed; public HTML and all ten portraits were compared byte-for-byte. PROJECT_STATUS.md records source, commands, screenshot artifact and limits. Do not infer latest release from an older status section or chat.
- A fresh remote/main check found that the old scratch checkout still contained Havannah candidate edits after another session had released 10.10.0. Preserve dirty work, inspect current source and use a separate clean worktree before building/testing. Never push stale generated HTML or replay an already merged feature over newer work. Check open PRs and exact branch heads before any mutation.
- For an art-only change, compare non-render function bodies and character/upgrade tables with the previous release, confirm portrait hashes and collision sizes, rebuild deterministically, then inspect idle, attack, town and short-screen output for every hero. Current character-owned proportions live in character modules; visuals/cat-art.js shares drawing primitives only. World effects are not scaled with bodies.
- Test affected systems and dependencies first. Reuse the successful full CI at the exact deployed commit for unchanged broad suites; record which checks were freshly run locally versus verified in CI. Do not call a protected scripted journey a human balance test, or claim every hero ran a matrix that covers only seven. Current combined single-charm tests cover all ten; the three-build full-journey matrix still covers the original seven.
- Save small, coherent branch commits early. A successful blob upload is not a saved project checkpoint until a tree, commit and branch ref include it. After interruptions, read GitHub's branch/tree/CI rather than assuming in-memory tool state or local files survived. Verify committed asset SHA and dimensions; preserve approved source bytes and later explicit corrections (Havannah blue eyes override the older green-eyed sheet).
- If the user explicitly delegates stats/upgrades/tuning for playtest, that authorizes completing those details within the agreed identity. Record that delegation and the complete chosen specification; do not reopen approval for every number. Unapproved artwork, unrelated redesign or a new consequential creative direction still needs user input.
- Final handover: current version and Safari link, what changed, exact test/deployment evidence and limitations, approved design decisions, known issues and next priorities. Update PROJECT_STATUS.md at each release so it cannot lag behind the actual published code. Documentation-only corrections need no version bump or repeated gameplay suite; preserve required repository checks.

## Reward/balance iteration — 10.11.0
- Measure rewards through the actual damage pipeline and real selection transactions. A displayed percentage is not proof of a useful reward; check whether enemy scaling cancels it. Keep difficulty tied to time/arena progression rather than purchases.
- Review availability and consequences: distinct ability paths, capped/no-effect stats, crit suppression, healing lockouts, fusion/bag status and an affordable shop choice. Keep saves and permanent prices separate from run tuning.
- Use reward-balance-test.cjs for all-ten-hero damage/choice contracts and seeded 30-build/900-choice evidence, then rewards-browser.cjs for 390x844/650 cards, feedback, mastery and shop usability. Seed the Math object passed into the VM; changing the host Math alone does not seed a VM's intrinsic Math.
- CI now checks phone presentation before the long charm matrix, retaining every required check. Update exact reward assertions when deliberately changing payouts; retain simultaneous-defeat/duplicate-payment assertions. Do not mistake the old expected payout for a game defect.
- Separate implemented/automated/deployed status from human fun and survival acceptance. Existing protected combat journeys demonstrate integration, not human balance. Record the exact source, run/artifact, public hashes and feedback in PROJECT_STATUS.md.

## Proportional presentation checks — proven in 10.12.0
- Changed-file scope now retains full numeric/combat/browser/charm gates for runtime changes, while presentation/test-only followups reuse unchanged green gameplay evidence. Build and the affected phone browser suite still run. The changed-screens artifact uploads before long simulations. Record both the full tested source and final focused source; never imply a skipped suite ran.
- Review final screenshots after CSS fixes: generic span rules can override socket flex layouts, and short-phone chest headings need explicit room. A stale text assertion or uninitialised browser fixture must be corrected without removing actual gameplay assertions.
- Release evidence: full run 38882639920; final focused run 38883821304; final corrected phone artifact 12039115656. This scoped improvement does not resolve deferred legacy-importer or workflow write-safety debt.

## Combined 10.13.0 release — proven fixes
- Preserve the agreed combined specification in UPDATE_SPEC.md and source ownership in journey-v10/README.md. New evolution choices are separate two-step transactions; only the transformation consumes the upgrade. The VM test helper auto-resolves them only for legacy simulations; monster-town-test.cjs explicitly tests all 90 real choices.
- Keep browser fixtures specific: scope workshop disclosure to #workshop summary now that help also has a disclosure; isolate fifth-rank ability tests by marking other completed tracks evolved; assert Rare-or-better contracts rather than random exact Rare text. Reward conservation includes equipment plus bag copies.
- A tracked versioned HTML is regenerated by build.py. CI must stage burntwood-journey-v10.*.html alongside canonical HTML/game.js before pull --rebase, or its unstaged versioned output stops the job. This fixes the demonstrated packaging failure; it does not resolve the broader deferred CI auto-write architecture. Workflow edits now require full validation; focused followups retain rewards-browser.cjs as well as reward-world-browser.cjs.
- Final full feature gate 38917974306 passed at e0a8a58a0b0ddc72f5751e710c0ab1b62d65fe27. The charm matrix took about seven minutes locally: 266 combinations and 21 protected journeys/105 arenas across the original seven heroes, not all ten. Newer heroes retain focused character suites; explicit new evolution/defence contracts cover all ten. Reuse exact green evidence for unchanged runtime instead of manually repeating these simulations.
- 10.13.0 native Safari acceptance, human survival/fun balance and RUN platform work remain separate. Further suggestions do not authorise implementation without an explicit Update.


## Rugby route release practice — 17 October 2026

Keep Rugby topology/stages in rugby-route.js and scenery in rugby-route-art.js. Production entry uses the physical route; legacy combat matrices explicitly use enterCombatArena, a test fixture. Test route navigation separately with real controls and dialogue/well actions. A timer must not bypass the heroic gate or start Bruce without deliberate pitch entry. At the well break, ordinary enemies retreat without reward; retain an undefeated heroic. Reset world dimensions on every arena/town transition.

For isolated Rugby-owned followups, reuse the successful full shared-combat candidate only when unchanged files are verified; retain all-ten route contracts, effect tests, actual-navigation phone and reward-browser checks. Shared runtime/workflow-only changes retain full gates. Protected simulations establish correctness/layout, not human balance. Verify Pages completion and public byte hashes before calling a release live; docs-only closeout needs no repeated gameplay matrix.


## Town / Rugby detail iteration — 17 October 2026
Rugby feedback about frequent upgrades is tuned in the physical Rugby route first; upgradeTimes and nextXP retain the other four arenas’ guaranteed schedules and XP thresholds. The shared natural-XP gate now uses the scheduled time rather than its former three-second early window; record that small pacing change explicitly. Keep authored reinforcements distinct from new ordinary forward arrivals. Nonblocking captions expire in active gameplay time and must clear bag/health/ability controls in portrait and landscape; changing a modal into a status caption requires tests that the clock still advances.

Moving Mimi inside a shop changes world tap coordinates. Browser fixtures must read hub.shop rather than hardcode the former outdoor position; retain actual pointer→conversation→shop assertions. Inspect the town overview for roads crossing pitch/building footprints as well as checking collision. Phone screenshots caught caption overlap and frontage text overlap before release. Preserve pre-release failures and corrected evidence rather than call the first failed run successful.


## Engagement flow — 10.16.0
Production reward lifecycle lives in world/reward-flow.js: opt-in chest → three choices → same-panel equip/swap/bag, then safe cleared-area movement and explicit exit. Keep essence/gold/duration single-counted and preserve old equipment in bag. Clear active attacks/particles at victory; movement and pickups continue without combat or level-up interruption. Leech charm increases healing, so concise text must not promise damage.

Legacy enterCombatArena and __test.reset retain explicit automatic-reward behavior only for bounded combat matrices. New reward-flow-test/browser suites verify the real production lifecycle (50 hero/area combinations plus a full five-area walkout journey and actual touch). Always distinguish these coverage scopes. Town button tests target townInteract; workshop taps derive coordinates from WORKSHOP.

Feature CI cancellation now replaces superseded runs; main remains uncancelled. Confirm final-source tests finish and generated blob matches before merge. Do not treat cancelled obsolete candidates as passing evidence. This does not replace the future build/publication separation work.

## Roster and service access — 10.18.0
Keep selection, NPC visibility, minimap services and all direct service entry points behind shared access helpers. Locked buttons must contain??? without portrait/name metadata; keyboard/program selection must also reject locked heroes. Preserve legacy earned progress through migration. Use optional validated schema2 flags so historical clients do not reject a schema bump. One-boss testing unlock is permanent across new journeys.

Gift purchases save the once-only flag and target rank in the same write, before in-memory mutation. Test cancellation, repeated confirmation, re-entry, reload and failed saving. Jackson’s counter replaces his wandering resident when covering Stefan; include exactly one identity/marker. Welcome -> workshop is a real two-step interaction, separate from the internal panel opener.

Existing __test.select/reset deliberately provision a full-access compatibility fixture; do not confuse those matrices with fresh production unlock coverage. New roster-workshop tests/browser start with real empty saves and actual production selection/taps. Character browser fixtures provision access before testing approved locked portraits. Preserve original combat/save assertions; update stale self-service/greeting expectations to Jackson cover.


## Delivery preference —20 October2026 (supersedes earlier RUN-first preference)
“Update” means GitHub Pages test release with checks and the exact versioned test link. “Update RUN” is a separate explicit publication request after playtesting. Do not edit run-host/release-request.json or trigger a RUN deploy for ordinary updates. Keep all 12 heroes unlocked for the 10.26 test. Before the next RUN release, introduce agreed boss/completion/essence character unlock requirements; see UPDATE_10_26.md. Preserve verified RUN credentials/SDK/thumbnail/game ID and do not repeat setup.

## Chasewater route and release evidence —20 October2026
Keep normal physical entry separate from enterCombatArena compatibility fixtures. A new large-map route must migrate old cleared treasure/exit coordinates, preserve entry rollback, constrain all character movement/portal samples and retain distant survivors when the final arena confines the player. Check legal/idempotent projection around buildings and walls, and physically walk to the exit after collecting nearby treasure. Do not mistake chest-first interaction priority for a broken exit.

Phone screenshots caught Mimi’s boss caption hiding a marked landing on short screens. The final responsive CSS clears that caption at height650px or below while retaining objectives/arrow and travel/guard guidance; actual390×650/320×568/landscape checks prove the selector. Presentation/browser-only refinement reuses exact full runtime evidence and retains required focused checks. GitHub held one final job queued10minutes; a documented retry with additional390×650 coverage passed. Do not claim a queued check is a pass or keep rerunning unchanged combat to work around a phone-only issue. PR90/UPDATE_10_27.md/PROJECT_STATUS.md preserve exact source, CI, artifact and28-file public evidence.

## Reconcile the complete approved update scope
Before closing an authorised update, compare the final diff against every still-pending change approved for that update, including earlier feedback in the conversation. Do not silently move agreed work into a later release because the most recent discussion focused on one arena. 10.27 shipped Chasewater while omitting the previously agreed Rugby entrance/cars and Sankeys scenery; 10.28 completes those omissions. Record the exact implemented scope and remaining acceptance checks before claiming the update is finished.

## Progression verification —24 October2026

When changing XP or completion rules, check finite route enemy budgets, tutorial XP, hardcoded setXP numbers in character visual fixtures, current preview URLs/storage keys, ending-copy assertions and every normal entry path. Instant-kill finale fixtures alone do not establish that the town gate/sign/marker/interaction works. Keep protected mechanics tests distinct from natural progression and human balance. Preserve old interrupted journey contracts explicitly. Packaging metadata must not hash itself as distribution content.
