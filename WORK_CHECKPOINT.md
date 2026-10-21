# 10.32 development checkpoint

21 October 2026. Owner: current Work session. User authorised the agreed story/curse improvements and testing. No RUN update and no source merge until user playtest. New branch feature/story-rescues-10-32 starts from 10.31 source checkpoint80460b7c939a3f056403a95b191db3f5fdd382d2. Stable main remainsa06f2b085627b5687f65f727b51dde58dd8424f9 (10.30.0 / RUN1.0.6); PR94 remains draft. No competing gameplay PR.

See STORY_RESCUES_10_32.md for complete authorised scope and decisions. Implemented native rescue recruitment, legacy access migration, 5 essence Stefan, nearby glitter targeting, cosmetic frozen shatter, purple terrain veil, recovering varied scenery and detailed town landmarks/trails. No new portraits, boss, balance overhaul or RUN changes.

Local passed: build/syntax; story-rescues (persistent/atomic rewards, save failure, migration, targeting/damage and visual-only shatter); first-journey actual combat/XP; roster-workshop; Elder Lane route/Joseph real Bruce collision/healing/Guardian contracts; all12 ×five curse-area contracts; monster-town. Browser CI and final preview publication pending. Browser automation is not native Safari or human balance acceptance.

Prior 10.31 checkpoint retained below.

# 10.31 curse/story Pages playtest — final checkpoint

21 October2026. Owner: current Work session. User authorised implementation and testing, explicitly **no RUN publication until Stef has tested/approved**. Production remains10.30.0 / RUN1.0.6. Source PR94 stays draft.

Final code: qa/curse-caption-10-31 generated head28dc51e422f543966be583299b5749ea04ff87f3; source/art commit a635a34e40ffc24ef72fb932c65611d53131489f. All73 maintained/generated/packager files match the local candidate. The feature branch is being advanced to these tested bytes plus final documentation; no merge of source into production.

Implemented: five area curses, destructible knots/rescued neighbours, omens/quiet beats, warned root eruptions, caller/stalker roles, controllable boss cleansing, freed/resting guardians, relevant town consequences/dialogue; old-save compatibility and safe recovery. Bruce sheds netting. Rugby lamps stay warm/steady after cleansing. Queue cleanup prevents rescued neighbours repeating stale pleas. Approved initial Joseph/Tom banter retained. No hero stats/art/economy rebalancing.

Passed: complete39639702818, including266 hero/charm combinations and21 journeys/105 arenas across original seven heroes/three builds. Full-matrix runtime reused after byte comparison confirms only obsolete-caption retirement in story code; final art has no combat effects. Final39641104739 all three jobs passed, including existing route/reward/recovery/hero suites and new all12 heroes ×five area contracts. Focused physical tests include actual knot attacks, rescue/omen/cleansing, warned avoidable damage, role cancellation/stun, chest/exit conservation and cleared reload. Native drawing preserves combat RNG/state.

Actual isolated-preview verification39641104809 passed at a635a34e; artifact12365650088 exactly matches final local HTML/metadata and contains93 phone screenshots. Reviewed390×844,320×568,844×390/reduced motion: cursed/rescued/omen/cleansing/restored/home for all five areas, priority enemies, nonblocking captions and real defence/pause taps. Retained physical-route browser suites cover navigation. No native iPhone or human balance acceptance claimed.

Pages-only publication31cf9285e9017e4117f04222d995e710fb8fab7c adds only burntwood-preview-v10.31.0.html, TEST_10_31.md and tests/curse-preview-10.31.json. Live-byte verification passed: the preview and eight retained production/asset files match expected bytes. Pages39641808171; public evidence tests/public-10.31-preview.json. Preview SHA256e965d4c729763ab9c846028788e7d4cbb0fd96ae5b01af7f36d537e6b69daaf0,573761bytes. Its three storage substitutions reverse exactly to compiled10.31 source55e6228f3cb3d485f1347dba127af27f0995eb9d8491f4014c21561ee86a4590. Separate journey/permanent preview keys protect10.30; existing permanent progress can be read initially. No RUN files, request, credentials or distribution changed/published.

Test URL: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-preview-v10.31.0.html?v=10310
Scope UPDATE_10_31.md; test guide TEST_10_31.md. Delivery complete: Pages39641808171 build/report/deploy succeeded, public bytes verified. Give Stef the test link, then wait for feedback. Public byte verification and unchanged10.30/canonical/latest/RUN receipt are recorded. Do not upload to RUN or merge the feature until his test approval.
