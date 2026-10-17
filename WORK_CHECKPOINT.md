# Active update — town/lane detail 10.15.0

17 October 2026. User explicitly authorised update after feedback: winding/potholed Rugby lane; forward enemy arrivals; nonblocking bottom Mimi text; less frequent Rugby level-ups; remove town arrow; clear signed routes/buildings along roads; Mimi inside shopping centre behind counter/open door/sign; detailed Bruce.

Owner: this Work session, branch feature/town-lane-detail. Implementation complete pending browser/CI review and release. No competing feature PR found (70 is approved reference documentation only).

Local route/all-ten/evolution/town/level-reveal and shared baseline regression passed. CI 39060561748 phone review job passed; artifact 12111003578 reviewed for Bruce, lane, town and Mimi shop. That review exposed caption/bag overlap and a road across the pitch; corrected in final source 8669dafb533bc2dc6f523f12874df256e22c0e55. Final CI 39060714623 queued behind the initial full run. No game release yet. Rugby pacing is isolated to the physical Rugby journey: earliest choices at 14,34,54,76,98,120 seconds, at least18 seconds apart, six-cap preserved. Other four arenas and abstract legacy combat fixtures retain existing pacing and difficulty. New Ruby waves spawn ahead; explicit scripted/boss placements remain authored. Caption expiry uses active seconds and does not pause combat/clear inputs.

Next: full existing CI once, phone screenshots (lane/bends/caption, Bruce, signed town/shop), fix discovered failures, merge only green and verify Pages/live bytes. Native phone balance/art remains user acceptance.

Broad browser CI caught its old hardcoded shop tap (345,350) after the shop moved inside to y280. Updated the fixture to read hub.shop and still require real pointer dialogue→shop behaviour for all seven heroes. No runtime fix was needed for that failure. Initial CI’s mechanics/encounters/reward browsers passed; broad browser stopped before the charm matrix. Final rerun must include the corrected fixture.

Final scenery review moved the rugby-side town junction outside the southern home footprint; added a geometric check that every road junction stays outside buildings. No further runtime changes planned.
