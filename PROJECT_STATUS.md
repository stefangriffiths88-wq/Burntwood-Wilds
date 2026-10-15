# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md and this file before edits.

## Released: 10.4.0 — Living town and boss entrances
- Release PR #46, merge c164068ce8ea1a688de2150faeed670d8783dc29.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.4.0.html?v=1040
- Unselected heroes populate fixed town positions. Selected hero and shopkeeper are excluded from duplicate resident placements.
- Mimi runs the existing shop. When playing Mimi, Jodie runs it.
- Mimi: “Okay human, you’re in my world now. Allow me to help you.”
- Jodie: “Heyy Mimiiii… How can I help you save us all?”
- Actual boss sprites replace arena gates. Tap a boss to enter its arena; nearby Challenge action remains available.
- Shop opens with greeting and heading visible; its scroll position resets on opening.
- Architecture, positions and deferred ideas: journey-v10/TOWN.md.

## Verification
- Branch CI 38745357119 passed build, gameplay regression, charm matrix and mobile checks.
- Main CI 38746141729 and Pages deployment 38746141568 succeeded.
- Public versioned HTML byte-for-byte matches the tested local build and reports BUILD_ID 10.4.0.
- All seven hero selections tested for six unique unselected townspeople, correct shopkeeper and exact greeting.
- All four boss map entrances tested through mobile taps, including repeated/cleared/outside-hub guards.
- Resident drawing preserves player object, selection and combat state.
- Inspected 390×844 screenshots: residents, all four boss entrances and both shopkeepers. Corrected retained shop scroll before release.
- Wider checks include 84 hero/charm combinations and 21 simulated journeys / 63 arenas.
- Simulations use scripted positioning and invulnerability; they do not establish human survival balance. Mobile Chromium is not native iPhone Safari.

## Preserved decisions
- Seven heroes: Ava, Jackson, Stefan, Jodie, Evie, Zak and Mimi. Approved portraits and gameplay sprites remain separate and unchanged by this release.
- Zak Street sprite remains approved. Mimi uses approved Little Headband sprite and woodland portrait; user confirmed her prior release works.
- Character attacks, abilities, upgrades and arena combat remain unchanged by town work.
- Twelve run-only charms, three slots and same-copy fusion remain. Heroic bosses arrive at 1:00; final arena bosses at 2:00. Charms carry between arenas, reset on new run. Full specification: journey-v10/CHARMS.md.
- Fusion consumes two identical same-rank copies into one higher rank, with no duplicate equipped effects. Current three-reward route normally permits rank II; rank III needs four base copies.
- No opening scene, permanent progression, essence/token economy or building overhaul implemented. These remain future design work in TOWN.md.

## Known limitations and next priorities
- User playtest pending for 10.4.0: town residents, Mimi/Jodie greeting, inventory/fusion access and boss tap usability in Safari.
- Follow specific feedback with isolated fixes; do not globally rebalance combat.
- Previous charm release 10.3.0 remains available. Human feedback on heroic threat, charm combinations and fusion pacing remains useful.
- Future conversations/shops, town decoration, opening spell story and future-run rewards require further design before implementation.

## In development: 10.4.1 — shared heroic acquisition and Jackson boss charge
User reports no charms when playing Evie/Jackson on the previous release; exact viewed build is unconfirmed. Current 10.4.0 source earned first charms in all 28 fresh hero/arena automated checks. Original missing-reward symptom not reproduced; do not claim its cause is confirmed.

Changes: heroic spawn/reward lifecycle independent of charm effect state; visible heroic health/reward label; Jackson charge and final upgrade damage final/heroic bosses without adding knockback, ordinary crowd control preserved. New targeted encounters-test.cjs covers all 28 first acquisitions and boss collision/finisher checks. No changes to enemy health, character damage values or approved artwork. Production verification pending.
