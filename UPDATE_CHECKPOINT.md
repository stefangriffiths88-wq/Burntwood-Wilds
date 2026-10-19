# Active update — 19 October 2026

Owner: gameplay Work session. Branch `feature/sankeys-charms`, based on main `2241074d83a27a022cdbeb559fd3e126e042b492`. User explicitly authorised “Update”, then “Resume”. Target 10.22.0; **not released**.

Implemented candidate: close-up Immy/Harvey selector icons (approved full portraits unchanged); slot-preserving selected charm fusion and same-key swap; compact charm grids, inspect-before-buy stock; Ava counter at Sankeys with covering Evie; Mimi supplies and Stefan workshop together; Return to Sankeys signs/buttons; inspect-first compact upgrade cards and explicit confirmation; rugby guard distinct stag/harness and two-charge second phase; independent Bruce body blocking; shared face blink/wince/tail movement; original procedural music and separate saved audio sliders.

Validation checkpoint 11:39 UTC: main regression, build stats, reward balance, level reveal, reward-world, reward-flow, rugby-route, town, roster-workshop, monster-town and new sankeys-charms mechanics pass. New browser scenarios added for Ava inspect/buy/merge, inventory swap, explicit upgrade confirmation and audio. Starting charms moved to Ava’s UI, permanent workshop preserved.

Earlier validation (superseded): build/syntax and monster-town, town and roster-workshop suites pass. Reward-flow test needs intentional ENTER text assertion updated. Rugby-route test has old shop position (345,335); update to current SHOPKEEPER coordinate and verify access. No browser or full regression evidence yet. No merge/deployment authorised as complete until all checks pass.

Remaining: improve/verify charm object art visually, finish service separation/cover interactions and upgrade-touch safety, test collision/guard/audio, all-hero expressions, shop starter charm placement, update affected browser scripts for explicit upgrade confirmation/new shop coordinates, run required CI, inspect actual phone screenshots, fix failures, then merge and verify Pages exact bytes. Existing live remains 10.21.0. Cutscenes parked. All 12 heroes remain unlocked for testing; shops retain first-boss gating.

Next action: inspect candidate diff, targeted tests, add new interaction tests, upload remaining source/assets to this branch, open draft PR and execute CI. Generated files are built from source; preserve historical 10.21.0 unchanged.

Phone review: new Ava buy/merge/swap and compact upgrades passed at 390×844, 320×568, 844×390. Reviewed artifact 12183442767. Found and fixed invisible inventory object art: repeated SVG IDs referenced hidden shop filters. Each illustration now has instance-unique IDs, with an explicit browser assertion. Equipment moved above collapsed build stats. Old Harvey/Immy/general journeys now explicitly confirm upgrades and use Ava for charms. Awaiting final CI/phone rerun.
