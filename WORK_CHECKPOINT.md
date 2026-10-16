# ACTIVE — Rugby Club staged route update 10.14.0
User explicitly authorised updating Rugby and redesigning Bruce from the new rugby-map artwork on16 October2026. Work owner: this implementation chat. Branch feature/rugby-route. Live remains10.13.0. Reference identity/crop and explicit NO CROSSING correction are preserved in journey-v10/assets/references/rugby/REFERENCE.md.

Implemented: extended physical lane/rail terminus/club/carpark/containers/well/pitch; route collision and per-arena dimensions;60s entrance heroic gate,90s quiet well break and deliberate pitch/dialogue Bruce trigger; short Mimi dialogue;1.5s idle arrow; measured objective/threat separation; four-legged reference-based brown stag with orange fencing. Other arena timelines/balance and approved heroes/portraits preserved.

New all-ten route tests pass: stage ordering, no railway crossing, no timer-only boss, well once/guarded, pause/dialogue freezing,90s ordinary retreat without rewards, idle threshold and other-arena independence. Existing monster/evolution tests pass. New browser suite walks the actual lane/gates/carpark to well, uses real buttons and captures phone/landscape/art. Browser available in CI only. Need numeric regression, CI phone review and full existing release gate before merge/deploy.

Legacy combat harnesses explicitly use enterCombatArena fixtures for the previous bounded battlefield; dedicated rugby-route tests/browser exercise the real entry. This avoids treating old stationary combat simulations as physical-route evidence. No production UI uses that test fixture.

Next: commit/push draft PR, inspect early route phone job and full CI, fix demonstrated failures, package latest/versioned10.14.0, verify Pages/public bytes, close release record. Do not claim published/user-accepted before verification. Suggestions require an explicit Update. Native Safari and human balance remain playtests.
