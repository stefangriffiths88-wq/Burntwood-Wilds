# Burntwood Wilds — comparative design and technical audit

19 October 2026. Requested by Stef: identify biggest flaws, run extensive checks and compare similar games. Review only; no gameplay changes authorised by this audit. Another session owns feature/run-readiness (PR84). Do not merge gameplay changes from this branch.

## Scope and evidence

Audited main commit `fb930bdff74844ce699c0e784ea621c9e76d5bb5`, released 10.23.0. Public versioned HTML matched audited local bytes: 463,912 bytes, SHA256 `a5081bf69e7751aa15459342b07c6a8f58539f7255f2902c027f09e8553f0d47`. PR83 is merged; previous queue/blocker statements in chat are obsolete. PR84 currently proposes restart-current-area recovery, introduction special-label correction and portable RUN packaging; these are pending, not audited as released fixes.

Ran all 14 existing suites: test, builds-test, reward-balance-test, reward-world-test, reward-flow-test, rugby-route-test, monster-town-test, sankeys-charms-test, first-journey-test, roster-workshop-test, harvey-test, immy-test, encounters-test, town-test. All passed. These cover real effect contracts, character mechanics, route/reward transitions, saves, onboarding and economy invariants. Some old suites/matrices cover only seven or ten heroes or use compatibility adapters. Passing these is not proof of balanced twelve-hero human play.

Additional reproducible VM probes in `probe.cjs` and `probe-results.txt` use the actual compiled released runtime and the existing harness. They establish boss-controller routing, exact economy arithmetic and absent interrupted-run persistence. Run from repository root: `node audits/2026-10-19/probe.cjs`. Invulnerability and disabled attacks in the isolated boss probe prevent unrelated death/damage; they do not establish survival difficulty.

Compared developer/publisher descriptions for five genre references below. This is a documented-design comparison, not a claim that this session played these commercial games. No new browser, native iPhone, frame-time, memory-growth or human retention test was run. Earlier release phone coverage is recorded in PROJECT_STATUS.md; it is not a new audit execution. No commercial-success prediction or numerical fun score is justified.

## Verdict

The biggest design risk is weak motivation for a second and third journey: rescuing places has little durable visible consequence, and many permanent purchases are difficult to feel. The biggest concrete newly reproduced combat issue is that the shared boss controller bypasses park-specific healing/shield AI. The game has distinct characters, earned physical XP, real charm interactions and improved onboarding; it is not missing a functioning core. The gap is making decisions, mastery and rescues feel consequential.

## Ranked findings

| Priority | Finding | Evidence | Player consequence |
|---|---|---|---|
| 1 — high | Permanent rewards are too subtle for the asking price | 2 essence per boss; first damage rank costs 2 for +1% normal attack, health +2; five rank costs 2/4/6/8/10 | Defeating a boss can end in a purchase the player barely notices |
| 2 — high | Town is a service hub with little persistent rescue payoff | Saved schema stores ranks, essence, unlocks and teaching flags; cleared areas are run.visited and reset | Familiar landmarks are charming but do not yet give a lasting sense of saving Burntwood |
| 3 — confirmed defect / high | Boss identity is partly flattened by dispatch | Core calls stepMonsterBoss before stepParkEnemy and continues; live park boss never reaches its collect/shield logic in the probe | An interesting enemy-specific tactic is absent despite its code and scenery existing |
| 4 — high | Repeating a hero has limited early build branching | Each hero has ordered weapon/special/defence tracks; most divergence is stat rolls, charms and shared late evolutions | New runs risk feeling like the same upgrade ladder with different percentages |
| 5 — medium-high | Rugby has a physical mission; other arenas largely share a clock-driven structure | Four arenas are bounded 900x1300 spaces, generic heroic at45s and boss at90s; Rugby has lane/car park/well/pitch | The strongest handcrafted opening can set expectations the other destinations do not yet meet |
| 6 — medium-high | Guidance still has contradictions and dependence on text | 10.23 introduction visible special label inherits TALK; park spawn float still says Umbrella Man while live boss is Bramble Beast | New players may misread controls or not trust names/objectives |
| 7 — high until fixed | Interrupted journeys are not recovered in 10.23 | Reload probe loses active tier/gold/state; only permanent save is persisted | A browser reload can erase the current attempt; PR84 is already addressing this |
| 8 — medium | Reward selection has a cumulative interruption cost | Up to6 choices per arena; normal choices require inspect then confirm; chests and Mythic add steps | Individual safe interactions can collectively fragment a short mobile run |
| 9 — medium-high | Ending lacks a playable narrative payoff | Fifth boss triggers spell-broken/human-form text, but no Cow Queen encounter or actual human transformation; repeat journey has same structure | The stated resolution is larger than the implemented event |
| 10 — validation risk | Balance and retention remain insufficiently measured | Long tests often force invulnerability/XP/positions or compatibility timelines; summary lacks damage-by-ability analysis | We can prove many systems work, but cannot yet say why strangers would return or which heroes are actually too easy |

### Economy: exact numbers, not a proposed rebalance

A perfect five-boss journey awards 10 boss essence. Buying all five ranks in one permanent stat costs 30 essence. Fully buying the five permanent stats on one hero costs 150 essence: 75 boss kills or 15 perfect journeys, before the once-per-save free gift and any essence spent elsewhere. This is a maximum-completion arithmetic bound, not a requirement to enjoy the game. Across twelve heroes the equivalent is 1,800 essence before the gift, starters and rerolls; nobody needs to max everyone.

Maximum damage investment is +5% normal attack damage. Maximum health investment is +10 flat health. A first +1% damage rank changes a 26-point unmodified attack to26.26, which still rounds to26 in the damage number. Real benefit exists; the feedback can conceal it. Permanent purchases apply next fresh journey, further delaying the feeling of improvement.

Charm-stock reroll starts at2 saved essence, then4,6,...; first starter unlocks cost6/12/24/40/60 by rarity. That means the first temporary shop reroll consumes one boss's entire essence reward. This was an earlier approved design, not an implementation bug. It now deserves reconsideration in the context of town progression. Recommend separating temporary-shopping expenditure from durable-rescue investment, or making the tradeoff exceptionally clear. Do not silently rebalance it.

Death before a final boss earns no boss essence. Gold and collected charms are run-only, so an unsuccessful novice can make no lasting combat progression despite real kills. Any consolation objective should reward demonstrated play or a first-time achievement, never time-based free XP or automatic level-ups.

### Boss defect reproduction

1. Select Jackson; start journey; enter park through `enterArena('park',true)` (production physical mode), clear ambient entities, spawn real park boss.
2. Set boss to60% health, sequence1, timer0. Disable player attacks and make player invulnerable only to isolate the boss state machine.
3. Advance1,800 frames at1/60s. Observed modes: walk, monsterWind, monsterAttack, recover. `healUsed=0`; all three rubbish piles untouched.
4. Positive control: feed the same low-health boss directly through `stepParkEnemy` with its timers advanced. Observed seekRubbish, collect, recover, walk, shield; `healUsed=57.5`.

`stepMonsterBoss` handles every non-heroic boss first and returns true. Therefore the park boss's intended specialised controller is bypassed in normal dispatch. Artwork is now a Bramble Beast, so the next implementation must decide whether to retain/retheme the old rubbish mechanic or remove it deliberately; blindly restoring the Umbrella Man theme would contradict current art. Similar early-return routing also replaces legacy owl/market boss branches. These could be intentional replacements; the audit establishes routing, not permission to restore all old behaviour.

Non-Rugby heroics also share the same hunt/warn/rush/rest controller, despite different species. Ordinary enemies do have distinct roles (ranged traders/crows, burrowing moles, chargers, pouncers, spitters, bandits), so “all enemies are identical” would be inaccurate. The concern is visual recognition and tactical payoff. Roles should remain readable in silhouette, attack tell, sound and response: dodge charger, approach ranged foe, interrupt support. Do not just add health or damage.

### Builds and pacing

Three ordered ability tracks provide a coherent identity per hero. Charms already include useful synergies and real tradeoffs; retain those. Ten heroes nevertheless share the same five defence-upgrade descriptions, even though their native defensive moves differ. Late weapon evolutions share Fire/Ice/Lightning. A hero may therefore feel substantially different from another hero while repeated runs with that same hero change less.

Recommended small target: three viable playstyles for each starter hero first. Each should change positioning or attack behaviour before the first boss, with understandable charm support. Do not add dozens of upgrades to solve this. Show what a choice changes on the field, not just a larger number.

The Rugby route contains purposeful landmarks and checkpoints. The other four have different enemies and scenery, but little equivalent mission interaction. One bespoke objective per destination would add more identity than another playable character. Possible examples, not approved scope: interrupt a support enemy, hold/repair a landmark under pressure, or choose a dangerous reward detour. Preserve the local setting and short sessions.

Thirty ordinary choices across five arenas imply at least60 inspect/confirm taps if all choices are earned, before chests, evolutions and shops; the one-off intro can add another choice. This is an interaction count, not measured downtime. Keep protection against accidental choices. Measure actual time in menus before deciding whether confirmation should be optional or details better integrated.

Final-boss charm treasure is run-only, but there is no sixth encounter in the completed journey. Its future practical value is consequently limited. Prefer a meaningful final completion reward in a future progression design rather than increasing reward animation length.

## Comparison: borrow the decision, not the content volume

| Reference | Documented design strength | Burntwood lesson |
|---|---|---|
| Vampire Survivors | Snowballing attacks, persistent gold upgrades; free power-up refunds encourage trying paths | Make power growth visible and experimentation inexpensive; do not assume tiny paid ranks produce the same sensation |
| Brotato | Up to6 weapons, character/item build variety, short20–90s waves and materials spent between waves | Shops should form a clear prepare/fight/collect rhythm; upgrades should support a recognisable plan |
| Soulstone Survivors | Active/passive synergies, bosses, skill-tree progression and curses/modes | Borrow clear build combinations and optional challenge, not hundreds of abilities |
| Halls of Torment | Quest-based progression and retrieved equipment used in future runs | Give play a visible next objective and a durable earned outcome beyond another stat rank |
| Deep Rock Galactic: Survivor | Mining shapes routes, procedural caves and explicit mission/extraction goals | Make local landmarks affect movement, risk and objectives, rather than only decorate the arena |

These are established games with far greater content budgets. Matching their feature counts is not a fair release condition. Burntwood's own advantage is a recognisable place, warm cast, rescue theme and short accessible play. Keep testing characters unlocked as Stef requested. Do not import monetisation, grind, paid video or compulsory recurring tutorials.

## Suggested order, pending explicit Update

1. Finish the already owned PR84 recovery/control-label work; validate resume without duplicated loot and actual phone interruption behaviour.
2. Choose and repair the park boss's intended unique mechanic; use production dispatch regression coverage, not only direct controller tests. Correct visible names consistently.
3. Design one compact durable rescue loop: Rugby saved -> recognisable town change -> concrete next goal -> meaningful unlocked choice. Keep cleared-run state separate from lasting town milestones.
4. Revisit essence costs/rewards and temporary rerolls together. Make first successful rescue grant something players can demonstrate immediately or next journey, without making permanent power compulsory.
5. Deepen starter builds and one additional arena objective. Measure whether players notice and use those decisions before adding more heroes/maps/art.
6. Test with strangers before declaring release balance ready. No paid cutscene is needed to answer these questions.

## Acceptance checks for the next human test

Proposed gates, not measured results: five first-time players unfamiliar with Stef, no spoken coaching. Record first movement, first kill/XP pickup/choice, ability use, first wrong route, first death, boss completion, shop purchase, voluntary second run. Aim for at least4/5 to reach the intended first destination and explain auto-attacks and gold-vs-essence unaided; treat the small sample as qualitative evidence only.

Ask after the session: “What were you trying to achieve?”, “What changed after your upgrade?”, “Which enemy did you prioritise and why?”, “What would you do differently next run?” Prefer observation over asking whether the game is good. Collect actual time to first upgrade, time in reward screens and reasons for quitting. Use opt-in test notes; adding analytics is a separate implementation/privacy decision.

Measure unprotected hero survival, time-to-kill and damage received at identical sensible earned builds, including melee/ranged and low/high tiers. Test ordinary difficulty, not only invulnerable scripted victory. On target iPhone Safari, measure frame times during a busy evolved build, a10–15minute session, background/reload/recovery, audio resume and small-screen touch occlusion. No memory leak or performance fault was established in this audit; do not label general code size or O(n²) separation as a measured leak.

## Primary comparison sources (accessed19 October2026)

- https://store.steampowered.com/app/1794680/Vampire_Survivors/ — developer description, snowball premise, permanent gold purchases and free power-up refunds.
- https://store.steampowered.com/app/1942280/Brotato/ — developer feature list: weapons, waves, materials, shop and difficulty controls.
- https://store.steampowered.com/app/2066020/Soulstone_Survivors/ — developer feature list: synergies, bosses, progression and challenge modes.
- https://store.steampowered.com/app/2218750/Halls_of_Torment/ — developer feature list: quests, gear retrieval, character/ability combinations.
- https://store.steampowered.com/app/2321470/Deep_Rock_Galactic_Survivor/ — developer description: mining, procedural routes, missions and extraction.

Repository evidence: upgrades/permanent.js, upgrades/progression.js, upgrades/rewards.js, items/economy.js, engine/core.js, arenas/monster-bosses.js, arenas/park.js, arenas/heroic.js, arenas/rugby-route.js, characters/defences.js, world/hub.js, world/reward-flow.js, ui/session.js, onboarding/first-journey.js and PROJECT_STATUS.md at the pinned commit. No private family material included.
