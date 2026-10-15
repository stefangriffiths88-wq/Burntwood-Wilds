# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md, this file and AGENTS.md before edits.

## Released: 10.5.0 — living town and saved character progression
- Release PR #51; merge 233715d0070fae0a5679a2e12bcdf8bb81ee4917.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.5.0.html?v=1050
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Residents have approved first/victory conversations, portraits, speech bubbles and nearby TALK. Existing Mimi/Jodie run-shop greetings are preserved.
- Stefan opens STEF’S SHED: shared saved essence buys five modest per-character upgrade tracks, five ranks each. Rank costs 2/4/6/8/10 essence. Final bosses grant 2 essence once per arena per journey; heroics retain run-only charm rewards.
- Permanent caps: +10 health, +5% normal/permanent-companion damage, +5% speed, −5% special cooldown, +15% healing. Explicit character selection and purchase confirmation; current → next bonus displayed.
- Bonuses are snapshotted for a journey, refreshed at its first arena entry so starting-town purchases apply. Between-arena purchases apply to a fresh run.
- Loss/final completion returns to a safe post-run town. Victories and wounded bosses remain until START NEW RUN. Arena entry and expired run-only purchases/fusion are blocked there; Stefan’s permanent shop remains available.
- Minimap labels both shops and marks residents, bosses, cleared locations and the player.
- Cleared bosses have resting/wounded poses, bandages, bruises, dizzy stars and victory flags. Town lighting warms with current-run victories. Bruce’s orange mouth ellipse is removed; antler net retained.
- Hub-only presentation scales correct oversized Zak/Mimi and align residents with the hub player. Approved combat sprite modules, portraits and combat hitboxes remain unchanged.
- New modules: upgrades/permanent.js, world/conversations.js, world/workshop.js, ui/town-panels.html. Detailed ownership, numbers and save contract: journey-v10/TOWN.md.

## Verification
- Final branch CI 38756844724 at 204008bbc6068baefa524ca9ddc33778ffb27ffd passed build, standard gameplay, town/save checks, encounter checks, full charm matrix/journeys and mobile tests.
- Main CI 38757339516 and Pages deployment 38757340088 succeeded.
- Public versioned HTML byte-for-byte matches the tested local build; BUILD_ID 10.5.0 and latest.html destination verified.
- town-test.cjs: all hero/resident combinations, exact dialogue, paused interactions, self-service Stefan, confirmed/cancelled/capped purchases, per-hero/source bonus isolation, save/reload, invalid/corrupt imports, failed storage writes, first-battle snapshots, loss return, both final/heroic defeat orders, wounded previews and minimap services.
- Browser: actual mobile conversations, workshop purchase confirmation, real page reload preserving purchased ranks, backup/restore controls, seven hub scale views, four wounded bosses and a 390×650 workshop.
- Inspected 390×844 final screenshots for conversations, workshop and post-run wounded Bruce; also reviewed all four wounded bosses, seven scale views and the short workshop layout. Fixed canvas-resize synchronisation in the mobile test and retained town rendering behind paused panels before release.
- Wider regression: 28 fresh hero/arena first-charm acquisitions; 84 hero/charm combinations; 21 scripted journeys / 63 arenas. Simulated runs use positioning/invulnerability and do not establish human survival balance. Mobile Chromium is not native Safari.

## Saving and known limits
- localStorage key burntwood-wilds-progress-v1, schema 1. Progress belongs to this browser/origin and does not sync automatically across devices.
- Workshop provides copyable JSON backup/restore with replacement confirmation and strict validation. Purchases debit only after successful storage write. Corrupt saves are preserved until explicit valid restore.
- Failed boss-reward saving retains the reward in memory and displays BACKUP NEEDED; export before leaving. Active run/combat state is not restored after reload.
- User playtest/acceptance of 10.5.0 is pending. Next: Safari conversations, first boss +2 essence, buying for a chosen hero, later-run bonus, backup/restore usability, NPC scale, map labels and wounded boss appearances.
- Human balance of permanent costs and charm combinations remains open to feedback. Diagnose specific feedback rather than globally changing enemy difficulty.

## Retained decisions and earlier feedback
- Seven heroes: Ava, Jackson, Stefan, Jodie, Evie, Zak, Mimi. Separate approved portraits and gameplay sprites. Preserve Zak Street and Mimi Little Headband/woodland portrait.
- Twelve run-only charms, three slots, same-rank duplicate fusion. Heroics at 1:00; final bosses at 2:00; eight timed upgrades; three arenas per journey. Rank III requires four base copies, while the normal three-reward route usually permits rank II.
- 10.4.1 fixed a confirmed final-first/heroic-second reward-loss transition and removed Jackson charge/finisher boss knockback while preserving damage and ordinary crowd control. Original user-reported Evie/Jackson no-charm runs had unknown viewed build/defeat order; do not claim that specific cause was established.
- Opening spell cinematic, gold escape tokens, starting charms and larger town/building overhaul remain future design work.
- Completed audit was read before implementation. Broad CI write-safety, owned build template/version metadata, registration validation and archive cleanup remain separate maintenance priorities in DEVELOPMENT_GUIDE.md; not silently folded into this feature release.
