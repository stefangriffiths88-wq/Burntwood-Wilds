# Latest verified release: Burntwood Wilds 10.35.0

Released 22 October 2026 following Stef's explicit authorisation of all agreed gameplay, music, art and RUN updates. PR100 merged as ae2474226891df20be40969036a5b695202737cd. Explicit publish commit6b0a800cde08611392eb6413e9398952e9392511; RUN workflow39856288305 passed prepare and deploy. Receipt run-host/releases/10.35.0.json records platform1.0.8, game10.35.0 and visibility review (playable review link, not public-listing approval).

Play: https://w.run/wild_creations/burntwood-wilds?tag=review&k=22420deab10ddf4fa01567d5e6c94671

Browser: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.35.0.html?v=10350

Included: five arena music themes/faster bosses/calm victory transitions; voting links; physical Joseph release and durable pending rescue; Jackson charge-through/sideways Bruce impact; settled two-second ice; optional individual rescue chats; full ability cards/NEW badges; immediate atomic Stefan welcome; character selection before a new run; direct town arrow and phone-layout fixes. Approved native skinny Umbrella Man, compact Boulder Mort and Night Owl are integrated. Bruce/hero artwork, earned progress, historical URLs, RUN identity/SDK/tracking and approved thumbnail are preserved. Large Loki/Jackson graphics/animation overhaul remains paused for a possible future game. No essence/ad expansion.

Verification: final scoped CI39855488826 passed all three jobs atfcf3282cce568014019f433a24ab7911725a8033, including actual phone interactions at390×844,320×568 and844×390. Full runtime/charm job119931990958 in39809587280 passed the same runtime before the final CSS/test-only changes. Main39856250379 has green changed-review/curse-review, with its redundant full browser/charm job still running at this checkpoint. Fresh isolated preview main39856250421 passed. See TEST_10_35.md for precise evidence and limitations.

Pages39856287791 passed; fetched canonical/versioned HTML both match627653 bytes / SHA256667f8bd782f2fbbb54f539d2f9d5a26cd1a531a68441dcb23f528217ab39ee35. Portable sourceSHA25603b8dec4efe9d2ff953cffdc60d27d6d849ee294c3cffd4496057be09e98a797. Hosted game8449500 bytes / SHA2563d42d6d0b6f19f68d3a376b0d71b2a6b2c4a28e8897e7c532f1c1a74d9ba2777. All eight hosted runtime/wrapper/SDK/placeholder files match the prepared manifest. The host re-encoded the thumbnail; the original and hosted images were visually checked and retain the approved artwork.

Next: user/native Safari phone playtest, especially music mix and RUN navigation. Automated Chromium checks do not establish human balance or native Safari acceptance. No further graphics expansion is scheduled.

--- Earlier work log and historical status (superseded where noted above) ---

# 10.35.0 — complete agreed playtest and RUN update

Stef explicitly authorised all music, gameplay and agreed art, and RUN publication on 22 October 2026. Owner: feature/playtest-fixes-10-35, base main2ea2496. Preserve earned progress, approved hero artwork, historical URLs, SDK/tracking/game identity and existing RUN icon. No essence/ad expansion.

Scope checklist:
- Direct town objective arrow, corrected phone caption/button overlap.
- Joseph physically released from vines after Bruce, before recruitment; durable pending rescue.
- Jackson charge passes through Bruce, damages once and slides Bruce sideways.
- Frozen-enemy cosmetic shards settle and last two seconds.
- Optional individual post-rescue humorous conversations.
- Unlocked portrait inspection/full ability cards, NEW until viewed including multiple recruits.
- Immediate Stefan recruitment welcome with atomic5-essence purchase.
- New-run action opens selection before deliberate start/replacement.
- Existing music PR99: five area themes,20% faster boss variants, victory/calm transition.
- Existing voting PR98: deliberate menu/victory links and safe checkpoint handling.
- Approved native Umbrella Man (skinny dirty untucked shirt/battered umbrella) at Sankeys; approved compact Boulder Mort v2 at Quarry with identity/copy; previously accepted native Night Owl. Bruce art unchanged.
- Bramble Beast and Loki/Jackson large graphics/animation overhaul remain unchanged/paused. No approval invented for unfinished native Loki art.

Implementation checkpoint: all owned source changes in place; initial build/syntax, music lifecycle and monster-town native render/mechanics suites pass. Legacy tests that assumed automatic Joseph boss recruitment need updating to exercise the new physical rescue. Focused new contracts, real phone layouts/taps, complete release CI, packaging, Pages verification and explicit RUN publish/receipt remain to complete. Do not call this release live yet.
