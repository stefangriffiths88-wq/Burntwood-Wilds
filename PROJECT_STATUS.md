# Burntwood Wilds — project status

Updated 15 October 2026. Read DEVELOPMENT_GUIDE.md and this file before edits.

## Released: 10.4.1 — heroic rewards and Jackson boss charge
- Release PR #48; merge 72d1c82be5fe3e19a344ab051e470f606f3dab93.
- Play in Safari: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/burntwood-journey-v10.4.1.html?v=1041
- Stable entry: https://stefangriffiths88-wq.github.io/Burntwood-Wilds/latest.html
- Fixed a reproducible missing-reward transition: final boss defeated before heroic during one update left victory active with a pending charm but no offers. Shared heroicDefeated now opens the choice over victory and returns to victory after selection; coins are paid once.
- Heroic spawning/reward scheduling belongs to arenas/heroic.js, independent of character dispatch and charm effect state. items/charms.js owns equipment, choices, fusion and procs.
- Heroic health bar explicitly says “HEROIC · DEFEAT FOR A CHARM”. Reaching 1:00 spawns the enemy; defeating it earns the choice.
- Jackson charge deals 65 damage, or 85 with Heavy Shoulder; Break the Line adds 30. These hits add no knockback to final or heroic bosses. Ordinary enemy crowd control remains. Other character damage, boss health and approved artwork unchanged.

## Verification
- Final branch CI 38750192684 at b408531fc7be13cce4565bbc3361429fa314c405 passed build, standard gameplay, new encounter checks, charm matrix/journeys and mobile tests.
- Main CI 38750513827 and Pages deployment 38750513039 succeeded.
- Public 10.4.1 versioned HTML byte-for-byte matches the tested local build; BUILD_ID and latest.html destination verified.
- encounters-test.cjs: 28 fresh runs, seven heroes × four arenas, zero initial charms, timed heroic, real attacks, first reward, pause and duplicate guard. Both final/heroic defeat orders tested for every hero with one victory payment.
- Jackson base/upgraded charge and finisher tested against all four final bosses; heroic damage/no knockback and ordinary crowd control checked.
- Browser: timed heroic and real touch reward/fusion choices for seven heroes; final-first reward choice and victory restoration for Evie/Jackson.
- Inspected 390×844 heroic tracker and both final-first reward screens. Existing town/shop/boss entrance checks passed.
- Wider checks: 84 hero/charm combinations and 21 scripted journeys / 63 arenas. Positioning/invulnerability aid simulation; these are not human survival/balance results. Mobile Chromium is not native iPhone Safari.

## User feedback and investigation limits
- User reported no charms with Evie and Jackson on a preceding build, and requested charge damage without boss knockback. Exact viewed build and defeat sequence unknown.
- Current 10.4.0 source already earned first charms in all 28 ordinary acquisition checks. The final-first reward bug was separately reproduced and fixed; it is not proven to explain those specific runs.
- 10.4.0 town update had not yet been user tested when this feedback arrived.
- User acceptance of 10.4.1 pending. Next: play Evie/Jackson in Safari, defeat the gold-ringed heroic after 1:00, check charm choices and Jackson boss charge feel. If rewards still fail, record displayed build, arena, heroic defeat and sequence; investigate that evidence without global balancing.

## Retained release features and decisions
- 10.4.0: unselected heroes populate fixed town positions; selected hero/shopkeeper excluded from duplicate placement. Mimi runs the shop, Jodie when playing Mimi. Actual boss sprites replace gates, supporting map taps and nearby Challenge. Shop scroll resets on opening. Architecture: journey-v10/TOWN.md.
- Mimi greeting: “Okay human, you’re in my world now. Allow me to help you.”
- Jodie greeting: “Heyy Mimiiii… How can I help you save us all?”
- Seven heroes: Ava, Jackson, Stefan, Jodie, Evie, Zak and Mimi. Approved portraits and gameplay sprites remain separate. Zak Street and Mimi Little Headband/woodland portrait unchanged.
- Twelve run-only charms, three slots, matching same-rank fusion. Heroics at 1:00, final bosses at 2:00, eight timed upgrades. Charms persist between arenas, reset on a new run. CHARMS.md has numeric details and architecture.
- Rank III requires four base copies; current three-reward route normally allows rank II.
- Opening spell scene, conversations, town decoration, permanent upgrades, essence and gold escape tokens remain future design work. Do not implement without further design authorization.

## Authorized release in development: 10.5.0
User approved resident dialogue, Stefan’s permanent-upgrade shop, shared essence (2 per final boss), modest per-character ranks, save backup/restore, loss return to town, victory reactions, map service markers, wounded cleared bosses, hub size consistency and Bruce mouth-ball removal. New source/ownership and save rules: journey-v10/TOWN.md. No opening cinematic/gold token/starting charm included. Audit handover read before implementation; broad build/CI refactors remain separate. Focused town/save/bonus and existing gameplay/encounter checks pass locally; browser/production verification pending.
