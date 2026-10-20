# Chasewater long-wall update — 20 October 2026

Stef explicitly authorised Update after approving café → crossing → woods → long reservoir wall → Night Owl beside the brick building. The user-supplied photos show a reservoir dam/wall path, not a short wooden footbridge. Use that visual identity: stone parapet, blue water on one side, grass/trees on the other, red-brick tower with pitched roof. Native Canvas code drawings are delegated for playtest. This is compressed gameplay geography, not a surveyed walking map. Do not commit screenshots of third-party photo search results/private attachments.

GitHub-only testing release 10.27.0; do not change RUN release request or credentials. All twelve heroes remain unlocked. Preserve Bruce/approved hero artwork and prior links. Future RUN character unlock plan remains pending.

## Implementation checkpoint
Owner: current Work implementation session. Branch feature/chasewater-10.27, based on a35a02dd3ca29c161049efd509af6f8eeafd2757.

- Route logic lives in arenas/chasewater-route.js; scenery in chasewater-route-art.js. Normal physical entry starts at café. Legacy enterCombatArena retains its 900×1300 combat fixture for existing matrices.
- Progress-driven forward groups with six arrivals per 360-unit band, nine nearby cap, no new spawning in passed bands, no deletion or rewards at time/progress cutoff. Guard mandatory; recovery point ends new waves. Living survivors retain position and combat.
- Lakeside guard charm chest, optional recovery stone, deliberate tower approach starts Night Owl. Long wall occupies approximately half the travel. Continuous overhead labelled guidance and short nonmodal Mimi captions.
- Route-only Night Owl marked landing/sweeping flight/fanned feather attacks, phase-two pacing and recovery windows. Same HP/reward scaling. Boss arena broad enough to dodge, walls/terrain constrain all heroes including portal/dashes.
- Interrupted area rolls back to café; cleared save retains treasure and top return-to-Sankeys exit.

Remaining at initial checkpoint: finish scenery/shared dispatch; focused all-hero route/pattern/recovery tests; required CI; inspect mobile screenshots; merge/deploy/public byte verification. Not yet tested, deployed or user accepted.

## Deferred approved design discussion
Town: strengthen Sankeys shopping square, distinct frontages, purposeful props, fewer labels, visible restoration after wins; no town runtime edit in this Chasewater release.
Rugby: brick entrance walls/pillars with open drive, cars in car park and a couple on right of approach lane; pending separate implementation. Do not falsely report those shipped in this arena update.

## Focused validation checkpoint
- All twelve heroes pass real movement through the crossing/woods, guard/charm transaction, one-use recovery, deliberate boss entry, top exit and return. Wall/cafe/portal gate projection, finite spawning/backtracking, no timer deletion/free XP, survivor retention, all three phase-one/two patterns, committed landing avoidance and area/cleared/old-save migration pass locally.
- Old cleared Chasewater saves relocate their 900×1300 exit and retained treasure into the new legal northern bay. Clearing reopens the promenade for any unclaimed guard chest. Cafe collisions reject pushing through the narrow gap at the map edge.
- First phone artifact12283134148 (CI39463823804) reviewed. New route browser got through all warning screenshots, then attempted an exit while still in range of unclaimed boss treasure, correctly opening the chest. Fixture now collects the actual boss chest first. No gameplay assertion removed. Earlier unit fixture advanced from initial boss stalk into warning rather than impact, and initially used testing access which intentionally disables save writes; those fixture errors were corrected.
- First visual review showed disconnected dark path seams and too little water. Scenery now draws route surfaces over all margins together, with gravel/reeds; wall-section camera looks60 world units towards the water, without changing zoom, movement, sizes or hitboxes. Tower sits over the northern path so its facade is visible. Other arenas/camera remain unchanged.
- Final source CI/mobile review, main Pages and public hashes still pending. Protected automation is not human balance, native Safari or aesthetic acceptance.
