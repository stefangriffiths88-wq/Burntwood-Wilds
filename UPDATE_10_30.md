# 10.30 testing update — signature abilities, charm builds and Jodie

Owner: this implementation session. Base main824bcd60801c699c1e2e263b5c988e9d46c921a9; branch feature/signature-charms-10-30. Authorised by explicit Update for testing after the charm/signature proposal and corrected companion direction. Current live release remains10.29 until verified deployment.

Scope: retain three equipped charms; overhaul Echo, Ember, Frost, Cracked Bell, Guardian and Phantom with visible rank milestones, bounded explicit combinations and reliable boss strengthening. Retain basic stat charms for existing saves/shops, but prefer behaviour charms in major treasure. Add one saved, one-off10-essence signature for each of12 heroes, separate from existing stat purchases, effective next fresh journey. No free signatures via Jackson's existing stat gift. Validate saves, purchases and recovery snapshots. Show signature effect preview in workshop.

Signatures: Jackson one extra main-ball ricochet; Ava impact releases two smaller stars; Jodie a clone of companion Mimi (same pet appearance, never the playable ninja or mini Jodie), Tiny remains independently earned; Evie one extra regular-duck smash; Joseph a small wave on each Overhype impact; Mimi Shadow Step leaves a sword-shadow slash; Stefan third normal combination adds a broad strike; Tom third-hit smash sends a travelling groundwave; Zak normal impacts leave short poison puddles; Havannah split-spark attack repeats a delayed ring; Immy Rootstep grows attacking thorn vines; Harvey spore impacts leave lingering clouds. Character modules own triggers. All effects have explicit bounds and cannot recursively trigger other signatures/charms/evolutions.

Jodie special: kittens last their full9/11s, not a pounce budget or premature revenge despawn. Third special upgrade becomes double pounce. Visible active-duration cue and fade. Existing permanent companions and portrait assets unchanged.

This first-priority testing release does not include the separately suggested later enemy-role expansion or branching weapon paths. Shared arena balance and geography remain intact. Attack trails/sounds and combination cues are enhanced where the new effects occur.

Implemented locally: all12 signatures and atomic purchase/save/recovery support, workshop preview, six behaviour charms/three explicit combinations, reliable boss strengthening, full-duration kittens and companion Mimi clone. Focused signature/build tests, existing core tests, town/save purchases, recovery, build stats, early charm timing/fusion contracts and RUN tracking/package checks passed. An additional-bounce/split-star test caught immediate re-collision with the original target; secondary star hit sets now exclude it. A shared target clock prevents independently spawned overlapping clouds from stacking damage.

Pending: required full regression/mobile screenshots, exact-head merge/main/Pages verification, RUN publication and public file verification. Not deployed yet. Native Safari and human balance require user playtest.

## Completed verification before merge
Runtime sourcecb398852ce470ac4d26e152def08481fecaffd93 passed full gameplay/browser job119314375939 in39626908182, including retained hero/core/build/encounter/mobile suites,266 hero/charm combinations and21 full actual-attack journeys/105 arenas. Its old progress-builds Bell assertion was corrected to the new approved design; no mechanics assertion was deleted. Final QA179cdc8f9048088b36c350f2f1c94cce18873218 passed both jobs in39627741651 and RUN prepare39627741449. Followups change fixture expectations and treasure-card wording only; combat mechanics remain those exercised by the full job. The exact final45 files match local tested bytes.

Reviewed all12 workshop cards, active/late kittens and clone, charm effects and corrected strengthening card at390×844,320×568,844×390. Final screenshot artifact12357961867 contains60 signature/charm images plus38 retained Park images. Initial selector ambiguity and misleading matching-copy hint were corrected; the real strengthening tap now asserts rankII with no bag copy.

Remaining: merge, main CI/Pages, exact public28-file check, explicit RUN publish and receipt/public runtime check. Current live10.29 remains until those succeed. Native Safari and human balance remain user playtest.

Final lifecycle review: clear transient signature effects at physical boss victory, so a last-hit cloud/wave cannot remain visually frozen during the walkout. Added a real signature-source boss-kill/cleared-state regression. This is transition cleanup only; damage, rewards and character tuning remain unchanged. Targeted unit and physical-route checks rerun; final CI/phone/publication gates remain required.

## Released for testing

PR93 merged atffe52b87f7e48b9e32ac4fdf8d2dd11b5144594b; final feature CI39629167433 and RUN prepare39629167767 passed. Main CI39629620489 and Pages39629619002 passed. All28 public files match the tested bytes, including the retained10.29 release; tests/public-10.30.json. Canonical/versioned HTML SHA256a0b784b68d07b60cd68b5a246b285c29dc5a2c20aaf915c250a1af54118a742a.

RUN upload39630194501 succeeded from publish requestd4a6d0506ef1f4eb75549a0d921921d9ef749c0a. Actual game10.30.0/platform1.0.6, visibilityreview. Receipt run-host/releases/10.30.0.json committed atb344486fb30d95cacc0b1eaab77b5ecb94bb4b9e. Public runtime/SDK/wrapper files exactly match the prepared distribution; approved512px Rugby Strike thumbnail is retained (platform recompression checked). Evidence tests/run-public-10.30.json. Portable source SHA25698a03cf4d28b45010232c3674fe174b3c87ae503db6d675832fe4e8aafc82eaf. Existing SDK/tracking/game identity/credentials retained.

Primary link: https://w.run/jollyrunner639/burntwood-wilds?tag=review&k=22420deab10ddf4fa01567d5e6c94671

Native Safari, human balance and public RUN approval remain user/platform followup. No unfinished implementation or upload remains. The earlier pending statements above record development checkpoints and are superseded by this release record.
