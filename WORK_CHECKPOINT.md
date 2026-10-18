# Active hotfix — 10.18.1 Bruce victory freeze

18 October 2026. User reports game frozen on beating Bruce. Reproduced 10.18.0 crash: a killing projectile synchronously runs finishAreaWalkout(), empties balls/eggs, then the indexed update reads a removed projectile and throws; requestAnimationFrame never reschedules. Source fix stops ball/star/egg collision processing and subsequent combat phases when play transitions to victory. No rebalance/save-schema changes.

PR77, source860e4ec34a342254afa00784197a07da36cba060, required full feature CI39142218989 in progress. Local build/syntax, reward-flow (new simultaneous ball/star/egg killing-collision regression plus movement/exit), roster-workshop, monster-town pass. Browser regression now performs an in-frame killing collision, checks RAF keeps advancing, and navigates north/taps exit. Await exact-candidate CI and screenshot review before merge; main remains10.18.0. New intended link burntwood-journey-v10.18.1.html?v=10181. Preserve all earlier scope/pending notes below. User character not yet known; optional clarification returned no answer, proceed across relevant projectile families.

# 10.18.0 complete and live — 18 October2026

PR76 merged at5d33a54e48cc16527664a15ef6820471b78e8af5. Full feature CI39087728346, main CI39089330122 and Pages39089330247 passed. Final phone artifact12120793876 inspected; all24 public files matched local bytes. PROJECT_STATUS.md records final source, production-vs-fixture coverage, migration and gift behavior. Pending: Stef’s native-phone playtest. Historical pending statements below are superseded. No further gameplay changes authorised by suggestions alone.

# Active update — 10.18.0 roster and workshop
18 October 2026. Explicit authorisation: “Let’s update. Obviously shops don’t become available until first boss defeat. Only open when character unlocked.” Branch feature/roster-workshop from verified21c93a4. One gameplay owner; no competing gameplay PR. Original dirty10.17 checkout preserved; work in separate clean worktree.

Scope: Ava/Jackson/Mimi start unlocked; others show??? with no menu portrait/selection and are absent from town. One final arena boss (not heroic) unlocks everyone for testing, saved across fresh journeys/reloads. Both shops require saved first boss victory and unlocked owner/cover. Old saves with awards, essence or paid ranks migrate access without losing progress. No save schema/key bump; two validated optional flags added.

Stefan owns a native open-front workshop, signed Swan Island in the illustrative town. Welcome -> OPEN WORKSHOP -> choose hero -> permanent upgrades, matching Mimi’s welcome/shop flow. Jackson covers when Stefan is playable, without duplicate Jackson in town. Jackson offers one free permanent upgrade per save, saved atomically with the rank; cancel/re-entry/reload cannot spend/duplicate it, failed saving does not consume it. Gift only while Jackson covers; normal purchases unchanged.

Local production tests pass for locks/services/migration/boss unlock/reload/gift/save failure; compatibility town/reward/route tests pass. Updated old workshop assertions for welcome and Jackson cover. Existing __test.select/reset explicitly enable a full-access compatibility fixture; production buttons never enable it. New roster tests and phone browser use actual production functions/taps without that fixture. Never claim old full-access matrices prove locked-menu progression.

Next: run required feature CI including new roster-workshop test/browser, inspect portrait/short/landscape screenshots, fix failures, merge only green work, verify main/Pages/public hashes and close release docs. Current live remains10.17 until publication. Cow Queen/story, enemy damage and RUN/active-run recovery remain separate.

## Final candidate
Runtime source8dbae760f071a6079a2ef8bbf503d993d5e85582; full CI39087728346. Changed-review passed; final phone artifact12120793876 inspected for fresh locked portrait/short/landscape selector, shutters, clear workshop signboard, unique Jackson/Stefan counter, greeting/hero choice/gift and reload. Full numeric/phone compatibility passed through charm-matrix start; remaining long matrix is running. No further runtime changes planned. Runtime399234 bytes, SHA25691de4b84e50111066a4b4b0c7766c3a42d2c50b99fa39960c9ef116718f6e879, blob89fe8dfc284b0f62be74f09474238ccacb6e3359 (remote/local match).

Superseded CI39087579262 was cancelled after its new production phone/access tests passed: screenshot review found workshop text overlapping windows, corrected by a solid signboard and consistent workshop heading. Final refreshed screenshots passed and were reviewed. Final merge/Pages/main/public-byte closeout still required.
