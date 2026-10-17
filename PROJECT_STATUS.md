# Burntwood Wilds — project status

## Current release: 10.16.0 — opt-in charm chests and clear town flow
18 October 2026. Resumed after conversation limit; implementation was already merged and deployed. This closeout changes documentation only.

- PR #74 merged at 326dd73553d3520f77b70e7a8d09fbbfce33f2cf. Final runtime source fba18f667893f2bf630c8ffbbedade8b65d700c8 passed full feature CI 39075096905. Main CI 39075894580 and Pages 39075894316 both completed successfully.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.16.0.html?v=10160 . Public canonical and versioned HTML both matched local bytes on recovery: 390715 bytes, SHA256 6322b1c3f66596c1ada893b7dbc10da0ae2240773cf100fa4214aad20e51beb9. latest.html also matched and points to 10.16.0.
- Heroic/boss rewards use physical chests opened deliberately. Three charm choices lead to equip/replace/bag selection in the same panel; replaced charms remain in the bag. Charm artwork and concise descriptions improved.
- Clearing an area stops threats and retains movement/pickups with a deliberate exit. Unclaimed loot is labelled without another confirmation popup. Town uses an interaction button, clearer junctions, workshop frontage and pocket garden.
- Existing final phone artifact 12116991078 was reviewed by the implementation session for swap/short/landscape, town, workshop, chests and exits. Production flow checks cover all 50 hero/arena combinations. Legacy bounded combat fixtures retain explicit automatic rewards; they do not establish production chest coverage.
- Native iPhone/Safari, enjoyment and survival balance await Stef's playtest. Recovery reused successful exact-source CI rather than repeating unchanged gameplay suites.
- Separate pending work: investigate low incoming damage/hit reliability before tuning; Mimi opening and fifth-area lead-in; difficult Cow Queen/husky finale and approved cat-food victory line. These were not implemented in 10.16.0. Preserve the detailed direction in WORK_CHECKPOINT.md.


## Previous release: 10.15.0 — Rugby detail and readable town routes
17 October 2026. User explicitly authorised this update after playtest feedback. No further suggestions authorise another release automatically.

- PR #73. Final source 6f841eb8e1aaba7e0a09a680e5c8452b6d988f3a; packaged f3e1161b76516a4313a0d706cbc5128b4a8714dd. Merged at136fc7a09e13abaf1f71637e8aa9d3cff50503fe.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.15.0.html?v=10150 . Production Pages39061855966 succeeded at the merge. All24 public files matched local SHA256 bytes: canonical/versioned game, preserved10.14.0, latest redirect, ten portraits and ten selector icons. Automatic postmerge main CI39061856410 was still running at closeout; premerge full checks passed. Documentation closeout changes no runtime.
- Rugby lane now gently winds with a shared drawing/collision centreline, potholes/puddles, worn tyre tracks, gravel shoulders and club signs. New ordinary arrivals are ahead of current movement/route travel; authored encounter/reinforcement placements remain explicit. Rail-end topology and heroic/well/Bruce ordering preserved.
- Mimi's five Rugby messages are nonblocking bottom-area captions, expiring after seven active seconds. No Continue/automatic combat pause or held-input reset. Captions sit above equipment/ability controls; normal interruption pause still works. Physical pitch entry starts Bruce without a dialogue button.
- Slower level-up tuning is isolated to physical Rugby: earliest choices 14/34/54/76/98/120 active seconds, at least18 seconds apart, XP threshold16+6 per pick. Six choices remain the arena cap; a quick boss victory may finish before all six. Other four arenas and the legacy bounded combat fixture keep their existing six guaranteed times and XP thresholds. Natural-XP choices now wait until the scheduled time instead of appearing up to three seconds early. Enemy difficulty remains unchanged.
- Town has signed boss routes, frontage streets and pavement links, matching minimap roads, and no town arrow. Rugby idle arrow remains. Mimi's open shop is inside the shopping centre, with MIMI'S above the doorway, visible shelves/stock/counter and the shopkeeper behind it. Jodie still covers when Mimi is playable. Existing conversation then shop sequence retained.
- Bruce retains the reference-based four-legged brown stag/orange fencing identity, now with contoured anatomy, layered flank/mane/face fur, expressive eyes and muzzle detail, split hooves, shaded antler beams/tines and loose mesh strands. No hero art/stats, other boss artwork/AI, portraits/icons or permanent save schema changed.
- Final CI 39060991575: both jobs passed, including numeric/character/save/reward/encounter suites, broad phone tests,266 original-seven hero/charm combinations and21 protected journeys/105 arenas. Newer heroes retain their own focused suites; do not imply the full matrix covered all ten. Final phone artifact12111407244 reviewed for detailed Bruce, actual lane movement, captions/control clearance, short/landscape well, signed town and clean shop frontage. New contracts cover all-ten route ordering, forward spawning, winding collision, spaced upgrades, shop interaction and junctions outside buildings.
- Earlier runs39060561748 and39060714623 stopped at a stale hardcoded shop tap after the shop moved inside; mechanics/encounters/reward phone checks passed before that failure. Fixture now reads hub.shop and retains actual touch/conversation/shop assertions. Screenshot review also fixed caption/bag overlap, frontage label overlap and a town junction in a home footprint. Superseded pending runs were cancelled by GitHub's concurrency queue.
- Canonical/versioned HTML380521 bytes, SHA256704dc587bc553ddea0af3e327a0efa1eccf70fdb6f032d50d62d2a185aa458f9, Git blob0fd82931fab9c5b9856850ef4c7ce7d29e1334cb. Historical10.14.0 preserved byte-for-byte.
- User acceptance pending: native iPhone/Safari, art appeal, Rugby encounter pressure and slower reward pacing. Protected automation is integration/layout evidence, not human fun or survival balance. RUN SDK/host work and persistent active-journey recovery remain deferred.

## Previous release: 10.14.0 — staged Rugby Club journey
17 October 2026. Explicit user Update authorises this release; further suggestions remain discussion until another Update instruction.

- PR #72 merged at 7ef6b4673bc0260e7d51ffd70622b186b2c3a3d6. Full mechanics candidate b744a98c66d936366c1241499393d43ca152196f passed CI 38926260549. Final isolated Rugby gate source 67fd95955ef8d6cdd1ca1f535ebce8585eb2d5b9 passed focused CI 38927597913; shared combat/characters/other arenas are unchanged between these sources. Packaged head c62905596b701e77e080b5ec3196aa1379b012b6 adds generated output and release entry. Earlier complete candidate 38925553950 also passed; no unresolved failing gate.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.14.0.html?v=10140 ; latest.html points here.
- Rugby alone now has a physical, approximately minute-long approach from Railway Café down the access lane, around the railway END at the club gates, through the car park to equipment containers/healing well and back towards the bottom pitch. No railway crossing. Paths, building exclusion, equipment and well-rim collisions prevent shortcuts; dimensions reset for the other arenas/town. Native Canvas scenery follows the reference direction; it is not a survey or a pasted map image.
- Normal waves stop at 60s. The heroic waits at the physical entrance after 60s; a visible gate prevents skipping into the club. Ordinary waves can resume after its defeat until 90s. At 90s remaining ordinary enemies retreat without kills/gold/XP, ensuring a genuine well break; an undefeated heroic is retained. Well keeps its existing once-only 30% heal/+20% speed/damage for 20 active seconds, respecting healing locks. It is optional. Bruce requires heroic completion, 90s, actual pitch entry and deliberate dialogue Continue; he never starts from a timer alone.
- Five brief Mimi dialogue moments pause combat/time. Above-character guidance arrow appears after 1.5 active stationary seconds and hides on movement. Objective/heroic bars now have measured separation. Bruce follows the selected map reference: four-legged brown stag, mane/cream muzzle/dark hooves, branching antlers and orange safety fencing; other boss artwork is unchanged. Source identity, unpainted reference crop and rejected crossing are preserved in journey-v10/assets/references/rugby/REFERENCE.md.
- Local all-ten route contracts and existing gameplay/reward/town/build/monster contracts passed. Full CI includes character, economy/save, encounters, broad phone, 266 original-seven hero/charm combinations and 21 protected journeys/105 arenas. New route tests cover all ten heroes, guard/well/Bruce ordering, physical restrictions, interruption/dialogue pause, idle threshold, well once and other-arena independence. The actual-navigation browser suite walks the lane/gate/car park and uses real dialogue/charm/well controls.
- Final phone artifact 12057597554 was inspected (route overview, guarded encounter/HUD and native scenery); prior refined artifact 12056737720 covers reviewed short/landscape well, Bruce and visible idle arrow. Protected screenshots deliberately suppress attacks and can accumulate unrealistic crowds: they establish flow/layout, not human balance. All-ten route contracts and exact effect checks also passed at the final source. Legacy enterCombatArena is explicitly a test-only abstract fixture; production UI always enters the physical route.
- Proportional CI followups: only Rugby-owned route/art/test plus docs/scope metadata can reuse unchanged broad combat evidence; all-ten route/effect tests, actual navigation phone review and reward browser checks still run. Shared runtime and workflow-only changes retain full gates. The final narrow gate was checked separately rather than rerunning a third unchanged charm matrix.
- Production Pages 39035805650 succeeded at the merge. All 25 public files matched local SHA256 bytes: canonical/versioned HTML, preserved 10.13.0, latest redirect, ten portraits, ten selector icons and Bruce reference crop. Documentation closeout changes no runtime.
- Runtime canonical/versioned HTML: 372157 bytes, SHA256 21fe87bcbd0569f1158e82417ab12dae7c3639bd7a8cb3c6cc65fab27a926613, Git blob f3adf083a5cdbe491b67f7b3722c41f66eb3e29f. Automatic postmerge main CI 39035805932 was still running at closeout; premerge full/focused checks passed. Do not infer its eventual result.
- User acceptance pending: native iPhone/Safari, actual route geography/length, Bruce art, heroic pressure and well pacing. Protected automation does not establish enjoyable survival balance. Other arenas, character moves/stats, permanent save schema, approved portraits and historical releases are preserved. RUN platform storage/host integration and active-run recovery remain deferred. No further game changes are authorised automatically.

## Previous release: 10.13.0 — town, monster bosses and Mythic progression
16 October 2026. User explicitly authorised the combined update. Further ideas remain discussion until a new Update instruction.

- PR #71 merged at 636930fb68e40a30db005a275eea3b729356e030. Final tested source e0a8a58a0b0ddc72f5751e710c0ab1b62d65fe27; generated packaging and documentation head 608d4415e8504e5276818dc226d2e32d6149200d. Agreed scope/delegated tuning: UPDATE_SPEC.md. PR #70 preserves the approved town reference independently.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.13.0.html?v=10130 ; latest.html points here.
- Native town buildings have physical footprints and water boundaries, connected routes, central Sankey's Corner, southwest Chasewater, Rugby Club south beside it and Park east. Brief help, current objective and route arrow guide the first Rugby encounter and later bosses. Existing five arenas remain; no sixth area or new hero was added.
- Five bosses now use distinct monster art, readable attack warnings, second phases and recovery windows: brown netted rugby stag Bruce, giant owl, trolley scrap monster, quarry rock golem Barry and bramble Park beast. Arena props add collision; defeated bosses lie down with bandage/bruise details. Human pressure/art acceptance awaits playtesting.
- Weapon, special and defence each gain an independent red Mythic level-six offer, then a three-choice evolution screen. Weapons: Fire spread / Ice extra damage and 30% slow / Lightning two additional targets. Specials: Venom / Leech / Wound. Defence: finite shield / escape decoy and speed / retaliation. Choices last this journey; proc sources cannot recursively retrigger themselves. Ten defensive identities preserve useful native actions and add finite protection/control. Weapon/special icons and actual cooldown fills appear in profiles, rewards and controls.
- Bosses one–four replace boss perks with stronger three-card charm choices guaranteeing Epic+. The fifth opens Mimi's spell-breaking ending without redundant equipment. 38 charms have unique art; Healing Wisp visibly orbits and heals every 3 active seconds. Seven matching evolution charms can be collected before choosing an evolution. Healing lockouts/caps and shop debit guards remain enforced. Existing modest level health/power growth is shown after upgrades.
- Compact stats show all 12 values on 390x650, with benefits/details on tap. Blur/background interrupts pause safely, clear held inputs and require deliberate resume. Defeat feedback names cause/duration. Approved portraits, selector icons, permanent save schema and historical playable HTML are preserved.
- Full feature CI 38917974306 passed both jobs: main/character/build/reward/town/encounter suites, all broad mobile browser suites, 266 original-seven hero/charm actions and 21 protected five-area journeys/105 arenas. New focused tests cover 90 explicit hero/track/evolution selections, exact bounded elemental effects, ten defences, five boss AI/renderers, geography, interruption and healing transaction guards. This is automated integration evidence, not human survival/fun balance.
- Phone artifact 12054085367 (24 captures) at exact final runtime; broad phone artifact 12053931444. Reviewed final short-phone stats and portrait/landscape Mythic/selector layouts, town, all monster/resting bosses, Wisp and Mimi ending. Earlier full runs exposed stale labels/fixture selectors/reward assumptions plus a skipped charge contact; all corrected before the successful final gate. Generated versioned HTML is now staged alongside canonical output so CI rebase cannot stop on that unstaged file; workflow edits require full checks, and focused followups retain reward browser checks.
- Production Pages 38919437820 succeeded at the merge. All 24 public files returned HTTP 200 and matched local bytes: canonical/versioned HTML, latest redirect, preserved 10.12.0 and all ten portraits plus ten selector icons. Documentation closeout changes no runtime.
- Canonical/versioned game: 357464 bytes, SHA256 3efe17d1827f332bf638ce869a95d97f8c7d697b6833b703747590c01e2b1393, Git blob 4179ab4ca271a1cdbaa88f84d6d0d6a5593a55b4. Automatic postmerge main CI 38919438308 runs redundantly; record its result separately rather than infer it from premerge evidence.
- Native Safari/iPhone visuals, town navigation, boss pressure and build enjoyment remain user playtests. RUN SDK storage/host screen integration, publication/eligibility/jam submission and persistent active-journey recovery are explicitly deferred. Current permanent progress remains browser-local; active sessions pause but do not recover after reload. No future gameplay work is authorised automatically.

## Previous release: 10.12.0 — rewards, clarity and world artwork
16 October 2026. Implemented following the user's explicit Update instruction; further suggestions require a new Update instruction.

- PR #69 merged at 01fd5659eea43e455ac6ca10d8c4372c476ad888. Final feature source ee55b6bdb2b82ae4deba7bc65327211019179bb0.
- Live: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.12.0.html?v=10120
- Added approved coloured character selector icons, clear stat benefits and consistent symbols, five gold/empty permanent upgrade sockets, illustrated charm rewards/equipment and chest/card reveals. Skipping the reveal does not select a card; selection requires a fresh deliberate card press.
- HUD now has bottom-left health orb, green XP strip and equipped charms below it; floating joystick starts on the playfield. Existing large boss health bars retained. Menu pauses the active session; abandoning requires confirmation. Shop conversation precedes a separate open-shop action; intermediate victories preserve the active run.
- One-tap shrines restore 30% max health and grant +20% speed/damage for 20 active seconds with blue under-player glow. Healing lockouts remain respected. All five areas' enemies/bosses have refreshed native Canvas artwork, including distinct Park cats and Trolley King; AI, hitboxes and enemy strength are unchanged.
- Full implementation CI 38882639920 passed at 21e0d9b62d0b72205aba0a4a5505e001cb40b0f9. Final presentation/test/workflow followup CI 38883821304 passed at ee55b6bdb2b82ae4deba7bc65327211019179bb0; mechanics unchanged. Phone artifacts 12037998258 and final corrected 12039115656 were visually reviewed at 390x844/650. Earlier stale text assertions and a new browser fixture error were corrected before these successful runs.
- Production Pages 38884068024 succeeded. Four public HTML/redirect files and all ten icon assets returned HTTP 200 and matched local bytes. Canonical/versioned game: 315448 bytes, SHA256 78dc104434bef0cd3119f6226d62cbd14229f2581b481a18373bdfdbcca49079. Automatic postmerge CI 38884068113 was still running at handover; do not infer its result from the premerge passes.
- Native Safari playtesting, perceived reward excitement and enemy-art acceptance remain user review. Paused runs are preserved within the current session, not across reloads. Full protected journey matrix still covers the original seven heroes; focused newer-hero checks do not imply the same matrix covered all ten.
- No further gameplay work authorised. Future map redesign, CI write-safety and legacy importer/template restructuring remain separate work. Preserve the independent audit chat's documentation.

## Historical releases — current state above takes precedence

## Previous release: 10.11.2 — upgrade choices in the spotlight
16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- User explicitly requested update: 10.11.1 level-up hits better, but choices still boring; glowing boxes, bold text, dull everything except the three options. Presentation-only: near-black backdrop, muted heading/container/gold frame, brighter thicker rarity borders/static glow, bold names and bright effect descriptions. Existing accepted 550ms hero glow and gold construction/cascade retained. Perk effects, balance, reward scheduling, art and saves unchanged.
- User rule remains: suggestions are discussion only; only update when Stef explicitly says update. No further game updates are authorised.
- PR #67 merged at aa21b25faafdf28e3e99db2f9491b75f622a62b6. Exact tested source 3ba88832e94c1a80fefac3688f45ac28c9ad4e98. Feature CI 38839801020 completed successfully; artifact 12020776946. Phone screenshots reviewed at 390x844 and 390x650 plus reduced motion; all three options fit and remain readable/tappable.
- Build/syntax, natural-XP/pause/choice/cancellation and ten-hero reward checks passed locally. Existing full workflow also ran all gameplay/character/build/town/encounter/browser/charm checks. Main automatic CI 38840508097 is running at closeout; unchanged runtime already passed pre-merge. Do not wait for or rerun unrelated simulations for this visual release.
- Production Pages 38840507659 succeeded. Public canonical/versioned HTML and latest.html returned HTTP 200 and exactly matched tested local bytes. Game: 293789 bytes, SHA256 a1f078b82b2744b111b8a2ada2457507515f12b8a0bfb46426b69fcd07f68fd3.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.11.2.html?v=10112 ; latest.html points here.
- Efficiency feedback: user asked to finish and avoid unnecessary checks. Identified delay: automatic workflow always runs broad gameplay suites and uploads phone screenshots only after the long charm simulations (feature run ~7m). No extra CI run was requested. Manual reward checks were broader than this CSS/heading change needed. AGENTS.md now requires proportional checks: build/syntax, affected mobile layout/taps/reduced motion and production verification for presentation-only edits; reuse unchanged combat/balance evidence. A focused visual workflow/earlier screenshot upload would remove the automation bottleneck in a separately authorised tooling update.
- Native Safari and subjective card appeal remain for user playtest. Next action: feedback only; do not implement further suggestions without explicit update instruction. Historical HTML/art/saves preserved. Documentation-only closeout changes no runtime.

## Previous release: 10.11.1 — level-up glow and gold reward reveal
16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- **User working rule:** suggestions/ideas are discussion only. Only change the game when Stef explicitly says to update. User authorised finishing this current update on 16 October; no future updates are authorised. This rule is also saved in AGENTS.md.
- User reported upgrades still felt fast/unrewarding and the popup annoying, then suggested a character glow followed fractions later by a gold frame building around the choice screen. 10.11.1 provides a 550ms anticipation using the existing safe upgrade pause, warm native hero halo/stars, animated SVG gold frame and staggered cards. Immediate reduced-motion alternative, synchronous cancellation and 0.35s resume grace. No extra confirmation. Reward frequency/strength remains the 10.11.0 system. Spec: journey-v10/BUILDS.md.
- PR #66 merged at 289d85b1054c74db432ab662b697b4a3c10233b1; exact tested source 6cec44d71e2a0737719ca4c787d760c058fdfb49. Full feature CI 38838613671 passed all gameplay/character/build/reward/reveal/town/encounter checks, seven browser suites and the full existing charm matrix/journeys. Artifact 12020595299.
- Local all-ten natural-XP/pause/cancellation tests, reward contracts and full gameplay tests passed. Browser captures reviewed for glow, gold construction and ready cards at 390x844/650 plus reduced motion; cards fit both phone heights. Native Canvas halo was also inspected. Tests verify paused combat/clock, one choice, immediate cancellation and no delayed reopening.
- Character modules, portraits, progression saves and historical releases preserved. No new game state or timeout; reveal uses the existing upgrade pause. Phone browser automation is not native Safari and does not establish fun. User emotional/visual acceptance remains pending.
- Production Pages 38839153292 succeeded at documentation head 34209cec11323b2da739178d5119ae37294187f8 with identical runtime. Initial merge Pages 38839108225 was superseded/cancelled by that documentation build, not a game failure.
- Public versioned/canonical HTML, latest.html and preserved 10.11.0 returned HTTP 200 and exactly matched local tested bytes. Game: 291962 bytes, SHA256 7dcad28405068a35337082716f25e5a93b301b225c6131ff9cb9a619b0597f35.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.11.1.html?v=10111 ; latest.html points here.
- Follow-up: main CI 38839108593 completed successfully before the 10.11.2 update. User playtest: level-up hits better; choice cards still felt boring. 10.11.2 addresses card presentation.
- Next: user playtest reward presentation/native Safari. Do not implement further suggestions unless Stef explicitly instructs an update.

## Previous release: 10.11.0 — meaningful rewards and staged challenge
Updated 16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- User requested rewards that feel dramatic/exciting, then authorized whole-game reward/balance work. PR #65 merged at e847739b6103e0654bdcdfcc0338f04da2a73391; exact tested source 28714ecdfab6f610251ac5858cf90ffc9d23888f, tree 8fb50a001e39881b8989f2836708eac09c467f69. Specification/numbers/rationale: journey-v10/BUILDS.md, 10.11.0 section.
- Stronger capped stat gains (Common Power 3% → 10%, Rare 7% → 22%), two distinct ability choices when two paths remain, Rare+ stat milestones on picks 3/6 (Epic+ in areas 4/5). Explicit ability-step/final-upgrade labels separate investment from rolled rarity. Weapon upgrades begin on the next attack within .12s.
- Heroic spoils guarantee one Rare+ charm, Epic+ in areas 4/5, with equip/bag/fusion consequences labelled. Boss/heroic gold 35/20; ordinary gold drop chance 18%. Prices 30/55/95/150/220; distinct fresh stock includes an affordable charm when gold is at least 30. Reopening never refreshes stock. Scavenging grants 5/8/12/18/25 immediate gold as well as pickup range.
- Enemy HP/damage follows arena order, not selected levels. Existing enemies are not buffed by picking a reward; spawn pressure follows elapsed milestones. HP multipliers 1/1.4/1.9/2.45/3.1; damage 1/1.22/1.44/1.67/1.9. Fire/lightning/bleed perks scale once with Power. Existing timing, CC/proc/healing/cooldown caps remain.
- Zero-effect stats are filtered for critical suppression, insufficient crit investment, Last Light healing lockout and effective charm caps. Partial gains are clamped to remaining cap and shown. Reward banners/chimes and card progress hints are isolated in upgrades/feedback.js, with reduced-motion CSS and no extra confirmation.
- Ten character modules, their moves/upgrade definitions, 10.10.1 heights, all approved portraits, saved progression and permanent prices are byte-unchanged. Historical 10.10.1 and 10.10.0 HTML are preserved. No new hero/portrait/town geography work.
- Final feature CI 38832291748 passed: gameplay, Joseph/Tom/Havannah, builds, new reward contracts, town/save, encounters, all six browser suites and charm matrix/journeys. Final artifact 12017561944; all seven new reward captures reviewed at 390x844/650, including milestone, selected reward, mastery, heroic and shop views. Visuals suite retains all-ten idle/attack/town/short captures.
- New seeded 30-build/900-choice audit covers all ten heroes, real Common Power selection damage, no enemy drift, caps/partial gains, rarity, affordability, no free shop refresh, exact payouts and perk scaling. Artifact result exactly matches local seeded JSON. Existing charm suite includes 210 original-seven hero/charm actions and 21 five-area journeys / 105 arenas across those seven heroes and three builds. Newer heroes retain their focused thirty-charm and five-arena actual combat suites; do not claim the same 21-journey matrix covers all ten.
- Earlier candidate CI 38830775830 completed combat journeys but failed a stale expected 32-gold assertion. Corrected to 55 while retaining duplicate-payment checks; succeeding candidate 38831555968 passed, followed by the final cap-aware source/run above. No known failing check remains at the released source.
- Production Pages 38832806337 succeeded at the game merge. Public canonical/versioned HTML, latest.html and preserved 10.10.1 returned HTTP 200 and exactly matched local files. Canonical/versioned game is 288141 bytes, SHA256 08ce4ad20e65b01f24507acdbc90107458f58421da6308db29750f6f9fcbb41c.
- Play: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.11.0.html?v=10110 ; latest.html points here.
- Final follow-up, 16 October 2026: automatic main post-merge CI 38832806942 completed successfully. Documentation-head Pages 38833045982 also succeeded. All release automation is green; user fun/balance/native Safari acceptance remains pending. Documentation-only closeout does not change runtime files.
- User feedback/limits: implementation, automated contracts and protected combat are verified; fun, human survival balance and native Safari acceptance of 10.11.0 remain pending. The prior height/consistency playtest is also not silently marked accepted. Next: user tests reward impact, ability choices and five-area difficulty ramp. Do not begin unrelated features automatically.
- Deferred: CI write-safety/legacy importer, central build version/template, town geography, portrait thumbnails and cinematic. CI phone review now runs before the long charm matrix so layout failures are detected sooner, without removing checks. Earlier 10.10.1 main CI 38828036109 ultimately succeeded.

## Previous checkpoints — historical; current state above takes precedence

## Current release: 10.10.1 — measured character heights
Updated 16 October 2026. Read AGENTS.md and DEVELOPMENT_GUIDE.md before editing.

- User clarified/authorized: Stefan 6ft3, Jodie/Zak 5ft10, Jackson 5ft1 (9 inches shorter), Evie 5ft2 (one inch taller than Jackson). Corrected four character drawing scales; Jodie stays baseline. Other six sprites retain established sizes/builds.
- PR #64 merged at 34432b28a93d67274e726b3e8cc11011d3d35edf; tested source 77a66cadb75141f43fb75fad89277f4780ac18b2.
- Feature CI 38827119252 passed all gameplay/character/progression/save/encounter/charm and five mobile-browser suites. Artifact 12016320109; reviewed changed heroes' idle/attack/town/short-screen captures, plus native all-ten lineup/town render. Browser measurements (opaque idle silhouette, excluding shadow): Stefan 61, Jodie/Zak 57, Jackson 49.667, Evie 50.333 world units. Raster tolerance 1.2% around requested height ratios.
- Fresh local gameplay, Joseph/Tom/Havannah, builds, town and encounter checks passed. Quick audit passed manifest completeness/uniqueness, deterministic build, JS syntax, diff whitespace, ten unique portrait assets and consistent version/redirect. Character diff is exactly four drawing scale calls; combat logic/stats/hitboxes/progression/arenas untouched. Approved portraits and historical 10.10.0 unchanged.
- Versioned game: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.10.1.html?v=10101 ; latest.html points here.
- Production Pages 38828035318 succeeded. Public versioned/canonical HTML matched the tested bytes; latest redirect and preserved 10.10.0 also matched. Versioned/canonical HTML: 281199 bytes, SHA256 105e237eff496130c846cd64c167f486e271ed72216930d178f70366ba5cc5ea.
- Main post-merge CI 38828036109 was still running at closeout; the full pre-merge run passed at the exact unchanged source. Check its final result before further development.
- User requested a quick audit and closeout. No new defects found in this scope. Known CI auto-commit/legacy importer debt remains deferred; no unsolicited refactor. Native Safari/user visual acceptance of 10.10.1 remains pending.
- Next action: user phone comparison of corrected heights and silhouettes; do not claim visual acceptance or start unrelated work automatically. Preserve small/slim Jackson, rounder Evie, athletic Zak, tall/slim Stefan and smaller children.

## Earlier checkpoints (historical; current state above takes precedence)

Updated 16 October 2026. Read DEVELOPMENT_GUIDE.md, this file and AGENTS.md before editing.

## Historical 10.10.0 feedback — corrected scaling implemented in 10.10.1; user acceptance pending
Updated from user feedback, 16 October 2026 at 00:52–00:53 Europe/London, after the 10.10.0 testing sign-off.

The user reports: “The sizes and character consistency still being an issue.” This supersedes the earlier positive visual/playtest interpretation. The automated checks and deployment passed, but they did not prove that the size relationships and visual consistency meet the user's expectations. Do not describe the character presentation as accepted, fixed or fully consistent.

**Next chat's immediate priority:** investigate the current 10.10.0 character presentation before new feature work. Compare all ten playable characters side by side at the same camera scale in combat and town, including idle/moving/attacking states and phone-size views. Check actual rendered silhouette/body/head/paw proportions, not just collision radius or canvas scale constants. Identify the specific mismatches and propose a coherent correction using the approved identities and latest user direction. This message authorizes recording/investigation, not a speculative redesign or global gameplay rebalance.

Preserve the established targets: Jodie adult baseline; Jackson (11) small/slim; Ava (7) smaller; Stefan tallest/slim; Zak Jodie's height and athletic; Joseph larger than Ava; Evie slightly larger/rounder than Jackson; Tom stocky, Havannah young-child size and Mimi medium. Preserve detached floating paws/no conventional limbs and separate approved selection portraits. Do not revert or regenerate approved identities merely to equalise bounding boxes.

No new screenshot, named offending character or exact measurement was supplied with this report; do not invent a root cause. Current source is main, and visuals/README.md, character renderers, world/residents.js and visuals/cat-art.js describe the implemented 10.10.0 system. Keep all combat stats, hitboxes, attack reach/timing, upgrades and arena balance unchanged unless an actual related defect is established. Maintain the hold on unrelated development until this visual issue is resolved and user-tested. The 10.10.0 release remains live; this issue was documented without changing game code.

## Current verified release: 10.10.0 — coherent playable character proportions
- Release PR #60; merge ab86242be799422fa2f4a4a50ef5004780d0bc92 (reviewed 16 October 2026, Europe/London). Havannah, Joseph and Tom are already complete and playable; do not resume their old candidate branches or rebuild them.
- Open in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.10.0.html?v=10100
- Stable current entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Ten heroes, five arenas and thirty charms. Latest change is presentation only: Jodie adult baseline; Jackson small/slim (11), Ava smaller (7), Stefan tallest/slim, Zak Jodie's height and athletic, Joseph larger than Ava, Evie slightly larger/rounder than Jackson. Tom stays stocky, Havannah child-sized, Mimi medium. All have detached paws and no conventional limbs. Town and combat use character-owned sizing without old town correction multipliers.
- New visuals/cat-art.js contains shared drawing primitives; each character owns its identity, proportions and animation. Reference: journey-v10/visuals/README.md. Approved portraits and historical game files are preserved.

### Cross-check evidence — 16 October 2026
- Exact source: ab86242be799422fa2f4a4a50ef5004780d0bc92. Main CI 38822801386 and Pages 38822802195 (including deploy) succeeded. Main artifact 12014355172 contains 124 files, including forty ten-character idle/attack/town/short-screen captures. All forty sprite captures and the short Havannah selector were visually reviewed; native Safari/user visual acceptance is still pending.
- Rebuilt from manifest with build.py; game.js, canonical HTML and versioned 10.10.0 HTML reproduced exactly. JS syntax passed.
- Fresh local runs passed test.cjs, joseph-test.cjs, tom-test.cjs, havannah-test.cjs, builds-test.cjs, town-test.cjs and encounters-test.cjs. They cover existing combat/progression, all fifteen upgrades per new hero, dodge/CC/proc limits, save/import/storage failure, all five arenas, first charms, dialogue and retained journeys.
- The existing full CI also passed charms-test.cjs and all five browser suites (base, Joseph, Tom, Havannah, visuals). Charm artifact records 21 five-area journeys / 105 arenas across the original seven heroes and three builds; those heroes cover 210 single-charm combinations. Joseph/Tom/Havannah each add thirty single-charm checks and actual five-arena heroic/final combat. Havannah additionally has a retained five-area/30-choice journey. These counts do not mean all ten completed the same three-build journey matrix.
- Cross-compared 10.9.0 source at 85d0135f0cb5f106d1da2d1f32482133ae81f611: only eleven drawing-function bodies changed, six drawing helpers were added; all other top-level function declarations are unchanged. CHARACTERS, PROFILES, SPECIALS, DODGES and STAT_NAMES are identical. Portrait tree diff is empty. Mobile tests confirm collision radius remains 14 for all ten.
- Public versioned and canonical game: 281183 bytes, SHA256 571e9242992775344a9649344da6041073572c5428da580ccad848b580a8524f, exactly matching this tested source. latest.html destination is 10.10.0. All ten public portraits match repository bytes. Public 10.9.0 and 10.8.0 files also match their preserved historical bytes.
- No failing automated checks found. Human survival balance, sustained native iPhone performance and final visual acceptance are not established by protected scripted runs or Chromium automation. Town road geography remains illustrative. CI still runs the legacy importer and can push generated files; isolate that maintenance change from gameplay updates.

### Testing gate — 16 October 2026
- User feedback: “all seems good on testing.” Record as a positive playtest report, not proof that every device/character/build combination has been manually tested. Browser/device was not specified.
- Final check: main remains 435818fa85ef089de6a3414ba8e66d05322108d2 before this documentation update; no gameplay changes since the fully passing source ab86242be799422fa2f4a4a50ef5004780d0bc92. Main regression 38822801386 passed; latest documentation-head Pages 38825661684 succeeded. Repeat public checks verified canonical/versioned HTML, latest entry and all ten portraits match the tested files.
- Earlier testing result (superseded for visual acceptance): automated checks were green and initial playtest feedback was positive. The later size/consistency report above reopens the visual testing gate. Do not silently retune unrelated systems.
- No new gameplay build has been started. Further development must wait for a clear testing result and an agreed next update; each future build must pass its own gate.

### Current workflow checkpoint
- This review changes documentation only; no game version bump or gameplay/art change. It corrects this status file previously stopping at 10.9.0 despite a verified 10.10.0 release.
- Current authoritative source is main, not the stale original scratch checkout. A separate clean worktree was used so prior uncommitted 10.9.0 files could not overwrite the 10.10.0 artwork.
- Next: user Safari comparison of all ten sprites in town/combat, attack readability and size relationships; diagnose specific feedback locally. Thumbnail selector, opening cinematic, escape tokens and accurate road redesign remain separate/unstarted work. Dedicated CI write-safety/template/version-registration cleanup follows user priorities, not an automatic rewrite.
- Earlier sections below preserve release-time evidence. Their old latest.html destinations or playtest status describe those releases; this top section is the current truth.

## Released: 10.9.0 — Havannah
- PR #58 merged on 15 October 2026 at commit c25057951722d9d99f4224ca35673b466e502d31.
- Versioned game: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.9.0.html?v=1090
- Havannah: approved portrait and sprite, Sass Sparks, FULL TANTRUM, Can't Catch Me, fifteen upgrades and town dialogue. See journey-v10/characters/HAVANNAH.md.
- Feature CI 38806305369 and main CI 38807351836 passed; Pages deployment 38807351309 succeeded. User reported that the game works well. Human balance remains subject to further playtesting.
- Preserve prior releases. No known automated failures. Future fixes must target affected modules. Portrait thumbnails remain separate and unstarted.

## Released: 10.8.0 — Tom and Joseph playable
- Tom PR #56; merge 745d0030727494618542f878cced4e0d73f235ec. Joseph PR #55 was released/tested first (10.7.0); see below. Nine playable heroes, five arenas; no existing character module was changed by Tom's build.
- Safari URL: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.8.0.html?v=1080
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Tom: approved Option 3 tactical selection portrait, compact native Canvas tabby with two detached floating paws and no arms/legs/feet. Heavy Hands, Earthquake, Shoulder Barge, fifteen cumulative upgrades and exact general town dialogue. Shared stats/growth, charm equipment, workshop and save validation integrated. Full numeric/animation spec: journey-v10/characters/TOM.md.
- Third/fifth overlap produces one primary uppercut; collision hits do not recurse. Each expanding wave hits an enemy once. Legendary Earthquake has three total waves. Swept barge contact, bounded protection/recharge, one consumed Rebound and boss launch/knockback resistance are tested. Waves/launches have hard bounds and reset between arenas/characters.
- Existing name buttons wrap to two rows for usable phone targets; QUAKE is the compact action label, with full Earthquake name retained in profile/upgrades. No portrait-thumbnail redesign.
- Targeted Joseph and Tom tests cover all fifteen real upgrade choices each, thirty charm combinations each, exact proc/damage/CC/dodge rules, save ranks, dialogue, and actual heroic/first-charm plus final-boss combat in each of five arenas. Existing seven-hero charm matrix and five-area journeys retained. All existing character modules are byte-unchanged relative to 10.7.0.
- Final branch CI 38797152578 passed at 71dc9bded713b3367d3e4b6f27ce67064979d735 (initial 38795063657 also passed). Build, gameplay, both new characters, builds/stats, town/save, encounters, charm journeys and three browser suites passed. Final branch artifact 12002587680; inspected 390×844/650 selection, idle/punch/uppercut, airborne enemy, three-wave Earthquake, barge, town/dialogue and visible defeat sprite. Production Pages 38798210303 build/deploy succeeded; public game/portraits verified byte-for-byte. Main CI 38798211807 passed all checks.
- Public versioned/canonical HTML: 276071 bytes, SHA256 a69cf0b68207613e40f352845f0e92717084bd109793f859837fd244b2978284, exact match to the tested local build. latest.html points to 10.8.0; all nine public portraits exactly match local approved bytes. Approved Tom WebP: 512×526, 90572 bytes, SHA256 97318f8b22c8ea2c84495f66a2083f15144e191c698e7abc777a0d3346460ee5; Git blob 7c0b33087a383b05b4b3ac2b8fdd97d49ed838ba. Both original reference sheets are preserved as hash-verified binary assets; exact source crop/checksum in catalog. No upscale or regenerated portrait.
- User playtest/native Safari and human balance acceptance pending. Scripted protected positioning verifies integration, not survival balance. No known failing automated checks. Existing road geography, cinematic and escape-token plans remain deferred.

### Tom changed files (exact implementation/release set)
- .github/workflows/journey-v10.yml
- PROJECT_STATUS.md
- burntwood-journey-v10.8.0.html
- burntwood-journey-v10.html
- journey-v10/README.md
- journey-v10/assets/ART_DIRECTION.md
- journey-v10/assets/catalog.json
- journey-v10/assets/portraits/tom.webp
- journey-v10/assets/references/tom-approved-gameplay-reference.jpeg
- journey-v10/assets/references/tom-approved-portrait-options.jpeg
- journey-v10/browser.cjs
- journey-v10/build.py
- journey-v10/characters/TOM.md
- journey-v10/characters/tom.js
- journey-v10/controls.js
- journey-v10/engine/core.js
- journey-v10/game.js
- journey-v10/manifest.json
- journey-v10/menu.css
- journey-v10/registry.js
- journey-v10/state.js
- journey-v10/test.cjs
- journey-v10/tom-browser.cjs
- journey-v10/tom-test.cjs
- journey-v10/ui/menu.js
- journey-v10/upgrades/build-stats.js
- journey-v10/upgrades/permanent.js
- journey-v10/upgrades/progression.js
- journey-v10/world/conversations.js
- journey-v10/world/hub.js
- journey-v10/world/residents.js
- latest.html

## Released: 10.7.0 — Joseph
- PR #55; merge 4ce8336c88dea155a8eb72c69c16ab056e5a34fe.
- Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.7.0.html?v=1070
- Approved Rugby Club portrait and Option 2 Hooded Training native Canvas sprite. Rocket Fists, path-based OVERHYPE!, Turbo Dash and fifteen upgrades; exact general/Jodie dialogue, save/workshop/growth/charms/five-arena integration.
- Branch CI 38792926077 passed gameplay, focused Joseph, build/stat, town/save, encounter, charm/journeys and mobile-browser checks. Phone screenshots inspected (895×842 portrait and 390×844/650 layouts). Main CI 38793723366 passed; production Pages 38793721686 build/deploy succeeded.
- Public 264200-byte HTML exactly matches local; SHA256 342d0e77756a61bab4718e5acb7831bde880c28e07faea8339c8bf54c29de5f5. Public portrait exactly matches committed 203722 bytes; SHA256 fea4c2ffda6b350212125e7f8ac6e015217e46505cf1e6c40257c9c5779ec9d4.
- User playtest/native Safari and human balance acceptance pending. Scripted invulnerable combat verifies integration only. Character specification: journey-v10/characters/JOSEPH.md.
- Tom completed in 10.8.0 above. Portrait thumbnails remain a separate task requiring approval.

## Released: 10.6.0 — five-area builds and Chase Terrace Park
- Release PR #53; merge 00e05ccfa26919118a1ffff74cf22d15f23adf19.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.6.0.html?v=1060
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- A run requires all five distinct areas in any order. Six upgrade choices per area (30 total), heroic at 45s and final boss at 90s, plus boss fighting time. Each chosen level grants modest character-specific growth.
- Chase Terrace Park: Scrapper, Hedge Pouncer, Bin Bandit, Bench Bruiser, Spitter, heroic Patch and final Umbrella Man. Warned sweep/rush, stuck recovery, frontal umbrella guard and interruptible rubbish healing. Each completed heal is up to 5% max HP; total capped at 15%, even with replenished piles.
- Twelve stat tracks, Common–Legendary stat-roll magnitudes and coloured ability investment cards. Later areas improve rarity odds; fourth/fifth heroic offers guarantee an Epic-or-better choice. Five Legendary selections per stat or its lower cap; no upgrade beyond Legendary ability rank.
- Thirty charms: 8 Common / 8 Uncommon / 7 Rare / 5 Epic / 2 Legendary. Rarity is separate from fusion rank I–III. Three equipment slots; exact effects and conflicts in paused BUILD / BAG. Town-only equipment/fusion; stronger bag fusion retains the replaced weaker copy.
- New build mechanics include crit guarantee/damage, armour, lifesteal, stationary damage, special cooldown tradeoffs, shadow clone and once-per-arena lethal rescue. Lucky Paws and normal criticals share one multiplier and reset Patient Fang correctly; Blunt Promise suppresses criticals.
- Zero starting gold except an equipped Loaded Purse starter gives 100 once. Modest gold drops and direct heroic/final gold rewards. Mimi sells three single-purchase charm offers, refreshing after victories; essence rerolls cost 2/4/6… across the whole run.
- Stefan offers global permanent starter unlocks at 6/12/24/40/60 essence by rarity. Select one for future fresh runs, no repeat entrance charge. Existing modest per-character permanent upgrades and two-essence final-boss rewards are retained.
- Existing seven heroes, approved portraits, combat sprites, town conversations, shopkeeper swap, hub scales, wounded bosses and Jackson’s boss-damage/no-knockback behaviour are retained. Park has its own town/minimap boss marker and wounded preview.
- Ownership and exact numbers: journey-v10/BUILDS.md, CHARMS.md and TOWN.md. New modules: upgrades/build-stats.js, items/charm-catalog.js, items/economy.js and arenas/park.js.

## Verified release evidence — 10.6.0
- Final branch CI 38788156173 at eee9f9a0d57d0d5c75102448926b9117907ed8f5: passed build, gameplay, focused build mechanics, town/save, encounter, charm matrix/journeys and mobile checks.
- Main CI 38789350842 and production Pages 38789351184 succeeded.
- All seven publicly served portraits returned HTTP 200 and exactly matched their approved committed bytes.
- Public versioned HTML matches the tested local build byte-for-byte (SHA256 b348ef3df33e39abe06d06187ecd68d1ebeb0f1b831aea2e7d3ba3d306b793a6). BUILD_ID 10.6.0 and latest.html destination verified.
- Tests cover rarity boundaries/caps, seven growth profiles, crit conflicts, actual shrine/build damage calculation, proc bounds, finite healing, starter transactions, zero-gold/Purse rules, rising confirmed rerolls, inventory pause and v1 migration. Gameplay/save regression and Jackson charge/finisher isolation remain green.
- 35 fresh hero/arena first-charm acquisitions; 210 hero/charm combat combinations; 21 full actual-attack five-area journeys (105 arenas) using control/stationary, critical and cooldown/shadow/lifesteal builds. An earlier branch also passed 21 baseline-build journeys (105 arenas).
- Mobile tests cover all seven heroes, actual touch choices, five-area completion, purchases, starter unlock, reroll confirmation, real save reload, inventory pause, simultaneous movement/dodge, no zoom, all five wounded bosses, Park phases and 390×650 rarity cards.
- Release owner inspected 390×844 and 390×650 screenshots. Fixed shop rarity/price overlap, HUD covering upgrade panels, decimal formatting and Park label collision. Final Park healing screenshot uses a valid channel timer.

## Saving and limits
- Current key burntwood-wilds-progress-v2, schema 2; v1 browser saves and backups migrate without losing essence or hero ranks. The old key is not deleted. Starter IDs/selection are validated.
- Browser-local storage; no automatic device/cloud sync. Use workshop JSON backup/restore with explicit replacement confirmation. Purchases debit only after successful storage write. Corrupt originals are preserved; failed boss saving retains an in-memory reward with BACKUP NEEDED.
- Active run state is not restored on reload. New runs clear charms, gold and reroll escalation; permanent ranks, essence and starter unlocks survive.
- Scripted journeys use positioning/invulnerability and do not establish human survival balance. Mobile Chromium is not native Safari. User acceptance of 10.6.0 is pending.
- Town road geography remains illustrative, pending an agreed map reference. Opening spell cinematic, escape tokens and broader town overhaul are deferred. No additional hero or portrait is silently integrated.

## Exact next priorities
1. User Safari playtest: Tom punch weight/launches/barge, Joseph speed/ricochets/two dash charges and both approved sprites; then five-area pacing, charm/upgrade satisfaction, gold scarcity, shop reroll price, starter choice, inventory readability and Umbrella Man’s warnings/heal interruption. Diagnose specific feedback before changing shared balance.
2. Agree a map reference before changing Burntwood’s road layout.
3. Dedicated maintenance update from the completed audit: CI write-safety first, then an owned build template/central version metadata, registration checks and measured modular extraction. Current CI still runs the legacy importer and auto-commits generated files; do not mix the refactor with another feature release.
4. Future heroes require the complete approved portrait/sprite/moves/upgrades/stats gate in AGENTS.md. Preserve approved Zak Street and Mimi Little Headband/woodland assets.

## Previous release
10.5.0 living town/permanent ranks: PR #51 merge 233715d0070fae0a5679a2e12bcdf8bb81ee4917, branch CI 38756844724, main CI 38757339516, Pages 38757340088; all succeeded. 10.4.1 retained the final-first/heroic-second reward fix and Jackson’s boss knockback correction. Historical versioned links remain intact.
