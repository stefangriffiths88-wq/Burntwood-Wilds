# Approved Loki art and queued phone fixes — 22 October 2026

Stef explicitly says **do not update yet**. This records approvals/investigation only: no gameplay/source release, main merge, RUN upload or changed playable preview.

## Loki artwork approval

After rejecting the native polygon/rock-like previews as unappealing, Stef accepts the new smoother illustrated husky images. **B / playful crouch is the boss appearance; A / relaxed standing is the freed appearance.** C / guardian is not selected. Preserve Loki's black-and-white identity, enormous fluffy white curled tail, blue eyes and black harness with white dog/bone motifs. Use these raster images themselves in-game, not an approximate redraw in the rejected native geometry.

Approved generated originals currently available in this Work workspace:
- Boss B: generated_images/exec-4c9484e9-3100-450a-9db2-581fa240c42f.png
- Freed A: generated_images/exec-11088a64-75b2-4e66-b4ab-49975098ae99.png

These are approved still-image appearances, not a finished animation set or permission to integrate now. Before implementation, preserve the original asset bytes in the repository, derive appropriately sized game assets, test alpha/footprint/shadow/phone-size clarity, and prepare consistent walk/turn/wind-up/lunge/hurt/cleansed frames. Current game supports Image/drawImage (for example drawRecruitNotice); boss drawing currently dispatches native Canvas functions. A raster boss renderer can use the exact artwork, but switching to it and animating it is future work. No claim of a current animated sprite or an in-game raster playtest.

Real dog reference is private user-provided material; do not commit that phone/social screenshot. Selected generated original PNGs have not been committed in this documentation checkpoint; commit them before asset integration, not the private photo.

## Reported 10.33.1 phone feedback, queued for explicit update

1. **Town direction arrow:** point directly from the player to the current objective, regardless of roads. Stef reports circular road-following directions. Current townGuidanceWaypoint in ui/guidance.js chooses road-graph waypoints; replace this arrow behavior only, retain destination priority and town collision.
2. **Overlapping captions/interaction:** supplied well screenshot shows Mimi's curse caption covering USE HEALING WELL. Cleared screenshot also stacks a recruitment notice over the boss/player plus another Joseph caption. Reserve readable caption/interaction positions and serialize these messages; preserve accessible actions and avoid new modal interruption. Reproduce at the supplied portrait iPhone proportions and short/landscape layouts.
3. **Joseph recruitment timing:** Bruce defeated → reach Joseph and free him from the vines → only then show Joseph joined you and grant access. Retain the rewarding town homecoming afterwards. Current clearAreaCurse calls rescueCurseResident immediately during boss clear; this auto-recruitment/notice precedes an explicit physical rescue. Future change needs boss-gated captive interaction and safe recovery/no-duplicate/save tests.
4. **Jackson charge versus Bruce:** charge must pass through Bruce, deal its charge impact once and knock Bruce to the side, instead of body-blocking/stopping Jackson. Current chargeImpact treats bosses/heroics as anchored and sends zero knockback. Diagnose both Rugby body separation and charge movement; implement only the requested Jackson/Bruce behavior and keep other heroes/bosses unchanged unless explicitly directed. Check swept contact at multiple frame rates, lateral displacement inside the pitch, repeated-hit guards and non-charge collision.

No fixes are claimed implemented. Loki rescue story still means saving the giant husky from the Cow Queen; do not frame him as an evil dog being killed. Bruce stays visually unchanged; accepted Night Owl retained; skinny dirty untucked-shirt Umbrella Man belongs at Sankeys; golem design/name still needs acceptance. MusicPR99 and votingPR98 remain separate draft/test work. Next: explain exact-raster feasibility and animation limits, confirm recorded scope, await further development/update direction.
