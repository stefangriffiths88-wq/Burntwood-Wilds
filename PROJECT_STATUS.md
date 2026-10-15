# Burntwood Wilds — project status

Updated: 15 October 2026. Read with DEVELOPMENT_GUIDE.md before editing.

## Released
- Previous release **10.1.2**. New release **10.2.0** introduces Mimi. Release merge: `6638e4ae0555c68eaae6cd0a5ce130e26c14e4d9`; PR #35.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.html?v=1020
- Exact approved full-resolution Zak selection portrait installed (1024×1536 WebP, 249,644 bytes). Removed hardcoded zak-cap.svg override and obsolete SVG; normal portrait discovery now applies to all six characters.
- User reported “Worked perfect” after release. User's browser/device for that test was not independently recorded.

## Decisions preserved
- Selection portraits and playable sprites are separate assets.
- Keep approved Option A Street Zak sprite and all character gameplay unchanged for portrait work.
- Preserve Gas Blast, Toxic Fart Cloud, Gas-Powered Launch and Zak upgrades.
- Characters/arenas/combat/progression stay modular; diagnose specific failures before balance changes.
- Recover and use approved artwork; do not generate substitutes unnecessarily.

## Verification
- Local build and gameplay regression passed, including all six heroes, upgrades, three-arena journeys, hub, shop, quarry and shrines.
- Branch Actions run 38720861578 passed; main run 38720994299 passed.
- Mobile Chromium suite passed: image loading, exact Zak dimensions, all six hero choices/abilities, touch/dodge, no zoom, short-screen layout and no JavaScript exceptions.
- Inspected CI 390×844 Zak selection and gameplay screenshots; portrait fully framed with cap, tail and both paws visible.
- Pages run 38720995017 succeeded. Public HTML returned BUILD_ID 10.1.2 and correct portrait path; live image bytes matched the approved source exactly.
- Committed binary hash matches local Git blob hash. No character gameplay source changed.
- Automation is mobile Chromium, not native iPhone Safari; simulations do not establish human balance.

## Known problems and outstanding work
- No unresolved defect identified in the portrait correction; this does not claim the entire game has no bugs.
- Existing technical debt: legacy v9 HTML shell inheritance and duplicated version strings.
- Broader composite design reference remains uncommitted; do not claim all artwork matches that reference.
- Mimi implementation authorized; automated mechanics and regression tests pass locally. Release branch CI/mobile and production verification required. User playtest pending.

## Exact next priorities
1. Obtain the user's next requested improvement or play-test report.
2. Inspect its owned modules and dependencies; implement the smallest effective isolated change.
3. Test affected systems, run required release checks once stable, merge and verify production.
4. Update this status and guide with verified outcomes and any proven workflow improvements.

## Workflow continuity
The permanent working agreement and proven binary image transfer method are in DEVELOPMENT_GUIDE.md. GitHub is authoritative; ChatGPT Memory is optional and cannot replace these files.

## Mimi 10.2.0
Approved Little Headband simple Canvas sprite and exact 1024×1536 woodland selection portrait. Independent characters/mimi.js; sword, gated 300% Vanish, Nine Lives progressive pounces and finite clone, five dodge and stat upgrades. Other character modules and arena balance unchanged. Next priority: user playtest Mimi sword reach, Vanish rhythm, pounce targeting and clone readability; fix specific feedback. Current release PR and CI evidence to be added after verification.
