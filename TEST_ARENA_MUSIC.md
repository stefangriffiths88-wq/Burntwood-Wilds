# Arena music test — 22 October 2026

Test: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-preview-music.html?v=10340music

This is the10.33 game with the approved music update, labelled MUSIC TEST. Source PR99 remains draft; canonical/latest and RUN remain10.33.0. Voting preview PR98 remains separate. New isolated journey/progress saves do not import/write production saves; existing audio preferences remain shared intentionally.

- Town: existing calm motif.
- Rugby: punchy Rugby Rush144BPM.
- Chasewater: flowing Waterline Chase136BPM.
- Quarry: heavier Stonebreaker132BPM.
- Elder Lane Burntwood Park: darker Curse Breaker152BPM.
- Chase Terrace: fast Midnight Mayhem148BPM (internal legacy arena key `sankeys`).
- Bosses: same musical identity, ramp to20% faster with extra percussion.
- Cleared: short victory flourish, then calm during walkout/treasure/return. Existing quiet curse-story moments remain.

Start with a tap to enable sound. Test a fight → boss → defeat → treasure → return. Under Menu check Music/Effects separately, then background/resume. Listen for an obvious lift at the boss without unpleasant volume jumps. Native iPhone audio quality, interruptions, performance and personal taste need Stef's playtest.

Source7b7164472b4b634fe6a87b7edd3822e41f7e29da. Exact focused browser CI39770826303 passed, artifact12422486302; HTML byte-compared with local preview. Earlier focused39770703894 also passed. VM contracts cover all five identities, tempo, quiet/boss priority, clear/chest/return, pause/mute/background, cached deterministic percussion, bounded source counts, cleanup and unsupported audio. Existing charm/audio settings contracts pass.

Real browser AudioContext starts from the actual Play tap; tests enter all five arenas, spawn real bosses, observe faster scheduling, perform the actual damaging killing blow and cleared/pause/return transitions at390×844,320×568,844×390. Ten real OfflineAudioContext graphs produce distinct finite unclipped six-second recordings (normal/boss for each area), peaks0.074–0.105 at default music gain. Browser tests use positioned/protected combat and do not prove human balance or native Safari sound. No new art/layout/mechanics/economy/SDK changes; no unrelated manually repeated full combat matrix.

Preview605705bytes, SHA256ce4a7ca84b5d45f309c8ee9f440b578fda572594854fa7e9943013690c4f2da9; Git blob10591a5f6afc9bc631ca226158c3a046b26ed791. Source checkpoint WORK_ARENA_MUSIC.md on feature/arena-music-10-34.

Final publication: main1dde41aaf43abf0441754dd27502e032724f434b; Pages39771170004 completed successfully. Public preview fetched and matched the tested hash/length; canonical10.33.0, versioned10.33.0, latest.html and the voting preview remain byte-identical. Evidence tests/public-arena-music.json. Initial preview404 during deployment was rechecked successfully after deployment. All three jobs of automatic modular39770826310 also passed, including retained full combat/charm validation. No extra broad manual rerun. Native iPhone sound/mix/taste remains Stef's test; no RUN upload.
