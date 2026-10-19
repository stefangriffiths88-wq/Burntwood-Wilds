# 10.22.0 release checkpoint — 19 October 2026

Owner: gameplay Work session, branch `feature/sankeys-charms`, PR82. User authorised “Update” and repeated “Resume”. Main baseline `2241074d83a27a022cdbeb559fd3e126e042b492`.

## Implemented
- Matching close-up gold-framed Immy and Harvey selector icons; approved full portraits unchanged.
- Selected-key/rank charm merging with equipped-slot preservation, matching badges and effect preview; same-key rank swaps and bag conservation; three equipped icons first, compact bag and collapsed stats.
- Separate Ava charm boutique (Evie covers Ava), Mimi supplies and Stefan/Jackson workshop together at Sankeys. Shop stock is inspect-first, explicit buy; starter charm unlocks move to Ava. Saved currencies, gating and all12 testing access retained.
- Shaded object SVG charm art, rarity frames/rank badges; per-instance IDs avoid hidden-shop filter references hiding inventory art.
- Compact horizontal ability tiles, matching icons, real short benefits, progress dots, shared detailed inspection and explicit confirmation. Existing reveal/input/reduced-motion and Mythic deferred choice retained.
- Natural north return path/sign, objective and button explicitly Return to Sankeys.
- Distinct heavy stag/gear car park guard, hoof scrape/charge tells, punishable recovery, double-charge second phase and kneeling/gold defeat/chest. Existing route, well and enemy-retention rules retained.
- Independent swept Bruce body blocking with exact-overlap recovery; attacks still resolve before physical separation.
- Subtle face blink/wince and tail idle movement, including custom hero faces. Original procedural instrumental sketch, shared effects bus, hit cue, independent saved volumes, gesture start and background suspension; no paid service.

## Validation
Full feature CI `39247780167`, source/test head `f51af3a7bdb667aa2189a3322c2ac09d0d30539c`: SUCCESS (both full regression and changed-phone review jobs). Runtime source is unchanged from `9373a51bf62abae154d1953f57b4b301e8a0aa1d`; later changes correct tests and document evidence.

Phone job118043837273 passed. Final artifact12184112654 contains227 screenshots. Inspected the changed roster, compact cards including320px/landscape, shop/bag objects and comparisons, three-counter hub, guard and north return sign. Earlier review caught/fixed real invisible SVG-art and absent optional Mythic-detail DOM errors. Old fixtures now use explicit upgrade confirmation/Ava services, actual card readiness instead of the removed frame animation, and freeze Bruce only while measuring the stationary idle arrow. Assertions remain for real gameplay, collision and input protections.

Canonical/versioned HTML447975 bytes, SHA2561315d79b69b96ba07ee2144621a34f8c2ec88e42ccfa4633aed2c5dee6193441, blobee4dd65bd8cab4f0acb203fcf256fa09d7ce8794. Icons: Immy88706 bytes/blob410370a970363623609435b254498c696c42ba85; Harvey83004 bytes/blob2961980307eff5bebfaf8e3a233023fffea796f7. Historical HTML and all full portraits preserved.

## Released and verified
PR82 merged at59cccb981d5fcf5b3ece9e0b75bc3a127c970016. Main CI39248629129 and Pages39248628969 passed. All28 public HTML/redirect/art files match tested bytes; canonical447975 bytes/SHA2561315d79b69b96ba07ee2144621a34f8c2ec88e42ccfa4633aed2c5dee6193441. Live: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.22.0.html?v=10220 . PROJECT_STATUS.md is the release record. Native iPhone/user aesthetic, audio and human balance acceptance pending.

Next: user playtest. Cutscenes parked; town reward progression/restoration, Cow Queen/story, RUN/SDK and active-run recovery remain separate future work. No further gameplay changes authorised by those suggestions alone.
